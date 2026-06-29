import os
import json
import pickle
import uuid
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from PIL import Image
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

import tensorflow as tf
from tensorflow.keras.models import load_model

# ===================================================================
# TRIK ANTI-CRASH: Hapus parameter quantization_config secara dinamis
# ===================================================================
@tf.keras.utils.register_keras_serializable(package="Custom")
class SafeDense(tf.keras.layers.Dense):
    @classmethod
    def from_config(cls, config):
        # Buang argumen penyebab crash jika tidak sengaja terbaca dari .h5 lama
        config.pop('quantization_config', None)
        return super().from_config(config)

app = Flask(__name__)
CORS(app) 

# ==========================================
# KONFIGURASI FOLDER UNTUK HUGGING FACE DOCKER
# ==========================================
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

if os.path.basename(CURRENT_DIR) == "api":
    BASE_DIR = os.path.dirname(CURRENT_DIR)
else:
    BASE_DIR = CURRENT_DIR

MODEL_DIR = os.path.join(BASE_DIR, "models", "fashion")
DATA_DIR = os.path.join(BASE_DIR, "data")
UPLOAD_DIR = "/tmp/uploads"
CHART_DIR = "/tmp/charts"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(CHART_DIR, exist_ok=True)

# =========================
# PATH FILE
# =========================
IMAGE_MODEL_PATH = os.path.join(MODEL_DIR, "model_klasifikasi_citra_cnn_murni.h5")
FORECAST_MODEL_PATH = os.path.join(MODEL_DIR, "model_forecasting_tren_cnn_murni.h5")
CLASS_INDICES_PATH = os.path.join(MODEL_DIR, "class_indices.json")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler_forecasting.pkl")
FORECAST_CONFIG_PATH = os.path.join(MODEL_DIR, "forecast_config.json")
TREND_DATA_PATH = os.path.join(DATA_DIR, "data_tren_produk.csv")

# =============================================================
# LOAD MODEL & METADATA (Dijejali custom_objects penjinak)
# =============================================================
print("⏳ Memuat model Klasifikasi & Forecasting...")

# Memaksa Keras mengalihkan penciptaan layer 'Dense' ke 'SafeDense' bikinan kita
custom_objects = {"Dense": SafeDense}

image_model = load_model(IMAGE_MODEL_PATH, custom_objects=custom_objects, compile=False)
forecast_model = load_model(FORECAST_MODEL_PATH, custom_objects=custom_objects, compile=False)

with open(CLASS_INDICES_PATH, "r") as f:
    class_indices = json.load(f)
idx_to_class = {int(v): k for k, v in class_indices.items()}

with open(SCALER_PATH, "rb") as f:
    scaler = pickle.load(f)

with open(FORECAST_CONFIG_PATH, "r") as f:
    forecast_config = json.load(f)

LOOK_BACK = int(forecast_config.get("look_back", 14))

reverse_label_mapping = {0: "Turun", 1: "Stabil", 2: "Naik"}
if "reverse_label_mapping" in forecast_config:
    raw_reverse = forecast_config["reverse_label_mapping"]
    reverse_label_mapping = {int(k): v for k, v in raw_reverse.items()}

try:
    trend_df = pd.read_csv(TREND_DATA_PATH)
    trend_df.columns = trend_df.columns.astype(str).str.strip()
    trend_df["Date"] = pd.to_datetime(trend_df["Date"], errors="coerce")
    trend_df["Quantity"] = pd.to_numeric(trend_df["Quantity"], errors="coerce")
    trend_df = trend_df.dropna(subset=["Date", "Category", "Quantity"])
    trend_df = trend_df.sort_values("Date")
except Exception as e:
    print(f"⚠️ Gagal memuat data CSV: {e}")
    trend_df = pd.DataFrame(columns=["Date", "Category", "Quantity"])

mapping_kategori = {
    "Dresses": "Dress", "Dress": "Dress",
    "Tshirts": "T-Shirt", "Tshirt": "T-Shirt", "T-Shirts": "T-Shirt", "T-shirt": "T-Shirt",
    "Shirts": "Shirt", "Shirt": "Shirt",
    "Jeans": "Jeans",
    "Casual Shoes": "Shoes", "Sports Shoes": "Shoes", "Shoes": "Shoes", "Sneakers": "Shoes",
    "Handbags": "Bag", "Bags": "Bag", "Bag": "Bag",
    "Tops": "Top", "Top": "Top",
    "Jackets": "Jacket", "Jacket": "Jacket",
    "Trousers": "Trouser", "Trouser": "Trouser"
}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {"png", "jpg", "jpeg", "webp"}

def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def normalize_text(text):
    return str(text).strip().lower().replace("-", " ").replace("_", " ")

def find_forecast_category(predicted_class):
    available_categories = trend_df["Category"].dropna().unique()
    mapped_category = mapping_kategori.get(predicted_class)

    if mapped_category is not None:
        for cat in available_categories:
            if normalize_text(cat) == normalize_text(mapped_category):
                return cat

    for cat in available_categories:
        if normalize_text(cat) == normalize_text(predicted_class):
            return cat

    predicted_norm = normalize_text(predicted_class)
    for cat in available_categories:
        if predicted_norm in normalize_text(cat) or normalize_text(cat) in predicted_norm:
            return cat
            
    if any(k in predicted_norm for k in ["shoe", "sneaker", "footwear"]):
        for cat in available_categories:
            if any(k in normalize_text(cat) for k in ["shoe", "sneaker", "footwear"]):
                return cat
    return None

def get_series_by_category(category_name):
    if category_name is None or trend_df.empty:
        temp = trend_df.groupby("Date")["Quantity"].sum().reset_index()
        temp["Category"] = "Semua Produk"
        return temp

    temp = trend_df[trend_df["Category"] == category_name].copy()
    if temp.empty:
        temp = trend_df.groupby("Date")["Quantity"].sum().reset_index()
        temp["Category"] = "Semua Produk"
    else:
        temp = temp.groupby("Date")["Quantity"].sum().reset_index()
        temp["Category"] = category_name
    return temp

def create_trend_chart(series_df, chart_title):
    if series_df.empty:
        return None
    
    series_df = series_df.sort_values("Date")
    chart_filename = f"chart_{uuid.uuid4().hex}.png"
    chart_path = os.path.join(CHART_DIR, chart_filename)

    plt.figure(figsize=(10, 5))
    plt.plot(series_df["Date"], series_df["Quantity"], marker="o", color="#fa520f")
    plt.title(chart_title)
    plt.xlabel("Tanggal")
    plt.ylabel("Jumlah Transaksi")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(chart_path)
    plt.close()

    return f"https://entiei-fashion-trend-backend.hf.space/api/charts/{chart_filename}"

@app.route("/api/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "File gambar belum dipilih."}), 400

    file = request.files["file"]
    if not allowed_file(file.filename):
        return jsonify({"error": "Format file tidak didukung."}), 400

    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    image_path = os.path.join(UPLOAD_DIR, unique_filename)
    file.save(image_path)

    processed_img = preprocess_image(image_path)
    pred_prob = image_model.predict(processed_img)[0]
    pred_index = int(np.argmax(pred_prob))
    image_confidence = float(pred_prob[pred_index])
    predicted_class = idx_to_class[pred_index]

    forecast_category = find_forecast_category(predicted_class)
    used_category = forecast_category if forecast_category else "Semua Produk"
    series_df = get_series_by_category(forecast_category)

    trend_label = "Stabil"
    trend_confidence = 0.50
    
    if len(series_df) >= LOOK_BACK:
        temp = series_df.sort_values("Date")
        last_values = temp["Quantity"].values[-LOOK_BACK:]
        scaled_values = scaler.transform(np.array(last_values).reshape(-1, 1)).reshape(1, LOOK_BACK, 1)

        trend_prob = forecast_model.predict(scaled_values)[0]
        trend_index = int(np.argmax(trend_prob))
        trend_confidence = float(trend_prob[trend_index])
        trend_label = reverse_label_mapping[trend_index]

    chart_url = create_trend_chart(series_df, f"Tren Historis: {used_category}")

    return jsonify({
        "kategori": predicted_class,
        "confidence": image_confidence,
        "trend_label": trend_label,
        "trend_confidence": trend_confidence,
        "forecast_category": used_category,
        "chart_url": chart_url
    })

@app.route('/api/charts/<filename>')
def serve_chart(filename):
    return send_from_directory(CHART_DIR, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860, debug=True)
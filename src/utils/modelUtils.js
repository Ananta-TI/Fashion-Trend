import * as tf from "@tensorflow/tfjs";

export const MODEL_PATH = "/models/fashion/model.json";
export const CLASS_PATH = "/models/fashion/class_names.json";
export const TREND_RULES_PATH = "/models/fashion/trend_rules.json";
export const TREND_SCORES_PATH = "/models/fashion/trend_scores.json";

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`File tidak ditemukan: ${path}`);
  }

  return response.json();
}

export async function loadFashionModel() {
  await tf.setBackend("webgl");
  await tf.ready();

  const model = await tf.loadLayersModel(MODEL_PATH);

  const [classNames, trendRules, trendScores] = await Promise.all([
    fetchJson(CLASS_PATH),
    fetchJson(TREND_RULES_PATH),
    fetchJson(TREND_SCORES_PATH),
  ]);

  const inputSize = model.inputs?.[0]?.shape?.[1] || 224;

  console.log("Model berhasil dimuat sebagai LayersModel");
  console.log("Input size:", inputSize);
  console.log("Jumlah class:", classNames.length);

  return {
    model,
    classNames,
    trendRules,
    trendScores,
    inputSize,
  };
}

export function preprocessImage(imageElement, inputSize, preprocessMode = "raw") {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(imageElement);
    const resized = tf.image.resizeBilinear(tensor, [inputSize, inputSize]);
    const floatTensor = resized.toFloat();

    if (preprocessMode === "mobilenet") {
      return floatTensor.div(127.5).sub(1).expandDims(0);
    }

    if (preprocessMode === "zeroOne") {
      return floatTensor.div(255).expandDims(0);
    }

    return floatTensor.expandDims(0);
  });
}

export async function predictFashion({
  model,
  imageElement,
  inputSize,
  classNames,
  trendRules,
  trendScores,
  preprocessMode = "mobilenet",
}) {
  const input = preprocessImage(imageElement, inputSize, preprocessMode);
  const prediction = model.predict(input);
  const probabilities = await prediction.data();

  input.dispose();
  prediction.dispose();

  const sortedPredictions = Array.from(probabilities)
    .map((confidence, index) => ({
      kategori: classNames[index] || `class_${index}`,
      confidence,
    }))
    .sort((a, b) => b.confidence - a.confidence);

  const top = sortedPredictions[0];

  return {
    kategori: top.kategori,
    confidence: top.confidence,
    statusTrend: trendRules[top.kategori] || "TIDAK DIKETAHUI",
    trendScore: trendScores[top.kategori] ?? 0,
    topPredictions: sortedPredictions.slice(0, 3),
  };
}
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Brain,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import ResultCard from "./ResultCard";
import { loadFashionModel, predictFashion } from "../utils/modelUtils";

const PREPROCESS_MODE = "raw";

export default function FashionTrendPredictor() {
  const imageRef = useRef(null);

  const [model, setModel] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [trendRules, setTrendRules] = useState({});
  const [trendScores, setTrendScores] = useState({});
  const [inputSize, setInputSize] = useState(224);

  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function initModel() {
      try {
        setLoadingModel(true);
        setError("");

        const resources = await loadFashionModel();

        setModel(resources.model);
        setClassNames(resources.classNames);
        setTrendRules(resources.trendRules);
        setTrendScores(resources.trendScores);
        setInputSize(resources.inputSize);
      } catch (err) {
        console.error(err);
        setError(
          "Model gagal dimuat. Cek folder public/models/fashion dan pastikan semua file model sudah ada."
        );
      } finally {
        setLoadingModel(false);
      }
    }

    initModel();
  }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
    setResult(null);
    setError("");
  }

  async function handlePredict() {
    if (!model || !imageRef.current) {
      setError("Model atau gambar belum siap.");
      return;
    }

    try {
      setPredicting(true);
      setError("");

      const predictionResult = await predictFashion({
        model,
        imageElement: imageRef.current,
        inputSize,
        classNames,
        trendRules,
        trendScores,
        preprocessMode: PREPROCESS_MODE,
      });

      setResult(predictionResult);
    } catch (err) {
      console.error(err);
      setError("Prediksi gagal. Cek apakah preprocessing dan format model sudah sesuai.");
    } finally {
      setPredicting(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#e6d5a8] bg-[#fffaeb] p-5 shadow-[0_12px_40px_rgba(31,31,31,0.08)] md:p-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,82,15,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,217,0,0.24),transparent_35%)]" />

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6d5a8] bg-white px-4 py-2 text-sm font-medium text-[#fa520f]">
            <Brain size={16} />
            CNN Prediction System
          </div>

          <h1 className="font-serif text-4xl leading-tight tracking-[-0.8px] text-[#1f1f1f] md:text-6xl">
            Prediksi tren produk fashion.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#4a4a4a]">
            Upload gambar produk fashion. Sistem akan memprediksi kategori menggunakan model CNN, lalu menampilkan confidence, trend score, dan status tren.
          </p>
        </div>

        <div className="rounded-xl border border-[#e6d5a8] bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Model Status</span>
            <span
              className={
                loadingModel
                  ? "text-[#ffa110]"
                  : error
                  ? "text-red-600"
                  : "text-emerald-600"
              }
            >
              {loadingModel ? "Loading" : error ? "Error" : "Ready"}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Input Size</span>
            <span className="font-semibold text-[#1f1f1f]">
              {inputSize} × {inputSize}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Classes</span>
            <span className="font-semibold text-[#1f1f1f]">
              {classNames.length || "-"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <AlertTriangle className="mt-0.5 shrink-0" size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-[#e6d5a8] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg border border-[#e6d5a8] bg-[#fff8e0] p-3 text-[#fa520f]">
              <Upload size={24} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1f1f1f]">
                Upload Gambar
              </h2>
              <p className="text-sm text-[#6a6a6a]">
                Gunakan gambar produk fashion yang jelas.
              </p>
            </div>
          </div>

          <label className="flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c7c7c7] bg-[#fafafa] p-6 text-center transition hover:border-[#fa520f]">
            {!preview ? (
              <>
                <ImageIcon className="mb-4 text-[#8a8a8a]" size={54} />
                <p className="font-semibold text-[#1f1f1f]">
                  Klik untuk upload gambar
                </p>
                <p className="mt-2 text-sm text-[#8a8a8a]">
                  Format JPG, PNG, atau WEBP
                </p>
              </>
            ) : (
              <img
                ref={imageRef}
                src={preview}
                alt="Preview produk"
                className="max-h-[420px] w-full rounded-lg bg-white object-contain"
                crossOrigin="anonymous"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handlePredict}
            disabled={!preview || loadingModel || predicting || !model}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fa520f] px-5 py-3 font-semibold text-white transition hover:bg-[#cc3a05] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#a8a8a8]"
          >
            {predicting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Menganalisis...
              </>
            ) : (
              <>
                <Brain size={20} />
                Prediksi Tren
              </>
            )}
          </button>
        </div>

        <ResultCard result={result} />
      </div>
    </section>
  );
}
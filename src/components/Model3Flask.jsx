import { useState } from "react";
import { Upload, Brain, Image as ImageIcon, Loader2, AlertTriangle } from "lucide-react";
import ResultCard from "./ResultCard"; 

export default function Model3Flask() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedImage); 

    try {
      // === TEMBAK LANGSUNG KE HUGGING FACE DARI BROWSER (BYPASS VERCEL) ===
      const response = await fetch("https://entiei-fashion-trend-backend.hf.space/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke server cloud Flask");
      }

      const data = await response.json();
      
      setResult({
        kategori: data.kategori,
        confidence: data.confidence,
        trendLabel: data.trend_label, 
        trendConfidence: data.trend_confidence,
        forecastCategory: data.forecast_category,
        chartUrl: data.chart_url // Bersih, tidak ada lagi replace render
      });
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menganalisis gambar. Pastikan server Flask di cloud aktif.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#e6d5a8] bg-[#fffaeb] p-5 shadow-sm md:p-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,82,15,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,217,0,0.24),transparent_35%)]" />

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6d5a8] bg-white px-4 py-2 text-sm font-medium text-[#fa520f]">
            <Brain size={16} /> Dedicated Python Backend
          </div>
          <h1 className="font-serif text-3xl leading-tight tracking-[-0.8px] text-[#1f1f1f] md:text-5xl">
            Arsitektur Model 3
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#4a4a4a]">
            Memproses gambar di sisi server menggunakan Python Flask. Menghitung data tren historis secara real-time.
          </p>
        </div>

        <div className="rounded-xl border border-[#e6d5a8] bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Model Status</span>
            <span className="text-emerald-600 font-medium">Online (Hugging Face)</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Environment</span>
            <span className="font-semibold text-[#1f1f1f]">Python Flask</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#6a6a6a]">Execution</span>
            <span className="font-semibold text-[#1f1f1f]">Cloud Request</span>
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
              <h2 className="text-xl font-semibold text-[#1f1f1f]">Upload Gambar</h2>
              <p className="text-sm text-[#6a6a6a]">Format JPG, PNG, atau WEBP.</p>
            </div>
          </div>

          <label className="flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c7c7c7] bg-[#fafafa] p-6 text-center transition hover:border-[#fa520f]">
            {!previewUrl ? (
              <>
                <ImageIcon className="mb-4 text-[#8a8a8a]" size={54} />
                <p className="font-semibold text-[#1f1f1f]">Klik untuk upload gambar produk</p>
              </>
            ) : (
              <img
                src={previewUrl}
                alt="Preview produk"
                className="max-h-[420px] w-full rounded-lg bg-white object-contain"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <button
            onClick={handleAnalyze}
            disabled={!previewUrl || isAnalyzing}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fa520f] px-5 py-3 font-semibold text-white transition hover:bg-[#cc3a05] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#a8a8a8]"
          >
            {isAnalyzing ? (
              <><Loader2 className="animate-spin" size={20} /> Menganalisis...</>
            ) : (
              <><Brain size={20} /> Prediksi Tren</>
            )}
          </button>
        </div>

        <ResultCard result={result} />
      </div>
    </section>
  );
}
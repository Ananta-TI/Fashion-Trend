import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  FileImage,
  Image as ImageIcon,
  Layers3,
  Loader2,
  RefreshCcw,
  ScanSearch,
  Upload,
  X,
} from "lucide-react";
import ResultCard from "./ResultCard";
import { predictFashion } from "../utils/modelUtils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function FashionTrendPredictor() {
  const inputRef = useRef(null);

  // State untuk menyimpan gambar
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Menyimpan objek File asli untuk dikirim ke API
  const [result, setResult] = useState(null);

  // State untuk status UI
  const [isApiReady, setIsApiReady] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  // Simulasi inisialisasi komponen (karena model sekarang dihandle di backend)
  useEffect(() => {
    setIsApiReady(true);
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function resetImage() {
    if (preview) URL.revokeObjectURL(preview);
    
    setPreview("");
    setFileName("");
    setSelectedFile(null);
    setResult(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar JPG, PNG, atau WEBP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran gambar maksimal 10 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
    setFileName(file.name);
    setSelectedFile(file); // Simpan file untuk FormData
    setResult(null);
    setError("");
  }

  async function handlePredict() {
    if (!selectedFile) {
      setError("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    try {
      setPredicting(true);
      setResult(null);
      setError("");

      // Kirim gambar ke Flask API via modelUtils
      const predictionResult = await predictFashion({
        imageFile: selectedFile,
      });

      setResult(predictionResult);
    } catch (err) {
      console.error("Analisis gagal:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Analisis produk gagal dijalankan. Pastikan server Flask menyala."
      );
    } finally {
      setPredicting(false);
    }
  }

  const modelStatus = isApiReady ? "API Flask Siap" : "Menyiapkan UI";

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#eadbb5] bg-[#fffaf0] shadow-[0_24px_80px_rgba(54,38,17,0.09)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(250,82,15,0.12),transparent_26%),radial-gradient(circle_at_96%_6%,rgba(255,203,73,0.18),transparent_28%)]" />

      <div className="relative border-b border-[#eadbb5] px-5 py-7 md:px-8 md:py-9 lg:px-10">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0dcb0] bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e74a10] shadow-sm backdrop-blur">
              <ScanSearch size={15} />
              CNN Classification & Trend Forecasting
            </div>

            <h1 className="max-w-3xl font-serif text-4xl leading-[0.98] tracking-[-0.04em] text-[#181818] sm:text-5xl lg:text-6xl">
              Analisis tren produk fashion dari satu gambar.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#666057] md:text-base">
              Model CNN (.h5) di server mengenali kategori produk, lalu sistem melakukan peramalan (forecasting) menggunakan data tren historis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[560px]">
            <InfoCard
              icon={isApiReady ? CheckCircle2 : Cpu}
              label="Status"
              value={modelStatus}
              active={isApiReady}
            />
            <InfoCard
              icon={Layers3}
              label="Arsitektur"
              value="Python API"
            />
            <InfoCard
              icon={Database}
              label="Forecasting"
              value="Aktif"
            />
            <InfoCard
              icon={FileImage}
              label="Input model"
              value="128x128"
            />
          </div>
        </div>
      </div>

      <div className="relative p-4 md:p-6 lg:p-8">
        {error && (
          <div
            className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
            role="alert"
          >
            <AlertTriangle className="mt-0.5 shrink-0" size={19} />
            <p className="leading-6">{error}</p>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(320px,0.72fr)_minmax(0,1.28fr)]">
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-[#eadbb5] bg-white shadow-[0_14px_40px_rgba(31,31,31,0.06)]">
              <div className="flex items-center justify-between border-b border-[#eee5d2] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0e8] text-[#fa520f]">
                    <Upload size={20} />
                  </span>

                  <div>
                    <h2 className="font-semibold text-[#1d1d1d]">
                      Gambar produk
                    </h2>
                    <p className="text-xs text-[#847e74]">
                      JPG, PNG, WEBP · Maks. 10 MB
                    </p>
                  </div>
                </div>

                {preview && (
                  <button
                    type="button"
                    onClick={resetImage}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#e5ddd0] text-[#7a746b] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    aria-label="Hapus gambar"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <label className="group relative flex min-h-[380px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#d8ccb4] bg-[#fbfaf7] transition hover:border-[#fa520f] hover:bg-[#fff8f3]">
                  {!preview ? (
                    <div className="max-w-xs px-6 py-10 text-center">
                      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#eadbb5] bg-white text-[#fa520f] shadow-sm transition group-hover:-translate-y-1">
                        <ImageIcon size={30} />
                      </span>

                      <p className="mt-5 font-semibold text-[#252525]">
                        Pilih gambar produk
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#878177]">
                        Gunakan foto dengan objek utama yang jelas dan
                        latar yang tidak terlalu ramai.
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#fa520f] px-4 py-2 text-sm font-semibold text-white">
                        <Upload size={15} />
                        Browse file
                      </span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={preview}
                        alt="Preview produk fashion"
                        className="h-full max-h-[480px] w-full object-contain p-4"
                        onError={() => setError("Gambar gagal dimuat.")}
                      />

                      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-black/65 px-3 py-2.5 text-white backdrop-blur-md">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">
                            {fileName}
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/65">
                            Klik gambar untuk mengganti file
                          </p>
                        </div>

                        <RefreshCcw className="shrink-0" size={16} />
                      </div>
                    </>
                  )}

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handlePredict}
                  disabled={!preview || predicting}
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#fa520f,#ff7a18)] px-5 py-3.5 font-semibold text-white shadow-[0_12px_28px_rgba(250,82,15,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(250,82,15,0.32)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#e6e3dd] disabled:text-[#aaa49b] disabled:shadow-none"
                >
                  {predicting ? (
                    <>
                      <Loader2 className="animate-spin" size={19} />
                      Menganalisis di Server...
                    </>
                  ) : (
                    <>
                      <Brain size={19} />
                      Jalankan analisis
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#918a80]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isApiReady ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                    }`}
                  />
                  {modelStatus}
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <ResultCard result={result} />
          </main>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, label, value, active = false }) {
  return (
    <div className="rounded-2xl border border-[#eadfca] bg-white/80 p-3.5 shadow-sm backdrop-blur md:p-4">
      <div className="flex items-center justify-between">
        <span
          className={`grid h-8 w-8 place-items-center rounded-lg ${
            active ? "bg-emerald-50 text-emerald-600" : "bg-[#fff2e8] text-[#fa520f]"
          }`}
        >
          <Icon size={16} />
        </span>

        {active && (
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
        )}
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#918a80]">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-[#242424]">
        {value}
      </p>
    </div>
  );
}
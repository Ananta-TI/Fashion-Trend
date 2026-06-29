import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function ResultCard({ result }) {
  // Jika belum ada hasil, tampilkan state kosong
  if (!result) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-[#d8ccb4] bg-[#fbfaf7]">
        <p className="text-sm text-[#878177]">
          Hasil analisis akan muncul di sini
        </p>
      </div>
    );
  }

  // Destrukturisasi data yang dikirim dari modelUtils (API Python)
  const {
    kategori,
    confidence,
    trendLabel,
    trendConfidence,
    forecastCategory,
    chartUrl,
  } = result;

  // Konfigurasi warna & ikon berdasarkan status tren
  let TrendIcon = Minus;
  let trendColor = "text-gray-600 bg-gray-50 border-gray-200";

  if (trendLabel === "Naik") {
    TrendIcon = TrendingUp;
    trendColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
  } else if (trendLabel === "Turun") {
    TrendIcon = TrendingDown;
    trendColor = "text-red-700 bg-red-50 border-red-200";
  } else if (trendLabel === "Stabil") {
    TrendIcon = Minus;
    trendColor = "text-blue-700 bg-blue-50 border-blue-200";
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#eadbb5] bg-white shadow-[0_14px_40px_rgba(31,31,31,0.06)]">
      <div className="border-b border-[#eee5d2] px-5 py-4 sm:px-6">
        <h3 className="font-serif text-2xl font-medium text-[#181818]">
          Hasil Analisis
        </h3>
      </div>

      <div className="flex-1 p-5 sm:p-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {/* Kartu Hasil Klasifikasi Gambar */}
          <div className="rounded-2xl border border-[#eee5d2] bg-[#fbfaf7] p-5">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#878177]">
              Kategori Produk
            </p>
            <p className="text-xl font-semibold capitalize text-[#181818]">
              {kategori || "Tidak diketahui"}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-[#666057]">
              <CheckCircle size={16} className="text-emerald-500" />
              <span>
                Confidence:{" "}
                <strong>{confidence ? (confidence * 100).toFixed(1) : 0}%</strong>
              </span>
            </div>
          </div>

          {/* Kartu Hasil Prediksi Tren */}
          <div className={`rounded-2xl border p-5 ${trendColor}`}>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider opacity-80">
              Prediksi Tren Mendatang
            </p>
            <div className="flex items-center gap-2">
              <TrendIcon size={24} />
              <p className="text-xl font-semibold capitalize">
                {trendLabel || "Stabil"}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
              <span>
                Confidence:{" "}
                <strong>
                  {trendConfidence ? (trendConfidence * 100).toFixed(1) : 0}%
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Grafik Tren (Dihasilkan oleh Matplotlib Python) */}
        <div className="rounded-2xl border border-[#eee5d2] p-5">
          <p className="mb-4 text-sm font-medium text-[#181818]">
            Grafik Historis:{" "}
            <span className="font-semibold text-[#fa520f]">
              {forecastCategory}
            </span>
          </p>

          {chartUrl ? (
            <div className="overflow-hidden rounded-xl border border-[#eee5d2] bg-white">
              <img
                src={chartUrl}
                alt={`Grafik tren untuk ${forecastCategory}`}
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[#d8ccb4] bg-[#fbfaf7] text-[#878177]">
              <ImageIcon size={28} className="mb-2 mr-2 opacity-40" />
              <p className="text-sm">Grafik tidak tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
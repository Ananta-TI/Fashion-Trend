import { BarChart3, TrendingUp } from "lucide-react";

function getStatusClass(status) {
  if (status === "TRENDING") {
    return "text-emerald-700 bg-emerald-50 border-emerald-200";
  }

  if (status === "POTENSIAL") {
    return "text-sky-700 bg-sky-50 border-sky-200";
  }

  return "text-yellow-700 bg-yellow-50 border-yellow-200";
}

export default function ResultCard({ result }) {
  return (
    <div className="rounded-xl border border-[#e6d5a8] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg border border-[#e6d5a8] bg-[#fff8e0] p-3 text-[#fa520f]">
          <TrendingUp size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#1f1f1f]">
            Hasil Analisis
          </h2>
          <p className="text-sm text-[#6a6a6a]">
            Kategori, confidence, trend score, dan status tren.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="flex min-h-80 items-center justify-center rounded-xl border border-[#ededed] bg-[#fafafa] p-6 text-center text-[#8a8a8a]">
          Hasil prediksi akan muncul di sini setelah gambar dianalisis.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
            <p className="text-sm text-[#6a6a6a]">Kategori Produk</p>
            <p className="mt-2 font-serif text-4xl capitalize text-[#1f1f1f]">
              {result.kategori}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
              <p className="text-sm text-[#6a6a6a]">Confidence</p>
              <p className="mt-2 text-2xl font-semibold text-[#1f1f1f]">
                {(result.confidence * 100).toFixed(2)}%
              </p>
            </div>

            <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
              <p className="text-sm text-[#6a6a6a]">Trend Score</p>
              <p className="mt-2 text-2xl font-semibold text-[#1f1f1f]">
                {Number(result.trendScore).toFixed(2)}
              </p>
            </div>
          </div>

          <div className={`rounded-xl border p-5 ${getStatusClass(result.statusTrend)}`}>
            <p className="text-sm opacity-80">Status Tren</p>
            <p className="mt-2 text-3xl font-bold">
              {result.statusTrend}
            </p>
          </div>

          <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-[#fa520f]" />
              <p className="font-semibold text-[#1f1f1f]">Top 3 Prediksi</p>
            </div>

            <div className="space-y-3">
              {result.topPredictions.map((item) => (
                <div key={item.kategori}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="capitalize text-[#3d3d3d]">
                      {item.kategori}
                    </span>
                    <span className="text-[#6a6a6a]">
                      {(item.confidence * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#ededed]">
                    <div
                      className="h-full rounded-full bg-[#fa520f]"
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-[#8a8a8a]">
              Catatan: confidence menunjukkan keyakinan model terhadap prediksi, bukan jaminan bahwa kategori selalu benar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
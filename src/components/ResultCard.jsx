import {
  Activity,
  AlertTriangle,
  BarChart3,
  Database,
  Minus,
  Package,
  ScanSearch,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

function formatConfidence(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0.00%";
  }

  return `${(
    number * 100
  ).toFixed(2)}%`;
}

function formatPercent(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "-";
  }

  const prefix =
    number > 0 ? "+" : "";

  return `${prefix}${number.toFixed(
    2
  )}%`;
}

function formatNumber(
  value,
  digits = 2
) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "-";
  }

  return number.toFixed(digits);
}

function getProgressWidth(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0%";
  }

  return `${Math.min(
    100,
    Math.max(0, number * 100)
  )}%`;
}

function getStatusStyle(status) {
  if (status === "MENINGKAT") {
    return {
      icon: TrendingUp,
      classes:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (status === "MENURUN") {
    return {
      icon: TrendingDown,
      classes:
        "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (
    status === "DATA TERBATAS"
  ) {
    return {
      icon: AlertTriangle,
      classes:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    icon: Minus,
    classes:
      "border-sky-200 bg-sky-50 text-sky-700",
  };
}

function getQualityStyle(
  quality
) {
  if (quality === "TINGGI") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (quality === "SEDANG") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function TrendChart({
  history = [],
}) {
  if (!history.length) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg bg-white text-sm text-[#8a8a8a]">
        Riwayat tren tidak
        tersedia.
      </div>
    );
  }

  const width = 640;
  const height = 240;
  const paddingX = 42;
  const paddingTop = 24;
  const paddingBottom = 42;

  const chartWidth =
    width - paddingX * 2;

  const chartHeight =
    height -
    paddingTop -
    paddingBottom;

  const values = history.map(
    (item) =>
      Number(
        item.pangsa_ulasan ?? 0
      )
  );

  const maxValue = Math.max(
    ...values,
    1
  );

  const points = values.map(
    (value, index) => {
      const x =
        paddingX +
        (
          index /
          Math.max(
            values.length - 1,
            1
          )
        ) *
          chartWidth;

      const y =
        paddingTop +
        chartHeight -
        (value / maxValue) *
          chartHeight;

      return {
        x,
        y,
        value,
        period:
          history[index].periode,
      };
    }
  );

  const polylinePoints =
    points
      .map(
        (point) =>
          `${point.x},${point.y}`
      )
      .join(" ");

  const gridValues = [
    0,
    0.25,
    0.5,
    0.75,
    1,
  ];

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[580px] w-full"
        role="img"
        aria-label="Grafik pangsa aktivitas ulasan"
      >
        {gridValues.map(
          (ratio) => {
            const y =
              paddingTop +
              chartHeight -
              ratio *
                chartHeight;

            const label =
              maxValue * ratio;

            return (
              <g
                key={ratio}
              >
                <line
                  x1={paddingX}
                  x2={
                    width -
                    paddingX
                  }
                  y1={y}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeWidth="1"
                />

                <text
                  x={
                    paddingX - 8
                  }
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#8a8a8a"
                >
                  {label.toFixed(
                    1
                  )}
                  %
                </text>
              </g>
            );
          }
        )}

        <polyline
          points={
            polylinePoints
          }
          fill="none"
          stroke="#fa520f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map(
          (
            point,
            index
          ) => (
            <g
              key={`${point.period}-${index}`}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#fa520f"
              />

              {(
                index === 0 ||
                index ===
                  points.length -
                    1 ||
                index % 2 === 0
              ) && (
                <text
                  x={point.x}
                  y={
                    height - 14
                  }
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6a6a6a"
                >
                  {
                    point.period
                  }
                </text>
              )}
            </g>
          )
        )}
      </svg>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-4">
      <div className="flex items-center gap-2 text-[#6a6a6a]">
        <Icon
          size={16}
          className="text-[#fa520f]"
        />

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold text-[#1f1f1f]">
        {value}
      </p>
    </div>
  );
}

export default function ResultCard({
  result,
}) {
  const topPredictions =
    result?.topPredictions ??
    [];

  const trend =
    result?.trend ?? null;

  const trendMeta =
    result?.trendMeta ?? null;

  const statusStyle =
    getStatusStyle(
      trend?.status
    );

  const StatusIcon =
    statusStyle.icon;

  return (
    <div className="rounded-xl border border-[#e6d5a8] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg border border-[#e6d5a8] bg-[#fff8e0] p-3 text-[#fa520f]">
          <ScanSearch
            size={24}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#1f1f1f]">
            Hasil Analisis
          </h2>

          <p className="text-sm text-[#6a6a6a]">
            Klasifikasi citra dan
            tren historis kategori.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="flex min-h-80 items-center justify-center rounded-xl border border-[#ededed] bg-[#fafafa] p-6 text-center text-[#8a8a8a]">
          Hasil analisis akan
          muncul setelah gambar
          diproses.
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
            <p className="text-sm text-[#6a6a6a]">
              Kategori Produk
            </p>

            <p className="mt-2 font-serif text-4xl capitalize text-[#1f1f1f]">
              {result.kategori}
            </p>
          </div>

          <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[#6a6a6a]">
                  Confidence CNN
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#1f1f1f]">
                  {formatConfidence(
                    result.confidence
                  )}
                </p>
              </div>

              <span className="rounded-full border border-[#e6d5a8] bg-white px-3 py-1 text-xs font-medium text-[#6a6a6a]">
                EfficientNet-B0
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#ededed]">
              <div
                className="h-full rounded-full bg-[#fa520f] transition-[width] duration-500"
                style={{
                  width:
                    getProgressWidth(
                      result.confidence
                    ),
                }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3
                size={18}
                className="text-[#fa520f]"
              />

              <p className="font-semibold text-[#1f1f1f]">
                Top 3 Prediksi
              </p>
            </div>

            <div className="space-y-4">
              {topPredictions.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={`${item.kategori}-${index}`}
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fff1e8] text-xs font-semibold text-[#fa520f]">
                          {index + 1}
                        </span>

                        <span className="capitalize text-[#3d3d3d]">
                          {
                            item.kategori
                          }
                        </span>
                      </div>

                      <span className="font-medium text-[#6a6a6a]">
                        {formatConfidence(
                          item.confidence
                        )}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#e5e5e5]">
                      <div
                        className="h-full rounded-full bg-[#fa520f]"
                        style={{
                          width:
                            getProgressWidth(
                              item.confidence
                            ),
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {!trend ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-700">
              Data tren untuk
              kategori ini tidak
              ditemukan.
            </div>
          ) : (
            <>
              <div
                className={`rounded-xl border p-5 ${statusStyle.classes}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm opacity-80">
                      Status Tren
                      Historis
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {
                        trend.status
                      }
                    </p>
                  </div>

                  <StatusIcon
                    size={34}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getQualityStyle(
                      trend.kualitas_data
                    )}`}
                  >
                    Kualitas data:{" "}
                    {
                      trend.kualitas_data
                    }
                  </span>

                  <span className="rounded-full border border-current/20 bg-white/50 px-3 py-1 text-xs font-semibold">
                    Peringkat
                    popularitas #
                    {
                      trend.peringkat_popularitas
                    }
                  </span>
                </div>
              </div>

              {trend.status ===
                "DATA TERBATAS" && (
                <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  <AlertTriangle
                    className="mt-1 shrink-0"
                    size={18}
                  />

                  <p>
                    Jumlah ulasan
                    terbaru terlalu
                    sedikit untuk
                    menyimpulkan arah
                    tren dengan kuat.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <MetricCard
                  icon={
                    TrendingUp
                  }
                  label="Pertumbuhan pangsa"
                  value={formatPercent(
                    trend.pertumbuhan_pangsa_persen
                  )}
                />

                <MetricCard
                  icon={
                    Activity
                  }
                  label="Pangsa terbaru"
                  value={`${formatNumber(
                    trend.pangsa_ulasan_terbaru
                  )}%`}
                />

                <MetricCard
                  icon={Star}
                  label="Rata-rata rating"
                  value={`${formatNumber(
                    trend.rata_rating
                  )} / 5`}
                />

                <MetricCard
                  icon={
                    Database
                  }
                  label="Ulasan terbaru"
                  value={
                    trend.jumlah_ulasan_terbaru ??
                    "-"
                  }
                />

                <MetricCard
                  icon={
                    Package
                  }
                  label="Produk aktif"
                  value={
                    trend.produk_aktif ??
                    "-"
                  }
                />

                <MetricCard
                  icon={Users}
                  label="Pengguna aktif"
                  value={
                    trend.pengguna_aktif ??
                    "-"
                  }
                />

                <MetricCard
                  icon={
                    BarChart3
                  }
                  label="Perubahan pangsa"
                  value={`${formatNumber(
                    trend.perubahan_pangsa_pp
                  )} pp`}
                />

                <MetricCard
                  icon={
                    TrendingUp
                  }
                  label="Peringkat pertumbuhan"
                  value={
                    trend.peringkat_pertumbuhan
                      ? `#${trend.peringkat_pertumbuhan}`
                      : "Tidak dinilai"
                  }
                />
              </div>

              <div className="rounded-xl border border-[#ededed] bg-[#fafafa] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#1f1f1f]">
                      Grafik Pangsa
                      Ulasan
                    </p>

                    <p className="mt-1 text-xs text-[#8a8a8a]">
                      Persentase
                      aktivitas ulasan
                      kategori terhadap
                      seluruh kategori.
                    </p>
                  </div>

                  <Activity
                    size={20}
                    className="text-[#fa520f]"
                  />
                </div>

                <TrendChart
                  history={
                    trend.history
                  }
                />
              </div>

              {trendMeta && (
                <div className="rounded-xl border border-[#ededed] bg-white p-5 text-xs leading-6 text-[#6a6a6a]">
                  <p>
                    Periode analisis:{" "}
                    <strong>
                      {
                        trendMeta.periode_awal
                      }{" "}
                      sampai{" "}
                      {
                        trendMeta.periode_akhir
                      }
                    </strong>
                  </p>

                  <p>
                    Cakupan produk:{" "}
                    <strong>
                      {
                        trendMeta.cakupan_produk_persen
                      }
                      %
                    </strong>
                  </p>

                  <p className="mt-2">
                    {
                      trendMeta.catatan
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
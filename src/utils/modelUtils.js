export async function loadFashionModel() {
  // Hanya sekadar mock fungsi agar komponen tidak error saat inisialisasi
  return { classNames: [], inputSize: 128 };
}

export async function predictFashion({ imageFile }) {
  if (!imageFile) throw new Error("File gambar tidak ditemukan.");

  const formData = new FormData();
  formData.append("file", imageFile); // API Flask sekarang menerima key 'file'

fetch("https://entiei-fashion-trend-backend.hf.space/api/predict", {
      method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || "Gagal memproses gambar dari server Python.");
  }

  const data = await response.json();
  
  // Mengembalikan data mentah dari Flask untuk ditampilkan di komponen ResultCard kamu
  return {
    kategori: data.kategori,
    confidence: data.confidence,
    trendLabel: data.trend_label, 
    trendConfidence: data.trend_confidence,
    forecastCategory: data.forecast_category,
    chartUrl: data.chart_url // URL grafik matplotlib dari Python
  };
}
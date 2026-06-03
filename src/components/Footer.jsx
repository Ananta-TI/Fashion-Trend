import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="h-8 bg-gradient-to-r from-[#fa520f] via-[#ffa110] via-[#ffd900] to-[#fff8e0]" />

      <footer className="bg-[#fff8e0] px-5 py-10 text-sm text-[#4a4a4a] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f1f1f] text-white">
                <Brain size={18} />
              </div>

              <div>
                <p className="font-semibold text-[#1f1f1f]">
                  FashionTrend AI
                </p>
                <p className="text-xs text-[#6a6a6a]">
                  CNN-based product trend analysis
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md leading-7">
              Website prototype untuk klasifikasi gambar produk fashion dan analisis status tren berdasarkan trend score.
            </p>
          </div>

          <div>
            <p className="mb-3 font-semibold text-[#1f1f1f]">Navigasi</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-[#fa520f]">Home</Link>
              <Link to="/predict" className="text-[#fa520f]">Prediksi</Link>
            </div>
          </div>

          <div>
            <p className="mb-3 font-semibold text-[#1f1f1f]">Teknologi</p>
            <div className="flex flex-col gap-2">
              <span>React + Vite</span>
              <span>Tailwind CSS</span>
              <span>TensorFlow.js</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
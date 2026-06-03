import Header from "../components/Header";
import Footer from "../components/Footer";
import FashionTrendPredictor from "../components/FashionTrendPredictor";

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-[#fff8e0] text-[#1f1f1f]">
      <Header />

      <main className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FashionTrendPredictor />
        </div>
      </main>

      <Footer />
    </div>
  );
}
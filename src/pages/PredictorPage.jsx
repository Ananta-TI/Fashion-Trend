import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Cpu, Server, Sparkles } from "lucide-react";

// Import ketiga komponen modelmu
import Model1Local from "../components/Model1Local";
import Model2Github from "../components/Model2Github";
import Model3Flask from "../components/Model3Flask";

export default function PredictorPage() {
  // State untuk melacak tab mana yang sedang aktif (default: model3)
  const [activeTab, setActiveTab] = useState("model3");

  const tabs = [
    {
      id: "model1",
      name: "Model 1: Local",
      icon: Box,
      description: "Browser (Client-side)",
    },
    {
      id: "model2",
      name: "Model 2: GitHub",
      icon: Cpu,
      description: "Versi default repositori",
    },
    {
      id: "model3",
      name: "Model 3: Flask API",
      icon: Server,
      description: "Server & Grafik Python",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff8e0] text-[#1f1f1f]">
      {/* Header bawaan dari template-mu */}
      <Header />

      <main className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          
          {/* HEADER & NAVIGASI TAB KUSTOM */}
          <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-[#eadbb5] bg-[#fffaf0] p-6 shadow-sm md:flex-row md:items-center md:p-8">
            <div>
              <h1 className="flex items-center gap-2 font-serif text-3xl font-bold md:text-4xl">
                <Sparkles className="text-[#fa520f]" size={32} />
                AI Fashion Forecast
              </h1>
              <p className="mt-2 text-sm text-[#666057]">
                Pusat komparasi arsitektur peramalan tren produk fashion.
              </p>
            </div>

            {/* TOMBOL TAB */}
            <nav className="flex w-full flex-col gap-2 sm:flex-row md:w-auto bg-white/50 p-1.5 rounded-2xl border border-[#eadbb5]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl px-4 py-3 text-left transition-all ${
                      isActive
                        ? "bg-white text-[#fa520f] shadow-sm ring-1 ring-[#eadbb5]"
                        : "text-[#878177] hover:bg-white/60 hover:text-[#181818]"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon size={16} />
                      <span className="text-sm">{tab.name}</span>
                    </div>
                    <span className="text-[10px] font-medium opacity-70">
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* AREA KONTEN MODEL */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "model1" && <Model1Local />}
            {activeTab === "model2" && <Model2Github />}
            {activeTab === "model3" && <Model3Flask />}
          </div>

        </div>
      </main>

      {/* Footer bawaan dari template-mu */}
      <Footer />
    </div>
  );
}
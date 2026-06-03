import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  ImageUp,
  LineChart,
  Sparkles,
  Zap,
  ScanSearch,
} from "lucide-react";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ease = [0.22, 1, 0.36, 1];

function MistralScrollSequence() {
  const sequenceRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    mass: 0.75,
  });

  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.26],
    [1, 0.75, 0]
  );

  const heroScale = useTransform(
    smoothProgress,
    [0, 0.26],
    [1, 0.9]
  );

  const heroY = useTransform(
    smoothProgress,
    [0, 0.26],
    [0, -70]
  );

  const panelY = useTransform(
    smoothProgress,
    [0.16, 0.44],
    ["108vh", "5vh"]
  );

  const panelWidth = useTransform(
    smoothProgress,
    [0.44, 0.58],
    ["86%", "100%"]
  );

  const panelHeight = useTransform(
    smoothProgress,
    [0.44, 0.58],
    ["88vh", "100vh"]
  );

  const panelRadius = useTransform(
    smoothProgress,
    [0.44, 0.58],
    ["34px", "0px"]
  );

  const panelTop = useTransform(
    smoothProgress,
    [0.44, 0.58],
    ["5vh", "0vh"]
  );

  const panelShadow = useTransform(
    smoothProgress,
    [0.44, 0.58],
    [
      "0 40px 120px rgba(0,0,0,0.28)",
      "0 0 0 rgba(0,0,0,0)",
    ]
  );

  const logoOpacity = useTransform(
    smoothProgress,
    [0, 0.6, 0.72, 0.82],
    [1, 1, 0.78, 0]
  );

  const logoBlur = useTransform(
    smoothProgress,
    [0.6, 0.82],
    ["blur(0px)", "blur(24px)"]
  );

  const logoScale = useTransform(
    smoothProgress,
    [0.6, 0.82],
    [1, 1.18]
  );

  const logoY = useTransform(
    smoothProgress,
    [0.6, 0.82],
    [0, -46]
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0.82, 0.94],
    [0, 1]
  );

  const contentY = useTransform(
    smoothProgress,
    [0.82, 0.94],
    [62, 0]
  );

  const contentScale = useTransform(
    smoothProgress,
    [0.82, 0.94],
    [0.98, 1]
  );

  const miniCardsOpacity = useTransform(
    smoothProgress,
    [0.88, 1],
    [0, 1]
  );

  const miniCardsY = useTransform(
    smoothProgress,
    [0.88, 1],
    [42, 0]
  );

  const bar1Width = useTransform(
    smoothProgress,
    [0.84, 0.96],
    ["0%", "85%"]
  );

  const bar2Width = useTransform(
    smoothProgress,
    [0.86, 0.98],
    ["0%", "65%"]
  );

  const bar3Width = useTransform(
    smoothProgress,
    [0.88, 1],
    ["0%", "38%"]
  );

  const bar4Width = useTransform(
    smoothProgress,
    [0.9, 1],
    ["0%", "24%"]
  );

  const stripeX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "-22%"]
  );

  const sunScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, 1.35]
  );

  return (
    <section ref={sequenceRef} className="relative h-[430vh] bg-[#fff8e0]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale: sunScale }}
          className="absolute -right-56 -top-44 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,#ffd900_0%,#ffa110_34%,#fa520f_55%,rgba(250,82,15,0)_72%)] opacity-75"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,208,106,0.75),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(250,82,15,0.24),transparent_36%),linear-gradient(135deg,#fff8e0_0%,#fffaeb_48%,#fff0c2_100%)]" />

        <motion.div
          style={{ x: stripeX }}
          className="absolute bottom-0 left-0 h-12 w-[145%] bg-gradient-to-r from-[#c4001d] via-[#fa520f] to-[#fff8e0]"
        />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="absolute inset-0 z-10 flex items-center justify-center px-5 pt-14 text-center"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6d5a8] bg-white/70 px-4 py-2 text-sm font-medium text-[#cc3a05] backdrop-blur">
              <Sparkles size={16} />
              Analisis tren produk fashion berbasis CNN
            </div>

            <h1 className="mx-auto max-w-6xl font-serif text-[54px] font-normal leading-[0.98] tracking-[-2px] text-[#1f1f1f] md:text-[92px] lg:text-[118px]">
              Prediksi tren.
              <br />
              Dari satu gambar.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#3d3d3d]">
              Upload gambar produk fashion. Model CNN membaca kategori,
              confidence score, trend score, dan status tren langsung di browser.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/predict"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fa520f] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(250,82,15,0.28)] transition hover:bg-[#cc3a05]"
              >
                Mulai Prediksi
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-[#c7c7c7] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#1f1f1f] transition hover:border-[#fa520f]"
              >
                Lihat Fitur
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{
            y: panelY,
            width: panelWidth,
            height: panelHeight,
            borderRadius: panelRadius,
            marginTop: panelTop,
            boxShadow: panelShadow,
          }}
          className="relative z-20 mx-auto overflow-hidden border border-white/10 bg-[#101011] text-white"
        >
          <motion.div
            style={{
              opacity: logoOpacity,
              filter: logoBlur,
              scale: logoScale,
              y: logoY,
            }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center will-change-transform"
          >
            <img
              src="/favicon.svg"
              alt="FashionTrend AI Logo"
              className="h-28 w-28 object-contain drop-shadow-[0_22px_55px_rgba(250,82,15,0.28)] md:h-36 md:w-36"
              draggable="false"
            />

            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              FashionTrend AI
            </p>
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(250,82,15,0.32),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(255,217,0,0.12),transparent_32%)]" />
          <div className="absolute -right-20 -top-24 h-[520px] w-[520px] rounded-full bg-[#fa520f] opacity-20 blur-[130px]" />
          <div className="absolute -bottom-32 left-[-10%] h-[520px] w-[520px] rounded-full bg-[#ffd900] opacity-10 blur-[140px]" />

          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
            }}
            className="relative z-10 flex h-full w-full items-center"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-2">
                  <Zap size={18} className="text-[#ffd06a]" />
                  <span className="font-mono text-xs text-white/70">
                    model.predict(input_tensor)
                  </span>
                </div>

                <h2 className="max-w-2xl font-serif text-5xl leading-[1.02] tracking-[-1px] md:text-7xl">
                  Analisis tren produk dalam satu alur visual.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                  Sistem menerima gambar produk, memprosesnya menjadi tensor,
                  memprediksi kategori, lalu menampilkan confidence dan trend insight.
                </p>

                <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                  {[
                    ["Input", "image upload"],
                    ["Model", "CNN classifier"],
                    ["Output", "category + confidence"],
                    ["Insight", "trend status"],
                  ].map(([title, desc]) => (
                    <div
                      key={title}
                      className="border border-white/10 bg-white/[0.04] p-4"
                    >
                      <p className="font-serif text-3xl">{title}</p>
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="border border-white/10 bg-black/35 p-6 shadow-2xl backdrop-blur-md md:p-8">
                  <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Live Trend Output
                      </p>
                      <p className="mt-1 font-mono text-xs text-white/35">
                        /models/fashion/model.json
                      </p>
                    </div>

                    <span className="flex items-center gap-2 rounded-full bg-green-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Active
                    </span>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        label: "Oversized Shirt",
                        value: "85%",
                        width: bar1Width,
                        status: "Potensial",
                      },
                      {
                        label: "Summer Dress",
                        value: "65%",
                        width: bar2Width,
                        status: "Stabil",
                      },
                      {
                        label: "Denim Pants",
                        value: "38%",
                        width: bar3Width,
                        status: "Menengah",
                      },
                      {
                        label: "Running Shoes",
                        value: "24%",
                        width: bar4Width,
                        status: "Menurun",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-3 flex items-end justify-between">
                          <div>
                            <p className="mb-1 font-medium text-white/90">
                              {item.label}
                            </p>
                            <p className="text-xs text-white/40">
                              Status: {item.status}
                            </p>
                          </div>

                          <span className="font-mono text-lg text-[#ffd06a]">
                            {item.value}
                          </span>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            style={{ width: item.width }}
                            className="h-full rounded-full bg-gradient-to-r from-[#fa520f] to-[#ffd900]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  style={{
                    opacity: miniCardsOpacity,
                    y: miniCardsY,
                  }}
                  className="mt-5 grid grid-cols-3 gap-4"
                >
                  {[
                    ["Kategori", "shirt"],
                    ["Confidence", "85%"],
                    ["Trend Score", "42"],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="border border-white/10 bg-white/[0.04] p-4"
                    >
                      <p className="text-xs text-white/40">{title}</p>
                      <p className="mt-2 font-serif text-3xl text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: ImageUp,
      title: "Upload produk",
      desc: "Pengguna dapat memasukkan gambar produk fashion dari perangkat lokal.",
    },
    {
      icon: ScanSearch,
      title: "Preprocessing gambar",
      desc: "Gambar diproses menjadi tensor agar sesuai dengan input model.",
    },
    {
      icon: Brain,
      title: "Prediksi CNN",
      desc: "Model membaca pola visual dan menghasilkan kategori produk.",
    },
    {
      icon: LineChart,
      title: "Trend insight",
      desc: "Kategori dipetakan ke trend score dan status tren produk.",
    },
  ];

  return (
    <section id="features" className="border-y border-[#1f1f1f]/15 bg-white">
      <div className="mx-auto max-w-[1728px] border-x border-[#1f1f1f]/15">
        <div className="grid border-b border-[#1f1f1f]/15 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-[#1f1f1f]/15 px-5 py-10 md:px-10 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
              Product Suite
            </p>
          </div>

          <div className="px-5 py-10 md:px-10">
            <h2 className="max-w-5xl font-serif text-5xl leading-[1.05] tracking-[-1px] md:text-7xl">
              Do it all with FashionTrend AI.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease }}
              className="group min-h-[310px] border-b border-r border-[#1f1f1f]/15 bg-[#fff8e0] p-8 transition hover:bg-[#fffaeb]"
            >
              <div className="mb-10 grid h-12 w-12 place-items-center bg-[#fa520f] text-white transition group-hover:bg-[#1f1f1f]">
                <item.icon size={22} />
              </div>

              <h3 className="font-serif text-4xl text-[#1f1f1f]">
                {item.title}
              </h3>

              <p className="mt-5 max-w-sm leading-7 text-[#4a4a4a]">
                {item.desc}
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#fa520f]">
                <span>Lihat detail</span>
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImplementationSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const codeRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={sectionRef} className="bg-[#fff8e0] px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
            Browser Inference
          </p>

          <h2 className="font-serif text-5xl leading-[1.05] tracking-[-1px] md:text-7xl">
            Model berjalan langsung di halaman prediksi.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#3d3d3d]">
            TensorFlow.js memuat model dari folder public, memproses gambar,
            lalu mengembalikan kategori, confidence, trend score, dan status tren.
          </p>

          <Link
            to="/predict"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#fa520f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#cc3a05]"
          >
            Coba Sekarang
            <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div
          style={{
            y: codeY,
            rotate: codeRotate,
          }}
          className="border border-[#1f1f1f]/15 bg-[#101011] p-6 text-white shadow-[0_26px_70px_rgba(0,0,0,0.22)]"
        >
          <div className="border-b border-white/10 pb-4 font-mono text-sm text-white/45">
            src/utils/modelUtils.js
          </div>

          <div className="space-y-5 pt-6 font-mono text-sm leading-7 text-white/75">
            <p>
              <span className="text-[#ffd06a]">const</span> model = await
              tf.loadLayersModel(
              <span className="text-[#ffb83e]">
                "/models/fashion/model.json"
              </span>
              )
            </p>

            <p>
              <span className="text-[#ffd06a]">const</span> input =
              preprocessImage(image)
            </p>

            <p>
              <span className="text-[#ffd06a]">const</span> prediction =
              model.predict(input)
            </p>

            <p>
              <span className="text-[#ffd06a]">return</span> kategori +
              confidence + trendScore + statusTrend
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-white px-5 py-28 md:px-8">
      <div className="mx-auto max-w-[1728px] border border-[#e6d5a8] bg-[#fffaeb] p-8 md:p-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
              Start analysing
            </p>

            <h2 className="max-w-4xl font-serif text-5xl leading-[1.05] md:text-7xl">
              Uji gambar produk fashion sekarang.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3d3d3d]">
              Masuk ke halaman prediksi, upload gambar, dan lihat bagaimana
              sistem membaca kategori serta status tren produk.
            </p>
          </div>

          <Link
            to="/predict"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3.5 text-sm font-semibold text-white"
          >
            Masuk ke Sistem Prediksi
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fff8e0] text-[#1f1f1f]">
      <Header />

      <main>
        <MistralScrollSequence />
        <FeaturesSection />
        <ImplementationSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
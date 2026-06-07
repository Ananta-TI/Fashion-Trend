import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import {
  Brain,
  ImageUp,
  LineChart,
  ScanSearch,
  Shirt,
  BarChart3,
  UploadCloud,
  Activity,
  Database,
  Code2,
  Layers3,
  Boxes,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PixelArrow({ className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.9995 25H8.99951V21H12.9995V25Z" fill="currentColor" />
      <path d="M16.9995 21H12.9995V17H16.9995V21Z" fill="currentColor" />
      <path d="M20.9995 17H16.9995V13H20.9995V17Z" fill="currentColor" />
      <path d="M16.9995 13H12.9995V9H16.9995V13Z" fill="currentColor" />
      <path d="M12.9995 9H8.99951V5H12.9995V9Z" fill="currentColor" />
    </svg>
  );
}

function PixelLogo({ className = "w-9" }) {
  return (
    <svg
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 0H3V3H6V0Z" fill="#FFAF01" />
      <path d="M6 9H3V12H6V9Z" fill="#E61300" />
      <path d="M9 12H0V15H9V12Z" fill="#C4001D" />
      <path d="M9 3H3V6H9V3Z" fill="#FF8204" />
      <path d="M12 9H9V12H12V9Z" fill="#E61300" />
      <path d="M18 6H3V9H18V6Z" fill="#FA500F" />
      <path d="M18 3H12V6H18V3Z" fill="#FF8204" />
      <path d="M18 0H15V3H18V0Z" fill="#FFAF01" />
      <path d="M18 9H15V12H18V9Z" fill="#E61300" />
      <path d="M21 12H12V15H21V12Z" fill="#C4001D" />
    </svg>
  );
}

function PixelMosaic() {
  const cells = [
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#e91408]",
    "bg-[#c7002a]",
    "bg-[#ff4d13]",
    "bg-[#ff8508]",
    "bg-[#e91408]",
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#ff8508]",
    "bg-[#c7002a]",
    "bg-[#e91408]",
    "bg-[#c7002a]",
    "bg-[#c7002a]",
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#e91408]",
    "bg-[#ff4d13]",
    "bg-[#c7002a]",
    "bg-[#ff4d13]",
    "bg-[#e91408]",
    "bg-[#ff4d13]",
    "bg-[#ff4d13]",
    "bg-[#c7002a]",
    "bg-[#c7002a]",
    "bg-[#e91408]",
    "bg-[#ff4d13]",
    "bg-[#c7002a]",
    "bg-[#ff8508]",
    "bg-[#e91408]",
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ff4d13]">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-4">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={cx(cell, "border-b border-r border-black/10")}
          />
        ))}
      </div>

      <div className="absolute left-[18%] top-[67%] font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black">
        Frontier AI
      </div>

      <div className="absolute right-[12%] top-[28%] font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black">
        In your hands
      </div>

      <div className="absolute left-[20%] top-[26%] h-1.5 w-1.5 bg-black" />
      <div className="absolute right-[20%] top-[26%] h-1.5 w-1.5 bg-black" />
      <div className="absolute bottom-[24%] left-[20%] h-1.5 w-1.5 bg-black" />
      <div className="absolute bottom-[24%] right-[20%] h-1.5 w-1.5 bg-black" />

      <div className="absolute bottom-4 right-10">
        <PixelLogo className="w-14 drop-shadow-[8px_8px_0_rgba(0,0,0,0.35)]" />
      </div>
    </div>
  );
}

function MiniFeaturedNews() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#fbfaf5] px-8 py-8 xl:px-9 xl:py-9">
      <div className="space-y-2 font-mono text-lg leading-none text-black/25">
        <p>↓</p>
        <p>↓</p>
        <p>↓</p>
      </div>

      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/55">
          Featured news
        </p>

        <div className="grid h-[72px] grid-cols-[72px_1fr_38px] border border-[#111]/10 bg-[#fbfaf5]">
          <div className="flex items-end bg-[#ff4d13] p-2">
            <p className="font-mono text-[8px] uppercase leading-tight text-white/70">
              Fashion
              <br />
              AI
              <br />
              Trend
            </p>
          </div>

          <div className="flex items-center px-4">
            <p className="text-[15px] font-semibold text-[#111]">
              FashionTrend gets to work.
            </p>
          </div>

          <div className="grid border-l border-[#111]/10">
            <button
              type="button"
              className="grid place-items-center border-b border-[#111]/10 transition hover:bg-[#f1eee5]"
            >
              <PixelArrow className="size-4" />
            </button>

            <button
              type="button"
              className="grid place-items-center transition hover:bg-[#f1eee5]"
            >
              <PixelArrow className="size-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MistralScrollSequence() {
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 30,
    mass: 0.72,
  });

  const panelWidth = useTransform(p, [0.02, 0.42], ["33.333%", "100%"]);
  const textScale = useTransform(p, [0.02, 0.42], [0.48, 1]);

  const headlineY = useTransform(p, [0.02, 0.42], [0, -402]);
  const mosaicScale = useTransform(p, [0.02, 0.42], [1, 0]);

  const newsOpacity = useTransform(p, [0.02, 0.08], [1, 0]);
  const newsX = useTransform(p, [0.02, 0.28], [0, -38]);
  const newsY = useTransform(p, [0.02, 0.28], [0, 54]);

  const leftOpacity = useTransform(p, [0.02, 0.38, 0.42], [1, 1, 0.95]);

  const iconOpacity = useTransform(p, [0.3, 0.42], [0, 1]);
  const iconY = useTransform(p, [0.3, 0.42], [18, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative h-[220vh] bg-[#fbfaf5] text-[#111]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fbfaf5]">
        <div className="relative z-10 flex h-full flex-col justify-center gap-7 px-5 py-24 lg:hidden">
          <div className="inline-flex w-fit items-center gap-2 border border-[#111]/10 bg-white/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fa520f]">
            <PixelLogo className="w-6" />
            FashionTrend AI
          </div>

          <h1 className="font-sans text-[52px] font-semibold leading-[0.95] tracking-[-3px] sm:text-[76px]">
            Prediksi tren.
            <br />
            Dari satu gambar.
          </h1>

          <p className="max-w-lg text-base leading-7 text-[#414141]">
            Upload gambar produk fashion. Sistem membaca kategori, confidence
            score, trend score, dan status tren langsung di browser.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center gap-2 bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#fa520f]"
            >
              Mulai Prediksi
              <PixelArrow className="size-4" />
            </Link>

            <a
              href="#workflow"
              className="inline-flex items-center justify-center border border-[#111]/10 bg-white/60 px-6 py-3.5 text-sm font-semibold transition hover:bg-[#f1eee5]"
            >
              Lihat Alur
            </a>
          </div>
        </div>

        <div className="relative z-10 hidden h-full w-full lg:block">
          <div className="absolute bottom-0 left-1/2 top-12 z-0 w-full max-w-[1728px] -translate-x-1/2 border-x border-[#111]/10">
            <motion.div
              style={{ opacity: leftOpacity }}
              className="absolute bottom-0 left-0 top-0 z-10 flex w-[66.666%] flex-col border-r border-[#111]/10"
            >
              <div className="flex h-[60%] flex-col justify-center overflow-hidden border-b border-[#111]/10 px-12 pb-10 xl:px-16 2xl:px-20">
                <motion.h1
                  style={{ y: headlineY }}
                  className="font-sans text-[82px] font-semibold leading-[1.02] tracking-[-5px] text-[#050505] xl:text-[98px] 2xl:text-[112px]"
                >
                  Prediksi tren.
                  <br />
                  Dari satu gambar.
                </motion.h1>
              </div>

              <motion.div
                style={{ scale: mosaicScale }}
                className="relative h-[40%] origin-top-left will-change-transform"
              >
                <PixelMosaic />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ width: panelWidth }}
              className="absolute bottom-0 right-0 top-0 z-20 flex origin-right flex-col border-l border-[#111]/10 bg-[#fbfaf5] will-change-[width]"
            >
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  style={{ scale: textScale }}
                  className="flex w-full origin-center flex-col items-center justify-center px-10 text-center will-change-transform"
                >
                  <motion.div
                    style={{ opacity: iconOpacity, y: iconY }}
                    className="mb-8 flex justify-center gap-4"
                  >
                    {[
                      { Icon: Shirt, label: "Fashion input" },
                      { Icon: Brain, label: "CNN model" },
                      { Icon: BarChart3, label: "Trend output" },
                    ].map(({ Icon, label }) => (
                      <div
                        key={label}
                        className="flex size-12 place-items-center justify-center overflow-hidden border border-[#111]/10 bg-white/50 xl:size-14"
                      >
                        <Icon
                          size={24}
                          strokeWidth={1.7}
                          className="text-[#111]"
                        />
                      </div>
                    ))}
                  </motion.div>

                  <div className="max-w-[1000px]">
                    <p className="whitespace-nowrap font-sans text-[44px] font-medium leading-[0.98] tracking-[-2px] text-[#111] xl:text-[56px] 2xl:text-[68px]">
                      Kami bantu membaca
                      <br />
                      tren fashion dari
                      <br />
                      satu gambar produk.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                style={{
                  opacity: newsOpacity,
                  x: newsX,
                  y: newsY,
                }}
                className="pointer-events-auto absolute bottom-0 left-0 h-[40%] w-full overflow-hidden border-t border-[#111]/10 bg-[#fbfaf5] will-change-transform"
              >
                <MiniFeaturedNews />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfiniteLogoMarquee({ items }) {
  const trackRef = useRef(null);
  const loopWidthRef = useRef(0);
  const directionRef = useRef(-1);
  const lastScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const x = useMotionValue(0);

  const { scrollY } = useScroll();

  const normalizeX = (value) => {
    const loopWidth = loopWidthRef.current;

    if (!loopWidth) return value;

    let nextValue = value;

    while (nextValue <= -loopWidth) {
      nextValue += loopWidth;
    }

    while (nextValue >= 0) {
      nextValue -= loopWidth;
    }

    return nextValue;
  };

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      loopWidthRef.current = trackRef.current.scrollWidth / 2;
      x.set(normalizeX(x.get()));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [items, x]);

  useEffect(() => {
    lastScrollRef.current = scrollY.get();

    return scrollY.on("change", (latest) => {
      const previous = lastScrollRef.current;

      if (latest > previous) directionRef.current = -1;
      if (latest < previous) directionRef.current = 1;

      lastScrollRef.current = latest;
    });
  }, [scrollY]);

  useAnimationFrame((_, delta) => {
    const loopWidth = loopWidthRef.current;

    if (!loopWidth || isDraggingRef.current) return;

    const speed = delta * 0.045;
    const nextX = normalizeX(x.get() + directionRef.current * speed);

    x.set(nextX);
  });

  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      id="customers"
      className="relative z-0 isolate scroll-mt-16 overflow-hidden border-b border-[#111]/10 bg-[#fbfaf5]"
    >
      <motion.div
        ref={trackRef}
        style={{ x, touchAction: "pan-y" }}
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDrag={(_, info) => {
          if (info.delta.x > 0) directionRef.current = 1;
          if (info.delta.x < 0) directionRef.current = -1;

          x.set(normalizeX(x.get()));
        }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.velocity.x) > 10) {
            directionRef.current = info.velocity.x > 0 ? 1 : -1;
          }

          x.set(normalizeX(x.get()));
          isDraggingRef.current = false;
        }}
        className="relative z-0 flex w-max cursor-grab select-none active:cursor-grabbing will-change-transform"
      >
        {repeatedItems.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="grid h-20 min-w-[150px] shrink-0 place-items-center border-r border-[#111]/10 px-6 sm:min-w-[170px] lg:min-w-[190px]"
          >
            <span className="pointer-events-none font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#111]/40">
              {logo}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FeaturedNewsSection() {
  const logos = [
    "CNN",
    "TFJS",
    "REACT",
    "VITE",
    "MODEL",
    "TREND",
    "IMAGE",
    "WEB",
    "DATA",
    "UI",
    "API",
    "FAST",
  ];

  const newsItems = [
    "Image upload becomes structured AI input.",
    "Confidence score makes predictions readable.",
    "Trend score maps category output to product insight.",
  ];

  return (
    <section id="news" className="border-y border-[#111]/10 bg-[#fbfaf5]">
      <div className="mx-auto max-w-[1728px] border-x border-[#111]/10">
        <div className="grid border-b border-[#111]/10 lg:grid-cols-[220px_1fr]">
          <div className="border-b border-[#111]/10 px-5 py-5 lg:border-b-0 lg:border-r lg:px-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
              Featured news
            </p>
          </div>

          <div className="grid lg:grid-cols-3">
            {newsItems.map((item) => (
              <a
                key={item}
                href="#workflow"
                className="group flex min-h-36 flex-col justify-between border-b border-r border-[#111]/10 p-5 transition hover:bg-[#f1eee5] lg:border-b-0 lg:p-6"
              >
                <h3 className="max-w-lg font-sans text-[26px] font-semibold leading-[1.05] tracking-[-1px] text-[#111]">
                  {item}
                </h3>

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#fa520f]">
                    Read more
                  </span>
                  <PixelArrow className="size-4 transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <InfiniteLogoMarquee items={logos} />

        <div id="workflow" className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[500px] border-b border-[#111]/10 p-5 lg:border-b-0 lg:border-r lg:p-8 xl:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
                  FashionTrend workflow
                </p>

                <h2 className="mt-8 max-w-4xl font-sans text-[52px] font-semibold leading-[0.95] tracking-[-3px] text-[#111] sm:text-6xl xl:text-[86px]">
                  From image to product intelligence.
                </h2>
              </div>

              <Link
                to="/predict"
                className="mt-10 inline-flex w-fit items-center gap-2 bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#fa520f]"
              >
                Start analysing
                <PixelArrow className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2">
            {[
              {
                title: "Upload",
                desc: "Gambar produk masuk dari perangkat pengguna.",
                icon: UploadCloud,
              },
              {
                title: "Preprocess",
                desc: "Gambar disiapkan menjadi tensor yang sesuai.",
                icon: Database,
              },
              {
                title: "Predict",
                desc: "Model CNN membaca pola visual dan kategori.",
                icon: Brain,
              },
              {
                title: "Insight",
                desc: "Confidence dan trend score ditampilkan.",
                icon: Activity,
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={cx(
                  "min-h-[250px] border-[#111]/10 bg-[#fffbef] p-6",
                  index % 2 === 0 && "sm:border-r",
                  index < 2 && "border-b",
                  index >= 2 && "border-b sm:border-b-0"
                )}
              >
                <item.icon
                  size={26}
                  strokeWidth={1.8}
                  className="text-[#fa520f]"
                />

                <h3 className="mt-8 font-sans text-4xl font-semibold leading-none tracking-[-1px] text-[#111]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-[#4a4a4a]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const productSuiteItems = [
  {
    id: "autonomous-analysis",
    title: "Autonomous analysis.",
    desc: "Alur prediksi membaca gambar, menilai kategori, dan merapikan hasil menjadi insight yang mudah dibaca.",
    cta: "Discover analysis",
    icon: Layers3,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Fashion product display with clothing rack",
    tags: [
      "Image classification",
      "Trend score mapping",
      "Reusable prediction flow",
      "Visual product reading",
      "Prediction summary",
    ],
  },
  {
    id: "browser-inference",
    title: "Browser inference.",
    desc: "Model dijalankan langsung dari halaman prediksi, cocok untuk demo cepat tanpa backend yang berlebihan.",
    cta: "Open system",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Code editor on a computer screen",
    tags: [
      "TensorFlow.js model loading",
      "Client-side preprocessing",
      "Fast visual feedback",
      "Local image input",
      "Frontend inference",
    ],
  },
  {
    id: "product-intelligence",
    title: "Product intelligence.",
    desc: "Hasil prediksi tidak berhenti di label, tapi diterjemahkan menjadi status tren yang langsung bisa dipahami.",
    cta: "View features",
    icon: Boxes,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Fashion portrait for style analysis",
    tags: [
      "Category output",
      "Confidence reading",
      "Trend status",
      "Readable result",
      "Decision support",
    ],
  },
  {
    id: "model-control",
    title: "Model control.",
    desc: "Struktur model, class mapping, dan output bisa disusun jelas untuk kebutuhan demo akademik maupun pengembangan.",
    cta: "Inspect model",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Technology server and system interface",
    tags: [
      "Model metadata",
      "Class labels",
      "Inference pipeline",
      "Output mapping",
      "Evaluation ready",
    ],
  },
  {
    id: "reliable-interface",
    title: "Reliable interface.",
    desc: "UI dibuat konsisten agar pengguna memahami proses tanpa harus membaca isi kepala developer.",
    cta: "View interface",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Clothing collection arranged in retail display",
    tags: [
      "Clear states",
      "Accessible actions",
      "Readable outputs",
      "Responsive layout",
      "Simple interaction",
    ],
  },
];

function ProductButton({ to = "/predict", children }) {
  return (
    <Link
      to={to}
      className="group inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-[#f1eee5] px-3 text-sm font-semibold text-[#111] transition hover:bg-[#111] hover:text-white md:h-12 md:px-4"
    >
      <span className="hidden items-center gap-2 md:inline-flex">
        <span className="grid size-5 -translate-x-8 place-items-center opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <PixelArrow className="size-5" />
        </span>

        <span className="whitespace-nowrap transition duration-300 group-hover:translate-x-1">
          {children}
        </span>

        <span className="grid size-5 place-items-center transition duration-300 group-hover:translate-x-8 group-hover:opacity-0">
          <PixelArrow className="size-5" />
        </span>
      </span>

      <span className="grid size-10 place-items-center md:hidden">
        <PixelArrow className="size-5" />
      </span>
    </Link>
  );
}

function ProductVisual({ item, index }) {
  const Icon = item.icon;

  return (
    <div className="relative h-[360px] overflow-hidden bg-[#161728] md:h-[560px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 grayscale md:bg-fixed"
        style={{
          backgroundImage: `url(${item.image})`,
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,32,0.34),rgba(18,18,32,0.94))]" />

      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-70">
        {Array.from({ length: 96 }).map((_, cellIndex) => (
          <span
            key={cellIndex}
            className={`border-b border-r border-white/[0.08] ${
              (cellIndex + index) % 17 === 0
                ? "bg-white/[0.075]"
                : (cellIndex + index) % 29 === 0
                ? "bg-[#fa520f]/20"
                : ""
            }`}
          />
        ))}
      </div>

      <div className="absolute left-5 top-5 bg-[#fbfaf5]/95 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#111] md:left-6 md:top-6">
        FashionTrend / 0{index + 1}
      </div>

      <div className="absolute right-5 top-5 grid size-11 place-items-center bg-[#fbfaf5]/95 text-[#fa520f] md:right-6 md:top-6 md:size-12">
        <Icon size={23} strokeWidth={1.7} />
      </div>

      <div className="absolute left-1/2 top-1/2 w-[82%] max-w-[580px] -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-[#23243a]/90 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.32)] md:p-7">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#ffaf01]">
          Running visual analysis
        </p>

        <div className="space-y-3 font-mono text-xs leading-6 text-white/76 md:text-sm">
          <p>
            <span className="text-[#8ee5c2]">✓</span> Image input validated
          </p>
          <p>
            <span className="text-[#8ee5c2]">✓</span> Fashion attributes mapped
          </p>
          <p>
            <span className="text-[#27d7d7]">●</span>{" "}
            <span className="text-[#ffcf69]">trend_score</span> =
            analyse(image)
          </p>
          <p>
            <span className="text-[#27d7d7]">●</span>{" "}
            <span className="text-[#ffcf69]">status</span> = generateInsight()
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-white/15 pt-4 md:bottom-6 md:left-6 md:right-6">
        <p className="max-w-[320px] font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-white/60">
          {item.title}
        </p>

        <PixelArrow className="size-4 text-[#ffaf01]" />
      </div>
    </div>
  );
}

function ProductSuiteSection() {
  return (
    <section
      id="products"
      className="w-full scroll-mt-12  bg-[#fbfaf5]"
    >
      <div className="mx-auto w-full max-w-[1728px] border-x border-[#111]/10">
        <div className="grid md:grid-cols-[88px_minmax(0,1fr)] xl:grid-cols-[104px_minmax(0,1fr)]">
          <aside className="hidden border-r border-[#111]/10 md:block">
            <div className="sticky top-12 flex h-[calc(100vh-48px)] items-center justify-center">
              <nav aria-label="Product summary">
                <ul className="flex flex-col gap-2 rounded-xl border border-[#111]/10 bg-[#fbfaf5] p-2 shadow-[8px_8px_0_rgba(17,17,17,0.06)]">
                  {productSuiteItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <li key={item.id}>
                        <motion.button
                          type="button"
                          initial={{ y: 28, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, margin: "-20% 0px" }}
                          transition={{
                            duration: 0.42,
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.06,
                          }}
                          onClick={() => {
                            const target = document.getElementById(item.id);

                            if (!target) return;

                            target.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                          className="group grid size-9 place-items-center rounded-md bg-[#f1eee5] text-[#111]/55 transition hover:bg-[#111] hover:text-white"
                          aria-label={item.title}
                        >
                          <Icon size={17} strokeWidth={1.8} />
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid border-b border-[#111]/10 md:grid-cols-[220px_1fr]">
              <div className="border-b border-[#111]/10 px-4 py-6 md:border-b-0 md:border-r md:px-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
                  Summary
                </p>
              </div>

              <div className="p-4 md:p-6">
                <h2 className="max-w-5xl font-sans text-[44px] font-semibold leading-[0.94] tracking-[-2.4px] text-[#111] sm:text-6xl xl:text-[88px]">
                  Do it all with FashionTrend.
                </h2>
              </div>
            </div>

            {productSuiteItems.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-16 border-b border-[#111]/10 bg-[#fbfaf5] last:border-b-0"
              >
                <div className="flex w-full overflow-x-auto border-b border-[#111]/10">
                  {item.tags.map((tag) => (
                    <p
                      key={tag}
                      className="shrink-0 border-r border-[#111]/10 bg-[#f1eee5] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#111]/72"
                    >
                      {tag}
                    </p>
                  ))}
                </div>

                <div className="flex min-h-[104px] items-center justify-between gap-4 border-b border-[#111]/10 px-4 md:px-6">
                  <div className="min-w-0 pr-4">
                    <p className="truncate font-sans text-[30px] font-semibold leading-none tracking-[-1.2px] text-[#111] md:text-[42px]">
                      {item.title}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <ProductButton to="/predict">{item.cta}</ProductButton>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <p className="mb-4 max-w-5xl text-base leading-7 text-[#222] md:mb-6 md:text-lg md:leading-8">
                    {item.desc}
                  </p>

                  <ProductVisual item={item} index={index} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: ImageUp,
      title: "Upload produk",
      desc: "Pengguna memasukkan gambar produk fashion dari perangkat lokal.",
    },
    {
      icon: ScanSearch,
      title: "Preprocessing",
      desc: "Gambar diproses menjadi tensor sesuai kebutuhan model.",
    },
    {
      icon: Brain,
      title: "Prediksi CNN",
      desc: "Model membaca pola visual dan menghasilkan kategori.",
    },
    {
      icon: LineChart,
      title: "Trend insight",
      desc: "Kategori dipetakan ke trend score dan status tren.",
    },
  ];

  return (
    <section id="features" className=" ">
      <div className="mx-auto max-w-[1728px] border-y border-[#111]/10 border-x border-[#111]/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <motion.div
              key={item.title}
              // whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group min-h-[280px] border-b border-r border-[#111]/10 bg-[#fbfaf5] p-6 transition hover:bg-[#f1eee5] sm:p-8"
            >
              <div className="grid h-12 w-12 place-items-center bg-[#fa520f] text-white transition group-hover:bg-[#111]">
                <item.icon size={22} />
              </div>

              <h3 className="mt-10 font-sans text-4xl font-semibold leading-none tracking-[-1.5px] text-[#111]">
                {item.title}
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#4a4a4a]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImplementationSection() {
  return (
    <section id="implementation" className="bg-[#fbfaf5]">
      <div className="mx-auto grid max-w-[1728px] border-x border-b border-[#111]/10 lg:grid-cols-[220px_1fr]">
        <div className="border-b border-[#111]/10 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
            Implementation
          </p>
        </div>

        <div className="grid min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between border-b border-[#111]/10 p-5 sm:p-8 lg:border-b-0 lg:border-r xl:p-10">
            <div>
              <h2 className="max-w-4xl font-sans text-[52px] font-semibold leading-[0.95] tracking-[-3px] text-[#111] sm:text-6xl xl:text-[86px]">
                Model berjalan langsung di halaman prediksi.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#3d3d3d]">
                TensorFlow.js memuat model dari folder public, memproses gambar,
                lalu mengembalikan kategori, confidence, trend score, dan status
                tren.
              </p>
            </div>

            <Link
              to="/predict"
              className="mt-10 inline-flex w-fit items-center gap-2 bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#fa520f]"
            >
              Coba Sekarang
              <PixelArrow className="size-4" />
            </Link>
          </div>

          <div className="m-5 overflow-hidden border border-[#111]/10 bg-[#101011] text-white sm:m-8 xl:m-10">
            <div className="border-b border-white/10 px-5 py-4 font-mono text-xs text-white/40 sm:px-6 sm:text-sm">
              src/utils/modelUtils.js
            </div>

            <div className="overflow-x-auto px-5 py-6 sm:px-6">
              <div className="min-w-[520px] space-y-5 font-mono text-xs leading-7 text-white/72 sm:text-sm">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="bg-[#fbfaf5]">
      <div className="mx-auto max-w-[1728px] border-x border-b border-[#111]/10">
        <div className="grid min-h-[540px] ">
          <div className="flex flex-col justify-between border-b border-[#111]/10 p-5 sm:p-8 lg:border-b-0  xl:p-10">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fa520f]">
                Start analysing
              </p>

              <h2 className="mt-8 max-w-5xl font-sans text-[58px] font-semibold leading-[0.9] tracking-[-3px] text-[#111] sm:text-7xl xl:text-[108px]">
                Build your own fashion prediction flow.
              </h2>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/predict"
                className="inline-flex w-fit items-center gap-2 bg-[#111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#fa520f]"
              >
                Start analysing
                <PixelArrow className="size-4" />
              </Link>

              <a
                href="#workflow"
                className="inline-flex w-fit items-center gap-2 border border-[#111]/10 px-5 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#f1eee5]"
              >
                View workflow
                <PixelArrow className="size-4" />
              </a>
            </div>
          </div>

          {/* <div className="grid bg-[#ffe8a5] p-5 sm:p-8 xl:p-10">
            <div className="grid place-items-center border border-[#111]/10 bg-[#fbfaf5]">
              <PixelLogo className="w-40" />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf5] text-[#111]">
      <Header />

      <main>
        <MistralScrollSequence />
        <FeaturedNewsSection />
        <ProductSuiteSection />
        <FeaturesSection />
        <ImplementationSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import footerSvgRaw from "../assets/fashion-footer-mark.svg?raw";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "Prediction", to: "/predict" },
      { label: "Image Upload", to: "/predict" },
      { label: "Trend Result", to: "/predict" },
      { label: "Fashion Insight", to: "/predict" },
    ],
  },
  {
    title: "Model",
    links: [
      { label: "CNN Classifier", to: "/predict" },
      { label: "EfficientNetB2", to: "/predict" },
      { label: "Confidence Score", to: "/predict" },
      { label: "Trend Score", to: "/predict" },
      { label: "Top Prediction", to: "/predict" },
    ],
  },
  {
    title: "Technology",
    links: [
      { label: "React", href: "https://react.dev/" },
      { label: "Vite", href: "https://vite.dev/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
      { label: "TensorFlow.js", href: "https://www.tensorflow.org/js" },
      { label: "Framer Motion", href: "https://motion.dev/" },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "Repository",
        href: "https://github.com/Ananta-TI/Fashion-Trend.git",
      },
      {
        label: "Portfolio",
        href: "https://ananta-ti.vercel.app/",
      },
      {
        label: "Live Demo",
        href: "https://fash-trend.vercel.app/",
      },
      {
        label: "Developer",
        href: "https://github.com/Ananta-TI",
      },
    ],
  },
];

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function getColorFamily(fill) {
  if (!fill || !fill.startsWith("#")) return "neutral";

  const { r, g, b } = hexToRgb(fill);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const brightness = (r + g + b) / 3;

  if (brightness < 55) return "dark";

  if (r > 180 && g > 120 && b < 70) {
    if (g > 170) return "yellow";
    return "orange";
  }

  if (r > 170 && g < 95 && b < 70) return "red";

  if (r > 100 && g > 70 && b < 80 && max - min < 130) return "brown";

  return "neutral";
}

function extractSvgParts(svgText) {
  const widthMatch = svgText.match(/width="([^"]+)"/i);
  const heightMatch = svgText.match(/height="([^"]+)"/i);
  const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/i);

  const width = widthMatch?.[1] || "2000";
  const height = heightMatch?.[1] || "2000";
  const viewBox = viewBoxMatch?.[1] || `0 0 ${width} ${height}`;

  const pathMatches = [...svgText.matchAll(/<path\b[^>]*\/?>/gi)];

  const groups = {
    dark: [],
    brown: [],
    red: [],
    orange: [],
    yellow: [],
    neutral: [],
  };

  pathMatches.forEach((match, index) => {
    const tag = match[0];
    const fill = tag.match(/fill="([^"]+)"/i)?.[1] || "#111111";
    const family = getColorFamily(fill);

    groups[family].push({
      id: `${family}-${index}`,
      tag,
      fill,
    });
  });

  return {
    viewBox,
    groups,
  };
}

function GitHubIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.49 0 12.26c0 5.42 3.44 10.02 8.2 11.64.6.11.82-.27.82-.59 0-.29-.01-1.06-.02-2.08-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.33-1.8-1.33-1.8-1.09-.76.08-.75.08-.75 1.2.09 1.84 1.26 1.84 1.26 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.36-5.47-6.07 0-1.34.47-2.44 1.24-3.3-.12-.31-.54-1.57.12-3.25 0 0 1.01-.33 3.3 1.26A11.2 11.2 0 0 1 12 5.91c1.02.01 2.05.14 3.01.41 2.29-1.59 3.3-1.26 3.3-1.26.66 1.68.24 2.94.12 3.25.77.86 1.24 1.96 1.24 3.3 0 4.72-2.81 5.75-5.49 6.06.43.38.81 1.12.81 2.26 0 1.63-.02 2.95-.02 3.35 0 .33.22.71.83.59A12.2 12.2 0 0 0 24 12.26C24 5.49 18.63 0 12 0Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.1h4.56V24H.22V8.1ZM7.9 8.1h4.37v2.17h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-8.08c0-1.93-.03-4.41-2.69-4.41-2.7 0-3.11 2.11-3.11 4.28V24H7.9V8.1Z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function FooterLink({ item }) {
  const className =
    "group inline-flex w-fit items-center gap-1 font-serif text-[28px] leading-[1.02] tracking-[-0.04em] text-[#1f1f1f] transition hover:text-[#fa520f] sm:text-[34px] md:text-[38px]";

  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        <span>{item.label}</span>
        <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span>{item.label}</span>
      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </a>
  );
}

function SocialButton({ href, label, children }) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      aria-label={label}
      className="group grid h-12 w-12 place-items-center border border-[#1f1f1f]/15 text-[#1f1f1f] transition hover:bg-[#1f1f1f] hover:text-white"
    >
      <motion.span
        whileHover={{ y: -2, rotate: -4, scale: 1.08 }}
        transition={{ duration: 0.2 }}
        className="grid place-items-center"
      >
        {children}
      </motion.span>
    </a>
  );
}

const layerEase = [0.16, 1, 0.3, 1];
const pathEase = [0.22, 1, 0.36, 1];
const ambientEase = [0.45, 0, 0.55, 1];

const layerConfig = {
  orange: {
    delay: 0,
    duration: 0.78,
    stagger: 0.0038,
    from: { x: 72, y: 18, scale: 0.985, rotate: -1.2 },
    pathFrom: { x: 18, y: 0, scale: 0.985 },
    filter: "drop-shadow(0 20px 40px rgba(250,82,15,0.3))",
  },
  yellow: {
    delay: 0.18,
    duration: 0.72,
    stagger: 0.0038,
    from: { x: -58, y: 10, scale: 0.99, rotate: 1 },
    pathFrom: { x: -18, y: 0, scale: 0.988 },
    filter: "drop-shadow(0 20px 40px rgba(255,217,0,0.22))",
  },
  neutral: {
    delay: 0.34,
    duration: 0.68,
    stagger: 0.0035,
    from: { x: 0, y: 34, scale: 0.975, rotate: 0 },
    pathFrom: { x: 0, y: 10, scale: 0.985 },
    filter: "drop-shadow(0 18px 34px rgba(80,80,80,0.12))",
  },
  brown: {
    delay: 0.48,
    duration: 0.7,
    stagger: 0.0035,
    from: { x: -26, y: 42, scale: 0.98, rotate: -0.65 },
    pathFrom: { x: -8, y: 14, scale: 0.985 },
    filter: "drop-shadow(0 18px 35px rgba(120,70,30,0.2))",
  },
  dark: {
    delay: 0.62,
    duration: 0.82,
    stagger: 0.003,
    from: { x: 0, y: 52, scale: 0.96, rotate: 0 },
    pathFrom: { x: 0, y: 18, scale: 0.982 },
    filter: "drop-shadow(0 24px 48px rgba(16,22,32,0.28))",
  },
  red: {
    delay: 0.82,
    duration: 0.66,
    stagger: 0.004,
    from: { x: 38, y: -30, scale: 0.985, rotate: 1.15 },
    pathFrom: { x: 12, y: -10, scale: 0.988 },
    filter: "drop-shadow(0 18px 38px rgba(196,0,29,0.25))",
  },
};

function SvgLayer({ name, paths }) {
  const config = layerConfig[name];

  if (!config || !paths?.length) return null;

  return (
    <motion.g
      style={{
        filter: config.filter,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
      initial={{
        opacity: 0,
        x: config.from.x,
        y: config.from.y,
        scale: config.from.scale,
        rotate: config.from.rotate,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        ease: layerEase,
      }}
    >
      {paths.map((item, index) => (
        <motion.g
          key={item.id}
          initial={{
            opacity: 0,
            x: config.pathFrom.x,
            y: config.pathFrom.y,
            scale: config.pathFrom.scale,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{
            duration: 0.42,
            delay: config.delay + 0.08 + Math.min(index * config.stagger, 0.42),
            ease: pathEase,
          }}
          dangerouslySetInnerHTML={{ __html: item.tag }}
        />
      ))}
    </motion.g>
  );
}

function AnimatedSeparatedSvg() {
  const { viewBox, groups } = useMemo(
    () => extractSvgParts(footerSvgRaw),
    []
  );

  return (
    <motion.div
      className="relative mx-auto flex h-[280px] w-full max-w-[620px] items-center justify-center overflow-hidden sm:h-[360px] lg:h-[430px]"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: 0.8,
        ease: layerEase,
      }}
    >
      <motion.div
        className="absolute h-[74%] w-[74%] rounded-full bg-[#fa520f]/20 blur-[90px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: ambientEase,
        }}
      />

      <motion.div
        className="absolute h-[64%] w-[64%] rounded-full bg-[#ffd900]/20 blur-[90px]"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: ambientEase,
        }}
      />

      <motion.svg
        viewBox={viewBox}
        className="relative z-10 h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        initial={{
          opacity: 0,
          scale: 0.985,
          filter: "blur(8px)",
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{
          duration: 0.6,
          ease: layerEase,
        }}
      >
        <SvgLayer name="orange" paths={groups.orange} />
        <SvgLayer name="yellow" paths={groups.yellow} />
        <SvgLayer name="neutral" paths={groups.neutral} />
        <SvgLayer name="brown" paths={groups.brown} />
        <SvgLayer name="dark" paths={groups.dark} />
        <SvgLayer name="red" paths={groups.red} />
      </motion.svg>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-30 h-1 w-48 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#fa520f]/70 to-transparent blur-sm"
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 0.65,
        }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{
          duration: 1.15,
          delay: 1.05,
          ease: layerEase,
        }}
      />
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f]/15 bg-[#fff8e0] text-[#1f1f1f]">
      <div className="h-8 border-b border-[#1f1f1f]/15 bg-[linear-gradient(90deg,#c4001d_0%,#fa520f_28%,#ffa110_55%,#ffd900_78%,#fff8e0_100%)]" />

      <div className="mx-auto max-w-[1728px] border-x border-[#1f1f1f]/15">
        <div className="grid grid-cols-1 divide-y divide-[#1f1f1f]/15 border-b border-[#1f1f1f]/15 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
          {footerColumns.map((column) => (
            <div
              key={column.title}
              className="flex min-h-[300px] flex-col gap-6 px-5 py-8 sm:px-8 md:min-h-[440px] md:py-10 lg:px-10"
            >
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#77705f]">
                {column.title}
              </h3>

              <ul className="flex flex-col gap-2">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 border-b border-[#1f1f1f]/15 lg:grid-cols-2 lg:divide-x lg:divide-[#1f1f1f]/15">
          <div className="flex min-h-[360px] flex-col justify-between gap-10 px-5 py-8 sm:px-8 md:py-10 lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#77705f]">
                FashionTrend AI
              </p>

              <h2 className="max-w-4xl font-serif text-[44px] leading-[0.95] tracking-[-0.055em] text-[#1f1f1f] sm:text-[64px] md:text-[82px] lg:text-[96px]">
                Predict fashion trends from a single image.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <SocialButton
                href="https://github.com/Ananta-TI/Fashion-Trend.git"
                label="GitHub Repository"
              >
                <GitHubIcon />
              </SocialButton>

              <SocialButton
                href="https://github.com/Ananta-TI"
                label="GitHub Profile"
              >
                <GitHubIcon />
              </SocialButton>

              <SocialButton href="https://www.linkedin.com/" label="LinkedIn">
                <LinkedinIcon />
              </SocialButton>

              <SocialButton
                href="https://www.instagram.com/ntakunti_14"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialButton>

              <SocialButton
                href="mailto:ananta23ti@mahasiswa.pcr.ac.id"
                label="Email"
              >
                <MailIcon />
              </SocialButton>
            </div>
          </div>

          <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 md:py-10 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,82,15,0.2),transparent_38%),radial-gradient(circle_at_25%_90%,rgba(255,217,0,0.2),transparent_35%)]" />

            <div className="relative z-10 flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#77705f]">
                  Visual system
                </p>

                <p className="mt-4 max-w-md text-base leading-7 text-[#4a4a4a]">
                  Sistem ini menggabungkan klasifikasi gambar, confidence score,
                  dan trend score untuk membaca potensi kategori produk fashion
                  secara visual.
                </p>
              </div>

              <Link
                to="/predict"
                className="group hidden shrink-0 items-center gap-2 border border-[#1f1f1f]/15 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[#1f1f1f] hover:text-white sm:inline-flex"
              >
                Try now
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="relative z-10 mt-8">
              <AnimatedSeparatedSvg />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5 font-mono text-xs uppercase tracking-[0.16em] text-[#77705f] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 FashionTrend AI</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>React</span>
            <span>TensorFlow.js</span>
            <span>Deep Learning</span>
            <span>Fashion Analytics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { useMemo } from "react";
import { motion } from "framer-motion";
import logoRaw from "../assets/fashion-footer-mark.svg?raw";

const slices = [
  {
    clipPath: "inset(0 80% 0 0)",
    initial: { x: -90, opacity: 0, filter: "blur(12px)" },
    delay: 0,
  },
  {
    clipPath: "inset(0 60% 0 20%)",
    initial: { y: 90, opacity: 0, filter: "blur(12px)" },
    delay: 0.1,
  },
  {
    clipPath: "inset(0 40% 0 40%)",
    initial: { scale: 0.94, opacity: 0, filter: "blur(12px)" },
    delay: 0.2,
  },
  {
    clipPath: "inset(0 20% 0 60%)",
    initial: { y: -90, opacity: 0, filter: "blur(12px)" },
    delay: 0.3,
  },
  {
    clipPath: "inset(0 0 0 80%)",
    initial: { x: 100, opacity: 0, filter: "blur(12px)" },
    delay: 0.4,
  },
];

function cleanSvg(svg) {
  return svg
    .replace(/<svg/i, '<svg class="flat-fashion-svg" preserveAspectRatio="xMidYMid meet"')
    .replace(/\swidth="[^"]*"/gi, "")
    .replace(/\sheight="[^"]*"/gi, "");
}

function SvgRaw() {
  const svg = useMemo(() => cleanSvg(logoRaw), []);

  return (
    <div
      className="h-full w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function AnimatedFlatFashionMark({ className = "" }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center overflow-visible ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <style>
        {`
          .flat-fashion-svg {
            width: 100%;
            height: 100%;
            display: block;
            overflow: visible;
          }

          .flat-fashion-svg path {
            fill: #FA520F !important;
            stroke: none !important;
          }

          .flat-fashion-svg [fill="none"] {
            fill: none !important;
          }
        `}
      </style>

      <motion.div
        className="absolute h-[78%] w-[78%] rounded-full bg-[#fa520f]/20 blur-[95px]"
        animate={{
          scale: [1, 1.16, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute h-[68%] w-[68%] rounded-full bg-[#ffaf01]/20 blur-[95px]"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.22, 0.5, 0.22],
        }}
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 h-full w-full"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -0.35, 0.35, 0],
          scale: [1, 1.012, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {slices.map((slice, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              clipPath: slice.clipPath,
              WebkitClipPath: slice.clipPath,
            }}
            initial={slice.initial}
            whileInView={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              duration: 0.85,
              delay: slice.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SvgRaw />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        animate={{
          x: ["-145%", "145%"],
          opacity: [0, 0.65, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 1.7,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-[12%] left-1/2 z-30 h-1 w-52 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#fa520f]/70 to-transparent blur-sm"
        animate={{
          scaleX: [0.45, 1, 0.45],
          opacity: [0.2, 0.65, 0.2],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
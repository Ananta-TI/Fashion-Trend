import { motion } from "framer-motion";
import logoRaw from "../assets/fashion-footer-mark.svg?raw";

const slices = [
  {
    clipPath: "inset(0 83.333% 0 0)",
    initial: { x: -90, y: 0, opacity: 0, filter: "blur(14px)" },
    delay: 0,
  },
  {
    clipPath: "inset(0 66.666% 0 16.666%)",
    initial: { x: 0, y: 80, opacity: 0, filter: "blur(14px)" },
    delay: 0.1,
  },
  {
    clipPath: "inset(0 50% 0 33.333%)",
    initial: { x: 0, y: -80, opacity: 0, filter: "blur(14px)" },
    delay: 0.2,
  },
  {
    clipPath: "inset(0 33.333% 0 50%)",
    initial: { x: 80, y: 0, opacity: 0, filter: "blur(14px)" },
    delay: 0.3,
  },
  {
    clipPath: "inset(0 16.666% 0 66.666%)",
    initial: { x: 0, y: 90, opacity: 0, filter: "blur(14px)" },
    delay: 0.4,
  },
  {
    clipPath: "inset(0 0 0 83.333%)",
    initial: { x: 100, y: -20, opacity: 0, filter: "blur(14px)" },
    delay: 0.5,
  },
];

function SvgContent({ className = "" }) {
  return (
    <div
      className={`h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible ${className}`}
      dangerouslySetInnerHTML={{ __html: logoRaw }}
    />
  );
}

export default function AnimatedOriginalFashionMark({ className = "" }) {
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
        className="absolute h-[68%] w-[68%] rounded-full bg-[#ffd900]/20 blur-[95px]"
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
          scale: [1, 1.01, 1],
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
              opacity: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              duration: 0.9,
              delay: slice.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SvgContent />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/75 to-transparent"
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
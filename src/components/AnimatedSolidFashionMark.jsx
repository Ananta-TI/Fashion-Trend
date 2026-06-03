import { motion } from "framer-motion";

const logoUrl = "/fashion-footer-mark-solid.svg";

const slices = [
  {
    clipPath: "inset(0% 0 87.5% 0)",
    fromX: 140,
  },
  {
    clipPath: "inset(12.5% 0 75% 0)",
    fromX: -140,
  },
  {
    clipPath: "inset(25% 0 62.5% 0)",
    fromX: 140,
  },
  {
    clipPath: "inset(37.5% 0 50% 0)",
    fromX: -140,
  },
  {
    clipPath: "inset(50% 0 37.5% 0)",
    fromX: 140,
  },
  {
    clipPath: "inset(62.5% 0 25% 0)",
    fromX: -140,
  },
  {
    clipPath: "inset(75% 0 12.5% 0)",
    fromX: 140,
  },
  {
    clipPath: "inset(87.5% 0 0% 0)",
    fromX: -140,
  },
];

const containerVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const sliceVariants = {
  hidden: (slice) => ({
    x: slice.fromX,
    opacity: 0,
    filter: "blur(12px)",
  }),
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedSolidFashionMark({ className = "" }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center overflow-visible ${className}`}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="absolute h-[82%] w-[82%] rounded-full bg-[#fa520f]/20 blur-[100px]"
        animate={{
          scale: [1, 1.16, 1],
          opacity: [0.22, 0.55, 0.22],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute h-[70%] w-[70%] rounded-full bg-[#ffaf01]/20 blur-[100px]"
        animate={{
          scale: [1.08, 0.96, 1.08],
          opacity: [0.2, 0.5, 0.2],
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
        <motion.div
          className="relative h-full w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          {slices.map((slice, index) => (
            <motion.div
              key={index}
              custom={slice}
              variants={sliceVariants}
              className="absolute inset-0"
              style={{
                clipPath: slice.clipPath,
                WebkitClipPath: slice.clipPath,
              }}
            >
              <img
                src={logoUrl}
                alt="FashionTrend visual mark"
                draggable="false"
                className="h-full w-full object-contain drop-shadow-[0_24px_50px_rgba(250,82,15,0.24)]"
                onError={(e) => {
                  console.error("SVG gagal dimuat:", e.currentTarget.src);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{
          x: ["-145%", "145%"],
          opacity: [0, 0.55, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 1.8,
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
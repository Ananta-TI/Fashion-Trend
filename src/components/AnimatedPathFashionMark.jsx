import { useMemo } from "react";
import { motion } from "framer-motion";
import logoRaw from "../assets/fashion-footer-mark-solid.svg?raw";

function getAttr(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match?.[1] || "";
}

function getTranslate(transform = "") {
  const match = transform.match(/translate\(([-\d.]+)[,\s]+([-\d.]+)\)/i);

  if (!match) {
    return { x: 0, y: 0 };
  }

  return {
    x: Number(match[1]) || 0,
    y: Number(match[2]) || 0,
  };
}

function parseSvg(svgText) {
  const viewBox =
    svgText.match(/viewBox="([^"]+)"/i)?.[1] || "0 0 2000 2000";

  const pathTags = [...svgText.matchAll(/<path\b[\s\S]*?>/gi)];

  const paths = pathTags.map((match, index) => {
    const tag = match[0];

    const d = getAttr(tag, "d");
    const fill = getAttr(tag, "fill") || "#FA520F";
    const stroke = getAttr(tag, "stroke");
    const strokeWidth = getAttr(tag, "stroke-width");
    const transform = getAttr(tag, "transform");

    const position = getTranslate(transform);

    return {
      id: `path-${index}`,
      index,
      d,
      fill,
      stroke,
      strokeWidth,
      transform,
      tx: position.x,
      ty: position.y,
    };
  });

  const sortedByPosition = [...paths].sort((a, b) => {
    if (Math.abs(a.ty - b.ty) > 8) return a.ty - b.ty;
    return a.tx - b.tx;
  });

  const orderMap = new Map();

  sortedByPosition.forEach((item, order) => {
    orderMap.set(item.id, order);
  });

  return {
    viewBox,
    paths: paths.map((item) => ({
      ...item,
      order: orderMap.get(item.id) ?? item.index,
    })),
  };
}

const svgVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

const pathVariants = {
  hidden: (item) => {
    const fromRight = item.order % 2 === 0;

    return {
      opacity: 0,
      x: fromRight ? 90 : -90,
      scale: 0.985,
      filter: "blur(8px)",
    };
  },

  visible: (item) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      delay: 0.08 + Math.min(item.order * 0.006, 2.25),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AnimatedPathFashionMark({ className = "" }) {
  const { viewBox, paths } = useMemo(() => parseSvg(logoRaw), []);

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

      <motion.svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full overflow-visible drop-shadow-[0_24px_50px_rgba(250,82,15,0.24)]"
        variants={svgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, -0.35, 0.35, 0],
          scale: [1, 1.012, 1],
        }}
        transition={{
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {paths.map((item) => (
          <motion.g
            key={item.id}
            transform={item.transform || undefined}
          >
            <motion.path
              custom={item}
              variants={pathVariants}
              d={item.d}
              fill={item.stroke ? "none" : item.fill}
              stroke={item.stroke || undefined}
              strokeWidth={item.strokeWidth || undefined}
              strokeLinecap={item.stroke ? "round" : undefined}
              strokeLinejoin={item.stroke ? "round" : undefined}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                willChange: "transform, opacity, filter",
              }}
            />
          </motion.g>
        ))}
      </motion.svg>

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
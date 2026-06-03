import { motion } from "framer-motion";

const pieces = [
  // Pixel blocks kiri atas
  {
    type: "rect",
    x: 18,
    y: 24,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#FFAF01",
    dir: "scale",
  },
  {
    type: "rect",
    x: 62,
    y: 24,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#FF8204",
    dir: "scale",
  },
  {
    type: "rect",
    x: 106,
    y: 24,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#FA500F",
    dir: "scale",
  },

  {
    type: "rect",
    x: 40,
    y: 68,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#FF8204",
    dir: "scale",
  },
  {
    type: "rect",
    x: 84,
    y: 68,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#FA500F",
    dir: "scale",
  },
  {
    type: "rect",
    x: 128,
    y: 68,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#E61300",
    dir: "scale",
  },

  {
    type: "rect",
    x: 62,
    y: 112,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#E61300",
    dir: "scale",
  },
  {
    type: "rect",
    x: 106,
    y: 112,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#C4001D",
    dir: "scale",
  },
  {
    type: "rect",
    x: 150,
    y: 112,
    w: 38,
    h: 38,
    radius: 6,
    fill: "#E61300",
    dir: "scale",
  },

  // Bentuk kain / fashion ribbon
  {
    type: "rect",
    x: 210,
    y: 44,
    w: 58,
    h: 210,
    radius: 30,
    fill: "#1F1F1F",
    dir: "tb",
  },
  {
    type: "rect",
    x: 268,
    y: 44,
    w: 160,
    h: 52,
    radius: 28,
    fill: "#1F1F1F",
    dir: "lr",
  },
  {
    type: "rect",
    x: 374,
    y: 94,
    w: 58,
    h: 160,
    radius: 28,
    fill: "#1F1F1F",
    dir: "tb",
  },
  {
    type: "rect",
    x: 268,
    y: 146,
    w: 126,
    h: 52,
    radius: 28,
    fill: "#FA520F",
    dir: "lr",
  },
  {
    type: "rect",
    x: 268,
    y: 202,
    w: 190,
    h: 52,
    radius: 28,
    fill: "#FFD900",
    dir: "lr",
  },

  // Trend line
  {
    type: "path",
    d: "M230 286 C292 214 356 190 432 212 C486 228 532 204 584 144",
    stroke: "#FA520F",
    strokeWidth: 18,
    dir: "draw",
  },
  {
    type: "path",
    d: "M552 144 L590 144 L580 182",
    stroke: "#FA520F",
    strokeWidth: 18,
    dir: "draw",
  },

  // AI nodes
  {
    type: "circle",
    cx: 302,
    cy: 286,
    r: 9,
    fill: "#FFD900",
    dir: "scale",
  },
  {
    type: "circle",
    cx: 380,
    cy: 258,
    r: 9,
    fill: "#FFA110",
    dir: "scale",
  },
  {
    type: "circle",
    cx: 458,
    cy: 238,
    r: 9,
    fill: "#FA520F",
    dir: "scale",
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.075,
    },
  },
};

function getVariants(dir) {
  switch (dir) {
    case "bt":
      return {
        hidden: { scaleY: 0, originY: 1, opacity: 0 },
        visible: { scaleY: 1, opacity: 1 },
      };

    case "tb":
      return {
        hidden: { scaleY: 0, originY: 0, opacity: 0 },
        visible: { scaleY: 1, opacity: 1 },
      };

    case "lr":
      return {
        hidden: { scaleX: 0, originX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1 },
      };

    case "rl":
      return {
        hidden: { scaleX: 0, originX: 1, opacity: 0 },
        visible: { scaleX: 1, opacity: 1 },
      };

    case "draw":
      return {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1 },
      };

    case "scale":
    default:
      return {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
      };
  }
}

export default function FashionTrendAnimatedMark({
  startAnimation = true,
  className = "",
}) {
  return (
    <motion.svg
      viewBox="0 0 640 340"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={startAnimation ? "visible" : "hidden"}
    >
      <defs>
        <filter
          id="softShadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="18"
            floodColor="#FA520F"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      <motion.g filter="url(#softShadow)">
        {pieces.map((piece, index) => {
          const variants = getVariants(piece.dir);

          if (piece.type === "rect") {
            return (
              <motion.rect
                key={index}
                x={piece.x}
                y={piece.y}
                width={piece.w}
                height={piece.h}
                rx={piece.radius}
                fill={piece.fill}
                variants={variants}
                transition={{
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            );
          }

          if (piece.type === "circle") {
            return (
              <motion.circle
                key={index}
                cx={piece.cx}
                cy={piece.cy}
                r={piece.r}
                fill={piece.fill}
                variants={variants}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            );
          }

          if (piece.type === "path") {
            return (
              <motion.path
                key={index}
                d={piece.d}
                fill="none"
                stroke={piece.stroke}
                strokeWidth={piece.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={variants}
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          }

          return null;
        })}
      </motion.g>

      <motion.circle
        cx="302"
        cy="286"
        r="9"
        fill="#FFD900"
        animate={{
          opacity: [0.35, 1, 0.35],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />

      <motion.circle
        cx="380"
        cy="258"
        r="9"
        fill="#FFA110"
        animate={{
          opacity: [0.35, 1, 0.35],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.7,
          delay: 0.28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />

      <motion.circle
        cx="458"
        cy="238"
        r="9"
        fill="#FA520F"
        animate={{
          opacity: [0.35, 1, 0.35],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.7,
          delay: 0.56,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    </motion.svg>
  );
}
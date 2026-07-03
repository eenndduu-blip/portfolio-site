"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  size?: string;
  className?: string;
  delay?: number;
  opacity?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function YellowCircle({
  size = "min(46vw, 520px)",
  className = "",
  delay = 0.1,
  opacity = 1,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      animate={
        reduce
          ? { opacity }
          : {
              opacity,
              scale: [0.6, 1, 1.03, 1, 1.03, 1],
            }
      }
      transition={
        reduce
          ? { duration: 0.4 }
          : {
              opacity: { duration: 1, ease, delay },
              scale: {
                duration: 6,
                ease: "easeInOut",
                times: [0, 0.18, 0.4, 0.6, 0.8, 1],
                delay,
                repeat: Infinity,
                repeatType: "loop",
              },
            }
      }
      style={{
        width: size,
        height: size,
        background: "var(--color-accent)",
        borderRadius: "9999px",
      }}
      className={`pointer-events-none absolute ${className}`}
    />
  );
}

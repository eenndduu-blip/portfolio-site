"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  from = "left",
  delay = 0,
  distance = 80,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right" | "up" | "down";
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const offset =
    from === "left"
      ? { x: -distance, y: 0 }
      : from === "right"
        ? { x: distance, y: 0 }
        : from === "up"
          ? { x: 0, y: -distance }
          : { x: 0, y: distance };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, ...offset }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CrossFade({
  children,
  delay = 0,
  className,
  scale = 1.04,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

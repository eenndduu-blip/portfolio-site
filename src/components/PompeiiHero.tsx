"use client";

import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";
import { ZoomableImage } from "./ZoomableImage";

const ease = [0.16, 1, 0.3, 1] as const;

const description = [
  "This watercolor drawing captures Pompeii as a place where history feels frozen in time. The soft washes and earthy tones reflect the ruins, old stone walls, and quiet streets that still hold the memory of daily life before the eruption.",
  "Through watercolor, I wanted to show Pompeii not only as an archaeological site, but as a living memory of a city shaped by tragedy, time, and preservation. The drawing reflects its silence, texture, and powerful connection between architecture and history.",
];

export function PompeiiHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute inset-0 pointer-events-none">
        <YellowCircle
          size="min(50vw, 560px)"
          className="top-[10%] right-[-6%]"
        />
      </div>

      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center px-6 md:px-12 pt-10 md:pt-16 pb-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -40 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="md:col-span-4 md:col-start-1 order-2 md:order-1"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]"
          >
            Art &nbsp;&mdash;&nbsp; Featured 03
          </motion.p>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.92] tracking-[-0.03em] mt-4"
          >
            Pompeii.
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] leading-[1.7]"
          >
            Watercolor Study
            <br />
            Pompeii, IT
            <br />
            2025
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="relative order-1 md:order-2 md:col-span-8 md:col-start-5 w-full flex items-center justify-center"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0, 8, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
            }
            className="relative w-full aspect-[3/2] bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)]"
            style={{ willChange: "transform" }}
          >
            <ZoomableImage
              src="/art/pompeii.png"
              alt="Pompeii — watercolor study of the ruins"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease, delay: 0.4 }}
        className="relative px-6 md:px-12 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
      >
        <div className="md:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-fg)]/40" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Study Note &mdash; 03
            </p>
          </div>
        </div>

        <div className="md:col-span-8 md:col-start-5 flex flex-col gap-4 md:gap-5 max-w-2xl">
          {description.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.12 }}
              className="text-[14px] md:text-[16px] leading-[1.7] text-[var(--color-fg)]"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <div className="relative flex items-center justify-between px-6 md:px-12 pb-8 md:pb-10 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        <span>Featured Work &nbsp;&middot;&nbsp; 03</span>
        <span>Pompeii, IT</span>
      </div>
    </section>
  );
}

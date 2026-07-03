"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";

const ease = [0.16, 1, 0.3, 1] as const;

const description = [
  "The Portico of Octavia is a strong example of Rome's layered history. It began as an ancient Roman monument under Augustus, later repaired with brick during the Severan period, and then reused in the Middle Ages as part of a fish market and urban life.",
  "Its walls show different materials from different times: ancient marble, Roman brick, medieval repairs, and modern mortar. These layers show how the building was not erased, but repaired, reused, and adapted over many centuries.",
  "The Portico of Octavia teaches us that architecture can carry memory. It is not only one building from one period, but a palimpsest — a place where history is written again and again through material, repair, and reuse.",
];

export function VeniceHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <YellowCircle
          size="min(54vw, 620px)"
          className="top-[10%] right-[6%]"
        />
      </div>

      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center px-6 md:px-12 pt-10 md:pt-16 pb-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="md:col-span-3 order-2 md:order-1 md:text-right"
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]"
          >
            Art &nbsp;&mdash;&nbsp; Featured
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="font-display italic text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.92] tracking-[-0.03em] mt-4"
          >
            Portico
            <br />
            <span className="not-italic">of Octavia.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] leading-[1.7]"
          >
            Watercolor &amp; ink on paper
            <br />
            Rome, 2025
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
          className="relative order-1 md:order-2 md:col-span-5 w-full flex items-center justify-center"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0, 10, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 9,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
            }
            className="relative h-[60vh] md:h-[85vh] aspect-[2/3] bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.45)]"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/art/venice-palimpsest.jpg"
              alt="Portico of Octavia — watercolor & ink on paper"
              fill
              priority
              sizes="(min-width: 768px) 60vh, 90vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 0.45 }}
          className="order-3 md:col-span-4 flex flex-col gap-4 md:gap-5 max-w-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[var(--color-fg)]/40" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Study Note &mdash; 01
            </p>
          </div>

          {description.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease,
                delay: 0.6 + i * 0.12,
              }}
              className="text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg)]"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1 }}
        className="relative flex items-center justify-between px-6 md:px-12 pb-8 md:pb-10 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
      >
        <span>Featured Work &nbsp;&middot;&nbsp; 01</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex items-center gap-2"
        >
          Scroll &nbsp;&darr;
        </motion.span>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Feature = {
  category: string;
  label: string;
  image: string;
};

const features: Feature[] = [
  { category: "Photography", label: "Fashion", image: "/photos/photo-001.jpg" },
  { category: "Architecture", label: "Structure", image: "/photos/photo-040.jpg" },
  { category: "Art", label: "Studio", image: "/photos/photo-080.jpg" },
  { category: "Photography", label: "Portrait", image: "/photos/photo-020.jpg" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const ease = [0.16, 1, 0.3, 1] as const;

  const current = features[index];
  const upNext = features[(index + 1) % features.length];

  const advance = () => setIndex((i) => (i + 1) % features.length);

  return (
    <section
      id="top"
      className="relative pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-10 overflow-hidden border-b border-[var(--color-border)]"
    >
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-center text-sm md:text-base text-[var(--color-fg)]"
      >
        <span className="underline underline-offset-4 decoration-[var(--color-fg)]">
          Your Name
        </span>{" "}
        is an artist working across art, architecture, and photography.
      </motion.p>

      <motion.h1
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        aria-label="Portfolio"
        className="font-display text-center leading-[0.85] tracking-[-0.04em] mt-4 md:mt-6 text-[clamp(4.5rem,22vw,17rem)] select-none"
      >
        PORTFOLIO
      </motion.h1>

      <div className="relative -mt-[14vw] md:-mt-[13vw] flex flex-col items-center">
        <div
          className="relative w-[78vw] md:w-[60vw] max-w-3xl aspect-[16/10]"
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(6deg)",
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
                style={{ borderRadius: "50% / 8%" }}
              >
                <Image
                  src={current.image}
                  alt={`${current.label} — ${current.category}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 78vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.p
                    key={current.label}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease }}
                    className="font-display italic text-white/95 text-[clamp(2.5rem,8vw,6rem)] leading-none drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
                    style={{ fontWeight: 400 }}
                  >
                    {current.label}
                  </motion.p>
                </div>

                <a
                  href="#work"
                  className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] md:text-xs uppercase tracking-[0.18em] cursor-pointer hover:bg-white/25 transition-colors"
                >
                  View
                </a>
              </div>

              <div
                aria-hidden
                className="absolute left-0 right-0 top-full h-[50%] pointer-events-none"
                style={{
                  transform: "scaleY(-1)",
                  transformOrigin: "top",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 70%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 70%)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ borderRadius: "50% / 8%" }}
                >
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 78vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-10 md:mt-16 flex items-center gap-3"
        >
          <button
            type="button"
            onClick={advance}
            className="flex items-center gap-3 pl-1 pr-5 py-1 rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm cursor-pointer group hover:border-[var(--color-fg)]/40 transition-colors"
            aria-label={`Next: ${upNext.label}`}
          >
            <span className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 border border-[var(--color-border)]">
              <Image
                src={upNext.image}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Category
              </span>
              <span className="font-display text-sm tracking-[0.05em] uppercase">
                {upNext.category}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={advance}
            aria-label="Advance"
            className="h-12 w-12 rounded-full bg-[var(--color-fg)]/80 text-white flex items-center justify-center cursor-pointer hover:bg-[var(--color-fg)] transition-colors"
          >
            <span className="text-lg leading-none">&rarr;</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

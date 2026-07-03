"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";

const ease = [0.16, 1, 0.3, 1] as const;

export function PorticoDescriptionNote() {
  const reduce = useReducedMotion();

  return (
    <section
      id="description-note"
      className="relative bg-white text-[#1f1f1f] px-4 md:px-10 py-16 md:py-24 border-t border-[var(--color-border)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-20 mix-blend-multiply">
        <YellowCircle
          size="min(38vw, 420px)"
          className="top-[8%] left-[-6%]"
          opacity={0.35}
        />
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease }}
        className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6 md:mb-10 px-2 md:px-4"
      >
        Study Sheet &nbsp;&mdash;&nbsp; Scroll
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease }}
        className="relative w-full max-w-[1400px] mx-auto"
      >
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={
            reduce ? undefined : { clipPath: "inset(0 0% 0 0)" }
          }
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease, delay: 0.15 }}
          className="relative w-full"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0, 6, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 11,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
            }
            className="relative w-full aspect-[1000/560] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.28)]"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/art/portico-description-note.png"
              alt="The Portico of Octavia — description note, map, and watercolor details"
              fill
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-contain bg-white"
              priority={false}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease, delay: 0.05 }}
          className="absolute -bottom-3 left-0 h-[3px] w-full bg-[var(--color-accent)] origin-left"
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease, delay: 0.9 }}
        className="mt-8 md:mt-12 flex items-center justify-between px-2 md:px-4 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] max-w-[1400px] mx-auto"
      >
        <span>Portico of Octavia &nbsp;&middot;&nbsp; Rome</span>
        <span>Palimpsest &nbsp;&middot;&nbsp; 2025</span>
      </motion.div>
    </section>
  );
}

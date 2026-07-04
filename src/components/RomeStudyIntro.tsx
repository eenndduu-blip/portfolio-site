"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";

const ease = [0.16, 1, 0.3, 1] as const;

export function RomeStudyIntro() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 pointer-events-none">
        <YellowCircle
          size="min(38vw, 460px)"
          className="top-[10%] right-[-8%]"
          delay={0.15}
        />
        <YellowCircle
          size="min(22vw, 260px)"
          className="bottom-[10%] left-[-5%]"
          delay={0.35}
          opacity={0.7}
        />
      </div>

      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center px-6 md:px-12 pt-16 md:pt-24 pb-16">
        <div className="md:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
          >
            Art &nbsp;&mdash;&nbsp; Roman Palimpsest Program &nbsp;&middot;&nbsp; Spring 2026
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-6 font-display font-black text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.03em]"
          >
            A Watercolor
            <br />
            <span className="italic font-normal">Study.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="mt-8 md:mt-10 max-w-xl text-[15px] md:text-[17px] leading-[1.6] text-[var(--color-fg)]"
          >
            A series of watercolors and short essays made across Venice,
            Rome, Civita di Bagnoregio, Pompeii, Paestum, and the Amalfi
            Coast &mdash; part of the UW Architecture in Rome program.
            The paintings try to hold onto what technical drawings cannot:
            light, weather, silence, and the way places feel.
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-8 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
          >
            By Endale Bekele
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="md:col-span-5 relative w-full aspect-[4/3] bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)]"
        >
          <Image
            src="/art/civita-featured.png"
            alt="Civita — featured watercolor study"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="relative flex items-center justify-between px-6 md:px-12 pb-8 md:pb-10 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        <span>UW &middot; Arch 600 Independent Study</span>
        <span>Scroll for Studies &nbsp;&darr;</span>
      </div>
    </section>
  );
}

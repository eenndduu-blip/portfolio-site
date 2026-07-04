"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";

const ease = [0.16, 1, 0.3, 1] as const;

export function RomeStudyIntro() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden text-white">
      <Image
        src="/art/art-hero-bg.png"
        alt="A house in Civita — featured watercolor"
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale contrast-[1.06] -z-10"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85 -z-10" />

      <div className="absolute inset-0 pointer-events-none">
        <YellowCircle
          size="min(38vw, 420px)"
          className="top-[10%] right-[-6%]"
          delay={0.2}
          opacity={0.5}
        />
        <YellowCircle
          size="min(22vw, 240px)"
          className="bottom-[12%] left-[-5%]"
          delay={0.4}
          opacity={0.4}
        />
      </div>

      <div className="relative px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.22em] text-white/75"
        >
          Art &nbsp;&mdash;&nbsp; Roman Palimpsest Program &nbsp;&middot;&nbsp; Spring 2026
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="mt-6 font-display font-black text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.03em] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        >
          A Watercolor
          <br />
          <span className="italic font-normal">Study.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="mt-8 md:mt-10 max-w-xl text-[15px] md:text-[17px] leading-[1.6] text-white/85"
        >
          A series of watercolors and short essays made across Venice,
          Rome, Pompeii, Paestum, and the Amalfi Coast &mdash; part of
          the UW Architecture in Rome program. The paintings try to hold
          onto what technical drawings cannot: light, weather, silence,
          and the way places feel.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="mt-10 md:mt-14 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/70"
        >
          <span>By Endale Bekele &nbsp;&middot;&nbsp; UW Arch 600</span>
          <span>Scroll for Studies &nbsp;&darr;</span>
        </motion.div>
      </div>
    </section>
  );
}

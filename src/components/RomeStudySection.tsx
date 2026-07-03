"use client";

import { motion, useReducedMotion } from "framer-motion";
import { YellowCircle } from "./YellowCircle";
import { ZoomableImage } from "./ZoomableImage";

const ease = [0.16, 1, 0.3, 1] as const;

export type RomeStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  meta: string;
  paragraphs: string[];
  watercolor: string;
  aspect?: string;
  circleSide?: "left" | "right";
  number: string;
};

export function RomeStudySection({
  study,
  index,
}: {
  study: RomeStudy;
  index: number;
}) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const side = study.circleSide ?? (flip ? "left" : "right");
  const aspect = study.aspect ?? "aspect-[4/3]";

  return (
    <section
      id={study.slug}
      className="relative w-full min-h-screen flex flex-col overflow-hidden border-t border-[var(--color-border)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <YellowCircle
          size="min(48vw, 540px)"
          className={
            side === "left"
              ? "top-[12%] left-[-8%]"
              : "top-[10%] right-[-6%]"
          }
        />
      </div>

      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center px-6 md:px-12 pt-10 md:pt-16 pb-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: flip ? 40 : -40 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className={`md:col-span-4 ${flip ? "md:order-2 md:col-start-9" : "md:order-1"}`}
        >
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]"
          >
            Study &nbsp;{study.number}
          </motion.p>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="font-display font-black text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[0.92] tracking-[-0.03em] mt-4"
          >
            {study.title}
          </motion.h2>

          {study.subtitle && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
            >
              {study.subtitle}
            </motion.p>
          )}

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] leading-[1.7]"
          >
            {study.meta}
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.15, ease, delay: 0.2 }}
          className={`relative md:col-span-8 w-full ${
            flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-5"
          } flex items-center justify-center`}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0, 8, 0] }}
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
            className={`relative w-full ${aspect} bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)]`}
            style={{ willChange: "transform" }}
          >
            <ZoomableImage
              src={study.watercolor}
              alt={`${study.title} — watercolor`}
              sizes="(min-width: 768px) 65vw, 100vw"
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
              Notes &nbsp;&mdash;&nbsp; {study.number}
            </p>
          </div>
        </div>

        <div className="md:col-span-8 md:col-start-5 flex flex-col gap-4 md:gap-5 max-w-2xl">
          {study.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.1 }}
              className="text-[14px] md:text-[16px] leading-[1.7] text-[var(--color-fg)]"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

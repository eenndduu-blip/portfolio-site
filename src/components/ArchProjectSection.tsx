"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ZoomableImage } from "./ZoomableImage";
import { YellowCircle } from "./YellowCircle";

const ease = [0.16, 1, 0.3, 1] as const;

export type ArchProject = {
  slug: string;
  number: string;
  title: string;
  year: string;
  tag: string;
  location: string;
  brief: string;
  cover: string;
  gallery: string[];
};

export function ArchProjectSection({
  project,
  index,
}: {
  project: ArchProject;
  index: number;
}) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;

  return (
    <section
      id={project.slug}
      className="relative px-6 md:px-12 py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden"
    >
      {index % 2 === 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <YellowCircle
            size="min(38vw, 420px)"
            className={
              flip ? "top-[8%] right-[-6%]" : "top-[6%] left-[-8%]"
            }
            opacity={0.35}
          />
        </div>
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: flip ? 40 : -40 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease }}
          className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : "md:order-1"}`}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Project &nbsp;{project.number} &nbsp;&middot;&nbsp; {project.year}
          </p>

          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] font-black">
            {project.title}
          </h2>

          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {project.tag}
          </p>

          <p className="mt-6 text-[14px] md:text-[15px] leading-[1.7] text-[var(--color-fg)] max-w-lg">
            {project.brief}
          </p>

          <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {project.location}
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className={`relative md:col-span-7 w-full aspect-square bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.3)] ${
            flip ? "md:order-1 md:col-start-1" : "md:order-2"
          }`}
        >
          <ZoomableImage
            src={project.cover}
            alt={`${project.title} — cover`}
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        className="relative mt-16 md:mt-24"
      >
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <div className="h-px w-10 bg-[var(--color-fg)]/40" />
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Sheets &nbsp;&mdash;&nbsp; {project.gallery.length}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {project.gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.7,
                ease,
                delay: (i % 4) * 0.05,
              }}
              className="relative aspect-square bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]"
            >
              <ZoomableImage
                src={src}
                alt={`${project.title} — sheet ${i + 1}`}
                sizes="(min-width: 768px) 22vw, 45vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

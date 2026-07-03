"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryPhotos } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function Gallery({ showHeader = true }: { showHeader?: boolean } = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i + 1) % galleryPhotos.length,
      ),
    [],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null
          ? i
          : (i - 1 + galleryPhotos.length) % galleryPhotos.length,
      ),
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section
      id="gallery"
      className="px-6 md:px-10 py-20 md:py-32 border-b border-[var(--color-border)]"
    >
      {showHeader && <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
              Photography &mdash; Archive
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1] max-w-3xl">
              The full body of work.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="hidden md:block text-xs uppercase tracking-[0.14em] text-[var(--color-muted)] whitespace-nowrap">
            {galleryPhotos.length} frames
          </p>
        </Reveal>
      </div>}

      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 [column-fill:_balance]">
        {galleryPhotos.map((src, i) => (
          <motion.figure
            key={src}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: (i % 8) * 0.04,
            }}
            className="mb-2 md:mb-3 break-inside-avoid overflow-hidden group cursor-zoom-in"
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={src}
              alt={`Photograph ${i + 1}`}
              width={1200}
              height={1600}
              loading="lazy"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-auto object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Photograph ${activeIndex + 1} of ${galleryPhotos.length}`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 h-11 w-11 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer z-10"
            >
              <span className="relative block h-px w-7 rotate-45 bg-current" />
              <span className="absolute block h-px w-7 -rotate-45 bg-current" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center text-white/70 hover:text-white text-3xl font-light transition-colors cursor-pointer z-10"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center text-white/70 hover:text-white text-3xl font-light transition-colors cursor-pointer z-10"
            >
              &rarr;
            </button>

            <motion.div
              key={activeIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[92vw] h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryPhotos[activeIndex]}
                alt={`Photograph ${activeIndex + 1}`}
                fill
                sizes="92vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/60">
              {String(activeIndex + 1).padStart(3, "0")} / {galleryPhotos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

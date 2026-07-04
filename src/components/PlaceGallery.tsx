"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export type Place = {
  slug: string;
  title: string;
  meta: string;
  description?: string;
  photos: string[];
};

export function PlaceGallery({
  place,
  index,
}: {
  place: Place;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i + 1) % place.photos.length,
      ),
    [place.photos.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + place.photos.length) % place.photos.length,
      ),
    [place.photos.length],
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
      id={place.slug}
      className="relative px-6 md:px-10 py-16 md:py-24 border-t border-[var(--color-border)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-10 md:mb-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease }}
          className="md:col-span-7"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)] mb-3">
            {String(index + 1).padStart(2, "0")} &nbsp;&middot;&nbsp; {place.meta}
          </p>
          <h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            {place.title}
          </h2>
        </motion.div>
        {place.description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="md:col-span-4 md:col-start-9 text-sm md:text-base text-[var(--color-muted)] leading-relaxed"
          >
            {place.description}
          </motion.p>
        )}
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 [column-fill:_balance]">
        {place.photos.map((src, i) => (
          <motion.figure
            key={src}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{
              duration: 0.7,
              ease,
              delay: (i % 4) * 0.05,
            }}
            className="mb-2 md:mb-3 break-inside-avoid overflow-hidden group cursor-zoom-in"
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={src}
              alt={`${place.title} photograph ${i + 1}`}
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
            key={`lightbox-${place.slug}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${place.title} photograph ${activeIndex + 1} of ${place.photos.length}`}
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
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-[92vw] h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={place.photos[activeIndex]}
                alt={`${place.title} photograph ${activeIndex + 1}`}
                fill
                sizes="92vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/60">
              {place.title} &nbsp;&middot;&nbsp; {String(activeIndex + 1).padStart(2, "0")} / {place.photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

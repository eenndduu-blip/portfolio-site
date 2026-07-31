"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ArchitectureBook({
  pages,
  label = "Architectural Portfolio",
}: {
  pages: string[];
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const total = pages.length;

  const goTo = useCallback(
    (target: number) => {
      setIndex((current) => {
        if (target < 0 || target >= total || target === current) return current;
        setDirection(target > current ? 1 : -1);
        return target;
      });
    },
    [total],
  );

  const next = useCallback(() => {
    setIndex((current) => {
      if (current >= total - 1) return current;
      setDirection(1);
      return current + 1;
    });
  }, [total]);

  const prev = useCallback(() => {
    setIndex((current) => {
      if (current <= 0) return current;
      setDirection(-1);
      return current - 1;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchX.current = null;
  };

  const pageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      rotateY: dir > 0 ? 10 : -10,
    }),
    center: { opacity: 1, x: 0, rotateY: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      rotateY: dir > 0 ? -10 : 10,
    }),
  };

  const thumbRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const isFirstThumbScroll = useRef(true);
  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    const target =
      thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({
      left: target,
      behavior: isFirstThumbScroll.current || reduce ? "auto" : "smooth",
    });
    isFirstThumbScroll.current = false;
  }, [index, reduce]);

  return (
    <section className="relative w-full bg-white text-[#0f0f0f] px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">
            {label}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div
          className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-8"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous page"
            className="h-10 w-10 md:h-12 md:w-12 shrink-0 grid place-items-center rounded-full border border-black/10 text-black/60 hover:border-black/30 hover:text-black disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <span aria-hidden className="text-xl">
              &larr;
            </span>
          </button>

          <div
            className="relative w-full max-w-[720px] mx-auto aspect-square overflow-hidden bg-white shadow-[0_20px_70px_-20px_rgba(0,0,0,0.25)]"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.button
                key={index}
                type="button"
                custom={direction}
                variants={reduce ? undefined : pageVariants}
                initial={reduce ? undefined : "enter"}
                animate={reduce ? undefined : "center"}
                exit={reduce ? undefined : "exit"}
                transition={{ duration: 0.55, ease }}
                onClick={() => setZoomed(true)}
                aria-label={`Zoom into page ${index + 1}`}
                className="absolute inset-0 w-full h-full cursor-zoom-in group bg-transparent border-0 p-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={pages[index]}
                  alt={`Portfolio page ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 60vw, 92vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <span
                  aria-hidden
                  className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.button>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            disabled={index === total - 1}
            aria-label="Next page"
            className="h-10 w-10 md:h-12 md:w-12 shrink-0 grid place-items-center rounded-full border border-black/10 text-black/60 hover:border-black/30 hover:text-black disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <span aria-hidden className="text-xl">
              &rarr;
            </span>
          </button>
        </div>

        <div
          ref={thumbStripRef}
          className="mt-8 md:mt-12 flex gap-2 md:gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin] snap-x"
        >
          {pages.map((src, i) => (
            <button
              key={src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === index}
              className={`relative shrink-0 w-12 h-12 md:w-14 md:h-14 overflow-hidden snap-center transition-all duration-200 cursor-pointer ${
                i === index
                  ? "ring-2 ring-[#0f0f0f] ring-offset-2"
                  : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            key="book-zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Page ${index + 1} of ${total}, enlarged`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
              }}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 h-11 w-11 flex items-center justify-center text-black/70 hover:text-black transition-colors cursor-pointer z-10"
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
              disabled={index === 0}
              aria-label="Previous page"
              className="hidden sm:grid absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center text-black/50 hover:text-black disabled:opacity-0 transition-colors cursor-pointer z-10 text-2xl"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              disabled={index === total - 1}
              aria-label="Next page"
              className="hidden sm:grid absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center text-black/50 hover:text-black disabled:opacity-0 transition-colors cursor-pointer z-10 text-2xl"
            >
              &rarr;
            </button>

            <motion.div
              key={`zoom-${index}`}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-[94vw] h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={pages[index]}
                alt={`Portfolio page ${index + 1}, enlarged`}
                fill
                sizes="94vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-black/45">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

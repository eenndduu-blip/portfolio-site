"use client";

import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const FLIP_MS = 850;

const subscribeNoop = () => () => {};

/** Minimal surface of the StPageFlip instance we actually call. */
type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
};

type FlipBookRef = { pageFlip: () => PageFlipApi | undefined };

export function ArchitectureFlipBook({
  pages,
  label = "Pages",
}: {
  pages: string[];
  label?: string;
}) {
  const bookRef = useRef<FlipBookRef | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [portrait, setPortrait] = useState(true);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const total = pages.length;

  // react-pageflip measures the DOM as it initialises, so it is held back until
  // after hydration rather than rendered on the server.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const api = useCallback(() => bookRef.current?.pageFlip(), []);

  // StPageFlip drives a turn with requestAnimationFrame and only returns to its
  // "read" state once that finishes. A second turn issued mid-animation leaves
  // the controller stuck mid-flip, so turns are gated on the flip duration.
  const busyUntil = useRef(0);
  const gate = useCallback(() => {
    const now = Date.now();
    if (now < busyUntil.current) return false;
    busyUntil.current = now + FLIP_MS + 80;
    return true;
  }, []);

  const next = useCallback(() => {
    if (gate()) api()?.flipNext();
  }, [api, gate]);
  const prev = useCallback(() => {
    if (gate()) api()?.flipPrev();
  }, [api, gate]);
  const goTo = useCallback(
    (target: number) => {
      // turnToPage is instant, so it needs no animation gate.
      busyUntil.current = 0;
      api()?.turnToPage(target);
    },
    [api],
  );

  // With a cover, page 0 sits alone and the rest pair up, so the spread a given
  // page belongs to is not simply index/2.
  const spreadLabel = useMemo(() => {
    const first = index + 1;
    if (portrait || index === 0 || index === total - 1) {
      return String(first).padStart(2, "0");
    }
    const second = Math.min(index + 2, total);
    return `${String(first).padStart(2, "0")}–${String(second).padStart(2, "0")}`;
  }, [index, portrait, total]);

  // Arrow keys drive the book only while it is on screen, so several books on
  // one page never fight over the same keypress.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.4;
      },
      { threshold: [0, 0.4, 1] },
    );
    io.observe(shell);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(null);
        return;
      }
      if (!visible && zoomed === null) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev, zoomed]);

  useEffect(() => {
    document.body.style.overflow = zoomed !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  const thumbRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const firstThumbScroll = useRef(true);
  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: firstThumbScroll.current || reduce ? "auto" : "smooth",
    });
    firstThumbScroll.current = false;
  }, [index, reduce]);

  const zoomPrev = useCallback(
    () => setZoomed((z) => (z === null ? z : Math.max(0, z - 1))),
    [],
  );
  const zoomNext = useCallback(
    () => setZoomed((z) => (z === null ? z : Math.min(total - 1, z + 1))),
    [total],
  );

  return (
    <section className="relative w-full bg-white text-[#0f0f0f] px-2 sm:px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">
            {label}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
            {spreadLabel} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div
          ref={shellRef}
          className="relative flex items-center justify-center gap-0 sm:gap-2 md:gap-6"
        >
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous page"
            className="hidden sm:grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-full border border-black/10 text-black/60 hover:border-black/30 hover:text-black disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer z-10"
          >
            <span aria-hidden className="text-xl">
              &larr;
            </span>
          </button>

          <div className="flex-1 min-w-0 max-w-[1120px] flipbook-shell">
            {!mounted ? (
              <div
                aria-hidden
                className="w-full max-w-[560px] mx-auto aspect-square bg-white shadow-[0_20px_70px_-20px_rgba(0,0,0,0.25)]"
              />
            ) : (
            <HTMLFlipBook
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={bookRef as any}
              className="mx-auto"
              style={{}}
              width={500}
              height={500}
              size="stretch"
              minWidth={220}
              maxWidth={560}
              minHeight={220}
              maxHeight={560}
              startPage={0}
              startZIndex={0}
              drawShadow
              flippingTime={FLIP_MS}
              maxShadowOpacity={0.45}
              showCover
              usePortrait
              autoSize
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
              // Without this, every parent re-render (the page counter!)
              // rebuilds the page list and resets the flip controller.
              renderOnlyPageLengthChange
              onInit={(e: { data: { page: number; mode: string } }) => {
                setIndex(e.data.page);
                setPortrait(e.data.mode === "portrait");
              }}
              onFlip={(e: { data: number }) => setIndex(e.data)}
              onChangeOrientation={(e: { data: "portrait" | "landscape" }) =>
                setPortrait(e.data === "portrait")
              }
            >
              {pages.map((src, i) => (
                <div
                  key={src}
                  className="relative bg-white overflow-hidden select-none"
                >
                  <Image
                    src={src}
                    alt={`Portfolio page ${i + 1}`}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 1200px) 560px, (min-width: 768px) 60vw, 92vw"
                    className="object-contain pointer-events-none"
                    draggable={false}
                  />
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setZoomed(i);
                    }}
                    aria-label={`Enlarge page ${i + 1}`}
                    className="absolute top-2.5 right-2.5 md:top-3.5 md:right-3.5 h-8 w-8 md:h-9 md:w-9 grid place-items-center rounded-full bg-white/85 backdrop-blur-sm border border-black/10 text-black/70 opacity-0 hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-70 transition-opacity duration-300 cursor-zoom-in z-10"
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <circle
                        cx="9"
                        cy="9"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13.5 13.5L17 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </HTMLFlipBook>
            )}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={index >= total - 1}
            aria-label="Next page"
            className="hidden sm:grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-full border border-black/10 text-black/60 hover:border-black/30 hover:text-black disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer z-10"
          >
            <span aria-hidden className="text-xl">
              &rarr;
            </span>
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-black/35">
          Drag a corner, or swipe, to turn the page
        </p>

        <div
          ref={thumbStripRef}
          className="mt-5 md:mt-7 flex gap-2 md:gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin] snap-x"
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
              <Image src={src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoomed !== null && (
          <motion.div
            key="flipbook-zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoomed(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Page ${zoomed + 1} of ${total}, enlarged`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(null);
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
                zoomPrev();
              }}
              disabled={zoomed === 0}
              aria-label="Previous page"
              className="hidden sm:grid absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center text-black/50 hover:text-black disabled:opacity-0 transition-colors cursor-pointer z-10 text-2xl"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                zoomNext();
              }}
              disabled={zoomed === total - 1}
              aria-label="Next page"
              className="hidden sm:grid absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center text-black/50 hover:text-black disabled:opacity-0 transition-colors cursor-pointer z-10 text-2xl"
            >
              &rarr;
            </button>

            <motion.div
              key={`zoom-${zoomed}`}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-[94vw] h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={pages[zoomed]}
                alt={`Portfolio page ${zoomed + 1}, enlarged`}
                fill
                sizes="94vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
              {String(zoomed + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

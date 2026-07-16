"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeroCanvas } from "./HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* content                                                             */
/* ------------------------------------------------------------------ */

const MANIFESTO =
  "What does a building remember? Every project begins with that question. I design housing, cultural centers, and public spaces that start with people — how they gather, move, and belong — and end as places people don't simply occupy. They remember.";

const works = [
  {
    index: "01",
    category: "Architecture",
    title: "Selected Projects",
    sub: "Housing · Adaptive Reuse · 2022–2026",
    image: "/architecture/pages/page-01.png",
    href: "/architecture",
  },
  {
    index: "02",
    category: "Watercolor",
    title: "Roman Palimpsest",
    sub: "A House in Civita · Rome Program",
    image: "/art/hero-house-civita.png",
    href: "/art",
  },
  {
    index: "03",
    category: "Photography",
    title: "Five Cities",
    sub: "Venice · Verona · Ferrara · Rome · Orvieto",
    image: "/photos/venice/photo-01.jpg",
    href: "/photography",
  },
  {
    index: "04",
    category: "Watercolor",
    title: "Civita di Bagnoregio",
    sub: "Hilltop Study · Sunset",
    image: "/art/civita-sunset.png",
    href: "/art",
  },
  {
    index: "05",
    category: "Watercolor",
    title: "Pompeii",
    sub: "A City Frozen in Time",
    image: "/art/pompeii.png",
    href: "/art",
  },
];

const fieldNotes = [
  ["/photos/venice/photo-03.jpg", "/photos/verona/photo-01.jpg"],
  ["/photos/rome/photo-01.jpg", "/photos/ferrara/photo-02.jpg"],
  ["/photos/verona/photo-02.jpg", "/photos/venice/photo-02.jpg"],
];

const recognition = [
  {
    year: "2026",
    title: "Honorable Mention — WA Starter Home Townhouse Competition",
    org: "Starter Home Plan",
    href: "https://starterhomeplan.org/news/winners-announced-in-townhouse-design-competition",
    image: "/architecture/pages/page-03.png",
  },
  {
    year: "2026",
    title: "Materials of Abolition — The ReView: Common Good, Ch. 7",
    org: "Tulane School of Architecture",
    href: "https://issuu.com/tulanearch/docs/chapter_7_-_technology_and_making",
    image: "/art/rome/rome-19.png",
  },
  {
    year: "2024",
    title: "Sugar Roots — Book Design & Publication",
    org: "Small Center for Collaborative Design",
    href: "https://small.tulane.edu/project/sugarroots/",
    image: "/art/rome/rome-15.png",
  },
  {
    year: "2025",
    title: "Roman Palimpsest Program — Study Abroad",
    org: "UW Architecture in Rome",
    href: "/art",
    image: "/art/rome/rome-17.png",
  },
];

const MARQUEE = "Architecture — Art — Photography — Memory — ";

/* ------------------------------------------------------------------ */

export function ExperienceV2() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* ----- reduced-motion flag ----- */
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* ----- lenis smooth scroll ----- */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  /* ----- custom cursor ----- */
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const ring = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("[data-hover]");
      gsap.to(ring, {
        scale: hit ? 2.4 : 1,
        opacity: hit ? 0.9 : 0.5,
        duration: 0.3,
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [reduced]);

  /* ----- preloader + all scroll choreography ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      setLoaded(true);
      gsap.set(root.querySelectorAll("[data-reveal], .hero-char"), {
        clearProps: "all",
        opacity: 1,
        yPercent: 0,
      });
      return;
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      /* preloader */
      const counter = { v: 0 };
      const counterEl = root.querySelector<HTMLElement>(".pre-count");
      const preTl = gsap.timeline({
        onComplete: () => setLoaded(true),
      });
      preTl
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterEl)
              counterEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(".pre-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".preloader", {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        })
        .from(
          ".hero-char",
          {
            yPercent: 120,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.035,
          },
          "-=0.35",
        )
        .from(
          "[data-hero-fade]",
          { opacity: 0, y: 24, duration: 0.9, ease: "power3.out", stagger: 0.1 },
          "-=0.7",
        );

      /* manifesto word fill */
      gsap.to(".mani-word", {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
        },
      });

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      /* horizontal works gallery — desktop only */
      mm.add("(min-width: 768px)", () => {
        const track = root.querySelector<HTMLElement>(".works-track");
        if (!track) return;
        const getX = () => -(track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: getX,
          ease: "none",
          scrollTrigger: {
            trigger: ".works",
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        /* inner image parallax against the track motion */
        gsap.utils.toArray<HTMLElement>(".work-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      /* field-notes column parallax */
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".fn-col").forEach((col, i) => {
          gsap.to(col, {
            y: i === 1 ? 80 : -80,
            ease: "none",
            scrollTrigger: {
              trigger: ".field-notes",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      /* footer heading */
      gsap.from(".footer-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".contact", start: "top 70%" },
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reduced]);

  /* ----- recognition hover preview ----- */
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const preview = previewRef.current;
    if (!preview) return;
    const px = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
    const py = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      px(e.clientX + 24);
      py(e.clientY - 120);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduced]);

  const showPreview = (src: string) => {
    if (previewImgRef.current) previewImgRef.current.src = src;
    if (previewRef.current)
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.35 });
  };
  const hidePreview = () => {
    if (previewRef.current)
      gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
  };

  /* ----- magnetic contact button ----- */
  useEffect(() => {
    if (reduced) return;
    const btn = magneticRef.current;
    if (!btn) return;
    const strength = 0.35;
    const move = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power3",
      });
    };
    const leave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, [reduced]);

  /* ------------------------------------------------------------------ */

  const heroLine = (word: string) => (
    <span className="block overflow-hidden">
      {word.split("").map((ch, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={rootRef}
      className="v2-root relative bg-[#0c0c0c] text-[#f2efe9] font-sans overflow-x-clip selection:bg-[#edc231] selection:text-[#0c0c0c]"
      style={{ cursor: reduced ? "auto" : "none" }}
    >
      {/* grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* custom cursor */}
      {!reduced && (
        <>
          <div
            ref={cursorRef}
            aria-hidden
            className="fixed top-0 left-0 z-[95] h-10 w-10 -ml-5 -mt-5 rounded-full border border-[#f2efe9] opacity-50 pointer-events-none mix-blend-difference"
          />
          <div
            ref={cursorDotRef}
            aria-hidden
            className="fixed top-0 left-0 z-[95] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#edc231] pointer-events-none"
          />
        </>
      )}

      {/* hover preview for recognition rows */}
      <div
        ref={previewRef}
        aria-hidden
        className="fixed top-0 left-0 z-[80] w-[300px] h-[210px] pointer-events-none opacity-0 scale-90 overflow-hidden rounded-sm shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          alt=""
          className="w-full h-full object-cover bg-[#1a1a18]"
        />
      </div>

      {/* preloader */}
      {!loaded && !reduced && (
        <div className="preloader fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col items-center justify-center gap-6">
          <p className="pre-count font-serif text-[clamp(3rem,8vw,6rem)] font-light tabular-nums">
            000
          </p>
          <div className="w-40 h-px bg-white/15 overflow-hidden">
            <div className="pre-bar h-full w-full bg-[#edc231] origin-left scale-x-0" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Endale Bekele — Portfolio
          </p>
        </div>
      )}

      {/* nav */}
      <header className="fixed top-0 inset-x-0 z-[70] flex items-center justify-between px-6 md:px-10 py-6 mix-blend-difference text-[#f2efe9]">
        <Link
          href="/"
          data-hover
          className="font-black lowercase tracking-[-0.08em] text-xl"
        >
          endale.
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.22em]">
          <Link data-hover href="/art" className="hover:opacity-60 transition-opacity">
            Art
          </Link>
          <Link data-hover href="/photography" className="hover:opacity-60 transition-opacity">
            Photo
          </Link>
          <Link data-hover href="/architecture" className="hover:opacity-60 transition-opacity">
            Architecture
          </Link>
          <a
            data-hover
            href="mailto:wedeendu@hotmail.com"
            className="hidden md:inline hover:opacity-60 transition-opacity"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <HeroCanvas reduced={reduced} />
        <div
          className="relative px-6 md:px-12"
          style={{ zIndex: 1 }}
        >
          <p
            data-hero-fade
            className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white/60 mb-6"
          >
            Portfolio 2026 &middot; Seattle, WA
          </p>
          <h1
            className="font-serif font-light uppercase leading-[0.88] tracking-[0.01em] text-[clamp(4rem,15vw,13.5rem)]"
            aria-label="Endale Bekele"
          >
            {heroLine("ENDALE")}
            {heroLine("BEKELE")}
          </h1>
          <div
            data-hero-fade
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#edc231]">
              Architectural Designer &amp; Artist
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              M.Arch · University of Washington
            </p>
          </div>
        </div>

        <div
          data-hero-fade
          className="absolute bottom-8 inset-x-0 px-6 md:px-12 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/40"
          style={{ zIndex: 1 }}
        >
          <span>What does a building remember?</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="inline-block h-8 w-px bg-white/30" />
          </span>
        </div>
      </section>

      {/* marquee */}
      <div className="relative border-y border-white/10 py-4 overflow-hidden whitespace-nowrap">
        <div className="v2-marquee inline-block">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-serif italic text-[clamp(1.5rem,3.5vw,2.75rem)] font-light text-white/70 pr-4"
            >
              {MARQUEE.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- manifesto ---------------- */}
      <section className="manifesto relative px-6 md:px-12 py-32 md:py-48">
        <p
          data-reveal
          className="text-[10px] uppercase tracking-[0.3em] text-[#edc231] mb-10"
        >
          01 &nbsp;/&nbsp; The Question
        </p>
        <p className="max-w-5xl font-serif font-light text-[clamp(1.75rem,4.2vw,3.6rem)] leading-[1.25]">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i} className="mani-word opacity-[0.13] transition-none">
              {w}{" "}
            </span>
          ))}
        </p>
        <div data-reveal className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl">
          {[
            "It started with watercolors in elementary school — learning how light falls, how materials age, how places hold meaning.",
            "Clear thinking, honest materials, and the discipline to turn ideas into places that last.",
            "Seattle is my studio: housing, neighborhoods in transition, old buildings waiting for second lives.",
          ].map((t, i) => (
            <p key={i} className="text-[13px] md:text-sm leading-[1.8] text-white/55">
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* ---------------- works: horizontal ---------------- */}
      <section className="works relative">
        <div className="works-track flex flex-col md:flex-row md:h-[100svh] md:items-center will-change-transform">
          <div className="shrink-0 px-6 md:px-12 py-20 md:py-0 md:w-[42vw]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#edc231] mb-6">
              02 &nbsp;/&nbsp; Selected Work
            </p>
            <h2 className="font-serif font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
              Built,
              <br />
              painted,
              <br />
              <span className="italic">remembered.</span>
            </h2>
            <p className="hidden md:block mt-10 text-[10px] uppercase tracking-[0.28em] text-white/40">
              Keep scrolling &rarr;
            </p>
          </div>

          {works.map((w) => (
            <Link
              key={w.index}
              href={w.href}
              data-hover
              className="group shrink-0 px-6 md:px-10 pb-16 md:pb-0 md:w-[44vw]"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] md:h-[62svh] md:w-auto overflow-hidden bg-[#161614]">
                <div className="work-img absolute inset-[-10%]">
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="(min-width:768px) 44vw, 92vw"
                    className="object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="absolute top-4 left-4 font-serif italic text-2xl text-white/90 drop-shadow">
                  {w.index}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.26em] text-[#edc231] mb-1">
                    {w.category}
                  </p>
                  <p className="font-serif text-xl md:text-2xl">{w.title}</p>
                  <p className="text-[11px] text-white/40 mt-1">{w.sub}</p>
                </div>
                <span className="text-lg opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}

          <div className="shrink-0 hidden md:flex items-center justify-center w-[30vw]">
            <Link
              href="/architecture"
              data-hover
              className="font-serif italic text-3xl text-white/60 hover:text-[#edc231] transition-colors"
            >
              View everything &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- field notes ---------------- */}
      <section className="field-notes relative px-6 md:px-12 py-32 md:py-48">
        <p
          data-reveal
          className="text-[10px] uppercase tracking-[0.3em] text-[#edc231] mb-6"
        >
          03 &nbsp;/&nbsp; Field Notes
        </p>
        <h2
          data-reveal
          className="font-serif font-light text-[clamp(2rem,5vw,4rem)] leading-[1] mb-16 md:mb-24"
        >
          Made in transit, <span className="italic">held in stillness.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {fieldNotes.map((col, ci) => (
            <div key={ci} className={`fn-col flex flex-col gap-3 md:gap-6 ${ci === 1 ? "md:mt-24" : ""} ${ci === 2 ? "hidden md:flex" : ""}`}>
              {col.map((src) => (
                <div
                  key={src}
                  data-reveal
                  className="relative aspect-[3/4] overflow-hidden bg-[#161614]"
                >
                  <Image
                    src={src}
                    alt="Field photograph"
                    fill
                    sizes="(min-width:768px) 30vw, 46vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- recognition ---------------- */}
      <section className="relative px-6 md:px-12 py-32 md:py-40 border-t border-white/10">
        <p
          data-reveal
          className="text-[10px] uppercase tracking-[0.3em] text-[#edc231] mb-12"
        >
          04 &nbsp;/&nbsp; Recognition
        </p>
        <div className="flex flex-col">
          {recognition.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-hover
              data-reveal
              onMouseEnter={() => showPreview(r.image)}
              onMouseLeave={hidePreview}
              className="group grid md:grid-cols-[80px_1fr_auto] items-baseline gap-2 md:gap-8 py-7 border-b border-white/10 hover:border-[#edc231]/60 transition-colors"
            >
              <span className="text-[11px] tabular-nums text-white/40">
                {r.year}
              </span>
              <span className="font-serif text-lg md:text-2xl font-light group-hover:translate-x-2 transition-transform duration-300">
                {r.title}
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 group-hover:text-[#edc231] transition-colors">
                {r.org}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- contact ---------------- */}
      <section className="contact relative px-6 md:px-12 pt-32 md:pt-44 pb-12 border-t border-white/10 overflow-hidden">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#edc231] mb-10">
          05 &nbsp;/&nbsp; Contact
        </p>
        <h2 className="font-serif font-light leading-[1.02] text-[clamp(2.75rem,8vw,7.5rem)]">
          <span className="block overflow-hidden">
            <span className="footer-line block">Let&rsquo;s build something</span>
          </span>
          <span className="block overflow-hidden">
            <span className="footer-line block italic text-[#edc231]">
              people remember.
            </span>
          </span>
        </h2>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <a
            ref={magneticRef}
            href="mailto:wedeendu@hotmail.com"
            data-hover
            className="inline-flex items-center justify-center h-36 w-36 md:h-44 md:w-44 rounded-full border border-[#edc231] text-[11px] uppercase tracking-[0.26em] text-[#edc231] hover:bg-[#edc231] hover:text-[#0c0c0c] transition-colors duration-300"
          >
            Say hello
          </a>
          <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.24em]">
            {[
              ["Email", "mailto:wedeendu@hotmail.com", "wedeendu@hotmail.com"],
              ["Instagram", "https://www.instagram.com/e.n.d.a.l.e/", "@e.n.d.a.l.e"],
              [
                "LinkedIn",
                "https://www.linkedin.com/in/endale-bekele-5924107b/",
                "endale-bekele",
              ],
            ].map(([label, href, value]) => (
              <a
                key={label}
                href={href}
                data-hover
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-baseline gap-4"
              >
                <span className="text-white/40 w-24">{label}</span>
                <span className="relative">
                  {value}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-[#edc231] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24 md:mt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-white/30 border-t border-white/10 pt-8">
          <p>&copy; {new Date().getFullYear()} Endale Bekele · Seattle, WA</p>
          <Link data-hover href="/" className="hover:text-white/70 transition-colors">
            Classic site &rarr;
          </Link>
        </div>
      </section>

      {/* marquee keyframes */}
      <style jsx global>{`
        .v2-marquee {
          animation: v2-scroll 40s linear infinite;
        }
        @keyframes v2-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-marquee {
            animation: none;
          }
        }
        .v2-root a,
        .v2-root button {
          cursor: none;
        }
        @media (pointer: coarse) {
          .v2-root,
          .v2-root a,
          .v2-root button {
            cursor: auto !important;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Nav } from "@/components/Nav";

const ease = [0.16, 1, 0.3, 1] as const;

const bioParagraphs = [
  "It started with watercolors in elementary school, learning how light falls, how materials age, and how places hold meaning. That way of seeing still shapes everything I design.",
  "What does a building remember? Every project begins with that question. Whether designing housing, cultural centers, or public spaces, I start with people: how they gather, move, and belong. From there, architecture takes shape through clear thinking, honest materials, and the discipline to turn ideas into places that last.",
  "I believe architecture is more than solving problems or creating beautiful forms. At its best, it reflects the people who inhabit it, respects the history beneath it, and leaves something meaningful for those who come after.",
  "I'm an architectural designer, trained at the University of Washington, committed to designing places that people don't simply occupy — they remember.",
];

const works = [
  {
    number: "A.",
    title: "Art",
    subtitle: "Watercolor Studies",
    href: "/art",
    image: "/art/rome/rome-05.png",
  },
  {
    number: "P.",
    title: "Photography",
    subtitle: "Selected Frames",
    href: "/photography",
    image: "/photos/photo-020.jpg",
  },
  {
    number: "Ar.",
    title: "Architecture",
    subtitle: "Selected Projects 2022–2026",
    href: "/architecture",
    image: "/architecture/pages/page-01.png",
  },
];

const press = [
  {
    title: "Honorable Mention",
    where: "WA Starter Home Plan's Townhouse Design Competition",
    date: "2026",
    body: "4-3-2 Homes — a modular townhouse for Washington's missing-middle housing needs.",
    link: "https://starterhomeplan.org/news/winners-announced-in-townhouse-design-competition" as string | undefined,
  },
  {
    title: "Published Chapter",
    where: "Materials of Abolition — The ReView: Common Good, Ch. 7: Technology & Making",
    date: "March 2026",
    body: "Contributing researcher, material studies on abolition-oriented design practice. Tulane School of Architecture and Built Environment.",
    link: "https://issuu.com/tulanearch/docs/chapter_7_-_technology_and_making" as string | undefined,
  },
  {
    title: "Book Design",
    where: "Sugar Roots",
    date: "Tulane SoA",
    body: "Designed and published the book, produced through the Albert and Tina Small Center for Collaborative Design.",
    link: "https://small.tulane.edu/project/sugarroots/" as string | undefined,
  },
  {
    title: "Study Abroad",
    where: "UW Architecture in Rome — Roman Palimpsest Program",
    date: "Autumn 2025",
    body: "Watercolor studies and hand-drawn design across Venice, Rome, Civita, Pompeii, Paestum, and the Amalfi Coast.",
  },
];

const socials = [
  { label: "Email", href: "mailto:wedeendu@hotmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/e.n.d.a.l.e/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/endale-bekele-5924107b/" },
];

export default function Home() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0, y = 24) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  });

  const inView = (delay = 0, y = 24) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.9, ease, delay },
  });

  return (
    <div
      className="relative font-sans overflow-x-hidden"
      style={
        {
          "--color-bg": "#0a0a0a",
          "--color-fg": "#f2f2f0",
          "--color-muted": "#8a8a80",
          "--color-border": "rgba(255, 255, 255, 0.10)",
          background: "#0a0a0a",
          color: "#f2f2f0",
        } as React.CSSProperties
      }
    >
      <Nav />

      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-0"
        >
          <Image
            src="/site-plan-hero.jpg"
            alt="Rainier Beach Water Quality Field Lab — site plan"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/20" />
          <div className="absolute inset-0 bg-[#0a0a0a]/25" />
        </motion.div>

        <div className="relative px-8 md:px-16 pb-20 md:pb-24 pt-40 md:pt-0">
          <motion.h1
            {...fadeUp(0.35)}
            className="uppercase text-[#f2ede0] text-[clamp(2rem,6vw,4.75rem)] leading-[0.98] tracking-[0.04em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          >
            <span className="font-thin">Endale</span>
            <br />
            <span className="font-light">Bekele</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.85)}
            className="mt-8 md:mt-10 text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#e6e6e0] font-bold"
          >
            Architectural Designer &amp; Artist
          </motion.p>
        </div>
      </section>

      <section
        id="biography"
        className="relative px-6 md:px-16 py-24 md:py-40 border-t border-[#1c1c1c]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div {...inView()} className="md:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#141414]">
              <Image
                src="/portrait-brick.png"
                alt="Endale Bekele"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover grayscale-[15%]"
                style={{ objectPosition: "60% 40%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
              <span
                aria-hidden
                className="absolute bottom-4 left-4 font-black text-[#edc231] text-2xl md:text-3xl tracking-[0.06em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
              >
                01
              </span>
            </div>
          </motion.div>

          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              {...inView(0.05)}
              className="text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.24em] text-[#e6e6e0] mb-4"
            >
              About Me
            </motion.p>
            <motion.h2
              {...inView(0.1)}
              className="text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] mb-10 md:mb-14"
            >
              <span className="italic font-light">My</span>{" "}
              <span className="font-bold">Biography.</span>
            </motion.h2>

            <div className="flex flex-col gap-6 md:gap-7 max-w-xl">
              {bioParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  {...inView(0.2 + i * 0.08)}
                  className="text-[14px] md:text-[15px] leading-[1.7] text-[#d4d4cc]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-24 md:py-40 border-t border-[#1c1c1c]">
        <div className="mb-14 md:mb-20">
          <motion.h2
            {...inView(0.08)}
            className="text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em]"
          >
            <span className="italic font-light">My</span>{" "}
            <span className="font-bold">Practice.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {works.map((w, i) => (
            <motion.div key={w.href} {...inView(0.15 + i * 0.08)}>
              <Link href={w.href} className="group block cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="italic font-light text-[clamp(3rem,6vw,5rem)] text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
                      {w.number}
                    </span>
                  </div>
                </div>
                <div className="mt-5 md:mt-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a8a80] mb-2">
                    Selected Work
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold tracking-[-0.01em]">
                    {w.title}
                  </p>
                  <p className="mt-1 text-[12px] text-[#c8c8bf]">
                    {w.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="press"
        className="relative px-6 md:px-16 py-24 md:py-40 border-t border-[#1c1c1c]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-8">
            <motion.p
              {...inView(0.05)}
              className="text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.24em] text-[#e6e6e0] mb-4"
            >
              Highlights
            </motion.p>
            <motion.h2
              {...inView(0.1)}
              className="text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] mb-12 md:mb-16"
            >
              <span className="italic font-light">The</span>{" "}
              <span className="font-bold">Press.</span>
            </motion.h2>

            <div className="flex flex-col divide-y divide-[#1f1f1f]">
              {press.map((p, i) => (
                <motion.article
                  key={p.title}
                  {...inView(0.2 + i * 0.1)}
                  className="py-6 md:py-8 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a8a80]">
                      {p.date}
                    </p>
                    <span className="text-[#3a3a34]">/</span>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#c8c8bf]">
                      {p.title}
                    </p>
                  </div>
                  <p className="text-xl md:text-2xl font-semibold mb-3">
                    {p.where}
                  </p>
                  <p className="text-[14px] leading-[1.65] text-[#c8c8bf] max-w-xl">
                    {p.body}
                  </p>
                  {"link" in p && p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-[11px] uppercase tracking-[0.18em] text-[#e6e6e0] hover:text-white transition-colors cursor-pointer"
                    >
                      View chapter
                      <span aria-hidden>&rarr;</span>
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative px-6 md:px-16 pt-16 md:pt-24 pb-10 border-t border-[#1c1c1c]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.24em] text-[#e6e6e0] mb-4">
              Get in Touch
            </p>
            <h3 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em]">
              <span className="italic font-light">Let&rsquo;s</span>{" "}
              <span className="font-bold">build something.</span>
            </h3>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[#1f1f1f] py-3 hover:border-[#3a3a34] transition-colors cursor-pointer"
              >
                <span className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#c8c8bf] group-hover:text-white transition-colors">
                  {s.label}
                </span>
                <span className="text-[15px] md:text-[17px] font-semibold text-[#e6e6e0] group-hover:text-white group-hover:translate-x-1 transition-all">
                  {s.href.startsWith("mailto:")
                    ? s.href.replace("mailto:", "")
                    : s.href.replace(/^https?:\/\//, "")}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-[#565650]">
          <p>&copy; {new Date().getFullYear()} Endale Bekele. All rights reserved.</p>
          <p>Seattle, WA</p>
        </div>
      </footer>
    </div>
  );
}

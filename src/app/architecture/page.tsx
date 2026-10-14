import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArchitectureFlipBook } from "@/components/ArchitectureFlipBook";
import { FadeIn } from "@/components/motion-helpers";

const pageUrl = (n: number) =>
  `/architecture/pages/page-${String(n).padStart(2, "0")}.png`;

const pageRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => pageUrl(start + i));

const projects = [
  {
    slug: "rainier-beach-field-lab",
    number: "01",
    title: "Rainier Beach Water Quality Field Lab",
    year: "Winter 2025",
    tag: "ARCH 504 · University of Washington",
    pages: pageRange(3, 12),
  },
  {
    slug: "wa-starter-home",
    number: "02",
    title: "WA Starter Home Plan’s Townhouse Design Competition",
    year: "2026 · Honorable Mention",
    tag: "4-3-2 Homes · Modular Townhouse Design",
    pages: pageRange(13, 18),
  },
  {
    slug: "transitional-housing",
    number: "03",
    title: "Transitional Housing",
    year: "September 2023",
    tag: "Nonprofit Collaboration · Prefabricated Duplex Prototype",
    pages: pageRange(19, 24),
  },
  {
    slug: "nomas-roots",
    number: "04",
    title: "NOMAs Student Competition",
    year: "Spring 2025",
    tag: "ROOTS of Community · Paseo West, Kansas City",
    pages: pageRange(25, 34),
  },
  {
    slug: "roman-palimpsest",
    number: "05",
    title: "Study Abroad — Roman Palimpsest, Italy",
    year: "Autumn 2025",
    tag: "Watercolor Studies & Isola Tiberina · Rome, IT",
    pages: pageRange(35, 42),
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-white">
        <section className="relative min-h-[68svh] md:min-h-[78svh] flex items-end overflow-hidden text-white">
          <Image
            src="/architecture-hero-atrium.jpg"
            alt="Interior atrium and stair — Rainier Beach Water Quality Field Lab"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

          <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pb-14 md:pb-20 pt-32">
            <FadeIn>
              <p className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-white/80 mb-4">
                Selected Collection 2022&ndash;2026
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-black text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.02em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
                Architecture
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-xl text-[14px] md:text-[15px] leading-[1.7] text-white/75">
                Five selected projects &mdash; civic research, modular housing,
                transitional housing, community development, and study
                abroad work. Each project is its own set of pages: click to
                enlarge, or use the arrows to move through it.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <a
                href="/architecture/Endale_Bekele_Portfolio_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block mt-9 md:mt-11 max-w-[14em] font-black uppercase tracking-[-0.01em] leading-[1.05] text-[clamp(1.75rem,5.5vw,3.5rem)] text-white hover:text-white/75 transition-colors cursor-pointer underline decoration-[0.06em] underline-offset-[0.14em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
              >
                Download Full{" "}
                <span className="whitespace-nowrap">
                  PDF
                  <span
                    aria-hidden
                    className="inline-block ml-[0.3em] transition-[translate] duration-300 ease-out group-hover:translate-x-[0.2em]"
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            </FadeIn>
          </div>
        </section>

        {projects.map((project, i) => (
          <section
            key={project.slug}
            id={project.slug}
            className={`bg-white ${i > 0 ? "border-t border-black/10" : ""}`}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
              <FadeIn>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/50">
                  {project.number} &nbsp;&middot;&nbsp; {project.year}
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h2 className="mt-3 font-black text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl">
                  {project.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/40">
                  {project.tag}
                </p>
              </FadeIn>
            </div>

            <div className="pt-10 md:pt-14 pb-16 md:pb-24">
              <ArchitectureFlipBook pages={project.pages} label="Pages" />
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

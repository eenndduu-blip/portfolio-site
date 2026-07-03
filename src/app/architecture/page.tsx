import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { YellowCircle } from "@/components/YellowCircle";
import { ArchProjectSection } from "@/components/ArchProjectSection";
import { FadeIn, SlideIn, CrossFade } from "@/components/motion-helpers";

const pageUrl = (n: number) =>
  `/architecture/pages/page-${String(n).padStart(2, "0")}.png`;

const projects = [
  {
    slug: "wa-starter-home",
    number: "01",
    title: "WA Starter Home Plan's Townhouse Design Competition",
    year: "2026 · Honorable Mention",
    tag: "4-3-2 Homes · Modular Townhouse Design",
    location: "Washington State",
    brief:
      "A modular townhouse for Washington's missing-middle housing needs. Four flexible modules arrange into two-, three-, or four-bedroom homes — adaptable for roommates, small families, and intergenerational households. The system fits dense urban lots to single-family areas and supports modern, farmhouse, and craftsman exteriors alike.",
    cover: pageUrl(3),
    gallery: [4, 5, 6, 7, 8].map(pageUrl),
  },
  {
    slug: "rainier-beach",
    number: "02",
    title: "Rainier Beach Water Quality Field Lab",
    year: "Winter 2025",
    tag: "ARCH 504 · University of Washington",
    location: "Rainier Beach, Seattle, WA",
    brief:
      "A facility for water research, public education, and environmental advocacy in Rainier Beach. The roof extends from the street as a continuous public surface — acting as a bridge from the urban block down to the lake — while balancing climate-responsive design, durable materials, and energy-efficient systems.",
    cover: pageUrl(9),
    gallery: [10, 11, 12, 13, 14, 15, 16, 17, 18].map(pageUrl),
  },
  {
    slug: "roots-nomas",
    number: "03",
    title: "ROOTS of Community — NOMAs Student Competition",
    year: "Spring 2025",
    tag: "NOMAs Student Competition · Paseo West",
    location: "Kansas City, MO",
    brief:
      "A mixed-use, community-driven housing project that treats housing as the foundation of a living ecosystem. Combines multi-generational affordable housing with food sovereignty, cultural identity, and economic development — Afro-futurist design rooted in the legacy of 18th & Vine.",
    cover: pageUrl(19),
    gallery: [20, 21, 22, 23, 24, 25, 26, 27, 28].map(pageUrl),
  },
  {
    slug: "gondar-hospital",
    number: "04",
    title: "Gondar Specialized Hospital Campus Master Plan",
    year: "September 2022",
    tag: "Master Plan · Ethiopian Construction Design & Supervision Works",
    location: "Gondar, Ethiopia",
    brief:
      "A master plan transforming an unplanned institutional site into a sustainable, high-density medical and academic hub. Organized into five districts — Hospital, Academic, Student Dormitory, Administrative/Research, and Staff Residence — connected by a central 'Green Spin' corridor and landmark bridge.",
    cover: pageUrl(29),
    gallery: [30, 31, 32, 33, 34].map(pageUrl),
  },
  {
    slug: "roman-palimpsest-watercolor",
    number: "05",
    title: "Roman Palimpsest — Watercolor Studies",
    year: "Autumn 2025 · Part 1",
    tag: "Study Abroad · Rome, IT",
    location: "Rome, Italy",
    brief:
      "Watercolor studies made during the Roman Palimpsest study abroad program — reading the city through layers of stone, repair, and light. The paintings treat the site as a palimpsest where past and present coexist, and become a way of thinking through material, weather, and time.",
    cover: pageUrl(35),
    gallery: [36, 37, 38, 39].map(pageUrl),
  },
  {
    slug: "isola-tiberina",
    number: "06",
    title: "Isola Tiberina — Hand-Drawn Conceptual Design",
    year: "Autumn 2025 · Part 2",
    tag: "Study Abroad · Rome, IT",
    location: "Isola Tiberina, Rome",
    brief:
      "A hand-drawn revitalization of Rome's only river island. Improves riverfront access and pedestrian connections, highlights historic sites, enhances flood protection, and activates spaces for culture, recreation, and public life. Every floor plan, site plan, and spatial intervention was drawn by hand.",
    cover: pageUrl(40),
    gallery: [41, 42, 43].map(pageUrl),
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 overflow-x-clip">
        <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <YellowCircle
              size="min(28vw, 320px)"
              className="top-[-6%] left-[-6%]"
              delay={0.05}
            />
            <YellowCircle
              size="min(46vw, 520px)"
              className="top-[12%] right-[-8%]"
              delay={0.15}
            />
          </div>

          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center px-6 md:px-12 pt-12 md:pt-20 pb-16">
            <div className="md:col-span-5 md:col-start-1">
              <FadeIn>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Architecture &nbsp;&mdash;&nbsp; Selected Collection 2022&ndash;2025
                </p>
              </FadeIn>

              <FadeIn delay={0.12}>
                <h1 className="font-display text-[clamp(1.5rem,4.5vw,3.75rem)] leading-[0.9] tracking-[-0.03em] mt-6 font-black">
                  Endale
                  <br />
                  Bekele.
                </h1>
              </FadeIn>

              <FadeIn delay={0.24}>
                <dl className="mt-10 grid grid-cols-2 gap-y-3 max-w-sm text-[12px] uppercase tracking-[0.14em]">
                  <dt className="text-[var(--color-muted)]">Based</dt>
                  <dd>Seattle, WA</dd>
                  <dt className="text-[var(--color-muted)]">Focus</dt>
                  <dd>Sustainable · Community</dd>
                  <dt className="text-[var(--color-muted)]">Tools</dt>
                  <dd>Revit · Rhino · Adobe CS</dd>
                  <dt className="text-[var(--color-muted)]">Contact</dt>
                  <dd className="normal-case tracking-normal">
                    <a
                      href="mailto:endu@uw.edu"
                      className="underline underline-offset-2"
                    >
                      endu@uw.edu
                    </a>
                  </dd>
                </dl>
              </FadeIn>

              <FadeIn delay={0.5}>
                <a
                  href="/architecture/Endale_Portfolio2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-10 px-5 py-3 border border-[var(--color-fg)] text-[12px] uppercase tracking-[0.18em] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-colors cursor-pointer"
                >
                  View Full Portfolio (PDF)
                  <span aria-hidden>&rarr;</span>
                </a>
              </FadeIn>
            </div>

            <SlideIn
              from="right"
              delay={0.2}
              className="relative md:col-span-6 md:col-start-7 w-full aspect-square shadow-[0_40px_120px_-30px_rgba(0,0,0,0.35)] bg-white"
            >
              <Image
                src={pageUrl(1)}
                alt="Endale Bekele — Architectural Portfolio cover"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </SlideIn>
          </div>

          <div className="relative flex items-center justify-between px-6 md:px-12 pb-8 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span>Portfolio &nbsp;&middot;&nbsp; 2026</span>
            <span>Scroll for Projects &nbsp;&darr;</span>
          </div>
        </section>

        {projects.map((project, i) => (
          <ArchProjectSection key={project.slug} project={project} index={i} />
        ))}

        <section className="relative px-6 md:px-12 py-24 md:py-32 border-t border-[var(--color-border)]">
          <CrossFade>
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
                Full Portfolio &nbsp;&mdash;&nbsp; 43 pages
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1] tracking-[-0.02em] font-black mb-6">
                Download or read the complete portfolio.
              </h2>
              <p className="text-[15px] leading-[1.65] text-[var(--color-muted)] mb-8">
                A full document of process work, drawings, models, and
                writing across six selected projects — from the WA
                Starter Home Townhouse Competition through study abroad
                in Rome.
              </p>
              <a
                href="/architecture/Endale_Portfolio2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-[var(--color-fg)] text-[var(--color-bg)] text-[12px] uppercase tracking-[0.18em] hover:bg-[var(--color-accent)] hover:text-[var(--color-fg)] transition-colors cursor-pointer"
              >
                Open PDF &nbsp;&nbsp;&rarr;
              </a>
            </div>
          </CrossFade>
        </section>
      </main>
      <Footer />
    </>
  );
}

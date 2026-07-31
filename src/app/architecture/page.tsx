import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArchitectureBook } from "@/components/ArchitectureBook";
import { FadeIn } from "@/components/motion-helpers";

const TOTAL_PAGES = 43;

const pageUrl = (n: number) =>
  `/architecture/pages/page-${String(n).padStart(2, "0")}.png`;

const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => pageUrl(i + 1));

export default function ArchitecturePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-white">
        <section className="relative bg-white text-[#0f0f0f] px-6 md:px-12 pt-16 md:pt-24 pb-4 md:pb-8">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/45 mb-4">
                Architecture &nbsp;&mdash;&nbsp; Selected Collection 2022&ndash;2026
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-display font-black text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em]">
                Endale Bekele
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-4 max-w-xl text-[14px] md:text-[15px] leading-[1.7] text-black/55">
                A complete portfolio of six selected projects &mdash; housing,
                adaptive reuse, master planning, and study abroad work. Click
                a page to enlarge, or use the arrows to move through it.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <a
                href="/architecture/Endale_Portfolio2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[12px] uppercase tracking-[0.18em] text-black/70 hover:text-black transition-colors cursor-pointer underline underline-offset-4"
              >
                Download PDF
                <span aria-hidden>&rarr;</span>
              </a>
            </FadeIn>
          </div>
        </section>

        <ArchitectureBook pages={pages} />
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import { picsumUrl } from "@/lib/projects";
import { Reveal } from "./Reveal";

const stats = [
  { label: "Years practicing", value: "12" },
  { label: "Built & exhibited works", value: "46" },
  { label: "Countries", value: "9" },
];

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-6 border-y border-[var(--color-border)]"
    >
      <div className="md:col-span-2 relative aspect-[4/5] md:aspect-auto border-b md:border-b-0 md:border-r border-[var(--color-border)]">
        <Image
          src={picsumUrl("about-portrait", 800, 1000)}
          alt="Portrait in the studio"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover grayscale"
        />
      </div>

      <div className="md:col-span-4 px-6 md:px-10 py-14 md:py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
            About
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="font-display text-2xl md:text-4xl leading-[1.3] max-w-2xl">
            I work across disciplines &mdash; treating a painting, a
            building, and a photograph as the same problem of light,
            structure, and restraint.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
            Trained in fine art and architecture, my practice moves freely
            between studio, site, and field. Recent work has been exhibited
            in Lisbon, Kyoto, and New York, and built across three
            continents. I take on a small number of commissions each year,
            spanning private residences, gallery installations, and
            editorial commissions.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-3 gap-6 max-w-lg border-t border-[var(--color-border)] pt-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.16 + i * 0.06}>
              <div>
                <p className="font-display text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

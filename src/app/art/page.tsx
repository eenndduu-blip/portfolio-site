import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ZoomableImage } from "@/components/ZoomableImage";
import { FadeIn } from "@/components/motion-helpers";

type Study = {
  slug: string;
  number: string;
  title: string;
  year: string;
  tag: string;
  note: string;
  image: string;
  aspect: string;
};

const studies: Study[] = [
  {
    slug: "venice",
    number: "01",
    title: "Venice",
    year: "2026",
    tag: "Watercolor Study · Venice, IT",
    note: "The first stop of the program, where the city revealed itself slowly through water, stone, and morning light.",
    image: "/art/rome/rome-05.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "portico-di-ottavia",
    number: "02",
    title: "Portico of Octavia",
    year: "2026",
    tag: "Watercolor & Ink · Rome, IT",
    note: "Ancient marble, Roman brick, and medieval repair layered into a single threshold.",
    image: "/art/venice-palimpsest.jpg",
    aspect: "aspect-[2/3]",
  },
  {
    slug: "portico-study-sheet",
    number: "03",
    title: "Portico of Octavia — Study Sheet",
    year: "2026",
    tag: "Analytical Sheet · Rome, IT",
    note: "A measured sheet locating the portico in Rome and reading its layers of material, repair, and reuse.",
    image: "/art/portico-description-note.png",
    aspect: "aspect-[16/9]",
  },
  {
    slug: "house-in-civita",
    number: "04",
    title: "A House in Civita",
    year: "2026",
    tag: "Watercolor Study · Civita di Bagnoregio, IT",
    note: "A small house where a doorway, a window, and a bare tree tell the story of the whole town.",
    image: "/art/hero-house-civita.png",
    aspect: "aspect-[3/4]",
  },
  {
    slug: "civita",
    number: "05",
    title: "Civita",
    year: "2026",
    tag: "Watercolor Study · Civita di Bagnoregio, IT",
    note: "A hilltop settlement reached only by footbridge, its history exposed through the cliff itself.",
    image: "/art/civita-featured.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "pompeii",
    number: "06",
    title: "Pompeii",
    year: "2026",
    tag: "Watercolor Study · Pompeii, IT",
    note: "A city stopped mid-life, where ordinary streets and houses became witnesses to the eruption.",
    image: "/art/pompeii.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "piazza-del-popolo",
    number: "07",
    title: "Piazza del Popolo",
    year: "2026",
    tag: "Watercolor Study · Rome, IT",
    note: "Rome's northern gateway, where ancient, Christian, Renaissance, and modern life share one open ground.",
    image: "/art/rome/rome-11.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "paestum",
    number: "08",
    title: "Paestum",
    year: "2026",
    tag: "Watercolor Study · Paestum, IT",
    note: "Greek temples standing alone in open landscape, where stone, shadow, and proportion do all the work.",
    image: "/art/rome/rome-15.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "amalfi-coast",
    number: "09",
    title: "Amalfi Coast",
    year: "2026",
    tag: "Watercolor Study · Amalfi, IT",
    note: "Painted from a mountain lemon grove, with houses carved into the cliffs above the Mediterranean.",
    image: "/art/rome/rome-17.png",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "the-corner-stone",
    number: "10",
    title: "The Corner Stone",
    year: "2026",
    tag: "Watercolor Study · Rome, IT",
    note: "A Roman arch as palimpsest, holding both the weight of empire and the quiet presence of faith.",
    image: "/art/rome/rome-19.png",
    aspect: "aspect-[4/3]",
  },
];

export default function ArtPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-white">
        <section className="relative min-h-[46svh] md:min-h-[62svh] flex items-end overflow-hidden bg-white text-[#0f0f0f]">
          <Image
            src="/art/ponte-sant-angelo.jpg"
            alt="Ponte Sant'Angelo and Castel Sant'Angelo — pencil section drawing"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/65 to-transparent" />

          <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pb-14 md:pb-20 pt-32">
            <FadeIn>
              <p className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.24em] text-black/55 mb-4">
                Roman Palimpsest Program &nbsp;&middot;&nbsp; 2026
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-black text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
                Art
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-xl text-[14px] md:text-[15px] leading-[1.7] text-black/60">
                Watercolors made across Italy during the UW Architecture in
                Rome program, painted to slow down and learn how each place
                actually feels.
              </p>
            </FadeIn>
          </div>
        </section>

        {studies.map((study, i) => (
          <section
            key={study.slug}
            id={study.slug}
            className={`bg-white ${i > 0 ? "border-t border-black/10" : ""}`}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
              <FadeIn>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-black/50">
                  {study.number} &nbsp;&middot;&nbsp; {study.year}
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h2 className="mt-3 font-black text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] max-w-3xl text-[#0f0f0f]">
                  {study.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/40">
                  {study.tag}
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="mt-5 max-w-2xl text-[14px] md:text-[15px] leading-[1.7] text-black/60">
                  {study.note}
                </p>
              </FadeIn>
            </div>

            <div className="pt-10 md:pt-14 pb-16 md:pb-24 px-4 md:px-12">
              <div className="max-w-5xl mx-auto">
                <div
                  className={`relative w-full max-w-[760px] mx-auto ${study.aspect} bg-white shadow-[0_20px_70px_-20px_rgba(0,0,0,0.25)]`}
                >
                  <ZoomableImage
                    src={study.image}
                    alt={`${study.title} — watercolor`}
                    sizes="(min-width: 768px) 60vw, 92vw"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

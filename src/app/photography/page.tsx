import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { YellowCircle } from "@/components/YellowCircle";
import { FadeIn } from "@/components/motion-helpers";
import { PlaceGallery, type Place } from "@/components/PlaceGallery";
import Image from "next/image";

const photoUrl = (place: string, n: number, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/photos/${place}/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  );

const places: Place[] = [
  {
    slug: "venice",
    title: "Venice.",
    meta: "Venice, IT",
    description:
      "Water taxis, quiet mornings on the lagoon, and the light between palazzi.",
    photos: photoUrl("venice", 10, 10),
  },
  {
    slug: "verona",
    title: "Verona.",
    meta: "Verona, IT",
    description:
      "Stone piazzas, arches, and the slow evening pace along the Adige.",
    photos: photoUrl("verona", 10, 10),
  },
  {
    slug: "ferrara",
    title: "Ferrara.",
    meta: "Ferrara, IT",
    description:
      "Brick walls, bicycle streets, and a quiet Renaissance grid.",
    photos: photoUrl("ferrara", 9, 9),
  },
  {
    slug: "rome",
    title: "Rome.",
    meta: "Rome, IT",
    description:
      "Layered history: Roman, medieval, and modern life sharing the same walls.",
    photos: photoUrl("rome", 9, 9),
  },
  {
    slug: "orvieto",
    title: "Orvieto.",
    meta: "Orvieto, IT",
    description: "A hilltop town cut into volcanic tufa, above the plain.",
    photos: photoUrl("orvieto", 2, 2),
  },
];

export default function PhotographyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative min-h-[92svh] flex flex-col justify-end px-6 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden text-white">
          <Image
            src="/photos/venice/photo-01.jpg"
            alt="Venice — featured landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale contrast-[1.05] -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 -z-10" />

          <YellowCircle
            size="min(38vw, 420px)"
            className="top-[8%] right-[-6%]"
            opacity={0.55}
          />

          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/75">
              Photography &nbsp;&mdash;&nbsp; {places.length} places
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-4 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-[-0.03em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              Quiet,
              <br />
              attentive
              <br />
              <em className="not-italic font-display">frames.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-10 max-w-xl text-sm md:text-base text-white/80 leading-relaxed">
              Images made in transit across northern Italy &mdash; Venice,
              Verona, Ferrara, Rome, and Orvieto. Each place organized as
              its own short set.
            </p>
          </FadeIn>
        </section>

        {places.map((place, i) => (
          <PlaceGallery key={place.slug} place={place} index={i} />
        ))}
      </main>
      <Footer />
    </>
  );
}

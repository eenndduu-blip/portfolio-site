import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { YellowCircle } from "@/components/YellowCircle";
import { FadeIn, CrossFade } from "@/components/motion-helpers";
import { galleryPhotos } from "@/lib/projects";

export default function PhotographyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20 overflow-hidden">
          <YellowCircle
            size="min(46vw, 500px)"
            className="top-[10%] right-[-8%]"
          />
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Photography
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-4 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-[-0.03em]">
              Quiet,
              <br />
              attentive
              <br />
              <em className="not-italic font-display">frames.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-10 max-w-xl text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
              An archive of images made in transit and in stillness &mdash;
              across coastlines, studios, and unfamiliar cities.
            </p>
          </FadeIn>
        </section>

        <CrossFade>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src={galleryPhotos[12]}
              alt="Featured photograph"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </CrossFade>

        <Gallery showHeader={false} />
      </main>
      <Footer />
    </>
  );
}

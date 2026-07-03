"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { picsumUrl } from "@/lib/projects";

const socials = [
  { label: "Li", href: "#", aria: "LinkedIn" },
  { label: "Ig", href: "#", aria: "Instagram" },
  { label: "Be", href: "#", aria: "Behance" },
  { label: "@", href: "#contact", aria: "Email" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative w-full min-h-[100svh] bg-[#eeeeec] text-[#1f1f1f] overflow-hidden pt-20 md:pt-24 pb-28 md:pb-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 px-6 md:px-10 h-full items-start md:items-center">
        <motion.aside
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="md:col-span-3 md:pl-6 lg:pl-12 max-w-sm md:order-1 order-2"
        >
          <p className="text-[#565656] text-[15px] leading-snug mb-3">
            I&rsquo;m Your Name &mdash; an artist and designer working at
            the intersection of art, architecture, and photography. I make
            quiet objects, careful buildings, and patient images.
          </p>
          <Link
            href="/#about"
            className="inline-block text-[13px] font-extrabold text-[#1f1f1f] border-b-2 border-[#1f1f1f] pb-[2px] hover:opacity-70 transition-opacity cursor-pointer"
          >
            Read More
          </Link>
        </motion.aside>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="md:col-span-5 relative justify-self-center w-full max-w-[620px] aspect-[5/6] md:aspect-auto md:h-[min(72vh,690px)] md:min-h-[520px] flex items-end justify-center order-1 md:order-2"
        >
          <motion.div
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[min(76vw,440px)] aspect-square min-w-[300px] rounded-full bg-[#edc231]"
            aria-hidden
          />
          <Image
            src={picsumUrl("about-portrait", 900, 1200)}
            alt="Portrait of Your Name"
            width={900}
            height={1200}
            priority
            className="relative h-full w-auto max-w-full object-cover object-[center_bottom] grayscale contrast-[1.07] mix-blend-multiply"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="md:col-span-4 md:order-3 order-3 max-w-md md:max-w-none md:pr-2"
        >
          <h1
            className="lowercase font-black tracking-[-0.075em] leading-[0.82] text-[clamp(56px,8vw,112px)]"
            style={{ fontWeight: 900 }}
          >
            <span className="block">make</span>
            <span className="block ml-[0.08em]">with light.</span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        className="absolute bottom-6 md:bottom-7 left-6 md:left-10 flex gap-3 z-10"
      >
        {socials.map((s) => (
          <Link
            key={s.aria}
            href={s.href}
            aria-label={s.aria}
            className="w-9 h-9 grid place-items-center rounded-full bg-[#1f1f1f] text-[#eeeeec] text-[13px] font-black hover:bg-[#1f1f1f]/85 transition-colors cursor-pointer"
          >
            {s.label}
          </Link>
        ))}
      </motion.div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.7 }}
        className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-9 text-[#565656] text-[12px] tracking-[0.08em] uppercase whitespace-nowrap z-10"
      >
        Art &nbsp;&middot;&nbsp; Architecture &nbsp;&middot;&nbsp; Photography
      </motion.p>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.7 }}
        className="absolute bottom-6 right-6 md:bottom-7 md:right-10 text-[15px] md:text-[17px] font-extrabold z-10"
      >
        Brooklyn, NY
      </motion.p>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { projectImageUrl } from "@/lib/projects";

const spanClasses: Record<Project["span"], string> = {
  lg: "md:col-span-4 aspect-[4/5] md:aspect-[16/10]",
  md: "md:col-span-3 aspect-[4/5]",
  sm: "md:col-span-2 aspect-[4/5] md:aspect-[3/4]",
};

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      className={`relative col-span-1 ${spanClasses[project.span]} group cursor-pointer overflow-hidden border border-[var(--color-border)]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: hovered ? 1.06 : 1 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={projectImageUrl(project, 1200, 1500)}
          alt={`${project.title} — ${project.category.toLowerCase()} work`}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-4 md:p-5 text-white">
        <span className="text-[10px] uppercase tracking-[0.14em] bg-black/60 px-2 py-1">
          {project.category}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] bg-black/60 px-2 py-1">
          {project.year}
        </span>
      </div>

      <motion.div
        initial={false}
        animate={
          shouldReduceMotion
            ? undefined
            : { y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white opacity-0 group-focus-within:opacity-100"
      >
        <h3 className="font-display text-xl md:text-2xl leading-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-white/75">{project.location}</p>
        <p className="mt-2 text-sm text-white/90 max-w-xs leading-snug hidden sm:block">
          {project.blurb}
        </p>
      </motion.div>
    </article>
  );
}

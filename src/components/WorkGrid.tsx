"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, projects, type Category } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

type Filter = "All" | Category;

const filters: Filter[] = ["All", ...categories];

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-5xl">Selected Work</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`text-xs uppercase tracking-[0.12em] px-3.5 py-2 border cursor-pointer transition-colors duration-200 ${
                  filter === f
                    ? "bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]"
                    : "border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-fg)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-px bg-[var(--color-border)] border border-[var(--color-border)]"
        >
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

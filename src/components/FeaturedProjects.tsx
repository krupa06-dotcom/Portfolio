"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ViewAllLink from "./ViewAllLink";
import { stagger, fadeUp } from "@/lib/motion";
import type { Project } from "@/lib/types";

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          {/* Eyebrow — deliberate label, not another gray line */}
          <p className="eyebrow mb-3">Selected Work</p>

          {/* H2 — heading color, 600 weight, noticeably larger than body */}
          <h2
            className="font-heading font-semibold text-2xl sm:text-3xl lg:text-5xl tracking-[-0.03em] mb-3"
            style={{ color: "#1A0C06" }}
          >
            Featured Projects
          </h2>

          {/* Subtext — body color, clearly lighter than h2 */}
          <p className="text-sm sm:text-base leading-[1.6] max-w-xl" style={{ color: "#6B3A26" }}>
            Live products I&apos;ve built end-to-end — from UI design to
            backend logic and deployment.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <ViewAllLink href="/projects" label="View All Projects" />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { cardStagger, cardVariants } from "@/lib/motion";
import type { Project } from "@/lib/types";

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          {/* Eyebrow — deliberate label, not another gray line */}
          <p className="eyebrow mb-3">Selected Work</p>

          {/* H2 — heading color, 600 weight, noticeably larger than body */}
          <h2
            className="font-heading font-semibold text-3xl lg:text-5xl tracking-[-0.03em] mb-3"
            style={{ color: "#16130F" }}
          >
            Featured Projects
          </h2>

          {/* Subtext — body color, clearly lighter than h2 */}
          <p className="text-base leading-[1.6] max-w-xl" style={{ color: "#55504A" }}>
            Live products I&apos;ve built end-to-end — from UI design to
            backend logic and deployment.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardStagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors duration-200 font-mono tracking-[0.08em] uppercase"
            style={{ color: "#8A857D" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#16130F"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A857D"; }}
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

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
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
              Selected Work
            </p>
            <h2 className="font-heading font-semibold text-3xl tracking-[-0.02em]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardStagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

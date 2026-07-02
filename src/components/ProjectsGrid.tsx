"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { cardStagger, cardVariants } from "@/lib/motion";
import type { Project } from "@/lib/types";

export default function ProjectsGrid({
  projects,
}: {
  projects: Project[];
}) {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
          No projects yet
        </p>
      </div>
    );
  }

  return (
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
  );
}

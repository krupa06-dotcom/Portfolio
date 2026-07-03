"use client";

import { motion } from "framer-motion";
import { tagStagger, tagVariants } from "@/lib/motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Next.js",
  "SQL",
  "PHP",
];

export default function SkillsStrip() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={tagStagger}
      className="relative py-12"
    >
      <div className="absolute inset-0 border-y border-[rgba(245,245,240,0.04)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={tagVariants}
              className="font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-md text-muted/80 border border-[rgba(245,245,240,0.06)] hover:border-accent/40 hover:text-accent transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

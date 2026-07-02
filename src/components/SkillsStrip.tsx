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
      className="py-16 border-y border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((skill) => (
            <motion.span key={skill} variants={tagVariants} className="tag">
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import type { Experience } from "@/lib/types";
import { motion } from "framer-motion";
import { expStagger, expVariants, lineVariants } from "@/lib/motion";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  const internships = experiences.filter((e) => e.type === "internship");
  const hackathons = experiences.filter((e) => e.type === "hackathon");

  return (
    <div className="space-y-16">
      {internships.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold text-2xl tracking-[-0.02em] mb-8">
            Internships
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={expStagger}
            className="space-y-0"
          >
            {internships.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={expVariants}
                className="flex gap-6 pb-8 relative last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1.5" />
                  {i < internships.length - 1 && (
                    <motion.div
                      className="w-px flex-1 bg-border mt-2 origin-top"
                      variants={lineVariants}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-1">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </div>
                  <h3 className="font-heading font-semibold text-lg tracking-[-0.02em]">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase mt-0.5 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {hackathons.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold text-2xl tracking-[-0.02em] mb-8">
            Hackathons
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={expStagger}
            className="space-y-0"
          >
            {hackathons.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={expVariants}
                className="flex gap-6 pb-8 relative last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1.5" />
                  {i < hackathons.length - 1 && (
                    <motion.div
                      className="w-px flex-1 bg-border mt-2 origin-top"
                      variants={lineVariants}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-1">
                    {formatDate(exp.start_date)}
                  </div>
                  <h3 className="font-heading font-semibold text-lg tracking-[-0.02em]">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase mt-0.5 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

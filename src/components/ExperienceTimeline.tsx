"use client";

import type { Experience, Hackathon } from "@/lib/types";
import { motion } from "framer-motion";
import { expStagger, expVariants, lineVariants } from "@/lib/motion";

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ExperienceTimeline({
  experience,
  hackathons,
}: {
  experience: Experience[];
  hackathons: Hackathon[];
}) {
  return (
    <div className="space-y-16">
      {experience.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold text-2xl tracking-[-0.02em] mb-8 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent glow-sm" />
            Internships
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={expStagger}
            className="space-y-0"
          >
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={expVariants}
                className="flex gap-6 pb-10 relative last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1.5 glow-sm" />
                  {i < experience.length - 1 && (
                    <motion.div
                      className="w-px flex-1 bg-[rgba(245,241,236,0.08)] mt-2 origin-top"
                      variants={lineVariants}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-muted/50 tracking-[0.08em] uppercase mb-1">
                    {formatDate(exp.start_date)}
                    {exp.end_date ? ` — ${formatDate(exp.end_date)}` : exp.start_date ? " — Present" : ""}
                  </div>
                  <h3 className="font-semibold text-lg tracking-[-0.02em]">
                    {exp.role}
                  </h3>
                    <p className="text-muted/70 font-mono text-xs tracking-[0.08em] uppercase mt-0.5 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted/70 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {hackathons.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold text-2xl tracking-[-0.02em] mb-8 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent glow-sm" />
            Hackathons
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={expStagger}
            className="space-y-0"
          >
            {hackathons.map((h, i) => (
              <motion.div
                key={h.id}
                variants={expVariants}
                className="flex gap-6 pb-10 relative last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1.5 glow-sm" />
                  {i < hackathons.length - 1 && (
                    <motion.div
                      className="w-px flex-1 bg-[rgba(245,241,236,0.08)] mt-2 origin-top"
                      variants={lineVariants}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-muted/50 tracking-[0.08em] uppercase mb-1">
                    {formatDate(h.date)}
                  </div>
                  <h3 className="font-semibold text-lg tracking-[-0.02em]">
                    {h.name}
                  </h3>
                  {h.result && (
                    <p className="text-muted/70 font-mono text-xs tracking-[0.08em] uppercase mt-0.5 mb-2">
                      {h.result}
                    </p>
                  )}
                  {h.url && (
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted/70 hover:text-accent transition-colors underline underline-offset-2 inline-block"
                    >
                      View event
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

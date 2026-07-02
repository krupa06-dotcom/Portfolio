"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { expStagger, expVariants } from "@/lib/motion";
import type { Experience } from "@/lib/types";

export default function ExperiencePreview({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
              Background
            </p>
            <h2 className="font-heading font-semibold text-3xl tracking-[-0.02em]">
              Experience
            </h2>
          </div>
          <Link
            href="/experience"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={expStagger}
          className="max-w-2xl space-y-8"
        >
          {experiences.slice(0, 2).map((exp) => (
            <motion.div key={exp.id} variants={expVariants} className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
              <div>
                <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-0.5">
                  {new Date(exp.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}{" "}
                  —{" "}
                  {exp.end_date
                    ? new Date(exp.end_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Present"}
                </p>
                <h3 className="font-heading font-semibold text-lg tracking-[-0.02em]">
                  {exp.role}
                </h3>
                <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase mt-0.5">
                  {exp.company}
                </p>
                <p className="text-sm text-muted mt-1">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 sm:hidden">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
          >
            View All Experience
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

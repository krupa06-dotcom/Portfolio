"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { expStagger, expVariants } from "@/lib/motion";
import type { Experience } from "@/lib/types";

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ExperiencePreview({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section className="py-24 bg-surface/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-xs text-accent tracking-[0.12em] uppercase mb-2">
              Background
            </p>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl tracking-[-0.03em]">
              Experience
            </h2>
          </div>
          <Link
            href="/experience"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted/70 hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
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
          className="max-w-2xl space-y-10"
        >
          {experiences.slice(0, 2).map((exp) => (
            <motion.div key={exp.id} variants={expVariants} className="flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-accent mt-2 shrink-0 glow-sm" />
              <div>
                <p className="font-mono text-xs text-muted/50 tracking-[0.08em] uppercase mb-0.5">
                  {formatDate(exp.start_date)}
                  {exp.end_date ? ` — ${formatDate(exp.end_date)}` : exp.start_date ? " — Present" : ""}
                </p>
                <h3 className="font-heading font-semibold text-lg tracking-[-0.02em]">
                  {exp.role}
                </h3>
                <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase mt-0.5">
                  {exp.company}
                </p>
                <p className="text-sm text-muted/70 mt-1 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 sm:hidden">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-muted/70 hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
          >
            View All Experience
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

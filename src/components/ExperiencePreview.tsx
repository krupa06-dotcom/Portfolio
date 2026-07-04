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
    <section className="py-24" style={{ backgroundColor: "#0E0C0A" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          {/* Eyebrow — white-tinted on black */}
          <p
            className="font-semibold text-xs tracking-[0.12em] uppercase mb-3"
            style={{ color: "#8A857D" }}
          >
            Background
          </p>

          {/* H2 — white on black */}
          <h2
            className="font-heading font-semibold text-3xl lg:text-5xl tracking-[-0.03em] mb-3"
            style={{ color: "#FAF7F2" }}
          >
            Experience
          </h2>

          {/* Body subtext — softer white */}
          <p className="text-sm leading-[1.6] max-w-lg" style={{ color: "#B5B0A8" }}>
            Internships and hackathons that shaped my approach to building
            products.
          </p>
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
              {/* Accent dot */}
              <div
                className="w-2.5 h-2.5 rounded-full mt-2 shrink-0"
                style={{
                  backgroundColor: "#B3382C",
                  boxShadow: "0 2px 8px rgba(179, 56, 44, 0.40)",
                }}
              />
              <div>
                {/* Date — muted on black */}
                <p
                  className="font-mono text-xs tracking-[0.08em] uppercase mb-0.5"
                  style={{ color: "#6B6660" }}
                >
                  {formatDate(exp.start_date)}
                  {exp.end_date
                    ? ` — ${formatDate(exp.end_date)}`
                    : exp.start_date
                    ? " — Present"
                    : ""}
                </p>

                {/* Role — bright white, max contrast */}
                <h3
                  className="font-bold text-lg tracking-[-0.02em]"
                  style={{ color: "#FAF7F2" }}
                >
                  {exp.role}
                </h3>

                {/* Company — softer white */}
                <p
                  className="font-mono text-xs tracking-[0.08em] uppercase mt-0.5"
                  style={{ color: "#B5B0A8" }}
                >
                  {exp.company}
                </p>

                {/* Description — muted white */}
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{ color: "#8A857D" }}
                >
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors duration-200 font-mono tracking-[0.08em] uppercase"
            style={{ color: "#8A857D" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F2"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A857D"; }}
          >
            View All Experience
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

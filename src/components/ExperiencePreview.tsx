"use client";

import { motion } from "framer-motion";
import ViewAllLink from "./ViewAllLink";
import { expStagger, expVariants } from "@/lib/motion";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/lib/types";

export default function ExperiencePreview({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#0E0C0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          {/* Eyebrow — white-tinted on black */}
          <p className="eyebrow mb-3">Background</p>

          {/* H2 — white on black */}
          <h2
            className="font-heading font-semibold text-2xl sm:text-3xl lg:text-5xl tracking-[-0.03em] mb-3"
                  style={{ color: "#FFF5E8" }}
          >
            Experience
          </h2>

          {/* Body subtext — softer white */}
          <p className="text-sm leading-[1.6] max-w-lg" style={{ color: "#D4B89C" }}>
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
                  style={{ color: "#BF8A6E" }}
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
            style={{ color: "#FFF8EE" }}
                >
                  {exp.role}
                </h3>

                {/* Company — softer white */}
                <p
                  className="font-mono text-xs tracking-[0.08em] uppercase mt-0.5"
                  style={{ color: "#D4B89C" }}
                >
                  {exp.company}
                </p>

                {/* Description — muted white */}
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{ color: "#BF8A6E" }}
                >
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ViewAllLink href="/experience" label="View All Experience" />
      </div>
    </section>
  );
}

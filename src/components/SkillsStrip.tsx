"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardStagger, cardVariants } from "@/lib/motion";
import type { Skill } from "@/lib/types";

export default function SkillsStrip({ skills }: { skills: Skill[] }) {
  const prefersReducedMotion = useReducedMotion();

  const groups = skills.reduce<{ label: string; items: string[] }[]>((acc, s) => {
    const existing = acc.find((g) => g.label === s.category);
    if (existing) {
      existing.items.push(s.name);
    } else {
      acc.push({ label: s.category, items: [s.name] });
    }
    return acc;
  }, []);

  return (
    <section className="w-full py-24 max-md:py-16" style={{ backgroundColor: "#B3382C" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p 
            className="text-sm tracking-[0.12em] uppercase mb-4"
            style={{ color: "#B8860B" }}
          >
            WHAT I WORK WITH
          </p>
          <h2 
            className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-[-0.02em]"
            style={{ color: "#FAF7F2" }}
          >
            Skills & Technologies
          </h2>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={!prefersReducedMotion ? cardStagger : undefined}
          initial={!prefersReducedMotion ? "hidden" : undefined}
          whileInView={!prefersReducedMotion ? "visible" : undefined}
          viewport={{ once: true, margin: "-40px" }}
        >
          {groups.map((group) => (
            <motion.div
              key={group.label}
              variants={!prefersReducedMotion ? cardVariants : undefined}
              className="border rounded-lg overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                border: "3px solid rgba(0,0,0,0.25)",
              }}
              whileHover={
                !prefersReducedMotion
                  ? { y: -4, transition: { duration: 0.2 } }
                  : undefined
              }
            >
              {/* Card header */}
              <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                <h3
                  className="text-sm uppercase tracking-[0.08em] font-semibold"
                  style={{ color: "#E5B80B" }}
                >
                  {group.label}
                </h3>
              </div>

              {/* Card body */}
              <div className="px-6 py-6">
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 text-sm font-medium rounded-full border transition-colors duration-200 cursor-default"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "#B3382C",
                        color: "#000000",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

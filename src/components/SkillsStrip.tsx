"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Skill } from "@/lib/types";

const defaultEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ease: defaultEasing, duration: 0.4, delay: i * 0.04 },
  }),
};

const CATEGORY_ORDER = ["Frontend", "Backend & Database", "Tools & Workflow"];

export default function SkillsStrip({ skills }: { skills: Skill[] }) {
  const prefersReducedMotion = useReducedMotion();

  const groups = CATEGORY_ORDER.map((category) => {
    const items = skills
      .filter((s) => s.category === category)
      .sort((a, b) => a.sort_order - b.sort_order);
    return { category, items };
  }).filter((g) => g.items.length > 0);

  let globalIndex = 0;

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--skills-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--skills-text-label)",
            }}
          >
            WHAT I WORK WITH
          </p>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(30px, 4vw, 36px)",
              color: "var(--skills-text-heading)",
              marginTop: "10px",
            }}
          >
            Skills &amp; Technologies
          </h2>
        </div>

        {/* Category groups */}
        <div className="space-y-12">
          {groups.map((group, gi) => {
            const number = String(gi + 1).padStart(2, "0");

            return (
              <motion.div
                key={group.category}
                custom={gi}
                variants={!prefersReducedMotion ? { ...cardVariant } : undefined}
                initial={!prefersReducedMotion ? "hidden" : undefined}
                whileInView={!prefersReducedMotion ? "visible" : undefined}
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Category label */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-heading"
                    style={{
                      fontSize: "clamp(24px, 2.5vw, 30px)",
                      color: "#facc15",
                    }}
                  >
                    {number}
                  </span>
                  <span
                    className="uppercase font-semibold tracking-[0.08em]"
                    style={{
                      fontSize: "11px",
                      color: "#facc15",
                    }}
                  >
                    {group.category}
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {group.items.map((skill) => {
                    const idx = globalIndex++;
                    return (
                      <motion.div
                        key={skill.id}
                        custom={idx}
                        variants={
                          !prefersReducedMotion ? cardVariant : undefined
                        }
                        initial={!prefersReducedMotion ? "hidden" : undefined}
                        whileInView={
                          !prefersReducedMotion ? "visible" : undefined
                        }
                        viewport={{ once: true, margin: "-20px" }}
                        className="rounded-xl px-4 py-3.5 text-center font-heading font-medium backdrop-blur-sm transition-colors hover:bg-white/20"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "var(--skills-text-heading)",
                          fontSize: "clamp(13px, 1.4vw, 16px)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {skill.name}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface Props {
  projects: Project[];
  categories: string[];
}

export function WorkGrid({ projects, categories }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  const filters = ["All", ...categories];

  return (
    <>
      {/* ── Category filter bar ─────────────────────────── */}
      <div
        className="border-b-hairline"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25rem",
          paddingBottom: "2rem",
          marginBottom: "3.5rem",
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.45rem 1.1rem",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: active === f ? "#B63A2B" : "rgba(221,213,200,0.2)",
              backgroundColor: active === f ? "#B63A2B" : "transparent",
              color: active === f ? "#F5F0E8" : "#8A847B",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Project grid ────────────────────────────────── */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(2rem, 3vw, 3rem)",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WorkCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "0.9375rem",
            color: "#8A847B",
            paddingTop: "3rem",
          }}
        >
          No projects in this category yet.
        </p>
      )}
    </>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
      <div className="group" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3/2",
            borderRadius: "2px",
            overflow: "hidden",
            backgroundColor: "#2D2D2D",
          }}
        >
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover img-editorial transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#2D2D2D" }} />
          )}
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2
              style={{
                fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "#F5F0E8",
                transition: "color 0.2s ease",
              }}
              className="group-hover:text-terracotta"
            >
              {project.title}
            </h2>
            <ArrowRight
              size={14}
              style={{
                color: "#B63A2B",
                opacity: 0,
                transform: "translateX(-4px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              className="group-hover:opacity-100 group-hover:translate-x-0"
            />
          </div>
          <p className="label-overline">
            {project.category ?? "Project"} — {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}

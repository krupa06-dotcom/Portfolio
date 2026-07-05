"use client";

import type { Project } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { defaultEasing } from "@/lib/motion";
import { useState } from "react";

export default function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ ease: defaultEasing, duration: 0.25 }}
      className="group block rounded-sm border overflow-hidden no-underline transition-all duration-200"
      style={{
        backgroundColor: "#000000",
        borderColor: "rgba(255,255,255,0.15)",
        boxShadow:
          "0 1px 3px rgba(60, 40, 30, 0.06), 0 4px 16px rgba(60, 40, 30, 0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 2px 6px rgba(60, 40, 30, 0.08), 0 10px 32px rgba(60, 40, 30, 0.12)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B3382C";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 1px 3px rgba(60, 40, 30, 0.06), 0 4px 16px rgba(60, 40, 30, 0.08)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
      }}
    >
      <div className="relative">
        {/* Mock browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Cover image */}
        <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          {project.cover_image_url && !imageError ? (
            <>
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
              {imageLoading && (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs tracking-[0.08em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Loading...
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs tracking-[0.08em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              {imageError ? "Image Error" : "No Image"}
            </div>
          )}
          {/* Warm fade-in overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(179,56,44,0.3) 0%, rgba(179,56,44,0.1) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          {/* Title — heading color, clear weight */}
          <h3
            className="font-bold text-base tracking-[-0.02em]"
            style={{ color: "#FFFFFF" }}
          >
            {project.title}
          </h3>
          <ExternalLink
            className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
          />
        </div>

        {/* Description — body color */}
        <p
          className="text-sm mb-3 line-clamp-2 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {project.description}
        </p>

        {/* Tags — true muted */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

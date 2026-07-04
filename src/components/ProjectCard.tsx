import type { Project } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { defaultEasing } from "@/lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ ease: defaultEasing, duration: 0.25 }}
      className="group block bg-surface rounded-sm border border-border overflow-hidden no-underline transition-all duration-200"
      style={{
        // Warm directional shadow — top-left light source, consistent across all cards
        boxShadow:
          "0 1px 3px rgba(60, 40, 30, 0.06), 0 4px 16px rgba(60, 40, 30, 0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 2px 6px rgba(60, 40, 30, 0.08), 0 10px 32px rgba(60, 40, 30, 0.12)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B3382C22";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 1px 3px rgba(60, 40, 30, 0.06), 0 4px 16px rgba(60, 40, 30, 0.08)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
      }}
    >
      <div className="relative">
        {/* Mock browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-background/80 border-b border-border/60">
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
        </div>

        {/* Cover image */}
        <div className="relative aspect-video bg-surface overflow-hidden">
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted/60 font-mono text-xs tracking-[0.08em] uppercase">
              No Image
            </div>
          )}
          {/* Warm fade-in overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(232,222,208,0.55) 0%, rgba(232,222,208,0.20) 40%, transparent 100%)",
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
            style={{ color: "#16130F" }}
          >
            {project.title}
          </h3>
          <ExternalLink
            className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-200"
            style={{ color: "#8A857D" }}
          />
        </div>

        {/* Description — body color */}
        <p
          className="text-sm mb-3 line-clamp-2 leading-relaxed"
          style={{ color: "#55504A" }}
        >
          {project.description}
        </p>

        {/* Tags — true muted */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono"
              style={{ color: "#8A857D" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

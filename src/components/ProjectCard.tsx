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
      whileHover={{ y: -6 }}
      transition={{ ease: defaultEasing, duration: 0.25 }}
      className="group block bg-surface/60 backdrop-blur-sm rounded-lg border border-[rgba(245,245,240,0.06)] overflow-hidden transition-all hover:border-accent/30 hover:bg-surface/80"
      style={{
        boxShadow: "0 0 0 0 rgba(255, 59, 59, 0)",
        transition: "box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 40px rgba(255, 59, 59, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 rgba(255, 59, 59, 0)";
      }}
    >
      <div className="relative aspect-video bg-surface/80 overflow-hidden">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted/50 font-mono text-xs tracking-[0.08em] uppercase">
            No Image
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-primary text-lg tracking-[-0.02em]">
            {project.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted/50 shrink-0 mt-1 transition-colors group-hover:text-accent" />
        </div>
        <p className="text-sm text-muted/70 mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded text-muted/50 border border-[rgba(245,245,240,0.06)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

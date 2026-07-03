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
      className="group block bg-surface/60 backdrop-blur-sm rounded-sm border border-[rgba(245,241,236,0.08)] overflow-hidden transition-all hover:border-accent/30 hover:bg-surface/80"
    >
      <div className="relative">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[rgba(18,12,12,0.6)] border-b border-[rgba(245,241,236,0.06)]">
          <span className="w-2 h-2 rounded-full bg-[rgba(245,241,236,0.15)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(245,241,236,0.15)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(245,241,236,0.15)]" />
        </div>
        <div className="relative aspect-video bg-surface/80 overflow-hidden">
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted/50 font-mono text-xs tracking-[0.08em] uppercase">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-primary text-base tracking-[-0.02em] group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <ExternalLink className="w-3.5 h-3.5 text-muted/50 shrink-0 mt-0.5 transition-colors group-hover:text-accent" />
        </div>
        <p className="text-sm text-muted/70 mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-muted/50 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

import type { Project } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-surface rounded-md border border-border overflow-hidden transition-all hover:border-[rgba(244,243,239,0.15)]"
    >
      <div className="relative aspect-video bg-surface overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted font-mono text-xs tracking-[0.08em] uppercase">
            No Image
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-primary text-lg tracking-[-0.02em]">
            {project.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted shrink-0 mt-1 transition-colors group-hover:text-accent" />
        </div>
        <p className="text-sm text-muted mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags?.map((tag) => (
            <span key={tag} className="tag text-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

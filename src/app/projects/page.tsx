import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
            Portfolio
          </p>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl tracking-[-0.02em]">
            Projects
          </h1>
          <p className="text-muted mt-2 max-w-lg">
            Live projects I&apos;ve built end-to-end.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
              No projects yet
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

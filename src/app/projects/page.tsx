import { getProjects } from "../actions";
import ProjectsGrid from "@/components/ProjectsGrid";

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

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}

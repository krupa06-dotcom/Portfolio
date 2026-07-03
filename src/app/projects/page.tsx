import { getProjects } from "../actions";
import ProjectsGrid from "@/components/ProjectsGrid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-semibold text-xs tracking-[0.15em] uppercase text-accent mb-2">
            Portfolio
          </p>
          <h1 className="font-heading font-semibold text-5xl lg:text-8xl tracking-[-0.03em] leading-[0.95]">
            Projects
          </h1>
          <p className="text-muted text-sm mt-2 max-w-lg leading-[1.6]">
            Live projects I&apos;ve built end-to-end.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}

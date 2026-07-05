import { getProjects } from "../actions";
import ProjectsGrid from "@/components/ProjectsGrid";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <PageHeader
          eyebrow="Portfolio"
          title="Projects"
          description="Live projects I&apos;ve built end-to-end."
        />
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}

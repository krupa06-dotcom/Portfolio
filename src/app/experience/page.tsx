import ExperienceTimeline from "@/components/ExperienceTimeline";
import { getExperiences } from "../actions";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
            Background
          </p>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl tracking-[-0.02em]">
            Experience
          </h1>
          <p className="text-muted mt-2 max-w-lg">
            Internships and hackathons I&apos;ve been part of.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
              No experience entries yet
            </p>
          </div>
        ) : (
          <ExperienceTimeline experiences={experiences} />
        )}
      </div>
    </div>
  );
}

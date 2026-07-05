import ExperienceTimeline from "@/components/ExperienceTimeline";
import PageHeader from "@/components/PageHeader";
import { getExperience, getHackathons } from "../actions";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const [experience, hackathons] = await Promise.all([
    getExperience(),
    getHackathons(),
  ]);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <PageHeader
          eyebrow="Background"
          title="Experience"
          description="Internships and hackathons I&apos;ve been part of."
        />
        {experience.length === 0 && hackathons.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
              No experience entries yet
            </p>
          </div>
        ) : (
          <ExperienceTimeline experience={experience} hackathons={hackathons} />
        )}
      </div>
    </div>
  );
}

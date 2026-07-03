import ExperienceTimeline from "@/components/ExperienceTimeline";
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
        <div className="mb-12">
          <p className="font-semibold text-xs tracking-[0.15em] uppercase text-accent mb-2">
            Background
          </p>
          <h1 className="font-heading font-semibold text-5xl lg:text-8xl tracking-[-0.03em] leading-[0.95]">
            Experience
          </h1>
          <p className="text-muted text-sm mt-2 max-w-lg leading-[1.6]">
            Internships and hackathons I&apos;ve been part of.
          </p>
        </div>

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

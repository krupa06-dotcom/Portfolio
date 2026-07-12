import { getFeaturedProjects, getExperience, getSkills } from "./actions";
import HeroSection from "@/components/HeroSection";
import SkillsStrip from "@/components/SkillsStrip";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperiencePreview from "@/components/ExperiencePreview";
import ContactCTA from "@/components/ContactCTA";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, experience, skills] = await Promise.all([
    getFeaturedProjects(),
    getExperience(),
    getSkills(),
  ]);

  return (
    <>
      <HeroSection />
      <SkillsStrip skills={skills} />
      <FeaturedProjects projects={projects} />
      <ExperiencePreview experiences={experience} />
      <ContactCTA />
    </>
  );
}

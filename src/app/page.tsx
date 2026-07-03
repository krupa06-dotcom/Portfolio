import { getFeaturedProjects, getExperience } from "./actions";
import HeroSection from "@/components/HeroSection";
import SkillsStrip from "@/components/SkillsStrip";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperiencePreview from "@/components/ExperiencePreview";
import ContactCTA from "@/components/ContactCTA";

export default async function HomePage() {
  const [projects, experience] = await Promise.all([
    getFeaturedProjects(),
    getExperience(),
  ]);

  return (
    <>
      <HeroSection />
      <SkillsStrip />
      <FeaturedProjects projects={projects} />
      <ExperiencePreview experiences={experience} />
      <ContactCTA />
    </>
  );
}

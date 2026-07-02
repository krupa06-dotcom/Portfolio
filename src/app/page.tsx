import { getFeaturedProjects, getExperiences } from "./actions";
import HeroSection from "@/components/HeroSection";
import SkillsStrip from "@/components/SkillsStrip";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExperiencePreview from "@/components/ExperiencePreview";
import ContactCTA from "@/components/ContactCTA";

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getFeaturedProjects(),
    getExperiences(),
  ]);

  const internships = experiences.filter((e) => e.type === "internship");

  return (
    <>
      <HeroSection />
      <SkillsStrip />
      <FeaturedProjects projects={projects} />
      <ExperiencePreview experiences={internships} />
      <ContactCTA />
    </>
  );
}

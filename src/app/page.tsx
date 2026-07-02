import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects, getExperiences } from "./actions";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Next.js",
  "SQL",
  "PHP",
];

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getFeaturedProjects(),
    getExperiences(),
  ]);

  const internships = experiences.filter((e) => e.type === "internship");

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
            <div className="flex-1 max-w-xl">
              <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-4">
                Full-Stack Developer &middot; UI/UX
              </p>
              <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.05] mb-3">
                Krupa Parmar
              </h1>
              <p className="font-heading font-semibold text-2xl sm:text-3xl text-muted tracking-[-0.02em] mb-4">
                I build things end-to-end.
              </p>
              <p className="text-muted text-base leading-relaxed max-w-lg mb-8">
                Full-stack developer and hackathon participant who builds
                end-to-end products — from UI design to backend logic.
                Comfortable across the stack: React/Next.js on the frontend,
                Node.js/PHP/SQL on the backend.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-primary font-heading font-semibold text-sm rounded-md hover:border-primary/30 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Headshot with corner bracket */}
            <div className="shrink-0">
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 relative">
                  <Image
                    src="/headshot.svg"
                    alt="Krupa Parmar"
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 256px, 288px"
                    priority
                  />
                </div>
                {/* Top-left corner bracket */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-accent" />
                {/* Bottom-right corner bracket */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
                Selected Work
              </p>
              <h2 className="font-heading font-semibold text-3xl tracking-[-0.02em]">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
            >
              View All Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-2">
                Background
              </p>
              <h2 className="font-heading font-semibold text-3xl tracking-[-0.02em]">
                Experience
              </h2>
            </div>
            <Link
              href="/experience"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="max-w-2xl space-y-8">
            {internships.slice(0, 2).map((exp) => (
              <div key={exp.id} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-0.5">
                    {new Date(exp.start_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}{" "}
                    —{" "}
                    {exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })
                      : "Present"}
                  </p>
                  <h3 className="font-heading font-semibold text-lg tracking-[-0.02em]">
                    {exp.role}
                  </h3>
                  <p className="text-accent font-mono text-xs tracking-[0.08em] uppercase mt-0.5">
                    {exp.company}
                  </p>
                  <p className="text-sm text-muted mt-1">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors font-mono tracking-[0.08em] uppercase"
            >
              View All Experience
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-4">
            Get in touch
          </p>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl tracking-[-0.02em] mb-4">
            Have a project in mind?
          </h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            I&apos;m always open to new opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
          >
            Let&apos;s Talk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

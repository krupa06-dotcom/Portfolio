"use client";

const skills = [
  "HTML", "CSS", "JavaScript", "React.js", "Node.js",
  "Next.js", "SQL", "PHP", "TypeScript", "PostgreSQL",
  "Git", "Tailwind CSS", "Framer Motion", "REST APIs",
  "Supabase", "Figma",
];

export default function SkillsStrip() {
  const row = skills.concat(skills);

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 border-y border-[rgba(245,241,236,0.06)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <p className="font-semibold text-xs tracking-[0.15em] uppercase text-accent mb-6">
          Technologies
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {row.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="text-sm text-muted/60 font-medium tracking-[-0.01em] whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

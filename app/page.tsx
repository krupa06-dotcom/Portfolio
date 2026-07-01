import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Project, AboutContent } from "@/lib/types";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionSection";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(4);
  return data ?? [];
}

async function getAbout(): Promise<AboutContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_content")
    .select("*")
    .eq("id", 1)
    .single();
  return data ?? null;
}

export default async function HomePage() {
  const [projects, about] = await Promise.all([
    getFeaturedProjects(),
    getAbout(),
  ]);

  const bioExcerpt = about?.bio?.split("\n\n")[0] ?? "";

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100dvh",
          backgroundColor: "#1A1A1A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(1.5rem, 4vw, 4rem) clamp(4rem, 8vh, 7rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          {/* Overline */}
          <FadeUp delay={0.1}>
            <p className="label-overline" style={{ marginBottom: "2rem" }}>
              Portfolio — 2026
            </p>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.2}>
            <h1
              className="text-display-xl"
              style={{ color: "#F5F0E8", marginBottom: "2rem", maxWidth: "14ch" }}
            >
               Code that{" "}
               <em style={{ fontStyle: "italic" }}>earns</em>
               {" "}its place.
            </h1>
          </FadeUp>

          {/* Sub-line */}
          <FadeUp delay={0.32}>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                color: "#8A847B",
                maxWidth: "46ch",
                lineHeight: 1.65,
                marginBottom: "3rem",
              }}
            >
              Full-stack development, web design, and digital experiences
              for clients who care how things work — and why.
            </p>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.42}>
            <Link href="/work" className="btn-ghost">
              View Work <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>

        {/* Scroll hint */}
        <FadeUp delay={0.9}>
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              right: "clamp(1.5rem, 4vw, 4rem)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montreal), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8A847B",
                writingMode: "vertical-rl",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "48px",
                backgroundColor: "rgba(221,213,200,0.25)",
              }}
            />
          </div>
        </FadeUp>
      </section>

      {/* ── Selected Work ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(5rem, 10vh, 9rem) clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Section header */}
          <FadeUp>
            <div
              className="border-b-hairline"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingBottom: "1.5rem",
                marginBottom: "4rem",
              }}
            >
              <p className="label-overline">Selected Work</p>
              <Link
                href="/work"
                className="link-terracotta"
                style={{
                  fontFamily: "var(--font-montreal), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8A847B",
                }}
              >
                All Projects
              </Link>
            </div>
          </FadeUp>

          {/* Project cards — alternating offset layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(5rem, 10vw, 9rem)" }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ───────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(5rem, 10vh, 9rem) clamp(1.5rem, 4vw, 4rem)",
          borderTop: "1px solid rgba(221,213,200,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <FadeUp>
              <p className="label-overline" style={{ marginBottom: "1.5rem" }}>
                About
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p
                className="text-display-md"
                style={{ color: "#F5F0E8", marginBottom: "2rem" }}
              >
                Building things that{" "}
                <em>actually work.</em>
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "1rem",
                  color: "#8A847B",
                  lineHeight: 1.72,
                  marginBottom: "2.5rem",
                  maxWidth: "52ch",
                }}
              >
                {bioExcerpt}
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <Link href="/about" className="btn-ghost">
                Read More <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>

          {/* Headshot */}
          {about?.headshot_url && (
            <FadeUp delay={0.14}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                  overflow: "hidden",
                  maxWidth: "420px",
                }}
              >
                <Image
                  src={about.headshot_url}
                  alt="Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover img-editorial"
                />
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          borderTop: "1px solid rgba(221,213,200,0.12)",
          padding: "clamp(5rem, 10vh, 9rem) clamp(1.5rem, 4vw, 4rem)",
          textAlign: "center",
        }}
      >
        <FadeUp>
          <p className="label-overline" style={{ marginBottom: "2rem" }}>
            Get in touch
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="text-display-lg"
            style={{ color: "#F5F0E8", marginBottom: "2.5rem" }}
          >
            Let's make something{" "}
            <em>worth making.</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.18}>
          <Link href="/contact" className="btn-terracotta">
            Start a conversation <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

/* ── Project card component (inline, server-safe) ─────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 !== 0;

  return (
    <FadeUp>
      <Link
        href={`/work/${project.slug}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "end",
            direction: isOdd ? "rtl" : "ltr",
          }}
        >
          {/* Image */}
          <div
            style={{
              direction: "ltr",
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "2px",
              overflow: "hidden",
              backgroundColor: "#2D2D2D",
            }}
            className="group"
          >
            {project.cover_image_url ? (
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover img-editorial transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "#2D2D2D" }} />
            )}
          </div>

          {/* Meta */}
          <div style={{ direction: "ltr", paddingBottom: "1rem" }}>
            <p
              className="label-overline"
              style={{ marginBottom: "1rem" }}
            >
              {project.category ?? "Project"} — {project.year}
            </p>
            <h3
              className="text-display-md"
              style={{ color: "#F5F0E8", marginBottom: "1.25rem" }}
            >
              {project.title}
            </h3>
            {project.summary && (
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "0.9375rem",
                  color: "#8A847B",
                  lineHeight: 1.7,
                  maxWidth: "44ch",
                  marginBottom: "2rem",
                }}
              >
                {project.summary}
              </p>
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-montreal), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#B63A2B",
              }}
            >
              View Project <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </FadeUp>
  );
}

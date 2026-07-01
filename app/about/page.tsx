import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { AboutContent } from "@/lib/types";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionSection";
import { ArrowUpRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer building purposeful digital experiences — from restaurant websites to non-profit platforms.",
};

export const revalidate = 3600;

async function getAbout(): Promise<AboutContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_content")
    .select("*")
    .eq("id", 1)
    .single();
  return data ?? null;
}

const experience = [
  {
    role: "Full-Stack Developer",
    company: "Independent",
    period: "2023 — Present",
    description:
      "Building full-stack web applications — from restaurant websites to non-profit platforms to professional services. React, Next.js, Supabase, and Node.js.",
  },
  {
    role: "Hackathon Participant",
    company: "Multiple Events",
    period: "2024 — Present",
    description:
      "Participated in multiple hackathons, collaborating on teams to ideate, build, and ship projects under tight deadlines. Focused on full-stack web development.",
  },
];

export default async function AboutPage() {
  const about = await getAbout();
  const paragraphs = about?.bio?.split("\n\n").filter(Boolean) ?? [];

  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          paddingTop: "clamp(7rem, 14vh, 11rem)",
          paddingBottom: "clamp(3rem, 5vh, 4rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          borderBottom: "1px solid rgba(221,213,200,0.12)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeUp>
            <p className="label-overline" style={{ marginBottom: "1.5rem" }}>
              About
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              className="text-display-lg"
              style={{ color: "#F5F0E8", maxWidth: "14ch" }}
            >
              Code built on{" "}
                <em>conviction.</em>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Bio + headshot ───────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(4rem, 8vw, 8rem)",
            alignItems: "start",
          }}
        >
          {/* Headshot */}
          {about?.headshot_url && (
            <FadeUp>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                  overflow: "hidden",
                  backgroundColor: "#2D2D2D",
                  maxWidth: "460px",
                }}
              >
                <Image
                  src={about.headshot_url}
                  alt="Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover img-editorial"
                  priority
                />
              </div>
            </FadeUp>
          )}

          {/* Bio text */}
          <div>
            {paragraphs.map((para, i) => (
              <FadeUp key={i} delay={0.06 * i}>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: i === 0 ? "1.125rem" : "1rem",
                    color: i === 0 ? "#F5F0E8" : "#8A847B",
                    lineHeight: 1.72,
                    marginBottom: "1.75rem",
                    maxWidth: "54ch",
                  }}
                >
                  {para}
                </p>
              </FadeUp>
            ))}

            {/* Resume download */}
            <FadeUp delay={0.18}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {about?.resume_url ? (
                  <a
                    href={about.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <Download size={14} /> Download CV
                  </a>
                ) : null}
                <Link href="/contact" className="btn-terracotta">
                  Get in Touch <ArrowUpRight size={14} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      {about?.skills && about.skills.length > 0 && (
        <section
          style={{
            backgroundColor: "#1A1A1A",
            borderTop: "1px solid rgba(221,213,200,0.12)",
            padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 4vw, 4rem)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <FadeUp>
              <p className="label-overline" style={{ marginBottom: "2.5rem" }}>
                Disciplines
              </p>
            </FadeUp>

            <StaggerContainer
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              {about.skills.map((skill) => (
                <StaggerItem key={skill}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1.1rem",
                      border: "1px solid rgba(221,213,200,0.15)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-montreal), sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#8A847B",
                    }}
                  >
                    {skill}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Experience timeline ──────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          borderTop: "1px solid rgba(221,213,200,0.12)",
          padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeUp>
            <p className="label-overline" style={{ marginBottom: "3rem" }}>
              Experience
            </p>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div
                  className="border-b-hairline"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                    gap: "1rem 3rem",
                    padding: "2rem 0",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-montreal), sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8A847B",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {item.period}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-montreal), sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#F5F0E8",
                      }}
                    >
                      {item.role}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontSize: "0.875rem",
                        color: "#B63A2B",
                        marginTop: "0.2rem",
                      }}
                    >
                      {item.company}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: "0.9375rem",
                      color: "#8A847B",
                      lineHeight: 1.65,
                      maxWidth: "52ch",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

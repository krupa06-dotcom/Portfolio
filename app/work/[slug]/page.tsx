import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionSection";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600;

/* ── Static params ─────────────────────────────────────────── */
// generateStaticParams runs at build time with no HTTP request,
// so we use the browser client (no cookies()) instead of the server client.
export async function generateStaticParams() {
  const supabase = createBrowserClient();
  const { data } = await supabase.from("projects").select("slug");
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

/* ── Metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("title, summary")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Project" };

  return {
    title: data.title,
    description: data.summary ?? undefined,
  };
}

/* ── Data helpers ──────────────────────────────────────────── */
async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

async function getNextProject(sortOrder: number): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .gt("sort_order", sortOrder)
    .order("sort_order", { ascending: true })
    .limit(1)
    .single();
  return data ?? null;
}

/* ── Page ──────────────────────────────────────────────────── */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const next = await getNextProject(project.sort_order);

  return (
    <>
      {/* ── Hero image ──────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/7",
          backgroundColor: "#2D2D2D",
          overflow: "hidden",
        }}
      >
        {project.cover_image_url && (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover img-editorial"
          />
        )}
        {/* Dark gradient overlay so text above reads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 60%)",
          }}
        />
      </section>

      {/* ── Title + meta row ────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 4vw, 4rem) 0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Back link */}
          <FadeUp>
            <Link
              href="/work"
              className="link-terracotta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-montreal), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8A847B",
                textDecoration: "none",
                marginBottom: "2.5rem",
              }}
            >
              <ArrowLeft size={13} /> All Work
            </Link>
          </FadeUp>

          {/* Title */}
          <FadeUp delay={0.08}>
            <h1
              className="text-display-lg"
              style={{ color: "#F5F0E8", marginBottom: "2rem", maxWidth: "16ch" }}
            >
              {project.title}
            </h1>
          </FadeUp>

          {/* Meta row */}
          <FadeUp delay={0.14}>
            <div
              className="border-t-hairline border-b-hairline"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                padding: "1.25rem 0",
                marginBottom: "clamp(3rem, 6vh, 5rem)",
              }}
            >
              {project.category && (
                <MetaItem label="Discipline" value={project.category} />
              )}
              {project.year && (
                <MetaItem label="Year" value={String(project.year)} />
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Case study body ─────────────────────────────── */}
      {project.content && (
        <section
          style={{
            backgroundColor: "#1A1A1A",
            padding: "0 clamp(1.5rem, 4vw, 4rem) clamp(5rem, 10vh, 8rem)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr min(68ch, 100%)",
              justifyContent: "end",
            }}
          >
            <FadeUp delay={0.1}>
              <div className="prose-editorial">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Gallery ─────────────────────────────────────── */}
      {project.gallery_urls && project.gallery_urls.length > 0 && (
        <section
          style={{
            backgroundColor: "#1A1A1A",
            padding: "0 clamp(1.5rem, 4vw, 4rem) clamp(5rem, 10vh, 8rem)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <FadeUp>
              <p className="label-overline" style={{ marginBottom: "2rem" }}>
                Gallery
              </p>
            </FadeUp>

            <StaggerContainer
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
                gap: "clamp(1rem, 2vw, 1.5rem)",
              }}
            >
              {project.gallery_urls.map((url, i) => (
                <StaggerItem key={i}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: i === 0 ? "16/9" : "4/3",
                      borderRadius: "2px",
                      overflow: "hidden",
                      backgroundColor: "#2D2D2D",
                      gridColumn: i === 0 ? "1 / -1" : undefined,
                    }}
                  >
                    <Image
                      src={url}
                      alt={`${project.title} — image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      className="object-cover img-editorial"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Next project ────────────────────────────────── */}
      {next && (
        <section
          style={{
            borderTop: "1px solid rgba(221,213,200,0.12)",
            backgroundColor: "#1A1A1A",
            padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 4vw, 4rem)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <FadeUp>
              <p className="label-overline" style={{ marginBottom: "1.25rem" }}>
                Next Project
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <Link
                href={`/work/${next.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="group"
                  style={{ display: "inline-flex", alignItems: "baseline", gap: "1rem" }}
                >
                  <span
                    className="text-display-md"
                    style={{
                      color: "#F5F0E8",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {next.title}
                  </span>
                  <ArrowRight
                    size={22}
                    style={{
                      color: "#B63A2B",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:translate-x-2"
                  />
                </div>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}
    </>
  );
}

/* ── Small meta label + value ──────────────────────────────── */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <span className="label-overline">{label}</span>
      <span
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontSize: "0.9375rem",
          color: "#F5F0E8",
        }}
      >
        {value}
      </span>
    </div>
  );
}

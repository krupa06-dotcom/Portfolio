import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import { WorkGrid } from "./WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "A full index of brand identity, web design, art direction, and print projects.",
};

export const revalidate = 3600;

async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function WorkPage() {
  const projects = await getAllProjects();

  // Derive unique categories for the client-side filter
  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  ) as string[];

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
          <p
            className="label-overline"
            style={{ marginBottom: "1.5rem" }}
          >
            Selected Projects
          </p>
          <h1
            className="text-display-lg"
            style={{ color: "#F5F0E8", maxWidth: "12ch" }}
          >
            All <em>Work</em>
          </h1>
        </div>
      </section>

      {/* ── Filterable grid ───────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 4vw, 4rem) clamp(5rem, 10vh, 9rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <WorkGrid projects={projects} categories={categories} />
        </div>
      </section>
    </>
  );
}

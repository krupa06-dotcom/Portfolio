"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, LogOut, ExternalLink } from "lucide-react";
import type { Project, Experience, Message } from "@/lib/types";
import { upsertProject, deleteProject, upsertExperience, deleteExperience } from "../actions";

type Props = {
  projects: Project[];
  experiences: Experience[];
  messages: Message[];
};

export default function AdminDashboard({
  projects,
  experiences,
  messages,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "experiences" | "messages">(
    "projects"
  );
  const [editingProject, setEditingProject] = useState<Project | "new" | null>(
    null
  );
  const [editingExperience, setEditingExperience] = useState<
    Experience | "new" | null
  >(null);

  async function handleProjectSubmit(formData: FormData) {
    await upsertProject(formData);
    setEditingProject(null);
    router.refresh();
  }

  async function handleExperienceSubmit(formData: FormData) {
    await upsertExperience(formData);
    setEditingExperience(null);
    router.refresh();
  }

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-semibold text-3xl tracking-[-0.02em]">
              Admin
            </h1>
            <p className="text-sm text-muted font-mono tracking-[0.08em] uppercase mt-1">
              Manage your portfolio content
            </p>
          </div>
          <a
            href="/admin"
            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Lock
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-surface rounded-md w-fit border border-border">
          {(["projects", "experiences", "messages"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-mono tracking-[0.08em] uppercase rounded-[4px] transition-colors ${
                tab === t
                  ? "bg-accent text-background"
                  : "text-muted hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {tab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl tracking-[-0.02em]">
                Projects
              </h2>
              <button
                onClick={() => setEditingProject("new")}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent text-background font-heading font-semibold text-xs rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {editingProject && (
              <ProjectForm
                project={editingProject === "new" ? null : editingProject}
                onSubmit={handleProjectSubmit}
                onCancel={() => setEditingProject(null)}
              />
            )}

            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-surface rounded-md border border-border"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm tracking-[-0.02em] truncate">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="text-[10px] font-mono tracking-[0.08em] uppercase text-accent border border-accent/30 px-1.5 py-0.5 rounded-[4px]">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted truncate mt-0.5">
                      {project.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <form
                      action={async () => {
                        await deleteProject(project.id);
                        router.refresh();
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-muted text-center py-8 font-mono text-xs tracking-[0.08em] uppercase">
                  No projects yet
                </p>
              )}
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {tab === "experiences" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-xl tracking-[-0.02em]">
                Experiences
              </h2>
              <button
                onClick={() => setEditingExperience("new")}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent text-background font-heading font-semibold text-xs rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </button>
            </div>

            {editingExperience && (
              <ExperienceForm
                experience={
                  editingExperience === "new" ? null : editingExperience
                }
                onSubmit={handleExperienceSubmit}
                onCancel={() => setEditingExperience(null)}
              />
            )}

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 bg-surface rounded-md border border-border"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm tracking-[-0.02em] truncate">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-mono tracking-[0.08em] uppercase text-muted border border-border px-1.5 py-0.5 rounded-[4px]">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted truncate mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button
                      onClick={() => setEditingExperience(exp)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <form
                      action={async () => {
                        await deleteExperience(exp.id);
                        router.refresh();
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {experiences.length === 0 && (
                <p className="text-sm text-muted text-center py-8 font-mono text-xs tracking-[0.08em] uppercase">
                  No experiences yet
                </p>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {tab === "messages" && (
          <div>
            <h2 className="font-heading font-semibold text-xl tracking-[-0.02em] mb-6">
              Messages
            </h2>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-surface rounded-md border border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading font-semibold text-sm tracking-[-0.02em]">
                      {msg.name}
                    </span>
                    <span className="text-xs text-muted">{msg.email}</span>
                    <span className="text-[10px] text-muted font-mono tracking-[0.08em] uppercase ml-auto">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-sm text-muted text-center py-8 font-mono text-xs tracking-[0.08em] uppercase">
                  No messages yet
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: Project | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <form
      action={onSubmit}
      className="mb-8 p-5 bg-surface rounded-md border border-border space-y-4"
    >
      <input type="hidden" name="id" value={project?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={project?.title ?? ""}
            required
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            URL
          </label>
          <input
            type="url"
            name="url"
            defaultValue={project?.url ?? ""}
            required
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            defaultValue={project?.image_url ?? ""}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Tags (JSON array)
          </label>
          <input
            type="text"
            name="tags"
            defaultValue={project ? JSON.stringify(project.tags) : '["NEXT.JS","SUPABASE"]'}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors font-mono text-xs"
          />
        </div>
      </div>
      <div>
        <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={project?.description ?? ""}
          required
          rows={2}
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          value="true"
          defaultChecked={project?.featured ?? false}
          className="accent-accent"
        />
        <label
          htmlFor="featured"
          className="text-sm text-muted font-mono text-xs tracking-[0.08em] uppercase"
        >
          Featured
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-background font-heading font-semibold text-xs rounded-md hover:bg-accent/90 transition-colors"
        >
          {project ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border text-muted font-heading font-semibold text-xs rounded-md hover:text-primary transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ExperienceForm({
  experience,
  onSubmit,
  onCancel,
}: {
  experience: Experience | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <form
      action={onSubmit}
      className="mb-8 p-5 bg-surface rounded-md border border-border space-y-4"
    >
      <input type="hidden" name="id" value={experience?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Role
          </label>
          <input
            type="text"
            name="role"
            defaultValue={experience?.role ?? ""}
            required
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Company / Event
          </label>
          <input
            type="text"
            name="company"
            defaultValue={experience?.company ?? ""}
            required
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            defaultValue={experience?.start_date?.slice(0, 10) ?? ""}
            required
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
            End Date (optional)
          </label>
          <input
            type="date"
            name="end_date"
            defaultValue={experience?.end_date?.slice(0, 10) ?? ""}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={experience?.description ?? ""}
          required
          rows={2}
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5">
          Type
        </label>
        <select
          name="type"
          defaultValue={experience?.type ?? "hackathon"}
          className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
        >
          <option value="internship">Internship</option>
          <option value="hackathon">Hackathon</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-background font-heading font-semibold text-xs rounded-md hover:bg-accent/90 transition-colors"
        >
          {experience ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border text-muted font-heading font-semibold text-xs rounded-md hover:text-primary transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

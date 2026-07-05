"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Folder,
  Briefcase,
  Trophy,
  Mail,
  User,
  Code2,
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  Upload,
  Check,
  X,
  Inbox,
  LogOut,
} from "lucide-react";
import type { Project, Experience, Hackathon, Message, Profile, Skill } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  upsertProject,
  deleteProject,
  upsertExperience,
  deleteExperience,
  upsertHackathon,
  deleteHackathon,
  upsertSkill,
  deleteSkill,
  upsertProfile,
  markMessageRead,
  uploadFile,
  signOut,
} from "../actions";

type Props = {
  projects: Project[];
  experience: Experience[];
  hackathons: Hackathon[];
  messages: Message[];
  profile: Profile | null;
  skills: Skill[];
};

type Tab = "projects" | "experience" | "hackathons" | "skills" | "messages" | "profile";

const tabs: { id: Tab; label: string; icon: typeof Folder }[] = [
  { id: "projects", label: "Projects", icon: Folder },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "hackathons", label: "Hackathons", icon: Trophy },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "profile", label: "Profile", icon: User },
];

export default function AdminDashboard({
  projects,
  experience,
  hackathons,
  messages,
  profile,
  skills,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | "new" | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | "new" | null>(null);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | "new" | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | "new" | null>(null);

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

  async function handleHackathonSubmit(formData: FormData) {
    await upsertHackathon(formData);
    setEditingHackathon(null);
    router.refresh();
  }

  async function handleSkillSubmit(formData: FormData) {
    await upsertSkill(formData);
    setEditingSkill(null);
    router.refresh();
  }

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="flex min-h-screen pt-16">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-50 h-[calc(100vh-4rem)] w-60 bg-surface backdrop-blur-xl border-r border-border/80 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border/80">
          <p className="font-heading font-semibold text-sm tracking-[-0.02em]">
            Admin Panel
          </p>
          <p className="text-[10px] text-muted/60 font-mono tracking-[0.08em] uppercase mt-0.5">
            Manage your portfolio
          </p>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all ${
                  isActive
                    ? "bg-surface text-primary border border-border/80"
                    : "text-muted hover:text-primary hover:bg-[#E3DACE] border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-medium">{t.label}</span>
                {t.id === "messages" && unreadCount > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-[10px] font-mono text-primary/60 font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/80">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-primary hover:bg-[#E3DACE] transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-border/80">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-muted hover:text-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div>
            <p className="font-heading font-semibold text-sm tracking-[-0.02em] capitalize">
              {tab}
            </p>
            <p className="text-[10px] text-muted/60 font-mono tracking-[0.08em] uppercase">
              {unreadCount > 0 ? `${unreadCount} unread` : "Manage content"}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            <StatCard icon={Folder} label="Projects" count={projects.length} />
            <StatCard icon={Briefcase} label="Experience" count={experience.length} />
            <StatCard icon={Trophy} label="Hackathons" count={hackathons.length} />
            <StatCard
              icon={Mail}
              label="Messages"
              count={messages.length}
              sub={unreadCount > 0 ? `${unreadCount} new` : undefined}
            />
            <StatCard icon={User} label="Profile" count={profile ? 1 : 0} />
          </div>

          {/* ────────── Projects Tab ────────── */}
          {tab === "projects" && (
            <Section
              title="Projects"
              addLabel="Add Project"
              onAdd={() => setEditingProject("new")}
              count={projects.length}
            >
              {editingProject && (
                <ProjectForm
                  project={editingProject === "new" ? null : editingProject}
                  onSubmit={handleProjectSubmit}
                  onCancel={() => setEditingProject(null)}
                />
              )}

              {projects.length === 0 ? (
                <EmptyState
                  icon={Folder}
                  message="No projects yet"
                  action="Add your first project to showcase your work."
                />
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <ListItem
                      key={project.id}
                      title={project.title}
                      subtitle={project.url}
                      badge={project.is_featured ? { label: "Featured", color: "primary" } : undefined}
                      actions={
                        <>
                          <IconButton href={project.url} icon={ExternalLink} label="Open" />
                          <IconButton
                            icon={Pencil}
                            label="Edit"
                            onClick={() => setEditingProject(project)}
                          />
                          <IconButton
                            icon={Trash2}
                            label="Delete"
                            onClick={async () => {
                              await deleteProject(project.id);
                              router.refresh();
                            }}
                            confirm
                            color="red"
                          />
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ────────── Experience Tab ────────── */}
          {tab === "experience" && (
            <Section
              title="Experience (Internships)"
              addLabel="Add Experience"
              onAdd={() => setEditingExperience("new")}
              count={experience.length}
            >
              {editingExperience && (
                <ExperienceForm
                  experience={editingExperience === "new" ? null : editingExperience}
                  onSubmit={handleExperienceSubmit}
                  onCancel={() => setEditingExperience(null)}
                />
              )}

              {experience.length === 0 ? (
                <EmptyState
                  icon={Briefcase}
                  message="No experience entries"
                  action="Add your internships and work experience."
                />
              ) : (
                <div className="space-y-2">
                  {experience.map((exp) => (
                    <ListItem
                      key={exp.id}
                      title={exp.role}
                      subtitle={`${exp.company}${exp.start_date ? ` · ${formatDate(exp.start_date)}${exp.end_date ? ` — ${formatDate(exp.end_date)}` : " — Present"}` : ""}`}
                      badge={{ label: "Internship", color: "muted" }}
                      actions={
                        <>
                          <IconButton
                            icon={Pencil}
                            label="Edit"
                            onClick={() => setEditingExperience(exp)}
                          />
                          <IconButton
                            icon={Trash2}
                            label="Delete"
                            onClick={async () => {
                              await deleteExperience(exp.id);
                              router.refresh();
                            }}
                            confirm
                            color="red"
                          />
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ────────── Hackathons Tab ────────── */}
          {tab === "hackathons" && (
            <Section
              title="Hackathons"
              addLabel="Add Hackathon"
              onAdd={() => setEditingHackathon("new")}
              count={hackathons.length}
            >
              {editingHackathon && (
                <HackathonForm
                  hackathon={editingHackathon === "new" ? null : editingHackathon}
                  onSubmit={handleHackathonSubmit}
                  onCancel={() => setEditingHackathon(null)}
                />
              )}

              {hackathons.length === 0 ? (
                <EmptyState
                  icon={Trophy}
                  message="No hackathons yet"
                  action="Add hackathons you've participated in."
                />
              ) : (
                <div className="space-y-2">
                  {hackathons.map((h) => (
                    <ListItem
                      key={h.id}
                      title={h.name}
                      subtitle={h.date ? formatDate(h.date) : undefined}
                      badge={h.result ? { label: h.result, color: "primary" } : undefined}
                      actions={
                        <>
                          {h.url && <IconButton href={h.url} icon={ExternalLink} label="Open" />}
                          <IconButton
                            icon={Pencil}
                            label="Edit"
                            onClick={() => setEditingHackathon(h)}
                          />
                          <IconButton
                            icon={Trash2}
                            label="Delete"
                            onClick={async () => {
                              await deleteHackathon(h.id);
                              router.refresh();
                            }}
                            confirm
                            color="red"
                          />
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ────────── Skills Tab ────────── */}
          {tab === "skills" && (
            <Section
              title="Skills"
              addLabel="Add Skill"
              onAdd={() => setEditingSkill("new")}
              count={skills.length}
            >
              {editingSkill && (
                <SkillForm
                  skill={editingSkill === "new" ? null : editingSkill}
                  onSubmit={handleSkillSubmit}
                  onCancel={() => setEditingSkill(null)}
                />
              )}

              {skills.length === 0 ? (
                <EmptyState
                  icon={Code2}
                  message="No skills added yet"
                  action="Add skills to display on your Skills section."
                />
              ) : (
                <div className="space-y-2">
                  {skills.map((s) => (
                    <ListItem
                      key={s.id}
                      title={s.name}
                      subtitle={s.category}
                      actions={
                        <>
                          <IconButton
                            icon={Pencil}
                            label="Edit"
                            onClick={() => setEditingSkill(s)}
                          />
                          <IconButton
                            icon={Trash2}
                            label="Delete"
                            onClick={async () => {
                              await deleteSkill(s.id);
                              router.refresh();
                            }}
                            confirm
                            color="red"
                          />
                        </>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ────────── Messages Tab ────────── */}
          {tab === "messages" && (
            <Section title="Messages" count={messages.length}>
              {messages.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  message="No messages yet"
                  action="Messages from your contact form will appear here."
                />
              ) : (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`group rounded-xl border transition-all ${
                        msg.is_read
                           ? "bg-[#E3DACE] border-border/80 opacity-60 hover:opacity-100"
                          : "bg-surface border-border/80"
                      }`}
                    >
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-heading font-semibold text-sm text-primary tracking-[-0.02em]">
                                {msg.name}
                              </span>
                              {!msg.is_read && (
                                <span className="w-2 h-2 rounded-full bg-primary/20" />
                              )}
                              <span className="text-xs text-muted/60 font-mono">
                                {msg.email}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted/40 font-mono tracking-[0.08em] uppercase mt-0.5">
                              {new Date(msg.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <button
                            onClick={async () => {
                              await markMessageRead(msg.id, !msg.is_read);
                              router.refresh();
                            }}
                             className={`shrink-0 p-2 rounded-lg border transition-all ${
                              msg.is_read
                                ? "border-border/80 text-muted/50 hover:text-primary hover:border-primary/20"
                                : "border-border/80 text-muted hover:text-primary hover:border-primary/20"
                            }`}
                            title={msg.is_read ? "Mark as unread" : "Mark as read"}
                          >
                            {msg.is_read ? (
                              <X className="w-3.5 h-3.5" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-muted/80 leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* ────────── Profile Tab ────────── */}
          {tab === "profile" && (
            <ProfileForm profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────── Sub-components ────────── */

function StatCard({
  icon: Icon,
  label,
  count,
  sub,
}: {
  icon: typeof Folder;
  label: string;
  count: number;
  sub?: string;
}) {
  return (
    <div className="bg-surface rounded-xl border border-border/80 p-4">
      <div className="w-8 h-8 rounded-lg bg-surface border border-border/60 flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-muted" />
      </div>
      <p className="text-2xl font-heading font-semibold tracking-[-0.02em]">{count}</p>
      <div className="flex items-center gap-2">
        <p className="text-[11px] text-muted/60 font-mono tracking-[0.08em] uppercase">{label}</p>
        {sub && <span className="text-[10px] text-muted font-mono">{sub}</span>}
      </div>
    </div>
  );
}

function Section({
  title,
  addLabel,
  onAdd,
  count,
  children,
}: {
  title: string;
  addLabel?: string;
  onAdd?: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl tracking-[-0.02em] text-primary">
            {title}
          </h2>
          {count !== undefined && (
            <p className="text-xs text-muted/50 font-mono tracking-[0.08em] uppercase mt-0.5">
              {count} {count === 1 ? "entry" : "entries"}
            </p>
          )}
        </div>
        {addLabel && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-on font-heading font-semibold text-xs uppercase tracking-[0.08em] rounded-lg hover:bg-accent-hover transition-all glow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            {addLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
  action,
}: {
  icon: typeof Folder;
  message: string;
  action: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 rounded-xl border border-dashed border-border/60">
      <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted/30" />
      </div>
      <p className="font-heading font-semibold text-sm text-muted/60 mb-1">
        {message}
      </p>
      <p className="text-xs text-muted/30 text-center max-w-xs">{action}</p>
    </div>
  );
}

function ListItem({
  title,
  subtitle,
  badge,
  actions,
}: {
  title: string;
  subtitle?: string;
  badge?: { label: string; color: string };
  actions: React.ReactNode;
}) {
  return (
    <div className="group flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 bg-surface rounded-xl border border-border/80 hover:border-primary/10 transition-all">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading font-semibold text-sm text-primary tracking-[-0.02em] truncate">
            {title}
          </h3>
          {badge && (
            <span
              className={`text-[10px] font-mono tracking-[0.08em] uppercase px-1.5 py-0.5 rounded border ${
                badge.color === "primary"
                  ? "text-primary border-primary/20"
                  : "text-muted/60 border-border/60"
              }`}
            >
              {badge.label}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted/50 truncate mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
        {actions}
      </div>
    </div>
  );
}

function IconButton({
  icon: Icon,
  label,
  onClick,
  href,
  color,
  confirm: needsConfirm,
}: {
  icon: typeof Pencil;
  label: string;
  onClick?: () => void;
  href?: string;
  color?: string;
  confirm?: boolean;
}) {
  function handleClick() {
    if (needsConfirm && !window.confirm(`Are you sure you want to delete this?`)) return;
    onClick?.();
  }

  const classes = `p-2 rounded-lg border border-transparent text-muted/50 hover:text-${
    color === "red" ? "red-400" : "primary"
  } hover:border-${color === "red" ? "red-400/20" : "primary/10"} transition-all`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        title={label}
      >
        <Icon className="w-4 h-4" />
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={classes} title={label}>
      <Icon className="w-4 h-4" />
    </button>
  );
}

/* ────────── Form Actions ────────── */

function FormActions({
  submitLabel,
  onCancel,
}: {
  submitLabel: string;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="submit"
        className="px-5 py-2.5 bg-accent text-accent-on font-heading font-semibold text-xs uppercase tracking-[0.08em] rounded-lg hover:bg-accent-hover transition-all glow-sm"
      >
        {submitLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 border border-border/80 text-muted/60 font-heading font-semibold text-xs uppercase tracking-[0.08em] rounded-lg hover:text-primary hover:border-primary/20 transition-all"
      >
        Cancel
      </button>
    </div>
  );
}

/* ────────── Upload Button ────────── */

function UploadButton({
  bucket,
  onUploaded,
}: {
  bucket: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.set("bucket", bucket);
    formData.set("file", file);

    try {
      const url = await uploadFile(formData);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept={bucket === "resumes" ? ".pdf" : "image/*"}
        onChange={handleUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 px-3 py-2 border border-border/80 rounded-lg text-xs text-muted/60 font-body hover:text-primary hover:border-primary/20 transition-all disabled:opacity-60"
      >
        <Upload className="w-3.5 h-3.5" />
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && (
        <p className="text-[10px] text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
}

/* ────────── Form wrapper ────────── */

function FormCard({
  title,
  onSubmit,
  onCancel,
  children,
}: {
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <form
      action={onSubmit}
      className="mb-8 p-5 sm:p-6 bg-surface rounded-xl border border-border/80 space-y-5"
    >
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
        <h3 className="font-heading font-semibold text-sm tracking-[-0.02em]">{title}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-muted/40 hover:text-primary hover:bg-background transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {children}
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] tracking-[0.08em] uppercase text-muted/60 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ────────── Project Form ────────── */

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: Project | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [coverUrl, setCoverUrl] = useState(project?.cover_image_url ?? "");

  return (
    <FormCard
      title={project ? "Edit Project" : "New Project"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <input type="hidden" name="id" value={project?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title">
          <input
            type="text"
            name="title"
            defaultValue={project?.title ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="URL">
          <input
            type="url"
            name="url"
            defaultValue={project?.url ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Cover Image">
          <div className="flex gap-2">
            <input
              type="url"
              name="cover_image_url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all font-mono text-xs"
            />
            <UploadButton bucket="project-covers" onUploaded={(url) => setCoverUrl(url)} />
          </div>
          {coverUrl && (
            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-background border border-border max-w-[200px]">
              <Image src={coverUrl} alt="Cover preview" fill className="object-cover" />
            </div>
          )}
        </Field>
        <Field label="Tags">
          <input
            type="text"
            name="tags"
            defaultValue={
              project ? JSON.stringify(project.tags) : '["NEXT.JS","SUPABASE"]'
            }
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all font-mono text-xs"
          />
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            name="sort_order"
            defaultValue={project?.sort_order ?? 0}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="is_featured"
              value="true"
              defaultChecked={project?.is_featured ?? false}
              className="w-4 h-4 rounded border-border/80 bg-background accent-primary"
            />
            <span className="font-mono text-xs tracking-[0.08em] uppercase text-muted/60 group-hover:text-muted transition-colors">
              Featured project
            </span>
          </label>
        </div>
      </div>
      <Field label="Description">
        <textarea
          name="description"
          defaultValue={project?.description ?? ""}
          required
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all resize-none"
        />
      </Field>
      <FormActions submitLabel={project ? "Update Project" : "Create Project"} onCancel={onCancel} />
    </FormCard>
  );
}

/* ────────── Experience Form ────────── */

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
    <FormCard
      title={experience ? "Edit Experience" : "New Experience"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <input type="hidden" name="id" value={experience?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Role">
          <input
            type="text"
            name="role"
            defaultValue={experience?.role ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Company">
          <input
            type="text"
            name="company"
            defaultValue={experience?.company ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Start Date">
          <input
            type="date"
            name="start_date"
            defaultValue={experience?.start_date?.slice(0, 10) ?? ""}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="End Date">
          <input
            type="date"
            name="end_date"
            defaultValue={experience?.end_date?.slice(0, 10) ?? ""}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            name="sort_order"
            defaultValue={experience?.sort_order ?? 0}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          name="description"
          defaultValue={experience?.description ?? ""}
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all resize-none"
        />
      </Field>
      <FormActions submitLabel={experience ? "Update Experience" : "Create Experience"} onCancel={onCancel} />
    </FormCard>
  );
}

/* ────────── Hackathon Form ────────── */

function HackathonForm({
  hackathon,
  onSubmit,
  onCancel,
}: {
  hackathon: Hackathon | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <FormCard
      title={hackathon ? "Edit Hackathon" : "New Hackathon"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <input type="hidden" name="id" value={hackathon?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input
            type="text"
            name="name"
            defaultValue={hackathon?.name ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Result">
          <input
            type="text"
            name="result"
            defaultValue={hackathon?.result ?? ""}
            placeholder='e.g. "Winner", "Finalist"'
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Date">
          <input
            type="date"
            name="date"
            defaultValue={hackathon?.date?.slice(0, 10) ?? ""}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="URL">
          <input
            type="url"
            name="url"
            defaultValue={hackathon?.url ?? ""}
            placeholder="Devpost or event link"
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            name="sort_order"
            defaultValue={hackathon?.sort_order ?? 0}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
      </div>
      <FormActions submitLabel={hackathon ? "Update Hackathon" : "Create Hackathon"} onCancel={onCancel} />
    </FormCard>
  );
}

/* ────────── Skill Form ────────── */

function SkillForm({
  skill,
  onSubmit,
  onCancel,
}: {
  skill: Skill | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <FormCard
      title={skill ? "Edit Skill" : "New Skill"}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <input type="hidden" name="id" value={skill?.id ?? "new"} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Category">
          <select
            name="category"
            defaultValue={skill?.category ?? "FRONTEND"}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          >
            <option value="FRONTEND">FRONTEND</option>
            <option value="BACKEND & DATABASE">BACKEND & DATABASE</option>
            <option value="TOOLS & WORKFLOW">TOOLS & WORKFLOW</option>
          </select>
        </Field>
        <Field label="Name">
          <input
            type="text"
            name="name"
            defaultValue={skill?.name ?? ""}
            required
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            name="sort_order"
            defaultValue={skill?.sort_order ?? 0}
            className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all"
          />
        </Field>
      </div>
      <FormActions submitLabel={skill ? "Update Skill" : "Create Skill"} onCancel={onCancel} />
    </FormCard>
  );
}

/* ────────── Profile Form ────────── */

function ProfileForm({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const [headshotUrl, setHeadshotUrl] = useState(profile?.headshot_url ?? "");
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url ?? "");

  async function handleSubmit(formData: FormData) {
    await upsertProfile(formData);
    router.refresh();
  }

  return (
    <div>
      <Section title="Profile" count={1}>
        <form action={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="p-5 sm:p-6 bg-surface rounded-xl border border-border/80 space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-border/80">
          <div className="w-14 h-14 rounded-xl bg-surface border border-border/60 flex items-center justify-center overflow-hidden shrink-0 relative">
            {headshotUrl ? (
              <Image src={headshotUrl} alt="Headshot" fill className="object-cover" />
            ) : (
              <User className="w-6 h-6 text-muted/60" />
            )}
          </div>
              <div>
                <p className="font-heading font-semibold text-sm tracking-[-0.02em]">Profile Photo</p>
                <p className="text-xs text-muted/50 mt-0.5">Upload a headshot image</p>
              </div>
            </div>

            <Field label="Headshot URL">
              <div className="flex gap-2">
                <input
                  type="url"
                  name="headshot_url"
                  value={headshotUrl}
                  onChange={(e) => setHeadshotUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all font-mono text-xs"
                />
                <UploadButton bucket="project-covers" onUploaded={(url) => setHeadshotUrl(url)} />
              </div>
            </Field>

            <Field label="Resume URL">
              <div className="flex gap-2">
                <input
                  type="url"
                  name="resume_url"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all font-mono text-xs"
                />
                <UploadButton bucket="resumes" onUploaded={(url) => setResumeUrl(url)} />
              </div>
            </Field>
          </div>

          <div className="p-5 sm:p-6 bg-surface rounded-xl border border-border/80 space-y-5">
            <div className="pb-4 border-b border-border/80">
              <p className="font-heading font-semibold text-sm tracking-[-0.02em]">About</p>
              <p className="text-xs text-muted/50 mt-0.5">Your bio and skills</p>
            </div>

            <Field label="Bio">
              <textarea
                name="bio"
                defaultValue={profile?.bio ?? ""}
                rows={4}
                placeholder="Write a short bio about yourself..."
                className="w-full bg-background border border-border/80 rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all resize-none"
              />
            </Field>

            <Field label="Skills">
              <input
                type="text"
                name="skills"
                defaultValue={
                  profile?.skills
                    ? JSON.stringify(profile.skills)
                    : '["HTML","CSS","JavaScript","React.js","Node.js","Next.js","SQL","PHP"]'
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all font-mono text-xs"
              />
              <p className="text-[11px] text-muted/30 mt-1.5 font-mono">
                JSON array of skills, e.g. &quot;React&quot; or &quot;Node.js&quot;
              </p>
            </Field>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-on font-heading font-semibold text-xs uppercase tracking-[0.08em] rounded-lg hover:bg-accent-hover transition-all glow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            Save Profile
          </button>
        </form>
      </Section>
    </div>
  );
}

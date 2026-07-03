"use server";

import { createClient, createAdminClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = "krupa@gmail.com";
const ADMIN_PASSWORD = "197283";

/* ────────────── Auth ────────────── */

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw new Error("Invalid credentials");
  }

  cookies().set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  revalidatePath("/admin");
}

export async function signOut() {
  cookies().delete("admin_session");
  revalidatePath("/admin");
}

/* ────────────── Contact ────────────── */

export async function submitContact(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.from("messages").insert({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (error) {
    console.error("Failed to submit contact:", error);
    throw new Error("Failed to send message");
  }

  revalidatePath("/contact");
}

/* ────────────── Projects ────────────── */

export async function getProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function getFeaturedProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  return data ?? [];
}

export async function upsertProject(formData: FormData) {
  const supabase = createAdminClient();

  const id = formData.get("id");
  const payload: Record<string, unknown> = {
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
    cover_image_url: formData.get("cover_image_url") || null,
    tags: JSON.parse((formData.get("tags") as string) ?? "[]"),
    is_featured: formData.get("is_featured") === "true",
    sort_order: Number(formData.get("sort_order")) || 0,
  };

  if (id && id !== "new") {
    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("projects").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
}

/* ────────────── Experience (internships) ────────────── */

export async function getExperience() {
  const supabase = createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function upsertExperience(formData: FormData) {
  const supabase = createAdminClient();

  const id = formData.get("id");
  const payload: Record<string, unknown> = {
    role: formData.get("role"),
    company: formData.get("company"),
    description: formData.get("description") || null,
    start_date: formData.get("start_date") || null,
    end_date: formData.get("end_date") || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  };

  if (id && id !== "new") {
    const { error } = await supabase
      .from("experience")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("experience").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/experience");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteExperience(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/experience");
  revalidatePath("/");
}

/* ────────────── Hackathons ────────────── */

export async function getHackathons() {
  const supabase = createClient();
  const { data } = await supabase
    .from("hackathons")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function upsertHackathon(formData: FormData) {
  const supabase = createAdminClient();

  const id = formData.get("id");
  const payload: Record<string, unknown> = {
    name: formData.get("name"),
    result: formData.get("result") || null,
    date: formData.get("date") || null,
    url: formData.get("url") || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  };

  if (id && id !== "new") {
    const { error } = await supabase
      .from("hackathons")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("hackathons").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/experience");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteHackathon(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("hackathons").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/experience");
  revalidatePath("/");
}

/* ────────────── Messages ────────────── */

export async function getMessages() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function markMessageRead(id: string, isRead: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("messages")
    .update({ is_read: isRead })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

/* ────────────── Profile ────────────── */

export async function getProfile() {
  const supabase = createClient();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return data ?? null;
}

export async function upsertProfile(formData: FormData) {
  const supabase = createAdminClient();

  const payload: Record<string, unknown> = {
    bio: formData.get("bio") || null,
    headshot_url: formData.get("headshot_url") || null,
    resume_url: formData.get("resume_url") || null,
    skills: JSON.parse((formData.get("skills") as string) ?? "[]"),
  };

  const { error } = await supabase.from("profile").upsert(payload, { onConflict: "id" });
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

/* ────────────── Storage ────────────── */

export async function uploadFile(formData: FormData) {
  const supabase = createAdminClient();
  const bucket = formData.get("bucket") as string;
  const file = formData.get("file") as File;

  if (!file || !bucket) throw new Error("Missing file or bucket");

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}

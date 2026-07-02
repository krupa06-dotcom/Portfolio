"use server";

import { createClient, createAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

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

export async function getProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getFeaturedProjects() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return data ?? [];
}

export async function getExperiences() {
  const supabase = createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  return data ?? [];
}

export async function getHackathons() {
  const supabase = createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("type", "hackathon")
    .order("start_date", { ascending: false });

  return data ?? [];
}

export async function getMessages() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function upsertProject(formData: FormData) {
  const supabase = createAdminClient();

  const id = formData.get("id");
  const payload: Record<string, unknown> = {
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
    image_url: formData.get("image_url"),
    tags: JSON.parse((formData.get("tags") as string) ?? "[]"),
    featured: formData.get("featured") === "true",
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

export async function upsertExperience(formData: FormData) {
  const supabase = createAdminClient();

  const id = formData.get("id");
  const payload: Record<string, unknown> = {
    role: formData.get("role"),
    company: formData.get("company"),
    description: formData.get("description"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    type: formData.get("type"),
  };

  if (id && id !== "new") {
    const { error } = await supabase
      .from("experiences")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("experiences").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/experience");
  revalidatePath("/admin");
}

export async function deleteExperience(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/experience");
}

"use server";

import { createServiceClient } from "@/lib/supabase/server";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  // Basic server-side validation
  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { status: "error", message: "Message is too short." };
  }

  try {
    const supabase = await createServiceClient();
    const { error } = await supabase
      .from("messages")
      .insert({ name, email, message });

    if (error) throw error;

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again or email directly.",
    };
  }
}

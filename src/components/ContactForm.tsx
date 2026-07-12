"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { defaultEasing } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message.trim()) {
    errors.message = "Please enter a message.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const message = (data.get("message") as string) || "";

    const validationErrors = validate(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setStatus("sending");

    try {
      data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = {
    backgroundColor: "#FFFDF9",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--text-heading)",
  };

  const errorBorderStyle = {
    border: "1px solid var(--accent)",
  };

  if (status === "success") {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ ease: defaultEasing, duration: 0.3 }}
        aria-live="polite"
        className="space-y-5"
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="var(--accent-on)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5 8.5 15 16 5" />
            </svg>
          </span>
          <p
            className="text-lg font-medium"
            style={{ color: "var(--text-heading)" }}
          >
            Message sent! I&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium underline"
          style={{ color: "var(--accent)" }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  if (status === "error") {
    return (
      <motion.div
        key="error"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ ease: defaultEasing, duration: 0.3 }}
        aria-live="polite"
        className="space-y-5"
      >
        <div
          className="flex items-start gap-3 rounded-md px-4 py-3"
          style={{ border: "1px solid var(--border)", backgroundColor: "#FFFDF9" }}
        >
          <svg
            className="mt-0.5 h-5 w-5 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v5" />
            <circle cx="10" cy="14" r="0.5" fill="var(--accent)" />
          </svg>
          <p style={{ color: "var(--text-body)" }} className="text-sm">
            Something went wrong — please try emailing me directly at{" "}
            <a
              href="mailto:parmarkrupa06@gmail.com"
              className="font-medium underline"
              style={{ color: "var(--accent)" }}
            >
              parmarkrupa06@gmail.com
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium underline"
          style={{ color: "var(--accent)" }}
        >
          Try again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      key="form"
      ref={ref}
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: defaultEasing, duration: 0.3 }}
      className="space-y-5"
      noValidate
    >
      {/* Honeypot — hidden from users, visible to spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs tracking-[0.08em] uppercase mb-1.5"
          style={{ color: "var(--text-label)" }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={status === "sending"}
          className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none placeholder:text-muted"
          style={{
            ...inputStyle,
            ...(errors.name ? errorBorderStyle : {}),
          }}
          placeholder="Your name"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(179,56,44,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.name
              ? "var(--accent)"
              : "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors.name && (
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--accent)" }}
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs tracking-[0.08em] uppercase mb-1.5"
          style={{ color: "var(--text-label)" }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={status === "sending"}
          className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none placeholder:text-muted"
          style={{
            ...inputStyle,
            ...(errors.email ? errorBorderStyle : {}),
          }}
          placeholder="your@email.com"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(179,56,44,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.email
              ? "var(--accent)"
              : "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors.email && (
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--accent)" }}
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs tracking-[0.08em] uppercase mb-1.5"
          style={{ color: "var(--text-label)" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={status === "sending"}
          className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none resize-none placeholder:text-muted"
          style={{
            ...inputStyle,
            ...(errors.message ? errorBorderStyle : {}),
          }}
          placeholder="Your message..."
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(179,56,44,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.message
              ? "var(--accent)"
              : "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors.message && (
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--accent)" }}
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-on font-semibold text-sm rounded-md hover:bg-accent-hover transition-all disabled:opacity-60 glow-sm"
      >
        {status === "sending" ? (
          <>
            Sending...
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </motion.form>
  );
}

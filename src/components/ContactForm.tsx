"use client";

import { submitContact } from "@/app/actions";
import { useRef } from "react";

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await submitContact(formData);
        ref.current?.reset();
      }}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs tracking-[0.08em] uppercase text-muted mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2.5 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}

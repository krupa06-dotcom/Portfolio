"use client";

import { submitContact } from "@/app/actions";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { defaultEasing } from "@/lib/motion";

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.p
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ ease: defaultEasing, duration: 0.3 }}
          className="text-body font-medium text-lg"
        >
          Thanks for reaching out! I&apos;ll get back to you soon.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          ref={ref}
          action={async (formData) => {
            setPending(true);
            await submitContact(formData);
            setPending(false);
            setSuccess(true);
            ref.current?.reset();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: defaultEasing, duration: 0.3 }}
          className="space-y-5"
        >
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
              className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none placeholder:text-muted"
              style={{
                backgroundColor: "#FFFDF9",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-heading)",
              }}
              placeholder="Your name"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(179,56,44,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
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
              className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none placeholder:text-muted"
              style={{
                backgroundColor: "#FFFDF9",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-heading)",
              }}
              placeholder="your@email.com"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(179,56,44,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
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
              className="w-full px-4 py-3 text-sm rounded transition-all duration-200 outline-none resize-none placeholder:text-muted"
              style={{
                backgroundColor: "#FFFDF9",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-heading)",
              }}
              placeholder="Your message..."
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(179,56,44,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-on font-semibold text-sm rounded-md hover:bg-accent-hover transition-all disabled:opacity-60 glow-sm"
          >
            {pending ? (
              <>
                Sending
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

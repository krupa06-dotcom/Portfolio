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
          className="text-muted font-medium text-lg"
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
              className="block font-mono text-xs tracking-[0.08em] uppercase text-muted/60 mb-1.5"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-surface backdrop-blur-sm border border-border/80 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-[#E3DACE] transition-all duration-200"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs tracking-[0.08em] uppercase text-muted/60 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-surface backdrop-blur-sm border border-border/80 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-[#E3DACE] transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs tracking-[0.08em] uppercase text-muted/60 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full bg-surface backdrop-blur-sm border border-border/80 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-[#E3DACE] transition-all duration-200 resize-none"
              placeholder="Your message..."
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

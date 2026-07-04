"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";

export default function ContactCTA() {
  return (
    <section className="py-24 relative border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-[-0.03em] mb-4">
              Let&apos;s build something together.
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="lg:text-right"
          >
            <p className="text-muted text-base leading-[1.6] mb-6 max-w-md lg:ml-auto">
              Open to new opportunities, collaborations, and freelance work.
              Reach out and I&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-on font-semibold text-sm rounded-md hover:bg-accent-hover transition-all glow-sm"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";

export default function ContactCTA() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-4"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="font-heading font-semibold text-3xl sm:text-4xl tracking-[-0.02em] mb-4"
        >
          Have a project in mind?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-muted max-w-md mx-auto mb-8"
        >
          I&apos;m always open to new opportunities and collaborations.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
          >
            Let&apos;s Talk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

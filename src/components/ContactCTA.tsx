"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";

export default function ContactCTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 text-center relative">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="font-mono text-xs text-accent tracking-[0.12em] uppercase mb-4"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="font-heading font-semibold text-3xl sm:text-4xl tracking-[-0.03em] mb-4"
        >
          Have a project in mind?
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-muted/70 max-w-md mx-auto mb-8 leading-relaxed"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-heading font-semibold text-sm rounded-lg hover:bg-accent/90 transition-all glow-sm"
          >
            Let&apos;s Talk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

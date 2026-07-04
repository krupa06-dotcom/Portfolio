"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";

export default function ContactCTA() {
  return (
    /*
     * Clean white section design with black text and white button text
     */
    <section
      className="py-24 relative border-t border-border/60 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            {/* Eyebrow — dark on white */}
            <p
              className="font-semibold text-xs tracking-[0.12em] uppercase mb-3"
              style={{ color: "#8A857D" }}
            >
              Get in touch
            </p>

            {/* H2 — dark heading on white background */}
            <h2
              className="font-heading font-bold text-3xl lg:text-5xl tracking-[-0.03em]"
              style={{ color: "#16130F" }}
            >
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
            {/* Body text — readable on white */}
            <p
              className="text-base leading-[1.6] mb-6 max-w-md lg:ml-auto"
              style={{ color: "#55504A" }}
            >
              Open to new opportunities, collaborations, and freelance work.
              Reach out and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Button — accent background with WHITE text */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent font-semibold text-sm rounded-md transition-all duration-200 no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              style={{ 
                color: "#FFFFFF", 
                boxShadow: "0 2px 8px rgba(179, 56, 44, 0.25)" 
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#8F2C22";
                el.style.boxShadow = "0 4px 14px rgba(179, 56, 44, 0.30)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "";
                el.style.boxShadow = "0 2px 8px rgba(179, 56, 44, 0.25)";
              }}
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

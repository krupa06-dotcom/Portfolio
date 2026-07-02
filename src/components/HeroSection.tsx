"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { defaultEasing } from "@/lib/motion";

const container = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.4 } },
};

const photoItem = {
  hidden: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { ease: defaultEasing, duration: 0.5 },
  },
};

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate="animate"
            variants={container}
          >
            <motion.p
              variants={item}
              className="font-mono text-xs text-muted tracking-[0.08em] uppercase mb-4"
            >
              Full-Stack Developer &middot; UI/UX
            </motion.p>
            <motion.h1
              variants={item}
              className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.05] mb-3"
            >
              Krupa Parmar
            </motion.h1>
            <motion.p
              variants={item}
              className="font-heading font-semibold text-2xl sm:text-3xl text-muted tracking-[-0.02em] mb-4"
            >
              I build things end-to-end.
            </motion.p>
            <motion.p
              variants={item}
              className="text-muted text-base leading-relaxed max-w-lg mb-8"
            >
              Full-stack developer and hackathon participant who builds
              end-to-end products — from UI design to backend logic. Comfortable
              across the stack: React/Next.js on the frontend, Node.js/PHP/SQL
              on the backend.
            </motion.p>
            <motion.div variants={item} className="flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-primary font-heading font-semibold text-sm rounded-md hover:border-primary/30 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="animate"
            variants={photoItem}
            className="shrink-0"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 relative">
                <Image
                  src="/headshot.svg"
                  alt="Krupa Parmar"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 640px) 256px, 288px"
                  priority
                />
              </div>
              <svg
                className="absolute -top-2 -left-2 w-6 h-6 text-accent"
                viewBox="0 0 24 24"
                fill="none"
              >
                <motion.path
                  d="M24 0.5H0.5V24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    ease: defaultEasing,
                    duration: 0.6,
                    delay: 0.6,
                  }}
                />
              </svg>
              <svg
                className="absolute -bottom-2 -right-2 w-6 h-6 text-accent"
                viewBox="0 0 24 24"
                fill="none"
              >
                <motion.path
                  d="M0 23.5H23.5V0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    ease: defaultEasing,
                    duration: 0.6,
                    delay: 0.6,
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

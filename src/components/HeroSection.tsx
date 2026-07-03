"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { defaultEasing } from "@/lib/motion";

const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { ease: defaultEasing, duration: 0.4 } },
};

const photoItem = {
  hidden: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { ease: defaultEasing, duration: 0.5 } },
};

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-24">
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate="animate"
            variants={container}
          >
            <motion.p
              variants={item}
              className="font-semibold text-xs tracking-[0.15em] uppercase text-accent mb-5"
            >
              Full-Stack Developer &middot; UI/UX
            </motion.p>
            <motion.h1
              variants={item}
              className="font-heading font-semibold text-5xl lg:text-8xl tracking-[-0.03em] leading-[0.95] mb-3 text-primary"
            >
              Krupa Parmar
            </motion.h1>
            <motion.p
              variants={item}
              className="text-lg sm:text-xl font-medium text-muted mb-4"
            >
              I build things end-to-end.
            </motion.p>
            <motion.p
              variants={item}
              className="text-muted text-base leading-[1.6] max-w-lg mb-8"
            >
              Full-stack developer and hackathon participant who builds
              end-to-end products — from UI design to backend logic. Comfortable
              across the stack: React/Next.js on the frontend, Node.js/PHP/SQL
              on the backend.
            </motion.p>
            <motion.div variants={item} className="flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold text-sm rounded-md hover:bg-accent/90 transition-all glow-sm"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-sm text-muted/60 font-semibold hover:text-primary transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="animate"
            variants={photoItem}
            className="shrink-0"
          >
            <div className="relative glow">
              <div className="w-64 h-64 sm:w-72 sm:h-72 relative [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_60%,transparent_85%)]">
                <Image
                  src="/avatar.png"
                  alt="Krupa Parmar"
                  fill
                  className="object-cover grayscale contrast-125 brightness-75"
                  sizes="(max-width: 640px) 256px, 288px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/25 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-[#120C0C]" />
    </section>
  );
}

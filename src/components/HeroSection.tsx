"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxPct = prefersReducedMotion ? 0 : 10;
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxPct}%`]);

  const textAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: EASE, delay: 0.15 },
      };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden md:h-screen max-md:min-h-screen"
      style={{ backgroundColor: "var(--dark-bg)" }}
    >
      {/* ── Photo layer ─────────────────────────────── */}
      <motion.div
        className="md:absolute md:top-0 md:right-0 md:w-[68%] md:h-full max-md:relative max-md:w-full max-md:h-[45vh]"
        style={{ y: parallaxY }}
      >
        <img
          src="/krupa-avatar.png"
          alt="Krupa Parmar — Full-Stack Developer and UI/UX Designer"
          className="md:absolute md:inset-0 max-md:block w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Left feather-blend gradient (desktop only) ── */}
      <div
        className="absolute top-0 left-0 h-full pointer-events-none max-md:hidden"
        style={{
          width: "48%",
          zIndex: 2,
          background:
            "linear-gradient(90deg, var(--dark-bg) 0%, var(--dark-bg) 38%, rgba(14,12,11,0.85) 55%, rgba(14,12,11,0) 78%)",
        }}
      />

      {/* ── Bottom fade (desktop only) ──────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none max-md:hidden"
        style={{
          height: "30%",
          zIndex: 2,
          background:
            "linear-gradient(0deg, rgba(14,12,11,0.5) 0%, rgba(14,12,11,0) 22%)",
        }}
      />

      {/* ── Accent glow (desktop only) ──────────────── */}
      <div
        className="absolute top-0 right-0 pointer-events-none max-md:hidden"
        style={{
          width: "50%",
          height: "100%",
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(179,56,44,0.35), rgba(179,56,44,0.08) 50%, transparent 75%)",
        }}
      />

      {/* ── Text block (single, responsive) ──────────── */}
      <motion.div
        className="relative max-md:w-full max-md:px-6 max-md:py-8 max-sm:px-4 max-sm:py-6 md:absolute md:top-[25%] md:left-8 lg:left-16 md:z-[2] md:max-w-[420px] lg:max-w-[480px]"
        style={{ transform: "translateY(-50%)", y: parallaxY }}
        {...textAnimation}
      >
        <Eyebrow />
        <Name />
        <Subhead />
        <Description />
        <Actions />
      </motion.div>

    </section>
  );
}

/* ── Sub-components to avoid repetition ─────────────── */

function Eyebrow() {
  return (
    <p
      className="text-[11px] uppercase tracking-[0.15em] mb-6"
      style={{ color: "var(--accent)" }}
    >
      Full-Stack Developer &amp; UI/UX Designer
    </p>
  );
}

function Name() {
  return (
    <h1
      className="font-bold leading-[0.98] mb-6 font-heading text-[36px] sm:text-[40px] md:text-[72px]"
      style={{ color: "var(--dark-text-heading)" }}
    >
      Krupa Parmar
    </h1>
  );
}

function Subhead() {
  return (
    <p className="text-[16px] font-medium mb-5" style={{ color: "var(--dark-text-body)" }}>
      Building end-to-end products
    </p>
  );
}

function Description() {
  return (
    <p
      className="text-[14px] leading-[1.65] mb-12 max-md:w-full"
      style={{ color: "var(--dark-text-body)", maxWidth: "400px" }}
    >
      From concept to launch — I architect the backend, design the frontend, and
      connect the dots between them.
    </p>
  );
}

function Actions() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="/projects"
        className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded text-sm font-semibold no-underline transition-all duration-200"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--accent-on)",
          boxShadow: "0 4px 24px rgba(179,56,44,0.5)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "var(--accent-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "var(--accent)";
        }}
      >
        View My Work
      </a>
      <a
        href="/contact"
        className="text-sm font-semibold no-underline"
        style={{
          color: "var(--dark-text-heading)",
          borderBottom: "1px solid var(--dark-text-body)",
          paddingBottom: "2px",
        }}
      >
        Get in Touch
      </a>
    </div>
  );
}

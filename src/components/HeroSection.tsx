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
      style={{ backgroundColor: "#0E0C0B" }}
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
            "linear-gradient(90deg, #0E0C0B 0%, #0E0C0B 38%, rgba(14,12,11,0.85) 55%, rgba(14,12,11,0) 78%)",
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
          width: "33.333%",
          height: "100%",
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 80% 40%, rgba(179,56,44,0.18), transparent 65%)",
        }}
      />

      {/* ── Desktop text block ──────────────────────── */}
      <motion.div
        className="absolute top-[25%] left-16 z-[2] max-w-[480px] max-md:hidden"
        style={{ transform: "translateY(-50%)", y: parallaxY }}
        {...textAnimation}
      >
        <Eyebrow />
        <Name desktop />
        <Subhead />
        <Description />
        <Actions />
      </motion.div>

      {/* ── Mobile text block ───────────────────────── */}
      <div
        className="hidden max-md:block px-6 py-8"
        style={{ padding: "32px 24px" }}
      >
        <Eyebrow />
        <Name />
        <Subhead />
        <Description />
        <Actions />
      </div>

      {/* ── Status badge ────────────────────────────── */}
      <div
        className="absolute z-[2] flex items-center gap-2 max-md:top-4 max-md:left-4 md:bottom-6 md:right-10"
        style={{
          background: "rgba(20,17,16,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "0.5px solid rgba(245,241,236,0.15)",
          borderRadius: "8px",
          padding: "10px 16px",
        }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full shrink-0"
          style={{ backgroundColor: "#5FAE6C" }}
        />
        <span className="text-[12px] font-medium" style={{ color: "#F5F1EC" }}>
          Available for work
        </span>
      </div>
    </section>
  );
}

/* ── Sub-components to avoid repetition ─────────────── */

function Eyebrow() {
  return (
    <p
      className="text-[11px] uppercase tracking-[0.15em] mb-6"
      style={{ color: "#B3382C" }}
    >
      Full-Stack Developer &amp; UI/UX Designer
    </p>
  );
}

function Name({ desktop }: { desktop?: boolean }) {
  return (
    <h1
      className={`font-bold leading-[0.98] mb-6 font-heading ${desktop ? "text-[72px]" : "text-[40px]"}`}
      style={{ color: "#F5F1EC" }}
    >
      Krupa Parmar
    </h1>
  );
}

function Subhead() {
  return (
    <p className="text-[16px] font-medium mb-5" style={{ color: "#D8D2C9" }}>
      Building end-to-end products
    </p>
  );
}

function Description() {
  return (
    <p
      className="text-[14px] leading-[1.65] mb-12 max-md:w-full"
      style={{ color: "#A69C97", maxWidth: "400px" }}
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
          backgroundColor: "#B3382C",
          color: "#FBEFEC",
          boxShadow: "0 4px 20px rgba(179,56,44,0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "#8F2C22";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
            "#B3382C";
        }}
      >
        View My Work
      </a>
      <a
        href="/contact"
        className="text-sm font-semibold no-underline"
        style={{
          color: "#F5F1EC",
          borderBottom: "1px solid",
          paddingBottom: "2px",
        }}
      >
        Get in Touch
      </a>
    </div>
  );
}

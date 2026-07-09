"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CinematicBackground() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const quiet = pathname === "/contact";

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    setIsDesktop(
      window.innerWidth >= 1024 &&
        window.matchMedia("(pointer: fine)").matches,
    );

    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Lazy cursor-follow spotlight */
  useEffect(() => {
    if (!isDesktop || reducedMotion || !mounted) return;

    const target = { x: 0, y: 0 };
    const current = { x: -250, y: -250 };
    let frame: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.x - 250}px, ${current.y - 250}px)`;
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [isDesktop, reducedMotion, mounted]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Base background ─────────────────────────────── */}
      <div className="absolute inset-0" style={{ backgroundColor: "#FFF8EE" }} />

      {!quiet && (
        <>
          {/*
           * Soft spotlight behind hero — warm cream-white center fading to bg.
           * Very low opacity so it reads as "lit" not "glowing".
           * Positioned top-center where the headline/photo live.
           */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80vw",
              height: "80vw",
              background:
                "radial-gradient(circle, rgba(255,243,224,0.35) 0%, transparent 68%)",
              filter: "blur(100px)",
            }}
          />

          {/*
           * Second, smaller warm glow — sits behind the photo column.
           * Gives the impression of a soft light pool right on the subject.
           */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "5%",
              right: "10%",
              width: "38vw",
              height: "38vw",
              background:
                "radial-gradient(circle, rgba(255,232,200,0.30) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />

          {/*
           * Ambient warm aurora — very subtle, drifts slowly.
           * Keeps the page from feeling completely flat without colour.
           */}
          <div
            className={`absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full ${mounted && !reducedMotion ? "animate-aurora-1" : ""}`}
            style={{
              background:
                "radial-gradient(circle, rgba(228,202,172,0.25) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
          <div
            className={`absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full ${mounted && !reducedMotion ? "animate-aurora-2" : ""}`}
            style={{
              background:
                "radial-gradient(circle, rgba(228,202,172,0.20) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </>
      )}

      {/*
       * Vignette — pulls the edges slightly toward bg so the center
       * reads as lit even without a dark frame.
       */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(231,213,191,0.50) 100%)",
        }}
      />

      {/*
       * Film grain overlay — light-theme variant.
       * mix-blend-mode: multiply reads correctly on light backgrounds
       * (overlay washes out on light; multiply adds texture without brightening).
       * opacity ~3% — barely conscious, but removes the "flat SaaS page" feel.
       */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "multiply", opacity: 0.03 }}
        preserveAspectRatio="none"
      >
        <filter id="cinematic-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>

      {/*
       * Lazy cursor-follow spotlight — warm, very soft.
       * Follows mouse at 6% lerp so it trails naturally.
       * Only on desktop with fine pointer (no touchscreens).
       */}
      {!quiet && isDesktop && !reducedMotion && mounted && (
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,232,200,0.20) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}

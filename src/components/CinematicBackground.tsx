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
        cursorRef.current.style.transform = `translate(${current.x}px, ${current.y}px)`;
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
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[#FAF7F2]" />

      {!quiet && (
        <>
          <div
            className={`absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full ${mounted && !reducedMotion ? "animate-aurora-1" : ""}`}
            style={{
              background: "radial-gradient(circle, rgba(220,214,204,0.25) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
          <div
            className={`absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full ${mounted && !reducedMotion ? "animate-aurora-2" : ""}`}
            style={{
              background: "radial-gradient(circle, rgba(220,214,204,0.18) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, #FAF7F2 100%)",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "overlay", opacity: 0.04 }}
        preserveAspectRatio="none"
      >
        <filter id="cinematic-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>

      {!quiet && isDesktop && !reducedMotion && mounted && (
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(220,214,204,0.15) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}

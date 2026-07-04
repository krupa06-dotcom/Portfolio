"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Floating blur shapes ─────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div
          className="absolute rounded-full opacity-[0.12]"
          style={{
            width: 350,
            height: 350,
            background: "#B3382C",
            top: "20%",
            left: "10%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.12]"
          style={{
            width: 450,
            height: 450,
            background: "#8F2C22",
            bottom: "10%",
            right: "15%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.10]"
          style={{
            width: 280,
            height: 280,
            background: "#16130F",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Background image with parallax ─────────── */}
      <motion.div className="absolute inset-0 z-0 flex items-center justify-center" style={{ y: bgY }}>
        <div className="relative w-full h-full scale-[1.15]">
          <Image
            src="/krupa-avatar.png"
            alt="Krupa Parmar"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </motion.div>

      {/* Dark gradient overlay — same directional feel as reference */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(135deg, rgba(22,19,15,0.55) 0%, rgba(22,19,15,0.35) 40%, rgba(22,19,15,0.10) 70%, rgba(22,19,15,0.00) 100%)",
        }}
      />


    </section>
  );
}

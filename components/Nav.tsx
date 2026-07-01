"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const links = [
  { href: "/",        label: "Home"    },
  { href: "/work",    label: "Work"    },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname             = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          backgroundColor: scrolled ? "#1A1A1A" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(221,213,200,0.12)" : "none",
          transition: "background-color 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 4rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#F5F0E8",
              textDecoration: "none",
            }}
          >
            KP
          </Link>

          {/* Desktop links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="link-terracotta"
                  style={{
                    fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: active ? "#B63A2B" : "#F5F0E8",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#F5F0E8", padding: "6px" }}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile menu ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              backgroundColor: "#1A1A1A",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                height: "72px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 1.5rem",
                borderBottom: "1px solid rgba(221,213,200,0.12)",
              }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-montreal), sans-serif",
                  fontSize: "0.8125rem", fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#F5F0E8", textDecoration: "none",
                }}
              >
                KP
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#F5F0E8", padding: "6px" }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2rem", gap: "0.25rem" }}>
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-canela), Georgia, serif",
                      fontSize: "clamp(2.75rem, 11vw, 4.5rem)",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "#F5F0E8",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#B63A2B")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#F5F0E8")}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom hint */}
            <div style={{ padding: "0 2rem 2.5rem" }}>
              <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "0.7rem", color: "#8A847B", letterSpacing: "0.1em" }}>
                PORTFOLIO — 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn",  href: "https://linkedin.com"  },
  { label: "Dribbble",  href: "https://dribbble.com"  },
  { label: "Read.cv",   href: "https://read.cv"       },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t-hairline"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

          {/* Left — name + tagline */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F5F0E8",
                textDecoration: "none",
              }}
            >
              KP
            </Link>
            <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "0.8125rem", color: "#8A847B" }}>
              Full-Stack Developer
            </p>
          </div>

          {/* Centre — socials */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-terracotta"
                style={{
                  fontFamily: "var(--font-montreal), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8A847B",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right — back to top + year */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
              style={{
                fontFamily: "var(--font-montreal), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8A847B",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <ArrowUp
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-1"
                style={{ color: "#B63A2B" }}
              />
              Back to top
            </button>
            <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "0.75rem", color: "#8A847B" }}>
              © {year} KP
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

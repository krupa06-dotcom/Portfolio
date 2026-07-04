"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const isHome = pathname === "/";

  const bgOpacity   = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 0.88]);
  const blurPx      = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 14]);
  const borderAlpha = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 0.12]);

  const bg  = useMotionTemplate`rgba(250, 247, 242, ${bgOpacity})`;
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const bdr = useMotionTemplate`rgba(228, 221, 209, ${borderAlpha})`;

  const [isLightNav, setIsLightNav] = useState(isHome);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHome) {
      setIsLightNav(latest < 40);
    }
  });

  const linkColor = isLightNav ? "#F5F1EC" : undefined;
  const activeLinkColor = isLightNav ? "#F5F1EC" : "#16130F";

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur, borderColor: bdr }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-[-0.02em] no-underline transition-colors duration-200"
          style={{ color: isLightNav ? "#F5F1EC" : "#16130F" }}
        >
          KP.
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "font-body text-[15px] relative pb-1 no-underline transition-colors duration-200",
                  active
                    ? "font-semibold"
                    : "hover:text-heading font-normal",
                  isLightNav ? "" : (active ? "text-heading" : "text-muted"),
                ].join(" ")}
                style={{ color: active ? activeLinkColor : linkColor }}
              >
                {link.label}

                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: "#B3382C" }}
                  />
                )}
              </Link>
            );
          })}

          {/* Resume button */}
          <a
            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume/resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-on font-semibold text-xs uppercase tracking-[0.08em] rounded-md transition-all duration-200 no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            style={{
              boxShadow: "0 2px 8px rgba(179, 56, 44, 0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#8F2C22";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 14px rgba(179, 56, 44, 0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(179, 56, 44, 0.25)";
            }}
          >
            Resume
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

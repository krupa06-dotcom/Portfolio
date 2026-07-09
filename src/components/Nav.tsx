"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const bgOpacity   = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 0.88]);
  const blurPx      = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 14]);
  const borderAlpha = useTransform(scrollY, [0, 40], [isHome ? 0 : 0, 0.12]);

  const bg  = useMotionTemplate`rgba(255, 248, 238, ${bgOpacity})`;
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const bdr = useMotionTemplate`rgba(228, 202, 172, ${borderAlpha})`;

  const [isLightNav, setIsLightNav] = useState(isHome);
  useEffect(() => {
    setIsLightNav(isHome);
  }, [isHome]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHome) {
      setIsLightNav(latest < 40);
    }
  });

  const linkColor = isLightNav ? "#FFF5E8" : "#1A0C06";
  const activeLinkColor = isLightNav ? "#FFF5E8" : "#1A0C06";

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur, borderColor: bdr }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-[-0.02em] no-underline transition-colors duration-200"
          style={{ color: isLightNav ? "#FFF5E8" : "#1A0C06" }}
          onClick={closeMobileMenu}
        >
          KP.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
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
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-on font-semibold text-xs uppercase tracking-[0.08em] rounded-md transition-all duration-200 no-underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 glow-sm hover:bg-accent-hover hover:shadow-[0_4px_14px_rgba(179,56,44,0.30)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 -mr-2 transition-colors duration-200"
          style={{ color: isLightNav ? "#FFF5E8" : "#1A0C06" }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{
              backgroundColor: "#FFF8EE",
              borderColor: "rgba(228, 202, 172, 0.8)",
            }}
          >
            <div className="px-6 py-6 space-y-2">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`block py-3 px-4 rounded-lg text-sm font-body transition-colors duration-200 no-underline ${
                      active
                        ? "font-semibold text-heading bg-surface"
                        : "font-normal text-muted hover:text-heading hover:bg-surface/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <a
                  href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume/resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-accent-on font-semibold text-xs uppercase tracking-[0.08em] rounded-md transition-all duration-200 no-underline glow-sm hover:bg-accent-hover w-full justify-center"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

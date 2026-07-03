"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 40], [0, 0.8]);
  const blurPx = useTransform(scrollY, [0, 40], [0, 12]);
  const borderAlpha = useTransform(scrollY, [0, 40], [0, 0.06]);

  const bg = useMotionTemplate`rgba(18, 12, 12, ${bgOpacity})`;
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const bdr = useMotionTemplate`rgba(245, 241, 236, ${borderAlpha})`;

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur, borderColor: bdr }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-[-0.02em] text-primary"
        >
          <span className="text-accent">K</span>P
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-[15px] transition-colors relative ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted/80 hover:text-primary"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  style={{
                    boxShadow: "0 0 8px rgba(196, 70, 44, 0.4)",
                  }}
                />
              )}
            </Link>
          ))}
          <a
            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume/resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white font-semibold text-xs uppercase tracking-[0.08em] rounded-md hover:bg-accent/90 transition-all glow-sm"
          >
            Resume
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

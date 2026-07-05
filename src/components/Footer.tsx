"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const Comp = isExternal ? "a" : Link;
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Comp
      href={href}
      {...externalProps}
      className="transition-colors"
      style={{ color: "#8A857D" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FAF7F2"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A857D"; }}
      aria-label={label}
    >
      {children}
    </Comp>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#0E0C0A",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left side — Logo and tech stack */}
        <div className="flex items-center gap-2 text-sm">
          <span
            className="font-heading font-bold"
            style={{ color: "#FAF7F2" }}
          >
            KP
          </span>
          <span className="hidden sm:inline" style={{ color: "#8A857D" }}>
            &middot;
          </span>
          <span
            className="hidden sm:inline"
            style={{ color: "#8A857D" }}
          >
            Built with Next.js &amp; Supabase
          </span>
        </div>

        {/* Center — Social links */}
        <div className="flex items-center gap-5">
          <SocialLink href="mailto:parmarkrupa06@gmail.com" label="Email">
            <Mail className="w-4 h-4" />
          </SocialLink>
          <SocialLink href="https://github.com/krupa06-dotcom" label="GitHub">
            <GithubIcon className="w-4 h-4" />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/parmar-krupa" label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
          </SocialLink>
        </div>

        {/* Right side — Copyright */}
        <div
          className="text-xs font-mono tracking-[0.08em]"
          style={{ color: "#6B6660" }}
        >
          &copy; {year} Krupa Parmar
        </div>
      </div>
    </footer>
  );
}

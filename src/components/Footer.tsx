"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer 
      className="border-t"
      style={{ 
        backgroundColor: "#0E0C0A", 
        borderColor: "rgba(255,255,255,0.1)" 
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
          <Link
            href="mailto:parmarkrupa06@gmail.com"
            className="transition-colors"
            style={{ color: "#8A857D" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F2"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A857D"; }}
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/krupa06-dotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#8A857D" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F2"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A857D"; }}
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/parmar-krupa"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#8A857D" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F2"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A857D"; }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
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

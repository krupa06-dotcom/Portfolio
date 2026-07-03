import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(245,245,240,0.04)] bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-muted/50">
          <span className="font-heading font-bold text-primary">
            <span className="text-accent">K</span>P
          </span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline">
            Built with Next.js &amp; Supabase
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="mailto:parmarkrupa06@gmail.com"
            className="text-muted/50 hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/krupa06-dotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/parmar-krupa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="text-xs text-muted/40 font-mono tracking-[0.08em]">
          &copy; {year} Krupa Parmar
        </div>
      </div>
    </footer>
  );
}

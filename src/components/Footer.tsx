import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="font-heading font-semibold text-primary">KP.</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline">
            Built with Next.js & Supabase
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="mailto:parmarkrupa06@gmail.com"
            className="text-muted hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/krupa06-dotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/parmar-krupa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="text-xs text-muted font-mono tracking-[0.08em]">
          &copy; {year} Krupa Parmar
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ViewAllLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="mt-10 text-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors duration-200 font-mono tracking-[0.08em] uppercase"
        style={{ color: "#B3382C" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8F2C22"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#B3382C"; }}
      >
        {label}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

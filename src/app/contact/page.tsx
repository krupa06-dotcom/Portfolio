import { Mail, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";
import ContactForm from "@/components/ContactForm";

const links = [
  {
    label: "Email",
    href: "mailto:parmarkrupa06@gmail.com",
    icon: Mail,
    value: "parmarkrupa06@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/krupa06-dotcom",
    icon: GithubIcon,
    value: "krupa06-dotcom",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/parmar-krupa",
    icon: LinkedinIcon,
    value: "parmar-krupa",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50%",
          height: "70%",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(179,56,44,0.10), rgba(179,56,44,0.03) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-3 lg:pr-12">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-7xl tracking-[-0.03em] leading-[0.95] mb-6 break-words" style={{ color: "var(--text-heading)" }}>
              Say hello.
            </h1>
            <p className="text-base leading-[1.6] mb-10 max-w-md" style={{ color: "var(--text-body)" }}>
              Have a question, opportunity, or just want to say hi? Reach out
              directly or send a message below.
            </p>
            <ContactForm />
          </div>

          <aside className="lg:col-span-2 lg:pt-16">
            <div className="space-y-6">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center gap-4 py-3 border-b border-border/80 hover:border-primary/20 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-label group-hover:text-heading transition-colors shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-label">
                        {link.label}
                      </p>
                      <p className="text-sm font-medium text-heading transition-colors">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-label group-hover:text-heading transition-colors ml-auto shrink-0" />
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

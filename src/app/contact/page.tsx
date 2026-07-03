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
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs text-accent tracking-[0.12em] uppercase mb-2">
            Connect
          </p>
          <h1 className="font-heading font-semibold text-4xl sm:text-5xl tracking-[-0.03em]">
            Contact
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-muted/70 text-sm max-w-md leading-relaxed">
              Have a question, opportunity, or just want to say hi? Reach out
              directly.
            </p>
            <div className="space-y-4">
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
                    className="group flex items-center gap-4 py-4 border-b border-[rgba(245,245,240,0.06)] hover:border-accent/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-muted/50 group-hover:text-accent transition-colors shrink-0" />
                    <div>
                      <p className="font-mono text-xs tracking-[0.08em] uppercase text-muted/50">
                        {link.label}
                      </p>
                      <p className="font-heading font-semibold tracking-[-0.02em] group-hover:text-accent transition-colors">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted/30 group-hover:text-accent transition-colors ml-auto shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted/60 mb-6 font-mono tracking-[0.08em] uppercase">
              Send a message
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { FadeUp } from "@/components/MotionSection";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss a project, collaboration, or enquiry.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          paddingTop: "clamp(7rem, 14vh, 11rem)",
          paddingBottom: "clamp(3rem, 5vh, 4rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          borderBottom: "1px solid rgba(221,213,200,0.12)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeUp>
            <p className="label-overline" style={{ marginBottom: "1.5rem" }}>
              Contact
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              className="text-display-lg"
              style={{ color: "#F5F0E8", maxWidth: "14ch" }}
            >
              Let's make something{" "}
              <em>worth making.</em>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Contact content ──────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(4rem, 8vw, 8rem)",
            alignItems: "start",
          }}
        >
          {/* Left — details */}
          <div>
            <FadeUp>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "1.0625rem",
                  color: "#8A847B",
                  lineHeight: 1.72,
                  maxWidth: "44ch",
                  marginBottom: "3rem",
                }}
              >
                Available for full-stack development, web design, and
                technical consultation. New projects typically start
                4–6 weeks out — get in touch early.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <ContactDetail
                  icon={<Mail size={15} />}
                  label="Email"
                  value="hello@kp.studio"
                  href="mailto:hello@kp.studio"
                />
                <ContactDetail
                  icon={<MapPin size={15} />}
                  label="Based in"
                  value="Remote"
                />
              </div>
            </FadeUp>

            {/* Social links */}
            <FadeUp delay={0.16}>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginTop: "3rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid rgba(221,213,200,0.12)",
                }}
              >
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "LinkedIn",  href: "https://linkedin.com"  },
                  { label: "Dribbble",  href: "https://dribbble.com"  },
                  { label: "Read.cv",   href: "https://read.cv"       },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-terracotta"
                    style={{
                      fontFamily: "var(--font-montreal), sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#8A847B",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <FadeUp delay={0.12}>
            <ContactForm />
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span style={{ color: "#B63A2B", marginTop: "2px" }}>{icon}</span>
      <div>
        <p className="label-overline" style={{ marginBottom: "0.3rem" }}>
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="link-terracotta"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "1rem",
              color: "#F5F0E8",
              textDecoration: "none",
            }}
          >
            {value}
          </a>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "1rem",
              color: "#F5F0E8",
            }}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

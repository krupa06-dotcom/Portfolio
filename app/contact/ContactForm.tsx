"use client";

import { useActionState } from "react";
import { submitContactForm, type FormState } from "./actions";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const initialState: FormState = { status: "idle" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#2D2D2D",
  border: "1px solid rgba(221,213,200,0.12)",
  borderRadius: "2px",
  padding: "0.875rem 1rem",
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: "0.9375rem",
  color: "#F5F0E8",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-montreal), 'Plus Jakarta Sans', sans-serif",
  fontSize: "0.6875rem",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#8A847B",
  marginBottom: "0.6rem",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.25rem",
          padding: "3rem",
          backgroundColor: "#2D2D2D",
          borderRadius: "2px",
          border: "1px solid rgba(221,213,200,0.12)",
        }}
      >
        <CheckCircle size={28} style={{ color: "#B63A2B" }} />
        <div>
          <p
            style={{
              fontFamily: "var(--font-canela), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "#F5F0E8",
              marginBottom: "0.75rem",
            }}
          >
            Message received.
          </p>
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "0.9375rem",
              color: "#8A847B",
              lineHeight: 1.65,
            }}
          >
            Thanks for reaching out. I'll be in touch within a couple of
            working days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Name */}
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(182,58,43,0.6)")}
          onBlur={e  => (e.currentTarget.style.borderColor = "rgba(221,213,200,0.12)")}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(182,58,43,0.6)")}
          onBlur={e  => (e.currentTarget.style.borderColor = "rgba(221,213,200,0.12)")}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project…"
          style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(182,58,43,0.6)")}
          onBlur={e  => (e.currentTarget.style.borderColor = "rgba(221,213,200,0.12)")}
        />
      </div>

      {/* Error message */}
      {state.status === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            backgroundColor: "rgba(182,58,43,0.1)",
            border: "1px solid rgba(182,58,43,0.3)",
            borderRadius: "2px",
          }}
        >
          <AlertCircle size={15} style={{ color: "#B63A2B", flexShrink: 0 }} />
          <p
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "0.875rem",
              color: "#F5F0E8",
            }}
          >
            {state.message}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="btn-terracotta"
        style={{
          alignSelf: "flex-start",
          opacity: pending ? 0.6 : 1,
          cursor: pending ? "not-allowed" : "pointer",
        }}
      >
        {pending ? (
          "Sending…"
        ) : (
          <>
            Send Message <Send size={13} />
          </>
        )}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../actions";

const ADMIN_EMAIL = "krupa@gmail.com";
const ADMIN_PASSWORD = "197283";

export default function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    try {
      await signIn(formData);
      router.refresh();
    } catch {
      setError("Invalid email or password");
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-transparent pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Decorative top accent */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="bg-surface backdrop-blur-xl rounded-xl border border-border p-8">
          {/* Logo / Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-surface border border-border/80 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-label"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading font-semibold text-xl text-primary tracking-[-0.02em]">
              Admin Panel
            </h1>
            <p className="text-sm text-body mt-1">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[11px] tracking-[0.08em] uppercase text-label mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border/80 rounded-lg px-4 py-2.5 text-sm text-heading placeholder:text-label focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[11px] tracking-[0.08em] uppercase text-label mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border/80 rounded-lg px-4 py-2.5 text-sm text-heading placeholder:text-label focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/20">
                <svg
                  className="w-4 h-4 text-red-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span className="text-xs text-red-400">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-accent-on font-heading font-semibold text-sm rounded-lg hover:bg-accent-hover transition-all disabled:opacity-60 glow-sm"
            >
              {pending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[11px] text-label font-mono tracking-[0.08em] uppercase">
          Portfolio Admin
        </p>
      </div>
    </div>
  );
}

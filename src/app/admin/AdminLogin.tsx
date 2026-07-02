"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin({ authFailed }: { authFailed?: boolean }) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin?auth=${encodeURIComponent(password)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-6">
        <div className="text-center mb-8">
          <Lock className="w-8 h-8 text-muted mx-auto mb-4" />
          <h1 className="font-heading font-semibold text-2xl tracking-[-0.02em]">
            Admin
          </h1>
          <p className="text-sm text-muted mt-1">Enter password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-4 py-2.5 text-sm text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="Password"
            autoFocus
          />
          {authFailed && (
            <p className="text-xs text-red-400 font-mono tracking-[0.08em] uppercase">
              Invalid password
            </p>
          )}
          <button
            type="submit"
            className="w-full px-6 py-2.5 bg-accent text-background font-heading font-semibold text-sm rounded-md hover:bg-accent/90 transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

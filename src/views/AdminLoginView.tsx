"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useView } from "@/lib/useView";

export function AdminLoginView() {
  const { navigate } = useView();
  const router = useRouter();
  const [email, setEmail] = useState(
    process.env.NODE_ENV === "development" ? "admin@dajarch.studio" : ""
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          password,
          csrfToken: await getCsrfToken(),
          callbackUrl: "/?view=admin",
          json: "true",
        }).toString(),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      // Force a refresh so server components pick up the new session cookie
      router.refresh();
      setTimeout(() => navigate({ view: "admin" }), 300);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate({ view: "landing" })}
          className="text-[11px] tracking-wide-luxe uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 mb-8"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          Back to site
        </button>

        <div className="bg-background border border-border rounded-md p-8 lg:p-10 shadow-luxe">
          <div className="mb-8">
            <p className="text-[11px] tracking-luxe uppercase text-gold mb-3">
              Novaform
            </p>
            <h1 className="font-serif-display text-3xl lg:text-4xl leading-tight">
              Admin sign in.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Manage designs, marquee items, and contact messages.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-luxe uppercase text-muted-foreground mb-2.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-background border border-border rounded-md pl-11 pr-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors"
                  placeholder="admin@novaform.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] tracking-luxe uppercase text-muted-foreground mb-2.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-background border border-border rounded-md pl-11 pr-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-[12px] text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
              {!loading && (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              )}
            </button>
          </form>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 pt-6 border-t border-border/60 text-[12px] text-muted-foreground">
              <p className="mb-1">
                <strong>Demo credentials</strong> (run <code className="bg-cream px-1.5 py-0.5 rounded text-[11px]">npm run db:seed</code> first):
              </p>
              <p>Email: <code className="bg-cream px-1.5 py-0.5 rounded text-[11px]">admin@dajarch.studio</code></p>
              <p>Password: <code className="bg-cream px-1.5 py-0.5 rounded text-[11px]">dajarch-admin-2025</code></p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

async function getCsrfToken(): Promise<string> {
  try {
    const r = await fetch("/api/auth/csrf");
    const j = await r.json();
    return j.csrfToken ?? "";
  } catch {
    return "";
  }
}

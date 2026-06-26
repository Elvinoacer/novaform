"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useView } from "@/lib/useView";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { view, navigate } = useView();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (next: Parameters<typeof navigate>[0]) => {
    setMobileOpen(false);
    setSearchOpen(false);
    navigate(next);
  };

  const isLanding = view.view === "landing";
  const onDark = isLanding && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-border/60 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go({ view: "landing" })}
            className={cn(
              "flex items-center gap-3 transition-colors",
              onDark ? "text-white" : "text-foreground"
            )}
            aria-label="Maison — Home"
          >
            <span className="font-serif-display text-2xl tracking-tight">
              MAISON
            </span>
            <span
              className={cn(
                "hidden sm:inline-block text-[10px] tracking-luxe uppercase opacity-70 border-l pl-3",
                onDark ? "border-white/30" : "border-border"
              )}
            >
              Architectural House Plans
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            className={cn(
              "hidden lg:flex items-center gap-9 text-[13px] tracking-wide-luxe uppercase",
              onDark ? "text-white/85" : "text-foreground/80"
            )}
          >
            <button
              onClick={() => go({ view: "browse" })}
              className={cn(
                "hover:text-foreground transition-colors",
                onDark && "hover:text-white",
                view.view === "browse" && (onDark ? "text-white" : "text-foreground")
              )}
            >
              Browse
            </button>
            <div className="group relative">
              <button className="hover:text-foreground transition-colors">
                Categories
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="glass border border-border/60 rounded-lg p-2 w-64 shadow-luxe">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => go({ view: "browse", category: c.slug })}
                      className="w-full text-left px-4 py-2.5 rounded-md hover:bg-accent/60 transition-colors flex flex-col"
                    >
                      <span className="font-serif-display text-[15px] tracking-normal normal-case text-foreground">
                        {c.name}
                      </span>
                      <span className="text-[11px] tracking-normal normal-case text-muted-foreground mt-0.5">
                        {c.tagline}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => go({ view: "about" })}
              className={cn(
                "hover:text-foreground transition-colors",
                onDark && "hover:text-white",
                view.view === "about" && (onDark ? "text-white" : "text-foreground")
              )}
            >
              About
            </button>
            <button
              onClick={() => go({ view: "contact" })}
              className={cn(
                "hover:text-foreground transition-colors",
                onDark && "hover:text-white",
                view.view === "contact" && (onDark ? "text-white" : "text-foreground")
              )}
            >
              Contact
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "p-2.5 rounded-full hover:bg-foreground/5 transition-colors",
                onDark ? "text-white" : "text-foreground"
              )}
              aria-label="Search"
            >
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go({ view: "contact" })}
              className={cn(
                "hidden lg:inline-flex items-center px-5 py-2.5 rounded-full text-[12px] tracking-wide-luxe uppercase transition-all duration-300",
                onDark
                  ? "bg-white text-charcoal hover:bg-white/90"
                  : "bg-charcoal text-white hover:bg-charcoal/90"
              )}
            >
              Request Plan
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "lg:hidden p-2.5 rounded-full hover:bg-foreground/5 transition-colors",
                onDark ? "text-white" : "text-foreground"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-serif-display text-2xl">MAISON</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-full hover:bg-foreground/5"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="px-6 py-8 flex flex-col gap-1">
              {[
                { label: "Home", v: { view: "landing" } as const },
                { label: "Browse All", v: { view: "browse" } as const },
                { label: "About", v: { view: "about" } as const },
                { label: "Contact", v: { view: "contact" } as const },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => go(item.v)}
                  className="text-left font-serif-display text-3xl py-3 border-b border-border/40 hover:text-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-8">
                <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-3">
                  Categories
                </p>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => go({ view: "browse", category: c.slug })}
                    className="block w-full text-left py-2.5 text-foreground/80 hover:text-foreground"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto mt-32 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Search className="size-5 text-muted-foreground" strokeWidth={1.5} />
                <input
                  autoFocus
                  placeholder="Search houses, styles, categories…"
                  className="flex-1 bg-transparent outline-none text-2xl font-serif-display placeholder:text-muted-foreground/60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value;
                      const sp = new URLSearchParams();
                      sp.set("view", "browse");
                      sp.set("q", value);
                      window.scrollTo({ top: 0, behavior: "auto" });
                      window.history.pushState(null, "", `/?${sp.toString()}`);
                      setSearchOpen(false);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }
                  }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-[11px] tracking-luxe uppercase text-muted-foreground hover:text-foreground"
                >
                  Esc
                </button>
              </div>
              <p className="mt-6 text-[11px] tracking-luxe uppercase text-muted-foreground">
                Try
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Modern Villa", "4 Bedrooms", "Bungalow", "Under 200 sqm"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => {
                        const sp = new URLSearchParams();
                        sp.set("view", "browse");
                        sp.set("q", t);
                        window.scrollTo({ top: 0, behavior: "auto" });
                        window.history.pushState(null, "", `/?${sp.toString()}`);
                        setSearchOpen(false);
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="px-4 py-2 rounded-full border border-border text-sm hover:border-foreground hover:bg-foreground/5 transition-colors"
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

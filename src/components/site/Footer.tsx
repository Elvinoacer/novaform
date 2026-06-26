"use client";

import { Instagram, Twitter, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import { useView } from "@/lib/useView";
import { CATEGORIES } from "@/lib/data";

export function Footer() {
  const { navigate } = useView();

  return (
    <footer className="mt-auto bg-charcoal text-white/85">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-luxe uppercase text-white/50 mb-4">
              Maison Studio
            </p>
            <h3 className="font-serif-display text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight">
              Crafted architectural
              <br />
              designs for modern
              <br />
              living.
            </h3>
            <button
              onClick={() => navigate({ view: "contact" })}
              className="group mt-10 inline-flex items-center gap-3 text-sm tracking-wide-luxe uppercase text-white border-b border-white/30 pb-2 hover:border-white transition-colors"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
            </button>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-[11px] tracking-luxe uppercase text-white/50 mb-5">
              Catalog
            </p>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button onClick={() => navigate({ view: "browse" })} className="hover:text-white transition-colors">
                  Browse all designs
                </button>
              </li>
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => navigate({ view: "browse", category: c.slug })}
                    className="hover:text-white transition-colors text-white/75"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-luxe uppercase text-white/50 mb-5">
              Studio
            </p>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button onClick={() => navigate({ view: "about" })} className="hover:text-white transition-colors text-white/75">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: "contact" })} className="hover:text-white transition-colors text-white/75">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ view: "browse" })} className="hover:text-white transition-colors text-white/75">
                  Featured
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[11px] tracking-luxe uppercase text-white/50 mb-5">
              Follow
            </p>
            <div className="flex flex-wrap gap-2">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="size-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-white/50">
          <p>© {new Date().getFullYear()} Maison Studio. All rights reserved.</p>
          <p className="tracking-wide-luxe uppercase text-[10px]">
            Designed in studio · Built for the field
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface MarqueeItem {
  id?: string;
  text: string;
  href?: string | null;
  icon?: string | null;
}

interface MarqueeProps {
  items: MarqueeItem[];
  /** "left" = content scrolls to the left (default). "right" = scrolls to the right. */
  direction?: "left" | "right";
  /** Seconds per loop. Higher = slower. Default: 30 */
  duration?: number;
  /** Pause on hover. Default: true */
  pauseOnHover?: boolean;
  /** Visual style. Default: "soft" */
  variant?: "soft" | "bold" | "minimal";
  /** Optional icon to render between items. */
  separatorIcon?: React.ReactNode;
  className?: string;
}

/**
 * Marquee — infinite horizontal scroller that duplicates its children to
 * create a seamless loop. Pure CSS keyframes — no JS rAF.
 *
 * Pause on hover is implemented via :hover on the parent — children stop
 * animating while hovered.
 */
export function Marquee({
  items,
  direction = "left",
  duration = 30,
  pauseOnHover = true,
  variant = "soft",
  separatorIcon,
  className,
}: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Force animation restart whenever items/duration/direction change so
  // the loop stays in sync.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.style.animation = "none";
    // Force reflow
    void el.offsetWidth;
    el.style.animation = `marquee-${direction} ${duration}s linear infinite`;
  }, [items, direction, duration]);

  // Duplicate the items array so the loop has no visible seam.
  const loop = [...items, ...items];

  const variantClass =
    variant === "bold"
      ? "bg-charcoal text-white py-5 border-y border-white/10"
      : variant === "minimal"
      ? "bg-transparent text-foreground/60 py-3 border-y border-border/60"
      : "bg-cream text-charcoal py-4 border-y border-border/60";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group",
        variantClass,
        pauseOnHover && "[&:hover>*]:[animation-play-state:paused]",
        className
      )}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        ref={scrollerRef}
        className="flex items-center gap-10 sm:gap-14 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {loop.map((item, i) => (
          <MarqueeRow
            key={`${item.id ?? item.text}-${i}`}
            item={item}
            separator={separatorIcon ?? <DefaultSeparator variant={variant} />}
          />
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({
  item,
  separator,
}: {
  item: MarqueeItem;
  separator: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-10 sm:gap-14">
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="font-serif-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-none tracking-tight hover:text-gold transition-colors"
        >
          {item.text}
        </a>
      ) : (
        <span className="font-serif-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-none tracking-tight">
          {item.text}
        </span>
      )}
      <span className="text-gold/80 flex items-center justify-center">
        {separator}
      </span>
    </span>
  );
}

function DefaultSeparator({
  variant,
}: {
  variant: "soft" | "bold" | "minimal";
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={variant === "bold" ? "text-white/40" : "text-gold"}
      aria-hidden="true"
    >
      <path
        d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

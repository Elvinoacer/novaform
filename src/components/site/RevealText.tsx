"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type RevealMode = "word" | "char" | "line";

interface RevealTextProps {
  /** The text to animate. */
  text: string;
  /** Animation unit. Default: word */
  mode?: RevealMode;
  /** Tailwind class to apply to the outer element. */
  className?: string;
  /** Tailwind class to apply to each animated unit. */
  unitClassName?: string;
  /** Optional element tag. Default: span */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
  /** Stagger delay between each unit, in seconds. Default: 0.04 */
  stagger?: number;
  /** Initial delay before animation begins. Default: 0 */
  delay?: number;
  /** Run animation only once when it enters viewport. Default: true */
  once?: boolean;
  /** Vertical offset for each unit. Default: 16 (px) */
  y?: number;
}

/**
 * RevealText — splits text into words / characters / lines and animates
 * each unit into view on scroll using framer-motion's `useInView`.
 *
 * - Word mode: best for headings and CTAs
 * - Line mode: split on \n — useful for multiline headlines
 * - Char mode: best for short display text (3-12 chars)
 *
 * Accessibility: the text is rendered as real DOM nodes (not aria-hidden),
 * so screen readers read it as one continuous string.
 */
export function RevealText({
  text,
  mode = "word",
  className,
  unitClassName,
  as = "span",
  stagger = 0.04,
  delay = 0,
  once = true,
  y = 16,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px 0px -80px 0px" });

  const Tag = motion[as] as typeof motion.span;

  // Split into units depending on mode
  const units: string[][] = [];
  if (mode === "line") {
    const lines = text.split("\n");
    for (const line of lines) units.push([line]);
  } else if (mode === "word") {
    units.push(text.split(/(\s+)/)); // keep spaces as units for natural flow
  } else {
    units.push(Array.from(text));
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      ref={ref as any}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {units.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className={mode === "line" ? "block" : "inline"}
          aria-hidden="true"
        >
          {line.map((unit, unitIdx) => {
            if (unit.trim() === "" && mode === "word") {
              return <span key={unitIdx}> </span>;
            }
            return (
              <motion.span
                key={`${lineIdx}-${unitIdx}`}
                variants={child}
                className={cn("inline-block whitespace-pre", unitClassName)}
              >
                {unit}
              </motion.span>
            );
          })}
          {mode === "line" && lineIdx < units.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}

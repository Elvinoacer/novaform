"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyChatIconProps {
  /** E.164 phone number, digits only. Default: env WHATSAPP_PHONE */
  phone?: string;
  /** Pre-filled message. Default: env WHATSAPP_DEFAULT_MESSAGE */
  message?: string;
  /** Tooltip / bubble text shown periodically. */
  tooltipText?: string;
  /** How often (ms) the tooltip reappears after dismissal. Default: 20000 */
  tooltipInterval?: number;
}

/**
 * StickyChatIcon — fixed bottom-right WhatsApp chat button.
 *
 * Visual signature:
 *   - Floating circular green WhatsApp button (bottom-right, z-40)
 *   - Continuously radiating concentric "wave" rings signalling live chat
 *   - Periodic flashing glow + gentle pulse to draw the eye
 *   - Tooltip bubble that fades in/out with a CTA message
 *
 * Click → opens WhatsApp chat (wa.me link) with the configured phone + message.
 *
 * The icon respects safe-area insets on mobile, sits above the footer,
 * and is hidden inside the admin dashboard to avoid overlap with admin actions.
 */
export function StickyChatIcon({
  phone,
  message,
  tooltipText = "Need help? Chat with us on WhatsApp",
  tooltipInterval = 20000,
}: StickyChatIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const finalPhone =
    (phone ?? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "254794636982").replace(
      /[^0-9]/g,
      ""
    );
  const finalMessage =
    message ??
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
    "Hello Novaform, I'd like to know more about your house plans.";

  // Periodically resurface the tooltip until the user dismisses it.
  useEffect(() => {
    const cycle = () => {
      setShowTooltip(true);
      hideTimer = window.setTimeout(() => setShowTooltip(false), 6000);
    };
    let showTimer: number;
    let hideTimer: number;

    const start = () => {
      // First appearance after 4s
      showTimer = window.setTimeout(() => {
        if (!dismissed) cycle();
        // Then every tooltipInterval
        intervalId = window.setInterval(() => {
          if (!dismissed) cycle();
        }, tooltipInterval);
      }, 4000);
    };
    let intervalId: number;
    start();

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.clearInterval(intervalId);
    };
  }, [dismissed, tooltipInterval]);

  const href = `https://wa.me/${finalPhone}?text=${encodeURIComponent(
    finalMessage
  )}`;

  return (
    <div
      className="fixed z-40 bottom-5 right-5 sm:bottom-7 sm:right-7 flex flex-col items-end gap-3"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      aria-live="polite"
    >
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[260px] rounded-2xl bg-white shadow-luxe-lg border border-border/60 px-4 py-3 pr-9"
          >
            <button
              onClick={() => {
                setShowTooltip(false);
                setDismissed(true);
              }}
              aria-label="Dismiss chat tooltip"
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-foreground/5"
            >
              <X className="size-3.5 text-muted-foreground" strokeWidth={2} />
            </button>
            <p className="text-[13px] text-foreground leading-snug">
              {tooltipText}
            </p>
            <p className="mt-1 text-[11px] tracking-wide-luxe uppercase text-gold">
              Quick chat available
            </p>
            {/* speech tail */}
            <span className="absolute -bottom-1.5 right-6 size-3 rotate-45 bg-white border-r border-b border-border/60" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center"
      >
        {/* Radiating wave rings — continuous, staggered */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 56,
                height: 56,
                background:
                  "radial-gradient(circle, oklch(0.7 0.18 145 / 0.45) 0%, oklch(0.7 0.18 145 / 0) 70%)",
              }}
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </span>

        {/* Flashing glow halo behind the button */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 64,
            height: 64,
            boxShadow: "0 0 0 0 oklch(0.7 0.18 145 / 0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 0 0 oklch(0.7 0.18 145 / 0.55)",
              "0 0 0 14px oklch(0.7 0.18 145 / 0)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />

        {/* The button itself — gentle pulse */}
        <motion.span
          className={cn(
            "relative flex items-center justify-center rounded-full",
            "size-14 sm:size-16",
            "bg-[#25D366] hover:bg-[#1ebd5a] transition-colors",
            "shadow-[0_10px_30px_-6px_oklch(0.7_0.18_145_/_0.6)]"
          )}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <WhatsAppGlyph className="size-7 sm:size-8 text-white" />
        </motion.span>

        {/* Online dot */}
        <span className="absolute top-0 right-0 size-3.5 rounded-full bg-emerald-400 border-2 border-white" />
      </a>
    </div>
  );
}

/** Brand-correct WhatsApp glyph (SVG, no external icon lib needed). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);
  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, goNext, goPrev]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[90vw] max-h-[82vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "video" ? (
              <div className="relative w-full max-w-5xl aspect-video rounded-md overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${current.src}?autoplay=1&rel=0&modestbranding=1`}
                  title={current.caption || "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
                <Image
                  src={current.src}
                  alt={current.caption || "Gallery image"}
                  width={2000}
                  height={1200}
                  className="max-w-full max-h-[82vh] object-contain rounded-md"
                  unoptimized
                />
              </div>
            )}
            {current.caption && (
              <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[12px] tracking-wide-luxe uppercase text-white/70 whitespace-nowrap">
                {current.caption}
              </p>
            )}
          </motion.div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-[12px] tracking-luxe uppercase">
            {(index ?? 0) + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface LightboxTriggerProps {
  item: GalleryItem;
  onOpen: () => void;
  className?: string;
}

/** Small wrapper to render the poster for a video item */
export function VideoPoster({ item, onOpen, className }: LightboxTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className={`group relative w-full h-full overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={item.poster || item.src}
        alt={item.caption || "Video"}
        fill
        sizes="(max-width: 1200px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/15 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-16 lg:size-20 rounded-full bg-white/95 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <Play className="size-6 text-charcoal translate-x-0.5 fill-charcoal" strokeWidth={0} />
        </div>
      </div>
      {item.caption && (
        <p className="absolute bottom-4 left-4 text-[11px] tracking-wide-luxe uppercase text-white/90">
          {item.caption}
        </p>
      )}
    </button>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BedDouble, Bath, Maximize2, ArrowUpRight } from "lucide-react";
import type { House } from "@/lib/types";
import { useView } from "@/lib/useView";
import { cn } from "@/lib/utils";

interface HouseCardProps {
  house: House;
  index?: number;
  variant?: "default" | "featured" | "compact";
  className?: string;
  priority?: boolean;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function HouseCard({
  house,
  index = 0,
  variant = "default",
  className,
  priority,
}: HouseCardProps) {
  const { navigate } = useView();

  const handleOpen = () => navigate({ view: "house", houseSlug: house.slug });

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className={cn("group cursor-pointer", className)}
        onClick={handleOpen}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
          <Image
            src={house.thumbnail}
            alt={house.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute top-5 left-5">
            <span className="inline-block text-[10px] tracking-luxe uppercase text-white/85 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {house.style}
            </span>
          </div>
          <div className="absolute top-5 right-5">
            <div className="size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="size-4 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 text-white">
            <p className="text-[11px] tracking-luxe uppercase text-white/70 mb-2">
              {house.tagline}
            </p>
            <h3 className="font-serif-display text-2xl lg:text-[28px] leading-tight">
              {house.name}
            </h3>
            <div className="mt-4 flex items-center gap-4 text-[12px] text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="size-3.5" strokeWidth={1.5} />
                {house.bedrooms} Beds
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bath className="size-3.5" strokeWidth={1.5} />
                {house.bathrooms} Baths
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Maximize2 className="size-3.5" strokeWidth={1.5} />
                {house.area} sqm
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="group cursor-pointer"
        onClick={handleOpen}
      >
        <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
          <Image
            src={house.thumbnail}
            alt={house.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </div>
        <div className="mt-3.5">
          <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
            {house.style}
          </p>
          <h3 className="font-serif-display text-lg mt-1 group-hover:text-gold transition-colors">
            {house.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {house.bedrooms} beds · {house.area} sqm
          </p>
        </div>
      </motion.article>
    );
  }

  // default — used on Browse page
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={handleOpen}
    >
      <div className="relative aspect-[5/6] overflow-hidden rounded-sm bg-muted">
        <Image
          src={house.thumbnail}
          alt={house.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
            <Star className="size-3 fill-gold text-gold" strokeWidth={0} />
            <span className="font-medium text-foreground">{house.rating}</span>
            <span className="text-muted-foreground">({house.reviews})</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="size-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight className="size-4 text-charcoal" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
            {house.style}
          </p>
          <h3 className="font-serif-display text-xl mt-1 truncate group-hover:text-gold transition-colors">
            {house.name}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[12px] text-muted-foreground">
            <span>{house.bedrooms} Beds</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>{house.bathrooms} Baths</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>{house.area} sqm</span>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground whitespace-nowrap">
          {formatPrice(house.price)}
        </p>
      </div>
    </motion.article>
  );
}

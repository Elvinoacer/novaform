"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { useView } from "@/lib/useView";
import { CATEGORIES, HOUSES, getFeaturedHouses } from "@/lib/data";
import { HouseCard } from "@/components/site/HouseCard";
import { Lightbox, VideoPoster } from "@/components/site/Lightbox";
import { useState } from "react";
import * as Icons from "lucide-react";
import type { GalleryItem } from "@/lib/types";

export function LandingView() {
  const { navigate } = useView();
  const featured = getFeaturedHouses();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  // Inspiration gallery — flatten all galleries (excluding videos for masonry)
  const inspirationItems: (GalleryItem & { houseName?: string })[] = [];
  HOUSES.forEach((h) => {
    h.gallery.slice(0, 4).forEach((g) => {
      if (g.type !== "video") inspirationItems.push({ ...g, houseName: h.name });
    });
  });
  const inspiration = inspirationItems.slice(0, 14);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Spread items into columns for masonry feel
  const columns: (typeof inspiration)[] = [[], [], [], []];
  inspiration.forEach((item, i) => {
    columns[i % 4].push(item);
  });

  return (
    <div className="bg-background">
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal"
      >
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0"
        >
          <Image
            src={HOUSES[0].hero}
            alt="The Aurora Residence"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/50" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-[12px] tracking-luxe uppercase text-white/70 mb-7"
          >
            Maison Studio · Architectural House Plans
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-white text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.025em] max-w-[14ch]"
          >
            Crafted for
            <br />
            modern living.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-base sm:text-lg text-white/75 max-w-[52ch] leading-relaxed"
          >
            Discover beautiful architectural designs that inspire your next
            dream home — a curated catalog of premium, construction-ready
            house plans.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={() => navigate({ view: "browse" })}
              className="group inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-white/90 transition-all hover:gap-4"
            >
              Explore Designs
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => navigate({ view: "house", houseSlug: "aurora-residence" })}
              className="group inline-flex items-center gap-3 text-white border border-white/25 px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Play className="size-3.5 fill-white" strokeWidth={0} />
              Watch Walkthrough
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] tracking-luxe uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ FEATURED COLLECTION ============ */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
              The Featured Collection
            </p>
            <h2 className="font-serif-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight">
              Six designs,
              <br />
              chosen this season.
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate({ view: "browse" })}
            className="group inline-flex items-center gap-2.5 text-[12px] tracking-wide-luxe uppercase text-foreground border-b border-foreground/30 pb-2 hover:border-foreground transition-colors self-start"
          >
            View all designs
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {featured.map((house, i) => (
            <HouseCard
              key={house.id}
              house={house}
              index={i}
              variant="featured"
              priority={i < 3}
            />
          ))}
        </div>
      </section>

      {/* ============ INSPIRATION GALLERY (Masonry) ============ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] tracking-luxe uppercase text-gold mb-4"
            >
              Inspiration Gallery
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight"
            >
              Walk through the rooms
              <br />
              before they exist.
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3 lg:gap-4">
                {col.map((item, ii) => {
                  const globalIndex = ci + ii * 4;
                  const aspect =
                    item.span === "tall"
                      ? "aspect-[3/4]"
                      : item.span === "wide"
                      ? "aspect-[16/10]"
                      : item.span === "square"
                      ? "aspect-square"
                      : item.span === "full"
                      ? "aspect-[16/9]"
                      : ["aspect-[4/5]", "aspect-[4/3]", "aspect-square"][ii % 3];

                  return (
                    <motion.button
                      key={item.id + ii}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.7,
                        delay: ii * 0.05 + ci * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => setLightboxIndex(globalIndex)}
                      className={`group relative ${aspect} overflow-hidden rounded-sm bg-muted`}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption || item.houseName || "Gallery image"}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {item.caption && (
                        <div className="absolute bottom-0 inset-x-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <p className="text-[10px] tracking-luxe uppercase text-white/70">
                            {item.houseName}
                          </p>
                          <p className="text-white text-sm font-serif-display mt-0.5">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate({ view: "browse" })}
              className="group inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4"
            >
              Browse Full Catalog
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] tracking-luxe uppercase text-gold mb-4"
          >
            Browse by Category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight"
          >
            Find the typology
            <br />
            that fits your plot.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {CATEGORIES.map((c, i) => {
            const Icon = (Icons as any)[c.icon] ?? Icons.Square;
            return (
              <motion.button
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => navigate({ view: "browse", category: c.slug })}
                className="group relative aspect-[4/5] md:aspect-[4/4.5] overflow-hidden rounded-sm bg-muted text-left"
              >
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute top-5 left-5">
                  <div className="size-11 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center">
                    <Icon className="size-5 text-white" strokeWidth={1.25} />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 lg:p-7 text-white">
                  <p className="text-[10px] tracking-luxe uppercase text-white/60 mb-1.5">
                    {c.tagline}
                  </p>
                  <h3 className="font-serif-display text-xl lg:text-2xl leading-tight">
                    {c.name}
                  </h3>
                  <p className="hidden md:block mt-2 text-[13px] text-white/70 leading-relaxed line-clamp-2 max-w-xs">
                    {c.description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-wide-luxe uppercase text-white/90 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Explore
                    <ArrowUpRight className="size-3" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ============ WHY OUR DESIGNS ============ */}
      <section className="py-24 lg:py-36 bg-charcoal text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
              Why Our Designs
            </p>
            <h2 className="font-serif-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight">
              Every plan is
              <br />
              construction-ready.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-md">
              We don&apos;t sell concepts. Every house in our catalog has been
              detailed, dimensioned and engineered to be built — with
              foundations, sections, electrical and plumbing layouts included.
            </p>
            <button
              onClick={() => navigate({ view: "about" })}
              className="group mt-8 inline-flex items-center gap-3 text-[12px] tracking-wide-luxe uppercase text-white border-b border-white/30 pb-2 hover:border-white transition-colors"
            >
              Our Process
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
            </button>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden">
            {[
              { title: "Professionally Designed", desc: "By licensed architects with 15+ years of residential practice." },
              { title: "Construction-Ready", desc: "Foundation, structural, electrical, plumbing — all included." },
              { title: "Optimised Layouts", desc: "No wasted circulation. Every square metre earns its place." },
              { title: "Beautiful Exteriors", desc: "Considered elevations that age well and photograph better." },
              { title: "Modern Interiors", desc: "Kitchens, bathrooms and joinery detailed to scale." },
              { title: "Site-Adaptable", desc: "Each plan can be mirrored, stretched or rotated to your plot." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-charcoal p-8 lg:p-10"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 size-1.5 rounded-full bg-gold" />
                  <h3 className="font-serif-display text-xl text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/65 text-sm leading-relaxed pl-4">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-32 lg:py-44 px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-[11px] tracking-luxe uppercase text-gold mb-6">
            Ready to Build?
          </p>
          <h2 className="font-serif-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] tracking-tight">
            Explore over 100
            <br />
            <span className="text-gold-gradient italic font-display font-medium">premium</span>{" "}
            house plans.
          </h2>
          <p className="mt-8 text-foreground/70 text-lg max-w-xl mx-auto leading-relaxed">
            Pick a design. Request the brochure. Take it to your builder. We
            will be here for every step in between.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate({ view: "browse" })}
              className="group inline-flex items-center gap-3 bg-charcoal text-white px-9 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4"
            >
              Browse Collection
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => navigate({ view: "contact" })}
              className="inline-flex items-center gap-3 border border-foreground/20 px-9 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-foreground/5 transition-colors"
            >
              Talk to an Architect
            </button>
          </div>
        </motion.div>
      </section>

      <Lightbox
        items={inspiration}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Star,
  BedDouble,
  Bath,
  Building2,
  Maximize2,
  Car,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  FileText,
  Heart,
  Share2,
  Play,
  ZoomIn,
  ZoomOut,
  Maximize,
  ArrowUpRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  getHouseBySlug,
  getSimilarHouses,
  CATEGORIES,
} from "@/lib/data";
import { useView } from "@/lib/useView";
import { HouseCard } from "@/components/site/HouseCard";
import { Lightbox } from "@/components/site/Lightbox";
import { cn } from "@/lib/utils";

interface HouseViewProps {
  slug: string;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export function HouseView({ slug }: HouseViewProps) {
  const { navigate } = useView();
  const house = getHouseBySlug(slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.55, 0.85]);

  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [floorIndex, setFloorIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreenPlan, setIsFullscreenPlan] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exteriorIndex, setExteriorIndex] = useState(0);

  if (!house) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <p className="font-serif-display text-4xl mb-4">Design not found.</p>
        <button
          onClick={() => navigate({ view: "browse" })}
          className="text-sm tracking-wide-luxe uppercase border-b border-foreground/40 pb-1"
        >
          Browse all designs
        </button>
      </div>
    );
  }

  const similar = getSimilarHouses(house, 4);
  const categoryName =
    CATEGORIES.find((c) => c.slug === house.category)?.name ?? house.category;

  // Gallery layout — explicit positions for the mixed grid
  const gallery = house.gallery;

  return (
    <div className="bg-background">
      {/* ==================== HERO ==================== */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-charcoal"
      >
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <Image
            src={house.hero}
            alt={house.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/85"
        />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate({ view: "browse" })}
              className="group inline-flex items-center gap-2 text-[11px] tracking-luxe uppercase text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
              Back to catalog
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-[12px] tracking-luxe uppercase text-white/70 mb-4"
            >
              {house.tagline} · {categoryName}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-display text-white text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] max-w-[14ch]"
            >
              {house.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center gap-5 lg:gap-8 text-white"
            >
              <div className="inline-flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={cn(
                        "size-4",
                        n <= Math.round(house.rating)
                          ? "fill-gold text-gold"
                          : "text-white/30"
                      )}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  {house.rating} · {house.reviews} reviews
                </span>
              </div>
              <Spec icon={<BedDouble className="size-4" strokeWidth={1.5} />} value={`${house.bedrooms} Beds`} />
              <Spec icon={<Bath className="size-4" strokeWidth={1.5} />} value={`${house.bathrooms} Baths`} />
              <Spec icon={<Building2 className="size-4" strokeWidth={1.5} />} value={`${house.stories} ${house.stories === 1 ? "Storey" : "Storeys"}`} />
              <Spec icon={<Maximize2 className="size-4" strokeWidth={1.5} />} value={`${house.area} sqm`} />
              <Spec icon={<Car className="size-4" strokeWidth={1.5} />} value={`${house.garage} Car${house.garage !== 1 ? "s" : ""}`} />
            </motion.div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="absolute top-0 inset-x-0 z-40 pt-20 lg:pt-24 pointer-events-none">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex justify-end">
            <div className="pointer-events-auto hidden md:flex items-center gap-2">
              <ActionBtn label="Brochure" icon={<Download className="size-4" strokeWidth={1.5} />} onClick={() => navigate({ view: "contact" })} />
              <ActionBtn label="Save" icon={<Heart className={cn("size-4 transition-colors", saved && "fill-gold text-gold")} strokeWidth={1.5} />} onClick={() => setSaved((s) => !s)} />
              <ActionBtn label="Share" icon={<Share2 className="size-4" strokeWidth={1.5} />} onClick={() => { if (navigator.share) navigator.share({ title: house.name, url: window.location.href }); }} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom action bar (mobile + secondary) */}
      <StickyBar house={house} saved={saved} onToggleSave={() => setSaved((s) => !s)} onContact={() => navigate({ view: "contact" })} />

      {/* Spacer so the sticky bottom bar never overlaps the final CTA */}
      <div className="h-24 lg:h-16" aria-hidden />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* ==================== GALLERY ==================== */}
        <section className="py-20 lg:py-28">
          <SectionHeading index="01" label="The Gallery" title="Walk through the spaces." />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px] lg:auto-rows-[220px]">
            {gallery.map((item, i) => {
              const spanClass = (() => {
                switch (item.span) {
                  case "full":
                    return "col-span-2 lg:col-span-4 row-span-2";
                  case "wide":
                    return "col-span-2 lg:col-span-4 row-span-1";
                  case "tall":
                    return "col-span-1 row-span-2";
                  case "small":
                    return "col-span-1 row-span-1";
                  default:
                    return "col-span-1 row-span-1";
                }
              })();
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 4) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setGalleryIndex(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-sm bg-muted",
                    spanClass
                  )}
                >
                  <Image
                    src={item.type === "video" ? item.poster || "" : item.src}
                    alt={item.caption || house.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-colors" />
                  {item.type === "video" && (
                    <>
                      <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/15 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-white/95 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                          <Play className="size-5 text-charcoal translate-x-0.5 fill-charcoal" strokeWidth={0} />
                        </div>
                      </div>
                    </>
                  )}
                  {item.caption && (
                    <div className="absolute bottom-0 inset-x-0 p-4 text-left bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-[10px] tracking-luxe uppercase text-white/70">{item.type === "video" ? "Walkthrough film" : "Image"}</p>
                      <p className="text-white text-sm font-serif-display">{item.caption}</p>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ==================== VIDEO TOUR ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <SectionHeading index="02" label="Video Tour" title="Press play. Move through it." />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 relative aspect-video rounded-md overflow-hidden bg-charcoal shadow-luxe"
          >
            <Image
              src={house.videoTour.poster}
              alt={house.videoTour.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/40" />
            <button
              onClick={() => setGalleryIndex(gallery.findIndex((g) => g.type === "video"))}
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
            >
              <div className="size-20 lg:size-24 rounded-full bg-white/95 flex items-center justify-center mb-5 transition-transform duration-500 hover:scale-110">
                <Play className="size-8 text-charcoal translate-x-1 fill-charcoal" strokeWidth={0} />
              </div>
              <p className="text-[11px] tracking-luxe uppercase text-white/70">
                {house.videoTour.title}
              </p>
            </button>
          </motion.div>
        </section>

        {/* ==================== DESCRIPTION / STORY ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="03"
                label="The Story"
                title="Designed for living."
                className="lg:sticky lg:top-28"
              />
            </div>
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-2xl lg:text-3xl leading-[1.35] text-foreground/90 first-letter:font-serif-display first-letter:text-5xl first-letter:font-medium first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9] first-letter:mt-1">
                  {house.description}
                </p>
                <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed text-[16px]">
                  {house.story.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-8 border-t border-border/60">
                  {house.highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="size-5 rounded-full bg-gold/15 flex items-center justify-center">
                        <Check className="size-3 text-gold" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm text-foreground/80">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== FLOOR PLANS ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <SectionHeading index="04" label="Floor Plans" title="Drawn to scale. Built to last." />
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-6">
              {house.floorPlans.map((fp, i) => (
                <button
                  key={fp.label}
                  onClick={() => {
                    setFloorIndex(i);
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[12px] tracking-wide-luxe uppercase border transition-colors",
                    floorIndex === i
                      ? "bg-charcoal text-white border-charcoal"
                      : "border-border hover:border-foreground/40"
                  )}
                >
                  {fp.label}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-1">
                <PlanBtn label="Zoom out" icon={<ZoomOut className="size-4" strokeWidth={1.5} />} onClick={() => setZoom((z) => Math.max(1, z - 0.25))} disabled={zoom === 1} />
                <span className="text-[11px] tracking-luxe uppercase text-muted-foreground px-2 min-w-[3.5rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <PlanBtn label="Zoom in" icon={<ZoomIn className="size-4" strokeWidth={1.5} />} onClick={() => setZoom((z) => Math.min(3, z + 0.25))} />
                <PlanBtn label="Fullscreen" icon={<Maximize className="size-4" strokeWidth={1.5} />} onClick={() => setIsFullscreenPlan(true)} />
              </div>
            </div>

            <motion.div
              key={floorIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-cream rounded-md border border-border/60 overflow-hidden aspect-[16/10] cursor-grab active:cursor-grabbing luxe-scrollbar"
              onPointerDown={(e) => {
                if (zoom === 1) return;
                const start = { x: e.clientX - pan.x, y: e.clientY - pan.y };
                const move = (ev: PointerEvent) =>
                  setPan({ x: ev.clientX - start.x, y: ev.clientY - start.y });
                const up = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", up);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
              }}
            >
              <div
                className="absolute inset-0 origin-center transition-transform duration-300"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
                dangerouslySetInnerHTML={{
                  __html: house.floorPlans[floorIndex].svg,
                }}
              />
              {zoom === 1 && (
                <div className="absolute bottom-4 right-4 text-[10px] tracking-luxe uppercase text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
                  Hover · Click zoom to explore
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ==================== SPECIFICATIONS ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <SectionHeading index="05" label="Specifications" title="The numbers behind the design." />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-md overflow-hidden">
            {house.specifications.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background p-6 lg:p-8"
              >
                <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">
                  {s.label}
                </p>
                <p className="font-serif-display text-2xl lg:text-3xl leading-tight">
                  {s.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== EXTERIOR CAROUSEL ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <SectionHeading index="06" label="Exterior" title="From every angle." />
          <div className="mt-10 relative">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-md overflow-hidden bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={exteriorIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={house.exterior[exteriorIndex]}
                    alt={`Exterior view ${exteriorIndex + 1}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1400px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => setExteriorIndex((i) => (i - 1 + house.exterior.length) % house.exterior.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Previous exterior"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setExteriorIndex((i) => (i + 1) % house.exterior.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Next exterior"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              {house.exterior.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setExteriorIndex(i)}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === exteriorIndex ? "w-10 bg-charcoal" : "w-5 bg-border hover:bg-foreground/40"
                  )}
                  aria-label={`Go to exterior ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== INTERIOR INSPIRATION ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <SectionHeading index="07" label="Interior Inspiration" title="Rooms, dressed." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Kitchen", img: house.interiors.kitchen },
              { label: "Living Room", img: house.interiors.livingRoom },
              { label: "Bedroom", img: house.interiors.bedroom },
              { label: "Bathroom", img: house.interiors.bathroom },
              { label: "Outdoor", img: house.interiors.outdoor },
            ].map((room, i) => (
              <motion.div
                key={room.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-sm bg-muted",
                  i === 0 && "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-square",
                  i !== 0 && "aspect-[4/3]"
                )}
              >
                <Image
                  src={room.img}
                  alt={room.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[10px] tracking-luxe uppercase text-white/70">Reference</p>
                  <p className="text-white text-lg font-serif-display">{room.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== SIMILAR DESIGNS ==================== */}
        <section className="py-20 lg:py-28 border-t border-border/60">
          <div className="flex items-end justify-between gap-6 mb-12">
            <SectionHeading
              index="08"
              label="You May Also Like"
              title="Don't leave just yet."
              className="mb-0"
            />
            <button
              onClick={() => navigate({ view: "browse", category: house.category })}
              className="group hidden sm:inline-flex items-center gap-2 text-[12px] tracking-wide-luxe uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              More in {categoryName}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {similar.map((h, i) => (
              <HouseCard key={h.id} house={h} index={i} variant="compact" />
            ))}
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="py-24 lg:py-32 border-t border-border/60 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] tracking-luxe uppercase text-gold mb-5">
              Ready for {house.name}?
            </p>
            <h2 className="font-serif-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-3xl mx-auto">
              Request the full plan, drawings &amp; specifications.
            </h2>
            <p className="mt-5 text-foreground/70 max-w-xl mx-auto">
              We respond within one working day with a brochure, sample sheets,
              and a no-obligation quote for the full construction set.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate({ view: "contact" })}
                className="group inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4"
              >
                Request this plan
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => navigate({ view: "browse" })}
                className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-foreground/5 transition-colors"
              >
                Keep browsing
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Lightbox for gallery */}
      <Lightbox
        items={gallery}
        index={galleryIndex}
        onClose={() => setGalleryIndex(null)}
        onIndexChange={setGalleryIndex}
      />

      {/* Fullscreen floor plan */}
      <AnimatePresence>
        {isFullscreenPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-8"
            onClick={() => setIsFullscreenPlan(false)}
          >
            <button
              onClick={() => setIsFullscreenPlan(false)}
              className="absolute top-5 right-5 text-[11px] tracking-luxe uppercase text-white/70 hover:text-white"
            >
              Close
            </button>
            <div
              className="w-full h-full max-w-6xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              dangerouslySetInnerHTML={{
                __html: house.floorPlans[floorIndex].svg,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("max-w-2xl", className)}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] tracking-luxe uppercase text-gold">{index}</span>
        <div className="h-px w-10 bg-gold/40" />
        <span className="text-[11px] tracking-luxe uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="font-serif-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.05] tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-white/90">
      {icon}
      <span>{value}</span>
    </div>
  );
}

function ActionBtn({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-white/30 text-white text-[11px] tracking-wide-luxe uppercase hover:bg-white/15 transition-colors"
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

function PlanBtn({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="size-9 rounded-full border border-border flex items-center justify-center hover:border-foreground/50 hover:bg-foreground/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {icon}
    </button>
  );
}

function StickyBar({
  house,
  saved,
  onToggleSave,
  onContact,
}: {
  house: ReturnType<typeof getHouseBySlug>;
  saved: boolean;
  onToggleSave: () => void;
  onContact: () => void;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!house) return null;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 glass border-t border-border/70"
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                {house.tagline}
              </p>
              <p className="font-serif-display text-lg lg:text-xl truncate">{house.name}</p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{formatPrice(house.price)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleSave}
                className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
                aria-label="Save"
              >
                <Heart className={cn("size-4", saved && "fill-gold text-gold")} strokeWidth={1.5} />
              </button>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-colors"
              >
                <FileText className="size-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Request Plan</span>
                <span className="sm:hidden">Request</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

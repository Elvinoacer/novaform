"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  BedDouble,
  Bath,
  Building2,
  Maximize2,
  ChevronDown,
  Star,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { CATEGORIES, HOUSES } from "@/lib/data";
import { HouseCard } from "@/components/site/HouseCard";
import { useSearchParams } from "next/navigation";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES = Array.from(new Set(HOUSES.map((h) => h.style)));
const PRICE_BUCKETS = [
  { label: "Any", min: 0, max: Infinity },
  { label: "< $100k", min: 0, max: 100000 },
  { label: "$100k – $200k", min: 100000, max: 200000 },
  { label: "$200k – $400k", min: 200000, max: 400000 },
  { label: "$400k+", min: 400000, max: Infinity },
];

const PAGE_SIZE = 6;

export function BrowseView() {
  const params = useSearchParams();
  // Derive URL-driven values directly — single source of truth.
  // page.tsx uses `${view}-${category}` as the AnimatePresence key, so
  // navigating to a different category from the nav remounts BrowseView,
  // making `initial*` re-read from the URL on mount.
  const initialCategory = (params.get("category") as CategorySlug | null) ?? "all";
  const initialQuery = params.get("q") ?? "";

  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [stories, setStories] = useState(0);
  const [style, setStyle] = useState<string>("all");
  const [areaMax, setAreaMax] = useState(600);
  const [priceBucket, setPriceBucket] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = PRICE_BUCKETS[priceBucket];
    return HOUSES.filter((h) => {
      if (category !== "all" && h.category !== category) return false;
      if (style !== "all" && h.style !== style) return false;
      if (bedrooms > 0 && h.bedrooms < bedrooms) return false;
      if (bathrooms > 0 && h.bathrooms < bathrooms) return false;
      if (stories > 0 && h.stories !== stories) return false;
      if (h.area > areaMax) return false;
      if (h.price < bucket.min || h.price > bucket.max) return false;
      if (q) {
        const hay = `${h.name} ${h.tagline} ${h.style} ${h.category} ${h.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, style, bedrooms, bathrooms, stories, areaMax, priceBucket, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, filtered.length]);

  const activeFilterCount =
    (bedrooms > 0 ? 1 : 0) +
    (bathrooms > 0 ? 1 : 0) +
    (stories > 0 ? 1 : 0) +
    (style !== "all" ? 1 : 0) +
    (areaMax < 600 ? 1 : 0) +
    (priceBucket !== 0 ? 1 : 0);

  const reset = () => {
    setBedrooms(0);
    setBathrooms(0);
    setStories(0);
    setStyle("all");
    setAreaMax(600);
    setPriceBucket(0);
  };

  return (
    <div className="bg-background pt-28 lg:pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-14"
        >
          <p className="text-[11px] tracking-luxe uppercase text-gold mb-3">
            The Catalog
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-serif-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight max-w-2xl">
              {category === "all"
                ? "All Designs"
                : CATEGORIES.find((c) => c.slug === category)?.name}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>
                <span className="text-foreground font-medium">{filtered.length}</span> of {HOUSES.length} designs
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sticky top-[68px] z-30 -mx-6 px-6 lg:mx-0 lg:px-0 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by name, style, or keyword…"
              className="w-full glass border border-border/70 rounded-full pl-11 pr-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-foreground/5"
              >
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={cn(
              "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-[12px] tracking-wide-luxe uppercase transition-colors border",
              showFilters || activeFilterCount > 0
                ? "bg-charcoal text-white border-charcoal"
                : "glass border-border/70 hover:border-foreground/40"
            )}
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 size-5 rounded-full bg-gold text-charcoal text-[10px] flex items-center justify-center font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <CategoryChip
            label="All"
            active={category === "all"}
            onClick={() => {
              setCategory("all");
              setVisibleCount(PAGE_SIZE);
            }}
          />
          {CATEGORIES.map((c) => (
            <CategoryChip
              key={c.slug}
              label={c.name}
              active={category === c.slug}
              onClick={() => {
                setCategory(c.slug);
                setVisibleCount(PAGE_SIZE);
              }}
            />
          ))}
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="glass border border-border/70 rounded-2xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 mb-10">
                {/* Bedrooms */}
                <FilterGroup icon={<BedDouble className="size-4" strokeWidth={1.5} />} label="Bedrooms">
                  <OptionRow
                    options={[0, 1, 2, 3, 4, 5]}
                    value={bedrooms}
                    onChange={(v) => setBedrooms(v)}
                    renderLabel={(v) => (v === 0 ? "Any" : `${v}+`)}
                  />
                </FilterGroup>

                {/* Bathrooms */}
                <FilterGroup icon={<Bath className="size-4" strokeWidth={1.5} />} label="Bathrooms">
                  <OptionRow
                    options={[0, 1, 2, 3, 4]}
                    value={bathrooms}
                    onChange={(v) => setBathrooms(v)}
                    renderLabel={(v) => (v === 0 ? "Any" : `${v}+`)}
                  />
                </FilterGroup>

                {/* Stories */}
                <FilterGroup icon={<Building2 className="size-4" strokeWidth={1.5} />} label="Stories">
                  <OptionRow
                    options={[0, 1, 2, 3]}
                    value={stories}
                    onChange={(v) => setStories(v)}
                    renderLabel={(v) => (v === 0 ? "Any" : `${v}`)}
                  />
                </FilterGroup>

                {/* Style */}
                <FilterGroup icon={<Star className="size-4" strokeWidth={1.5} />} label="Style">
                  <SelectRow
                    options={["all", ...STYLES]}
                    value={style}
                    onChange={setStyle}
                    renderLabel={(v) => (v === "all" ? "All styles" : v)}
                  />
                </FilterGroup>

                {/* Area */}
                <FilterGroup icon={<Maximize2 className="size-4" strokeWidth={1.5} />} label={`Max Area — ${areaMax} sqm`}>
                  <input
                    type="range"
                    min={60}
                    max={600}
                    step={20}
                    value={areaMax}
                    onChange={(e) => setAreaMax(Number(e.target.value))}
                    className="luxe-range w-full mt-3"
                  />
                  <div className="flex justify-between mt-2 text-[10px] tracking-luxe uppercase text-muted-foreground">
                    <span>60</span>
                    <span>600 sqm</span>
                  </div>
                </FilterGroup>

                {/* Price */}
                <FilterGroup icon={<ChevronDown className="size-4" strokeWidth={1.5} />} label="Price Range">
                  <div className="flex flex-wrap gap-1.5">
                    {PRICE_BUCKETS.map((b, i) => (
                      <button
                        key={b.label}
                        onClick={() => setPriceBucket(i)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-[11px] tracking-wide-luxe uppercase border transition-colors",
                          priceBucket === i
                            ? "bg-charcoal text-white border-charcoal"
                            : "border-border hover:border-foreground/40"
                        )}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <div className="md:col-span-2 lg:col-span-3 flex justify-end pt-2 border-t border-border/60">
                  <button
                    onClick={reset}
                    className="text-[12px] tracking-wide-luxe uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif-display text-3xl mb-3">No designs match.</p>
            <p className="text-muted-foreground mb-6">
              Try removing a filter or search term.
            </p>
            <button
              onClick={() => {
                reset();
                setCategory("all");
                setQuery("");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-foreground/40 text-sm transition-colors"
            >
              Clear everything
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {visible.map((h, i) => (
              <HouseCard key={h.id} house={h} index={i} />
            ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 text-[11px] tracking-luxe uppercase text-muted-foreground">
              <span className="size-1.5 rounded-full bg-gold animate-pulse" />
              Loading more designs…
            </div>
          </div>
        )}
        {!hasMore && filtered.length > PAGE_SIZE && (
          <p className="mt-16 text-center text-[11px] tracking-luxe uppercase text-muted-foreground">
            End of catalog
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-[12px] tracking-wide-luxe uppercase border transition-colors",
        active
          ? "bg-charcoal text-white border-charcoal"
          : "border-border hover:border-foreground/40 text-foreground/80"
      )}
    >
      {label}
    </button>
  );
}

function FilterGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 text-foreground">
        {icon}
        <span className="text-[11px] tracking-wide-luxe uppercase">{label}</span>
      </div>
      {children}
    </div>
  );
}

function OptionRow<T extends number>({
  options,
  value,
  onChange,
  renderLabel,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "min-w-10 px-3 py-1.5 rounded-full text-[11px] tracking-wide-luxe uppercase border transition-colors",
            value === o
              ? "bg-charcoal text-white border-charcoal"
              : "border-border hover:border-foreground/40"
          )}
        >
          {renderLabel(o)}
        </button>
      ))}
    </div>
  );
}

function SelectRow({
  options,
  value,
  onChange,
  renderLabel,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  renderLabel: (v: string) => string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-background border border-border rounded-md px-4 py-2.5 text-sm outline-none focus:border-foreground/50 transition-colors cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {renderLabel(o)}
          </option>
        ))}
      </select>
      <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
    </div>
  );
}

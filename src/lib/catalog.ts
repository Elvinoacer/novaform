import { db } from "@/lib/db";
import { HOUSES, CATEGORIES } from "@/lib/data";
import type { House, GalleryItem, Specification, FloorPlan } from "@/lib/types";

/**
 * Bridges DB rows -> the rich House shape the views expect.
 * All JSON-encoded fields (story, highlights, videoTour, specifications,
 * floorPlans, exterior, interiors) are decoded here.
 */
export function designRowToHouse(row: any): House {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    category: row.category,
    style: row.style,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    stories: row.stories,
    garage: row.garage,
    area: row.area,
    price: row.price,
    rating: row.rating,
    reviews: row.reviews,
    featured: row.featured,
    hero: row.hero,
    thumbnail: row.thumbnail,
    description: row.description,
    story: safeParse(row.story, []),
    highlights: safeParse(row.highlights, []),
    videoTour: safeParse(row.videoTour, {}),
    specifications: safeParse(row.specifications, []),
    floorPlans: safeParse(row.floorPlans, []),
    exterior: safeParse(row.exterior, []),
    interiors: safeParse(row.interiors, {}),
    gallery: (row.images ?? [])
      .slice()
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
      .map((img: any): GalleryItem => ({
        id: img.id,
        type: (img.type as GalleryItem["type"]) ?? "image",
        src: img.url,
        caption: img.caption ?? undefined,
        span: (img.span as GalleryItem["span"]) ?? undefined,
      })),
  } as House;
}

function safeParse<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * Returns all published designs, ordered featured-first then by name.
 * Falls back to the static HOUSES catalog when the DB is empty
 * (e.g. before the seed script runs, or in a fresh preview deploy).
 */
export async function getAllDesigns(): Promise<House[]> {
  try {
    const rows = await db.design.findMany({
      where: { published: true },
      include: { images: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    });
    if (rows.length === 0) return HOUSES;
    return rows.map(designRowToHouse);
  } catch (err) {
    console.warn("[catalog] getAllDesigns failed, using static fallback:", err);
    return HOUSES;
  }
}

export async function getFeaturedDesigns(): Promise<House[]> {
  try {
    const rows = await db.design.findMany({
      where: { published: true, featured: true },
      include: { images: true },
      orderBy: [{ name: "asc" }],
    });
    if (rows.length === 0) {
      // Fall back to first 6 static houses
      return HOUSES.filter((h) => h.featured).slice(0, 6);
    }
    return rows.map(designRowToHouse);
  } catch (err) {
    console.warn("[catalog] getFeaturedDesigns failed:", err);
    return HOUSES.filter((h) => h.featured).slice(0, 6);
  }
}

export async function getDesignBySlug(slug: string): Promise<House | null> {
  try {
    const row = await db.design.findUnique({
      where: { slug },
      include: { images: true },
    });
    if (!row) {
      const fallback = HOUSES.find((h) => h.slug === slug);
      return fallback ?? null;
    }
    return designRowToHouse(row);
  } catch (err) {
    console.warn("[catalog] getDesignBySlug failed:", err);
    return HOUSES.find((h) => h.slug === slug) ?? null;
  }
}

export async function getMarqueeItems(): Promise<
  { id: string; text: string; href?: string | null; icon?: string | null }[]
> {
  try {
    const rows = await db.marqueeItem.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }],
    });
    if (rows.length === 0) {
      return [
        { id: "s1", text: "Construction-ready plans", icon: "CheckCircle2" },
        { id: "s2", text: "Architect-led designs", icon: "Compass" },
        { id: "s3", text: "Site-adaptable", icon: "Ruler" },
        { id: "s4", text: "Foundation to finish", icon: "Building2" },
        { id: "s5", text: "100+ premium designs", icon: "Sparkles" },
        { id: "s6", text: "Modern · Luxury · Villa", icon: "Gem" },
      ];
    }
    return rows.map((r) => ({
      id: r.id,
      text: r.text,
      href: r.href,
      icon: r.icon,
    }));
  } catch (err) {
    console.warn("[catalog] getMarqueeItems failed:", err);
    return [];
  }
}

export { CATEGORIES };

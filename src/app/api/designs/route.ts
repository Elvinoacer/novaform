import { NextResponse } from "next/server";
import { getAllDesigns, getFeaturedDesigns, getDesignBySlug } from "@/lib/catalog";

export const runtime = "nodejs";

/**
 * GET /api/designs              — list all published designs
 * GET /api/designs?featured=1   — list featured only
 * GET /api/designs?slug=<slug>  — single design by slug
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const featured = url.searchParams.get("featured") === "1";
  const slug = url.searchParams.get("slug");

  if (slug) {
    const design = await getDesignBySlug(slug);
    if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ design });
  }

  const designs = featured ? await getFeaturedDesigns() : await getAllDesigns();
  return NextResponse.json({ designs });
}

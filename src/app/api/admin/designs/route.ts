import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/admin/designs            — list ALL designs (incl. unpublished)
 * POST /api/admin/designs           — create new design
 */
export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.design.findMany({
    include: { images: true },
    orderBy: [{ createdAt: "desc" }],
  });
  return NextResponse.json({ designs: rows });
}

export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const required = ["slug", "name", "tagline", "category", "style", "description", "hero", "thumbnail"];
  for (const k of required) {
    if (!body[k]) return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
  }

  // Convert gallery images array → DesignImage create rows
  const images = Array.isArray(body.images) ? body.images : [];
  const design = await db.design.create({
    data: {
      slug: body.slug,
      name: body.name,
      tagline: body.tagline,
      category: body.category,
      style: body.style,
      bedrooms: Number(body.bedrooms ?? 3),
      bathrooms: Number(body.bathrooms ?? 2),
      stories: Number(body.stories ?? 1),
      garage: Number(body.garage ?? 1),
      area: Number(body.area ?? 200),
      price: Number(body.price ?? 0),
      rating: Number(body.rating ?? 0),
      reviews: Number(body.reviews ?? 0),
      featured: Boolean(body.featured ?? false),
      published: Boolean(body.published ?? true),
      hero: body.hero,
      thumbnail: body.thumbnail,
      description: body.description,
      story: JSON.stringify(body.story ?? []),
      highlights: JSON.stringify(body.highlights ?? []),
      videoTour: JSON.stringify(body.videoTour ?? {}),
      specifications: JSON.stringify(body.specifications ?? []),
      floorPlans: JSON.stringify(body.floorPlans ?? []),
      exterior: JSON.stringify(body.exterior ?? []),
      interiors: JSON.stringify(body.interiors ?? {}),
      images: {
        create: images.map((img: any, i: number) => ({
          url: img.url,
          caption: img.caption ?? null,
          type: img.type ?? "image",
          span: img.span ?? null,
          sortOrder: img.sortOrder ?? i,
        })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json({ design });
}

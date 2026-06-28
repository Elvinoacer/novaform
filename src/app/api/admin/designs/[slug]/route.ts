import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/** GET /api/admin/designs/[slug] — single design */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const design = await db.design.findUnique({
    where: { slug },
    include: { images: true },
  });
  if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ design });
}

/** PATCH /api/admin/designs/[slug] — update design */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const body = await req.json();

  // Rebuild images if provided
  let imagesOp = undefined;
  if (Array.isArray(body.images)) {
    await db.designImage.deleteMany({ where: { designId: undefined } }).catch(() => {});
    imagesOp = {
      deleteMany: {},
      create: body.images.map((img: any, i: number) => ({
        url: img.url,
        caption: img.caption ?? null,
        type: img.type ?? "image",
        span: img.span ?? null,
        sortOrder: img.sortOrder ?? i,
      })),
    };
  }

  const updated = await db.design.update({
    where: { slug },
    data: {
      ...(body.slug && { slug: body.slug }),
      ...(body.name && { name: body.name }),
      ...(body.tagline && { tagline: body.tagline }),
      ...(body.category && { category: body.category }),
      ...(body.style && { style: body.style }),
      ...(body.bedrooms != null && { bedrooms: Number(body.bedrooms) }),
      ...(body.bathrooms != null && { bathrooms: Number(body.bathrooms) }),
      ...(body.stories != null && { stories: Number(body.stories) }),
      ...(body.garage != null && { garage: Number(body.garage) }),
      ...(body.area != null && { area: Number(body.area) }),
      ...(body.price != null && { price: Number(body.price) }),
      ...(body.rating != null && { rating: Number(body.rating) }),
      ...(body.reviews != null && { reviews: Number(body.reviews) }),
      ...(body.featured != null && { featured: Boolean(body.featured) }),
      ...(body.published != null && { published: Boolean(body.published) }),
      ...(body.hero && { hero: body.hero }),
      ...(body.thumbnail && { thumbnail: body.thumbnail }),
      ...(body.description && { description: body.description }),
      ...(body.story && { story: JSON.stringify(body.story) }),
      ...(body.highlights && { highlights: JSON.stringify(body.highlights) }),
      ...(body.videoTour && { videoTour: JSON.stringify(body.videoTour) }),
      ...(body.specifications && {
        specifications: JSON.stringify(body.specifications),
      }),
      ...(body.floorPlans && { floorPlans: JSON.stringify(body.floorPlans) }),
      ...(body.exterior && { exterior: JSON.stringify(body.exterior) }),
      ...(body.interiors && { interiors: JSON.stringify(body.interiors) }),
      ...(imagesOp && { images: imagesOp }),
    },
    include: { images: true },
  });
  return NextResponse.json({ design: updated });
}

/** DELETE /api/admin/designs/[slug] */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  await db.design.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/** GET /api/admin/marquee — list all marquee items */
export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await db.marqueeItem.findMany({
    orderBy: [{ sortOrder: "asc" }],
  });
  return NextResponse.json({ items });
}

/** POST /api/admin/marquee — create new marquee item */
export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }
  const item = await db.marqueeItem.create({
    data: {
      text: String(body.text),
      href: body.href ?? null,
      icon: body.icon ?? null,
      sortOrder: Number(body.sortOrder ?? 0),
      active: body.active !== false,
    },
  });
  return NextResponse.json({ item });
}

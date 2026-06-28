import { NextResponse } from "next/server";
import { getMarqueeItems } from "@/lib/catalog";

export const runtime = "nodejs";

/** GET /api/marquee — public marquee items */
export async function GET() {
  const items = await getMarqueeItems();
  return NextResponse.json({ items });
}

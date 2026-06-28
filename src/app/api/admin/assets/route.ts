import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/** GET /api/admin/assets — list all R2 assets tracked in SiteAsset */
export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const assets = await db.siteAsset.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  return NextResponse.json({ assets });
}

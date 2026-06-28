import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/** GET /api/admin/messages — list all contact messages (newest first) */
export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await db.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  return NextResponse.json({ messages });
}

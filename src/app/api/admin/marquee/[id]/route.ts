import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const updated = await db.marqueeItem.update({
    where: { id },
    data: {
      ...(body.text != null && { text: String(body.text) }),
      ...(body.href != null && { href: body.href }),
      ...(body.icon != null && { icon: body.icon }),
      ...(body.sortOrder != null && { sortOrder: Number(body.sortOrder) }),
      ...(body.active != null && { active: Boolean(body.active) }),
    },
  });
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.marqueeItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

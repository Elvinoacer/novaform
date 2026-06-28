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
  const updated = await db.contactMessage.update({
    where: { id },
    data: {
      ...(body.read != null && { read: Boolean(body.read) }),
      ...(body.replied != null && { replied: Boolean(body.replied) }),
    },
  });
  return NextResponse.json({ message: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

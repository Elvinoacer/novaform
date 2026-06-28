import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guards";
import { uploadToR2, r2Configured } from "@/lib/r2";

export const runtime = "nodejs";

/**
 * POST /api/admin/upload
 * multipart/form-data with field "file" (single) or "files" (multiple)
 * Optional: "category" = "design" | "marquee" | "hero" | "misc"
 *
 * Returns: { assets: UploadedAsset[] }
 *
 * Auth: admin only.
 */
export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!r2Configured) {
    return NextResponse.json(
      {
        error:
          "Cloudflare R2 is not configured. Add R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_BASE_URL to .env to enable uploads.",
      },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const category = (formData.get("category") as string) || "design";
  const files: File[] = [];
  const single = formData.get("file");
  const many = formData.getAll("files");
  if (single && typeof single !== "string") files.push(single as File);
  for (const f of many) {
    if (typeof f !== "string") files.push(f as File);
  }

  if (files.length === 0) {
    return NextResponse.json(
      { error: "No files provided. Send 'file' or 'files' field(s)." },
      { status: 400 }
    );
  }

  const MAX_MB = 25;
  const assets = [];
  for (const file of files) {
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File ${file.name} exceeds ${MAX_MB}MB limit.` },
        { status: 413 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await uploadToR2({
      buffer,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      category,
    });
    assets.push(asset);
  }

  return NextResponse.json({ assets });
}

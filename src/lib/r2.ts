import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 client (S3-compatible).
 *
 * Required env:
 *   R2_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *   R2_PUBLIC_BASE_URL  (e.g. https://<bucket>.r2.dev — R2 public development URL,
 *                        or your custom domain mapped to the bucket)
 *
 * If env vars are missing (sandbox / local dev), the client is created but
 * uploads will throw a clear error — public pages still work, just without
 * new uploads.
 */

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME ?? "maison-media";
const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL ?? "";

export const r2Configured = Boolean(
  accountId && accessKeyId && secretAccessKey && accessKeyId !== "replace_me"
);

export const r2 = new S3Client({
  region: "auto",
  endpoint: accountId
    ? `https://${accountId}.r2.cloudflarestorage.com`
    : undefined,
  credentials: r2Configured
    ? { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! }
    : undefined,
  forcePathStyle: false,
});

export interface UploadedAsset {
  key: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

/**
 * Upload a single file to R2 and return the public URL + metadata.
 * Also records a row in SiteAsset for tracking.
 */
export async function uploadToR2(opts: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  category?: string; // "design" | "marquee" | "hero" | "misc"
}): Promise<UploadedAsset> {
  if (!r2Configured) {
    throw new Error(
      "R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env"
    );
  }

  const { buffer, filename, mimeType, category = "design" } = opts;

  // Generate a stable, unique key: <category>/<yyyy-mm>/<uuid>__<filename>
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const unique = crypto.randomUUID().split("-")[0];
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${category}/${yyyy}-${mm}/${unique}-${safeName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  const url = `${publicBaseUrl.replace(/\/$/, "")}/${key}`;

  // Persist a SiteAsset row so the admin can browse everything later.
  // Lazy import to avoid pulling Prisma into cold paths.
  const { db } = await import("@/lib/db");
  await db.siteAsset.create({
    data: { key, url, filename, mimeType, size: buffer.length, category },
  });

  return { key, url, filename, mimeType, size: buffer.length };
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * POST /api/contact
 * Body: { name, email, phone?, subject, message, designSlug? }
 *
 * - Persists a ContactMessage row
 * - Sends a notification email to CONTACT_INBOX_EMAIL via Resend
 * - Sends an auto-reply to the enquirer
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const required = ["name", "email", "subject", "message"];
  for (const k of required) {
    if (!body[k] || typeof body[k] !== "string") {
      return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const msg = await db.contactMessage.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      subject: body.subject,
      message: body.message,
      designSlug: body.designSlug ?? null,
    },
  });

  const inbox = process.env.CONTACT_INBOX_EMAIL ?? "hello@maison.studio";

  // 1. Notification to inbox (best-effort — failures logged but not blocking)
  await sendMail({
    to: inbox,
    subject: `[Contact] ${body.subject}`,
    replyTo: body.email,
    html: `
      <div style="font-family: ui-sans-serif, system-ui; color: #181818; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="font-family: Georgia, serif; margin: 0 0 16px;">New enquiry — Novaform</h2>
        <p style="margin: 0 0 12px;"><strong>From:</strong> ${escapeHtml(body.name)} &lt;${escapeHtml(body.email)}&gt;</p>
        ${body.phone ? `<p style="margin: 0 0 12px;"><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>` : ""}
        ${body.designSlug ? `<p style="margin: 0 0 12px;"><strong>Design:</strong> ${escapeHtml(body.designSlug)}</p>` : ""}
        <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(body.message)}</p>
      </div>
    `,
  }).catch((e) => console.error("[contact] inbox mail failed:", e));

  // 2. Auto-reply to enquirer (best-effort)
  await sendMail({
    to: body.email,
    subject: "We received your message · Novaform",
    html: `
      <div style="font-family: ui-sans-serif, system-ui; color: #181818; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="font-family: Georgia, serif; margin: 0 0 16px;">Thank you, ${escapeHtml(body.name.split(" ")[0])}.</h2>
        <p style="line-height: 1.6; margin: 0 0 12px;">
          We have received your message and one of our architects will get back to you
          within one business day. For urgent matters, reply to this email or reach us
          on WhatsApp at +254 794 636 982.
        </p>
        <p style="line-height: 1.6; margin: 0 0 12px; color: #666; font-size: 14px;">
          Your message:<br />
          <em>${escapeHtml(body.message.slice(0, 240))}${body.message.length > 240 ? "…" : ""}</em>
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
        <p style="font-size: 12px; color: #888;">Novaform · Architectural House Plans</p>
      </div>
    `,
  }).catch((e) => console.error("[contact] auto-reply failed:", e));

  return NextResponse.json({ ok: true, id: msg.id });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

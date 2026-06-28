import { Resend } from "resend";

/**
 * Resend email client. Initialise lazily so the app still boots even when
 * RESEND_API_KEY is missing (sandbox / preview). Calling sendMail() without
 * a configured key throws a clear error.
 */

let _client: Resend | null = null;
let _warned = false;

function client(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_dummy") || apiKey === "replace_me") {
    if (!_warned) {
      console.warn(
        "[email] RESEND_API_KEY is not configured — emails will be no-ops."
      );
      _warned = true;
    }
    return null;
  }
  if (!_client) _client = new Resend(apiKey);
  return _client;
}

export interface SendMailArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail(args: SendMailArgs) {
  const c = client();
  if (!c) {
    console.log(
      `[email:noop] To: ${args.to} | Subject: ${args.subject}`
    );
    return { id: "noop", noop: true };
  }
  const from = process.env.FROM_EMAIL ?? "Maison Studio <onboarding@resend.dev>";
  const { data, error } = await c.emails.send({
    from,
    to: args.to,
    subject: args.subject,
    html: args.html,
    reply_to: args.replyTo,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
  return data;
}

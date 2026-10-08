import "server-only";

interface SendEmailInput {
  readonly to: string;
  readonly replyTo: string;
  readonly subject: string;
  readonly text: string;
}

/**
 * Posts straight to Resend's REST API rather than pulling in their SDK: one
 * `fetch` does the whole job, and a portfolio does not need another dependency
 * to send one kind of email.
 *
 * `import "server-only"` makes it a build error if this module ever gets
 * imported into a client component — which is what stops the API key from being
 * bundled into the browser by accident.
 */
export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
}: SendEmailInput): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set" };
  }

  // Resend's shared sender works without a verified domain, which is enough to
  // test with. Set CONTACT_FROM_EMAIL once a domain is verified.
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: `Resend responded ${response.status}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "unknown" };
  }
}

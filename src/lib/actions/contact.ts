"use server";

import { headers } from "next/headers";

import { profile } from "@/data";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact";
import { sendEmail } from "@/lib/email";
import { clientKeyFrom, createRateLimiter } from "@/lib/rate-limit";

/**
 * Five messages an hour from one address. Far above any genuine use of a
 * contact form, far below the volume that makes an inbox unusable.
 */
const limiter = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1000 });

/**
 * Good enough to catch typos, which is all client-side email validation should
 * ever claim to do. The only real test of an address is whether mail arrives.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Handles the contact form.
 *
 * Next verifies the request `Origin` against the `Host` before this ever runs,
 * and caps the body at 1MB, so the usual CSRF and payload concerns are covered
 * by the framework. What is left to us is validation, the honeypot, and a rate
 * limit on the one step that costs something: sending.
 */
export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  // Honeypot: a hidden field only an automated submitter fills in. Report
  // success rather than an error — telling a bot it was detected just teaches
  // whoever wrote it to try something else.
  if (read(formData, HONEYPOT_FIELD) !== "") {
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (values.name.length < CONTACT_LIMITS.name.min) {
    fieldErrors.name = "Please tell me your name.";
  } else if (values.name.length > CONTACT_LIMITS.name.max) {
    fieldErrors.name = `Keep this under ${CONTACT_LIMITS.name.max} characters.`;
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "That does not look like an email address.";
  } else if (values.email.length > CONTACT_LIMITS.email.max) {
    fieldErrors.email = "That address is too long.";
  }

  if (values.message.length < CONTACT_LIMITS.message.min) {
    fieldErrors.message = `A little more detail, please — at least ${CONTACT_LIMITS.message.min} characters.`;
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    fieldErrors.message = `Keep this under ${CONTACT_LIMITS.message.max} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  // Checked here, after validation, rather than on entry: a visitor who
  // mistypes their address three times has cost nothing and should not be
  // locked out. What the limit protects is the send itself.
  const decision = limiter(clientKeyFrom(await headers()));

  if (!decision.allowed) {
    const minutes = Math.ceil(decision.retryAfterSeconds / 60);
    return {
      status: "error",
      message: `That is a lot of messages at once. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}, or email me directly at ${profile.contact.email}.`,
      values,
    };
  }

  const result = await sendEmail({
    to: process.env.CONTACT_TO_EMAIL ?? profile.contact.email,
    replyTo: values.email,
    subject: `Portfolio enquiry from ${values.name}`,
    text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  });

  if (!result.ok) {
    // The visitor gets a way forward; the reason stays in the server logs.
    console.error("[contact] send failed:", result.reason);
    return {
      status: "error",
      message: `Something went wrong on my end. Please email me directly at ${profile.contact.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. I usually reply within a day.",
  };
}

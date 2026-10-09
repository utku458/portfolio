"use server";

import { headers } from "next/headers";

import { profileFacts } from "@/data";
import { dictionaryFor, isLocale, defaultLocale } from "@/i18n";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  LOCALE_FIELD,
  fill,
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
  // The locale comes from a hidden field; anything unrecognised falls back
  // rather than throwing, because a tampered value should not cost a message.
  const submitted = read(formData, LOCALE_FIELD);
  const locale = isLocale(submitted) ? submitted : defaultLocale;
  const t = dictionaryFor(locale).contact.form;

  const values = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  // Honeypot: a hidden field only an automated submitter fills in. Report
  // success rather than an error — telling a bot it was detected just teaches
  // whoever wrote it to try something else.
  if (read(formData, HONEYPOT_FIELD) !== "") {
    return { status: "success", message: t.success };
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (values.name.length < CONTACT_LIMITS.name.min) {
    fieldErrors.name = t.nameRequired;
  } else if (values.name.length > CONTACT_LIMITS.name.max) {
    fieldErrors.name = fill(t.nameTooLong, { max: CONTACT_LIMITS.name.max });
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = t.emailInvalid;
  } else if (values.email.length > CONTACT_LIMITS.email.max) {
    fieldErrors.email = t.emailTooLong;
  }

  if (values.message.length < CONTACT_LIMITS.message.min) {
    fieldErrors.message = fill(t.messageTooShort, { min: CONTACT_LIMITS.message.min });
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    fieldErrors.message = fill(t.messageTooLong, { max: CONTACT_LIMITS.message.max });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: t.checkFields,
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
      message: fill(t.rateLimited, { minutes, email: profileFacts.contact.email }),
      values,
    };
  }

  const result = await sendEmail({
    to: process.env.CONTACT_TO_EMAIL ?? profileFacts.contact.email,
    replyTo: values.email,
    subject: `Portfolio enquiry from ${values.name}`,
    text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  });

  if (!result.ok) {
    // The visitor gets a way forward; the reason stays in the server logs.
    console.error("[contact] send failed:", result.reason);
    return {
      status: "error",
      message: fill(t.failed, { email: profileFacts.contact.email }),
      values,
    };
  }

  return {
    status: "success",
    message: t.success,
  };
}

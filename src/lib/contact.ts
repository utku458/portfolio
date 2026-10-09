/**
 * Shared between the form and the Server Action.
 *
 * The limits live here so the `maxLength` a visitor's browser enforces and the
 * length the server rejects can never disagree — client-side validation is a
 * convenience, server-side validation is the actual rule.
 */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  message: { min: 20, max: 2000 },
} as const;

export type ContactField = "name" | "email" | "message";

export interface ContactFormState {
  readonly status: "idle" | "success" | "error";
  /** Shown in the form's live region. */
  readonly message?: string;
  readonly fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back so a failed submit never wipes what was typed. */
  readonly values?: Partial<Record<ContactField, string>>;
}

export const INITIAL_CONTACT_STATE: ContactFormState = { status: "idle" };

/** The field a bot fills in and a human never sees. */
export const HONEYPOT_FIELD = "company";

/**
 * The locale travels with the submission.
 *
 * A Server Action runs outside the route tree, so it cannot read the `lang`
 * segment the way a Server Component can. Carrying it in the payload is what
 * lets an error come back in the language the visitor was reading.
 */
export const LOCALE_FIELD = "locale";

/** `"Keep this under {max} characters."` → the number filled in. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

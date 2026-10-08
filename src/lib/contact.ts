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

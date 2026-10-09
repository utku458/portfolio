"use client";

import { Send } from "lucide-react";
import { useActionState, useId } from "react";

import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/lib/actions/contact";
import type { Dictionary, Locale } from "@/i18n";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  INITIAL_CONTACT_STATE,
  LOCALE_FIELD,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  readonly locale: Locale;
  readonly labels: Dictionary["contact"]["form"];
}

export function ContactForm({ locale, labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL_CONTACT_STATE,
  );

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const honeypotId = useId();

  const errors = state.fieldErrors;

  return (
    <div>
      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mb-6 rounded-md border px-4 py-3 text-sm",
            state.status === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "border-destructive/30 bg-destructive/10 text-destructive",
          )}
        >
          {state.message}
        </p>
      )}

      {/*
        Remounting on success is what clears the fields: the inputs are
        uncontrolled, so a changed `defaultValue` alone would not reset them.
        The status message lives outside the form, so it survives the remount.
      */}
      <form
        key={state.status === "success" ? "sent" : "editing"}
        action={formAction}
        className="space-y-5"
      >
        {/* Travels with the submission so the Server Action can answer in the
            language the visitor is reading. */}
        <input type="hidden" name={LOCALE_FIELD} value={locale} />
        <div>
          <Label htmlFor={nameId}>{labels.name}</Label>
          <Input
            id={nameId}
            name="name"
            required
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name.max}
            defaultValue={state.values?.name ?? ""}
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? `${nameId}-error` : undefined}
            className="mt-2"
          />
          <FieldError id={`${nameId}-error`}>{errors?.name}</FieldError>
        </div>

        <div>
          <Label htmlFor={emailId}>{labels.email}</Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email.max}
            defaultValue={state.values?.email ?? ""}
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? `${emailId}-error` : undefined}
            className="mt-2"
          />
          <FieldError id={`${emailId}-error`}>{errors?.email}</FieldError>
        </div>

        <div>
          <Label htmlFor={messageId}>{labels.message}</Label>
          <Textarea
            id={messageId}
            name="message"
            required
            rows={5}
            minLength={CONTACT_LIMITS.message.min}
            maxLength={CONTACT_LIMITS.message.max}
            placeholder={labels.messagePlaceholder}
            defaultValue={state.values?.message ?? ""}
            aria-invalid={Boolean(errors?.message)}
            aria-describedby={errors?.message ? `${messageId}-error` : undefined}
            className="mt-2"
          />
          <FieldError id={`${messageId}-error`}>{errors?.message}</FieldError>
        </div>

        {/* Honeypot — off-screen, skipped by Tab, ignored by autofill. */}
        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={honeypotId}>Company</label>
          <input
            id={honeypotId}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          <Send aria-hidden />
          {pending ? labels.sending : labels.send}
        </Button>
      </form>
    </div>
  );
}

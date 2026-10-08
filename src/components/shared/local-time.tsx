"use client";

import { profile } from "@/data";
import { useLocalTime } from "@/hooks";

/**
 * Local time where Utku is. A small signal for remote roles: it answers
 * "when can I reach this person" before anyone has to ask.
 */
export function LocalTime() {
  const time = useLocalTime(profile.contact.timezone);

  // Empty until hydrated — rendering a server-side clock guarantees a mismatch.
  if (!time) return null;

  return (
    <span className="font-mono tabular-nums">
      {time} <span className="text-muted-foreground">local</span>
    </span>
  );
}

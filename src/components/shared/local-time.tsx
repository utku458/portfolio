"use client";

import { useLocalTime } from "@/hooks";

interface LocalTimeProps {
  /** IANA zone, passed in so this stays a leaf with no data dependency. */
  readonly timeZone: string;
  /** "local time" in the reader's language. */
  readonly label: string;
}

/**
 * Local time where Utku is. A small signal for remote roles: it answers
 * "when can I reach this person" before anyone has to ask.
 */
export function LocalTime({ timeZone, label }: LocalTimeProps) {
  const time = useLocalTime(timeZone);

  // Empty until hydrated — rendering a server-side clock guarantees a mismatch.
  if (!time) return null;

  return (
    <span className="font-mono tabular-nums">
      {time} <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

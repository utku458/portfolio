"use client";

import { useCallback, useSyncExternalStore } from "react";

/** One formatter per zone — `Intl` construction is not free. */
const formatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

/**
 * Current wall-clock time in a given IANA zone, as `HH:mm`.
 *
 * Returns "" on the server so nothing is rendered until hydration — a clock is
 * the textbook hydration mismatch. The snapshot is a string, so React re-renders
 * only when the displayed minute actually changes, not on every tick.
 */
export function useLocalTime(timeZone: string): string {
  const subscribe = useCallback((onChange: () => void) => {
    const id = window.setInterval(onChange, 10_000);
    return () => window.clearInterval(id);
  }, []);

  const getSnapshot = useCallback(
    () => getFormatter(timeZone).format(new Date()),
    [timeZone],
  );

  const getServerSnapshot = useCallback(() => "", []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

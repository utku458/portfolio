"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * True once the page has scrolled past `threshold`. Drives the header's
 * transition from transparent to blurred.
 *
 * The snapshot is a boolean, so React bails out of re-rendering while the value
 * is unchanged: scrolling 2000px costs exactly two renders, not two thousand.
 * The listener is passive and therefore never blocks the scroll itself.
 */
export function useScrolled(threshold = 8): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  // The server renders the "top of page" state — which is what it always is.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

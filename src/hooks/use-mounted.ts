"use client";

import { useSyncExternalStore } from "react";

/** Never fires — the value only ever changes once, at hydration. */
const noopSubscribe = () => () => {};

/**
 * False during SSR and the hydration render, true afterwards.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: React's own
 * hydration boundary gives us the transition for free, without a setState in an
 * effect body (which triggers a cascading render, and which React 19's lint
 * rules correctly reject).
 *
 * Used to gate output the server cannot know — the theme toggle's label being
 * the canonical case.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

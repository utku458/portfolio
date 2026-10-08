"use client";

import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  /** Distance from the top that still counts as "above the fold", in px. */
  readonly offset?: number;
}

/**
 * Returns the id of the section currently in view.
 *
 * IntersectionObserver instead of a scroll handler: the browser does the
 * intersection maths off the main thread, so this costs nothing while idle.
 * The top margin is pulled down by the header height, otherwise a section
 * counts as "visible" while it is still hidden behind the sticky nav.
 */
export function useScrollSpy(
  ids: readonly string[],
  { offset = 96 }: ScrollSpyOptions = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Follow the document order in `ids`, not observer callback order, so
        // two sections on screen at once resolve to the higher one.
        const current = ids.find((id) => visible.has(id)) ?? null;
        if (current) setActiveId(current);
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

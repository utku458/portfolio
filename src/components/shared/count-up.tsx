"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  readonly value: number;
  readonly durationMs?: number;
}

/**
 * Counts to `value` the first time it scrolls into view.
 *
 * The animation writes directly to the DOM node through Framer Motion's
 * imperative `animate`, so a 1.2 second count costs React zero renders. Driving
 * it with `useState` would re-render this subtree roughly seventy times for a
 * decorative effect.
 *
 * `useReducedMotion` is checked explicitly: `MotionConfig` governs motion
 * *components*, and this is an imperative animation that would otherwise ignore
 * the preference.
 *
 * The real figure is always in the DOM for assistive technology and for anyone
 * without JavaScript — only the visual copy animates.
 */
export function CountUp({ value, durationMs = 1200 }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, durationMs, prefersReducedMotion]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={nodeRef} aria-hidden className="tabular-nums">
        {value}
      </span>
    </>
  );
}

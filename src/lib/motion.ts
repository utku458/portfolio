import type { Variants } from "motion/react";

/**
 * Shared easing, mirroring `--ease-out-expo` in globals.css so JS-driven and
 * CSS-driven motion in the same view cannot disagree.
 */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Scroll-reveal for a single block. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/** Parent that reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/**
 * Reveal once and never again. Re-animating on every scroll-by is the fastest
 * way to make a portfolio feel like a template.
 */
export const revealOnce = { once: true, margin: "-80px" } as const;

"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/** How far outside the box the pointer still reaches the field, in px. */
const INFLUENCE_RADIUS = 560;
/** How far the figure travels against its backdrop, in px. */
const PORTRAIT_DRIFT = 14;
/** How far the wash travels. Less than the figure, so the two separate. */
const POOL_DRIFT = 6;

/** Heavy enough that the field settles rather than snaps, light enough to feel live. */
const FOLLOW = { stiffness: 140, damping: 20, mass: 0.6 } as const;

/**
 * The portrait's backdrop, and the one interactive thing on the page.
 *
 * A cut-out with nothing behind it reads as pasted on. Two static rings were
 * the first answer; this is the better one, because it acknowledges the
 * visitor. A dot matrix sits behind the figure, invisible on its own, and the
 * pointer passes over it like a light: the dots it reaches brighten, the wash
 * leans the same way, and the figure drifts against both. The matrix is the
 * same grid motif as `HeroBackground`, so this reads as that background coming
 * into focus rather than as a second idea.
 *
 * It listens on the window, not on itself. A field that only answers a pointer
 * already inside it is a hover state; answering one crossing the headline on
 * the far side of the hero is what makes it feel like a field. Strength falls
 * off with distance, so it fades out instead of snapping off at the box edge.
 *
 * Pointer position goes through motion values, which write straight to the DOM
 * node — the same reason `ProjectCard` uses them. A `useState` here would
 * re-render this subtree on every mouse move; this re-renders it never.
 *
 * None of it is load-bearing. Under `prefers-reduced-motion`, on a touch
 * screen, or before hydration, the resting values leave a composed — just
 * quieter — version of the same picture.
 */
export function HeroPortraitField({ children }: { readonly children: ReactNode }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Where the light is, as a percentage of the box, and how near the pointer
  // is. Percentages rather than pixels so the mask needs no size measurement.
  const lightX = useSpring(50, FOLLOW);
  const lightY = useSpring(38, FOLLOW);
  const nearness = useSpring(0, FOLLOW);

  // The same pointer offset, signed, for everything that parallaxes.
  const offsetX = useSpring(0, FOLLOW);
  const offsetY = useSpring(0, FOLLOW);

  const spotlight = useMotionTemplate`radial-gradient(42% 32% at ${lightX}% ${lightY}%, #000 8%, transparent 74%)`;
  const figureX = useTransform(() => offsetX.get() * PORTRAIT_DRIFT * nearness.get());
  const figureY = useTransform(() => offsetY.get() * PORTRAIT_DRIFT * nearness.get());
  const poolX = useTransform(() => offsetX.get() * -POOL_DRIFT * nearness.get());
  const poolY = useTransform(() => offsetY.get() * -POOL_DRIFT * nearness.get());

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    // A coarse pointer has no hovering position to follow, and someone who has
    // asked for less motion should not be handed a thing that chases them.
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const box = field.getBoundingClientRect();
      if (box.width === 0) return;

      const withinX = (event.clientX - box.left) / box.width;
      const withinY = (event.clientY - box.top) / box.height;

      // Distance to the box, not to its centre: standing just beside a tall
      // portrait should count as close, and a centre measurement says it isn't.
      const gapX = Math.max(box.left - event.clientX, 0, event.clientX - box.right);
      const gapY = Math.max(box.top - event.clientY, 0, event.clientY - box.bottom);
      const gap = Math.hypot(gapX, gapY);

      lightX.set(withinX * 100);
      lightY.set(withinY * 100);
      nearness.set(1 - Math.min(gap / INFLUENCE_RADIUS, 1));
      offsetX.set(Math.max(-1, Math.min(1, (withinX - 0.5) * 2)));
      offsetY.set(Math.max(-1, Math.min(1, (withinY - 0.5) * 2)));
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [lightX, lightY, nearness, offsetX, offsetY, prefersReducedMotion]);

  return (
    // Deliberately modest in size: the hero's subject is the name and the
    // sentence under it, and a portrait scaled to compete with them turns the
    // page into a profile picture with some text beside it.
    <div
      ref={fieldRef}
      className="pointer-events-none relative mx-auto flex w-full max-w-52 animate-fade-up justify-center [animation-delay:360ms] sm:max-w-60 lg:mx-0 lg:max-w-72"
    >
      {/* The wash the figure stands in, drifting against him. */}
      <motion.div
        aria-hidden
        style={{ x: poolX, y: poolY }}
        className="absolute left-1/2 top-[46%] -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--portrait-pool),transparent_72%)]"
      />

      {/*
        The matrix. On its own it is barely a texture; the mask is what turns
        the pointer into a light travelling across it.
      */}
      <motion.div
        aria-hidden
        style={{
          opacity: nearness,
          maskImage: spotlight,
          WebkitMaskImage: spotlight,
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        className="absolute inset-x-[-28%] inset-y-[-14%] -z-10"
      />

      {/* One ring, so the figure has a place rather than only an absence. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[44%] -z-10 aspect-square w-[122%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 [mask-image:linear-gradient(to_bottom,black_32%,transparent_84%)]"
      />

      <motion.div style={{ x: figureX, y: figureY }} className="relative w-full">
        {children}
      </motion.div>
    </div>
  );
}

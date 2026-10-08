"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { fadeUp, revealOnce } from "@/lib/motion";

/**
 * The interaction shell for one skill group. Content is passed in as
 * server-rendered `children`, so only the behaviour ships to the browser.
 *
 * Cards reveal in sequence rather than all at once — a small per-card delay
 * reads as the section assembling itself, where a simultaneous fade just looks
 * like a slow page.
 */
export function SkillCard({
  index,
  children,
}: {
  readonly index: number;
  readonly children: ReactNode;
}) {
  const pointerX = useMotionValue(-400);
  const pointerY = useMotionValue(-400);

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${pointerX}px ${pointerY}px, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)`;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealOnce}
      transition={{ delay: index * 0.09 }}
      onMouseMove={handlePointerMove}
      className="group/card relative overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-primary/25"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      {/*
        Carries the padding as well as the stacking context for the detail rail.
        `h-full` matters: the grid stretches every card in a row to the tallest
        one, and without it this wrapper would only be as tall as its content —
        so the rail would sit at the bottom of the text rather than the bottom
        of the card, and the four cards would disagree about where it goes.
      */}
      <div className="relative z-10 h-full p-6 pb-26">{children}</div>
    </motion.article>
  );
}

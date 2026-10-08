"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { fadeUp, revealOnce } from "@/lib/motion";

/**
 * The only client component in this section, and it now does exactly one thing:
 * make the card feel alive. All of the content is passed in as server-rendered
 * `children`, so the browser downloads the interaction and not the markup.
 *
 * The spotlight follows the cursor through Framer Motion *motion values*, which
 * write straight to the DOM node. A `useState` on pointer position would
 * re-render this subtree on every mouse move; this re-renders it zero times.
 */
export function ProjectCard({ children }: { readonly children: ReactNode }) {
  // Off-card until the pointer arrives, so the gradient never flashes in the
  // top-left corner on first hover.
  const pointerX = useMotionValue(-400);
  const pointerY = useMotionValue(-400);

  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${pointerX}px ${pointerY}px, color-mix(in oklab, var(--primary) 13%, transparent), transparent 72%)`;

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
      onMouseMove={handlePointerMove}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30 sm:p-8"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.article>
  );
}

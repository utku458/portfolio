"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { CornerFrame } from "@/components/ui/corner-frame";
import { fadeUp, revealOnce, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Column spans as a closed set rather than a number.
 *
 * Tailwind compiles the classes it can see in the source, so a template string
 * like `lg:col-span-${n}` produces a class that does not exist. Mapping a union
 * to literal classes keeps the output correct *and* makes an invalid span a
 * compile error instead of a silently broken layout.
 */
const SPAN_CLASS = {
  1: "sm:col-span-1 lg:col-span-1",
  2: "sm:col-span-2 lg:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
  4: "sm:col-span-2 lg:col-span-4",
} as const;

export type BentoSpan = keyof typeof SPAN_CLASS;

/**
 * The grid knows about layout and nothing else — not what a cell contains, not
 * how a cell is decorated. Adding a new kind of cell never touches this file.
 *
 * It is also the motion orchestrator: Framer Motion propagates variants down to
 * child motion components, so `BentoCell` inherits the reveal without the
 * caller ever passing an index.
 */
export function BentoGrid({
  className,
  children,
}: {
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealOnce}
      className={cn(
        "grid grid-cols-1 gap-(--bento-gap) sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/**
 * `surface` is a filled card; `frame` is the reference's open treatment — no
 * background, no border, just the four corner marks.
 *
 * Both are variants of the same component rather than two components, because
 * everything else about a cell (spans, reveal, hover) is identical. Adding a
 * third treatment means adding a branch here, not changing any caller.
 */
export type BentoVariant = "surface" | "frame";

interface BentoCellProps {
  readonly span?: BentoSpan;
  readonly variant?: BentoVariant;
  /** Stretches the cell over two rows on wide screens. */
  readonly tall?: boolean;
  /** Set when the cell wraps a link, so the hover state reads as affordance. */
  readonly interactive?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function BentoCell({
  span = 1,
  variant = "surface",
  tall = false,
  interactive = false,
  className,
  children,
}: BentoCellProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group/cell relative flex flex-col justify-between p-5 sm:p-6",
        SPAN_CLASS[span],
        tall && "lg:row-span-2",
        variant === "surface" &&
          "rounded-xl border border-border bg-card transition-colors duration-300",
        variant === "surface" && interactive && "hover:border-primary/30",
        className,
      )}
    >
      {variant === "frame" && (
        <CornerFrame
          className={interactive ? "group-hover/cell:border-primary/70" : undefined}
        />
      )}
      {children}
    </motion.div>
  );
}

import type { ReactNode } from "react";

import { CountUp } from "@/components/shared/count-up";
import { cn } from "@/lib/utils";
import type { HeadlineStat } from "@/lib/stats";

/**
 * The eyebrow used on every bento cell. One component rather than a repeated
 * class string, so the tracking and size can never drift between cells.
 */
export function CellLabel({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Cell contents know their own content and nothing else — not their span, not
 * their variant, not where they sit in the grid. The section decides that at
 * the composition site, which is what lets the same stat be a small cell in one
 * layout and a wide one in another without touching this file.
 */
export function StatCell({ stat }: { readonly stat: HeadlineStat }) {
  return (
    <>
      <CellLabel>{stat.label}</CellLabel>
      <p className="mt-8 text-stat font-semibold">
        <CountUp value={stat.value} />
        {stat.suffix && (
          <span className="align-super text-[0.55em] text-primary">
            {stat.suffix}
          </span>
        )}
      </p>
    </>
  );
}

export function NoteCell({
  label,
  children,
}: {
  readonly label: string;
  readonly children: ReactNode;
}) {
  return (
    <>
      <CellLabel>{label}</CellLabel>
      <div className="mt-4 text-sm leading-relaxed text-pretty-balance">
        {children}
      </div>
    </>
  );
}

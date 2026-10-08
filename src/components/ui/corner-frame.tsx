import { cn } from "@/lib/utils";

/**
 * Four L-shaped marks at the corners of a box, instead of a border around it.
 *
 * This is the signature detail of the reference design, and it is doing real
 * work: a full border closes a cell and makes a grid read as a table, while
 * corner marks imply the boundary and let the whitespace stay open. The result
 * is a layout that feels drawn rather than divided.
 *
 * Each mark is one element with two borders — no SVG, no background image, and
 * it inherits `currentColor` through `border-*` so a parent can tint all four
 * on hover with a single class.
 */
const CORNERS = [
  "left-0 top-0 border-l border-t origin-top-left",
  "right-0 top-0 border-r border-t origin-top-right",
  "left-0 bottom-0 border-l border-b origin-bottom-left",
  "right-0 bottom-0 border-r border-b origin-bottom-right",
] as const;

interface CornerFrameProps {
  /** Applied to all four marks — typically the border colour and transition. */
  readonly className?: string;
  /** Plays the staggered draw-in. Only use where the box itself is revealed. */
  readonly animated?: boolean;
}

export function CornerFrame({ className, animated = false }: CornerFrameProps) {
  return (
    <>
      {CORNERS.map((placement, index) => (
        <span
          key={placement}
          aria-hidden
          style={animated ? { animationDelay: `${120 + index * 70}ms` } : undefined}
          className={cn(
            // Not `border-border`: at 0.918 lightness that token disappears
            // against a near-white page. A tinted muted-foreground keeps the
            // same weight in both themes, and a decorative mark needs to be
            // *seen* even though it carries no information.
            "pointer-events-none absolute size-(--bento-corner-size) border-muted-foreground/30",
            "transition-colors duration-300",
            placement,
            animated && "animate-corner-draw",
            className,
          )}
        />
      ))}
    </>
  );
}

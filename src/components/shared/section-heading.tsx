import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono label above the title — gives each section a scannable anchor. */
  readonly eyebrow: string;
  readonly title: string;
  readonly lead?: string;
  readonly className?: string;
}

/**
 * Every section header in one component, so vertical rhythm and heading levels
 * stay consistent without each section re-deciding them.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-(--measure-prose)", className)}>
      {/* The eyebrow carries the accent, not the title. A coloured heading
          competes with itself; a coloured label above a neutral heading reads as
          a system — which is exactly what the reference does. */}
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
        <span aria-hidden className="h-px w-6 bg-primary/40" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-headline font-semibold">{title}</h2>
      {lead && (
        <p className="mt-4 text-lg text-muted-foreground text-pretty-balance">
          {lead}
        </p>
      )}
    </header>
  );
}

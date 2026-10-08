import { TechIcon } from "@/components/sections/tech-icon";
import { techIconSlugFor } from "@/components/sections/tech-icon-slugs";
import { cn } from "@/lib/utils";
import type { TechKind, TechTag } from "@/types";

/** Render order: what a system is written in, then what it runs on. */
const KIND_ORDER: readonly TechKind[] = [
  "language",
  "framework",
  "database",
  "platform",
  "tooling",
];

function byKind(a: TechTag, b: TechTag): number {
  return KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind);
}

/**
 * Marks, but quietly.
 *
 * The skills section is where the logos earn attention; here they are a
 * scanning aid under a card that is already carrying a cover image, a status
 * badge and two columns of prose. So they stay monochrome and small, and only
 * lift to full foreground when the card itself is hovered.
 *
 * `kind` still earns its keep by ordering the list rather than tinting it.
 */
export function TechChips({
  stack,
  className,
}: {
  readonly stack: readonly TechTag[];
  readonly className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {[...stack].sort(byKind).map((tech) => {
        const slug = techIconSlugFor(tech.name);

        return (
          <li
            key={tech.name}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 py-1 font-mono text-[0.7rem] text-muted-foreground",
              "transition-colors duration-300 group-hover:border-border/70 group-hover:text-foreground/75",
              slug ? "pl-1.5 pr-2" : "px-2",
            )}
          >
            {slug && (
              <span className="size-3.5 shrink-0 opacity-75">
                <TechIcon slug={slug} />
              </span>
            )}
            {tech.name}
          </li>
        );
      })}
    </ul>
  );
}

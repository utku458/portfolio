import { hasTechIcon } from "@/components/sections/tech-icon-slugs";
import { TechIcon } from "@/components/sections/tech-icon";
import { cn } from "@/lib/utils";
import type { ProficiencyLevel, Skill } from "@/types";

const CHIP_STYLES: Record<ProficiencyLevel, string> = {
  core: "border-primary/25 bg-primary/10 text-foreground",
  proficient: "border-transparent bg-secondary text-secondary-foreground",
  familiar: "border-border bg-transparent text-muted-foreground",
};

/**
 * The dot is the non-colour cue for the level. Colour alone would fail WCAG
 * 1.4.1, so filled / half / ring carries the same information independently.
 */
const DOT_STYLES: Record<ProficiencyLevel, string> = {
  core: "bg-primary",
  proficient: "bg-primary/45",
  familiar: "border border-primary/60 bg-transparent",
};

export function LevelDot({
  level,
  className,
}: {
  readonly level: ProficiencyLevel;
  readonly className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("size-1.5 shrink-0 rounded-full", DOT_STYLES[level], className)}
    />
  );
}

/**
 * A badge that can prove itself.
 *
 * The context text is not a floating tooltip: a popover anchored to a chip near
 * the card's edge overflows the card and gets clipped. Instead every chip's
 * detail renders into one fixed rail at the bottom of its card — the positioning
 * context is `.group/card`, not the chip — so the reveal always lands in the
 * same, always-visible place.
 *
 * `tabIndex={0}` on a non-interactive element is deliberate: WCAG 1.4.13
 * requires hover-revealed content to be reachable by keyboard. The text stays in
 * the DOM at all times, so screen readers and crawlers always see it.
 */
export function SkillChip({ skill }: { readonly skill: Skill }) {
  const detailId = `skill-${skill.id}-context`;
  const iconSlug = hasTechIcon(skill.iconSlug) ? skill.iconSlug : undefined;

  return (
    <li className="group/chip transition-opacity duration-300">
      <span
        tabIndex={0}
        aria-describedby={detailId}
        className={cn(
          "inline-flex cursor-default items-center gap-2 rounded-full border py-1.5 text-sm",
          iconSlug ? "pl-2.5 pr-3" : "px-3",
          "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-(--ease-out-expo)",
          "hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-sm",
          "focus-visible:-translate-y-0.5",
          CHIP_STYLES[skill.level],
        )}
      >
        {iconSlug ? (
          <span className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover/chip:text-primary group-focus-within/chip:text-primary">
            <TechIcon slug={iconSlug} />
          </span>
        ) : (
          <LevelDot level={skill.level} />
        )}

        {skill.name}

        {iconSlug && <LevelDot level={skill.level} className="ml-0.5" />}
      </span>

      <span
        id={detailId}
        className={cn(
          // Positioned against `.group/card`, not this chip.
          "pointer-events-none absolute inset-x-6 bottom-6 text-xs leading-relaxed text-foreground",
          "translate-y-1 opacity-0 transition duration-300 ease-(--ease-out-expo)",
          "group-hover/chip:translate-y-0 group-hover/chip:opacity-100",
          "group-focus-within/chip:translate-y-0 group-focus-within/chip:opacity-100",
        )}
      >
        {skill.context}
      </span>
    </li>
  );
}

import { LayoutTemplate, Server, Smartphone, Wrench } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { Container } from "@/components/layout/container";
import { SkillCard } from "@/components/sections/skill-card";
import { LevelDot, SkillChip } from "@/components/sections/skill-chip";
import { SectionHeading } from "@/components/shared/section-heading";
import { skillGroups } from "@/data";
import type { ProficiencyLevel, SkillCategory } from "@/types";

const LEGEND: readonly { level: ProficiencyLevel; label: string }[] = [
  { level: "core", label: "Core — reach for it daily" },
  { level: "proficient", label: "Proficient — shipped production work with it" },
  { level: "familiar", label: "Familiar — used it, still growing" },
];

/** `Record` so a new category cannot be added without giving it a mark. */
const CATEGORY_ICONS: Record<
  SkillCategory,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  backend: Server,
  frontend: LayoutTemplate,
  mobile: Smartphone,
  tooling: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="02 — Skills"
          title="What I work with"
          lead="Grouped by where each piece sits in the stack. Hover or focus any item to see what I actually built with it — a badge with no project behind it is decoration, not evidence."
        />

        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {LEGEND.map((entry) => (
            <li key={entry.level} className="flex items-center gap-2">
              <LevelDot level={entry.level} />
              {entry.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = CATEGORY_ICONS[group.category];

            return (
              <SkillCard key={group.category} index={index}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover/card:bg-primary/15">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {group.label}
                  </h3>
                </div>

                <p className="mt-4 text-sm text-pretty-balance">
                  {group.description}
                </p>

                {/*
                  Hovering one chip dims its siblings — plain CSS, no state:
                  `ul:hover li:not(:hover)`. It focuses attention on the item
                  whose detail is currently showing in the rail below.
                */}
                <ul className="mt-5 flex flex-wrap gap-2 hover:[&>li:not(:hover)]:opacity-45">
                  {group.skills.map((skill) => (
                    <SkillChip key={skill.id} skill={skill} />
                  ))}
                </ul>

                {/* The detail rail. Every chip's context renders into this slot. */}
                <span
                  aria-hidden
                  className="absolute inset-x-6 bottom-20 h-px bg-border"
                />
                <p
                  aria-hidden
                  className="absolute inset-x-6 bottom-6 text-xs leading-relaxed text-muted-foreground transition-opacity duration-300 group-hover/card:opacity-0 group-focus-within/card:opacity-0"
                >
                  Hover or focus an item to see where it was used.
                </p>
              </SkillCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

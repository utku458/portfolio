import type { ProficiencyLevel } from "./common";

/**
 * Categories double as the tab/filter order in the UI, so the tuple order is
 * meaningful. `as const` keeps the literal types instead of widening to
 * `string[]`.
 */
export const SKILL_CATEGORIES = [
  "backend",
  "frontend",
  "mobile",
  "tooling",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface Skill {
  /** Stable key for React lists and filter state. */
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly level: ProficiencyLevel;
  /**
   * Short, concrete context — what was actually built with it.
   * This is the line that turns a badge wall into evidence.
   */
  readonly context: string;
  /** simple-icons slug, resolved to an SVG at render time. */
  readonly iconSlug?: string;
}

/** A rendered group of skills: one card / column per category. */
export interface SkillGroup {
  readonly category: SkillCategory;
  readonly label: string;
  readonly description: string;
  readonly skills: readonly Skill[];
}

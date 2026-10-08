/**
 * Single import surface for the domain model:
 *   import type { Project, Skill, Profile } from "@/types";
 */
export type * from "./common";
export type * from "./experience";
export type * from "./navigation";
export type * from "./profile";
export type * from "./project";
export type * from "./skill";

// Value export (a const tuple, not a type) — kept explicit.
export { SKILL_CATEGORIES } from "./skill";

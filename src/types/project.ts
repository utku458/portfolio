import type { DateRange, ImageAsset } from "./common";

/** Shipping state — drives the badge colour on the card. */
export type ProjectStatus = "live" | "in-development" | "archived" | "concept";

/** Primary lens a visitor filters by. */
export type ProjectDomain =
  | "full-stack"
  | "mobile"
  | "saas"
  | "automation"
  | "web";

/**
 * What a technology *is*, not just its name. Lets the UI colour-code a chip
 * (language vs. database vs. infra) instead of rendering one flat grey wall.
 */
export type TechKind =
  | "language"
  | "framework"
  | "database"
  | "platform"
  | "tooling";

export interface TechTag {
  readonly name: string;
  readonly kind: TechKind;
}

/**
 * One tier of the system. Rendering these as a diagram is what separates
 * "I used Kotlin" from "I designed a multi-client system".
 */
export interface ArchitectureLayer {
  /** e.g. "Client — iOS", "API", "Persistence". */
  readonly name: string;
  readonly tech: readonly string[];
  /** One sentence: what this tier is responsible for. */
  readonly responsibility: string;
}

/**
 * A named engineering decision and its rationale. This is the field
 * interviewers actually read — it answers "why" rather than "what".
 */
export interface TechnicalDecision {
  readonly title: string;
  readonly rationale: string;
}

/** A hard number, when one exists. Omit rather than invent. */
export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
}

export interface ProjectLinks {
  readonly github?: string;
  readonly demo?: string;
  readonly appStore?: string;
  readonly playStore?: string;
}

export interface Project {
  /** URL segment — also the React key and the future `/projects/[slug]` route. */
  readonly slug: string;
  readonly title: string;
  /** One line, shown under the title on the card. */
  readonly tagline: string;

  /**
   * The problem → solution → impact triad. Three separate fields (rather than
   * one `description` blob) because the card, the case study and the OG image
   * each need a different slice of the story.
   */
  readonly problem: string;
  readonly solution: string;
  readonly impact?: string;

  /** e.g. "Solo developer — architecture, API, clients and deployment". */
  readonly role: string;
  readonly domain: ProjectDomain;
  readonly status: ProjectStatus;
  /** Featured projects lead the grid and get the wide card treatment. */
  readonly featured: boolean;
  readonly period: DateRange;

  readonly stack: readonly TechTag[];
  readonly architecture?: readonly ArchitectureLayer[];
  readonly decisions?: readonly TechnicalDecision[];
  readonly metrics?: readonly ProjectMetric[];

  readonly links: ProjectLinks;
  readonly cover?: ImageAsset;
  readonly gallery?: readonly ImageAsset[];
}

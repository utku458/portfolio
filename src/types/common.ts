/**
 * Primitives shared across every domain model.
 * Keeping them here prevents the same shape being re-declared with slight
 * differences in `project.ts`, `profile.ts` and `experience.ts`.
 */

/**
 * `YYYY-MM` — month precision is enough for a CV timeline.
 * The `"0" | "1"` prefix forces a zero-padded month, so `"2025-6"` is a
 * compile error rather than a string that sorts incorrectly later.
 */
export type YearMonth = `${number}-${"0" | "1"}${number}`;

/**
 * A period of time. `end: null` means "still ongoing" and is rendered as
 * "Present" — using `null` instead of an optional key forces every author of a
 * data entry to make the decision explicitly.
 */
export interface DateRange {
  readonly start: YearMonth;
  readonly end: YearMonth | null;
}

/** A single outbound link with the copy used for its accessible label. */
export interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

/**
 * Image metadata. `width`/`height` are required so `next/image` can reserve the
 * box up front and we never pay a layout-shift penalty in Lighthouse (CLS = 0).
 */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /**
   * Visible caption, for galleries. `alt` describes the image to someone who
   * cannot see it; this says what they are looking at and why it is here. The
   * two are not the same sentence, so they are not the same field.
   */
  readonly caption?: string;
}

/**
 * How confident the author is with a technology.
 * Deliberately qualitative: "React — 85%" is unverifiable and reads as noise to
 * an interviewer, whereas a three-step scale maps to how people actually talk
 * about their stack.
 */
export type ProficiencyLevel = "core" | "proficient" | "familiar";

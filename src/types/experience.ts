import type { DateRange } from "./common";

export type EmploymentType = "full-time" | "part-time" | "internship" | "freelance";

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly type: EmploymentType;
  readonly location: string;
  readonly period: DateRange;
  /** One-paragraph framing of the role. */
  readonly summary: string;
  /** Outcome-shaped bullets — what changed because you were there. */
  readonly achievements: readonly string[];
  readonly tech?: readonly string[];
}

export interface Education {
  readonly id: string;
  readonly institution: string;
  /** e.g. "Bachelor's Degree", "Associate Degree". */
  readonly degree: string;
  /** e.g. "Management Information Systems". */
  readonly field: string;
  readonly period: DateRange;
  /** Why this education matters to the engineering story. */
  readonly note?: string;
}

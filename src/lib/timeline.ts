import type { DateRange, Education, EmploymentType, Experience } from "@/types";

export interface TimelineItem {
  readonly id: string;
  readonly kind: "work" | "education";
  /** Role, or degree. */
  readonly title: string;
  /** Company, or institution. */
  readonly org: string;
  /** Employment type + location, or field of study. */
  readonly meta: string;
  readonly period: DateRange;
  readonly summary: string;
  readonly details: readonly string[];
  readonly tech: readonly string[];
}

/**
 * Work and study interleaved on one rail rather than split into two lists.
 *
 * For someone who was studying and working at the same time that is the honest
 * shape of the story — and two separate columns, one of which holds a single
 * entry, looks like a gap rather than a career.
 *
 * `YearMonth` is zero-padded `YYYY-MM`, so a plain string comparison sorts it
 * correctly. That is precisely why the type forces the padding.
 */
export function buildTimeline(
  experience: readonly Experience[],
  education: readonly Education[],
  employmentLabel: Record<EmploymentType, string>,
): readonly TimelineItem[] {
  const work: TimelineItem[] = experience.map((entry) => ({
    id: entry.id,
    kind: "work",
    title: entry.role,
    org: entry.company,
    meta: `${employmentLabel[entry.type]} · ${entry.location}`,
    period: entry.period,
    summary: entry.summary,
    details: entry.achievements,
    tech: entry.tech ?? [],
  }));

  const study: TimelineItem[] = education.map((entry) => ({
    id: entry.id,
    kind: "education",
    title: entry.degree,
    org: entry.institution,
    meta: entry.field,
    period: entry.period,
    summary: entry.note ?? "",
    details: [],
    tech: [],
  }));

  return [...work, ...study].sort((a, b) =>
    b.period.start.localeCompare(a.period.start),
  );
}

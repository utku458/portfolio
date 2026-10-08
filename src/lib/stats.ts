import type { DateRange, Education, Experience, Project, YearMonth } from "@/types";

export interface HeadlineStat {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  /** Rendered in the accent colour beside the number — "+", "mo", and so on. */
  readonly suffix?: string;
}

/** Months since year zero. Comparable and subtractable, which is all we need. */
function toMonthIndex(value: YearMonth): number {
  const [year, month] = value.split("-");
  return Number(year ?? 0) * 12 + (Number(month ?? 1) - 1);
}

function monthsInRange(range: DateRange, today: Date): number {
  const end = range.end
    ? toMonthIndex(range.end)
    : today.getFullYear() * 12 + today.getMonth();
  return Math.max(0, end - toMonthIndex(range.start));
}

interface StatSources {
  readonly projects: readonly Project[];
  readonly experience: readonly Experience[];
  readonly education: readonly Education[];
}

/**
 * Every number here is derived from the content, never typed in by hand.
 *
 * Two reasons. A portfolio that claims "5 projects" beside four cards has
 * already lost the reader's trust, and hand-written figures go stale the moment
 * an entry is added. Derivation makes both failures impossible.
 */
export function buildHeadlineStats(
  { projects, experience, education }: StatSources,
  today: Date = new Date(),
): readonly HeadlineStat[] {
  const productionLanguages = new Set(
    projects.flatMap((project) =>
      project.stack
        .filter((tech) => tech.kind === "language")
        .map((tech) => tech.name),
    ),
  );

  const earliestStudyYear = education.reduce<number>(
    (earliest, entry) => Math.min(earliest, Number(entry.period.start.split("-")[0] ?? earliest)),
    today.getFullYear(),
  );

  const industryMonths = experience.reduce(
    (total, entry) => total + monthsInRange(entry.period, today),
    0,
  );

  return [
    {
      id: "projects",
      label: "Projects built",
      value: projects.length,
    },
    {
      id: "languages",
      label: "Languages used",
      value: productionLanguages.size,
    },
    {
      id: "experience",
      label: "Years writing code",
      value: Math.max(1, today.getFullYear() - earliestStudyYear),
      suffix: "+",
    },
    {
      id: "industry",
      label: "Months in enterprise IT",
      value: industryMonths,
    },
  ];
}

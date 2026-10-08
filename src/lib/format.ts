import type { DateRange, YearMonth } from "@/types";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** `"2025-06"` → `"Jun 2025"`. */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  return `${MONTHS[index] ?? month} ${year}`;
}

/** `{ start: "2025-06", end: null }` → `"Jun 2025 — Present"`. */
export function formatDateRange({ start, end }: DateRange): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;
}

import type { Locale } from "@/i18n/config";
import { htmlLang } from "@/i18n/config";
import type { DateRange, YearMonth } from "@/types";

/**
 * Month names come from `Intl`, not a hand-written array.
 *
 * The array version would need a second one for Turkish, and then a third the
 * day a locale is added — and Turkish abbreviations are not a transliteration
 * of the English ones ("Haz", not "Jun"). The platform already knows this.
 */
const FORMATTERS = new Map<string, Intl.DateTimeFormat>();

function formatter(locale: Locale): Intl.DateTimeFormat {
  const tag = htmlLang[locale];
  let existing = FORMATTERS.get(tag);
  if (!existing) {
    // UTC so a month never slips backwards for a reader east of the server.
    existing = new Intl.DateTimeFormat(tag, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    FORMATTERS.set(tag, existing);
  }
  return existing;
}

/** `"2025-06"` → `"Jun 2025"` / `"Haz 2025"`. */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split("-");
  return formatter(locale).format(Date.UTC(Number(year), Number(month) - 1, 1));
}

/** `{ start: "2025-06", end: null }` → `"Jun 2025 — Present"`. */
export function formatDateRange(
  { start, end }: DateRange,
  locale: Locale,
  present: string,
): string {
  const from = formatYearMonth(start, locale);
  return `${from} — ${end ? formatYearMonth(end, locale) : present}`;
}

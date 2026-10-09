/**
 * Two locales, declared once.
 *
 * Everything else — the routes under `app/[lang]`, the dictionaries, the
 * language switch, `hreflang`, the sitemap — derives from this array, so adding
 * a third language is a matter of adding a dictionary and letting the type
 * errors point at what is missing.
 */
export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

/** English first: the audience for the case studies is wider than Türkiye. */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** What the language switch shows — each language named in itself. */
export const localeName: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

/** Short form for the toggle button. */
export const localeShortName: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

/** `<html lang>` and `Intl` formatting. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  tr: "tr",
};

/** Open Graph wants the underscored form. */
export const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
};

/** Prefixes a path with the locale segment: `/projects/x` → `/tr/projects/x`. */
export function localePath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `/${locale}${suffix}`;
}

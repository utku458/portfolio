import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { defaultLocale, isLocale, type Locale } from "./config";
import { en, type Dictionary } from "./ui/en";
import { tr } from "./ui/tr";

const dictionaries: Record<Locale, Dictionary> = { en, tr };

/**
 * The current locale, readable from any Server Component.
 *
 * `lang` is a *root* parameter — the segment sits above the root layout — so
 * Next exposes it through `next/root-params` rather than making every component
 * in the tree accept a prop it does not otherwise care about. Client components
 * are the exception: they receive what they need from a server parent.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  // A request for /de/ reaches here with an unsupported segment. 404 is the
  // honest answer; falling back to English would publish a URL that silently
  // serves the wrong language and invites a duplicate-content penalty.
  if (typeof value !== "string" || !isLocale(value)) notFound();
  return value;
}

/**
 * The locale, or the default, never a 404.
 *
 * `not-found.tsx` lives under `[lang]` and is what renders when `getLocale`
 * rejects an unsupported segment — so it must not itself reject one, or the
 * 404 page would 404.
 */
export async function getLocaleOrDefault(): Promise<Locale> {
  const value = await lang();
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

/** For the rare caller that already knows the locale (metadata, sitemap). */
export function dictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";

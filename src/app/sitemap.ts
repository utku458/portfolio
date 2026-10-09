import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projectSlugs } from "@/data";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Every URL in both languages, each entry declaring the other as its
 * alternate.
 *
 * `alternates.languages` is not decoration: without it the two translations
 * compete as near-duplicates, and the wrong one surfaces for a Turkish query.
 * With it they are one page a search engine can serve in the reader's language.
 */
function alternatesFor(path: string): Record<string, string> {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]),
  );
  return { ...languages, "x-default": `${siteConfig.url}/${defaultLocale}${path}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = ["", ...projectSlugs.map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : 0.8,
      alternates: { languages: alternatesFor(path) },
    })),
  );
}

import type { Locale } from "../config";

/**
 * The strings that describe the site to search engines and social cards.
 *
 * These live beside the other content rather than in `config/site.ts` because
 * they are prose: the URL, the OG image path and the author name are facts that
 * do not change with language, and keeping them apart is what stops a domain
 * from being duplicated into two files that can disagree.
 */
interface SiteCopy {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
}

const SITE_COPY: Record<Locale, SiteCopy> = {
  en: {
    title: "Utku Altınay — Full-Stack Developer",
    description:
      "Full-stack developer in İstanbul. I build multi-platform systems: a C# .NET API at the centre, with native iOS, Android and React clients around it.",
    keywords: [
      "Utku Altınay",
      "Full-Stack Developer",
      "Next.js",
      "React",
      "TypeScript",
      "C# .NET",
      "Kotlin",
      "SwiftUI",
      "İstanbul",
    ],
  },
  tr: {
    title: "Utku Altınay — Full-Stack Geliştirici",
    description:
      "İstanbul'da full-stack geliştirici. Çok platformlu sistemler kuruyorum: merkezde bir C# .NET API, çevresinde native iOS, Android ve React istemciler.",
    keywords: [
      "Utku Altınay",
      "Full-Stack Geliştirici",
      "Yazılım Geliştirici",
      "Next.js",
      "React",
      "TypeScript",
      "C# .NET",
      "Kotlin",
      "SwiftUI",
      "İstanbul",
    ],
  },
};

export function getSiteCopy(locale: Locale): SiteCopy {
  return SITE_COPY[locale];
}

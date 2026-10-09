import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/config/site";
import {
  dictionaryFor,
  getLocale,
  htmlLang,
  localePath,
  locales,
  openGraphLocale,
  type Locale,
} from "@/i18n";
import { getSiteCopy } from "@/i18n/content";
import { getProfile } from "@/data/profile";

import "../globals.css";

/**
 * `latin-ext` is not optional here: "Altınay", "İstanbul" and "Bilişim" all use
 * characters outside the basic Latin subset, and now so does every Turkish
 * sentence on the site. Without it the browser silently falls back to a system
 * font mid-word.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Mono renders labels, dates and tech names. Turkish pushed "Geliştirilen",
 * "Ölçülen" and the section eyebrows into it, so it needs the extended block
 * too — the dotted/dotless i is exactly the character that breaks without it.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Both locales are prerendered; nothing here is resolved per request. */
export function generateStaticParams(): Array<{ lang: Locale }> {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = getSiteCopy(locale);

  return {
    // Every relative URL below — canonicals, OG images — is resolved against this.
    metadataBase: new URL(siteConfig.url),
    title: {
      default: copy.title,
      // A case study exporting `title: "FitApp"` becomes "FitApp — Utku Altınay".
      template: `%s — ${siteConfig.name}`,
    },
    description: copy.description,
    keywords: [...copy.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: localePath(locale, "/"),
      // Tells search engines these two URLs are the same page in two languages,
      // rather than two pages competing for the same queries.
      languages: {
        en: "/en",
        tr: "/tr",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      url: localePath(locale, "/"),
      siteName: siteConfig.name,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  // Matches --background in each theme, so the mobile browser chrome blends in.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = dictionaryFor(locale);
  const { socials } = getProfile(locale);

  return (
    // `suppressHydrationWarning` is required: next-themes writes the theme class
    // onto <html> in a blocking script before React hydrates, which is exactly
    // what prevents the flash of the wrong theme.
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <Providers>
          <SkipLink label={dict.nav.skipToContent} />
          <span id="top" className="sr-only" />
          <Navbar
            locale={locale}
            nav={dict.nav}
            theme={dict.theme}
            language={dict.language}
            socials={socials}
          />
          <main id="main" className="pt-(--header-height)">
            {children}
          </main>
          <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
        </Providers>
      </body>
    </html>
  );
}

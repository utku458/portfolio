import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/config/site";

import "./globals.css";

/**
 * `latin-ext` is not optional here: "Altınay", "İstanbul" and "Bilişim" all use
 * characters outside the basic Latin subset. Without it the browser silently
 * falls back to a system font mid-word.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Mono only ever renders English labels, dates and tech names, so it does not
// need the extended Latin block that Inter does. That subset alone was 15 KB.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Every relative URL below — canonicals, OG images — is resolved against this.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    // A case study exporting `title: "FitApp"` becomes "FitApp — Utku Altınay".
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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

export const viewport: Viewport = {
  // Matches --background in each theme, so the mobile browser chrome blends in.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning` is required: next-themes writes the theme class
    // onto <html> in a blocking script before React hydrates, which is exactly
    // what prevents the flash of the wrong theme.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <Providers>
          <SkipLink />
          <span id="top" className="sr-only" />
          <Navbar />
          <main id="main" className="pt-(--header-height)">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

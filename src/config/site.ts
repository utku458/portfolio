import type { NavItem, SiteConfig } from "@/types";

/**
 * Resolved once, at module load.
 *
 * Every canonical URL, OG image URL and sitemap entry is derived from this, so
 * hard-coding a domain would make preview deployments advertise the production
 * URL — and a preview that claims to be production is a real SEO hazard.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Set automatically on Vercel for the production deployment.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteConfig: SiteConfig = {
  name: "Utku Altınay",
  title: "Utku Altınay — Full-Stack Developer",
  description:
    "Full-stack developer in İstanbul. I build multi-platform systems: a C# .NET API at the centre, with native iOS, Android and React clients around it.",
  url: resolveSiteUrl(),
  locale: "en_US",
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
  ogImage: "/opengraph-image",
};

/**
 * Section anchors. The order is the scroll order, so the scroll-spy hook can
 * derive the active item from this array alone.
 */
/**
 * Root-relative hrefs, not bare fragments: the navbar and footer also render on
 * `/projects/[slug]`, where `#about` would point at an element that does not
 * exist on that page and silently do nothing.
 */
export const navItems = [
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const satisfies readonly NavItem[];

export type SectionId = (typeof navItems)[number]["id"];

/**
 * Module-level so the reference is stable — `useScrollSpy` depends on identity,
 * and deriving this inside a component would re-create the observer on every
 * render.
 */
export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id);

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

/**
 * The facts about the site. The title, description and keywords are prose and
 * live per-locale in `i18n/content/site.ts`; a domain duplicated into two
 * language files is a domain that can be wrong in one of them.
 */
export const siteConfig: SiteConfig = {
  name: "Utku Altınay",
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
};

/**
 * Section anchors, in scroll order, so the scroll-spy hook can derive the
 * active item from this array alone.
 *
 * Ids only. The label comes from the dictionary and the href is built with the
 * active locale, because the navbar and footer also render on
 * `/[lang]/projects/[slug]` — where a bare `#about` would point at an element
 * that does not exist on that page and silently do nothing.
 */
export const navItems = [
  { id: "about" },
  { id: "skills" },
  { id: "projects" },
  { id: "experience" },
  { id: "contact" },
] as const satisfies readonly NavItem[];

export type SectionId = (typeof navItems)[number]["id"];

/**
 * Module-level so the reference is stable — `useScrollSpy` depends on identity,
 * and deriving this inside a component would re-create the observer on every
 * render.
 */
export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id);

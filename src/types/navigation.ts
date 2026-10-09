/**
 * A section anchor in the single-page layout.
 *
 * The id is all that is stored: the label is looked up in the dictionary and
 * the href is built from the active locale, so neither can go stale in one
 * language while staying correct in the other.
 */
export interface NavItem {
  readonly id: string;
}

/**
 * Site-wide facts consumed by `generateMetadata` and JSON-LD.
 *
 * The title, description and keywords are deliberately absent: they are prose,
 * and prose belongs in `i18n/content/site.ts` where every locale must provide it.
 */
export interface SiteConfig {
  readonly name: string;
  /** Absolute origin, no trailing slash — required for canonical + OG URLs. */
  readonly url: string;
  readonly ogImage: string;
}

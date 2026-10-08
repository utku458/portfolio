/** A section anchor in the single-page layout. */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

/** Site-wide metadata consumed by `generateMetadata` and JSON-LD. */
export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  /** Absolute origin, no trailing slash — required for canonical + OG URLs. */
  readonly url: string;
  readonly locale: string;
  readonly keywords: readonly string[];
  readonly ogImage: string;
}

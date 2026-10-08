import type { Education, Experience } from "./experience";

export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  readonly platform: SocialPlatform;
  /** Accessible label — "GitHub profile", not just "GitHub". */
  readonly label: string;
  readonly href: string;
  /** Displayed handle, e.g. "@utku458". */
  readonly handle: string;
}

export interface ContactInfo {
  readonly email: string;
  readonly location: string;
  /** IANA zone, used for the "local time" touch in the contact section. */
  readonly timezone: string;
  /**
   * Intentionally optional and intentionally unset in `data/profile.ts`:
   * a phone number on a public page is a scraping magnet. Keep it on the CV.
   */
  readonly phone?: string;
}

export type LanguageLevel = "native" | "professional" | "intermediate" | "elementary";

export interface SpokenLanguage {
  readonly name: string;
  readonly level: LanguageLevel;
}

export type AvailabilityStatus = "open-to-work" | "open-to-offers" | "not-looking";

export interface Profile {
  readonly name: string;
  /** Fallback avatar / favicon glyph. */
  readonly initials: string;
  /** Job title, e.g. "Full-Stack Developer". */
  readonly title: string;
  /** The hero one-liner: what you build, in your own words. */
  readonly headline: string;
  /** Long-form bio, one string per paragraph. */
  readonly bio: readonly string[];
  readonly availability: AvailabilityStatus;
  readonly contact: ContactInfo;
  readonly socials: readonly SocialLink[];
  readonly languages: readonly SpokenLanguage[];
  readonly experience: readonly Experience[];
  readonly education: readonly Education[];
  /**
   * Path under `public/` to the downloadable CV. Optional on purpose: every
   * consumer renders nothing when it is unset, so withdrawing the document is
   * a one-line change rather than a hunt through the components.
   */
  readonly resumeUrl?: string;
}

import {
  getProfileCopy,
  type EducationId,
  type ExperienceId,
  type SpokenLanguageId,
} from "@/i18n/content/profile";
import type { Locale } from "@/i18n/config";
import type { Profile } from "@/types";

/**
 * Facts, with no language of their own.
 *
 * Dates, URLs, an email address and a timezone read the same in every locale,
 * so they are stored once. Everything a translator would touch lives in
 * `i18n/content/profile.ts`, keyed by the ids below. The split is the point: a
 * corrected date cannot end up fixed in English and stale in Turkish.
 */
const profileFacts = {
  name: "Utku Altınay",
  initials: "UA",
  availability: "open-to-work",
  contact: {
    email: "altinayutku0@gmail.com",
    location: "İstanbul, Türkiye",
    timezone: "Europe/Istanbul",
    // `phone` deliberately omitted: a public page is a scraping target.
    // The number stays on the downloadable CV.
  },
  socials: [
    { platform: "github", href: "https://github.com/utku458", handle: "@utku458" },
    {
      platform: "linkedin",
      href: "https://www.linkedin.com/in/utku-alt%C4%B1nay-7620b3336/",
      handle: "Utku Altınay",
    },
    {
      platform: "email",
      href: "mailto:altinayutku0@gmail.com",
      handle: "altinayutku0@gmail.com",
    },
  ],
  languages: [
    { id: "turkish", level: "native" },
    { id: "english", level: "professional" },
    // Deliberately the conservative end of the scale: a language level is the
    // easiest claim on a CV to test in the first five minutes of an interview.
    { id: "japanese", level: "elementary" },
  ],
  experience: [
    {
      id: "innova-bilisim",
      company: "İnnova Bilişim Çözümleri",
      type: "internship",
      location: "İstanbul, Türkiye",
      period: { start: "2022-09", end: "2023-06" },
      tech: ["Windows Server", "Active Directory", "Ticketing systems"],
    },
  ],
  education: [
    {
      id: "medipol-mis",
      institution: "İstanbul Medipol Üniversitesi",
      // Month precision, approximate to the start of the academic year.
      period: { start: "2023-09", end: null },
    },
    {
      id: "arel-computer-programming",
      institution: "İstanbul Arel Üniversitesi",
      period: { start: "2021-01", end: "2023-01" },
    },
  ],
  // Published deliberately. The PDF carries a phone number and a date of
  // birth that this page itself withholds — a decision taken knowingly, not an
  // oversight. `robots.ts` keeps it out of search results, so it is downloadable
  // by someone reading the site rather than findable by someone querying for a
  // phone number.
  resumeUrl: "/documents/utku-altinay-cv.pdf",
} as const;

/**
 * Facts and copy, merged into the `Profile` every component already consumes.
 * Nothing downstream knows the two halves were ever apart.
 */
export function getProfile(locale: Locale): Profile {
  const copy = getProfileCopy(locale);

  return {
    name: profileFacts.name,
    initials: profileFacts.initials,
    title: copy.title,
    headline: copy.headline,
    bio: copy.bio,
    availability: profileFacts.availability,
    contact: profileFacts.contact,
    socials: profileFacts.socials.map((social) => ({
      ...social,
      label: copy.socialLabel[social.platform],
    })),
    languages: profileFacts.languages.map((language) => ({
      name: copy.languageName[language.id as SpokenLanguageId],
      level: language.level,
    })),
    experience: profileFacts.experience.map((entry) => ({
      id: entry.id,
      company: entry.company,
      type: entry.type,
      location: entry.location,
      period: entry.period,
      tech: entry.tech,
      ...copy.experience[entry.id as ExperienceId],
    })),
    education: profileFacts.education.map((entry) => ({
      id: entry.id,
      institution: entry.institution,
      period: entry.period,
      ...copy.education[entry.id as EducationId],
    })),
    resumeUrl: profileFacts.resumeUrl,
  };
}

/** The locale-independent facts, for the few callers that need no prose. */
export { profileFacts };

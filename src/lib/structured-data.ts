import { siteConfig } from "@/config/site";
import { htmlLang, localePath, locales, type Locale } from "@/i18n/config";
import type { Profile, Project, Skill } from "@/types";

/**
 * Schema.org graphs, as plain data.
 *
 * Every node carries a stable `@id`, and nodes refer to each other by it
 * rather than repeating themselves. That is what turns one snippet per page
 * into one entity: the Person on the home page and the author of every case
 * study resolve to the same `#person`, so a search engine or an LLM reading any
 * single page learns who the site is about.
 */

type JsonLdNode = Record<string, unknown>;

export interface JsonLdGraph {
  readonly "@context": "https://schema.org";
  readonly "@graph": readonly JsonLdNode[];
}

const SCHEMA_CONTEXT = "https://schema.org" as const;

export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const ref = (id: string) => ({ "@id": id });

const absolute = (path: string) => `${siteConfig.url}${path}`;

function personNode(locale: Locale, profile: Profile, skills: readonly Skill[]): JsonLdNode {
  const github = profile.socials.find((social) => social.platform === "github");

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    ...(github ? { alternateName: github.handle.replace(/^@/, "") } : {}),
    jobTitle: profile.title,
    description: profile.headline,
    url: absolute(localePath(locale, "/")),
    // The portrait identifies the entity; the OG card is a banner, not a face.
    image: {
      "@type": "ImageObject",
      url: absolute(profile.portrait.src),
      width: profile.portrait.width,
      height: profile.portrait.height,
    },
    email: `mailto:${profile.contact.email}`,
    // `workLocation`, not `address`: a `PostalAddress` on a Person invites a
    // home address, and search engines treat it as one. Where someone works is
    // public; where they live is not.
    workLocation: { "@type": "Place", name: profile.contact.location },
    sameAs: profile.socials
      .filter((social) => social.platform !== "email")
      .map((social) => social.href),
    alumniOf: profile.education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution,
    })),
    knowsAbout: skills.map((skill) => skill.name),
    knowsLanguage: profile.languages.map((language) => language.name),
  };
}

function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    inLanguage: locales.map((locale) => htmlLang[locale]),
    publisher: ref(PERSON_ID),
  };
}

/** Home page: the person, the site, and the profile page that ties them. */
export function buildProfileGraph(
  locale: Locale,
  profile: Profile,
  skills: readonly Skill[],
  pageTitle: string,
): JsonLdGraph {
  const pageUrl = absolute(localePath(locale, "/"));

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      personNode(locale, profile, skills),
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: pageTitle,
        inLanguage: htmlLang[locale],
        isPartOf: ref(WEBSITE_ID),
        mainEntity: ref(PERSON_ID),
      },
    ],
  };
}

/**
 * Open source is `SoftwareSourceCode`; anything else is the application itself.
 * Calling a closed product "source code" would promise a repository that a
 * reader following the markup cannot open.
 */
function projectNode(project: Project, pageUrl: string): JsonLdNode {
  const shared = {
    "@id": `${pageUrl}#project`,
    name: project.title,
    description: project.tagline,
    // A YYYY-MM month is a valid ISO 8601 date, and it is the real start date.
    dateCreated: project.period.start,
    author: ref(PERSON_ID),
    creator: ref(PERSON_ID),
    keywords: project.stack.map((tech) => tech.name),
    mainEntityOfPage: pageUrl,
  };

  if (project.links.github) {
    return {
      "@type": "SoftwareSourceCode",
      ...shared,
      url: pageUrl,
      codeRepository: project.links.github,
      programmingLanguage: project.stack
        .filter((tech) => tech.kind === "language")
        .map((tech) => tech.name),
      runtimePlatform: project.stack
        .filter((tech) => tech.kind === "platform")
        .map((tech) => tech.name),
    };
  }

  return {
    "@type": "SoftwareApplication",
    ...shared,
    url: project.links.demo ?? pageUrl,
  };
}

/** Case study page: the article, the thing it describes, and the trail back home. */
export function buildProjectGraph(locale: Locale, project: Project): JsonLdGraph {
  const homeUrl = absolute(localePath(locale, "/"));
  const pageUrl = absolute(localePath(locale, `/projects/${project.slug}`));
  const image = project.cover ? absolute(project.cover.src) : `${pageUrl}/opengraph-image`;

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: project.title,
        description: project.tagline,
        url: pageUrl,
        inLanguage: htmlLang[locale],
        image,
        author: ref(PERSON_ID),
        publisher: ref(PERSON_ID),
        isPartOf: ref(WEBSITE_ID),
        about: ref(`${pageUrl}#project`),
      },
      projectNode(project, pageUrl),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: homeUrl },
          { "@type": "ListItem", position: 2, name: project.title, item: pageUrl },
        ],
      },
    ],
  };
}

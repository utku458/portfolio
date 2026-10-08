import { siteConfig } from "@/config/site";
import { profile, skills } from "@/data";
import type { Project } from "@/types";

/**
 * `<` is escaped so a stray angle bracket in the data can never close the
 * script tag early. The content here is authored, not user input, but the escape
 * costs nothing and the failure mode it prevents is script injection.
 */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLd({ data }: { readonly data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

/**
 * Structured data for the person behind the site. This is what lets a search
 * engine answer "who is Utku Altınay" with a knowledge panel rather than a blue
 * link.
 */
export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.title,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        email: `mailto:${profile.contact.email}`,
        // `workLocation`, not `address`. The distinction is not pedantry: a
        // `PostalAddress` on a Person invites a home address, and search engines
        // treat it as one. Where someone works is public information; where they
        // live is not, and structured data is the last place to blur the two.
        workLocation: {
          "@type": "Place",
          name: profile.contact.location,
        },
        sameAs: profile.socials
          .filter((social) => social.platform !== "email")
          .map((social) => social.href),
        alumniOf: profile.education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.institution,
        })),
        knowsAbout: skills.map((skill) => skill.name),
        knowsLanguage: profile.languages.map((language) => language.name),
      }}
    />
  );
}

/** Structured data for one case study. */
export function ProjectJsonLd({ project }: { readonly project: Project }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.tagline,
        url: `${siteConfig.url}/projects/${project.slug}`,
        author: { "@type": "Person", name: profile.name, url: siteConfig.url },
        programmingLanguage: project.stack
          .filter((tech) => tech.kind === "language")
          .map((tech) => tech.name),
        ...(project.links.github ? { codeRepository: project.links.github } : {}),
      }}
    />
  );
}

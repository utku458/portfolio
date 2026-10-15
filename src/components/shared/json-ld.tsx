import { getProfile, getSkills } from "@/data";
import { getLocale } from "@/i18n";
import { getSiteCopy } from "@/i18n/content";
import { buildProfileGraph, buildProjectGraph } from "@/lib/structured-data";
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
 * The person, the site and the profile page, as one linked graph. This is what
 * lets a search engine answer "who is Utku Altınay" with a knowledge panel
 * rather than a blue link, and an LLM cite the site as its source.
 */
export async function PersonJsonLd() {
  const locale = await getLocale();

  return (
    <JsonLd
      data={buildProfileGraph(
        locale,
        getProfile(locale),
        getSkills(locale),
        getSiteCopy(locale).title,
      )}
    />
  );
}

/** One case study: the article, the project it describes, and a breadcrumb. */
export async function ProjectJsonLd({ project }: { readonly project: Project }) {
  return <JsonLd data={buildProjectGraph(await getLocale(), project)} />;
}

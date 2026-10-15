import { siteConfig } from "@/config/site";
import { localePath, locales, localeName, type Locale } from "@/i18n/config";
import type { Profile, Project, Skill } from "@/types";

import { formatDateRange } from "./format";

/**
 * `/llms.txt` and `/llms-full.txt` (llmstxt.org), rendered from the same data
 * as the pages.
 *
 * Hand-written copies drift: a project added to the grid and forgotten here is
 * a project an assistant will never mention. Building both files from
 * `getProfile` / `getProjects` makes them as current as the site by
 * construction.
 */

export interface LlmsSource {
  readonly locale: Locale;
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly skills: readonly Skill[];
  readonly description: string;
}

const PRESENT = "present";

const url = (locale: Locale, path: string) => `${siteConfig.url}${localePath(locale, path)}`;

const caseStudyUrl = (locale: Locale, project: Project) =>
  url(locale, `/projects/${project.slug}`);

function socialLines(profile: Profile): string[] {
  return profile.socials
    .filter((social) => social.platform !== "email")
    .map((social) => `- ${social.label}: ${social.href}`);
}

function projectLinkSuffix(project: Project): string {
  const parts = [
    project.links.demo && `Live: ${project.links.demo}`,
    project.links.github && `Source: ${project.links.github}`,
  ].filter(Boolean);
  return parts.length > 0 ? ` ${parts.join(". ")}` : "";
}

function skillsLine(skills: readonly Skill[]): string {
  return skills.map((skill) => skill.name).join(", ");
}

/** The index: who, what, and a link to every case study. */
export function buildLlmsTxt({ locale, profile, projects, skills, description }: LlmsSource): string {
  const caseStudies = projects.map(
    (project) =>
      `- [${project.title}](${caseStudyUrl(locale, project)}): ${project.tagline} ` +
      `(${formatDateRange(project.period, locale, PRESENT)}).${projectLinkSuffix(project)}`,
  );

  return [
    `# ${profile.name}`,
    "",
    `> ${description}`,
    "",
    `${profile.name} — ${profile.title}, ${profile.contact.location}.`,
    "",
    "## Profile",
    "",
    ...locales.map(
      (other) =>
        `- [${profile.name} (${localeName[other]})](${url(other, "/")}): Summary, skills, projects, experience and contact`,
    ),
    ...socialLines(profile),
    "",
    "## Case studies",
    "",
    ...caseStudies,
    "",
    "## Skills",
    "",
    skillsLine(skills),
    "",
    "## Optional",
    "",
    `- [Full text](${siteConfig.url}/llms-full.txt): Every case study in full, as Markdown`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    "",
  ].join("\n");
}

function projectSection(locale: Locale, project: Project): string[] {
  const optional = (heading: string, lines: readonly string[] | undefined) =>
    lines && lines.length > 0 ? ["", `### ${heading}`, "", ...lines] : [];

  return [
    `## ${project.title}`,
    "",
    `> ${project.tagline}`,
    "",
    `- Case study: ${caseStudyUrl(locale, project)}`,
    `- Period: ${formatDateRange(project.period, locale, PRESENT)}`,
    `- Role: ${project.role}`,
    `- Stack: ${project.stack.map((tech) => tech.name).join(", ")}`,
    ...(project.links.demo ? [`- Live: ${project.links.demo}`] : []),
    ...(project.links.github ? [`- Source: ${project.links.github}`] : []),
    "",
    "### Problem",
    "",
    project.problem,
    "",
    "### Solution",
    "",
    project.solution,
    ...optional(
      "Architecture",
      project.architecture?.map(
        (layer) => `- ${layer.name} (${layer.tech.join(", ")}): ${layer.responsibility}`,
      ),
    ),
    ...optional(
      "Decisions",
      project.decisions?.map((decision) => `- ${decision.title}: ${decision.rationale}`),
    ),
    ...optional("Outcome", project.impact ? [project.impact] : undefined),
    ...optional(
      "Measured",
      project.metrics?.map((metric) => `- ${metric.label}: ${metric.value}`),
    ),
    "",
  ];
}

/** Everything an assistant needs to answer questions without fetching pages. */
export function buildLlmsFullTxt(source: LlmsSource): string {
  const { locale, profile, projects, skills, description } = source;

  return [
    `# ${profile.name} — full text`,
    "",
    `> ${description}`,
    "",
    "## About",
    "",
    ...profile.bio.flatMap((paragraph) => [paragraph, ""]),
    `- Role: ${profile.title}`,
    `- Location: ${profile.contact.location}`,
    `- Languages: ${profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}`,
    ...profile.education.map(
      (entry) =>
        `- Education: ${entry.degree}, ${entry.field} — ${entry.institution} ` +
        `(${formatDateRange(entry.period, locale, PRESENT)})`,
    ),
    ...socialLines(profile),
    `- Contact: ${url(locale, "/")}#contact`,
    "",
    "## Skills",
    "",
    skillsLine(skills),
    "",
    "## Experience",
    "",
    ...profile.experience.flatMap((entry) => [
      `### ${entry.role} — ${entry.company}`,
      "",
      `${formatDateRange(entry.period, locale, PRESENT)} · ${entry.location}`,
      "",
      entry.summary,
      ...entry.achievements.map((achievement) => `- ${achievement}`),
      "",
    ]),
    "# Case studies",
    "",
    ...projects.flatMap((project) => projectSection(locale, project)),
  ].join("\n");
}

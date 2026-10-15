import { getProfile, getProjects, getSkills } from "@/data";
import { defaultLocale } from "@/i18n/config";
import { getSiteCopy } from "@/i18n/content";

import type { LlmsSource } from "./llms-txt";

/**
 * English, the site's default: the files are read by assistants answering in
 * any language, and the English copy is the source the translations come from.
 */
export function getLlmsSource(): LlmsSource {
  const locale = defaultLocale;
  return {
    locale,
    profile: getProfile(locale),
    projects: getProjects(locale),
    skills: getSkills(locale),
    description: getSiteCopy(locale).description,
  };
}

/** Plain text with an explicit charset, or "İstanbul" arrives as mojibake. */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

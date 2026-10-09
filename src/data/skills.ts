import { getSkillCopy } from "@/i18n/content/skills";
import type { Locale } from "@/i18n/config";
import { SKILL_CATEGORIES, type Skill, type SkillGroup } from "@/types";

/**
 * Flat source of truth. Grouping is derived below so a skill can never end up
 * in two lists, or in none.
 */
const skillFacts = [
  // ── Backend ──────────────────────────────────────────────────────────────
  {
    id: "csharp-dotnet",
    name: "C# / .NET",
    category: "backend",
    level: "proficient",
    iconSlug: "dotnet",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    level: "proficient",
    iconSlug: "mysql",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: "proficient",
    iconSlug: "postgresql",
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    level: "familiar",
    iconSlug: "python",
  },
  {
    id: "rest-api-design",
    name: "REST API Design",
    category: "backend",
    level: "proficient",
  },

  // ── Frontend ─────────────────────────────────────────────────────────────
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "proficient",
    iconSlug: "typescript",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "proficient",
    iconSlug: "react",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: "proficient",
    iconSlug: "nextdotjs",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: "core",
    iconSlug: "javascript",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    level: "proficient",
    iconSlug: "tailwindcss",
  },

  // ── Mobile ───────────────────────────────────────────────────────────────
  {
    id: "swift-swiftui",
    name: "Swift & SwiftUI",
    category: "mobile",
    level: "core",
    iconSlug: "swift",
  },
  {
    id: "kotlin-android",
    name: "Kotlin & Android",
    category: "mobile",
    level: "core",
    iconSlug: "kotlin",
  },

  // ── Tooling & automation ─────────────────────────────────────────────────
  {
    id: "git",
    name: "Git",
    category: "tooling",
    level: "core",
    iconSlug: "git",
  },
  {
    id: "docker",
    name: "Docker",
    category: "tooling",
    level: "proficient",
    iconSlug: "docker",
  },
  {
    id: "n8n",
    name: "n8n",
    category: "tooling",
    level: "proficient",
    // Not behind any project on this page — it is tooling used in client work
    // rather than in something shipped here. Give it a project or drop it.
    iconSlug: "n8n",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "tooling",
    level: "familiar",
    iconSlug: "supabase",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "tooling",
    level: "proficient",
    iconSlug: "firebase",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tooling",
    level: "proficient",
    iconSlug: "vercel",
  },
] as const;

/** Widened for consumption — see the note in `projects.ts`. */
/** Stable ids, so the Turkish file is matched by key rather than by order. */
export type SkillId = (typeof skillFacts)[number]["id"];

/**
 * Column headers. Keyed by category so a new category cannot be added without
 * a label in both languages.
 */
const GROUP_META: Record<Locale, Record<Skill["category"], { label: string; description: string }>> = {
  en: {
    backend: { label: "Backend", description: "The contract every client depends on." },
    frontend: { label: "Frontend", description: "Typed, accessible interfaces that stay fast." },
    mobile: { label: "Mobile", description: "Native on both platforms, not a wrapper." },
    tooling: {
      label: "Tooling & Automation",
      description: "Shipping, and removing the work nobody wants to repeat.",
    },
  },
  tr: {
    backend: { label: "Backend", description: "Her istemcinin dayandığı sözleşme." },
    frontend: { label: "Frontend", description: "Tipli, erişilebilir ve hızlı kalan arayüzler." },
    mobile: { label: "Mobil", description: "Her iki platformda da native; sarmalayıcı değil." },
    tooling: {
      label: "Araçlar ve Otomasyon",
      description: "Yayına almak ve kimsenin tekrarlamak istemediği işi ortadan kaldırmak.",
    },
  },
};

/** Facts plus the locale's one-line context, in the shape components expect. */
export function getSkills(locale: Locale): readonly Skill[] {
  const copy = getSkillCopy(locale);
  return skillFacts.map((skill) => ({ ...skill, context: copy[skill.id] }));
}

/** Derived view for the Skills section — grouping stays in one place. */
export function getSkillGroups(locale: Locale): readonly SkillGroup[] {
  const all = getSkills(locale);
  const meta = GROUP_META[locale];
  return SKILL_CATEGORIES.map((category) => ({
    category,
    ...meta[category],
    skills: all.filter((skill) => skill.category === category),
  }));
}

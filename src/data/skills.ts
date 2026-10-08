import { SKILL_CATEGORIES, type Skill, type SkillGroup } from "@/types";

/**
 * Flat source of truth. Grouping is derived below so a skill can never end up
 * in two lists, or in none.
 */
const skillsData = [
  // ── Backend ──────────────────────────────────────────────────────────────
  {
    id: "csharp-dotnet",
    name: "C# / .NET",
    category: "backend",
    level: "proficient",
    context: "REST API serving three client platforms with JWT-based auth.",
    iconSlug: "dotnet",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    level: "proficient",
    context: "Relational schema design and query tuning behind the FitApp API.",
    iconSlug: "mysql",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: "proficient",
    context: "Row-level security and EF Core migrations behind the ArMenu API.",
    iconSlug: "postgresql",
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    level: "familiar",
    context: "Scripting, data wrangling and glue code between services.",
    iconSlug: "python",
  },
  {
    id: "rest-api-design",
    name: "REST API Design",
    category: "backend",
    level: "proficient",
    context: "One contract consumed by iOS, Android and web without branching.",
  },

  // ── Frontend ─────────────────────────────────────────────────────────────
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "proficient",
    context: "Strict mode, no `any` — the type layer is the documentation.",
    iconSlug: "typescript",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "proficient",
    context: "Component architecture for the FitApp web client and the NFC SaaS.",
    iconSlug: "react",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: "proficient",
    context: "App Router, server components and static rendering on Vercel.",
    iconSlug: "nextdotjs",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: "core",
    context: "The language underneath everything else on this list.",
    iconSlug: "javascript",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    level: "proficient",
    context: "Design tokens as CSS variables, dark mode without a second stylesheet.",
    iconSlug: "tailwindcss",
  },

  // ── Mobile ───────────────────────────────────────────────────────────────
  {
    id: "swift-swiftui",
    name: "Swift & SwiftUI",
    category: "mobile",
    level: "core",
    context: "FitApp iOS client — MVVM, Swift Charts, async networking.",
    iconSlug: "swift",
  },
  {
    id: "kotlin-android",
    name: "Kotlin & Android",
    category: "mobile",
    level: "core",
    context: "Native Android clients and a Firebase-backed request tracker.",
    iconSlug: "kotlin",
  },

  // ── Tooling & automation ─────────────────────────────────────────────────
  {
    id: "git",
    name: "Git",
    category: "tooling",
    level: "core",
    context: "Branch-per-feature, readable history, reviewable diffs.",
    iconSlug: "git",
  },
  {
    id: "docker",
    name: "Docker",
    category: "tooling",
    level: "proficient",
    context: "Chiseled .NET images and a reproducible local stack for ArMenu.",
    iconSlug: "docker",
  },
  {
    id: "n8n",
    name: "n8n",
    category: "tooling",
    level: "proficient",
    // Not behind any project on this page — it is tooling used in client work
    // rather than in something shipped here. Give it a project or drop it.
    context: "Workflow automation for small-business operations.",
    iconSlug: "n8n",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "tooling",
    level: "familiar",
    context: "Postgres, auth and storage when a project doesn't warrant its own API.",
    iconSlug: "supabase",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "tooling",
    level: "proficient",
    context: "Realtime data and auth for the BT Support Android client.",
    iconSlug: "firebase",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tooling",
    level: "proficient",
    context: "Preview deployments and edge delivery for every web project here.",
    iconSlug: "vercel",
  },
] as const satisfies readonly Skill[];

/** Widened for consumption — see the note in `projects.ts`. */
export const skills: readonly Skill[] = skillsData;

/** Copy for each column header. Typed so a new category can't be forgotten. */
const GROUP_META: Record<Skill["category"], Pick<SkillGroup, "label" | "description">> = {
  backend: {
    label: "Backend",
    description: "The contract every client depends on.",
  },
  frontend: {
    label: "Frontend",
    description: "Typed, accessible interfaces that stay fast.",
  },
  mobile: {
    label: "Mobile",
    description: "Native on both platforms, not a wrapper.",
  },
  tooling: {
    label: "Tooling & Automation",
    description: "Shipping, and removing the work nobody wants to repeat.",
  },
};

/** Derived view for the Skills section — grouping stays in one place. */
export const skillGroups: readonly SkillGroup[] = SKILL_CATEGORIES.map((category) => ({
  category,
  ...GROUP_META[category],
  skills: skills.filter((skill) => skill.category === category),
}));

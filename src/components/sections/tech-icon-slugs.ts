/**
 * Which technologies have a mark, and how a display name maps to one —
 * without the mark data itself.
 *
 * The path data lives in `tech-icon.tsx`, which is a client module so the bytes
 * land in a cached JS chunk instead of in every HTML response. A server
 * component cannot call into a client module, so the *questions* — does this
 * have an icon, and which one? — have to be answerable on the server. That is
 * this file.
 *
 * The slug list is generated from the same source as the paths, so the two
 * cannot drift.
 */
const TECH_ICON_SLUGS: ReadonlySet<string> = new Set([
  "amazons3",
  "android",
  "csharp",
  "docker",
  "dotnet",
  "firebase",
  "git",
  "javascript",
  "jsonwebtokens",
  "kotlin",
  "mysql",
  "n8n",
  "nextdotjs",
  "opentelemetry",
  "postgresql",
  "python",
  "react",
  "supabase",
  "swift",
  "tailwindcss",
  "typescript",
  "vercel",
]);

export function hasTechIcon(slug: string | undefined): slug is string {
  return slug !== undefined && TECH_ICON_SLUGS.has(slug);
}

/**
 * Project stacks carry display names ("React 19", "EF Core"), not icon slugs,
 * because the same technology appears across several projects and should be
 * named once here rather than tagged in every entry.
 *
 * Members of the .NET family share the .NET mark — Simple Icons has no separate
 * glyph for EF Core or ASP.NET Core, and the parent mark is the honest answer.
 * Anything unmapped simply renders without an icon.
 */
const SLUG_BY_TECH_NAME: Record<string, string> = {
  ".net": "dotnet",
  ".net 8": "dotnet",
  ".net 10": "dotnet",
  "asp.net core": "dotnet",
  "ef core": "dotnet",
  "android sdk": "android",
  "c#": "csharp",
  docker: "docker",
  firebase: "firebase",
  git: "git",
  javascript: "javascript",
  jwt: "jsonwebtokens",
  kotlin: "kotlin",
  mysql: "mysql",
  n8n: "n8n",
  "next.js": "nextdotjs",
  opentelemetry: "opentelemetry",
  postgresql: "postgresql",
  python: "python",
  react: "react",
  "react 19": "react",
  "react native": "react",
  "s3 storage": "amazons3",
  supabase: "supabase",
  swift: "swift",
  swiftui: "swift",
  "tailwind css": "tailwindcss",
  typescript: "typescript",
  vercel: "vercel",
};

export function techIconSlugFor(name: string): string | undefined {
  return SLUG_BY_TECH_NAME[name.toLowerCase()];
}

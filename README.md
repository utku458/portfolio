# utkualtinay.dev

Personal portfolio of **Utku Altınay** — full-stack developer, İstanbul.
Built as a demonstration of architecture and code quality, not just as a page
with a name on it.

> **Live:** not deployed yet · **Contact:** the form on the site, or
> [altinayutku0@gmail.com](mailto:altinayutku0@gmail.com)

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Server Components) |
| Language | TypeScript 5.9, `strict` plus `noUncheckedIndexedAccess` and `verbatimModuleSyntax` |
| Styling | Tailwind CSS 4 — CSS-first config, OKLCH design tokens |
| Motion | `motion` (the standalone package, imported as `motion/react`), for interaction only |
| A11y primitives | Radix UI (dialog) |
| Hosting | Vercel |

Every route is statically prerendered. There is no database and no runtime API.

## Architecture notes

**Content is typed data, not markup.** Everything the site says about Utku lives
in [`src/data`](src/data) as plain TypeScript objects validated against the
interfaces in [`src/types`](src/types). Adding a project is a data edit, never a
component edit.

Each data file exports twice on purpose:

```ts
const projectsData = [...] as const satisfies readonly Project[];
export type ProjectSlug = (typeof projectsData)[number]["slug"]; // exact literals
export const projects: readonly Project[] = projectsData;        // ergonomic to consume
```

`as const satisfies` validates every entry *and* keeps literal types, which is
what makes `ProjectSlug` exact. Those literals are too narrow to consume — a
project whose `links` is `{}` would make `links.github` a compile error — so
components import the widened export.

**Client components are interaction shells.** `ProjectCard` is the only client
component in the projects section; the card's content is passed in as
server-rendered `children`, so the browser downloads the behaviour and not the
markup that produces it. The cursor spotlight uses Motion's *motion values*,
which write straight to the DOM — the card re-renders zero times while the
pointer moves across it.

**One hue drives the palette.** `--brand-hue` in
[`globals.css`](src/app/globals.css) is lifted from the header colour of the PDF
résumé, so the document and the site read as one identity. Colours are authored
in OKLCH; contrast ratios were computed against WCAG rather than eyeballed.

**Motion is a preference.** `MotionConfig reducedMotion="user"` plus a global
`prefers-reduced-motion` rule means no animation in the app has to remember to
check.

**The contact form has no backend.** It posts to a Server Action, which
validates server-side and forwards the message through Resend's REST API — one
`fetch`, no SDK. Spam is handled by an off-screen honeypot field rather than a
captcha, plus a fixed-window rate limit on the send itself (the honeypot catches
indiscriminate form-fillers; it does nothing about a loop). Next verifies the
request `Origin` against the `Host` and caps the body at 1MB before the action
runs, so CSRF and payload limits are already covered.

Without `RESEND_API_KEY` the form still validates, keeps what was typed and
points the visitor at the direct email address — it degrades, it does not break.

## Getting started

```bash
pnpm install
pnpm dev
```

| Script | Does |
|---|---|
| `pnpm dev` | Dev server on `:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (`any` is an error) |
| `pnpm lint:fix` | ESLint with `--fix` |
| `pnpm verify` | typecheck + lint + build — run before pushing |

## Structure

```
src/
├── app/                    routes, metadata, sitemap, generated OG images
│   └── projects/[slug]/    statically generated case studies
├── components/
│   ├── ui/                 primitives (Button, Badge)
│   ├── layout/             Navbar, Footer, Providers, ThemeToggle
│   ├── sections/           Hero, Skills, Projects
│   └── shared/             SectionHeading, icons, JSON-LD
├── config/site.ts          site metadata + navigation
├── data/                   the content
├── hooks/                  scroll spy, scroll state, local time
├── lib/
│   ├── actions/            the contact Server Action
│   ├── email.ts            Resend over `fetch`, server-only
│   ├── rate-limit.ts       fixed-window counter
│   └── …                   cn(), date formatting, motion variants
└── types/                  the domain model
```

## Deploying

Import the repository on Vercel; the defaults are correct.

Canonical URLs, Open Graph URLs and `sitemap.xml` are all derived from one
value. On Vercel it resolves automatically from `VERCEL_PROJECT_PRODUCTION_URL`,
which is set on preview deployments too — so a preview's canonical URL points at
production rather than at itself, which is what you want. Once a custom domain is
attached, set:

```
NEXT_PUBLIC_SITE_URL=https://utkualtinay.dev
```

To make the contact form deliver, add a [Resend](https://resend.com) key:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=altinayutku0@gmail.com     # optional, defaults to the address in src/data/profile.ts
CONTACT_FROM_EMAIL=hello@utkualtinay.dev   # optional, needs a verified domain
```

See [`.env.example`](.env.example) for the full annotated list.

## Licence

[MIT](LICENSE). The code is yours to learn from; the content — the CV text,
project write-ups and images — is not.

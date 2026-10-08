import type { Project } from "@/types";

/**
 * Every entry answers three questions in order: what was broken, what I built,
 * and what changed. Technology lists come last on purpose — they're the least
 * interesting thing about a project.
 */
const projectsData = [
  {
    slug: "fitapp",
    title: "FitApp",
    tagline: "One .NET API, three native clients, and the habits that keep someone coming back.",
    problem:
      "Fitness tracking data is only useful when it follows the person, not the device — and a tracker nobody opens after the second week is not useful at all. Building the same feature set three times, once per platform, would have meant three sources of truth and three sets of bugs; building only the tracking would have meant an app with nothing to come back for.",
    solution:
      "One C# .NET 8 API over MySQL as the single source of truth, with thin clients on top: SwiftUI on iOS, Kotlin on Android and Next.js on the web. Beyond logging meals, water, steps and workouts, the server runs what makes it a habit — a Gemini-backed coach, daily and friend quests, a gold balance with a shop, a leaderboard, and chat over SignalR. Auth, validation and every rule live in the API; the clients present state and collect input.",
    impact:
      "A feature is one API change and three presentation layers, instead of three implementations that drift apart — and the reason to open it on day thirty is a server-side system rather than a notification.",
    role:
      "Solo developer — API design, data model, all three clients and deployment.",
    domain: "full-stack",
    status: "live",
    featured: true,
    period: { start: "2026-05", end: null },
    stack: [
      { name: "C#", kind: "language" },
      { name: "Swift", kind: "language" },
      { name: "Kotlin", kind: "language" },
      { name: "TypeScript", kind: "language" },
      { name: ".NET 8", kind: "framework" },
      { name: "SwiftUI", kind: "framework" },
      { name: "Next.js", kind: "framework" },
      { name: "EF Core", kind: "framework" },
      { name: "SignalR", kind: "framework" },
      { name: "MySQL", kind: "database" },
      { name: "AWS", kind: "platform" },
      { name: "JWT", kind: "tooling" },
    ],
    architecture: [
      {
        name: "Clients",
        tech: ["SwiftUI (iOS)", "Kotlin (Android)", "Next.js (Web)"],
        responsibility:
          "Render state and capture input. No business rules, so no platform can disagree with another about a calorie, a streak or a balance.",
      },
      {
        name: "API",
        tech: [".NET 8", "JWT", "BCrypt", "Google sign-in"],
        responsibility:
          "Authentication, validation and every calculation — the one place a rule is written down, behind an OpenAPI document the clients are built against.",
      },
      {
        name: "Engagement services",
        tech: ["Gemini", "SignalR", "Daily & friend quests", "Gold and shop"],
        responsibility:
          "The coach, the quests, the currency and the leaderboard: each its own service, because the part of a fitness app that decides whether it survives month one is not the part that adds up calories.",
      },
      {
        name: "Persistence & media",
        tech: ["EF Core 8", "MySQL on AWS RDS", "Cloudinary", "S3"],
        responsibility:
          "A relational schema for users, meals, workouts, quests and balances, grown through migrations rather than rewritten; images go to object storage, never into the database.",
      },
    ],
    decisions: [
      {
        title: "Business logic in the API, never in the client",
        rationale:
          "A calorie formula duplicated across Swift, Kotlin and TypeScript is a formula that will eventually give three different answers. Keeping it server-side made the clients replaceable — and made the web client possible at all without a fourth implementation.",
      },
      {
        title: "The AI coach lives on the server",
        rationale:
          "Calling a model from three apps would mean shipping the key in three binaries and begging for an app-store release every time the prompt is wrong. The coach is one service behind the API: the key never leaves the server, and the advice can change on a Tuesday afternoon.",
      },
      {
        title: "Gamification is a schema, not a feature flag",
        rationale:
          "Quests, gold, the shop and the leaderboard are their own tables and their own services rather than conditionals bolted onto the tracking code. Adding a quest type is a row; it is the difference between a system that grows and one that accumulates special cases.",
      },
      {
        title: "Stateless JWT auth",
        rationale:
          "Three clients with different session lifecycles meant server-side sessions would have become the bottleneck. Token-based auth let each platform manage refresh the way its own SDK expects.",
      },
    ],
    links: {
      demo: "https://fitapp-fitapp-web.46.225.37.55.sslip.io/",
      // No `github`: the four repositories (iOS, Android, web, API) are private.
    },
    cover: {
      src: "/images/projects/fitapp.jpg",
      alt: "The FitApp dashboard shown on the web, on iOS and on Android at the same time.",
      width: 800,
      height: 500,
    },
    gallery: [
      {
        src: "/images/projects/fitapp-ai-coach-ios.jpg",
        alt: "The AI coach screen on iOS, answering a question about the day's plan.",
        width: 750,
        height: 1630,
        caption:
          "The Gemini-backed coach. It runs behind the API, so the key stays on the server and the prompt changes without an app release.",
      },
      {
        src: "/images/projects/fitapp-leaderboard-android.jpg",
        alt: "The leaderboard on Android, ranking users by their gold balance.",
        width: 750,
        height: 1673,
        caption:
          "Leaderboard, quests and a gold balance — the same services on every client, because the ranking has to agree with itself.",
      },
      {
        src: "/images/projects/fitapp-workouts-web.jpg",
        alt: "Workout programs on the web client, with exercises and progress.",
        width: 1200,
        height: 1272,
        caption: "Workout programs on the web client, built from the same endpoints the phones use.",
      },
      {
        src: "/images/projects/fitapp-report-web.jpg",
        alt: "The daily report on the web client: calories, water, steps and workout totals.",
        width: 1200,
        height: 857,
        caption: "The daily report — the numbers every client renders and none of them calculates.",
      },
    ],
  },
  {
    slug: "revio",
    title: "Revio",
    tagline: "Customer feedback from a tap on the counter — no app, no sign-up.",
    problem:
      "A café or a hairdresser finds out a visit went badly when the one-star review is already public. Asking at the counter rarely works either: the honest answer is the one people will not give to your face, and every alternative — find the listing, sign in, write something — loses almost everyone before the first tap.",
    solution:
      "A multi-tenant SaaS. Each business gets NFC cards for its counter and tables; the customer holds a phone to one, rates the visit in a few seconds and can leave a note, with nothing installed and no account created. Behind the tap is a .NET 8 API in a clean architecture — CQRS through MediatR, EF Core over MySQL, Redis on the hot path and Hangfire pulling Google Business Profile reviews in overnight — and a React dashboard where scores, notes and Google reviews meet, split by table, till and staff member.",
    impact:
      "An unhappy customer reaches the owner before they reach Google — while they are still standing in the shop, and in time for someone to do something about it.",
    role:
      "Solo developer — architecture, API, background jobs, dashboard and deployment.",
    domain: "saas",
    status: "live",
    featured: true,
    // Approximate: the month the first cards went out.
    period: { start: "2025-01", end: null },
    stack: [
      { name: "C#", kind: "language" },
      { name: "TypeScript", kind: "language" },
      { name: ".NET 8", kind: "framework" },
      { name: "MediatR", kind: "framework" },
      { name: "EF Core", kind: "framework" },
      { name: "React", kind: "framework" },
      { name: "Tailwind CSS", kind: "framework" },
      { name: "MySQL", kind: "database" },
      { name: "Redis", kind: "database" },
      { name: "Hangfire", kind: "tooling" },
      { name: "Docker", kind: "tooling" },
      { name: "NFC / NDEF", kind: "platform" },
      { name: "Google Business Profile API", kind: "platform" },
    ],
    architecture: [
      {
        name: "Physical layer",
        tech: ["NFC tags", "QR fallback"],
        responsibility:
          "Each card encodes a URL carrying its own business and placement, so a score arrives already knowing which table it came from.",
      },
      {
        name: "Scan endpoint",
        tech: ["ASP.NET Core", "Redis"],
        responsibility:
          "The hot path. Card and business are read from cache, the scan is logged out of band, and the customer is redirected — this is the one request in the system that is allowed to be slow for nobody.",
      },
      {
        name: "API",
        tech: [".NET 8", "MediatR (CQRS)", "FluentValidation", "EF Core 8"],
        responsibility:
          "Domain, Application, Infrastructure and Api as separate projects with dependencies pointing inward only; the domain project references no packages at all.",
      },
      {
        name: "Background jobs",
        tech: ["Hangfire", "Google Business Profile API"],
        responsibility:
          "Overnight review sync, queued as one job per business so a single failing account cannot block the rest, and idempotent on Google's own review id.",
      },
      {
        name: "Dashboard",
        tech: ["React", "Vite", "TanStack Query", "Recharts"],
        responsibility:
          "Score distribution, busy hours and recurring complaints, with Google's reviews beside the business's own.",
      },
    ],
    decisions: [
      {
        title: "The star filter is an ordering, not a gate",
        rationale:
          "Routing only happy customers to Google is called review gating, and Google's own policy forbids selectively soliciting positive reviews — a business caught doing it can lose its reviews outright. So the rating decides which screen comes first, not which doors exist: someone who rates one star still sees the Google option, they just see the \"tell the business directly\" form before it. The legitimate way to have fewer bad reviews is to fix the visit while the customer is still in the room.",
      },
      {
        title: "One platform Google account, added as a manager",
        rationale:
          "The first design asked each business to paste its own authorisation into the panel. Google's access tokens expire after an hour, so the nightly sync broke by the next morning; working with refresh tokens instead needs a client id and secret per business, which is not something you can ask a hairdresser to generate. Now the owner adds the platform's support address as a manager on their own profile — no token, no password, revocable from Google's settings in one click.",
      },
      {
        title: "Tenant isolation as a query filter, not a WHERE clause",
        rationale:
          "Every tenant-scoped entity carries a global query filter, and the check that a location belongs to the asking tenant runs on the server rather than in the panel. Filtering in application code is one forgotten clause away from showing a café another café's reviews; hiding the option in the UI only stops the people who use the UI.",
      },
      {
        title: "Compute first, ask a model second",
        rationale:
          "Review insights are calculated deterministically wherever the arithmetic is enough, and only the parts that need language go to a model — Gemini first, Claude as a fallback when Gemini fails, under a daily cap, and the feature degrades quietly when no key is configured. A summary that costs money and can hallucinate should be the exception, not the pipeline.",
      },
    ],
    metrics: [
      { label: "Automated tests", value: "878 across 111 files" },
      { label: "Packages referenced by the domain layer", value: "0" },
    ],
    links: {
      demo: "https://www.revioapp.com.tr/",
      // No `github`: the repository is private.
    },
    cover: {
      src: "/images/projects/revio.jpg",
      alt: "The Revio landing page: 'Find out what your customer thinks before they leave the table'.",
      width: 800,
      height: 503,
    },
    gallery: [
      {
        src: "/images/projects/revio-steps.jpg",
        alt: "Three steps: the customer taps the card, rates the visit, the owner watches the panel.",
        width: 800,
        height: 500,
        caption: "Three steps, no setup — the whole product in one screen.",
      },
      {
        src: "/images/projects/revio-google.jpg",
        alt: "The Google Business Profile section explaining read-only access and revocable permission.",
        width: 800,
        height: 500,
        caption:
          "Google reviews land in the same panel — read-only, and revocable from Google's own settings.",
      },
    ],
  },
  {
    slug: "armenu",
    title: "ArMenu",
    tagline: "Multi-tenant QR menus with in-browser AR — and no app to install.",
    problem:
      "A printed menu cannot show a guest what a dish looks like, cannot be read in their language, and cannot be changed without a reprint. Every digital answer to that asks the guest to install something, which at a restaurant table is where the idea dies.",
    solution:
      "A multi-tenant B2B SaaS. A guest scans the QR code on the table, reads the menu in their own language, and places a dish on the table in augmented reality through model-viewer — in the browser they already have open. Behind it: a .NET 10 API over PostgreSQL, and a separate Node service that turns an uploaded 3D model into optimised GLB, USDZ and poster images.",
    impact:
      "Restaurants change their own menus; guests see a dish before they order it. Neither side installs anything.",
    role:
      "Solo developer — API, both React apps, the 3D asset pipeline, delivery and observability.",
    domain: "saas",
    status: "live",
    featured: true,
    // Matches the repository: first commit 2026-09.
    period: { start: "2026-09", end: null },
    stack: [
      { name: "C#", kind: "language" },
      { name: "TypeScript", kind: "language" },
      { name: ".NET 10", kind: "framework" },
      { name: "ASP.NET Core", kind: "framework" },
      { name: "EF Core", kind: "framework" },
      { name: "React 19", kind: "framework" },
      { name: "Tailwind CSS", kind: "framework" },
      { name: "PostgreSQL", kind: "database" },
      { name: "S3 storage", kind: "platform" },
      { name: "WebAR", kind: "platform" },
      { name: "Docker", kind: "tooling" },
      { name: "OpenTelemetry", kind: "tooling" },
    ],
    architecture: [
      {
        name: "Guest & dashboard apps",
        tech: ["React 19", "TanStack Router + Query", "Vite", "React Aria"],
        responsibility:
          "Two static apps on a CDN. The guest app has to open instantly on mobile data; the dashboard is where owners edit their own menus.",
      },
      {
        name: "API",
        tech: [".NET 10", "Minimal APIs", "CQRS", "JWT per tenant"],
        responsibility:
          "Every rule in one place, behind a committed OpenAPI contract that generates the clients' TypeScript types.",
      },
      {
        name: "Persistence",
        tech: ["PostgreSQL 18", "EF Core 10", "Row-level security"],
        responsibility:
          "Tenant isolation enforced by the database itself, not by remembering to filter.",
      },
      {
        name: "Asset pipeline",
        tech: ["Node.js", "glTF Transform", "meshoptimizer", "headless Chrome"],
        responsibility:
          "Turns an uploaded model into Meshopt + WebP GLB, a USDZ for iOS Quick Look, and poster images.",
      },
    ],
    decisions: [
      {
        title: "Row-level security in the database, not in the query layer",
        rationale:
          "A tenant filter that lives in application code is one forgotten WHERE clause away from showing one restaurant another's menu. Pushing isolation into Postgres makes the leak impossible rather than unlikely.",
      },
      {
        title: "Clean Architecture enforced by a test, not by discipline",
        rationale:
          "Architecture tests fail the build if a source dependency points outward. A layering rule that is only written in a README is a layering rule that erodes.",
      },
      {
        title: "WebAR instead of a native app",
        rationale:
          "A diner standing at a table will not install an app to look at a menu. model-viewer loads on demand, so the guests who never open AR never pay for it.",
      },
      {
        title: "A separate service for 3D assets",
        rationale:
          "Mesh optimisation is slow and CPU-bound. Keeping it out of the API means one large upload can never make a menu request wait behind it.",
      },
    ],
    // Measured, not estimated: production build, Lighthouse 13 mobile profile,
    // median of three runs. Numbers belong here only when they came from a run.
    metrics: [
      { label: "Lighthouse (perf / a11y / BP / SEO)", value: "98 / 100 / 100 / 100" },
      { label: "Total blocking time · layout shift", value: "0 ms · 0" },
      { label: "Startup JavaScript (gzip)", value: "117 KiB" },
      { label: "3D stack, loaded on demand (gzip)", value: "291 KiB" },
    ],
    links: {
      github: "https://github.com/utku458/ar-menu",
      demo: "https://armenu-guest.46.225.37.55.sslip.io/",
    },
    cover: {
      src: "/images/projects/armenu.jpg",
      alt: "The ArMenu owner dashboard beside the guest app showing a burger in 3D with an AR button.",
      width: 800,
      height: 500,
    },
    gallery: [
      {
        src: "/images/projects/armenu-guest-menu.jpg",
        alt: "The guest menu on a phone: search, filters, categories and a dish carrying a 3D badge.",
        width: 750,
        height: 1624,
        caption: "What the guest sees after scanning the QR code on the table.",
      },
      {
        src: "/images/projects/armenu-guest-ar.jpg",
        alt: "A dish opened on a phone, rendered in 3D, with a 'See it on your table' button.",
        width: 750,
        height: 1624,
        caption:
          "The 3D stack loads only when a dish with a model is opened — guests who never use AR never pay for it.",
      },
      {
        src: "/images/projects/armenu-dashboard-qr.jpg",
        alt: "The dashboard's QR screen with a menu link, SVG and PNG downloads and printable per-table cards.",
        width: 800,
        height: 500,
        caption: "Per-table QR cards, printed from the dashboard — the table number travels with the scan.",
      },
    ],
  },
  {
    slug: "ttrpg-companion",
    title: "TTRPG Companion",
    tagline: "A real-time table for a tabletop campaign — and a server nobody has to trust.",
    problem:
      "Running a tabletop campaign means tracking hit points, initiative order, inventory, status effects and relationships across paper sheets and a group chat. When part of the table is remote, all of that shared state lives in one person's head — and so does every dice roll, which everyone else simply has to believe.",
    solution:
      "A turn-based companion for the campaign I run with friends. One Expo client — iOS, Android and, through react-native-web, a plain browser link — talks to a .NET 8 API over a SignalR hub, so every player sees the same sheets, the same initiative order and the same combat turn as it happens. The rules live on the server: around forty domain services covering dice, combat phases, traits, status effects, triggered reactions, arena modifiers and a day-and-rest cycle.",
    impact:
      "Friends join from a link with nothing installed, the session survives a mid-game deploy, and no one has to take anyone's word for a roll.",
    role:
      "Solo developer — the API, the real-time hub, the rules engine and the client.",
    domain: "full-stack",
    status: "live",
    featured: true,
    period: { start: "2026-06", end: null },
    stack: [
      { name: "TypeScript", kind: "language" },
      { name: "C#", kind: "language" },
      { name: "React Native", kind: "framework" },
      { name: "Expo", kind: "framework" },
      { name: ".NET 8", kind: "framework" },
      { name: "SignalR", kind: "framework" },
      { name: "EF Core", kind: "framework" },
      { name: "PostgreSQL", kind: "database" },
      { name: "SQLite", kind: "database" },
      { name: "Railway", kind: "platform" },
    ],
    architecture: [
      {
        name: "Client",
        tech: ["Expo", "React Native", "expo-router", "react-native-web"],
        responsibility:
          "One codebase for iOS, Android and the browser. The web build is the one that gets used: a link in the group chat beats asking five people to install something.",
      },
      {
        name: "Real-time hub",
        tech: ["SignalR", ".NET 8"],
        responsibility:
          "Every action at the table — joining, rolling, attacking, ending a turn — is a hub method broadcast to the room. Rejoining re-reads the current state instead of replaying what was missed.",
      },
      {
        name: "Rules engine",
        tech: ["C#", "Domain services"],
        responsibility:
          "Dice, combat phases, traits, status effects, triggered reactions and arena modifiers. Each rule is one service, so a new mechanic is a new file rather than another branch in an existing one.",
      },
      {
        name: "Persistence",
        tech: ["EF Core 8", "PostgreSQL", "SQLite"],
        responsibility:
          "Rooms, characters, initiative and the live combat turn are rows, not memory. SQLite locally and PostgreSQL in deployment, behind the same context.",
      },
    ],
    decisions: [
      {
        title: "The server rolls the dice",
        rationale:
          "A client that generates its own numbers is a client that can be persuaded to generate better ones. The raw d20 is rolled server-side, and the modifiers from stats, equipment and relationships are applied there too — so the result that reaches the table is one nobody could have edited on the way.",
      },
      {
        title: "But a real die still counts",
        rationale:
          "People at a physical table are not going to put their dice away, and an app that tells them to is an app they close. Alongside the server roll there is a path for submitting a number you rolled yourself; the same rules apply to it. The anti-cheat protects the remote players without disciplining the ones in the room.",
      },
      {
        title: "Connections in memory, the game in the database",
        rationale:
          "SignalR connections are disposable — a phone sleeps, a tunnel drops, a deploy restarts the process. Treating them as the source of truth would mean a lost connection is a lost session. The room state is persisted instead, so reconnecting is a read rather than a recovery.",
      },
      {
        title: "What a game master may do is a server rule",
        rationale:
          "Spectator, player and director join through separate hub methods with their own access level, instead of the client hiding buttons it hopes nobody finds. Authority that only exists in the UI is authority anyone can grant themselves with developer tools.",
      },
    ],
    links: {
      demo: "https://honest-fulfillment-dnd-fronend.46.225.37.55.sslip.io/",
      // No `github`: the repository is private.
    },
    cover: {
      src: "/images/projects/ttrpg-companion.jpg",
      alt: "A character sheet and the pixel-art battle arena, side by side on two phones.",
      width: 800,
      height: 500,
    },
    gallery: [
      {
        src: "/images/projects/ttrpg-companion-combat.jpg",
        alt: "The battle arena: pixel-art sprites in a back street, with the turn order and the attack-roll panel below.",
        width: 646,
        height: 1400,
        caption:
          "A contested attack in progress. The attacker enters their roll, the defence opens on the other player's device, and the server decides the outcome.",
      },
      {
        src: "/images/projects/ttrpg-companion-select.jpg",
        alt: "Character selection: a pixel-art portrait with health, strength, agility, honour and money, and a backstory.",
        width: 646,
        height: 1400,
        caption:
          "Three playable characters, each with stats and the part of the story they walked in from.",
      },
      {
        src: "/images/projects/ttrpg-companion-sheet.jpg",
        alt: "A character sheet with a health bar, a connection badge, and sections for stats, abilities, items, conditions, story, wallet and relationships.",
        width: 646,
        height: 1400,
        caption:
          "The sheet every player sees update live — the badge in the corner is the SignalR connection, not decoration.",
      },
    ],
  },
  {
    slug: "bt-support",
    title: "BT Support",
    tagline: "A request-tracking Android app for in-house IT teams.",
    problem:
      "During my internship I watched support requests arrive by phone call, chat message and corridor conversation. Nothing was tracked, so nothing could be prioritised.",
    solution:
      "A native Android app where employees file a request and IT staff see a single prioritised queue, backed by Firebase for realtime updates and auth.",
    impact:
      "Requests became a list with a state instead of an interruption — the problem I had spent a year living inside.",
    role: "Solo developer — Android client and data model.",
    domain: "mobile",
    status: "archived",
    featured: false,
    // Matches the repository: the project was committed in 2024-12.
    period: { start: "2024-09", end: "2024-12" },
    stack: [
      { name: "Kotlin", kind: "language" },
      { name: "Android SDK", kind: "framework" },
      { name: "Firebase", kind: "platform" },
    ],
    decisions: [
      {
        title: "Firebase instead of a custom backend",
        rationale:
          "The feature that mattered was realtime queue updates for a handful of internal users. Building an API for that would have been architecture for its own sake.",
      },
    ],
    links: {
      github: "https://github.com/utku458/BT-Destek",
    },
    cover: {
      src: "/images/projects/bt-support.jpg",
      alt: "The entity-relationship diagram behind BT Support: users, requests, topics and messages.",
      width: 800,
      height: 500,
    },
    gallery: [
      {
        src: "/images/projects/bt-support-use-case.png",
        alt: "Use-case diagram separating what an employee can do from what IT staff can do.",
        width: 1873,
        height: 812,
        caption:
          "The use-case diagram that set the two roles apart before any screen existed — an employee files, IT prioritises.",
      },
    ],
  },
] as const satisfies readonly Project[];

/**
 * Two exports, on purpose.
 *
 * `projectsData` is authored with `as const satisfies`, which validates every
 * entry against `Project` *and* keeps the literal types — that is what makes
 * `ProjectSlug` below exact rather than `string`.
 *
 * But those literal types are too narrow to consume: a project whose `links` is
 * `{}` gets the type `{}`, so `project.links.github` would be a compile error in
 * the card even though the field is optional on `Project`. The widened export is
 * what components import.
 */
export type ProjectSlug = (typeof projectsData)[number]["slug"];

export const projects: readonly Project[] = projectsData;

/** Grid order is the order in this file. */
export const featuredProjects: readonly Project[] = projects.filter(
  (project) => project.featured,
);

export const otherProjects: readonly Project[] = projects.filter(
  (project) => !project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

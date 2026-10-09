/**
 * The English dictionary, and the shape every other locale must match.
 *
 * `tr.ts` is typed as `typeof en`, so a missing key, a stray key or a changed
 * value type is a compile error rather than an English word surfacing in the
 * middle of a Turkish page. This is the same reason the content files are typed
 * against a slug union: translation drift should be caught by `pnpm verify`,
 * not by a visitor.
 */
export const en = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Résumé",
    downloadResume: "Download résumé",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    menuTitle: "Menu",
    menuDescription: "Jump to a section of the page.",
    home: "home",
    skipToContent: "Skip to content",
    primary: "Primary",
    mobile: "Mobile",
    footer: "Footer",
    backToTop: "Back to top",
  },
  theme: {
    toggle: "Toggle theme",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  language: {
    label: "Language",
    switchTo: "Switch to Türkçe",
  },
  hero: {
    availability: {
      "open-to-work": "Open to new opportunities",
      "open-to-offers": "Open to interesting offers",
      "not-looking": "Not currently looking",
    },
    viewProjects: "View projects",
  },
  glance: {
    availabilityNote: {
      "open-to-work": "Open to full-time roles and selective freelance work.",
      "open-to-offers": "Open to the right offer.",
      "not-looking": "Heads-down on current work.",
    },
    currently: "Currently",
    basedIn: "Based in",
    localTime: "local time",
    /** "{field} at {institution}" — Turkish puts the place first, so the whole
        sentence is a template rather than two strings glued with a word. */
    studyingAt: "{field} at {institution}.",
  },
  stats: {
    projects: "Projects built",
    languages: "Languages used",
    experience: "Years writing code",
    industry: "Months in enterprise IT",
  },
  about: {
    eyebrow: "01 — About",
    title: "Where I come from",
    languagesHeading: "Languages",
    languageLevel: {
      native: "Native",
      professional: "Professional",
      intermediate: "Intermediate",
      elementary: "Elementary",
    },
  },
  skills: {
    eyebrow: "02 — Skills",
    title: "What I work with",
    lead: "Grouped by where each piece sits in the stack. Hover or focus any item to see what I actually built with it — a badge with no project behind it is decoration, not evidence.",
    level: {
      core: "Core — reach for it daily",
      proficient: "Proficient — shipped production work with it",
      familiar: "Familiar — used it, still growing",
    },
  },
  projects: {
    eyebrow: "03 — Projects",
    title: "Things I have built",
    lead: "Every one of these started as a problem somebody actually had. Each card opens into a case study: the architecture, and the decisions behind it.",
    readCaseStudy: "Read the case study",
    theProblem: "The problem",
    whatIBuilt: "What I built",
    status: {
      live: "Live",
      "in-development": "In development",
      archived: "Archived",
      concept: "Concept",
    },
    domain: {
      "full-stack": "Full-stack",
      mobile: "Mobile",
      saas: "SaaS",
      automation: "Automation",
      web: "Web",
    },
    links: {
      demo: "Live demo",
      github: "Source",
      appStore: "App Store",
      playStore: "Google Play",
    },
  },
  caseStudy: {
    allProjects: "All projects",
    myRole: "My role",
    status: "Status",
    theProblem: "The problem",
    whatIBuilt: "What I built",
    whatItLooksLike: "What it looks like",
    architecture: "Architecture",
    decisions: "Decisions & trade-offs",
    outcome: "Outcome",
    measured: "Measured",
    stack: "Stack",
    techKind: {
      language: "Languages",
      framework: "Frameworks",
      database: "Data",
      platform: "Platform",
      tooling: "Tooling",
    },
    otherProjects: "Other projects",
    previous: "Previous",
    next: "Next",
    notFound: "Project not found",
  },
  experience: {
    eyebrow: "04 — Experience",
    title: "Work and study, in order",
    lead: "Two degrees and an enterprise IT floor, mostly overlapping. The analytical half and the engineering half arrived at the same time.",
    present: "Present",
    work: "Work",
    education: "Education",
    employmentType: {
      "full-time": "Full-time",
      "part-time": "Part-time",
      internship: "Internship",
      freelance: "Freelance",
    },
  },
  contact: {
    eyebrow: "05 — Contact",
    title: "Let's talk",
    lead: "Open to full-time roles and to interesting freelance work. If you have a problem that needs an architecture rather than a page, I would like to hear about it.",
    copyEmail: "Copy email address",
    copied: "Copied",
    orEmailDirectly: "or email me directly",
    form: {
      name: "Your name",
      email: "Your email",
      message: "Message",
      messagePlaceholder: "What are you working on?",
      send: "Send message",
      sending: "Sending…",
      nameRequired: "Please tell me your name.",
      nameTooLong: "Keep this under {max} characters.",
      emailInvalid: "That does not look like an email address.",
      emailTooLong: "That address is too long.",
      messageTooShort: "A little more detail, please — at least {min} characters.",
      messageTooLong: "Keep this under {max} characters.",
      checkFields: "Please check the highlighted fields.",
      success: "Thanks — your message is on its way. I usually reply within a day.",
      failed: "Something went wrong on my end. Please email me directly at {email}.",
      rateLimited:
        "That is a lot of messages at once. Please try again in {minutes} minutes, or email me directly at {email}.",
    },
  },
  footer: {
    availability: "Currently open to new opportunities.",
    builtWith: "Built with Next.js and Tailwind CSS.",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    lead: "That link does not lead anywhere. It may have moved, or it may never have existed.",
    backHome: "Back to the homepage",
  },
};

/**
 * Deliberately not `as const`: the values are widened to `string` so this reads
 * as the *shape* a locale must fill, not the English words it must repeat.
 */
export type Dictionary = typeof en;

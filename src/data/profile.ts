import type { Profile } from "@/types";

const profileData = {
  name: "Utku Altınay",
  initials: "UA",
  title: "Full-Stack Developer",
  headline:
    "I build multi-platform systems — one .NET API at the centre, native iOS, Android and React clients around it.",
  bio: [
    "I'm a full-stack developer based in İstanbul. I arrived here through two complementary routes: an Associate degree in Computer Programming at İstanbul Arel, and Management Information Systems at İstanbul Medipol. That mix is why I tend to start from the business process and work back to the architecture, instead of the other way around.",
    "Most of what I build is multi-platform. A C# .NET API with a MySQL store sits in the middle, and Kotlin, Swift and React clients sit around it. Designing that boundary well — one contract, three very different consumers — is the part of the job I enjoy most.",
    "I also automate the unglamorous parts. n8n workflows, NFC-driven review collection and WebAR menus all started as a small-business problem someone described to me in a single sentence.",
  ],
  availability: "open-to-work",
  contact: {
    email: "altinayutku0@gmail.com",
    location: "İstanbul, Türkiye",
    timezone: "Europe/Istanbul",
    // `phone` deliberately omitted: a public page is a scraping target.
    // The number stays on the downloadable CV.
  },
  socials: [
    {
      platform: "github",
      label: "GitHub profile",
      href: "https://github.com/utku458",
      handle: "@utku458",
    },
    {
      platform: "linkedin",
      label: "LinkedIn profile",
      href: "https://www.linkedin.com/in/utku-alt%C4%B1nay-7620b3336/",
      handle: "Utku Altınay",
    },
    {
      platform: "email",
      label: "Send an email",
      href: "mailto:altinayutku0@gmail.com",
      handle: "altinayutku0@gmail.com",
    },
  ],
  languages: [
    { name: "Turkish", level: "native" },
    { name: "English", level: "professional" },
    // Deliberately the conservative end of the scale: a language level is the
    // easiest claim on a CV to test in the first five minutes of an interview.
    { name: "Japanese", level: "elementary" },
  ],
  experience: [
    {
      id: "innova-bilisim",
      company: "İnnova Bilişim Çözümleri",
      role: "IT Support Intern",
      type: "internship",
      location: "İstanbul, Türkiye",
      period: { start: "2022-09", end: "2023-06" },
      summary:
        "Twelve months inside the IT operations of a large systems integrator — nine months long-term plus a three-month placement.",
      achievements: [
        "Handled first- and second-line support requests for internal users, reproducing issues before escalating them.",
        "Worked day to day inside an enterprise ticketing and asset-tracking process — the direct reason I later built a request-tracking tool of my own.",
        // Worth adding, when there is a number to add: a system touched, a
        // ticket volume, a tool introduced. Specifics beat adjectives.
      ],
      tech: ["Windows Server", "Active Directory", "Ticketing systems"],
    },
  ],
  education: [
    {
      id: "medipol-mis",
      institution: "İstanbul Medipol Üniversitesi",
      degree: "Bachelor's Degree",
      field: "Management Information Systems",
      // Month precision, approximate to the start of the academic year.
      period: { start: "2023-09", end: null },
      note: "Where the analytical half comes from: process modelling, data management and reading a business requirement before writing code for it.",
    },
    {
      id: "arel-computer-programming",
      institution: "İstanbul Arel Üniversitesi",
      degree: "Associate Degree",
      field: "Computer Programming",
      period: { start: "2021-01", end: "2023-01" },
      note: "The engineering foundation: algorithms, databases and object-oriented design.",
    },
  ],
  // `resumeUrl` deliberately unset. The PDF holds a phone number, a date of
  // birth and a postal code; `public/` is world-readable and search engines
  // index PDF text, so publishing it would undo the omission of `phone` above.
  // Point this at a scrubbed copy when there is one.
} as const satisfies Profile;

/** Widened for consumption — see the note in `projects.ts`. */
export const profile: Profile = profileData;

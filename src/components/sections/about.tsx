import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProfile } from "@/data";
import { getDictionary, getLocale } from "@/i18n";
import type { LanguageLevel } from "@/types";

/** Filled dots out of four — a level anyone can read at a glance. */
const LANGUAGE_DOTS: Record<LanguageLevel, number> = {
  native: 4,
  professional: 3,
  intermediate: 2,
  elementary: 1,
};

function LanguageMeter({ level }: { readonly level: LanguageLevel }) {
  const filled = LANGUAGE_DOTS[level];
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={
            index < filled
              ? "size-1.5 rounded-full bg-primary"
              : "size-1.5 rounded-full border border-primary/40"
          }
        />
      ))}
    </span>
  );
}

export async function About() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const profile = getProfile(locale);

  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="max-w-(--measure-prose) space-y-5">
            {profile.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-lg leading-relaxed text-muted-foreground text-pretty-balance"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {dict.experience.education}
              </h3>
              <ul className="mt-4 space-y-4">
                {profile.education.map((entry) => (
                  <li key={entry.id}>
                    <p className="text-sm font-medium">{entry.field}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {entry.institution}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {dict.about.languagesHeading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {profile.languages.map((language) => (
                  <li
                    key={language.name}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span>{language.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {dict.about.languageLevel[language.level]}
                      </span>
                      <LanguageMeter level={language.level} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { navItems, type SectionId } from "@/config/site";
import { getProfile } from "@/data/profile";
import type { Dictionary, Locale } from "@/i18n";

interface FooterProps {
  readonly locale: Locale;
  readonly nav: Dictionary["nav"];
  readonly footer: Dictionary["footer"];
}

/**
 * A server component — no state, no effects, therefore no JavaScript shipped
 * for it at all.
 */
export function Footer({ locale, nav, footer }: FooterProps) {
  const profile = getProfile(locale);
  const year = new Date().getFullYear();

  const labels = {
    about: nav.about,
    skills: nav.skills,
    projects: nav.projects,
    experience: nav.experience,
    contact: nav.contact,
  } satisfies Record<SectionId, string>;

  return (
    <footer className="mt-32 border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-mono text-sm font-medium">
              {profile.initials}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground text-pretty-balance">
              {profile.title} · {profile.contact.location}. {footer.availability}
            </p>
            <SocialLinks socials={profile.socials} className="-ml-2 mt-4" />
          </div>

          <nav aria-label={nav.footer}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${locale}/#${item.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {labels[item.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. {footer.builtWith}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {nav.backToTop}
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}

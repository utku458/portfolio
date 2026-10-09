"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { sectionIds, type SectionId } from "@/config/site";
import { profileFacts } from "@/data/profile";
import { useScrolled, useScrollSpy } from "@/hooks";
import type { Dictionary, Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

interface NavbarProps {
  readonly locale: Locale;
  readonly nav: Dictionary["nav"];
  readonly theme: Dictionary["theme"];
  readonly language: Dictionary["language"];
  readonly socials: readonly SocialLink[];
}

/**
 * Sticky header. It stays transparent over the hero and only grows a border and
 * a blurred backdrop once the page scrolls — so the top of the site reads as
 * one uninterrupted surface.
 *
 * Copy arrives as props rather than through a hook: this is a client component
 * (it watches scroll position), and a dictionary read on the server costs the
 * browser nothing, while a context would ship the strings twice.
 */
export function Navbar({ locale, nav, theme, language, socials }: NavbarProps) {
  const scrolled = useScrolled();
  const activeId = useScrollSpy(sectionIds);

  const labels = {
    about: nav.about,
    skills: nav.skills,
    projects: nav.projects,
    experience: nav.experience,
    contact: nav.contact,
  } satisfies Record<SectionId, string>;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-(--header-height)",
        "transition-[background-color,border-color,backdrop-filter] duration-300 ease-(--ease-out-expo)",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          aria-label={`${profileFacts.name} — ${nav.home}`}
          className="rounded-md font-mono text-sm font-medium tracking-tight transition-colors hover:text-primary"
        >
          {profileFacts.initials}
          <span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:block" aria-label={nav.primary}>
          <NavLinks locale={locale} labels={labels} activeId={activeId} />
        </nav>

        <div className="flex items-center gap-1">
          {profileFacts.resumeUrl && (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <a href={profileFacts.resumeUrl} download>
                {nav.resume}
              </a>
            </Button>
          )}
          <LanguageToggle locale={locale} labels={language} />
          <ThemeToggle labels={theme} />
          <MobileNav locale={locale} nav={nav} socials={socials} activeId={activeId} />
        </div>
      </Container>
    </header>
  );
}

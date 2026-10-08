"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { sectionIds } from "@/config/site";
import { profile } from "@/data";
import { useScrolled, useScrollSpy } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Sticky header. It stays transparent over the hero and only grows a border and
 * a blurred backdrop once the page scrolls — so the top of the site reads as
 * one uninterrupted surface.
 */
export function Navbar() {
  const scrolled = useScrolled();
  const activeId = useScrollSpy(sectionIds);

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
          href="/"
          aria-label={`${profile.name} — home`}
          className="rounded-md font-mono text-sm font-medium tracking-tight transition-colors hover:text-primary"
        >
          {profile.initials}
          <span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <NavLinks activeId={activeId} />
        </nav>

        <div className="flex items-center gap-1">
          {profile.resumeUrl && (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <a href={profile.resumeUrl} download>
                Résumé
              </a>
            </Button>
          )}
          <ThemeToggle />
          <MobileNav activeId={activeId} />
        </div>
      </Container>
    </header>
  );
}

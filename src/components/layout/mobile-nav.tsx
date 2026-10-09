"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { NavLinks } from "@/components/layout/nav-links";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import type { SectionId } from "@/config/site";
import { profileFacts } from "@/data/profile";
import type { Dictionary, Locale } from "@/i18n";
import type { SocialLink } from "@/types";

interface MobileNavProps {
  readonly locale: Locale;
  readonly nav: Dictionary["nav"];
  readonly socials: readonly SocialLink[];
  readonly activeId: string | null;
}

/**
 * Radix Dialog rather than a hand-rolled panel: it traps focus, restores it to
 * the trigger on close, locks body scroll, wires up `aria-modal` and handles
 * Escape. Re-implementing that correctly is a day of work and a source of bugs.
 *
 * The exit animations matter too — Radix keeps the node mounted until the
 * `data-[state=closed]` animation finishes, so the drawer slides out instead of
 * vanishing. Both are disabled automatically under `prefers-reduced-motion`
 * by the global rule in `globals.css`.
 */
export function MobileNav({ locale, nav, socials, activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const labels = {
    about: nav.about,
    skills: nav.skills,
    projects: nav.projects,
    experience: nav.experience,
    contact: nav.contact,
  } satisfies Record<SectionId, string>;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={nav.openMenu}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in md:hidden" />

        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-border bg-background p-6 shadow-2xl data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right md:hidden">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-mono text-sm font-medium tracking-tight">
              {profileFacts.initials}
              <span className="text-primary">.</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={nav.closeMenu}>
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Required by Radix for screen readers; visually redundant here. */}
          <Dialog.Description className="sr-only">{nav.menuDescription}</Dialog.Description>

          <nav className="mt-8 flex-1" aria-label={nav.mobile}>
            <NavLinks
              locale={locale}
              labels={labels}
              activeId={activeId}
              orientation="vertical"
              onNavigate={() => setOpen(false)}
            />
          </nav>

          <div className="space-y-4 border-t border-border pt-6">
            {profileFacts.resumeUrl && (
              <Button asChild variant="outline" size="md" className="w-full">
                <a href={profileFacts.resumeUrl} download>
                  {nav.downloadResume}
                </a>
              </Button>
            )}
            <SocialLinks socials={socials} className="-ml-2" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

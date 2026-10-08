"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { NavLinks } from "@/components/layout/nav-links";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import { profile } from "@/data";

interface MobileNavProps {
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
export function MobileNav({ activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
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
              {profile.initials}
              <span className="text-primary">.</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close navigation menu">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Required by Radix for screen readers; visually redundant here. */}
          <Dialog.Description className="sr-only">
            Jump to a section of the page.
          </Dialog.Description>

          <nav className="mt-8 flex-1" aria-label="Mobile">
            <NavLinks
              activeId={activeId}
              orientation="vertical"
              onNavigate={() => setOpen(false)}
            />
          </nav>

          <div className="space-y-4 border-t border-border pt-6">
            {profile.resumeUrl && (
              <Button asChild variant="outline" size="md" className="w-full">
                <a href={profile.resumeUrl} download>
                  Download résumé
                </a>
              </Button>
            )}
            <SocialLinks className="-ml-2" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { navItems, type SectionId } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  readonly locale: Locale;
  readonly labels: Record<SectionId, string>;
  readonly activeId: string | null;
  /** Called after a link is chosen — lets the mobile drawer close itself. */
  readonly onNavigate?: () => void;
  readonly orientation?: "horizontal" | "vertical";
}

/**
 * The active pill is a single shared element (`layoutId`), so it slides between
 * items instead of fading out and in. One DOM node, no per-item animation state.
 */
export function NavLinks({
  locale,
  labels,
  activeId,
  onNavigate,
  orientation = "horizontal",
}: NavLinksProps) {
  return (
    <ul
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col items-stretch" : "items-center",
      )}
    >
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id} className="relative">
            <Link
              href={`/${locale}/#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative z-10 block rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
                orientation === "vertical" && "px-4 py-3 text-base",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {labels[item.id]}
            </Link>
            {isActive && (
              <motion.span
                layoutId={`nav-active-${orientation}`}
                className="absolute inset-0 rounded-full bg-secondary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

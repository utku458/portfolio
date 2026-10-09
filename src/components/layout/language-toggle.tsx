"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isLocale, locales, localeShortName, type Locale } from "@/i18n/config";

interface LanguageToggleProps {
  readonly locale: Locale;
  readonly labels: { readonly label: string; readonly switchTo: string };
}

/**
 * Swaps the locale segment of the current path, keeping the reader where they
 * are: `/en/projects/armenu` becomes `/tr/projects/armenu`.
 *
 * A real `<Link>`, not a button with an `onClick`. The two languages are two
 * URLs — that is what makes them indexable, shareable and openable in a new
 * tab, and a router push would throw all three away for no gain. The theme
 * toggle beside it is a button precisely because a theme is *not* a URL.
 */
export function LanguageToggle({ locale, labels }: LanguageToggleProps) {
  const pathname = usePathname();
  const next = locales.find((candidate) => candidate !== locale) ?? locale;

  const segments = pathname.split("/");
  // segments[0] is the empty string before the leading slash.
  if (isLocale(segments[1] ?? "")) {
    segments[1] = next;
  } else {
    segments.splice(1, 0, next);
  }
  const href = segments.join("/") || `/${next}`;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      aria-label={labels.switchTo}
      title={labels.switchTo}
    >
      {/*
        `hrefLang` tells assistive tech and crawlers the destination is in
        another language, and `scroll={false}` keeps the reader's position
        through the swap rather than throwing them back to the top.
      */}
      <Link href={href} hrefLang={next} scroll={false}>
        <span className="font-mono text-xs font-medium tracking-tight">
          {localeShortName[next]}
        </span>
      </Link>
    </Button>
  );
}

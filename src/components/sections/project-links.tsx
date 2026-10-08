import { ExternalLink, Smartphone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import type { ProjectLinks } from "@/types";

interface LinkEntry {
  readonly href: string;
  readonly label: string;
  readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * Renders only the links that exist. A row of dead "Demo" buttons is worse than
 * no row at all — it reads as a template that was never filled in.
 */
export function ProjectLinkButtons({
  links,
  title,
}: {
  readonly links: ProjectLinks;
  readonly title: string;
}) {
  const entries: LinkEntry[] = [];
  if (links.demo) {
    entries.push({ href: links.demo, label: "Live demo", icon: ExternalLink });
  }
  if (links.github) {
    entries.push({ href: links.github, label: "Source", icon: GitHubIcon });
  }
  if (links.appStore) {
    entries.push({ href: links.appStore, label: "App Store", icon: Smartphone });
  }
  if (links.playStore) {
    entries.push({ href: links.playStore, label: "Google Play", icon: Smartphone });
  }

  if (entries.length === 0) return null;

  return (
    <>
      {entries.map((entry) => (
        <Button key={entry.label} asChild variant="outline" size="sm">
          <a
            href={entry.href}
            target="_blank"
            rel="noreferrer noopener"
            // Four cards share the same visible label, so the accessible name
            // has to say which project it belongs to.
            aria-label={`${entry.label} — ${title} (opens in a new tab)`}
          >
            <entry.icon aria-hidden />
            {entry.label}
          </a>
        </Button>
      ))}
    </>
  );
}

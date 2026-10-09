import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { ProjectDomain, ProjectStatus } from "@/types";

/**
 * Colour is a fact about the status; the word is a translation.
 *
 * Keeping them apart is what stops a slug leaking into the UI as
 * `in-development` in one place and "In development" in another — and it means
 * adding a locale never touches this file.
 */
const STATUS_STYLE: Record<ProjectStatus, string> = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "in-development": "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  archived: "border-border text-muted-foreground",
  concept: "border-border text-muted-foreground",
};

export function ProjectStatusBadge({
  status,
  labels,
}: {
  readonly status: ProjectStatus;
  readonly labels: Dictionary["projects"]["status"];
}) {
  return (
    <Badge className={cn("border", STATUS_STYLE[status])}>{labels[status]}</Badge>
  );
}

export function ProjectDomainBadge({
  domain,
  labels,
}: {
  readonly domain: ProjectDomain;
  readonly labels: Dictionary["projects"]["domain"];
}) {
  return <Badge variant="outline">{labels[domain]}</Badge>;
}

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectDomain, ProjectStatus } from "@/types";

/**
 * Shared by the card and the case study, so a slug can never leak into the UI
 * as `in-development` in one place and "In development" in the other.
 */
const STATUS: Record<ProjectStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  "in-development": {
    label: "In development",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  archived: { label: "Archived", className: "border-border text-muted-foreground" },
  concept: { label: "Concept", className: "border-border text-muted-foreground" },
};

const DOMAIN_LABEL: Record<ProjectDomain, string> = {
  "full-stack": "Full-stack",
  mobile: "Mobile",
  saas: "SaaS",
  automation: "Automation",
  web: "Web",
};

export function ProjectStatusBadge({ status }: { readonly status: ProjectStatus }) {
  const { label, className } = STATUS[status];
  return <Badge className={cn("border", className)}>{label}</Badge>;
}

export function ProjectDomainBadge({ domain }: { readonly domain: ProjectDomain }) {
  return <Badge variant="outline">{DOMAIN_LABEL[domain]}</Badge>;
}

export function projectStatusLabel(status: ProjectStatus): string {
  return STATUS[status].label;
}

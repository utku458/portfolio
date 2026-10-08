import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  ProjectDomainBadge,
  ProjectStatusBadge,
} from "@/components/sections/project-badges";
import { ProjectCover } from "@/components/sections/project-cover";
import { ProjectLinkButtons } from "@/components/sections/project-links";
import { TechChips } from "@/components/sections/tech-chips";
import { formatDateRange } from "@/lib/format";
import type { Project } from "@/types";

/**
 * A server component rendered *into* the client card as `children`, so the
 * card's markup never reaches the browser bundle.
 */
export function ProjectCardFace({
  project,
  coverPriority = false,
}: {
  readonly project: Project;
  readonly coverPriority?: boolean;
}) {
  return (
    <>
      {project.cover && (
        // Full-bleed inside the card's padding. The card already clips to its
        // radius, so the top corners come for free.
        <div className="-mx-6 -mt-6 mb-7 overflow-hidden border-b border-border sm:-mx-8 sm:-mt-8">
          <div className="aspect-16/10 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-[1.02]">
            <ProjectCover cover={project.cover} priority={coverPriority} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <ProjectStatusBadge status={project.status} />
        <ProjectDomainBadge domain={project.domain} />
        <span className="ms-auto font-mono text-xs text-muted-foreground">
          {formatDateRange(project.period)}
        </span>
      </div>

      {/*
        The "stretched link" pattern: the heading holds the real anchor, and its
        ::after covers the card so the whole surface is clickable. The alternative
        — wrapping the card in an <a> — would nest the GitHub/demo links inside
        another link, which is invalid HTML and breaks keyboard navigation.
      */}
      <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-sm after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted-foreground text-pretty-balance">
        {project.tagline}
      </p>

      {/* Problem before solution. Reversing the two is how a portfolio ends up
          describing features nobody asked about. */}
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
            The problem
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-pretty-balance">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
            What I built
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-pretty-balance">
            {project.solution}
          </dd>
        </div>
      </dl>

      <TechChips stack={project.stack} className="mt-7" />

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
          Read the case study
          <ArrowRight aria-hidden className="size-4" />
        </span>
        {/* Lifted above the stretched link so these stay independently clickable. */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <ProjectLinkButtons links={project.links} title={project.title} />
        </div>
      </div>
    </>
  );
}

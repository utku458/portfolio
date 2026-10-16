import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  ProjectDomainBadge,
  ProjectStatusBadge,
} from "@/components/sections/project-badges";
import { ProjectCover } from "@/components/sections/project-cover";
import { ProjectLinkButtons } from "@/components/sections/project-links";
import { TechChips } from "@/components/sections/tech-chips";
import { getDictionary, getLocale } from "@/i18n";
import { formatDateRange } from "@/lib/format";
import type { Project } from "@/types";

/**
 * A server component rendered *into* the client card as `children`, so the
 * card's markup never reaches the browser bundle.
 */
export async function ProjectCardFace({
  project,
  coverPriority = false,
}: {
  readonly project: Project;
  readonly coverPriority?: boolean;
}) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <div
      className={
        project.cover
          ? "min-[480px]:grid min-[480px]:grid-cols-[12rem_minmax(0,1fr)] min-[480px]:gap-6 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-7 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-9"
          : undefined
      }
    >
      {project.cover && (
        /*
          Full-bleed only on a phone, where the card is under ~430px and these
          screenshots still have pixels to spare. Above that it becomes a fixed
          column — 12rem, then 16rem, then 20rem — instead of spanning the card.

          Those widths are arithmetic, not taste. Most of these covers are
          montages assembled from screenshots that no longer exist, or they sit
          behind a login, so 800px is all the source there will ever be. The
          widest of them, 20rem, asks for 640px on a retina display, which 800px
          covers outright. Spanning the card asked for 1920 and got two-and-a-
          half times upscale: "fine on a phone, mushy on a laptop".

          The steps matter as much as the final width. One breakpoint at `lg`
          would leave every tablet and part-width laptop window — 640px to
          1023px, where the card is still 840px wide — exactly as upscaled as
          before, which is the half-fix that looks done and is not.
        */
        <div className="-mx-6 -mt-6 mb-7 overflow-hidden border-b border-border min-[480px]:m-0 min-[480px]:self-start min-[480px]:rounded-xl min-[480px]:border">
          <div className="aspect-16/10 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-[1.02]">
            <ProjectCover
              cover={project.cover}
              priority={coverPriority}
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, (min-width: 480px) 12rem, 100vw"
            />
          </div>
        </div>
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <ProjectStatusBadge
            status={project.status}
            labels={dict.projects.status}
          />
          <ProjectDomainBadge
            domain={project.domain}
            labels={dict.projects.domain}
          />
          <span className="ms-auto font-mono text-xs text-muted-foreground">
            {formatDateRange(project.period, locale, dict.experience.present)}
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
            href={`/${locale}/projects/${project.slug}`}
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
        {/*
          Two columns only from `lg`. The cover now takes a column of its own
          from 480px up, so between there and `lg` this pair would be splitting
          an already-narrow remainder — measured at 165px each, which wraps
          body copy to three words a line. `sm` was the right breakpoint when
          the text had the whole card to itself; it is not any more.
        */}
        <dl className="mt-7 grid gap-6 lg:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dict.projects.theProblem}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty-balance">
              {project.problem}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dict.projects.whatIBuilt}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty-balance">
              {project.solution}
            </dd>
          </div>
        </dl>

        <TechChips stack={project.stack} className="mt-7" />

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-0.5">
            {dict.projects.readCaseStudy}
            <ArrowRight aria-hidden className="size-4" />
          </span>
          {/* Lifted above the stretched link so these stay independently clickable. */}
          <div className="relative z-10 flex flex-wrap items-center gap-2">
            <ProjectLinkButtons
              links={project.links}
              title={project.title}
              labels={dict.projects.links}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

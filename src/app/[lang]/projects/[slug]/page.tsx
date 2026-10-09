import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import {
  ProjectDomainBadge,
  ProjectStatusBadge,
} from "@/components/sections/project-badges";
import { ProjectCover } from "@/components/sections/project-cover";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ProjectLinkButtons } from "@/components/sections/project-links";
import { StackSummary } from "@/components/sections/stack-summary";
import { ProjectJsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjects, projectSlugs } from "@/data";
import { getDictionary, getLocale, locales } from "@/i18n";
import { formatDateRange } from "@/lib/format";
import type { Project } from "@/types";

/**
 * Every case study, in every locale, is known at build time — so each is a
 * static file. Slugs stay the same across languages: a shared URL spine means
 * the language switch can swap one segment and land on the same page.
 */
export function generateStaticParams() {
  return locales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary();
  const project = getProjectBySlug(slug, locale);
  if (!project) return { title: dict.caseStudy.notFound };

  const path = `/${lang}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/projects/${project.slug}`,
        tr: `/tr/projects/${project.slug}`,
        "x-default": `/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline,
      url: path,
    },
  };
}

function Section({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span aria-hidden className="h-px w-6 bg-border" />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Prose({ children }: { readonly children: string }) {
  return (
    <p className="max-w-(--measure-prose) text-lg leading-relaxed text-muted-foreground text-pretty-balance">
      {children}
    </p>
  );
}

/**
 * Wraps around, so the last case study leads back to the first.
 * Returns `null` rather than asserting: `noUncheckedIndexedAccess` is on, and
 * silencing it with `!` would defeat the reason it is on.
 */
function siblingsOf(
  project: Project,
  projects: readonly Project[],
): { previous: Project; next: Project } | null {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return previous && next ? { previous, next } : null;
}

export default async function ProjectCaseStudy({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary();
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  const siblings = siblingsOf(project, getProjects(locale));

  return (
    <article className="py-14 sm:py-20">
      <ProjectJsonLd project={project} />
      <Container>
        <Link
          href={`/${lang}/#projects`}
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {dict.caseStudy.allProjects}
        </Link>

        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} labels={dict.projects.status} />
            <ProjectDomainBadge domain={project.domain} labels={dict.projects.domain} />
            <span className="font-mono text-xs text-muted-foreground">
              {formatDateRange(project.period, locale, dict.experience.present)}
            </span>
          </div>
          <h1 className="mt-5 text-headline font-semibold text-balance">
            {project.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground text-pretty-balance">
            {project.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <ProjectLinkButtons links={project.links} title={project.title} labels={dict.projects.links} />
          </div>
        </header>

        {project.cover && (
          <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-16/10">
              <ProjectCover cover={project.cover} priority />
            </div>
          </figure>
        )}

        <dl className="mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dict.caseStudy.myRole}
            </dt>
            <dd className="mt-2 text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {dict.caseStudy.status}
            </dt>
            <dd className="mt-2 text-sm">{dict.projects.status[project.status]}</dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="space-y-14">
            <Section title={dict.caseStudy.theProblem}>
              <Prose>{project.problem}</Prose>
            </Section>

            <Section title={dict.caseStudy.whatIBuilt}>
              <Prose>{project.solution}</Prose>
            </Section>

            {project.gallery && (
              <Section title={dict.caseStudy.whatItLooksLike}>
                <ProjectGallery images={project.gallery} />
              </Section>
            )}

            {project.architecture && (
              <Section title={dict.caseStudy.architecture}>
                <ArchitectureDiagram layers={project.architecture} />
              </Section>
            )}

            {project.decisions && (
              <Section title={dict.caseStudy.decisions}>
                <ul className="space-y-7">
                  {project.decisions.map((decision) => (
                    <li key={decision.title}>
                      <h3 className="font-medium">{decision.title}</h3>
                      <p className="mt-2 max-w-(--measure-prose) leading-relaxed text-muted-foreground text-pretty-balance">
                        {decision.rationale}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.impact && (
              <Section title={dict.caseStudy.outcome}>
                <Prose>{project.impact}</Prose>
              </Section>
            )}

            {project.metrics && (
              <Section title={dict.caseStudy.measured}>
                <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="bg-card p-5">
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {metric.label}
                      </dt>
                      <dd className="mt-2 font-mono text-lg tracking-tight">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <StackSummary stack={project.stack} labels={dict.caseStudy.techKind} />
          </aside>
        </div>

        {siblings && (
          <nav
            aria-label={dict.caseStudy.otherProjects}
            className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            <Link
              href={`/${lang}/projects/${siblings.previous.slug}`}
              className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/30"
            >
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                <ArrowLeft aria-hidden className="size-3.5" />
                {dict.caseStudy.previous}
              </span>
              <span className="mt-2 block font-medium">
                {siblings.previous.title}
              </span>
            </Link>
            <Link
              href={`/${lang}/projects/${siblings.next.slug}`}
              className="group rounded-xl border border-border p-5 text-right transition-colors hover:border-primary/30"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {dict.caseStudy.next}
                <ArrowRight aria-hidden className="size-3.5" />
              </span>
              <span className="mt-2 block font-medium">{siblings.next.title}</span>
            </Link>
          </nav>
        )}
      </Container>
    </article>
  );
}

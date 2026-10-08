import { Briefcase, GraduationCap } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/data";
import { formatDateRange } from "@/lib/format";
import { buildTimeline } from "@/lib/timeline";
import { cn } from "@/lib/utils";

const ICONS = { work: Briefcase, education: GraduationCap } as const;

export function Experience() {
  const timeline = buildTimeline(profile.experience, profile.education);

  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="04 — Experience"
          title="Work and study, in order"
          lead="Two degrees and an enterprise IT floor, mostly overlapping. The analytical half and the engineering half arrived at the same time."
        />

        <ol className="relative mt-12 border-l border-dashed border-border">
          {timeline.map((item) => {
            const Icon = ICONS[item.kind];
            const isOngoing = item.period.end === null;

            return (
              <li key={item.id} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-[0.9375rem] top-0 flex size-[1.875rem] items-center justify-center rounded-full border border-border",
                    isOngoing
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-lg text-muted-foreground">{item.org}</span>
                </div>

                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span>{formatDateRange(item.period)}</span>
                  <span aria-hidden className="h-3 w-px bg-border" />
                  <span>{item.meta}</span>
                </p>

                {item.summary && (
                  <p className="mt-4 max-w-(--measure-prose) leading-relaxed text-muted-foreground text-pretty-balance">
                    {item.summary}
                  </p>
                )}

                {item.details.length > 0 && (
                  <ul className="mt-4 max-w-(--measure-prose) space-y-2">
                    {item.details.map((detail) => (
                      <li
                        key={detail.slice(0, 40)}
                        className="relative pl-5 text-sm leading-relaxed text-muted-foreground text-pretty-balance before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-primary/60 before:content-['']"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {item.tech.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

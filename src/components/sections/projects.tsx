import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectCardFace } from "@/components/sections/project-card-face";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedProjects, getOtherProjects } from "@/data";
import { getDictionary, getLocale } from "@/i18n";
import type { Project } from "@/types";

function Card({
  project,
  coverPriority = false,
}: {
  readonly project: Project;
  readonly coverPriority?: boolean;
}) {
  return (
    <ProjectCard>
      <ProjectCardFace project={project} coverPriority={coverPriority} />
    </ProjectCard>
  );
}

export async function Projects() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const featuredProjects = getFeaturedProjects(locale);
  const otherProjects = getOtherProjects(locale);

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          lead={dict.projects.lead}
        />

        <div className="mt-12 space-y-6">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.slug}
              project={project}
              // Only the first cover is worth pre-loading; the rest lazy-load.
              coverPriority={index === 0}
            />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span aria-hidden className="h-px w-6 bg-border" />
              Also built
            </h3>
            <div className="mt-6 space-y-6">
              {otherProjects.map((project) => (
                <Card key={project.slug} project={project} />
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

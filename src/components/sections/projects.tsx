import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectCardFace } from "@/components/sections/project-card-face";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredProjects, otherProjects } from "@/data";
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

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="03 — Projects"
          title="Things I have built"
          lead="Every one of these started as a problem somebody actually had. Each card opens into a case study: the architecture, and the decisions behind it."
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

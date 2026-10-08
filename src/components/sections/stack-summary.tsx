import { TechIcon } from "@/components/sections/tech-icon";
import { techIconSlugFor } from "@/components/sections/tech-icon-slugs";
import type { TechKind, TechTag } from "@/types";

const KIND_LABEL: Record<TechKind, string> = {
  language: "Languages",
  framework: "Frameworks",
  database: "Data",
  platform: "Platform",
  tooling: "Tooling",
};

const KIND_ORDER: readonly TechKind[] = [
  "language",
  "framework",
  "database",
  "platform",
  "tooling",
];

/**
 * The same stack the card shows as one flat row, grouped by what each piece
 * actually is. On a case study there is room to be precise — and room for the
 * marks to be read rather than skimmed, so they sit at full size here.
 */
export function StackSummary({ stack }: { readonly stack: readonly TechTag[] }) {
  const groups = KIND_ORDER.map((kind) => ({
    kind,
    items: stack.filter((tech) => tech.kind === kind),
  })).filter((group) => group.items.length > 0);

  return (
    <dl className="space-y-5">
      {groups.map((group) => (
        <div key={group.kind}>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
            {KIND_LABEL[group.kind]}
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {group.items.map((tech) => {
              const slug = techIconSlugFor(tech.name);

              return (
                <span
                  key={tech.name}
                  className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 py-1 font-mono text-[0.7rem] transition-colors duration-200 hover:border-primary/35 ${
                    slug ? "pl-1.5 pr-2" : "px-2"
                  }`}
                >
                  {slug && (
                    <span className="size-3.5 shrink-0 text-muted-foreground">
                      <TechIcon slug={slug} />
                    </span>
                  )}
                  {tech.name}
                </span>
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}

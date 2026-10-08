import type { ArchitectureLayer } from "@/types";

/**
 * The system, drawn as a rail. Each tier states what it is responsible for —
 * which is the difference between listing technologies and describing a design.
 */
export function ArchitectureDiagram({
  layers,
}: {
  readonly layers: readonly ArchitectureLayer[];
}) {
  return (
    <ol className="relative space-y-6 border-l border-dashed border-border pl-7">
      {layers.map((layer) => (
        <li key={layer.name} className="relative">
          <span
            aria-hidden
            className="absolute -left-[2.05rem] top-1 size-2.5 rounded-full border-2 border-card bg-primary"
          />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
            {layer.name}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty-balance">
            {layer.responsibility}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {layer.tech.map((item) => (
              <li
                key={item}
                className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

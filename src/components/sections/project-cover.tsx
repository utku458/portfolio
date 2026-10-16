import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface ProjectCoverProps {
  readonly cover: ImageAsset;
  /** The first card is above the fold; everything else can wait. */
  readonly priority?: boolean;
  readonly className?: string;
  /**
   * Required, with no default on purpose. Only the caller knows how wide the
   * box is, and a default here is a guess that outlives the layout it was
   * written for: the last one still claimed 60rem long after these covers had
   * stopped being drawn that wide, which is the bug this component sat at the
   * centre of. `sizes` decides which widths the optimizer generates, so
   * getting it wrong costs real pixels — the type asks rather than assumes.
   */
  readonly sizes: string;
}

/**
 * `width`/`height` come from the data and are required by the `ImageAsset`
 * type, so the browser reserves the exact box before the file arrives and the
 * page never shifts (CLS stays at 0).
 */
export function ProjectCover({
  cover,
  priority = false,
  className,
  sizes,
}: ProjectCoverProps) {
  return (
    <Image
      src={cover.src}
      alt={cover.alt}
      width={cover.width}
      height={cover.height}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

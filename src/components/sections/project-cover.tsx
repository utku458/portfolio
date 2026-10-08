import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface ProjectCoverProps {
  readonly cover: ImageAsset;
  /** The first card is above the fold; everything else can wait. */
  readonly priority?: boolean;
  readonly className?: string;
  /** Tells the optimizer which widths to generate — see `sizes` in next/image. */
  readonly sizes?: string;
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
  sizes = "(min-width: 1024px) 60rem, 100vw",
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

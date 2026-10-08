import Image from "next/image";

import type { ImageAsset } from "@/types";

/**
 * Screenshots of the real thing, at their real shape.
 *
 * No fixed aspect ratio and no `object-cover` here, unlike the card's cover: a
 * phone screenshot cropped to a landscape box shows a strip of nothing. Each
 * image keeps its own proportions and the grid lets a tall one stay tall, so
 * the only thing deciding the layout is what was actually captured.
 */
export function ProjectGallery({ images }: { readonly images: readonly ImageAsset[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <li key={image.src} className="flex flex-col">
          <figure className="flex h-full flex-col">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 640px) 28rem, 100vw"
                className="h-auto w-full"
              />
            </div>
            {image.caption && (
              <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty-balance">
                {image.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}

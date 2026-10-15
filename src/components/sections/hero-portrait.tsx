import { MapPin } from "lucide-react";
import Image from "next/image";

interface HeroPortraitProps {
  /** Describes the photograph to someone who cannot see it. */
  readonly alt: string;
  /** The same string the contact section shows, so the two never disagree. */
  readonly location: string;
}

/** Intrinsic size of the file, so the browser reserves the box and CLS stays 0. */
const PORTRAIT = { src: "/images/utku-altinay.jpg", width: 800, height: 1000 } as const;

/**
 * The hero's second column.
 *
 * The caption is the reason the photograph earns its place rather than merely
 * filling it: the backdrop is the Golden Horn, and naming the city turns a
 * decorative portrait into the same fact the contact section states in words.
 * It reads the location from the profile rather than hard-coding "İstanbul",
 * so a move updates both places at once.
 *
 * `priority` because on a wide screen this sits above the fold beside the
 * <h1> — without it the optimizer defers the one image a visitor sees first.
 */
export function HeroPortrait({ alt, location }: HeroPortraitProps) {
  return (
    <div className="relative mx-auto w-full max-w-64 animate-fade-up [animation-delay:360ms] lg:mx-0 lg:max-w-sm">
      {/*
        A soft wash of the brand hue behind the frame. Decorative, so it is
        hidden from assistive technology and sits on its own layer rather than
        being a thicker border — the point is that the photograph reads as lit
        from behind, not as a heavier edge.
      */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/10 blur-3xl"
      />

      <figure className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <Image
          src={PORTRAIT.src}
          alt={alt}
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          priority
          sizes="(min-width: 1024px) 24rem, 16rem"
          className="h-full w-full object-cover"
        />

        {/*
          The gradient is what makes the caption legible: this is a night shot,
          but the water along the lower edge is bright and uneven, so white text
          alone would sit on an unpredictable background.
        */}
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-linear-to-t from-black/75 via-black/40 to-transparent px-4 pb-3.5 pt-12 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white">
          <MapPin aria-hidden className="size-3.5 shrink-0" />
          {location}
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * Decorative only — `aria-hidden`, no pointer events, no layout cost.
 *
 * A CSS grid pattern plus one blurred radial wash. Both are painted from theme
 * tokens, so the background follows dark mode for free and ships zero bytes of
 * image.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Grid, faded out towards the edges so it never competes with the text. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 0%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 0%, #000 30%, transparent 78%)",
        }}
      />
      {/* A single brand-tinted glow, offset left so it sits behind the name. */}
      <div className="absolute -top-40 left-[-10%] size-[36rem] rounded-full bg-primary/12 blur-[110px] dark:bg-primary/15" />
    </div>
  );
}

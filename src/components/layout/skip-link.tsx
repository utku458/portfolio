/**
 * Keyboard users land here first and can jump past the navigation.
 * It is visually hidden until focused — a WCAG 2.4.1 requirement that costs
 * eight lines and is missing from almost every portfolio site.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      Skip to content
    </a>
  );
}

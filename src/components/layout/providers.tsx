"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Every client-side context in one place, so `layout.tsx` stays a server
 * component and only this subtree ships the provider code.
 *
 * `reducedMotion="user"` makes every Framer Motion animation in the app obey
 * the OS setting automatically — the alternative is remembering to check it in
 * each component, which nobody does.
 */
export function Providers({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // Suppresses the colour transition while the theme class swaps, which
      // otherwise reads as a flicker rather than a fade.
      disableTransitionOnChange
    >
      {/*
        Tried and reverted: wrapping this in `LazyMotion` with an async
        `domMax` import *increased* total JS from 204 KB to 244 KB, because the
        dynamic `import("motion/react")` duplicates the module into a second
        chunk instead of splitting the feature set out of the first one.
        Measured, not assumed.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}

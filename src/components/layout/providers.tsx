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
 *
 * Dev-console note, so nobody chases it twice: React logs "Encountered a script
 * tag while rendering React component" pointing at the `ThemeProvider` below.
 * The script is next-themes' own — it renders one unconditionally (the memoised
 * `script` with `dangerouslySetInnerHTML` in `next-themes/dist/index.js`) and
 * 0.4.6 is the latest published version, so no upgrade removes it and there is
 * nothing to change here.
 *
 * It is noise rather than a defect. That warning string exists only in React's
 * `*.development.js` builds and is stripped from production, and the script is
 * present in the server-rendered HTML — the only place it has to run, and
 * exactly what prevents the flash of the wrong theme. On a later client render
 * it is inert, which is all React is pointing out.
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

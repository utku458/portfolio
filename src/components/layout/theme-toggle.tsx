"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks";

/**
 * The icon swap is pure CSS (`dark:` variants), not React state — so the right
 * glyph is painted on the very first frame and there is no flash or skeleton.
 * Only the accessible label needs the mounted check, because "switch to dark"
 * is unknowable on the server.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const label = mounted
    ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`
    : "Toggle theme";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-transform duration-300 ease-(--ease-out-expo) dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-300 ease-(--ease-out-expo) dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

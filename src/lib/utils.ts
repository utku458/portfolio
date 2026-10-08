import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional class names with conflict resolution:
 * `cn("px-2", isWide && "px-8")` → `"px-8"` instead of both surviving.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

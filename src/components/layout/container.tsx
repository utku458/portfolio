import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  readonly as?: T;
} & ComponentProps<T>;

/**
 * The single source of horizontal rhythm. Every section uses it, so changing
 * the page's measure is a one-line edit instead of a find-and-replace.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}

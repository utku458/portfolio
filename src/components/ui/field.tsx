import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * `border-input` rather than `border-border`: a form control's boundary has to
 * clear WCAG 1.4.11's 3:1 against its background, which a decorative divider
 * does not. The two tokens exist precisely so this distinction is possible.
 */
const control = [
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
  "placeholder:text-muted-foreground/70",
  "transition-colors duration-200",
  "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30",
  "disabled:cursor-not-allowed disabled:opacity-60",
];

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("block text-sm font-medium", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-10", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "resize-y", className)} {...props} />;
}

export function FieldError({
  id,
  children,
}: {
  readonly id: string;
  readonly children?: string;
}) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {children}
    </p>
  );
}

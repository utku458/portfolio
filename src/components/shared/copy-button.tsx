"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

/**
 * Clipboard access can be refused (insecure context, permission policy), so the
 * confirmation is only shown once the write actually resolves.
 */
export function CopyButton({
  value,
  label,
}: {
  readonly value: string;
  readonly label: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Nothing useful to do — the address is selectable text either way.
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-emerald-500" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
    </Button>
  );
}

"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight, Sparkles } from "lucide-react";
import { continueWithImageToTool } from "@/lib/continue-with-image";
import { cn } from "@/lib/utils";

export type ContinueWithImageLink = {
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
};

type ContinueWithImageProps = {
  title?: string;
  items: ContinueWithImageLink[];
  getBlob: () => Blob | null;
  getFilename?: () => string;
  onMissingBlob?: () => void;
  onNavigateStart?: () => void;
  className?: string;
};

export function ContinueWithImage({
  title = "Continue with this image",
  items,
  getBlob,
  getFilename,
  onMissingBlob,
  onNavigateStart,
  className,
}: ContinueWithImageProps) {
  const handle = async (href: string) => {
    const blob = getBlob();
    if (!blob) {
      onMissingBlob?.();
      return;
    }
    onNavigateStart?.();
    const filename = getFilename?.();
    await continueWithImageToTool(blob, href, { filename, copyToClipboard: true });
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 via-background to-muted/40 p-4 shadow-sm",
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span> */}
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {/* <p className="text-xs text-muted-foreground">
            Opens the next tool with your result already loaded (saved locally in your browser).
          </p> */}
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => void handle(item.href)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg border border-border/80 bg-card/80 px-3 py-2.5 text-left",
                  "transition hover:border-primary/40 hover:bg-accent/50 hover:shadow-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/15">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-tight">{item.label}</span>
                  {item.description ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                  ) : null}
                </span>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

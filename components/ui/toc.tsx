"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/** Sticky table of contents: left sidebar on desktop, collapsible accordion on phone/tablet. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* phone + tablet: collapsible accordion, closed by default */}
      <details
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="group rounded border border-border lg:hidden"
      >
        <summary className="flex cursor-pointer list-none bg-muted items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Table of Contents
          </h3>
          <span className="relative h-4 w-4 shrink-0 text-primary" aria-hidden>
            <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
            <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current transition-transform group-open:rotate-90" />
          </span>
        </summary>
        <ul className="space-y-0.5 border-t border-border px-2 py-2">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  active === it.id
                    ? "bg-primary/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      {/* desktop: sticky sidebar */}
      <nav aria-label="On this page" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto lg:block scrollbar-thin scrollbar-thumb-muted-foreground">
        <h3 className="mb-3 font-semibold">Table of Contents</h3>
        <ul className="space-y-0.5 border-l-2 border-border">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "-ml-0.5 block border-l-2 py-1.5 pl-4 pr-2 text-[13px] leading-snug transition-colors",
                  active === it.id
                    ? "border-primary font-bold text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

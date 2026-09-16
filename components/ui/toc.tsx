"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/use-t";

export interface TocItem {
  id: string;
  label: string;
  /** Optional nesting (e.g. H3 under H2). */
  level?: 2 | 3;
}

type TocVariant = "full" | "mobile" | "desktop";

function TocLinks({
  items,
  active,
  onNavigate,
}: {
  items: TocItem[];
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={onNavigate}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition-colors",
              it.level === 3 && "pl-6",
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
  );
}

function TocDesktopLinks({
  items,
  active,
}: {
  items: TocItem[];
  active: string;
}) {
  return (
    <ul className="space-y-0.5 border-l-2 border-border">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            className={cn(
              "-ml-0.5 block border-l-2 py-1.5 pr-2 text-[13px] leading-snug transition-colors",
              it.level === 3 ? "pl-7" : "pl-4",
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
  );
}

/**
 * Sticky table of contents (coast-fire design):
 * - full: accordion on phone/tablet + sticky list on desktop
 * - mobile / desktop: single breakpoint only (blog places them separately)
 */
export function Toc({
  items,
  variant = "full",
}: {
  items: TocItem[];
  variant?: TocVariant;
}) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = React.useState(false);
  const t = useT();

  React.useEffect(() => {
    if (items.length === 0) return;
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

  if (items.length === 0) return null;

  const showMobile = variant === "full" || variant === "mobile";
  const showDesktop = variant === "full" || variant === "desktop";

  return (
    <>
      {showMobile ? (
        <details
          open={open}
          onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
          className={cn(
            "group rounded border border-border",
            variant === "full" && "lg:hidden"
          )}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-muted px-4 py-3 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {t('blog.tableOfContents')}
            </h3>
            <span className="relative h-4 w-4 shrink-0 text-primary" aria-hidden>
              <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current transition-transform group-open:rotate-90" />
            </span>
          </summary>
          <div className="border-t border-border px-2 py-2">
            <TocLinks items={items} active={active} onNavigate={() => setOpen(false)} />
          </div>
        </details>
      ) : null}

      {showDesktop ? (
        <nav
          aria-label="On this page"
          className={cn(
            "sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground",
            variant === "full" && "hidden lg:block"
          )}
        >
          <h3 className="mb-3 font-semibold">{t('blog.tableOfContents')}</h3>
          <TocDesktopLinks items={items} active={active} />
        </nav>
      ) : null}
    </>
  );
}

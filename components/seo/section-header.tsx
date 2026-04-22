import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Shared section header for tool SEO content.
 * Layout: small eyebrow (icon + label) → centered H2 → optional lead paragraph.
 */
export function SectionHeader({
  eyebrow,
  icon: Icon,
  title,
  lead,
}: {
  eyebrow?: string;
  icon?: LucideIcon;
  title: string;
  lead?: ReactNode;
}) {
  return (
    <header className="text-center space-y-2">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {lead && <p className="text-muted-foreground">{lead}</p>}
    </header>
  );
}

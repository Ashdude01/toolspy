import { tools, getToolBySlug } from "@/lib/tools-data";
import { getT } from "@/lib/i18n/messages";
import { getToolCopy } from "@/lib/i18n/get-tool-copy";
import { localizeHref } from "@/lib/i18n/localize-href";
import Link from "next/link";

interface RelatedToolsProps {
  currentToolSlug: string;
  maxTools?: number;
  /** Locale (server component — prop se aata hai). Heading/description iske hisaab se translate. */
  locale?: string;
  /** Optional explicit overrides; na do to dictionary se locale-aware strings aati hain. */
  title?: string;
  description?: string;
}

export function RelatedTools({
  currentToolSlug,
  maxTools = 8,
  locale = "en",
  title,
  description,
}: RelatedToolsProps) {
  const t = getT(locale);
  const headingText = title ?? t("relatedTools.heading");
  const descriptionText = description ?? t("relatedTools.description");
  const currentTool = getToolBySlug(currentToolSlug);

  if (!currentTool) {
    return null;
  }

  // Get tools from the same category, excluding the current tool
  const relatedTools = tools
    .filter(
      (tool) =>
        tool.category === currentTool.category && tool.slug !== currentToolSlug,
    )
    .slice(0, maxTools)
    .map((tool) => {
      const copy = getToolCopy(tool.slug, locale);
      return {
        name: copy.name,
        description:
          copy.description.slice(0, 65) +
          (copy.description.length > 65 ? ".." : ""),
        keywords: tool.tags.join(", "),
        href: tool.path,
        comingSoon: tool.status === "coming-soon",
      };
    });

  // If no related tools in same category, get some from other categories
  if (relatedTools.length === 0) {
    const otherTools = tools
      .filter((tool) => tool.slug !== currentToolSlug)
      .slice(0, maxTools)
      .map((tool) => {
        const copy = getToolCopy(tool.slug, locale);
        return {
          name: copy.name,
          description: copy.description,
          keywords: tool.tags.join(", "),
          href: tool.path,
          comingSoon: tool.status === "coming-soon",
        };
      });

    relatedTools.push(...otherTools);
  }

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="">
      <div className="mx-auto w-full max-w-7xl">
        <label className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1877F2] dark:text-blue-400">
          {t("relatedTools.kicker")}
        </label>
        <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
          {headingText}
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          {descriptionText}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={localizeHref(locale, tool.href)}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-foreground group-hover:text-[#1877F2] dark:group-hover:text-blue-400">
                  {tool.name}
                </h3>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

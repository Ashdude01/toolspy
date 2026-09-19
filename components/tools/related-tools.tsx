import { tools, getToolBySlug } from "@/lib/tools-data";
import { getT } from "@/lib/i18n/messages";
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
  // Heading + description ab locale-aware. Card ke tool NAMES content hain
  // (tools-data se) — wo abhi English hi rehte hain (Phase B scope).
  const headingText = title ?? t("relatedTools.heading");
  const descriptionText = description ?? t("relatedTools.description");
  const currentTool = getToolBySlug(currentToolSlug);

  if (!currentTool) {
    return null;
  }

  // Get tools from the same category, excluding the current tool
  const relatedTools = tools
    .filter(tool =>
      tool.category === currentTool.category &&
      tool.slug !== currentToolSlug
    )
    .slice(0, maxTools)
    .map(tool => ({
      name: tool.name,
      description: tool.description.slice(0, 65)+"..",
      keywords: tool.tags.join(', '),
      href: tool.path,
      comingSoon: tool.status === 'coming-soon',
    }));

  // If no related tools in same category, get some from other categories
  if (relatedTools.length === 0) {
    const otherTools = tools
      .filter(tool => tool.slug !== currentToolSlug)
      .slice(0, maxTools)
      .map(tool => ({
        name: tool.name,
        description: tool.description,
        keywords: tool.tags.join(', '),
        href: tool.path,
        comingSoon: tool.status === 'coming-soon',
      }));

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
              <p className="text-[13px] leading-relaxed text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    // <section className="space-y-6">

    //   <div className="flex flex-col gap-2">
    //     <label className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1877F2] dark:text-blue-400">Related Tools</label>
    //     <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
    //       {headingText}
    //     </h2>
    //     <p className="mt-2 max-w-xl text-muted-foreground">
    //       {descriptionText}
    //     </p>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //     {relatedTools.map((tool, index) => (
    //       <Link
    //         href={tool.href}
    //         key={index}
    //         className="p-6 related-tool-card relative rounded-xl overflow-hidden
    //           border border-gray-300 dark:border-transparent
    //           bg-muted/30
    //           hover:bg-muted/50
    //           shadow transition-all duration-300
    //           hover:shadow-lg focus-visible:ring-2 focus-visible:ring-sky-400 hover:border hover:border-stone-500 hover:dark:border-neutral-400
    //         " style={{ position: 'relative', zIndex: 1 }}
    //         tabIndex={0}
    //       >

    //         {/* Subtle sparkles for elegance */}
    //         <div className="tool-sparkles pointer-events-none absolute top-0 left-0 w-full h-full z-10">
    //           <svg width="100%" height="100%">
    //             <circle cx="88%" cy="18%" r="7" fill="#a5b4fc" opacity="0.10">
    //               <animate attributeName="opacity" values="0.10;0.21;0.10" dur="2.7s" repeatCount="indefinite" />
    //             </circle>
    //             <circle cx="14%" cy="85%" r="6" fill="#bae6fd" opacity="0.09">
    //               <animate attributeName="opacity" values="0.09;0.17;0.09" dur="2.0s" repeatCount="indefinite" />
    //             </circle>
    //             <circle cx="37%" cy="23%" r="6" fill="#f0f9ff" opacity="0.12">
    //               <animate attributeName="opacity" values="0.12;0.20;0.12" dur="3.1s" repeatCount="indefinite" />
    //             </circle>
    //             <circle cx="60%" cy="90%" r="3" fill="#7dd3fc" opacity="0.11">
    //               <animate attributeName="opacity" values="0.11;0.17;0.11" dur="2.3s" repeatCount="indefinite" />
    //             </circle>
    //           </svg>
    //         </div>
    //         <div className="flex items-start justify-between relative z-20">
    //           <div className="flex-1">
    //             <h4 className="font-semibold mb-2">{tool.name}</h4>
    //             <p className="text-sm text-muted-foreground mb-4">
    //               {tool.description}
    //             </p>

    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>

    // </section>
  );
} 
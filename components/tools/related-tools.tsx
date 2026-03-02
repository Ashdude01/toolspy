import { tools, getToolBySlug } from "@/lib/tools-data";
import Link from "next/link";

interface RelatedToolsProps {
  currentToolSlug: string;
  maxTools?: number;
  title?: string;
  description?: string;
}

export function RelatedTools({
  currentToolSlug,
  maxTools = 8,
  title = "More Helpful Tools You Might Like",
  description = "Check out our other tools that work great together."
}: RelatedToolsProps) {
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
      description: tool.description,
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
    <section className="space-y-6">
      {/* <div className="a_ads_container mb-10">
                <div
                  id="frame"
                  style={{
                    width: "100%",
                    margin: "auto",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <iframe
                    data-aa="2419400"
                    src="//acceptable.a-ads.com/2419400/?size=Adaptive"
                    style={{
                      border: 0,
                      padding: 0,
                      width: "70%",
                      height: "auto",
                      overflow: "hidden",
                      display: "block",
                      margin: "auto",
                    }}
                  ></iframe>
                </div>
              </div> */}
      <h3 className="text-2xl font-bold text-center">
        {title}
      </h3>
      <p className="text-center text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTools.map((tool, index) => (
          <Link
            href={tool.href}
            key={index}
            className="p-6 related-tool-card relative rounded-xl overflow-hidden
              border border-gray-300 dark:border-transparent
              bg-stone-100 dark:bg-zinc-900
              hover:bg-stone-50 dark:hover:bg-zinc-950
              shadow transition-all duration-300
              hover:shadow-lg focus-visible:ring-2 focus-visible:ring-sky-400 hover:border hover:border-stone-500 hover:dark:border-neutral-400
            " style={{ position: 'relative', zIndex: 1 }}
            tabIndex={0}
          >

            {/* Subtle sparkles for elegance */}
            <div className="tool-sparkles pointer-events-none absolute top-0 left-0 w-full h-full z-10">
              <svg width="100%" height="100%">
                <circle cx="88%" cy="18%" r="7" fill="#a5b4fc" opacity="0.10">
                  <animate attributeName="opacity" values="0.10;0.21;0.10" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="14%" cy="85%" r="6" fill="#bae6fd" opacity="0.09">
                  <animate attributeName="opacity" values="0.09;0.17;0.09" dur="2.0s" repeatCount="indefinite" />
                </circle>
                <circle cx="37%" cy="23%" r="6" fill="#f0f9ff" opacity="0.12">
                  <animate attributeName="opacity" values="0.12;0.20;0.12" dur="3.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="60%" cy="90%" r="3" fill="#7dd3fc" opacity="0.11">
                  <animate attributeName="opacity" values="0.11;0.17;0.11" dur="2.3s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div className="flex items-start justify-between relative z-20">
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{tool.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {tool.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  <b>Keywords</b>: {tool.keywords}
                </p>
                {/* {tool.comingSoon ? (
                  <Badge variant="secondary">Coming Soon</Badge>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className={`
                      relative border-0 shadow-md transition-all 
                      bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600
                      text-white
                      hover:from-blue-800 hover:via-fuchsia-700 hover:to-pink-700
                    `}
                  >
                    <Link href={tool.href} className="!text-white">
                      Try Tool&nbsp;→
                    </Link>
                  </Button>
                )} */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="mt-8 p-6 bg-muted/50 rounded-lg">
        <h4 className="font-semibold mb-2">
          Why Use Multiple Toolspy Tools?
        </h4>
        <p className="text-sm text-muted-foreground">
          Our integrated suite of professional tools ensures consistent
          quality and user experience across all your digital tasks. All tools
          feature the same privacy-focused, client-side processing for maximum
          security and performance. Whether you're compressing images,
          converting formats, or encoding data, Toolspy provides
          professional-grade solutions completely free.
        </p>
      </div> */}
    </section>
  );
} 
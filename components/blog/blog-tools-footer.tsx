import Link from 'next/link'
import { getToolsByCategory, toolCategories, type ToolCategory } from '@/lib/tools-data'

/**
 * "Explore all tools" module — a categorized grid of every Toolspy tool,
 * rendered at the bottom of every blog page (just above the global footer).
 * Modelled on the tool directory that sits at the foot of reference blogs.
 */
export function BlogToolsFooter() {
  const byCategory = getToolsByCategory()

  const categories = (Object.keys(toolCategories) as ToolCategory[])
    .map((key) => ({
      key,
      meta: toolCategories[key],
      tools: (byCategory[key] || []).filter((t) => t.status !== 'coming-soon'),
    }))
    .filter((c) => c.tools.length > 0)

  if (categories.length === 0) return null

  return (
    <section className="border-t border-border/60 bg-background" aria-labelledby="explore-all-tools">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* <div className="mb-10">
          <h2
            id="explore-all-tools"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Explore all tools
          </h2>
        </div> */}

        <div className="gap-x-10 [column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-5">
          {categories.map((category) => (
            <div key={category.key} className="mb-9 break-inside-avoid">
              <h3 className="mb-3.5 text-base font-semibold text-muted-foreground">
                {category.meta.name}
              </h3>
              <ul className="space-y-0.5">
                {category.tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={tool.path}
                      className="group -mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors hover:bg-muted"
                    >
                      <span
                        aria-hidden
                        className="flex size-5 shrink-0 items-center justify-center text-[13px] leading-none"
                      >
                        {tool.icon}
                      </span>
                      <span className="truncate">{tool.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

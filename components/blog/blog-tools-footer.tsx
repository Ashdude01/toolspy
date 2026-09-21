'use client'

import Link from 'next/link'
import { getToolsByCategory, toolCategories, type ToolCategory } from '@/lib/tools-data'
import { getToolCopy } from '@/lib/i18n/get-tool-copy'
import { localizeHref } from '@/lib/i18n/localize-href'
import { useLocale, useT } from '@/lib/i18n/use-t'

/**
 * "Explore all tools" module — categorized grid at the bottom of blog pages.
 * Locale from URL so English `/blog` and `/de/blog` both localize names/links.
 */
export function BlogToolsFooter() {
  const locale = useLocale()
  const t = useT()
  const byCategory = getToolsByCategory()

  const categories = (Object.keys(toolCategories) as ToolCategory[])
    .map((key) => ({
      key,
      name: t(`categories.${key}`),
      tools: (byCategory[key] || []).filter((tool) => tool.status !== 'coming-soon'),
    }))
    .filter((c) => c.tools.length > 0)

  if (categories.length === 0) return null

  return (
    <section className="border-t border-border/60 bg-background" aria-labelledby="explore-all-tools">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <div className="gap-x-10 [column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-5">
          {categories.map((category) => (
            <div key={category.key} className="mb-9 break-inside-avoid">
              <h3 className="mb-3.5 text-base font-semibold text-muted-foreground">
                {category.name}
              </h3>
              <ul className="space-y-0.5">
                {category.tools.map((tool) => {
                  const copy = getToolCopy(tool.slug, locale)
                  return (
                    <li key={tool.id}>
                      <Link
                        href={localizeHref(locale, tool.path)}
                        className="group -mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors hover:bg-muted"
                      >
                        <span
                          aria-hidden
                          className="flex size-5 shrink-0 items-center justify-center text-[13px] leading-none"
                        >
                          {tool.icon}
                        </span>
                        <span className="truncate">{copy.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

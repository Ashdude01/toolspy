import { getToolBySlug } from '@/lib/tools-data'
import { ToolPageHero } from '@/components/i18n/tool-page-hero'

/**
 * CMS-aware tool hero with tools-data fallbacks.
 * Used from tool layouts (locale defaults to en) and localized dispatcher.
 * No icon — keeps rollout consistent across all tools.
 */
export async function CmsToolHero({
  slug,
  locale = 'en',
  className,
}: {
  slug: string
  locale?: string
  className?: string
}) {
  const tool = getToolBySlug(slug)
  return (
    <div className={className ?? 'container mx-auto max-w-7xl px-4 pt-6 sm:pt-8'}>
      <ToolPageHero
        slug={slug}
        locale={locale}
        fallbackTitle={tool?.name ?? slug}
        fallbackDescription={tool?.description}
        titleClassName="bg-gradient-to-r from-red-500 to-blue-700 bg-clip-text text-transparent dark:from-red-600 dark:to-blue-500 text-2xl sm:text-3xl lg:text-4xl mb-2"
        descriptionClassName="text-base sm:text-lg text-muted-foreground"
        headingAs="h1"
      />
    </div>
  )
}

/**
 * ToolPageHero — tool page ke top title/description.
 *
 * CMS `heroHeading` / `heroDescription` (per locale) se fill hota hai.
 * Khali / fetch fail → `fallbackTitle` / `fallbackDescription` (aaj ka hardcoded text).
 *
 * Server component — Payload fetch yahi hota hai; client tool pages ise
 * server `page.tsx` se children ke through compose kar sakte hain.
 */
import type { ReactNode } from 'react'
import { splitLeadingHeading } from '@/lib/blog/toc'
import { getToolContent } from '@/lib/payload/get-tool-content'
import { cn } from '@/lib/utils'

export async function ToolPageHero({
  slug,
  locale = 'en',
  fallbackTitle,
  fallbackDescription,
  icon,
  className,
  titleClassName,
  descriptionClassName,
  headingAs: HeadingTag = 'h2',
}: {
  slug: string
  locale?: string
  fallbackTitle: string
  fallbackDescription?: string
  icon?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  /** Keep `h2` for existing tool heroes (page H1 lives in SEO block). */
  headingAs?: 'h1' | 'h2'
}) {
  const doc = await getToolContent(slug, locale)
  const articleHeading =
    doc?.contentSource === 'cms' && !doc.heroHeading?.trim()
      ? splitLeadingHeading(doc.content).heading
      : null
  const title = doc?.heroHeading?.trim() || articleHeading || fallbackTitle
  const description =
    doc?.heroDescription?.trim() || (articleHeading ? '' : fallbackDescription?.trim() || '')

  return (
    <div className={cn('text-center space-y-4', className)}>
      {icon}
      <HeadingTag
        className={cn(
          'text-3xl font-bold tracking-tight text-foreground',
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            'text-muted-foreground max-w-2xl mx-auto',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

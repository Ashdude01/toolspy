'use client'

import { Toc } from '@/components/ui/toc'
import type { TocItem } from '@/lib/blog/toc'

/**
 * Blog adapter around the shared coast-fire Toc design.
 * Maps blog `{ text, level }` → UI `{ label, level }`.
 */
export function TableOfContents({
  items,
  variant = 'full',
}: {
  items: TocItem[]
  variant?: 'full' | 'mobile' | 'desktop'
}) {
  if (items.length === 0) return null
  return (
    <Toc
      variant={variant}
      items={items.map((item) => ({
        id: item.id,
        label: item.text,
        level: item.level,
      }))}
    />
  )
}

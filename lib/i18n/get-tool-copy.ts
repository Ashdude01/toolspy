/**
 * Localized tool catalog copy (display name + short description).
 * Structural data (slug/path/SEO) stays English in lib/tools-data.ts.
 */
import { tools } from '@/lib/tools-data'
import { DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { toolCatalogLocales } from '@/lib/i18n/tool-catalog-locales'

export type ToolCopy = {
  name: string
  description: string
}

const enCatalog: Record<string, ToolCopy> = Object.fromEntries(
  tools.map((t) => [t.slug, { name: t.name, description: t.description }]),
)

const catalogs = toolCatalogLocales as Record<string, Record<string, ToolCopy>>

/**
 * Locale-aware name/description for a tool slug.
 * Missing locale/key → English from tools-data. Path/URL never changes.
 */
export function getToolCopy(slug: string, locale: string = DEFAULT_LOCALE): ToolCopy {
  const fallback = enCatalog[slug] ?? { name: slug, description: '' }
  if (locale === DEFAULT_LOCALE) return fallback
  const localized = catalogs[locale]?.[slug]
  return {
    name: localized?.name ?? fallback.name,
    description: localized?.description ?? fallback.description,
  }
}

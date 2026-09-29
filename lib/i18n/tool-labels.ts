/**
 * Plain slug → display name map for Payload admin (no React / CSS imports).
 * Kept separate so Payload CLI can load it safely.
 */
import { tools } from '../tools-data'

export const toolSelectOptions = tools.map((t) => ({
  label: `${t.name} (${t.slug})`,
  value: t.slug,
}))

export function toolSearchKey(slug: string): string {
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return slug
  return [tool.slug, tool.name, tool.description, ...(tool.tags || [])].join(' ')
}

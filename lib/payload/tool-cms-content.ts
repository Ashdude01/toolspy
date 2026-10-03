import { hasLexicalContent } from '@/lib/blog/lexical-from-sections'
import type { ToolContentDoc } from '@/lib/payload/get-tool-content'

/** CMS is live for this locale when source is cms and article (or legacy sections) exist. */
export function isToolCmsContentActive(doc: ToolContentDoc | null | undefined): boolean {
  if (!doc || doc.contentSource !== 'cms') return false
  if (hasLexicalContent(doc.content)) return true
  return (doc.sections?.length ?? 0) > 0
}

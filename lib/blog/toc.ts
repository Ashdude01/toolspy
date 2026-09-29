import type { BlogSection } from '@/lib/blog-data'

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/** Deterministic heading id — MUST match the id injected by render-rich-text. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

type LexNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexNode[]
}

/** Flatten a lexical node's text content. */
export function lexicalNodeText(node: LexNode | undefined | null): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(lexicalNodeText).join('')
  return ''
}

/** Extract H2/H3 headings from Payload lexical JSON for a table of contents. */
export function getTocFromLexical(data: unknown): TocItem[] {
  if (!data || typeof data !== 'object') return []
  const root = (data as { root?: { children?: LexNode[] } }).root
  if (!Array.isArray(root?.children)) return []
  const items: TocItem[] = []
  for (const node of root.children) {
    if (node?.type !== 'heading') continue
    const level = node.tag === 'h2' ? 2 : node.tag === 'h3' ? 3 : null
    if (!level) continue
    const text = lexicalNodeText(node).trim()
    if (!text) continue
    items.push({ id: slugifyHeading(text), text, level })
  }
  return items
}

/** Extract headings from legacy plain-text sections. */
export function getTocFromSections(sections: BlogSection[]): TocItem[] {
  return sections
    .filter((s) => s.heading?.trim())
    .map((s) => ({ id: slugifyHeading(s.heading as string), text: s.heading as string, level: 2 as const }))
}

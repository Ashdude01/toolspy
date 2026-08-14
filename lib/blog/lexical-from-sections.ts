import type { BlogSection, BlogTable } from '@/lib/blog-data'

type LexNode = Record<string, unknown>

function textNode(value: string, format = 0): LexNode {
  return {
    type: 'text',
    text: value,
    format,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  }
}

function paragraphNode(value?: string, format = 0): LexNode {
  return {
    type: 'paragraph',
    children: value ? [textNode(value, format)] : [],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function headingNode(tag: 'h2' | 'h3', value: string): LexNode {
  return {
    type: 'heading',
    tag,
    children: [textNode(value)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function listItemNode(value: string, index: number): LexNode {
  return {
    type: 'listitem',
    value: index + 1,
    children: [textNode(value)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function listNode(items: string[], listType: 'bullet' | 'number' = 'bullet'): LexNode {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
    children: items.map((item, i) => listItemNode(item, i)),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function tableCellNode(value: string, header: boolean): LexNode {
  return {
    type: 'tablecell',
    headerState: header ? 1 : 0,
    colSpan: 1,
    rowSpan: 1,
    backgroundColor: null,
    children: [paragraphNode(value)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function tableRowNode(cells: string[], header: boolean): LexNode {
  return {
    type: 'tablerow',
    children: cells.map((c) => tableCellNode(c, header)),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function tableNodes(table: BlogTable): LexNode[] {
  const nodes: LexNode[] = []
  if (table.caption) {
    nodes.push(paragraphNode(table.caption, 2)) // italic
  }
  nodes.push({
    type: 'table',
    children: [
      tableRowNode(table.headers, true),
      ...table.rows.map((row) => tableRowNode(row, false)),
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  })
  return nodes
}

/** Convert legacy blog-data sections into Payload Lexical JSON. */
export function sectionsToLexical(sections: BlogSection[]) {
  const children: LexNode[] = []

  for (const section of sections) {
    if (section.heading) children.push(headingNode('h2', section.heading))
    for (const p of section.paragraphs || []) {
      if (p.trim()) children.push(paragraphNode(p.trim()))
    }
    if (section.list?.length) children.push(listNode(section.list, 'bullet'))
    if (section.table) children.push(...tableNodes(section.table))
  }

  if (children.length === 0) children.push(paragraphNode())

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export function hasLexicalContent(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false
  const root = (data as { root?: { children?: unknown[] } }).root
  if (!Array.isArray(root?.children) || root.children.length === 0) return false
  return root.children.some((node) => {
    if (!node || typeof node !== 'object') return false
    const children = (node as { children?: unknown[] }).children
    if (Array.isArray(children) && children.length > 0) return true
    const type = (node as { type?: string }).type
    return type === 'table' || type === 'upload' || type === 'horizontalrule'
  })
}

import { getToolContent } from '@/lib/payload/get-tool-content'

/**
 * ToolCustomSchema — SERVER-ONLY custom JSON-LD injector.
 *
 * Ye component Payload/DB (getToolContent) import karta hai, isliye ise SIRF server
 * components (tool layouts, localized page) me use karo — kabhi kisi "use client"
 * component me nahi (warna Payload node SDK client bundle me chala jayega → fs error).
 *
 * Behaviour: agar CMS me `customSchema` (non-empty object/array) hai to uska
 * <script type="application/ld+json"> render karta hai. Automatic ToolSchemas
 * (DynamicToolLayout se) alag se render hota rehta hai — dono valid JSON-LD blocks
 * hain; custom schema apne extra/override structured-data ke liye hai.
 *
 * DB down / entry nahi / customSchema khali → kuch render nahi (null). Page kabhi
 * nahi tootta.
 */
export async function ToolCustomSchema({
  slug,
  locale = 'en',
}: {
  slug: string
  locale?: string
}) {
  let customSchema: unknown = null
  try {
    const doc = await getToolContent(slug, locale)
    if (doc?.customSchema && isNonEmptySchema(doc.customSchema)) {
      customSchema = doc.customSchema
    }
  } catch {
    // ignore — automatic schema hi kaafi hai
  }

  if (!customSchema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
    />
  )
}

// customSchema tabhi valid maano jab wo non-empty object ya array ho
function isNonEmptySchema(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0
  if (v && typeof v === 'object') return Object.keys(v as object).length > 0
  return false
}

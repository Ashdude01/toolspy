/**
 * ToolSeoContentTemplate — CMS SEO body (single article / legacy sections / FAQ).
 * RelatedTools parent (ToolContentSwitch / locale page) render karta hai —
 * content na ho tab bhi widget dikhe, isliye yahan nahi.
 * Page H1 + intro ab CmsToolHero me hain — yahan dubara nahi.
 */
import { FAQ } from '@/components/ui/faq'
import { Toc, type TocItem } from '@/components/ui/toc'
import { FAQSchema } from '@/components/seo/comprehensive-schemas'
import { RenderRichText } from '@/components/richtext/render-rich-text'
import { getTocFromLexical, splitLeadingHeading } from '@/lib/blog/toc'
import { hasLexicalContent } from '@/lib/blog/lexical-from-sections'
import type { ToolContentDoc } from '@/lib/payload/get-tool-content'

export function ToolSeoContentTemplate({
  slug,
  doc,
  locale = 'en',
}: {
  slug: string
  doc: ToolContentDoc
  locale?: string
}) {
  void slug
  void locale
  const faqs = doc.faqs ?? []
  const useArticle = hasLexicalContent(doc.content)
  const promoted =
    useArticle && !doc.heroHeading?.trim() ? splitLeadingHeading(doc.content) : null
  const articleContent = promoted?.heading ? promoted.content : doc.content
  const sections = doc.sections ?? []

  const excluded = new Set(
    (doc.tocExclude ?? [])
      .map((row) => row?.anchorId?.trim().toLowerCase())
      .filter((id): id is string => Boolean(id)),
  )

  const fromArticle: TocItem[] = useArticle
    ? getTocFromLexical(articleContent)
        .filter((item) => item.id.length > 0)
        .filter((item) => (doc.tocIncludeH3 ? true : item.level === 2))
        .filter((item) => !excluded.has(item.id.toLowerCase()))
        .map((item) => ({ id: item.id, label: item.text, level: item.level }))
    : []

  const fromSections: TocItem[] = !useArticle
    ? sections.map((s) => ({ id: s.anchorId, label: s.heading, level: 2 as const }))
    : []

  const tocItems: TocItem[] = [
    ...(useArticle ? fromArticle : fromSections),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : []),
  ]

  return (
    <>
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      <div className="lg:mt-20 grid gap-10 lg:gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <Toc items={tocItems} />
        </aside>

        <div className="min-w-0 max-w-full">
          <article className="article min-w-0 max-w-full overflow-x-hidden">
            {useArticle ? (
              <RenderRichText data={articleContent} />
            ) : (
              sections.map((s) => (
                <section key={s.anchorId}>
                  <h2 id={s.anchorId}>{s.heading}</h2>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {s.body ? <RenderRichText data={s.body} /> : null}
                </section>
              ))
            )}

            {faqs.length > 0 && (
              <>
                <h2 id="faq">FAQ</h2>
                <FAQ variant="default" faqs={faqs} />
              </>
            )}

            {doc.disclaimer && (
              <p className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-xs leading-relaxed">
                <strong>Disclaimer:</strong> {doc.disclaimer}
              </p>
            )}
          </article>
        </div>
      </div>
    </>
  )
}

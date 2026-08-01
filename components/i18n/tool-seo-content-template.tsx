/**
 * ToolSeoContentTemplate — CMS content ko EXACTLY coast-fire-calculator ke
 * layout me render karta hai:
 *
 *   - Top: RelatedTools nav
 *   - Grid: LEFT me Toc (280px sidebar), RIGHT me <article className="article">
 *   - Sections: h2 with anchor id (TOC auto-generated from sections)
 *   - FAQ: existing <FAQ> component + FAQ JSON-LD schema
 *   - Optional disclaimer box at end
 *
 * Wahi existing components + wahi CSS classes reuse hoti hain jo
 * coast-fire-calculator/seo-content.tsx use karta hai — isliye look 100% same
 * rahega, har language me. Content team layout ko touch nahi kar sakti.
 *
 * Server component — no "use client", full HTML crawlers ko milta hai.
 */
import { RelatedTools } from '@/components/tools/related-tools'
import { FAQ } from '@/components/ui/faq'
import { Toc, type TocItem } from '@/components/ui/toc'
import { FAQSchema } from '@/components/seo/comprehensive-schemas'
import { RenderRichText } from '@/components/richtext/render-rich-text'
import type { ToolContentDoc } from '@/lib/payload/get-tool-content'

export function ToolSeoContentTemplate({
  slug,
  doc,
}: {
  slug: string
  doc: ToolContentDoc
}) {
  const sections = doc.sections ?? []
  const faqs = doc.faqs ?? []

  // TOC sections se AUTO-generate — kabhi out-of-sync nahi ho sakta
  const tocItems: TocItem[] = [
    ...sections.map((s) => ({ id: s.anchorId, label: s.heading })),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : []),
  ]

  return (
    <>
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      <nav aria-label="Similar tools" className="mb-12">
        <RelatedTools currentToolSlug={slug} />
      </nav>

      <div className="lg:mt-20 grid gap-10 lg:gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <Toc items={tocItems} />
        </aside>

        <div className="min-w-0 max-w-full">
          <article className="article min-w-0 max-w-full overflow-x-hidden">
            {sections.map((s) => (
              <section key={s.anchorId}>
                <h2 id={s.anchorId}>{s.heading}</h2>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {s.body ? <RenderRichText data={s.body} /> : null}
              </section>
            ))}

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

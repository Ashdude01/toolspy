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
import { getToolBySlug } from '@/lib/tools-data'

export function ToolSeoContentTemplate({
  slug,
  doc,
  locale = 'en',
}: {
  slug: string
  doc: ToolContentDoc
  locale?: string
}) {
  const sections = doc.sections ?? []
  const faqs = doc.faqs ?? []

  // Page ka single <h1> — code-fallback seo-content.tsx ke "intro (H1)" block ko mirror
  // karta hai. Pehle ye missing tha: CMS-active / localized (/de/ …) tool pages me koi
  // <h1> hi nahi hota tha (hero page.tsx me <h2>, sections bhi <h2>) → SEO bug. Code
  // pages pehle se yahi structure use karte hain (hero h2 + ek content h1), isliye
  // CMS pages ab unke saath consistent ho jaate hain. Sirf tab render hota hai jab
  // CMS active ho (ye component tabhi mount hota hai), isliye code pages pe double-h1
  // ka koi risk nahi.
  //
  // Phase C: heading + intro line ab CMS-driven aur PER-LOCALE hain —
  //   heroHeading (localized)     → khali to tool ka default naam.
  //   heroDescription (localized) → khali to metaDescription → khali to kuchh nahi.
  // Isse /de/ jaise localized pages par title/intro bhi translate ho jaate hain
  // (content team CMS se manage karti hai).
  const heading = doc.heroHeading?.trim() || getToolBySlug(slug)?.name || slug
  const introText = doc.heroDescription?.trim() || doc.metaDescription?.trim() || ''

  // TOC sections se AUTO-generate — kabhi out-of-sync nahi ho sakta
  const tocItems: TocItem[] = [
    ...sections.map((s) => ({ id: s.anchorId, label: s.heading })),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : []),
  ]

  return (
    <>
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      {/* Intro (H1) — page-title heading. Heading order theek rakhne ke liye
          RelatedTools (h3) se PEHLE aata hai. */}
      <section id="intro" className="space-y-3 mb-10">
        <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
          {heading}
        </h1>
        {introText ? (
          <p className="text-start md:text-center text-muted-foreground max-w-3xl mx-auto">
            {introText}
          </p>
        ) : null}
      </section>

      <nav aria-label="Similar tools" className="mb-12">
        <RelatedTools currentToolSlug={slug} locale={locale} />
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

import { Suspense } from 'react'
import { getToolContent } from '@/lib/payload/get-tool-content'
import { isToolCmsContentActive } from '@/lib/payload/tool-cms-content'
import { ToolSeoContentTemplate } from '@/components/i18n/tool-seo-content-template'
import { ToolCustomSchema } from '@/components/seo/tool-custom-schema'
import { RelatedTools } from '@/components/tools/related-tools'

/**
 * ToolContentSwitch — tool pages ko CMS-aware banata hai.
 *
 * contentSource === 'cms' (+ article body or legacy sections) → CMS template
 * otherwise → codeFallback (hardcoded seo-content), every locale.
 * Locale routes (/de/...) use the same rule in [locale]/[slug]/page.tsx.
 *
 * RelatedTools hamesha tool widget ke baad yahan render hota hai — CMS/code
 * SEO content se independent (content na ho tab bhi dikhe).
 *
 * Outer Suspense: production / Vercel pe Payload+Neon cold-start layout ko block
 * nahi karta — pehle hardcoded codeFallback dikhta hai, phir CMS jab ready ho.
 */
export function ToolContentSwitch({
  slug,
  locale = 'en',
  codeFallback,
  showRelatedTools = true,
}: {
  slug: string
  locale?: string
  codeFallback?: React.ReactNode
  /** Set false when parent already renders RelatedTools (e.g. locale dispatcher). */
  showRelatedTools?: boolean
}) {
  return (
    <Suspense
      fallback={
        <>
          {showRelatedTools ? (
            <nav aria-label="Similar tools" className="mb-12">
              <RelatedTools currentToolSlug={slug} locale={locale} />
            </nav>
          ) : null}
          {codeFallback ?? null}
        </>
      }
    >
      <ToolContentSwitchInner
        slug={slug}
        locale={locale}
        codeFallback={codeFallback}
        showRelatedTools={showRelatedTools}
      />
    </Suspense>
  )
}

async function ToolContentSwitchInner({
  slug,
  locale = 'en',
  codeFallback,
  showRelatedTools = true,
}: {
  slug: string
  locale?: string
  codeFallback?: React.ReactNode
  showRelatedTools?: boolean
}) {
  const doc = await getToolContent(slug, locale)
  const cmsActive = isToolCmsContentActive(doc)
  return (
    <>
      <ToolCustomSchema slug={slug} locale={locale} />
      {showRelatedTools ? (
        <nav aria-label="Similar tools" className="mb-12">
          <RelatedTools currentToolSlug={slug} locale={locale} />
        </nav>
      ) : null}
      {cmsActive && doc ? (
        <ToolSeoContentTemplate slug={slug} doc={doc} locale={locale} />
      ) : (
        codeFallback
      )}
    </>
  )
}

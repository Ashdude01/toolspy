import { Suspense } from 'react'
import { getToolContent } from '@/lib/payload/get-tool-content'
import { ToolSeoContentTemplate } from '@/components/i18n/tool-seo-content-template'
import { ToolCustomSchema } from '@/components/seo/tool-custom-schema'

/**
 * ToolContentSwitch — English (main) tool pages ko CMS-aware banata hai.
 *
 * Outer Suspense: production / Vercel pe Payload+Neon cold-start layout ko block
 * nahi karta — pehle hardcoded codeFallback dikhta hai, phir CMS jab ready ho.
 * Force-static build me dono resolve ho kar full HTML me bake ho jate hain.
 */
export function ToolContentSwitch({
  slug,
  locale = 'en',
  codeFallback,
}: {
  slug: string
  locale?: string
  codeFallback: React.ReactNode
}) {
  return (
    <Suspense fallback={codeFallback}>
      <ToolContentSwitchInner
        slug={slug}
        locale={locale}
        codeFallback={codeFallback}
      />
    </Suspense>
  )
}

async function ToolContentSwitchInner({
  slug,
  locale = 'en',
  codeFallback,
}: {
  slug: string
  locale?: string
  codeFallback: React.ReactNode
}) {
  const doc = await getToolContent(slug, locale)
  const cmsActive = doc?.contentSource === 'cms' && (doc.sections?.length ?? 0) > 0
  return (
    <>
      <ToolCustomSchema slug={slug} locale={locale} />
      {cmsActive && doc ? (
        <ToolSeoContentTemplate slug={slug} doc={doc} />
      ) : (
        codeFallback
      )}
    </>
  )
}

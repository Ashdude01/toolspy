import type { Metadata } from 'next'
import { TestimonialsSection } from '@/components/home2/testimonials-section'
import { HomeSeoContent } from '@/components/sections/home-seo-content'
import { WebPageSchema, FAQSchema } from '@/components/seo/comprehensive-schemas'
import { siteConfig } from '@/lib/config'
import { HomePageClient } from '@/components/home2/home-page-client'
import { HomePrivacySections } from '@/components/home2/home-privacy-sections'
import { homeFaqData } from '@/lib/home-faq-data'
import { getHomepagePopularTools, getHomepageContent } from '@/lib/payload/get-homepage'
import { RenderRichText } from '@/components/richtext/render-rich-text'
import { hasLexicalContent } from '@/lib/blog/lexical-from-sections'
import { ALL_LOCALES, PUBLISHED_LOCALES } from '@/lib/i18n/locales'
import { getT } from '@/lib/i18n/messages'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

/**
 * HomePageView — homepage ka locale-aware render (tool-page jaisa hybrid).
 *
 * Layout (hero + popular tool cards + testimonials) HAMESHA code se.
 * SEO content block: agar is locale ka homepage `contentSource === 'cms'` hai
 * aur content bhara hai → CMS rich text render (RenderRichText), warna built-in
 * <HomeSeoContent /> (code). Per-language toggle CMS se hota hai.
 *
 * Ye ek VIEW component hai (route nahi) — English `page.tsx` aur `[locale]/page.tsx`
 * dono locale ke saath ise use karte hain.
 */
function homeUrl(locale: string): string {
  return locale && locale !== 'en' ? `${siteConfig.url}/${locale}/` : `${siteConfig.url}/`
}

/** Locale-aware homepage metadata (CMS title/desc jab ho) + hreflang (published). */
export async function buildHomepageMetadata(locale = 'en'): Promise<Metadata> {
  const content = await getHomepageContent(locale)
  const cms = content?.contentSource === 'cms'
  const canonical = homeUrl(locale)
  const t = getT(locale)
  const description =
    cms && content?.metaDescription
      ? limitDescription(content.metaDescription)
      : limitDescription(t('homeLanding.metaDescription'))

  const meta: Metadata = {
    description,
    openGraph: { description, url: canonical },
    twitter: { description },
    alternates: { canonical },
  }
  if (cms && content?.metaTitle) meta.title = limitTitle(content.metaTitle)

  if (PUBLISHED_LOCALES.length > 0) {
    const languages: Record<string, string> = {
      'x-default': `${siteConfig.url}/`,
      en: `${siteConfig.url}/`,
    }
    for (const code of PUBLISHED_LOCALES) {
      const info = ALL_LOCALES[code]
      if (info) languages[info.hreflang] = `${siteConfig.url}/${code}/`
    }
    meta.alternates = { canonical, languages }
  }
  return meta
}

export async function HomePageView({ locale = 'en' }: { locale?: string }) {
  const [popularTools, homeContent] = await Promise.all([
    getHomepagePopularTools(),
    getHomepageContent(locale),
  ])
  const cmsActive =
    homeContent?.contentSource === 'cms' && hasLexicalContent(homeContent.content)
  const description = limitDescription(getT(locale)('homeLanding.metaDescription'))

  return (
    <>
      <WebPageSchema
        title={siteConfig.title}
        description={description}
        url={homeUrl(locale)}
        breadcrumbs={[{ name: 'Home', url: homeUrl(locale) }]}
      />
      {/* FAQ stays even when CMS content is shown above it */}
      <FAQSchema faqs={[...homeFaqData]} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden w-full">
        <HomePageClient popularTools={popularTools} />
        <HomePrivacySections locale={locale} />
        <TestimonialsSection />

        <HomeSeoContent
          faqData={[...homeFaqData]}
          locale={locale}
          beforeFaq={
            cmsActive ? (
              <section className="container mx-auto max-w-5xl px-0" aria-label="Homepage content">
                <div className="article min-w-0 max-w-full overflow-x-hidden">
                  <RenderRichText data={homeContent?.content} />
                </div>
              </section>
            ) : null
          }
          hideBuiltinArticle={cmsActive}
        />
      </div>
    </>
  )
}

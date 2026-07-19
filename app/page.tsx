import { TestimonialsSection } from "@/components/home2/testimonials-section"
import { HomeSeoContent } from "@/components/sections/home-seo-content"
import { WebPageSchema, FAQSchema } from "@/components/seo/comprehensive-schemas"
import { siteConfig } from "@/lib/config"
import { HomePageClient } from "@/components/home2/home-page-client"
import { homeFaqData } from "@/lib/home-faq-data"
import type { Metadata } from "next"
import { ALL_LOCALES, PUBLISHED_LOCALES } from "@/lib/i18n/locales"

export function generateMetadata(): Metadata {
  // hreflang sirf jab locales publish hon — warna metadata unchanged
  if (PUBLISHED_LOCALES.length === 0) return {}
  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}/`,
    en: `${siteConfig.url}/`,
  }
  for (const code of PUBLISHED_LOCALES) {
    const info = ALL_LOCALES[code]
    if (info) languages[info.hreflang] = `${siteConfig.url}/${code}/`
  }
  return { alternates: { canonical: `${siteConfig.url}/`, languages } }
}

export default function HomePage() {

  return (
    <>
      <WebPageSchema
        title={siteConfig.title}
        description={siteConfig.description}
        url={siteConfig.url}
        breadcrumbs={[
          { name: "Home", url: siteConfig.url }
        ]}
      />
      <FAQSchema faqs={[...homeFaqData]} />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden w-full">
        <HomePageClient />
        <HomeSeoContent faqData={[...homeFaqData]} />
        <TestimonialsSection />
      </div>
    </>
  )
}


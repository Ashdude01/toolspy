import { TestimonialsSection } from "@/components/home2/testimonials-section"
import { HomeSeoContent } from "@/components/sections/home-seo-content"
import { WebPageSchema, FAQSchema } from "@/components/seo/comprehensive-schemas"
import { siteConfig } from "@/lib/config"
import { HomePageClient } from "@/components/home2/home-page-client"
import { homeFaqData } from "@/lib/home-faq-data"

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden w-full">
        <HomePageClient />
        <HomeSeoContent faqData={[...homeFaqData]} />
        <TestimonialsSection />
      </div>
    </>
  )
}


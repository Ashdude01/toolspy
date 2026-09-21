import { buildPagesSitemap } from '@/lib/seo/sitemap-entries'
import { toUrlSetXml, sitemapXmlResponse } from '@/lib/seo/sitemap-xml'

export const revalidate = 3600

/** Named child sitemap: static + listing pages (EN + published locales). */
export function GET() {
  return sitemapXmlResponse(toUrlSetXml(buildPagesSitemap()))
}

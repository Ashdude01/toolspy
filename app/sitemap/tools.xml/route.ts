import { buildToolsSitemap } from '@/lib/seo/sitemap-entries'
import { toUrlSetXml, sitemapXmlResponse } from '@/lib/seo/sitemap-xml'

export const revalidate = 86400

/** Named child sitemap: all active tools (+ published locale variants). */
export function GET() {
  return sitemapXmlResponse(toUrlSetXml(buildToolsSitemap()))
}

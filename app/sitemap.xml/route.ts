import { toSitemapIndexXml, sitemapXmlResponse } from '@/lib/seo/sitemap-xml'

export const revalidate = 3600

/** Sitemap index → /sitemap/pages.xml, /sitemap/tools.xml, /sitemap/blog.xml */
export function GET() {
  return sitemapXmlResponse(toSitemapIndexXml())
}

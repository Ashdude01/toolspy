import { toSitemapIndexXml, sitemapXmlResponse } from '@/lib/seo/sitemap-xml'

export const revalidate = 86400

/** Sitemap index → /sitemap/pages.xml, /sitemap/tools.xml, /sitemap/blog.xml */
export function GET() {
  return sitemapXmlResponse(toSitemapIndexXml())
}

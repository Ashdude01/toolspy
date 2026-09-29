import { buildBlogSitemap } from '@/lib/seo/sitemap-entries'
import { toUrlSetXml, sitemapXmlResponse } from '@/lib/seo/sitemap-xml'

export const revalidate = 3600

/** Named child sitemap: blog posts + authors (CMS-driven, multilingual). */
export async function GET() {
  const entries = await buildBlogSitemap()
  return sitemapXmlResponse(toUrlSetXml(entries))
}

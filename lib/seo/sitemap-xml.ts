import type { MetadataRoute } from 'next'
import { SITEMAP_BASE_URL, SITEMAP_CHILDREN } from './sitemap-entries'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatLastMod(value?: string | Date): string | undefined {
  if (!value) return undefined
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString()
}

/** Serialize a urlset with optional xhtml hreflang alternates. */
export function toUrlSetXml(entries: MetadataRoute.Sitemap): string {
  const hasAlternates = entries.some(
    (e) => e.alternates?.languages && Object.keys(e.alternates.languages).length > 0,
  )
  const xhtmlNs = hasAlternates ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : ''

  const urls = entries
    .map((entry) => {
      const parts = [`    <loc>${escapeXml(entry.url)}</loc>`]
      const lastmod = formatLastMod(entry.lastModified)
      if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
      if (entry.changeFrequency) {
        parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`)
      }
      if (typeof entry.priority === 'number') {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
      }
      const langs = entry.alternates?.languages
      if (langs) {
        for (const [hreflang, href] of Object.entries(langs)) {
          if (typeof href !== 'string') continue
          parts.push(
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`,
          )
        }
      }
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xhtmlNs}>
${urls}
</urlset>
`
}

/** Sitemap index pointing at named child sitemaps. */
export function toSitemapIndexXml(lastModified = new Date()): string {
  const lastmod = formatLastMod(lastModified)
  const items = SITEMAP_CHILDREN.map(({ path }) => {
    const lines = [`    <loc>${escapeXml(`${SITEMAP_BASE_URL}${path}`)}</loc>`]
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`)
    return `  <sitemap>\n${lines.join('\n')}\n  </sitemap>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>
`
}

export function sitemapXmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  })
}

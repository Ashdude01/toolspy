/**
 * Single public host for SEO: https://toolspy.net (never www).
 * Strips www, trailing slash, path, and query from env / hardcoded values.
 */
export const CANONICAL_SITE_ORIGIN = 'https://toolspy.net'
export const CANONICAL_SITE_DOMAIN = 'toolspy.net'

export function canonicalizeSiteUrl(raw?: string | null): string {
  const fallback = CANONICAL_SITE_ORIGIN
  try {
    const u = new URL((raw || fallback).trim() || fallback)
    const host = u.hostname.toLowerCase().replace(/^www\./, '')
    if (host === CANONICAL_SITE_DOMAIN || host.endsWith(`.${CANONICAL_SITE_DOMAIN}`)) {
      // Production apex only — ignore www / accidental env typos.
      if (host === CANONICAL_SITE_DOMAIN) return CANONICAL_SITE_ORIGIN
    }
    u.hostname = host
    u.hash = ''
    u.search = ''
    u.pathname = ''
    return u.origin
  } catch {
    return fallback
  }
}

export function canonicalizeSiteDomain(raw?: string | null): string {
  const host = (raw || CANONICAL_SITE_DOMAIN).trim().toLowerCase().replace(/^www\./, '')
  return host || CANONICAL_SITE_DOMAIN
}

/**
 * localizeHref(locale, href) — internal link ko locale-aware banata hai (N-2 fix).
 *
 * Rule (SAFE — kabhi 404 nahi banata):
 *   - English (default) locale → href unchanged.
 *   - External / anchor / already-localized href → unchanged.
 *   - Home '/'                → '/<locale>'.
 *   - '/blog', '/blog/<slug>' → localized (par '/blog/author/...' nahi).
 *   - single-segment slug jo ROUTABLE hai (tool ya static page) → '/<locale>/<slug>'.
 *   - baaki sab (/tools/<category>, /extensions/*, unknown) → English hi (locale
 *     me exist nahi karta, isliye prefix mat lagao).
 *
 * Client-safe: sirf plain arrays import karta hai (routable-slugs.ts), tool-registry
 * ya Payload nahi.
 */
import { DEFAULT_LOCALE } from './locales'
import { ROUTABLE_TOOL_SLUGS, ROUTABLE_STATIC_SLUGS } from './routable-slugs'

const ROUTABLE = new Set<string>([...ROUTABLE_TOOL_SLUGS, ...ROUTABLE_STATIC_SLUGS])

export function localizeHref(locale: string, href: string): string {
  if (!locale || locale === DEFAULT_LOCALE) return href
  if (!href || !href.startsWith('/')) return href // external, mailto, #anchor
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href // already localized

  if (href === '/') return `/${locale}`

  const pathPart = href.split(/[?#]/)[0]
  const segments = pathPart.split('/').filter(Boolean)
  const first = segments[0]

  // Blog index + posts localized hain; author pages nahi.
  if (first === 'blog') {
    if (segments[1] === 'author') return href
    return `/${locale}${href}`
  }

  // Single-segment routable slug (tool ya static page).
  if (segments.length === 1 && ROUTABLE.has(first)) return `/${locale}${href}`

  // Baaki sab English (localized route exist nahi karta).
  return href
}

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')

type MediaLike = {
  url?: string | null
  alt?: string | null
  sizes?: {
    wide?: { url?: string | null }
    card?: { url?: string | null }
    thumbnail?: { url?: string | null }
  } | null
}

export function toAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  return `${SITE}${url.startsWith('/') ? '' : '/'}${url}`
}

export function mediaSrc(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') return toAbsoluteUrl(value)
  if (typeof value !== 'object') return null
  const doc = value as MediaLike
  const rel =
    doc.sizes?.wide?.url ||
    doc.sizes?.card?.url ||
    doc.sizes?.thumbnail?.url ||
    doc.url ||
    null
  return toAbsoluteUrl(rel)
}

export function mediaAlt(value: unknown, fallback = ''): string {
  if (value && typeof value === 'object' && 'alt' in value) {
    const alt = (value as MediaLike).alt
    if (typeof alt === 'string' && alt.trim()) return alt.trim()
  }
  return fallback
}

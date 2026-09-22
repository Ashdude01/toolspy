/**
 * Instagram DP (profile picture) helpers — username parse + HTML/JSON extract.
 * Server-only fetch lives in /api/instagram-dp.
 */

export type InstagramDpResult = {
  username: string
  fullName?: string
  biography?: string
  isPrivate?: boolean
  followersText?: string
  profilePicUrl: string
  profilePicUrlHd?: string
  source: 'web_profile_info' | 'html_meta' | 'html_json' | 'direct_url'
}

const RESERVED = new Set([
  'p',
  'reel',
  'reels',
  'stories',
  'explore',
  'accounts',
  'direct',
  'legal',
  'about',
  'developer',
  'directory',
  'web',
  'api',
  'graphql',
])

/** Accept @user, username, or https://instagram.com/user/… */
export function parseInstagramUsername(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null

  let candidate = raw.replace(/^@+/, '')

  try {
    if (/^https?:\/\//i.test(candidate) || candidate.includes('instagram.com')) {
      const withProto = /^https?:\/\//i.test(candidate)
        ? candidate
        : `https://${candidate.replace(/^\/+/, '')}`
      const u = new URL(withProto)
      if (!u.hostname.replace(/^www\./, '').includes('instagram.com')) return null
      const seg = u.pathname.split('/').filter(Boolean)[0]
      if (!seg || RESERVED.has(seg.toLowerCase())) return null
      candidate = seg
    }
  } catch {
    return null
  }

  candidate = candidate.split(/[/?#]/)[0].replace(/^@+/, '')
  if (!/^[A-Za-z0-9._]{1,30}$/.test(candidate)) return null
  if (RESERVED.has(candidate.toLowerCase())) return null
  return candidate
}

export function isDirectImageUrl(input: string): boolean {
  try {
    const u = new URL(input.trim())
    if (!/^https?:$/i.test(u.protocol)) return false
    return isInstagramCdnHost(u.hostname) || /\.(jpe?g|png|webp)(\?|$)/i.test(u.pathname)
  } catch {
    return false
  }
}

/** Prefer HD URL; strip common size tokens when only a small CDN URL exists. */
export function preferHdProfilePic(url: string): string {
  let out = url.replace(/&amp;/g, '&')
  out = out.replace(/\/s\d+x\d+\//g, '/')
  out = out.replace(/\/c\d+\.\d+\.\d+\.\d+\//g, '/')
  return out
}

function unescapeJsonUrl(s: string): string {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\\//g, '/')
    .replace(/\\"/g, '"')
    .replace(/&amp;/g, '&')
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&#064;/g, '@')
    .replace(/&#x2022;/g, '•')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

/** Pick the largest-looking scontent profile URL from HTML (by sWxH token). */
export function pickLargestScontentUrl(html: string): string | null {
  const urls = [
    ...html.matchAll(/https:\/\/scontent[^"'\\\s<>]+/gi),
  ].map((m) => unescapeJsonUrl(m[0]))

  const scored = urls
    .filter((u) => /cdninstagram|\.fbcdn\.|scontent\./i.test(u))
    .filter((u) => !/rsrc\.php|static\.cdninstagram/i.test(u))
    .map((u) => {
      const m = u.match(/s(\d+)x(\d+)/i)
      const score = m ? Number(m[1]) * Number(m[2]) : 50_000
      return { u, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]?.u ?? null
}

export function extractDpFromHtml(html: string, username: string): InstagramDpResult | null {
  const hdMatch =
    html.match(/"profile_pic_url_hd"\s*:\s*"([^"]+)"/i) ||
    html.match(/"hd_profile_pic_url_info"\s*:\s*\{[^}]*"url"\s*:\s*"([^"]+)"/i)
  const stdMatch = html.match(/"profile_pic_url"\s*:\s*"([^"]+)"/i)
  const ogMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)

  const titleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
  const descMatch = html.match(
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
  )
  const privateMatch = html.match(/"is_private"\s*:\s*(true|false)/i)

  const hdRaw = hdMatch?.[1] ? unescapeJsonUrl(hdMatch[1]) : undefined
  const stdRaw = stdMatch?.[1] ? unescapeJsonUrl(stdMatch[1]) : undefined
  const og = ogMatch?.[1] ? unescapeJsonUrl(ogMatch[1]) : undefined
  const largest = pickLargestScontentUrl(html)

  const hd = hdRaw && /^https?:\/\//i.test(hdRaw) ? hdRaw : undefined
  const std = stdRaw && /^https?:\/\//i.test(stdRaw) ? stdRaw : undefined

  // Prefer largest CDN candidate over tiny og:image when both exist
  const profilePicUrl = hd || std || largest || og
  if (!profilePicUrl) return null

  let fullName: string | undefined
  if (titleMatch?.[1]) {
    const decoded = decodeHtmlEntities(titleMatch[1])
    const m = decoded.match(/^(.+?)\s*\(/)
    fullName = m?.[1]?.trim() || undefined
  }

  const followersText = descMatch?.[1]
    ? decodeHtmlEntities(descMatch[1]).split('-')[0]?.trim()
    : undefined

  const best = preferHdProfilePic(profilePicUrl)
  return {
    username,
    fullName,
    followersText,
    isPrivate: privateMatch ? privateMatch[1] === 'true' : undefined,
    profilePicUrl: best,
    profilePicUrlHd: hd ? preferHdProfilePic(hd) : best,
    source: hd || std ? 'html_json' : 'html_meta',
  }
}

export function extractDpFromWebProfileInfo(
  data: unknown,
  username: string,
): InstagramDpResult | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (data as any)?.data?.user
  if (!user) return null

  const hd =
    user.profile_pic_url_hd ||
    user.hd_profile_pic_url_info?.url ||
    user.hd_profile_pic_versions?.slice(-1)?.[0]?.url
  const std = user.profile_pic_url
  const profilePicUrl = hd || std
  if (!profilePicUrl || typeof profilePicUrl !== 'string') return null

  return {
    username: typeof user.username === 'string' ? user.username : username,
    fullName: typeof user.full_name === 'string' ? user.full_name : undefined,
    biography: typeof user.biography === 'string' ? user.biography : undefined,
    isPrivate: Boolean(user.is_private),
    profilePicUrl: preferHdProfilePic(profilePicUrl),
    profilePicUrlHd: hd ? preferHdProfilePic(String(hd)) : undefined,
    source: 'web_profile_info',
  }
}

export function isInstagramCdnHost(hostname: string): boolean {
  const h = hostname.toLowerCase()
  return (
    h.endsWith('cdninstagram.com') ||
    h.endsWith('fbcdn.net') ||
    h.includes('instagram.') ||
    h.startsWith('scontent.') ||
    h.includes('fbcdn')
  )
}

/** Social-preview bots get public og:image; browsers often get a login wall. */
export const INSTAGRAM_CRAWLER_UA =
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'

export const INSTAGRAM_BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

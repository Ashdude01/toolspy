import { NextRequest, NextResponse } from 'next/server'
import {
  INSTAGRAM_BROWSER_UA,
  INSTAGRAM_CRAWLER_UA,
  extractDpFromHtml,
  extractDpFromWebProfileInfo,
  isDirectImageUrl,
  parseInstagramUsername,
  type InstagramDpResult,
} from '@/lib/utils/instagram-dp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const IG_APP_ID = '936619743392459'

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

function sessionCookie(): string | undefined {
  return (
    process.env.INSTAGRAM_SESSION_COOKIE ||
    process.env.IG_SESSION_COOKIE ||
    undefined
  )
}

async function fetchWebProfileInfo(username: string): Promise<InstagramDpResult | null> {
  const cookie = sessionCookie()
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': INSTAGRAM_BROWSER_UA,
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'X-IG-App-ID': IG_APP_ID,
      'X-ASBD-ID': '129477',
      'X-Requested-With': 'XMLHttpRequest',
      Referer: `https://www.instagram.com/${username}/`,
      Origin: 'https://www.instagram.com',
      ...(cookie ? { Cookie: cookie } : {}),
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
    cache: 'no-store',
  })

  if (!res.ok) return null
  const data = await res.json()
  return extractDpFromWebProfileInfo(data, username)
}

/** Crawler UA returns public profile og:image (works without login). */
async function fetchProfileViaCrawler(username: string): Promise<InstagramDpResult | null> {
  const url = `https://www.instagram.com/${encodeURIComponent(username)}/`
  const res = await fetch(url, {
    headers: {
      'User-Agent': INSTAGRAM_CRAWLER_UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
    cache: 'no-store',
  })

  if (res.status === 404) return null
  if (!res.ok) return null

  const html = await res.text()
  return extractDpFromHtml(html, username)
}

async function fetchViaDownloaderApi(username: string): Promise<InstagramDpResult | null> {
  const apiUrl = process.env.NEXT_PUBLIC_DOWNLOADER_API_URL
  if (!apiUrl) return null

  const profileUrl = `https://www.instagram.com/${username}/`
  const requestUrl = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}url=${encodeURIComponent(profileUrl)}`
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY) {
    headers['X-API-KEY'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY
    headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY
  }
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST) {
    headers['X-API-HOST'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST
    headers['X-RapidAPI-Host'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST
  }

  const res = await fetch(requestUrl, {
    headers,
    cache: 'no-store',
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) return null
  const data = await res.json()
  const pic =
    data.profile_pic_url_hd ||
    data.profilePicUrlHd ||
    data.thumbnail ||
    data.image ||
    data.thumb ||
    data.url
  if (!pic || typeof pic !== 'string') return null

  return {
    username,
    fullName: data.full_name || data.fullName || data.title || undefined,
    biography: data.biography || data.description || undefined,
    profilePicUrl: pic,
    profilePicUrlHd: pic,
    source: 'web_profile_info',
  }
}

export async function GET(request: NextRequest) {
  const raw =
    request.nextUrl.searchParams.get('username') ||
    request.nextUrl.searchParams.get('u') ||
    request.nextUrl.searchParams.get('url') ||
    ''

  const trimmed = raw.trim()

  // Direct CDN / image URL — skip lookup
  if (isDirectImageUrl(trimmed)) {
    return NextResponse.json({
      ok: true,
      username: 'download',
      fullName: null,
      biography: null,
      isPrivate: null,
      followersText: null,
      profilePicUrl: trimmed,
      profilePicUrlHd: trimmed,
      source: 'direct_url',
    })
  }

  const username = parseInstagramUsername(trimmed)
  if (!username) {
    return jsonError('Enter a valid Instagram username, profile URL, or direct image link', 400)
  }

  try {
    // 1) Official-ish JSON (best HD) — needs session cookie on many hosts
    let result = await fetchWebProfileInfo(username)

    // 2) Optional RapidAPI / downloader
    if (!result?.profilePicUrl) {
      result = await fetchViaDownloaderApi(username)
    }

    // 3) Social-crawler HTML (reliable public og:image without login)
    if (!result?.profilePicUrl) {
      result = await fetchProfileViaCrawler(username)
    }

    if (!result?.profilePicUrl) {
      return jsonError(
        'Could not load this profile picture. The account may be private, removed, or temporarily blocked. You can also paste a direct image URL.',
        404,
      )
    }

    return NextResponse.json({
      ok: true,
      username: result.username,
      fullName: result.fullName ?? null,
      biography: result.biography ?? null,
      isPrivate: result.isPrivate ?? null,
      followersText: result.followersText ?? null,
      profilePicUrl: result.profilePicUrl,
      profilePicUrlHd: result.profilePicUrlHd || result.profilePicUrl,
      source: result.source,
    })
  } catch (err) {
    console.warn('[instagram-dp]', err)
    return jsonError('Lookup failed. Please try again in a moment.', 502)
  }
}

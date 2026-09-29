import { NextRequest, NextResponse } from 'next/server'
import { isInstagramCdnHost } from '@/lib/utils/instagram-dp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('url')
  if (!raw) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  if (!isInstagramCdnHost(target.hostname)) {
    return NextResponse.json({ error: 'URL host not allowed' }, { status: 400 })
  }

  try {
    const upstream = await fetch(target.href, {
      headers: {
        'User-Agent': BROWSER_UA,
        Referer: 'https://www.instagram.com/',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(30000),
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 })
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg'
    const buf = await upstream.arrayBuffer()
    const ext = contentType.includes('png')
      ? 'png'
      : contentType.includes('webp')
        ? 'webp'
        : 'jpg'
    const name = request.nextUrl.searchParams.get('filename') || `instagram-dp.${ext}`

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
        'Content-Disposition': `attachment; filename="${name.replace(/[^\w.\-@]+/g, '_')}"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 })
  }
}

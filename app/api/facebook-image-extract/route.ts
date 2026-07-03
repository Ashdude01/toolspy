import { NextRequest, NextResponse } from "next/server";
import {
  facebookUrlVariants,
  looksLikeFacebookBlockPage,
  parseAllImagesFromHtml,
  parseOgDescriptionFromHtml,
  parseOgTitleFromHtml,
} from "@/lib/utils/facebook-extractor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const BROWSER_LIKE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

// A lightweight UA helps mbasic.facebook.com serve the plain-HTML photo page.
const MOBILE_UA =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36";

// Cookies that skip the GDPR/age consent interstitial for public content.
const CONSENT_COOKIE =
  "locale=en_US; wd=1920x1080; dpr=1; m_pixel_ratio=1; vpd=v1; usida=1; datr=AAAAAAAAAAAAAAAAAAAAAA";

function isFacebookHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "facebook.com" ||
    h.endsWith(".facebook.com") ||
    h === "fb.com" ||
    h.endsWith(".fb.com") ||
    h === "fb.watch"
  );
}

interface PageResult {
  images: string[];
  title?: string;
  description?: string;
}

function parsePage(html: string): PageResult {
  return {
    images: parseAllImagesFromHtml(html),
    title: parseOgTitleFromHtml(html),
    description: parseOgDescriptionFromHtml(html),
  };
}

/** Fetch a URL with browser-like headers, returning HTML text or null. */
async function fetchHtml(pageUrl: string, mobile = false): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent": mobile ? MOBILE_UA : BROWSER_LIKE_UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Cookie: CONSENT_COOKIE,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Strategy 1 - direct fetch across host variants (www / m / mbasic).
 * mbasic + mobile UA is the most reliable for public photos.
 */
async function tryDirect(rawUrl: string): Promise<PageResult | null> {
  // Cap variants to keep serverless execution time (and cost) low - this route
  // is only a fallback for when the client-side proxies fail.
  const variants = facebookUrlVariants(rawUrl).slice(0, 4);
  let blockedFallback: PageResult | null = null;

  for (const pageUrl of variants) {
    const mobile = /\/\/(?:m|mbasic)\.facebook\.com/i.test(pageUrl);
    const html = await fetchHtml(pageUrl, mobile);
    if (!html) continue;

    const parsed = parsePage(html);
    if (parsed.images.length > 0) {
      // If the page wasn't a block wall, this is a confident hit.
      if (!looksLikeFacebookBlockPage(html)) return parsed;
      // og:image present but page looks like a wall - keep as a last resort.
      if (!blockedFallback) blockedFallback = parsed;
    }
  }
  return blockedFallback;
}

/**
 * Strategy 2 - reader proxies. These fetch Facebook from non-datacenter IPs,
 * which sidesteps the login wall that Facebook serves to Vercel's IP ranges.
 */
async function tryReaderProxies(rawUrl: string): Promise<PageResult | null> {
  const canonical = facebookUrlVariants(rawUrl).find((v) =>
    /\/\/www\.facebook\.com/i.test(v),
  ) || rawUrl;

  // The client already tries allorigins/corsproxy, so the server only adds value
  // with r.jina.ai (renders JS from a non-datacenter IP). One backup proxy kept.
  const proxies: Array<{ url: string; headers?: Record<string, string>; json?: boolean }> = [
    {
      // r.jina.ai renders the page (incl. JS) and can return raw HTML.
      url: `https://r.jina.ai/${canonical}`,
      headers: { "X-Return-Format": "html", "X-Timeout": "15" },
    },
    {
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(canonical)}`,
      json: true,
    },
  ];

  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy.url, {
        headers: { "User-Agent": BROWSER_LIKE_UA, ...(proxy.headers || {}) },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) continue;

      const html = proxy.json
        ? ((await res.json())?.contents as string)
        : await res.text();
      if (!html || typeof html !== "string") continue;

      const parsed = parsePage(html);
      if (parsed.images.length > 0) return parsed;
    } catch {
      continue;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";
    if (!rawUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(rawUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!isFacebookHost(parsed.hostname)) {
      return NextResponse.json({ error: "URL must be a Facebook link" }, { status: 400 });
    }

    // Strategy 1: direct, then Strategy 2: reader proxies.
    const result = (await tryDirect(rawUrl)) ?? (await tryReaderProxies(rawUrl));

    if (result && result.images.length > 0) {
      return NextResponse.json({
        images: result.images,
        title: result.title,
        description: result.description,
      });
    }

    return NextResponse.json({
      images: [],
      error:
        "Couldn't find any public images for this link. The post may be private, age-restricted, deleted, or Facebook is currently blocking automated access - try the browser extension for logged-in content.",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

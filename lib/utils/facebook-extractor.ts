/**
 * Facebook Image Extractor
 * Multiple methods to extract images from Facebook URLs
 */

export interface FacebookImageInfo {
  images: string[];
  title?: string;
  description?: string;
  error?: string;
}

/** Real milestones the UI can reflect in its loader (instead of fixed timers). */
export type ExtractPhase = "fetching" | "reading" | "parsing" | "fallback";

export interface ExtractOptions {
  onProgress?: (phase: ExtractPhase) => void;
}

function decodeMetaContent(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/**
 * Parse Open Graph / link image URLs from raw HTML.
 * Facebook often uses content="..." before property="og:image", so multiple patterns are required.
 */
export function parseOgImagesFromHtml(html: string): string[] {
  const images: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const u = decodeMetaContent(raw);
    if (!u || seen.has(u)) return;
    if (!/^https?:\/\//i.test(u)) return;
    seen.add(u);
    images.push(u);
  };

  const patterns: RegExp[] = [
    /<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/gi,
    /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/gi,
    /<meta\s+[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["']/gi,
    /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image:secure_url["']/gi,
    /<link\s+[^>]*rel=["']image_src["'][^>]*href=["']([^"']+)["']/gi,
    /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']image_src["']/gi,
  ];

  for (const re of patterns) {
    let m: RegExpExecArray | null;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(html)) !== null) {
      push(m[1]);
    }
  }

  return images;
}

/**
 * Unescape a URL the way it appears inside Facebook's embedded JSON blobs:
 * backslash-escaped slashes, hex/unicode-escaped `&`, `%`, etc.
 */
function unescapeEmbeddedUrl(raw: string): string {
  return raw
    .replace(/\\\//g, "/")
    .replace(/\\u0025/gi, "%")
    .replace(/\\u0026/gi, "&")
    .replace(/\\u003D/gi, "=")
    .replace(/\\u003F/gi, "?")
    .replace(/\\x3D/gi, "=")
    .replace(/\\x26/gi, "&")
    .replace(/&amp;/g, "&")
    .replace(/\\\\/g, "\\")
    .trim();
}

/** URLs we never want to surface to the user (sprites, emoji, tracking pixels, profile chrome). */
const JUNK_IMAGE_PATTERNS = [
  /\/rsrc\.php\//i,
  /\/emoji\b/i,
  /\/images\/emoji/i,
  /static\.xx\.fbcdn/i,
  /safe_image\.php/i,
  /\/images\/icons\//i,
  /\bspaceball\b/i,
  /\/t39\.\d+-\d+\/[^/]*?_a\./i, // tiny avatar thumbs
  // small square thumbnails like 48x48 / p100x100 (chrome, not content)
  /(?:^|[^\d])(?:16|32|40|48|50|60|64|74|100|120)x(?:16|32|40|48|50|60|64|74|100|120)(?:[^\d]|$)/i,
];

function looksLikeContentImage(u: string): boolean {
  if (!/^https?:\/\//i.test(u)) return false;
  if (!/(?:fbcdn\.net|scontent|\.fbcdn\.)/i.test(u)) return false;
  if (!/\.(?:jpe?g|png|webp|gif)(?:[?&]|$)/i.test(u)) return false;
  return !JUNK_IMAGE_PATTERNS.some((re) => re.test(u));
}

/**
 * A rough resolution score so we can prefer the largest variant of a photo.
 * Facebook encodes size hints in the path (`s2048x2048`, `p960x960`) and the
 * `stp`/`_o`/`_n` suffixes. Higher = better.
 */
function resolutionScore(u: string): number {
  let score = 0;
  const sizeMatch = u.match(/[sp](\d{2,4})x(\d{2,4})/i);
  if (sizeMatch) score += Math.max(Number(sizeMatch[1]), Number(sizeMatch[2]));
  const stpMatch = u.match(/stp=[^&]*?(\d{2,4})x(\d{2,4})/i);
  if (stpMatch) score += Math.max(Number(stpMatch[1]), Number(stpMatch[2]));
  if (/_o\.(?:jpe?g|png|webp)/i.test(u)) score += 4000; // original
  if (/_n\.(?:jpe?g|png|webp)/i.test(u)) score += 1500; // normal/large
  if (!/_s\.(?:jpe?g|png|webp)/i.test(u)) score += 50; // not the small thumb
  return score;
}

/** The stable identity of a photo, used to dedupe size variants of the same image. */
function photoIdentity(u: string): string {
  // FB CDN filenames look like 123456_789012_345678_n.jpg — the middle id is stable.
  const fileMatch = u.match(/\/(\d+_\d+_\d+)_[a-z]\.(?:jpe?g|png|webp)/i);
  if (fileMatch) return fileMatch[1];
  const fbid = u.match(/[?&]fbid=(\d+)/i);
  if (fbid) return `fbid:${fbid[1]}`;
  // fall back to path without query
  try {
    const parsed = new URL(u);
    return parsed.origin + parsed.pathname;
  } catch {
    return u.split("?")[0];
  }
}

/** Pull every fbcdn/scontent content image out of raw (or JSON-escaped) HTML. */
export function extractFbcdnImagesFromHtml(html: string): string[] {
  const found = new Set<string>();
  // Allow backslashes inside the match so JSON-escaped URLs (\/ and &) are
  // captured whole, then unescaped. Stop at quotes / whitespace / angle brackets.
  const re = /https?:(?:\\?\/\\?\/|\/\/)[^\s"'<>)]*?(?:fbcdn\.net|scontent)[^\s"'<>)]*/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const u = unescapeEmbeddedUrl(m[0]);
    if (looksLikeContentImage(u)) found.add(u);
  }
  return Array.from(found);
}

/**
 * Best-effort: collect ALL distinct content images from a page, ranked highest-res first.
 * Combines Open Graph tags (reliable single preview) with embedded-JSON fbcdn URLs
 * (albums / higher resolution). Deduped by photo identity, keeping the largest variant.
 */
export function parseAllImagesFromHtml(html: string): string[] {
  const candidates = [...parseOgImagesFromHtml(html), ...extractFbcdnImagesFromHtml(html)];

  // Group by photo identity, keep the highest-resolution variant of each.
  const bestByIdentity = new Map<string, { url: string; score: number }>();
  for (const url of candidates) {
    if (!/^https?:\/\//i.test(url)) continue;
    const id = photoIdentity(url);
    const score = resolutionScore(url);
    const existing = bestByIdentity.get(id);
    if (!existing || score > existing.score) {
      bestByIdentity.set(id, { url, score });
    }
  }

  return Array.from(bestByIdentity.values())
    .sort((a, b) => b.score - a.score)
    .map((v) => v.url);
}

/**
 * Heuristic: did Facebook serve us a login / consent wall instead of the real page?
 * Used to decide whether to fall back to a reader proxy.
 */
export function looksLikeFacebookBlockPage(html: string): boolean {
  if (!html || html.length < 500) return true;
  const hasContentImage = /(?:fbcdn\.net|scontent)[^\s"'<>\\)]*\.(?:jpe?g|png|webp)/i.test(html);
  if (hasContentImage) return false;
  const blockSignals = [
    /you must log in to continue/i,
    /<title>[^<]*log in[^<]*<\/title>/i,
    /name=["']?(?:email|pass)["']? /i,
    /\/login\/\?next=/i,
    /content=["']Facebook["'][^>]*property=["']og:title/i,
    /property=["']og:title["'][^>]*content=["']Facebook["']/i,
  ];
  return blockSignals.some((re) => re.test(html));
}

export function parseOgTitleFromHtml(html: string): string | undefined {
  const t =
    html.match(/<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
  return t?.[1] ? decodeMetaContent(t[1]) : undefined;
}

export function parseOgDescriptionFromHtml(html: string): string | undefined {
  const d =
    html.match(/<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
  return d?.[1] ? decodeMetaContent(d[1]) : undefined;
}

/**
 * Alternate URL shapes for the same photo (improves OG availability for some links).
 */
export function facebookUrlVariants(url: string): string[] {
  const trimmed = url.trim();
  const out: string[] = [trimmed];
  try {
    const u = new URL(trimmed);
    const host = u.hostname.toLowerCase();
    if (!host.includes("facebook.com") && !host.includes("fb.com")) {
      return Array.from(new Set(out));
    }

    // Canonicalise to a www path we can re-host on any subdomain.
    const wwwHref = trimmed.replace(/\/\/(?:m|mbasic|web|l|d)\.facebook\.com/i, "//www.facebook.com");
    if (wwwHref !== trimmed) out.push(wwwHref);

    const fbid = u.searchParams.get("fbid");
    if (fbid && u.pathname.includes("/photo")) {
      const set = u.searchParams.get("set");
      const q = new URLSearchParams();
      q.set("fbid", fbid);
      if (set) q.set("set", set);
      out.push(`https://www.facebook.com/photo.php?${q.toString()}`);
      // mbasic returns public photos as plain HTML with a direct image link.
      out.push(`https://mbasic.facebook.com/photo.php?${q.toString()}`);
      out.push(`https://mbasic.facebook.com/photo/?${q.toString()}`);
    }

    // For any www/m URL, also try the mbasic + m mirrors of the same path.
    const pathAndQuery = u.pathname + u.search;
    out.push(`https://mbasic.facebook.com${pathAndQuery}`);
    out.push(`https://m.facebook.com${pathAndQuery}`);
  } catch {
    /* ignore */
  }
  return Array.from(new Set(out));
}

/**
 * Normalize Facebook URL to different formats
 */
export function normalizeFacebookUrl(url: string): string[] {
  const normalized: string[] = [];
  
  // Remove query parameters and fragments
  const cleanUrl = url.split('?')[0].split('#')[0];
  normalized.push(cleanUrl);
  
  // Handle mobile URLs
  if (url.includes('m.facebook.com')) {
    normalized.push(cleanUrl.replace('m.facebook.com', 'www.facebook.com'));
  }
  
  // Handle short URLs
  if (url.includes('fb.com') || url.includes('facebook.com/')) {
    // Extract post ID if possible
    const postIdMatch = url.match(/\/posts\/(\d+)/) || url.match(/\/permalink\/(\d+)/);
    if (postIdMatch) {
      normalized.push(`https://www.facebook.com/posts/${postIdMatch[1]}`);
    }
  }
  
  return normalized;
}

/**
 * Extract images using Open Graph meta tags
 */
export async function extractViaOpenGraph(url: string): Promise<FacebookImageInfo> {
  try {
    const variants = facebookUrlVariants(url);
    for (const pageUrl of variants) {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(pageUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) continue;

      const data = await response.json();
      const html = data.contents as string;
      if (!html || typeof html !== "string") continue;

      const images = parseAllImagesFromHtml(html);
      if (images.length === 0) continue;

      return {
        images,
        title: parseOgTitleFromHtml(html),
        description: parseOgDescriptionFromHtml(html),
      };
    }

    return { images: [] };
  } catch (error) {
    return {
      images: [],
      error: error instanceof Error ? error.message : 'Failed to extract via Open Graph',
    };
  }
}

/**
 * Extract images from direct image URLs
 */
export function extractDirectImage(url: string): FacebookImageInfo | null {
  // Check if URL is a direct image
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp)(\?.*)?$/i;
  if (imageExtensions.test(url)) {
    return {
      images: [url],
    };
  }
  
  // Check for Facebook CDN image URLs
  if (url.includes('scontent') && url.includes('fbcdn')) {
    return {
      images: [url],
    };
  }
  
  return null;
}

/**
 * Fetch page HTML via Next.js route (server-side) and parse OG tags.
 * Used from the browser only; avoids relying solely on public CORS proxies.
 */
async function extractViaNextRoute(url: string): Promise<FacebookImageInfo> {
  if (typeof window === "undefined") {
    return { images: [] };
  }
  try {
    const res = await fetch("/api/facebook-image-extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      cache: "no-store",
    });
    const data = await res.json();
    const images = Array.isArray(data.images) ? data.images : [];
    if (images.length > 0) {
      return {
        images,
        title: data.title,
        description: data.description,
      };
    }
    return { images: [], error: typeof data.error === "string" ? data.error : undefined };
  } catch {
    return { images: [] };
  }
}

/**
 * Extract images using third-party API
 */
export async function extractViaAPI(url: string): Promise<FacebookImageInfo> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DOWNLOADER_API_URL;
    if (!apiUrl) {
      throw new Error('API not configured');
    }
    
    const requestUrl = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}url=${encodeURIComponent(url)}`;
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    
    if (process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY) {
      headers['X-API-KEY'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY;
      headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY;
    }
    if (process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST) {
      headers['X-API-HOST'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST;
      headers['X-RapidAPI-Host'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST;
    }
    
    const response = await fetch(requestUrl, { headers, cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract images from API response
    const images: string[] = [];
    
    if (data.images && Array.isArray(data.images)) {
      images.push(...data.images);
    } else if (data.image) {
      images.push(data.image);
    } else if (data.thumbnail) {
      images.push(data.thumbnail);
    }
    
    // Also check formats array
    if (data.formats && Array.isArray(data.formats)) {
      data.formats.forEach((format: any) => {
        if (format.url && !images.includes(format.url)) {
          images.push(format.url);
        }
      });
    }
    
    return {
      images,
      title: data.title || data.videoTitle,
      description: data.description,
    };
  } catch (error) {
    return {
      images: [],
      error: error instanceof Error ? error.message : 'API extraction failed',
    };
  }
}

/**
 * Public CORS proxies for fetching page HTML straight from the browser.
 * Running through these keeps Facebook scraping OFF our own server (lower hosting cost).
 */
const CLIENT_HTML_PROXIES: Array<(u: string) => { url: string; json?: boolean }> = [
  (u) => ({ url: `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` }),
  (u) => ({ url: `https://corsproxy.io/?url=${encodeURIComponent(u)}` }),
  (u) => ({ url: `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, json: true }),
];

const CLIENT_PROXY_TIMEOUT = 9000;

/** Fetch one variant through one proxy and parse it. Resolves null on any failure. */
async function fetchVariantViaProxy(
  variant: string,
  makeProxy: (u: string) => { url: string; json?: boolean },
  onReading?: () => void,
): Promise<FacebookImageInfo | null> {
  try {
    const { url: proxyUrl, json } = makeProxy(variant);
    const res = await fetch(proxyUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(CLIENT_PROXY_TIMEOUT),
    });
    if (!res.ok) return null;

    onReading?.(); // response arrived — we're now reading/parsing
    const html = json ? ((await res.json())?.contents as string) : await res.text();
    if (!html || typeof html !== "string") return null;

    const images = parseAllImagesFromHtml(html);
    if (images.length === 0) return null;

    return {
      images,
      title: parseOgTitleFromHtml(html),
      description: parseOgDescriptionFromHtml(html),
    };
  } catch {
    return null;
  }
}

/**
 * Race several promises and resolve with the FIRST one that yields images.
 * Ignores failures/empties; resolves null only when every promise is exhausted.
 */
function firstWithImages(
  promises: Array<Promise<FacebookImageInfo | null>>,
): Promise<FacebookImageInfo | null> {
  return new Promise((resolve) => {
    if (promises.length === 0) return resolve(null);
    let remaining = promises.length;
    let done = false;
    for (const p of promises) {
      p.then((result) => {
        if (done) return;
        if (result && result.images.length > 0) {
          done = true;
          resolve(result);
        } else if (--remaining === 0) {
          resolve(null);
        }
      }).catch(() => {
        if (done) return;
        if (--remaining === 0) resolve(null);
      });
    }
  });
}

/**
 * Client-side extraction — runs entirely in the user's browser via public CORS
 * proxies. This is the primary path so our server stays idle in the common case.
 *
 * Proxies are raced in PARALLEL so total latency ≈ the fastest proxy, not the sum.
 */
export async function extractViaClientProxies(
  url: string,
  opts?: ExtractOptions,
): Promise<FacebookImageInfo> {
  if (typeof window === "undefined") return { images: [] };

  const variants = facebookUrlVariants(url);
  const canonical = variants[0];
  // A mbasic/photo.php variant is the best second try for albums / edge cases.
  const secondary = variants.find((v) => v !== canonical && /mbasic|photo\.php/i.test(v));

  let readingSignalled = false;
  const signalReading = () => {
    if (!readingSignalled) {
      readingSignalled = true;
      opts?.onProgress?.("reading");
    }
  };

  // Stage 1: race all proxies on the canonical URL (covers ~90% of links fast).
  opts?.onProgress?.("fetching");
  const stage1 = await firstWithImages(
    CLIENT_HTML_PROXIES.map((mp) => fetchVariantViaProxy(canonical, mp, signalReading)),
  );
  if (stage1) {
    opts?.onProgress?.("parsing");
    return stage1;
  }

  // Stage 2: only if the canonical URL gave nothing, try the album/mbasic variant.
  if (secondary) {
    const stage2 = await firstWithImages(
      CLIENT_HTML_PROXIES.map((mp) => fetchVariantViaProxy(secondary, mp, signalReading)),
    );
    if (stage2) {
      opts?.onProgress?.("parsing");
      return stage2;
    }
  }

  return { images: [] };
}

/** Public CORS proxies for fetching image bytes (so they never pass through our server). */
const CLIENT_IMAGE_PROXIES: Array<(u: string) => string> = [
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
];

/**
 * Fetch a Facebook image as a Blob, preferring public CORS proxies so the bytes
 * never touch our server. Falls back to the same-origin server proxy only if all
 * public proxies fail. Used for both single downloads and ZIP packaging.
 */
export async function fetchFacebookImageBlob(imageUrl: string): Promise<Blob> {
  for (const makeProxy of CLIENT_IMAGE_PROXIES) {
    try {
      const res = await fetch(makeProxy(imageUrl), { signal: AbortSignal.timeout(20000) });
      if (!res.ok) continue;
      const blob = await res.blob();
      if (blob.size > 0) return blob;
    } catch {
      continue;
    }
  }

  // Last resort: our own image proxy (costs server bandwidth).
  const res = await fetch(`/api/facebook-image-proxy?url=${encodeURIComponent(imageUrl)}`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error("Image fetch failed");
  return res.blob();
}

/**
 * Main extraction function - tries multiple methods
 */
export async function extractFacebookImages(
  url: string,
  opts?: ExtractOptions,
): Promise<FacebookImageInfo> {
  // Validate URL
  if (!url.trim()) {
    return { images: [], error: 'URL is required' };
  }

  // Check if it's a Facebook URL
  if (!url.includes('facebook.com') && !url.includes('fb.com') && !url.includes('fbcdn')) {
    // Might be a direct image URL
    const directResult = extractDirectImage(url);
    if (directResult) {
      return directResult;
    }
    return { images: [], error: 'Invalid Facebook URL' };
  }

  // Try direct image first (fastest, no network)
  const directResult = extractDirectImage(url);
  if (directResult && directResult.images.length > 0) {
    return directResult;
  }

  // PRIMARY: client-side via public CORS proxies — keeps our server idle.
  const clientResult = await extractViaClientProxies(url, opts);
  if (clientResult.images.length > 0) {
    return clientResult;
  }

  // Optional configured 3rd-party API (if env vars are set).
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_URL) {
    const apiResult = await extractViaAPI(url);
    if (apiResult.images.length > 0) {
      return apiResult;
    }
  }

  // FALLBACK: same-origin server route (uses our server; only when proxies fail).
  opts?.onProgress?.("fallback");
  const nextRouteResult = await extractViaNextRoute(url);
  if (nextRouteResult.images.length > 0) {
    return nextRouteResult;
  }

  // If all methods failed, return error
  return {
    images: [],
    error:
      "Couldn't extract images. The post may be private, age-restricted, or temporarily blocking automated access — try the browser extension for logged-in content.",
  };
}


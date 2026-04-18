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

    if (host === "m.facebook.com") {
      out.push(trimmed.replace(/\/\/m\.facebook\.com/i, "//www.facebook.com"));
    }

    const fbid = u.searchParams.get("fbid");
    if (fbid && u.pathname.includes("/photo")) {
      const set = u.searchParams.get("set");
      const q = new URLSearchParams();
      q.set("fbid", fbid);
      if (set) q.set("set", set);
      out.push(`https://www.facebook.com/photo.php?${q.toString()}`);
    }
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

      const images = parseOgImagesFromHtml(html);
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
 * Main extraction function - tries multiple methods
 */
export async function extractFacebookImages(url: string): Promise<FacebookImageInfo> {
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
  
  // Try direct image first (fastest)
  const directResult = extractDirectImage(url);
  if (directResult && directResult.images.length > 0) {
    return directResult;
  }
  
  // Try API method (most reliable if configured)
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_URL) {
    const apiResult = await extractViaAPI(url);
    if (apiResult.images.length > 0) {
      return apiResult;
    }
  }

  // Same-origin API: server fetches Facebook HTML (better than client-only proxies)
  const nextRouteResult = await extractViaNextRoute(url);
  if (nextRouteResult.images.length > 0) {
    return nextRouteResult;
  }
  
  // Try Open Graph method (fallback)
  const ogResult = await extractViaOpenGraph(url);
  if (ogResult.images.length > 0) {
    return ogResult;
  }
  
  // If all methods failed, return error
  return {
    images: [],
    error: 'Could not extract images. The post may be private or the URL may be invalid.',
  };
}


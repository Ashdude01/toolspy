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
    // Use a CORS proxy or server-side fetch
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    
    const data = await response.json();
    const html = data.contents;
    
    // Extract Open Graph images
    const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/gi;
    const images: string[] = [];
    let match;
    
    while ((match = ogImageRegex.exec(html)) !== null) {
      if (match[1] && !images.includes(match[1])) {
        images.push(match[1]);
      }
    }
    
    // Also check for og:image:secure_url
    const secureImageRegex = /<meta\s+property=["']og:image:secure_url["']\s+content=["']([^"']+)["']/gi;
    while ((match = secureImageRegex.exec(html)) !== null) {
      if (match[1] && !images.includes(match[1])) {
        images.push(match[1]);
      }
    }
    
    // Extract title
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const title = titleMatch ? titleMatch[1] : undefined;
    
    // Extract description
    const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1] : undefined;
    
    return {
      images: images.length > 0 ? images : [],
      title,
      description,
    };
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


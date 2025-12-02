/**
 * Instagram Reels Extractor
 * Multiple methods to extract reels from Instagram URLs
 */

export interface InstagramReelInfo {
  videoUrl: string | null;
  thumbnail?: string;
  title?: string;
  duration?: string;
  formats?: Array<{
    quality: string;
    format: string;
    url: string;
    size?: string;
  }>;
  error?: string;
}

/**
 * Normalize Instagram URL
 */
export function normalizeInstagramUrl(url: string): string {
  // Remove query parameters and fragments
  let normalized = url.split('?')[0].split('#')[0];
  
  // Handle mobile URLs
  if (normalized.includes('m.instagram.com')) {
    normalized = normalized.replace('m.instagram.com', 'www.instagram.com');
  }
  
  // Ensure https
  if (!normalized.startsWith('http')) {
    normalized = 'https://' + normalized;
  }
  
  return normalized;
}

/**
 * Extract reel using third-party API
 */
export async function extractViaAPI(url: string): Promise<InstagramReelInfo> {
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
    
    // Extract video URL
    let videoUrl: string | null = null;
    const formats: Array<{ quality: string; format: string; url: string; size?: string }> = [];
    
    // Check for direct video URL
    if (data.videoUrl || data.video || data.url) {
      videoUrl = data.videoUrl || data.video || data.url;
    }
    
    // Check formats array
    if (data.formats && Array.isArray(data.formats)) {
      data.formats.forEach((format: any) => {
        if (format.url) {
          formats.push({
            quality: format.quality || format.label || format.resolution || 'Unknown',
            format: format.format || format.type || 'mp4',
            url: format.url,
            size: format.size || format.filesize || format.filesizePretty,
          });
          
          // Use first MP4 as default
          if (!videoUrl && (format.format || format.type || '').toLowerCase().includes('mp4')) {
            videoUrl = format.url;
          }
        }
      });
      
      // If no videoUrl yet, use first format
      if (!videoUrl && formats.length > 0) {
        videoUrl = formats[0].url;
      }
    }
    
    return {
      videoUrl,
      thumbnail: data.thumbnail || data.thumb || data.image,
      title: data.title || data.videoTitle,
      duration: data.duration || data.length,
      formats: formats.length > 0 ? formats : undefined,
    };
  } catch (error) {
    return {
      videoUrl: null,
      error: error instanceof Error ? error.message : 'API extraction failed',
    };
  }
}

/**
 * Extract reel using Open Graph and meta tags
 */
export async function extractViaOpenGraph(url: string): Promise<InstagramReelInfo> {
  try {
    // Use a CORS proxy
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    
    const data = await response.json();
    const html = data.contents;
    
    // Extract video URL from og:video
    const ogVideoRegex = /<meta\s+property=["']og:video["']\s+content=["']([^"']+)["']/i;
    const videoMatch = html.match(ogVideoRegex);
    const videoUrl = videoMatch ? videoMatch[1] : null;
    
    // Extract secure video URL
    const ogVideoSecureRegex = /<meta\s+property=["']og:video:secure_url["']\s+content=["']([^"']+)["']/i;
    const secureVideoMatch = html.match(ogVideoSecureRegex);
    const secureVideoUrl = secureVideoMatch ? secureVideoMatch[1] : null;
    
    // Extract thumbnail
    const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i;
    const imageMatch = html.match(ogImageRegex);
    const thumbnail = imageMatch ? imageMatch[1] : undefined;
    
    // Extract title
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const title = titleMatch ? titleMatch[1] : undefined;
    
    // Try to find video in script tags (Instagram embeds video data in JSON)
    const scriptRegex = /<script[^>]*>window\._sharedData\s*=\s*({.+?});<\/script>/i;
    const scriptMatch = html.match(scriptRegex);
    
    if (scriptMatch) {
      try {
        const jsonData = JSON.parse(scriptMatch[1]);
        // Navigate through Instagram's data structure
        const videoData = jsonData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
        if (videoData?.video_url) {
          return {
            videoUrl: videoData.video_url,
            thumbnail: videoData.display_url || thumbnail,
            title: videoData.edge_media_to_caption?.edges?.[0]?.node?.text || title,
          };
        }
      } catch {
        // JSON parsing failed, continue with other methods
      }
    }
    
    return {
      videoUrl: secureVideoUrl || videoUrl,
      thumbnail,
      title,
    };
  } catch (error) {
    return {
      videoUrl: null,
      error: error instanceof Error ? error.message : 'Failed to extract via Open Graph',
    };
  }
}

/**
 * Extract reel from direct video URL
 */
export function extractDirectVideo(url: string): InstagramReelInfo | null {
  // Check if URL is a direct video
  const videoExtensions = /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i;
  if (videoExtensions.test(url)) {
    return {
      videoUrl: url,
    };
  }
  
  // Check for Instagram CDN video URLs
  if (url.includes('cdninstagram.com') && url.includes('video')) {
    return {
      videoUrl: url,
    };
  }
  
  return null;
}

/**
 * Main extraction function - tries multiple methods
 */
export async function extractInstagramReel(url: string): Promise<InstagramReelInfo> {
  // Validate URL
  if (!url.trim()) {
    return { videoUrl: null, error: 'URL is required' };
  }
  
  // Normalize URL
  const normalizedUrl = normalizeInstagramUrl(url);
  
  // Check if it's an Instagram URL
  if (!normalizedUrl.includes('instagram.com') && !normalizedUrl.includes('cdninstagram.com')) {
    // Might be a direct video URL
    const directResult = extractDirectVideo(normalizedUrl);
    if (directResult) {
      return directResult;
    }
    return { videoUrl: null, error: 'Invalid Instagram URL' };
  }
  
  // Try direct video first (fastest)
  const directResult = extractDirectVideo(normalizedUrl);
  if (directResult && directResult.videoUrl) {
    return directResult;
  }
  
  // Try API method (most reliable if configured)
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_URL) {
    const apiResult = await extractViaAPI(normalizedUrl);
    if (apiResult.videoUrl) {
      return apiResult;
    }
  }
  
  // Try Open Graph method (fallback)
  const ogResult = await extractViaOpenGraph(normalizedUrl);
  if (ogResult.videoUrl) {
    return ogResult;
  }
  
  // If all methods failed, return error
  return {
    videoUrl: null,
    error: 'Could not extract reel. The reel may be private, the URL may be invalid, or you may need to configure an API.',
  };
}


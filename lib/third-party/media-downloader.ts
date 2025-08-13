export interface ThirdPartyFormat {
  quality: string;
  format: string;
  size?: string;
  url?: string;
}

export interface ThirdPartyMediaInfo {
  title: string;
  creator?: string;
  duration?: string;
  views?: number;
  uploadDate?: string;
  thumbnail?: string;
  platform?: string;
  description?: string;
  formats: ThirdPartyFormat[];
}

/**
 * Calls a third-party social media downloader API.
 * Configure via NEXT_PUBLIC_DOWNLOADER_API_URL and optional NEXT_PUBLIC_DOWNLOADER_API_KEY/HOST.
 * The API is expected to accept a `url` query param and return JSON with fields similar to ThirdPartyMediaInfo.
 */
export async function fetchThirdPartyMedia(url: string): Promise<ThirdPartyMediaInfo> {
  const apiUrl = process.env.NEXT_PUBLIC_DOWNLOADER_API_URL;
  if (!apiUrl) {
    throw new Error('Downloader API URL not configured');
  }

  const requestUrl = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}url=${encodeURIComponent(url)}`;
  const headers: Record<string, string> = { 'Accept': 'application/json' };

  // Optional API key / host for RapidAPI-like providers
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY) {
    headers['X-API-KEY'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY as string;
    headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY as string;
  }
  if (process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST) {
    headers['X-API-HOST'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST as string;
    headers['X-RapidAPI-Host'] = process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST as string;
  }

  const res = await fetch(requestUrl, { headers, cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Downloader API error ${res.status}`);
  }
  const data = await res.json();

  // Attempt to normalize common structures
  const formats: ThirdPartyFormat[] = Array.isArray(data.formats)
    ? data.formats.map((f: any) => ({
        quality: f.quality || f.label || f.resolution || 'Unknown',
        format: f.format || f.type || 'Unknown',
        size: f.size || f.filesize || f.filesizePretty || undefined,
        url: f.url || f.link || f.downloadUrl || undefined,
      }))
    : [];

  const info: ThirdPartyMediaInfo = {
    title: data.title || data.videoTitle || 'Untitled',
    creator: data.creator || data.author || data.channel || undefined,
    duration: data.duration || data.length || undefined,
    views: data.views || data.viewCount || undefined,
    uploadDate: data.uploadDate || data.upload_date || undefined,
    thumbnail: data.thumbnail || data.thumb || data.image || undefined,
    platform: data.platform || data.source || undefined,
    description: data.description || undefined,
    formats,
  };

  return info;
}



import { Metadata } from 'next';

/**
 * Creates enhanced metadata with proper SEO optimization
 */
export function createMetadata(
  baseMetadata: Metadata,
  path: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net';
  const fullUrl = `${baseUrl}${path}`;
  
  return {
    ...baseMetadata,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      url: fullUrl,
      siteName: 'Toolspy',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      ...baseMetadata.twitter,
      site: '@toolspy',
      creator: '@toolspy',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Creates full URL for schema markup
 */
export function createFullUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Limits title length for SEO optimization
 */
export function limitTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + '...';
}

/**
 * Limits description length for SEO optimization
 */
export function limitDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

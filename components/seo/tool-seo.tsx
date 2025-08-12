import { Metadata } from 'next';
import { Tool } from '@/lib/tools-data';
import { limitTitle, limitDescription } from '@/lib/utils/seo';

interface ToolSEOProps {
  tool: Tool;
}

export function generateToolMetadata(tool: Tool): Metadata {
  return {
    title: limitTitle(tool.seo.metaTitle),
    description: limitDescription(tool.seo.metaDescription),
    keywords: tool.seo.keywords,
    authors: [{ name: 'Toolspy' }],
    creator: 'Toolspy',
    publisher: 'Toolspy',
    alternates: {
      canonical: tool.seo.canonicalUrl,
    },
    openGraph: {
      title: limitTitle(tool.seo.ogTitle),
      description: limitDescription(tool.seo.ogDescription),
      url: tool.seo.canonicalUrl,
      siteName: 'Toolspy',
      images: [
        {
          url: tool.seo.ogImage,
          width: 1200,
          height: 630,
          alt: tool.seo.ogTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: limitTitle(tool.seo.twitterTitle),
      description: limitDescription(tool.seo.twitterDescription),
      images: [tool.seo.twitterImage],
      creator: '@toolspy',
      site: '@toolspy',
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

export function ToolSEOHead({ tool }: ToolSEOProps) {
  return (
    <>
      <link rel="canonical" href={tool.seo.canonicalUrl} />
      <meta name="description" content={tool.seo.metaDescription} />
      <meta name="keywords" content={tool.seo.keywords.join(', ')} />
      <meta name="author" content="Toolspy" />
      
      {/* Open Graph */}
      <meta property="og:title" content={tool.seo.ogTitle} />
      <meta property="og:description" content={tool.seo.ogDescription} />
      <meta property="og:url" content={tool.seo.canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={tool.seo.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={tool.seo.ogTitle} />
      <meta property="og:site_name" content="Toolspy" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tool.seo.twitterTitle} />
      <meta name="twitter:description" content={tool.seo.twitterDescription} />
      <meta name="twitter:image" content={tool.seo.twitterImage} />
      <meta name="twitter:creator" content="@toolspy" />
      <meta name="twitter:site" content="@toolspy" />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Poster Image */}
      {tool.posterImage && (
        <meta property="og:image" content={tool.posterImage} />
      )}
    </>
  );
}

export default ToolSEOHead; 
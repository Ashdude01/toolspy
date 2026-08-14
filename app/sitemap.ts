import { MetadataRoute } from 'next';
import { tools, toolCategories } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults';
import { getPublishedBlogPosts } from '@/lib/payload/get-posts';
import { getPublishedAuthors } from '@/lib/payload/get-authors';
import { PUBLISHED_LOCALES } from '@/lib/i18n/locales';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://toolspy.net';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-marketing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gdpr-ccpa`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/author`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/bug-report`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Tool category pages
  const categoryPages = Object.keys(toolCategories).map((category) => ({
    url: `${baseUrl}/tools/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tool pages (only active tools)
  const toolPages = tools
    .filter(tool => tool.status === 'active')
    .map(tool => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // Browser extension landing pages (app/(extension)/extensions/*)
  const extensionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/extensions/image-compressor`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/extensions/image-downloader`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/extensions/facebook-photo-downloader`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
  ];

  let posts = blogPosts;
  try {
    posts = await getPublishedBlogPosts();
  } catch {
    // build / DB unavailable — code fallback
  }

  let authors = [defaultBlogAuthor, defaultBlogReviewer];
  try {
    const cmsAuthors = await getPublishedAuthors();
    if (cmsAuthors.length > 0) authors = cmsAuthors;
  } catch {
    // fallback defaults
  }

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/blog/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Localized pages — sirf PUBLISHED locales ke liye (lib/i18n/locales.ts).
  // Jab tak koi locale publish nahi hai, sitemap bilkul pehle jaisa rehta hai.
  const localizedPages: MetadataRoute.Sitemap = PUBLISHED_LOCALES.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...tools
      .filter((tool) => tool.status === 'active')
      .map((tool) => ({
        url: `${baseUrl}/${locale}${tool.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      })),
  ]);

  const all: MetadataRoute.Sitemap = [
    ...staticPages,
    ...categoryPages,
    ...toolPages,
    ...localizedPages,
    ...extensionPages,
    ...blogPages,
    ...authorPages,
  ];

  // De-dupe by URL (e.g. /image-to-pdf is both a registered tool and may be listed explicitly elsewhere)
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
} 
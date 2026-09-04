import { MetadataRoute } from 'next';
import { tools, toolCategories } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults';
import { getPublishedBlogPosts } from '@/lib/payload/get-posts';
import { getPublishedAuthors } from '@/lib/payload/get-authors';
import { PUBLISHED_LOCALES, ALL_LOCALES } from '@/lib/i18n/locales';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://toolspy.net';

  /**
   * hreflang cluster ek path ke liye — sirf jab koi locale PUBLISHED ho.
   * Google ko sitemap me hi language alternates mil jate hain (page metadata ke
   * alawa belt-and-suspenders). PUBLISHED_LOCALES khali → undefined (koi change nahi).
   *
   * path examples: '' (home), '/image-compressor' (tool). English canonical = baseUrl+path.
   */
  function languagesFor(path: string): Record<string, string> | undefined {
    if (PUBLISHED_LOCALES.length === 0) return undefined;
    const langs: Record<string, string> = {
      'x-default': `${baseUrl}${path}`,
      en: `${baseUrl}${path}`,
    };
    for (const loc of PUBLISHED_LOCALES) {
      const info = ALL_LOCALES[loc];
      if (info) langs[info.hreflang] = `${baseUrl}/${loc}${path}`;
    }
    return langs;
  }

  function withAlternates(
    entry: MetadataRoute.Sitemap[number],
    path: string
  ): MetadataRoute.Sitemap[number] {
    const languages = languagesFor(path);
    return languages ? { ...entry, alternates: { languages } } : entry;
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    withAlternates(
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
      ''
    ),
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/digital-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/dmca`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/gdpr-ccpa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog/author`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/feedback`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/bug-report`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    withAlternates(
      { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      '/tools'
    ),
  ];

  // Tool category pages
  const categoryPages: MetadataRoute.Sitemap = Object.keys(toolCategories).map((category) => ({
    url: `${baseUrl}/tools/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tool pages (only active tools) — hreflang cluster attached
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === 'active')
    .map((tool) =>
      withAlternates(
        {
          url: `${baseUrl}${tool.path}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        tool.path
      )
    );

  // Browser extension landing pages (app/(extension)/extensions/*)
  const extensionPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/extensions/image-compressor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/extensions/image-downloader`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/extensions/facebook-photo-downloader`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
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
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/blog/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Localized pages — sirf PUBLISHED locales (lib/i18n/locales.ts). Har entry par
  // wahi hreflang cluster (reciprocal). PUBLISHED khali → ye array khali.
  const localizedPages: MetadataRoute.Sitemap = PUBLISHED_LOCALES.flatMap((locale) => [
    withAlternates(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      ''
    ),
    ...tools
      .filter((tool) => tool.status === 'active')
      .map((tool) =>
        withAlternates(
          {
            url: `${baseUrl}/${locale}${tool.path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
          },
          tool.path
        )
      ),
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

  // De-dupe by URL
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

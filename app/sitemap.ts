import { MetadataRoute } from 'next';
import { tools, toolCategories } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults';
import { getPublishedBlogPosts } from '@/lib/payload/get-posts';
import { getPublishedAuthors } from '@/lib/payload/get-authors';
import { PUBLISHED_LOCALES, ALL_LOCALES } from '@/lib/i18n/locales';

const baseUrl = 'https://toolspy.net';

/**
 * SITEMAP — industry-standard, multilingual, dynamic.
 *
 * `generateSitemaps()` se ye ek SITEMAP INDEX banata hai:
 *   /sitemap.xml            → index (child sitemaps ko point karta hai)
 *   /sitemap/pages.xml      → homepage + static/listing pages
 *   /sitemap/tools.xml      → 90+ tool pages (+ localized, jab publish ho)
 *   /sitemap/blog.xml       → blog posts (CMS se DYNAMIC — naya post auto-add) + authors
 *
 * Har URL par hreflang `<xhtml:link>` alternates (sirf PUBLISHED_LOCALES ke liye).
 * PUBLISHED_LOCALES khali → English-only (koi change nahi). Isse ek hi giant
 * sitemap ki clutter bhi hat jati hai aur locale scale karne par bhi clean rehta hai.
 */
export async function generateSitemaps(): Promise<{ id: string }[]> {
  return [{ id: 'pages' }, { id: 'tools' }, { id: 'blog' }];
}

// hreflang cluster ek path ke liye — sirf jab koi locale PUBLISHED ho
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

type Entry = MetadataRoute.Sitemap[number];

// English canonical entry + (published) localized entries — sab par hreflang cluster.
// `localize=false` → sirf English (static/legal pages jo translate nahi hote).
function withLocales(
  path: string,
  opts: { changeFrequency: Entry['changeFrequency']; priority: number; lastModified?: Date; localize?: boolean }
): MetadataRoute.Sitemap {
  const { changeFrequency, priority, lastModified = new Date(), localize = true } = opts;
  const languages = localize ? languagesFor(path) : undefined;
  const alt = languages ? { alternates: { languages } } : {};
  const entries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}${path}`, lastModified, changeFrequency, priority, ...alt },
  ];
  if (localize) {
    for (const loc of PUBLISHED_LOCALES) {
      entries.push({
        url: `${baseUrl}/${loc}${path}`,
        lastModified,
        changeFrequency,
        priority: Math.max(0.1, priority - 0.05),
        ...alt,
      });
    }
  }
  return entries;
}

function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}

// ---------------- pages.xml ----------------
function pagesSitemap(): MetadataRoute.Sitemap {
  const localized = [
    ...withLocales('', { changeFrequency: 'daily', priority: 1 }), // homepage (translatable)
    ...withLocales('/tools', { changeFrequency: 'daily', priority: 0.9 }),
  ];

  // English-only pages (translate nahi hote → localize:false, no hreflang)
  const englishOnly: Array<[string, number, Entry['changeFrequency']]> = [
    ['/about', 0.8, 'monthly'],
    ['/contact', 0.8, 'monthly'],
    ['/digital-marketing', 0.85, 'monthly'],
    ['/help', 0.8, 'weekly'],
    ['/feedback', 0.6, 'monthly'],
    ['/bug-report', 0.6, 'monthly'],
    ['/blog', 0.9, 'weekly'],
    ['/blog/author', 0.7, 'weekly'],
    ['/privacy', 0.7, 'monthly'],
    ['/terms', 0.7, 'monthly'],
    ['/disclaimer', 0.5, 'monthly'],
    ['/dmca', 0.5, 'monthly'],
    ['/cookie-policy', 0.5, 'monthly'],
    ['/gdpr-ccpa', 0.5, 'monthly'],
  ];
  const staticPages = englishOnly.flatMap(([p, priority, changeFrequency]) =>
    withLocales(p, { changeFrequency, priority, localize: false })
  );

  // extension landing pages
  const extensionPages: MetadataRoute.Sitemap = [
    'image-compressor',
    'image-downloader',
    'facebook-photo-downloader',
  ].map((slug) => ({
    url: `${baseUrl}/extensions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return dedupe([...localized, ...staticPages, ...extensionPages]);
}

// ---------------- tools.xml ----------------
function toolsSitemap(): MetadataRoute.Sitemap {
  const toolPages = tools
    .filter((tool) => tool.status === 'active')
    .flatMap((tool) =>
      withLocales(tool.path, { changeFrequency: 'weekly', priority: 0.9 })
    );

  const categoryPages: MetadataRoute.Sitemap = Object.keys(toolCategories).map((category) => ({
    url: `${baseUrl}/tools/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return dedupe([...toolPages, ...categoryPages]);
}

// ---------------- blog.xml (DYNAMIC) ----------------
async function blogSitemap(): Promise<MetadataRoute.Sitemap> {
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

  const blogPages = posts.flatMap((post) =>
    withLocales(`/blog/${post.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date(post.updatedAt || post.publishedAt),
    })
  );

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/blog/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return dedupe([...blogPages, ...authorPages]);
}

export default async function sitemap({
  id,
}: {
  id: string | number;
}): Promise<MetadataRoute.Sitemap> {
  const key = String(id);
  if (key === 'tools') return toolsSitemap();
  if (key === 'blog') return blogSitemap();
  return pagesSitemap();
}

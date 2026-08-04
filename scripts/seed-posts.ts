/**
 * Seed all hardcoded blog posts from lib/blog-data.ts into Payload `posts`.
 *
 *   yarn payload run ./scripts/seed-posts.ts
 *
 * Idempotent: existing slug → update; missing → create as published.
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogPosts, type BlogPost, type BlogSection } from '../lib/blog-data'

function sectionToCms(section: BlogSection) {
  return {
    heading: section.heading || undefined,
    paragraphs: section.paragraphs?.join('\n\n') || undefined,
    listItems: section.list?.join('\n') || undefined,
    tableJson: section.table ? JSON.stringify(section.table) : undefined,
  }
}

function postToData(post: BlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    category: post.category,
    readingTimeMinutes: post.readingTimeMinutes,
    keywords: post.keywords.join(', '),
    relatedTool: {
      name: post.relatedTool.name,
      path: post.relatedTool.path,
      cta: post.relatedTool.cta,
    },
    sections: post.sections.map(sectionToCms),
    faqs: post.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    metaTitle: post.title,
    metaDescription: post.description,
    publishedAt: post.publishedAt,
    _status: 'published' as const,
  }
}

console.log(`[seed-posts] starting — ${blogPosts.length} posts`)

const payload = await getPayload({ config })

for (const post of blogPosts) {
  const data = postToData(post)
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: post.slug } },
    limit: 1,
    draft: false,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data: data as never,
      draft: false,
      overrideAccess: true,
    })
    console.log(`  updated: ${post.slug}`)
  } else {
    await payload.create({
      collection: 'posts',
      data: data as never,
      draft: false,
      overrideAccess: true,
    })
    console.log(`  created: ${post.slug}`)
  }
}

// Backfill tool-content searchKey for list search
console.log('[seed-posts] backfilling tool-content searchKey…')
const { toolSearchKey } = await import('../lib/i18n/tool-labels')
const tools = await payload.find({
  collection: 'tool-content',
  limit: 500,
  depth: 0,
  overrideAccess: true,
})
for (const doc of tools.docs) {
  const slug = doc.toolSlug as string
  await payload.update({
    collection: 'tool-content',
    id: doc.id,
    data: { searchKey: toolSearchKey(slug) } as never,
    draft: false,
    overrideAccess: true,
  })
}
console.log(`  searchKey updated for ${tools.docs.length} tool-content docs`)

console.log('[seed-posts] done')
process.exit(0)

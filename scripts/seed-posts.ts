/**
 * Seed default authors + hardcoded blog posts (lib/blog-data.ts) into Payload.
 *
 *   yarn payload run ./scripts/seed-posts.ts
 *
 * Idempotent: existing slug → update; missing → create as published.
 * Legacy sections are converted into Lexical rich text (`content`).
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogPosts, type BlogPost, type BlogSection } from '../lib/blog-data'
import { defaultBlogAuthor, defaultBlogReviewer, defaultEditorialNote } from '../lib/blog/defaults'
import { sectionsToLexical } from '../lib/blog/lexical-from-sections'

function sectionToCms(section: BlogSection) {
  return {
    heading: section.heading || undefined,
    paragraphs: section.paragraphs?.join('\n\n') || undefined,
    listItems: section.list?.join('\n') || undefined,
    tableJson: section.table ? JSON.stringify(section.table) : undefined,
  }
}

function postToData(
  post: BlogPost,
  authorId: number | string,
  reviewerId: number | string
) {
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
    content: sectionsToLexical(post.sections),
    sections: post.sections.map(sectionToCms),
    faqs: post.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    metaTitle: post.title,
    metaDescription: post.description,
    ogTitle: post.title,
    ogDescription: post.description,
    twitterTitle: post.title,
    twitterDescription: post.description,
    publishedAt: post.publishedAt,
    author: authorId,
    reviewedBy: reviewerId,
    reviewedAt: post.updatedAt || post.publishedAt,
    editorialNote: defaultEditorialNote(post.category),
    _status: 'published' as const,
  }
}

async function upsertAuthor(
  payload: Awaited<ReturnType<typeof getPayload>>,
  author: { slug: string; name: string; role?: string; bio?: string }
) {
  const existing = await payload.find({
    collection: 'authors',
    where: { slug: { equals: author.slug } },
    limit: 1,
    overrideAccess: true,
  })
  const data = {
    slug: author.slug,
    name: author.name,
    role: author.role,
    bio: author.bio,
  }
  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'authors',
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    })
    console.log(`  author updated: ${author.slug}`)
    return updated.id
  }
  const created = await payload.create({
    collection: 'authors',
    data: data as never,
    overrideAccess: true,
  })
  console.log(`  author created: ${author.slug}`)
  return created.id
}

console.log(`[seed-posts] starting — ${blogPosts.length} posts`)

const payload = await getPayload({ config })

console.log('[seed-posts] authors…')
const authorId = await upsertAuthor(payload, defaultBlogAuthor)
const reviewerId = await upsertAuthor(payload, defaultBlogReviewer)

for (const post of blogPosts) {
  const data = postToData(post, authorId, reviewerId)
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

console.log('[seed-posts] done')
process.exit(0)

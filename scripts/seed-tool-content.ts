/**
 * Seed script — har registered tool ki tool-content entry banata hai.
 *
 * Chalane ka tarika (repo root se, .env me DATABASE_URL + PAYLOAD_SECRET ke saath):
 *   npx payload run scripts/seed-tool-content.ts
 *
 * SAFE HAI:
 *  - Har entry contentSource: 'code' ke saath banti hai → website par KOI
 *    visual change nahi hota (existing seo-content.tsx hi render hota rahega)
 *  - Jo entry pehle se hai use SKIP karta hai (dobara chalana safe)
 *  - metaTitle/metaDescription/keywords lib/tools-data.ts se seed hote hain
 *    (English) — sections baad me tool-by-tool bharenge jab CMS par shift karo
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { toolSlugs } from '../lib/i18n/tool-slugs'
import { getToolBySlug } from '../lib/tools-data'

async function seed() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const slug of toolSlugs) {
    const existing = await payload.find({
      collection: 'tool-content',
      where: { toolSlug: { equals: slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    // tools-data me slugs "/age-calculator" format me hain
    const tool = getToolBySlug(`/${slug}`)

    await payload.create({
      collection: 'tool-content',
      locale: 'en',
      data: {
        toolSlug: slug,
        contentSource: 'code', // ← website par zero change guarantee
        metaTitle: tool?.seo?.metaTitle ?? undefined,
        metaDescription: tool?.seo?.metaDescription ?? undefined,
        keywords: tool?.seo?.keywords?.join(', ') ?? undefined,
        _status: 'published',
      },
    })
    created++
    console.log(`created: ${slug}`)
  }

  console.log(`\nDone. Created: ${created}, skipped (already existed): ${skipped}`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

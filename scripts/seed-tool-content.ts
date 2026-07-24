/**
 * Seed script — har registered tool ki tool-content entry banata hai.
 *
 * Chalane ka tarika (repo root se):
 *   yarn payload run ./scripts/seed-tool-content.ts
 *
 * SAFE HAI:
 *  - Har entry contentSource: 'code' ke saath banti hai → website par KOI
 *    visual change nahi hota (existing seo-content.tsx hi render hota rahega)
 *  - Jo entry pehle se hai use SKIP karta hai (dobara chalana safe)
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { toolSlugs } from '../lib/i18n/tool-slugs'
import { getToolBySlug } from '../lib/tools-data'

console.log(`[seed-tool-content] starting — ${toolSlugs.length} tools`)

const seed = async () => {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const slug of toolSlugs) {
    try {
      const existing = await payload.find({
        collection: 'tool-content',
        where: { toolSlug: { equals: slug } },
        limit: 1,
        draft: true,
        overrideAccess: true,
      })

      if (existing.docs.length > 0) {
        skipped++
        continue
      }

      // tools-data me slug kabhi "age-calculator" hota hai kabhi "/age-calculator"
      const tool = getToolBySlug(slug) ?? getToolBySlug(`/${slug}`)

      await payload.create({
        collection: 'tool-content',
        locale: 'en',
        draft: false,
        overrideAccess: true,
        data: {
          toolSlug: slug,
          contentSource: 'code',
          metaTitle: tool?.seo?.metaTitle ?? undefined,
          metaDescription: tool?.seo?.metaDescription ?? undefined,
          keywords: tool?.seo?.keywords?.join(', ') ?? undefined,
          _status: 'published',
        },
      })
      created++
      console.log(`created: ${slug}`)
    } catch (err) {
      failed++
      console.error(`FAILED: ${slug}`, err)
    }
  }

  console.log(`\nDone. Created: ${created}, skipped: ${skipped}, failed: ${failed}`)
  process.exit(failed > 0 ? 1 : 0)
}

await seed()

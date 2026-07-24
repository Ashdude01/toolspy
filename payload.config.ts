import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { ToolContent } from './collections/ToolContent'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { ALL_LOCALES, DEFAULT_LOCALE } from './lib/i18n/locales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Toolspy v2 — Payload CMS config
 *
 * - Localization: saare 16 locales (lib/i18n/locales.ts se — single source of truth)
 * - English mandatory/default; baaki languages ka har field optional (fallback: true)
 * - DB: Postgres (Neon free tier) — DATABASE_URL env me
 * - Media collection abhi nahi hai (Vercel serverless me local uploads persist
 *   nahi hote) — images ke liye Cloudinary URLs richtext me paste karo (current
 *   pattern). Zaroorat pade to @payloadcms/storage-vercel-blob add karenge.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, ToolContent, Posts, Pages],
  // No Media collection — Upload/Relationship features hatao warna admin richText blank/broken dikh sakta hai.
  // Images Cloudinary URL se richText me paste karo (current pattern).
  editor: lexicalEditor({
    features: ({ defaultFeatures }) =>
      defaultFeatures.filter((feature) => feature.key !== 'upload' && feature.key !== 'relationship'),
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  localization: {
    locales: Object.values(ALL_LOCALES).map((l) => ({
      code: l.code,
      label: l.name,
    })),
    defaultLocale: DEFAULT_LOCALE,
    fallback: true,
  },
})

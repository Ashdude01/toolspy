import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import {
  lexicalEditor,
  FixedToolbarFeature,
  UploadFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ToolContent } from './collections/ToolContent'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Homepage } from './globals/Homepage'
import { VideoEmbed } from './blocks/VideoEmbed'
import { ALL_LOCALES, DEFAULT_LOCALE } from './lib/i18n/locales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Toolspy v2 — Payload CMS config
 *
 * - Localization: saare locales (lib/i18n/locales.ts se — single source of truth)
 * - English mandatory/default; baaki languages ka har field optional (fallback: true)
 * - DB: Postgres (Neon free tier) — DATABASE_URL env me
 * - Media: image uploads (public/media) + sharp for imageSizes
 * - Rich text editor: full features — headings, lists, links, TABLE, IMAGE upload,
 *   VIDEO embed block, horizontal rule, alignment, fixed toolbar.
 */
export default buildConfig({
  // serverURL: dev me localhost se infer ho (empty), sirf production me absolute URL.
  //
  // WARNING: isko production site URL (https://toolspy.net) par hardcode karne se
  // LOCAL DEV toot jata tha — Payload ka CSRF check request origin (localhost:3000)
  // ko serverURL (toolspy.net) se match karta hai. Mismatch par authenticated
  // POST/server-actions (buildFormState, preferences) "401 Unauthorized" ho jate the,
  // jisse admin me array fields (sections/FAQs) hamesha shimmer par atak jate the.
  //
  // Ab: dev → '' (Payload request se localhost infer karta hai) → auth sahi.
  //     prod → NEXT_PUBLIC_SITE_URL (ya NEXT_PUBLIC_SERVER_URL agar set ho).
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SITE_URL || ''
      : ''),
  // CSRF allowlist — in origins se authenticated requests allow. Dev + prod dono cover.
  csrf: [
    'http://localhost:3000',
    'https://toolspy.net',
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
  ].filter((v): v is string => Boolean(v)),
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ToolContent, Posts, Pages],
  globals: [Homepage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(), // hamesha-visible toolbar (better UX)
      EXPERIMENTAL_TableFeature(), // tables
      UploadFeature({
        collections: {
          media: {
            fields: [{ name: 'caption', type: 'text' }],
          },
        },
      }), // image insert (Media se)
      BlocksFeature({ blocks: [VideoEmbed] }), // video embed (YouTube/Vimeo)
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Vercel/serverless: Neon cold-start pe infinite hang mat karo
      connectionTimeoutMillis: 4000,
      idleTimeoutMillis: 10000,
      max: 5,
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

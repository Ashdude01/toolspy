import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
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
 * - Media: image uploads (public/media). Vercel pe deploy karte waqt cloud storage
 *   adapter (R2/Blob) add karna — local disk serverless me persist nahi hota.
 * - Rich text editor: full features — headings, lists, links, TABLE, IMAGE upload,
 *   VIDEO embed block, horizontal rule, alignment, fixed toolbar.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ToolContent, Posts, Pages],
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

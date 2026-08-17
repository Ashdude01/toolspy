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
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter, isCloudinaryEnabled } from './lib/storage/cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ToolContent } from './collections/ToolContent'
import { Authors } from './collections/Authors'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Homepage } from './globals/Homepage'
import { VideoEmbed } from './blocks/VideoEmbed'
import { ALL_LOCALES, DEFAULT_LOCALE } from './lib/i18n/locales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Strip trailing slash so Origin header match fail na ho. */
function originURL(url?: string | null): string | undefined {
  if (!url) return undefined
  const trimmed = url.trim().replace(/\/+$/, '')
  return trimmed || undefined
}

/**
 * Admin auth origins — Payload cookie auth yahan se allow karta hai.
 *
 * IMPORTANT: next.config.mjs `NEXT_PUBLIC_SITE_URL` hardcode = toolspy.net,
 * lekin live admin kabhi `https://dev.toolspy.net` pe bhi hota hai.
 * Agar csrf me sirf toolspy.net ho to Origin mismatch →
 *   POST /api/payload-preferences/* → 401
 *   logout → fail / cookie clear nahi
 */
const PAYLOAD_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://toolspy.net',
  'https://www.toolspy.net',
  'https://dev.toolspy.net',
  originURL(process.env.NEXT_PUBLIC_SITE_URL),
  originURL(process.env.NEXT_PUBLIC_SERVER_URL),
  // Vercel deployment hostname (preview + *.vercel.app)
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined,
]
  .map((u) => originURL(u))
  .filter((v): v is string => Boolean(v))

const uniqueOrigins = [...new Set(PAYLOAD_ORIGINS)]

/**
 * Media storage: Cloudinary (free-forever CDN) when CLOUDINARY_* env vars are set,
 * otherwise fall back to local disk (public/media) for local dev. This keeps `next build`
 * and `payload` CLI working even without credentials.
 */
const cloudinaryOn = isCloudinaryEnabled()
const storagePlugins = cloudinaryOn
  ? [
      cloudStoragePlugin({
        collections: {
          media: {
            adapter: cloudinaryAdapter(),
            disableLocalStorage: true,
          },
        },
      }),
    ]
  : []

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
  // serverURL:
  // - Hardcoding toolspy.net broke admin on dev.toolspy.net (Origin ≠ serverURL → 401).
  // - Hardcoding anything also broke local when SITE_URL pointed at prod.
  // - Prefer explicit NEXT_PUBLIC_SERVER_URL per deploy (Vercel env);
  //   otherwise leave empty so Payload uses the request host.
  serverURL: originURL(process.env.NEXT_PUBLIC_SERVER_URL) || '',
  // CSRF + CORS — same-host cookie auth ke liye saare admin/public hosts whitelist
  csrf: uniqueOrigins,
  cors: uniqueOrigins,
  sharp,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Authors, ToolContent, Posts, Pages],
  globals: [Homepage],
  plugins: [...storagePlugins],
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

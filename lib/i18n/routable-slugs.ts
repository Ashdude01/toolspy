/**
 * Toolspy v2 — CLIENT-SAFE routable slug lists (locale-aware link helper ke liye).
 *
 * KYUN ye file: header/footer (client components) ko ye jaanna hota hai ki kaunsa
 * internal link localized route ke roop me exist karta hai (taaki /de/<slug> banaye,
 * warna English hi rakhe — 404 na ho). tool-registry.ts ko client me import karna
 * RISKY hai (200+ dynamic imports → webpack "Can't resolve fs" wala purana bug),
 * isliye yahan sirf PLAIN string arrays rakhte hain (koi import nahi).
 *
 * SYNC NOTE (zaroori): ye do list neeche ke source se derive hoti hain —
 *   - ROUTABLE_TOOL_SLUGS  = Object.keys(toolRegistry)  (lib/i18n/tool-registry.ts)
 *   - ROUTABLE_STATIC_SLUGS = app/(site)/(i18n)/[locale]/[slug]/page.tsx ka STATIC_PAGES
 * Naya tool/static page add karo to yahan bhi ek line add kar dena.
 * (Galti se koi slug chhoot bhi jaaye to sirf itna hoga ki us link pe locale-prefix
 *  nahi lagega — English page khulega, KOI 404 nahi.)
 */

/** Tools jinke localized routes build hote hain (registry keys). */
export const ROUTABLE_TOOL_SLUGS: string[] = [
  'age-calculator', 'ai-background-remover', 'ai-color-palette-generator',
  'ai-image-enhancer', 'ai-resume-builder', 'ai-writing-tools', 'app-icon-generator',
  'area-converter', 'bank-po-rank-predictor', 'base64-encoder-decoder', 'base64-to-image',
  'bmi-calculator', 'cat-percentile-predictor', 'cgst-sgst-igst-splitter',
  'coast-fire-calculator', 'code-beautifier', 'color-palette-generator', 'color-picker',
  'composition-regular-scheme-estimator', 'compress-pdf', 'currency-converter',
  'domain-whois-lookup', 'e-invoice-qr-validator', 'ebook-converter',
  'expired-domain-finder', 'facebook-engagement-calculator', 'facebook-image-downloader',
  'favicon-generator', 'file-protector', 'font-converter', 'gate-rank-predictor',
  'google-indexing-api', 'gst-calculator', 'heic-to-pdf', 'hsn-sac-finder',
  'image-compressor', 'image-converter', 'image-optimizer', 'image-resizer',
  'image-to-base64', 'image-to-ico-converter', 'image-to-pdf', 'instagram-dp-viewer',
  'instagram-engagement-calculator', 'instagram-reels-downloader', 'investment-calculator',
  'itc-calculator', 'jee-advanced-rank-predictor', 'jee-main-rank-predictor',
  'jfif-to-jpg', 'jfif-to-pdf', 'json-formatter', 'json-table-converter',
  'length-converter', 'loan-calculator', 'love-calculator', 'markdown-to-docs-converter',
  'media-converter', 'meme-generator', 'merge-pdf', 'mortgage-calculator',
  'neet-rank-predictor', 'ocr-text-extractor', 'online-image-cropper', 'pdf-converter',
  'pdf-password-remover', 'pdf-to-csv', 'pdf-to-excel', 'pdf-to-image', 'pdf-to-word',
  'penalty-late-fee-calculator', 'percentage-calculator', 'pwa-icon-generator',
  'qr-code-generator', 'retirement-calculator', 'reverse-gst-calculator',
  'salary-calculator', 'split-pdf', 'ssc-cgl-rank-predictor', 'tax-calculator',
  'temperature-converter', 'twitter-engagement-calculator', 'unit-converter',
  'upsc-rank-predictor', 'volume-converter', 'website-screenshot', 'weight-converter',
  'youtube-embed-code-generator', 'youtube-engagement-calculator',
  'youtube-thumbnail-downloader',
]

/** Single-segment static pages jinke localized routes hain (dispatcher STATIC_PAGES). */
export const ROUTABLE_STATIC_SLUGS: string[] = [
  'tools', 'about', 'contact', 'careers', 'help', 'feedback', 'bug-report',
  'digital-marketing', 'privacy', 'terms', 'disclaimer', 'dmca', 'cookie-policy',
  'gdpr-ccpa',
]

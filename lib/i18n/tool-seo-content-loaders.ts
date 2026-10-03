/**
 * Dynamic loaders for hardcoded tool seo-content.tsx components.
 * Used when a locale's contentSource is "code" so English hardcoded SEO
 * still renders on /de/.../ (and other locales) instead of empty content.
 *
 * Auto-pattern: every export ending in SEOContent is treated as the page body.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from 'react'

export const toolSeoContentLoaders: Record<string, () => Promise<Record<string, any>>> = {
  'age-calculator': () => import('@/app/(frontend)/(tools)/age-calculator/seo-content'),
  'ai-background-remover': () => import('@/app/(frontend)/(tools)/ai-background-remover/seo-content'),
  'ai-color-palette-generator': () => import('@/app/(frontend)/(tools)/ai-color-palette-generator/seo-content'),
  'ai-image-enhancer': () => import('@/app/(frontend)/(tools)/ai-image-enhancer/seo-content'),
  'ai-resume-builder': () => import('@/app/(frontend)/(tools)/ai-resume-builder/seo-content'),
  'ai-writing-tools': () => import('@/app/(frontend)/(tools)/ai-writing-tools/seo-content'),
  'app-icon-generator': () => import('@/app/(frontend)/(tools)/app-icon-generator/seo-content'),
  'area-converter': () => import('@/app/(frontend)/(tools)/area-converter/seo-content'),
  'bank-po-rank-predictor': () => import('@/app/(frontend)/(tools)/bank-po-rank-predictor/seo-content'),
  'base64-encoder-decoder': () => import('@/app/(frontend)/(tools)/base64-encoder-decoder/seo-content'),
  'base64-to-image': () => import('@/app/(frontend)/(tools)/base64-to-image/seo-content'),
  'bmi-calculator': () => import('@/app/(frontend)/(tools)/bmi-calculator/seo-content'),
  'cat-percentile-predictor': () => import('@/app/(frontend)/(tools)/cat-percentile-predictor/seo-content'),
  'cgst-sgst-igst-splitter': () => import('@/app/(frontend)/(tools)/cgst-sgst-igst-splitter/seo-content'),
  'coast-fire-calculator': () => import('@/app/(frontend)/(tools)/coast-fire-calculator/seo-content'),
  'code-beautifier': () => import('@/app/(frontend)/(tools)/code-beautifier/seo-content'),
  'color-palette-generator': () => import('@/app/(frontend)/(tools)/color-palette-generator/seo-content'),
  'color-picker': () => import('@/app/(frontend)/(tools)/color-picker/seo-content'),
  'composition-regular-scheme-estimator': () => import('@/app/(frontend)/(tools)/composition-regular-scheme-estimator/seo-content'),
  'compress-pdf': () => import('@/app/(frontend)/(tools)/compress-pdf/seo-content'),
  'currency-converter': () => import('@/app/(frontend)/(tools)/currency-converter/seo-content'),
  'domain-whois-lookup': () => import('@/app/(frontend)/(tools)/domain-whois-lookup/seo-content'),
  'e-invoice-qr-validator': () => import('@/app/(frontend)/(tools)/e-invoice-qr-validator/seo-content'),
  'ebook-converter': () => import('@/app/(frontend)/(tools)/ebook-converter/seo-content'),
  'expired-domain-finder': () => import('@/app/(frontend)/(tools)/expired-domain-finder/seo-content'),
  'facebook-engagement-calculator': () => import('@/app/(frontend)/(tools)/facebook-engagement-calculator/seo-content'),
  'favicon-generator': () => import('@/app/(frontend)/(tools)/favicon-generator/seo-content'),
  'file-protector': () => import('@/app/(frontend)/(tools)/file-protector/seo-content'),
  'font-converter': () => import('@/app/(frontend)/(tools)/font-converter/seo-content'),
  'gate-rank-predictor': () => import('@/app/(frontend)/(tools)/gate-rank-predictor/seo-content'),
  'google-indexing-api': () => import('@/app/(frontend)/(tools)/google-indexing-api/seo-content'),
  'gst-calculator': () => import('@/app/(frontend)/(tools)/gst-calculator/seo-content'),
  'heic-to-pdf': () => import('@/app/(frontend)/(tools)/heic-to-pdf/seo-content'),
  'hsn-sac-finder': () => import('@/app/(frontend)/(tools)/hsn-sac-finder/seo-content'),
  'image-compressor': () => import('@/app/(frontend)/(tools)/image-compressor/seo-content'),
  'image-converter': () => import('@/app/(frontend)/(tools)/image-converter/seo-content'),
  'image-optimizer': () => import('@/app/(frontend)/(tools)/image-optimizer/seo-content'),
  'image-resizer': () => import('@/app/(frontend)/(tools)/image-resizer/seo-content'),
  'image-to-base64': () => import('@/app/(frontend)/(tools)/image-to-base64/seo-content'),
  'image-to-ico-converter': () => import('@/app/(frontend)/(tools)/image-to-ico-converter/seo-content'),
  'image-to-pdf': () => import('@/app/(frontend)/(tools)/image-to-pdf/seo-content'),
  'instagram-dp-viewer': () => import('@/app/(frontend)/(tools)/instagram-dp-viewer/seo-content'),
  'instagram-engagement-calculator': () => import('@/app/(frontend)/(tools)/instagram-engagement-calculator/seo-content'),
  'instagram-private-viewer': () => import('@/app/(frontend)/(tools)/instagram-private-viewer/seo-content'),
  'instagram-reels-downloader': () => import('@/app/(frontend)/(tools)/instagram-reels-downloader/seo-content'),
  'investment-calculator': () => import('@/app/(frontend)/(tools)/investment-calculator/seo-content'),
  'itc-calculator': () => import('@/app/(frontend)/(tools)/itc-calculator/seo-content'),
  'jee-advanced-rank-predictor': () => import('@/app/(frontend)/(tools)/jee-advanced-rank-predictor/seo-content'),
  'jee-main-rank-predictor': () => import('@/app/(frontend)/(tools)/jee-main-rank-predictor/seo-content'),
  'jfif-to-jpg': () => import('@/app/(frontend)/(tools)/jfif-to-jpg/seo-content'),
  'jfif-to-pdf': () => import('@/app/(frontend)/(tools)/jfif-to-pdf/seo-content'),
  'json-formatter': () => import('@/app/(frontend)/(tools)/json-formatter/seo-content'),
  'json-table-converter': () => import('@/app/(frontend)/(tools)/json-table-converter/seo-content'),
  'length-converter': () => import('@/app/(frontend)/(tools)/length-converter/seo-content'),
  'loan-calculator': () => import('@/app/(frontend)/(tools)/loan-calculator/seo-content'),
  'love-calculator': () => import('@/app/(frontend)/(tools)/love-calculator/seo-content'),
  'markdown-to-docs-converter': () => import('@/app/(frontend)/(tools)/markdown-to-docs-converter/seo-content'),
  'media-converter': () => import('@/app/(frontend)/(tools)/media-converter/seo-content'),
  'meme-generator': () => import('@/app/(frontend)/(tools)/meme-generator/seo-content'),
  'merge-pdf': () => import('@/app/(frontend)/(tools)/merge-pdf/seo-content'),
  'mortgage-calculator': () => import('@/app/(frontend)/(tools)/mortgage-calculator/seo-content'),
  'neet-rank-predictor': () => import('@/app/(frontend)/(tools)/neet-rank-predictor/seo-content'),
  'ocr-text-extractor': () => import('@/app/(frontend)/(tools)/ocr-text-extractor/seo-content'),
  'online-image-cropper': () => import('@/app/(frontend)/(tools)/online-image-cropper/seo-content'),
  'pdf-converter': () => import('@/app/(frontend)/(tools)/pdf-converter/seo-content'),
  'pdf-password-remover': () => import('@/app/(frontend)/(tools)/pdf-password-remover/seo-content'),
  'pdf-to-csv': () => import('@/app/(frontend)/(tools)/pdf-to-csv/seo-content'),
  'pdf-to-excel': () => import('@/app/(frontend)/(tools)/pdf-to-excel/seo-content'),
  'pdf-to-image': () => import('@/app/(frontend)/(tools)/pdf-to-image/seo-content'),
  'pdf-to-word': () => import('@/app/(frontend)/(tools)/pdf-to-word/seo-content'),
  'penalty-late-fee-calculator': () => import('@/app/(frontend)/(tools)/penalty-late-fee-calculator/seo-content'),
  'percentage-calculator': () => import('@/app/(frontend)/(tools)/percentage-calculator/seo-content'),
  'pwa-icon-generator': () => import('@/app/(frontend)/(tools)/pwa-icon-generator/seo-content'),
  'qr-code-generator': () => import('@/app/(frontend)/(tools)/qr-code-generator/seo-content'),
  'retirement-calculator': () => import('@/app/(frontend)/(tools)/retirement-calculator/seo-content'),
  'reverse-gst-calculator': () => import('@/app/(frontend)/(tools)/reverse-gst-calculator/seo-content'),
  'salary-calculator': () => import('@/app/(frontend)/(tools)/salary-calculator/seo-content'),
  'split-pdf': () => import('@/app/(frontend)/(tools)/split-pdf/seo-content'),
  'ssc-cgl-rank-predictor': () => import('@/app/(frontend)/(tools)/ssc-cgl-rank-predictor/seo-content'),
  'tax-calculator': () => import('@/app/(frontend)/(tools)/tax-calculator/seo-content'),
  'temperature-converter': () => import('@/app/(frontend)/(tools)/temperature-converter/seo-content'),
  'twitter-engagement-calculator': () => import('@/app/(frontend)/(tools)/twitter-engagement-calculator/seo-content'),
  'unit-converter': () => import('@/app/(frontend)/(tools)/unit-converter/seo-content'),
  'upsc-rank-predictor': () => import('@/app/(frontend)/(tools)/upsc-rank-predictor/seo-content'),
  'volume-converter': () => import('@/app/(frontend)/(tools)/volume-converter/seo-content'),
  'website-screenshot': () => import('@/app/(frontend)/(tools)/website-screenshot/seo-content'),
  'weight-converter': () => import('@/app/(frontend)/(tools)/weight-converter/seo-content'),
  'youtube-embed-code-generator': () => import('@/app/(frontend)/(tools)/youtube-embed-code-generator/seo-content'),
  'youtube-engagement-calculator': () => import('@/app/(frontend)/(tools)/youtube-engagement-calculator/seo-content'),
  'youtube-thumbnail-downloader': () => import('@/app/(frontend)/(tools)/youtube-thumbnail-downloader/seo-content'),
}

export async function loadHardcodedToolSeoContent(
  slug: string,
): Promise<ComponentType | null> {
  const loader = toolSeoContentLoaders[slug]
  if (!loader) return null
  try {
    const mod = await loader()
    for (const [key, value] of Object.entries(mod)) {
      if (key.endsWith('SEOContent') && typeof value === 'function') {
        return value as ComponentType
      }
    }
  } catch {
    return null
  }
  return null
}

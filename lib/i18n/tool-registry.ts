/**
 * Toolspy v2 — Tool Registry (auto-generated from app/(frontend)/(tools)/ folders)
 *
 * CORE PRINCIPLE (hybrid model):
 *   Code decide karta hai tool KYA karta hai. CMS decide karega page par KYA LIKHA hai.
 *   Join key = slug.
 *
 * Har entry existing English tool ke layout.tsx (metadata + SEO wrapper) aur
 * page.tsx (tool logic) ko dynamic-import karti hai. app/[locale]/[slug] route
 * inhe reuse karke localized URLs pe wahi tool render karta hai —
 * tool ke code me ZERO changes.
 *
 * Naya tool banao to yahan ek line add karo. (Phase 2 me Payload is slug se
 * localized SEO content dega — CMS me galat slug ban hi nahi sakta kyunki
 * validation isi list se hogi.)
 *
 * NOTE — ye folders registry me NAHI hain kyunki inme page.tsx nahi mila:
 *   emi-calculator, hash-generator, image-to-text, image-upscaler,
 *   image-watermark-remover, lorem-ipsum-generator, password-generator, uuid-generator
 *   (in folders me sirf seo-content.tsx hai — inka route abhi exist nahi karta.
 *    Jab page.tsx banao, yahan entry add kar dena.)
 *   instagram-private-viewer excluded (redirect → instagram-dp-viewer)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ToolModules {
  /** layout.tsx module — exports: metadata (Metadata), default (Layout component) */
  layout: () => Promise<any>
  /** page.tsx module — exports: default (tool component) */
  page: () => Promise<any>
}

export const toolRegistry: Record<string, ToolModules> = {
  'age-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/age-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/age-calculator/page'),
  },
  'ai-background-remover': {
    layout: () => import('@/app/(frontend)/(tools)/ai-background-remover/layout'),
    page: () => import('@/app/(frontend)/(tools)/ai-background-remover/page'),
  },
  'ai-color-palette-generator': {
    layout: () => import('@/app/(frontend)/(tools)/ai-color-palette-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/ai-color-palette-generator/page'),
  },
  'ai-image-enhancer': {
    layout: () => import('@/app/(frontend)/(tools)/ai-image-enhancer/layout'),
    page: () => import('@/app/(frontend)/(tools)/ai-image-enhancer/page'),
  },
  'ai-resume-builder': {
    layout: () => import('@/app/(frontend)/(tools)/ai-resume-builder/layout'),
    page: () => import('@/app/(frontend)/(tools)/ai-resume-builder/page'),
  },
  'ai-writing-tools': {
    layout: () => import('@/app/(frontend)/(tools)/ai-writing-tools/layout'),
    page: () => import('@/app/(frontend)/(tools)/ai-writing-tools/page'),
  },
  'app-icon-generator': {
    layout: () => import('@/app/(frontend)/(tools)/app-icon-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/app-icon-generator/page'),
  },
  'area-converter': {
    layout: () => import('@/app/(frontend)/(tools)/area-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/area-converter/page'),
  },
  'bank-po-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/bank-po-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/bank-po-rank-predictor/page'),
  },
  'base64-encoder-decoder': {
    layout: () => import('@/app/(frontend)/(tools)/base64-encoder-decoder/layout'),
    page: () => import('@/app/(frontend)/(tools)/base64-encoder-decoder/page'),
  },
  'base64-to-image': {
    layout: () => import('@/app/(frontend)/(tools)/base64-to-image/layout'),
    page: () => import('@/app/(frontend)/(tools)/base64-to-image/page'),
  },
  'bmi-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/bmi-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/bmi-calculator/page'),
  },
  'cat-percentile-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/cat-percentile-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/cat-percentile-predictor/page'),
  },
  'cgst-sgst-igst-splitter': {
    layout: () => import('@/app/(frontend)/(tools)/cgst-sgst-igst-splitter/layout'),
    page: () => import('@/app/(frontend)/(tools)/cgst-sgst-igst-splitter/page'),
  },
  'coast-fire-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/coast-fire-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/coast-fire-calculator/page'),
  },
  'code-beautifier': {
    layout: () => import('@/app/(frontend)/(tools)/code-beautifier/layout'),
    page: () => import('@/app/(frontend)/(tools)/code-beautifier/page'),
  },
  'color-palette-generator': {
    layout: () => import('@/app/(frontend)/(tools)/color-palette-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/color-palette-generator/page'),
  },
  'color-picker': {
    layout: () => import('@/app/(frontend)/(tools)/color-picker/layout'),
    page: () => import('@/app/(frontend)/(tools)/color-picker/page'),
  },
  'composition-regular-scheme-estimator': {
    layout: () => import('@/app/(frontend)/(tools)/composition-regular-scheme-estimator/layout'),
    page: () => import('@/app/(frontend)/(tools)/composition-regular-scheme-estimator/page'),
  },
  'compress-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/compress-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/compress-pdf/page'),
  },
  'currency-converter': {
    layout: () => import('@/app/(frontend)/(tools)/currency-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/currency-converter/page'),
  },
  'domain-whois-lookup': {
    layout: () => import('@/app/(frontend)/(tools)/domain-whois-lookup/layout'),
    page: () => import('@/app/(frontend)/(tools)/domain-whois-lookup/page'),
  },
  'e-invoice-qr-validator': {
    layout: () => import('@/app/(frontend)/(tools)/e-invoice-qr-validator/layout'),
    page: () => import('@/app/(frontend)/(tools)/e-invoice-qr-validator/page'),
  },
  'ebook-converter': {
    layout: () => import('@/app/(frontend)/(tools)/ebook-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/ebook-converter/page'),
  },
  'expired-domain-finder': {
    layout: () => import('@/app/(frontend)/(tools)/expired-domain-finder/layout'),
    page: () => import('@/app/(frontend)/(tools)/expired-domain-finder/page'),
  },
  'facebook-engagement-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/facebook-engagement-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/facebook-engagement-calculator/page'),
  },
  'facebook-image-downloader': {
    layout: () => import('@/app/(frontend)/(tools)/facebook-image-downloader/layout'),
    page: () => import('@/app/(frontend)/(tools)/facebook-image-downloader/page'),
  },
  'favicon-generator': {
    layout: () => import('@/app/(frontend)/(tools)/favicon-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/favicon-generator/page'),
  },
  'file-protector': {
    layout: () => import('@/app/(frontend)/(tools)/file-protector/layout'),
    page: () => import('@/app/(frontend)/(tools)/file-protector/page'),
  },
  'font-converter': {
    layout: () => import('@/app/(frontend)/(tools)/font-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/font-converter/page'),
  },
  'gate-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/gate-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/gate-rank-predictor/page'),
  },
  'google-indexing-api': {
    layout: () => import('@/app/(frontend)/(tools)/google-indexing-api/layout'),
    page: () => import('@/app/(frontend)/(tools)/google-indexing-api/page'),
  },
  'gst-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/gst-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/gst-calculator/page'),
  },
  'heic-to-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/heic-to-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/heic-to-pdf/page'),
  },
  'hsn-sac-finder': {
    layout: () => import('@/app/(frontend)/(tools)/hsn-sac-finder/layout'),
    page: () => import('@/app/(frontend)/(tools)/hsn-sac-finder/page'),
  },
  'image-compressor': {
    layout: () => import('@/app/(frontend)/(tools)/image-compressor/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-compressor/page'),
  },
  'image-converter': {
    layout: () => import('@/app/(frontend)/(tools)/image-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-converter/page'),
  },
  'image-optimizer': {
    layout: () => import('@/app/(frontend)/(tools)/image-optimizer/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-optimizer/page'),
  },
  'image-resizer': {
    layout: () => import('@/app/(frontend)/(tools)/image-resizer/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-resizer/page'),
  },
  'image-to-base64': {
    layout: () => import('@/app/(frontend)/(tools)/image-to-base64/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-to-base64/page'),
  },
  'image-to-ico-converter': {
    layout: () => import('@/app/(frontend)/(tools)/image-to-ico-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-to-ico-converter/page'),
  },
  'image-to-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/image-to-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/image-to-pdf/page'),
  },
  'instagram-dp-viewer': {
    layout: () => import('@/app/(frontend)/(tools)/instagram-dp-viewer/layout'),
    page: () => import('@/app/(frontend)/(tools)/instagram-dp-viewer/page'),
  },
  'instagram-engagement-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/instagram-engagement-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/instagram-engagement-calculator/page'),
  },
  'instagram-reels-downloader': {
    layout: () => import('@/app/(frontend)/(tools)/instagram-reels-downloader/layout'),
    page: () => import('@/app/(frontend)/(tools)/instagram-reels-downloader/page'),
  },
  'investment-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/investment-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/investment-calculator/page'),
  },
  'itc-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/itc-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/itc-calculator/page'),
  },
  'jee-advanced-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/jee-advanced-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/jee-advanced-rank-predictor/page'),
  },
  'jee-main-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/jee-main-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/jee-main-rank-predictor/page'),
  },
  'jfif-to-jpg': {
    layout: () => import('@/app/(frontend)/(tools)/jfif-to-jpg/layout'),
    page: () => import('@/app/(frontend)/(tools)/jfif-to-jpg/page'),
  },
  'jfif-to-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/jfif-to-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/jfif-to-pdf/page'),
  },
  'json-formatter': {
    layout: () => import('@/app/(frontend)/(tools)/json-formatter/layout'),
    page: () => import('@/app/(frontend)/(tools)/json-formatter/page'),
  },
  'json-table-converter': {
    layout: () => import('@/app/(frontend)/(tools)/json-table-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/json-table-converter/page'),
  },
  'length-converter': {
    layout: () => import('@/app/(frontend)/(tools)/length-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/length-converter/page'),
  },
  'loan-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/loan-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/loan-calculator/page'),
  },
  'love-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/love-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/love-calculator/page'),
  },
  'markdown-to-docs-converter': {
    layout: () => import('@/app/(frontend)/(tools)/markdown-to-docs-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/markdown-to-docs-converter/page'),
  },
  'media-converter': {
    layout: () => import('@/app/(frontend)/(tools)/media-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/media-converter/page'),
  },
  'meme-generator': {
    layout: () => import('@/app/(frontend)/(tools)/meme-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/meme-generator/page'),
  },
  'merge-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/merge-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/merge-pdf/page'),
  },
  'mortgage-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/mortgage-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/mortgage-calculator/page'),
  },
  'neet-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/neet-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/neet-rank-predictor/page'),
  },
  'ocr-text-extractor': {
    layout: () => import('@/app/(frontend)/(tools)/ocr-text-extractor/layout'),
    page: () => import('@/app/(frontend)/(tools)/ocr-text-extractor/page'),
  },
  'online-image-cropper': {
    layout: () => import('@/app/(frontend)/(tools)/online-image-cropper/layout'),
    page: () => import('@/app/(frontend)/(tools)/online-image-cropper/page'),
  },
  'pdf-converter': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-converter/page'),
  },
  'pdf-password-remover': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-password-remover/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-password-remover/page'),
  },
  'pdf-to-csv': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-to-csv/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-to-csv/page'),
  },
  'pdf-to-excel': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-to-excel/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-to-excel/page'),
  },
  'pdf-to-image': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-to-image/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-to-image/page'),
  },
  'pdf-to-word': {
    layout: () => import('@/app/(frontend)/(tools)/pdf-to-word/layout'),
    page: () => import('@/app/(frontend)/(tools)/pdf-to-word/page'),
  },
  'penalty-late-fee-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/penalty-late-fee-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/penalty-late-fee-calculator/page'),
  },
  'percentage-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/percentage-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/percentage-calculator/page'),
  },
  'pwa-icon-generator': {
    layout: () => import('@/app/(frontend)/(tools)/pwa-icon-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/pwa-icon-generator/page'),
  },
  'qr-code-generator': {
    layout: () => import('@/app/(frontend)/(tools)/qr-code-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/qr-code-generator/page'),
  },
  'retirement-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/retirement-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/retirement-calculator/page'),
  },
  'reverse-gst-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/reverse-gst-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/reverse-gst-calculator/page'),
  },
  'salary-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/salary-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/salary-calculator/page'),
  },
  'split-pdf': {
    layout: () => import('@/app/(frontend)/(tools)/split-pdf/layout'),
    page: () => import('@/app/(frontend)/(tools)/split-pdf/page'),
  },
  'ssc-cgl-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/ssc-cgl-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/ssc-cgl-rank-predictor/page'),
  },
  'tax-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/tax-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/tax-calculator/page'),
  },
  'temperature-converter': {
    layout: () => import('@/app/(frontend)/(tools)/temperature-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/temperature-converter/page'),
  },
  'twitter-engagement-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/twitter-engagement-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/twitter-engagement-calculator/page'),
  },
  'unit-converter': {
    layout: () => import('@/app/(frontend)/(tools)/unit-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/unit-converter/page'),
  },
  'upsc-rank-predictor': {
    layout: () => import('@/app/(frontend)/(tools)/upsc-rank-predictor/layout'),
    page: () => import('@/app/(frontend)/(tools)/upsc-rank-predictor/page'),
  },
  'volume-converter': {
    layout: () => import('@/app/(frontend)/(tools)/volume-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/volume-converter/page'),
  },
  'website-screenshot': {
    layout: () => import('@/app/(frontend)/(tools)/website-screenshot/layout'),
    page: () => import('@/app/(frontend)/(tools)/website-screenshot/page'),
  },
  'weight-converter': {
    layout: () => import('@/app/(frontend)/(tools)/weight-converter/layout'),
    page: () => import('@/app/(frontend)/(tools)/weight-converter/page'),
  },
  'youtube-embed-code-generator': {
    layout: () => import('@/app/(frontend)/(tools)/youtube-embed-code-generator/layout'),
    page: () => import('@/app/(frontend)/(tools)/youtube-embed-code-generator/page'),
  },
  'youtube-engagement-calculator': {
    layout: () => import('@/app/(frontend)/(tools)/youtube-engagement-calculator/layout'),
    page: () => import('@/app/(frontend)/(tools)/youtube-engagement-calculator/page'),
  },
  'youtube-thumbnail-downloader': {
    layout: () => import('@/app/(frontend)/(tools)/youtube-thumbnail-downloader/layout'),
    page: () => import('@/app/(frontend)/(tools)/youtube-thumbnail-downloader/page'),
  },
}

/** Saare slugs jinke localized versions build honge */
export const localizedToolSlugs = Object.keys(toolRegistry)

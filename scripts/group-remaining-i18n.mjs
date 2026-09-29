import fs from 'fs'

const without = `
ai-color-palette-generator
ai-image-enhancer
ai-resume-builder
ai-writing-tools
app-icon-generator
area-converter
bank-po-rank-predictor
bmi-calculator
cat-percentile-predictor
cgst-sgst-igst-splitter
coast-fire-calculator
code-beautifier
color-palette-generator
color-picker
composition-regular-scheme-estimator
currency-converter
domain-whois-lookup
e-invoice-qr-validator
ebook-converter
expired-domain-finder
facebook-engagement-calculator
favicon-generator
file-protector
gate-rank-predictor
google-indexing-api
gst-calculator
heic-to-pdf
hsn-sac-finder
image-optimizer
image-to-ico-converter
image-to-pdf
instagram-dp-viewer
instagram-engagement-calculator
instagram-private-viewer
instagram-reels-downloader
investment-calculator
itc-calculator
jee-advanced-rank-predictor
jee-main-rank-predictor
jfif-to-jpg
jfif-to-pdf
json-formatter
json-table-converter
length-converter
loan-calculator
love-calculator
markdown-to-docs-converter
media-converter
meme-generator
merge-pdf
mortgage-calculator
neet-rank-predictor
ocr-text-extractor
pdf-password-remover
pdf-to-csv
pdf-to-excel
pdf-to-image
pdf-to-word
penalty-late-fee-calculator
pwa-icon-generator
retirement-calculator
reverse-gst-calculator
salary-calculator
split-pdf
ssc-cgl-rank-predictor
tax-calculator
temperature-converter
twitter-engagement-calculator
unit-converter
upsc-rank-predictor
volume-converter
website-screenshot
weight-converter
youtube-embed-code-generator
youtube-engagement-calculator
`.trim().split(/\n/)

const data = fs.readFileSync('lib/tools-data.ts', 'utf8')
const by = {}
for (const slug of without) {
  const idx = data.indexOf(`slug: '${slug}'`)
  const idx2 = idx < 0 ? data.indexOf(`slug: "${slug}"`) : idx
  let cat = 'unknown'
  if (idx2 >= 0) {
    const slice = data.slice(idx2, idx2 + 400)
    const m = slice.match(/category:\s*['"]([^'"]+)/)
    if (m) cat = m[1]
  }
  ;(by[cat] = by[cat] || []).push(slug)
}
for (const [k, v] of Object.entries(by).sort()) {
  console.log(`${k}: ${v.length}`)
  console.log('  ' + v.join(', '))
}

/**
 * Pillar SEO content for the Conversion Tools category page (/tools/conversion-tools/).
 * Server-rendered so crawlers get the full guide in HTML.
 * Written per Google helpful-content guidelines: factual, user-first,
 * no competitor comparisons or unverifiable claims.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { ToolCard } from "@/components/tools/tool-card";
import NextImage from "next/image";
import Link from "next/link";

const categoryFaqs = () => [
  {
    question: "Are conversions really free, without watermarks?",
    answer:
      "Yes - all converters are free with no watermark, no signup, and no daily caps.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "Wherever the format allows, conversion runs client-side in your browser. Your files are not stored either way.",
  },
  {
    question: "How accurate is the OCR?",
    answer:
      "On clean, well-lit scans accuracy is high across 12+ supported languages. Low-resolution photos, handwriting, and heavy skew reduce accuracy - re-scan straight and sharp for best results.",
  },
  {
    question: "Do the downloaders work on private content?",
    answer:
      "No. The Instagram DP viewer and Facebook image downloader work only with publicly accessible content and do not bypass any privacy controls.",
  },
  {
    question: "Can I convert DRM-protected ebooks?",
    answer:
      "No - DRM-protected files cannot and will not be converted. Convert only content you own the rights to.",
  },
];

export function ConversionToolsSEOContent() {
  const tools = getToolsByCategory()["conversion-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "media-converter")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("conversion-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          File Conversion Tools - Media, Ebooks, Fonts, OCR & More
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Format friction is constant: a video that will not play, an EPUB your reader rejects, a font in the wrong web format, a scanned page you need as editable text. Toolspy&apos;s {tools.length} conversion tools bridge those gaps - media (video/audio/GIF), ebooks (EPUB/MOBI/PDF/DOCX), fonts (TTF/OTF/WOFF/WOFF2), OCR text extraction in 12+ languages, Markdown conversion, plus YouTube thumbnail and embed utilities.
            </p>
            <p>
              Conversions run in your browser wherever the format allows, with batch support - free and signup-free like everything on Toolspy.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="File conversion tools - media converter, ebook converter, font converter, OCR text extraction"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Tools grid (global card design) */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Tools in this category</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Conversion map</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">From format to format</CardTitle>
            <CardDescription>The most common conversions these tools handle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">You Have</th>
                    <th className="text-left p-3 font-medium">You Need</th>
                    <th className="text-left p-3 font-medium">Tool</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Video/audio in the wrong format", "MP4, MP3, GIF, WebM", "Media Converter"],
                    ["Ebook your device rejects", "EPUB, MOBI, PDF, DOCX", "E-book Converter"],
                    ["Desktop font for a website", "WOFF/WOFF2 web fonts", "Font Converter"],
                    ["Scanned page or photo of text", "Editable, copyable text", "OCR Text Extractor"],
                    ["Markdown notes", "HTML, PDF, Word", "Markdown to Docs Converter"],
                    ["A YouTube video", "Max-res thumbnail / responsive embed code", "Thumbnail Downloader / Embed Generator"],
                    ["A public profile picture", "Full-size image", "Instagram DP Viewer / Facebook Image Downloader"]
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Where conversions come up</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Publishing on the web</h4>
              <p className="text-sm text-muted-foreground">Convert fonts to WOFF2 for performance, videos to web-friendly MP4/WebM, and Markdown drafts to clean HTML.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Reading on your terms</h4>
              <p className="text-sm text-muted-foreground">Move ebooks between EPUB, MOBI, and PDF so they open on whatever reader you actually use.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Digitizing documents</h4>
              <p className="text-sm text-muted-foreground">OCR scanned certificates, receipts, and book pages into editable text - 12+ languages supported.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Content creation</h4>
              <p className="text-sm text-muted-foreground">Grab max-resolution YouTube thumbnails for analysis or covers, and generate responsive embed codes that do not break layouts.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to convert (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Upload the source</h4>
              <p className="text-sm text-muted-foreground">Drop in the file (or paste the URL for YouTube utilities).</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Pick the target format</h4>
              <p className="text-sm text-muted-foreground">Choose output format and options - quality, size, or language for OCR.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Download</h4>
              <p className="text-sm text-muted-foreground">Single files download directly; batches arrive as a ZIP.</p>
            </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={categoryFaqs()} />
      </section>

      {/* Note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          Convert only files you have the right to use. Downloader tools work with publicly accessible content only.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            Disclaimer
          </Link>
        </p>
      </section>
    </article>
  );
}

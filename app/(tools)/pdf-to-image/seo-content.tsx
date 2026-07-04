/**
 * Server-only SEO content for this tool page.
 * No "use client" - all markup is server-rendered so view-source and crawlers see full HTML.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import {
  CheckCircle,
  Rocket,
  FileImage,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Gauge,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfToImageSEOContent() {
  const tool = getToolBySlug("pdf-to-image");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const formatPicker = [
    {
      format: "JPG",
      bestFor: "Photos, social sharing, chat",
      notes: "Small files. Fine for mixed content. Lossy compression.",
    },
    {
      format: "PNG",
      bestFor: "Text-heavy pages, screenshots",
      notes: "Sharp edges. Larger than JPG. Supports transparency.",
    },
    {
      format: "WebP",
      bestFor: "Web embeds",
      notes: "Smaller than both JPG and PNG at similar quality. Modern browsers.",
    },
  ];

  const dpiTargets = [
    { use: "Social / chat / slides", dpi: "96 DPI", note: "Screen-quality, small file size." },
    { use: "Web use or email", dpi: "150 DPI", note: "Good readability, reasonable size." },
    { use: "Print / archiving", dpi: "300 DPI", note: "Print-quality but larger files." },
  ];

  const featureChecklist = [
    { feature: "Export each page as an image", value: "Yes", note: "One image per page." },
    { feature: "Choose output format", value: "Yes", note: "JPG, PNG, or WebP." },
    { feature: "Set DPI / resolution", value: "Yes", note: "96 for screen, 300 for print." },
    { feature: "Pick page range", value: "Yes", note: "Extract only the pages you need." },
    { feature: "Batch download", value: "Yes", note: "All images arrive in a single ZIP." },
    { feature: "Preserve transparency (PNG / WebP)", value: "Yes", note: "Useful for overlays and mockups." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Using JPG for text-heavy pages",
      body: "JPG blurs crisp text. Use PNG or WebP for pages with small fonts or diagrams.",
    },
    {
      title: "Exporting every page at 300 DPI",
      body: "Print-DPI for a long PDF creates huge files. Use 96–150 DPI unless you actually need print quality.",
    },
    {
      title: "Expecting editable text",
      body: "PDF → image produces pictures, not text. If you need to edit the content, use PDF to Word instead.",
    },
    {
      title: "Sharing via email at full quality",
      body: "Inboxes dislike heavy attachments. Trim DPI and page range, or run a compressor afterward.",
    },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            PDF to Image Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF to image converter - convert PDF to JPG, PNG, or WebP. Export each
            page as an image, pick a DPI, and download in the browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF to image converter to turn each page into its own JPG, PNG, or WebP.
              Pick a DPI (96 for screen, 150 for web, 300 for print), choose the page range you
              need, and download the results as a ZIP.
            </p>
            <p>
              Useful for sharing a single page on chat, embedding pages on a blog, making slide
              thumbnails, or previewing a PDF where a viewer isn’t installed. Works with
              multi-page PDFs and single-page documents alike.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF to image - pick format and DPI, download each page as an image"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Related Tools */}
      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="pdf-to-image"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with image export."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert a PDF to images"
          lead="Four steps to ready-to-share images."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PDF into the tool.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick format</h3>
            <p className="text-sm text-muted-foreground">
              JPG, PNG, or WebP - based on where the images will be used.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Choose DPI</h3>
            <p className="text-sm text-muted-foreground">
              96 for screen, 150 for web/email, 300 for print.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save individual images or the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Format guide */}
      <section className="space-y-6" id="format-guide">
        <SectionHeader
          eyebrow="Output"
          icon={FileImage}
          title="Which output format to pick"
          lead="Match the format to where the image will live."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Format</th>
                    <th className="text-left p-3 font-medium">Best for</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {formatPicker.map((f) => (
                    <tr key={f.format} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{f.format}</td>
                      <td className="p-3 text-muted-foreground">{f.bestFor}</td>
                      <td className="p-3 text-muted-foreground">{f.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DPI guide */}
      <section className="space-y-6" id="dpi">
        <SectionHeader
          eyebrow="Resolution"
          icon={Gauge}
          title="Which DPI to pick"
          lead="Higher isn’t always better."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use</th>
                    <th className="text-left p-3 font-medium">DPI</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {dpiTargets.map((d) => (
                    <tr key={d.use} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{d.use}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {d.dpi}
                      </td>
                      <td className="p-3 text-muted-foreground">{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pitfalls.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader
          eyebrow="Overview"
          icon={ListChecks}
          title="What this tool supports"
        />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what the PDF to image converter does.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Supported</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {featureChecklist.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="inline-flex items-center gap-2">
                          <span>{row.value}</span>
                          {row.value === "Yes" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Related PDF tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Need editable text instead of images?{" "}
            <Link href="/pdf-to-word" className="underline underline-offset-4 text-foreground">
              PDF to Word
            </Link>
            .
          </p>
          <p>
            Want to combine images back into a PDF?{" "}
            <Link href="/pdf-converter" className="underline underline-offset-4 text-foreground">
              PDF converter
            </Link>{" "}
            (Image → PDF).
          </p>
          <p>
            Trim the output images further:{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfToImageFAQs()} />

      {/* User reviews */}
      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />
        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.ratingValue}/5
            </span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.reviewCount}
            </span>{" "}
            review(s).
          </p>
        ) : (
          <p className="text-center text-muted-foreground">
            No reviews yet. If you used the tool, you can share feedback on our{" "}
            <Link className="underline underline-offset-4" href="/feedback">
              feedback page
            </Link>
            .
          </p>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, 6).map((r, idx) => (
              <Card key={idx} className="p-5">
                <div className="space-y-1">
                  <p className="font-semibold">{r.headline}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.authorName} • {r.datePublished} • {r.ratingValue}/5
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {r.reviewBody}
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert PDF to images?</h2>
          <p className="text-muted-foreground">
            Upload a PDF, pick format and DPI, and download each page as an image.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfToImageFAQs() {
  return [
    {
      question: "Is the PDF to image converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Which image formats can I export?",
      answer:
        "JPG, PNG, and WebP. Pick JPG for photos, PNG for text-heavy pages, and WebP for small modern web images.",
    },
    {
      question: "What DPI should I use?",
      answer:
        "96 DPI for on-screen or chat use, 150 DPI for blog or email, 300 DPI for print or archiving. Higher DPI means bigger files.",
    },
    {
      question: "Can I convert only some pages?",
      answer:
        "Yes. Enter a page range (for example, 1-3, 5) to export just those pages as images.",
    },
    {
      question: "Will text be editable in the output?",
      answer:
        "No - the result is a picture, not editable text. For editable text, use PDF to Word or PDF to Excel depending on the content.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-to-image", getPdfToImageFAQs);

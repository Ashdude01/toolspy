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
  Repeat,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  FileText,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfConverterSEOContent() {
  const tool = getToolBySlug("pdf-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const popularConversions = [
    { from: "PDF", to: "Word", note: "Edit text in Word, keep layout close to original." },
    { from: "PDF", to: "JPG / PNG", note: "Extract each page as an image." },
    { from: "PDF", to: "Excel", note: "Pull tabular data into spreadsheets." },
    { from: "PDF", to: "CSV", note: "Flat CSV for further data processing." },
    { from: "Image", to: "PDF", note: "Combine JPG / PNG / HEIC into one PDF." },
    { from: "HEIC", to: "PDF", note: "iPhone photos into a shareable PDF." },
  ];

  const featureChecklist = [
    { feature: "PDF ↔ Word / Excel / CSV", value: "Yes", note: "Editable outputs, keeps basic formatting." },
    { feature: "PDF → Images (JPG / PNG)", value: "Yes", note: "One image per page, chosen format." },
    { feature: "Images → PDF", value: "Yes", note: "Combine multiple images into a single PDF." },
    { feature: "HEIC / JFIF input", value: "Yes", note: "iPhone and Windows photo formats supported." },
    { feature: "Batch processing", value: "Yes", note: "Queue multiple files, download as ZIP." },
    { feature: "Keep original layout", value: "Yes", note: "Text + image positions preserved where possible." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Expecting pixel-perfect Word output",
      body: "Complex PDFs with columns, tables, and inline images rarely round-trip perfectly. Treat the result as editable base, not the final copy.",
    },
    {
      title: "Converting scanned PDFs without OCR",
      body: "A scanned PDF is an image inside a PDF. Use an OCR tool first, then convert, if you need the text.",
    },
    {
      title: "Using JPG for text-heavy pages",
      body: "JPG blurs crisp text. For pages with lots of text, convert to PNG or keep the PDF.",
    },
    {
      title: "Ignoring file size after conversion",
      body: "PDF → image conversions can balloon the size. Run the compressor afterward if you plan to email or upload.",
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
            PDF Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF converter for PDF to Word, PDF to JPG, PDF to Excel and more - and
            back again from images to PDF. Runs in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF converter to move between PDF and editable formats: convert PDF to
              Word, PDF to JPG, PDF to Excel, PDF to CSV, or combine images into a PDF. Drop a
              single file or a batch - the tool returns each output ready to download.
            </p>
            <p>
              Layout and inline images are preserved where possible, and the converter accepts
              HEIC and JFIF on input so iPhone and Windows files work without an extra step.
              Useful for quick edits, forms, receipts, and content cleanup before you share or
              archive.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF converter - upload a file, pick the target format, and download the result"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert a PDF"
          lead="Four steps, no setup."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PDF, or images (JPG / PNG / HEIC / JFIF) if you’re building a PDF.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick target</h3>
            <p className="text-sm text-muted-foreground">
              Word, Excel, CSV, JPG, PNG, or PDF (from images).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Configure</h3>
            <p className="text-sm text-muted-foreground">
              Page range, image format, or merge order - as needed.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Grab single files or the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Popular conversions */}
      <section className="space-y-6" id="conversions">
        <SectionHeader
          eyebrow="Popular"
          icon={Repeat}
          title="Common PDF conversions"
          lead="The most-searched PDF workflows - all handled here."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularConversions.map((c) => (
            <Card key={`${c.from}-${c.to}`} className="p-5">
              <div className="flex items-center gap-2 font-semibold">
                <span>{c.from}</span>
                <span className="text-muted-foreground">→</span>
                <span>{c.to}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{c.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Which target format to pick */}
      <section className="space-y-4" id="pick-format">
        <SectionHeader
          icon={FileText}
          title="Which output format should you pick?"
          eyebrow="Guide"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">Word</strong> when you want to edit text or
            reflow paragraphs. <strong className="text-foreground">Excel or CSV</strong> when the
            PDF contains tables you need to analyse.
          </p>
          <p>
            <strong className="text-foreground">JPG or PNG</strong> when the goal is to share a
            page as an image (social, chat, slides).{" "}
            <strong className="text-foreground">PDF from images</strong> when you need a single,
            shareable document from photos or scans.
          </p>
        </div>
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
              A factual summary of what the PDF converter does.
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
        <SectionHeader title="Need a specific PDF task?" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Combine multiple PDFs:{" "}
            <Link href="/merge-pdf" className="underline underline-offset-4 text-foreground">
              Merge PDF
            </Link>
            .
          </p>
          <p>
            Shrink a large PDF:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
          <p>
            Split pages:{" "}
            <Link href="/split-pdf" className="underline underline-offset-4 text-foreground">
              Split PDF
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert your PDF?</h2>
          <p className="text-muted-foreground">
            Upload a file, pick the target format, and download the result in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfConverterFAQs() {
  return [
    {
      question: "Is the PDF converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Which formats can I convert between?",
      answer:
        "PDF to Word, PDF to JPG, PDF to Excel, PDF to CSV, and images (JPG, PNG, HEIC, JFIF) to PDF. Additional PDF tools cover merging, splitting, and compression.",
    },
    {
      question: "Will the converted Word file look exactly like the PDF?",
      answer:
        "For most text-based PDFs, yes. PDFs with complex layouts, multiple columns, or many inline images rarely round-trip perfectly - treat the output as an editable base.",
    },
    {
      question: "Can I extract tables from a PDF?",
      answer:
        "Yes. Choose Excel or CSV as the output to extract tabular data. Results depend on how cleanly the tables were structured in the source PDF.",
    },
    {
      question: "Can I combine images into a single PDF?",
      answer:
        "Yes. Upload multiple images (JPG, PNG, HEIC, JFIF), arrange them in order, and export a single PDF.",
    },
    {
      question: "Does the tool upload my files to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-converter", getPdfConverterFAQs);

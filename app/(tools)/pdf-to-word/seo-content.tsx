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
  FileEdit,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  FileText,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfToWordSEOContent() {
  const tool = getToolBySlug("pdf-to-word");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const worksWellFor = [
    {
      title: "Text-based PDFs",
      body: "Exports, reports, articles, and letters exported from Word, Google Docs, or similar.",
    },
    {
      title: "Simple layouts",
      body: "Single-column pages with headings, paragraphs, and inline images.",
    },
    {
      title: "Editable copies",
      body: "When you want to tweak wording, fix a typo, or update a section.",
    },
    {
      title: "Forms & CVs",
      body: "Most CVs and form letters convert cleanly and are easy to edit.",
    },
  ];

  const tricky = [
    {
      title: "Scanned pages",
      body: "A scanned PDF is an image. Without OCR, you get an image embedded in a Word doc - not editable text.",
    },
    {
      title: "Complex columns",
      body: "Multi-column magazines and dense layouts often reflow. Expect to clean up.",
    },
    {
      title: "Heavy tables",
      body: "Large multi-page tables can split across Word pages awkwardly. Convert to Excel for data work.",
    },
    {
      title: "Custom fonts",
      body: "If the PDF embeds a non-standard font, Word may substitute a similar-looking one.",
    },
  ];

  const featureChecklist = [
    { feature: "Convert PDF to DOCX", value: "Yes", note: "Opens natively in Microsoft Word and Google Docs." },
    { feature: "Preserve text formatting", value: "Yes", note: "Headings, bold/italic, lists, and colours carried over." },
    { feature: "Inline images", value: "Yes", note: "Kept at their position on each page." },
    { feature: "Basic tables", value: "Yes", note: "Simple tables round-trip reasonably well." },
    { feature: "Batch convert", value: "Yes", note: "Queue several PDFs and download as ZIP." },
    { feature: "Editable output", value: "Yes", note: "Output is a real DOCX - not an image wrapped in a doc." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            PDF to Word Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF to Word converter. Turn a PDF into an editable DOCX for Microsoft
            Word or Google Docs - works in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF to Word converter to convert PDF to DOCX, keeping paragraphs,
              headings, lists, and inline images in place. Ideal for quick edits, proofreading,
              or repurposing a PDF into a fresh draft.
            </p>
            <p>
              Works for single files or batches. Output opens natively in Word and Google Docs.
              For scanned documents, run OCR first so you get real text instead of an embedded
              image.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF to Word converter - upload a PDF and download an editable DOCX"
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
          currentToolSlug="pdf-to-word"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with editing."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert PDF to Word"
          lead="Three steps to an editable DOCX."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PDF (or several) to queue them for conversion.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Convert</h3>
            <p className="text-sm text-muted-foreground">
              The tool builds a DOCX, preserving layout where possible.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save each DOCX individually, or grab the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Works well for */}
      <section className="space-y-6" id="works-well">
        <SectionHeader
          eyebrow="Best fit"
          icon={FileEdit}
          title="Where PDF to Word works well"
          lead="Scenarios with the cleanest conversion."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worksWellFor.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tricky cases */}
      <section className="space-y-6" id="tricky">
        <SectionHeader
          eyebrow="Heads up"
          icon={Lightbulb}
          title="When to expect cleanup"
          lead="Cases where the PDF → Word output needs a quick review."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tricky.map((p) => (
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
              A factual summary of what the PDF to Word converter does.
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
        <SectionHeader icon={FileText} title="Related PDF tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Need tables as spreadsheets instead of Word?{" "}
            <Link href="/pdf-to-excel" className="underline underline-offset-4 text-foreground">
              PDF to Excel
            </Link>{" "}
            or{" "}
            <Link href="/pdf-to-csv" className="underline underline-offset-4 text-foreground">
              PDF to CSV
            </Link>
            .
          </p>
          <p>
            Need pages as images?{" "}
            <Link href="/pdf-to-image" className="underline underline-offset-4 text-foreground">
              PDF to Image
            </Link>
            .
          </p>
          <p>
            Shrink the PDF before converting:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfToWordFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert PDF to Word?</h2>
          <p className="text-muted-foreground">
            Upload your PDF and download an editable DOCX - ready to open in Word or Google
            Docs.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfToWordFAQs() {
  return [
    {
      question: "Is the PDF to Word converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Will the converted Word file match the PDF exactly?",
      answer:
        "For text-based PDFs with simple layouts, yes - paragraphs, headings, lists, and inline images are preserved. Complex multi-column layouts, custom fonts, and heavy tables may need manual cleanup.",
    },
    {
      question: "Can I convert a scanned PDF to Word?",
      answer:
        "You’ll need OCR first. Without it, the converter produces a Word file with the scanned page as an image inside - not editable text. Run OCR, then convert.",
    },
    {
      question: "What file type do I get?",
      answer:
        "A standard DOCX file that opens natively in Microsoft Word, Google Docs, LibreOffice, and Pages.",
    },
    {
      question: "Can I convert multiple PDFs at once?",
      answer:
        "Yes. Upload several files and download each DOCX or the full set as a ZIP.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-to-word", getPdfToWordFAQs);

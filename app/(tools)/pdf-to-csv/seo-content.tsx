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
  Database,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Table2,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfToCsvSEOContent() {
  const tool = getToolBySlug("pdf-to-csv");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Feed data into a script",
      body: "Pandas, R, Google Sheets imports, SQL loaders - they all speak CSV first.",
    },
    {
      title: "Bulk upload to dashboards",
      body: "CRMs, analytics tools, and e-commerce platforms accept CSV for bulk imports.",
    },
    {
      title: "Invoices & receipts to bookkeeping",
      body: "Line items as rows - easy to total, categorize, and pass to your accountant.",
    },
    {
      title: "Lightweight, diffable archives",
      body: "CSV files are small, plain text, and version control friendly.",
    },
  ];

  const featureChecklist = [
    { feature: "Convert PDF to CSV", value: "Yes", note: "One CSV per table / sheet when detected." },
    { feature: "UTF-8 encoded output", value: "Yes", note: "Handles international characters cleanly." },
    { feature: "Comma, semicolon, or tab", value: "Yes", note: "Pick the delimiter your downstream tool expects." },
    { feature: "Pick pages", value: "Yes", note: "Extract only the pages with tables." },
    { feature: "Batch convert", value: "Yes", note: "Queue several PDFs, download as ZIP." },
    { feature: "Strip headers / footers", value: "Yes", note: "Optional - cleaner rows for data tools." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Commas inside cells",
      body: "Values with commas need quoting - CSV handles it, but some tools misread. Use a tab or semicolon delimiter if your data has many commas.",
    },
    {
      title: "Merged header rows",
      body: "Multi-row headers flatten to one line in CSV. Review the first row before loading into a script.",
    },
    {
      title: "Scanned PDFs",
      body: "Without OCR, a scanned table is just pixels. Run OCR first, then convert.",
    },
    {
      title: "Number formatting",
      body: "Currency symbols and thousands separators stay as text. Strip them in your target tool or with a regex.",
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
            PDF to CSV Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF to CSV converter. Extract tabular data from a PDF into a clean
            CSV file - ready for scripts, dashboards, and spreadsheets. In your browser, no
            signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF to CSV converter to pull tables from a PDF into plain text rows and
              columns. Each detected table can be saved as its own CSV, with the delimiter and
              encoding your tool expects. Useful for bookkeeping, data pipelines, and bulk
              uploads.
            </p>
            <p>
              Convert one PDF or a batch. Strip headers and footers, pick specific pages, and
              choose comma, semicolon, or tab as the separator. Output is UTF-8 and opens in
              Excel, Sheets, Numbers, or any text editor.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF to CSV - pick delimiter and pages, download CSV rows ready for any tool"
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
          currentToolSlug="pdf-to-csv"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with data extraction."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert PDF to CSV"
          lead="Four steps to ready-to-load data."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PDF that contains tabular data.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick pages</h3>
            <p className="text-sm text-muted-foreground">
              All pages, or only the ones with the tables you need.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Choose delimiter</h3>
            <p className="text-sm text-muted-foreground">
              Comma, semicolon, or tab - match your downstream tool.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save CSVs individually or grab the batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={Database}
          title="Typical reasons to convert PDF to CSV"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
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
              A factual summary of what the PDF to CSV converter does.
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
        <SectionHeader icon={Table2} title="Related PDF tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Prefer a full spreadsheet with formatting?{" "}
            <Link href="/pdf-to-excel" className="underline underline-offset-4 text-foreground">
              PDF to Excel
            </Link>
            .
          </p>
          <p>
            Need editable prose instead of cells?{" "}
            <Link href="/pdf-to-word" className="underline underline-offset-4 text-foreground">
              PDF to Word
            </Link>
            .
          </p>
          <p>
            Want to keep it a PDF but smaller?{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfToCsvFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to extract data?</h2>
          <p className="text-muted-foreground">
            Upload a PDF, pick your delimiter, and download clean CSV rows in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfToCsvFAQs() {
  return [
    {
      question: "Is the PDF to CSV converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Which delimiters can I pick?",
      answer:
        "Comma (standard CSV), semicolon (common in many European locales), and tab (TSV). Pick whichever your downstream tool expects.",
    },
    {
      question: "Can I convert a scanned PDF?",
      answer:
        "Not directly. Run OCR on the scan first so the PDF contains real text, then convert to CSV.",
    },
    {
      question: "Is the encoding UTF-8?",
      answer:
        "Yes. Output is UTF-8 so international characters, accents, and symbols round-trip correctly.",
    },
    {
      question: "Can I extract only some pages?",
      answer:
        "Yes. Set a page range to extract tables only from the pages that matter, which keeps the CSV lean.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-to-csv", getPdfToCsvFAQs);

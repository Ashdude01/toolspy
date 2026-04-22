/**
 * Server-only SEO content for this tool page.
 * No "use client" — all markup is server-rendered so view-source and crawlers see full HTML.
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
  Table2,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Sheet,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfToExcelSEOContent() {
  const tool = getToolBySlug("pdf-to-excel");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const worksWellFor = [
    { title: "Bank statements", body: "Most exported bank PDFs have clean, predictable tables — usually round-trip well." },
    { title: "Invoices & receipts", body: "Line items, totals, and dates end up in their own cells." },
    { title: "Exported reports", body: "Reports saved directly from a spreadsheet tool tend to convert cleanly." },
    { title: "Simple rows & columns", body: "Straightforward tables with clear borders are the best case." },
  ];

  const tricky = [
    {
      title: "Scanned PDFs",
      body: "A scanned table is an image, not data. Run OCR first, then convert.",
    },
    {
      title: "Merged cells and split headers",
      body: "Merged header rows often land in one cell in Excel. Expect a quick cleanup.",
    },
    {
      title: "Multi-page tables",
      body: "Tables that span pages sometimes break at the page edge. Stitch them together in Excel if needed.",
    },
    {
      title: "Notes / footnotes in tables",
      body: "Small annotations near a table may get pulled into the wrong cell.",
    },
  ];

  const featureChecklist = [
    { feature: "Convert PDF to XLSX", value: "Yes", note: "Opens in Excel, Google Sheets, Numbers, LibreOffice." },
    { feature: "Multiple sheets", value: "Yes", note: "Each PDF page can land on its own sheet when helpful." },
    { feature: "Preserve number formats", value: "Yes", note: "Currencies, percentages, and dates kept where detected." },
    { feature: "Batch convert", value: "Yes", note: "Queue several PDFs and download as ZIP." },
    { feature: "Pick pages", value: "Yes", note: "Convert only the pages that contain the tables you need." },
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
            PDF to Excel Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF to Excel converter. Extract tables from a PDF into an editable
            XLSX spreadsheet — works in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF to Excel converter to pull tabular data out of a PDF into an XLSX
              file you can sort, filter, and calculate with. Ideal for bank statements,
              invoices, receipts, and reports where you need numbers in their own cells.
            </p>
            <p>
              Works for single files or a batch. Pick only the pages with tables if the document
              is long, and let the tool lay out each table as a sheet. Output opens natively in
              Excel, Google Sheets, Numbers, and LibreOffice Calc.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF to Excel — select pages, convert tables into editable XLSX"
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
          currentToolSlug="pdf-to-excel"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with data extraction."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert PDF to Excel"
          lead="Four steps to a usable spreadsheet."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PDF with tabular data.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick pages</h3>
            <p className="text-sm text-muted-foreground">
              Use all, or only the pages that contain tables.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Convert</h3>
            <p className="text-sm text-muted-foreground">
              The tool detects tables and lays them out in an XLSX.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the XLSX or the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Works well for */}
      <section className="space-y-6" id="works-well">
        <SectionHeader
          eyebrow="Best fit"
          icon={Table2}
          title="Where PDF to Excel works well"
          lead="PDFs with the cleanest conversion to cells."
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

      {/* Tricky */}
      <section className="space-y-6" id="tricky">
        <SectionHeader
          eyebrow="Heads up"
          icon={Lightbulb}
          title="When to expect cleanup"
          lead="Cases that often need manual tweaks after conversion."
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
              A factual summary of what the PDF to Excel converter does.
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
        <SectionHeader icon={Sheet} title="Related PDF tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Prefer plain CSV?{" "}
            <Link href="/pdf-to-csv" className="underline underline-offset-4 text-foreground">
              PDF to CSV
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
            Just images of each page?{" "}
            <Link href="/pdf-to-image" className="underline underline-offset-4 text-foreground">
              PDF to Image
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfToExcelFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to extract tables?</h2>
          <p className="text-muted-foreground">
            Upload a PDF and download an editable Excel workbook in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfToExcelFAQs() {
  return [
    {
      question: "Is the PDF to Excel converter free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "Will all my tables come through correctly?",
      answer:
        "Most clean tables (bank statements, invoices, exports) convert well. Merged cells, multi-page tables, and complex layouts may need quick cleanup in Excel.",
    },
    {
      question: "Can I convert a scanned PDF?",
      answer:
        "Not directly — a scan is an image. Run OCR first so the PDF contains text, then convert.",
    },
    {
      question: "What file format do I get?",
      answer:
        "A standard XLSX file that opens in Microsoft Excel, Google Sheets, LibreOffice Calc, and Apple Numbers.",
    },
    {
      question: "Can I convert specific pages only?",
      answer:
        "Yes. Set a page range to extract tables only from the pages that matter, which also keeps the output compact.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-to-excel", getPdfToExcelFAQs);

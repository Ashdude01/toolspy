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
  Scissors,
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

export function SplitPdfSEOContent() {
  const tool = getToolBySlug("split-pdf");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const splitModes = [
    {
      name: "By page range",
      description: "Extract specific pages or ranges - e.g. 1-3, 5, 8-10 - into one output PDF.",
    },
    {
      name: "By every N pages",
      description: "Cut the PDF into chunks of equal size: every 1, 5, 10, or 25 pages.",
    },
    {
      name: "Split each page",
      description: "Turn every page into its own single-page PDF file.",
    },
    {
      name: "Split at bookmarks",
      description: "Use the PDF’s bookmarks as split points - handy for chaptered documents.",
    },
  ];

  const featureChecklist = [
    { feature: "Extract specific page ranges", value: "Yes", note: "Comma-separated ranges like 1-3, 5, 8-10." },
    { feature: "Split every N pages", value: "Yes", note: "Quick chunks of equal size." },
    { feature: "Each page as its own PDF", value: "Yes", note: "One-page-per-file export." },
    { feature: "Preview pages before splitting", value: "Yes", note: "Confirm which pages go where." },
    { feature: "Output as ZIP", value: "Yes", note: "All split files delivered together." },
    { feature: "Preserve text & links", value: "Yes", note: "Each output keeps its text layer." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Forgetting ranges are inclusive",
      body: "A range like 1-3 includes pages 1, 2, and 3. Double-check to avoid missing a page.",
    },
    {
      title: "Splitting a scanned PDF and expecting text",
      body: "Each split file keeps only what the original PDF contains. Scans without OCR still won’t have searchable text after splitting.",
    },
    {
      title: "Forgetting the single-page extract",
      body: "If you only need page 7, there’s no need to split the whole PDF - use a single range like 7 and download that one page.",
    },
    {
      title: "Losing bookmarks",
      body: "Bookmarks that point into removed pages won’t carry over. Split at bookmarks mode preserves structure for chaptered docs.",
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
            Split PDF Files
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online split PDF tool. Extract pages, divide a PDF into chunks, or separate
            every page into its own file - all in the browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this split PDF tool to extract pages from a PDF, divide a large document into
              smaller parts, or turn each page into a standalone file. Pick a mode, preview your
              selection, and download the outputs - either individually or as a single ZIP.
            </p>
            <p>
              Useful when a form asks for a specific page, when a report needs to be chunked by
              chapter, or when every invoice in a batch should live in its own file. Text and
              internal links are preserved in each split output.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Split PDF - preview pages, choose a split mode, and download the output files"
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
          title="How to split a PDF"
          lead="Four steps to the pages you need."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop the PDF you want to split into pieces.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick a mode</h3>
            <p className="text-sm text-muted-foreground">
              Range, every N pages, per-page, or at bookmarks.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Preview</h3>
            <p className="text-sm text-muted-foreground">
              Confirm which pages belong to each output file.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save each output or grab the whole set as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Split modes */}
      <section className="space-y-6" id="modes">
        <SectionHeader
          eyebrow="Modes"
          icon={Scissors}
          title="Ways to split a PDF"
          lead="Pick the mode that matches your goal."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {splitModes.map((m) => (
            <Card key={m.name} className="p-5">
              <h3 className="font-semibold mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Extract specific pages */}
      <section className="space-y-4" id="extract-range">
        <SectionHeader
          eyebrow="Extract pages"
          icon={FileText}
          title="Extract specific pages with a range"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the page range input to pull out exactly the pages you need. Separate ranges
            with commas, and use a dash for inclusive ranges.
          </p>
          <p className="text-sm">
            Example:{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">1-3, 5, 8-10</code> keeps
            pages 1, 2, 3, 5, 8, 9, and 10 in the output.
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
              A factual summary of what the split PDF tool does.
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
            Re-assemble split files into one document:{" "}
            <Link href="/merge-pdf" className="underline underline-offset-4 text-foreground">
              merge PDF
            </Link>
            .
          </p>
          <p>
            Shrink the split outputs before sharing:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
          <p>
            Convert split pages to images or Word:{" "}
            <Link href="/pdf-converter" className="underline underline-offset-4 text-foreground">
              PDF converter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getSplitPdfFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to split your PDF?</h2>
          <p className="text-muted-foreground">
            Upload your PDF, pick a split mode, preview the pages, and download the outputs.
          </p>
          <ScrollToTopButton>Start Splitting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getSplitPdfFAQs() {
  return [
    {
      question: "Is the split PDF tool free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Can I extract just one page?",
      answer:
        "Yes. Enter the single page number (for example, 7) as the range and download that one page as its own PDF.",
    },
    {
      question: "How do I split a PDF into equal parts?",
      answer:
        "Choose the ‘Split every N pages’ mode and enter a chunk size (for example, every 5 or 10 pages). The tool generates one PDF per chunk.",
    },
    {
      question: "What’s the best way to separate a book into chapters?",
      answer:
        "Use ‘Split at bookmarks’ if the PDF has them. Otherwise, use a page-range list based on your table of contents.",
    },
    {
      question: "Will the split files keep text searchable?",
      answer:
        "Yes. Each output preserves the original PDF’s text layer and internal links.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Splitting runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("split-pdf", getSplitPdfFAQs);

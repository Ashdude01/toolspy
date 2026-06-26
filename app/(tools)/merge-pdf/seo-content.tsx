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
  Combine,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  GripVertical,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function MergePdfSEOContent() {
  const tool = getToolBySlug("merge-pdf");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    { title: "Combine scanned pages", body: "Merge each scanned sheet into one searchable PDF to email or archive." },
    { title: "Bundle invoices / receipts", body: "Join monthly bills into a single file for bookkeeping." },
    { title: "Assemble a report", body: "Put cover, chapters, and appendix PDFs together in the right order." },
    { title: "Merge contract pages", body: "Collect signed pages, NDAs, and attachments into one contract file." },
  ];

  const featureChecklist = [
    { feature: "Merge multiple PDFs", value: "Yes", note: "No upper limit for common use - order you pick is preserved." },
    { feature: "Drag to reorder files", value: "Yes", note: "Re-arrange visually before merging." },
    { feature: "Mix page ranges", value: "Yes", note: "Pick specific pages from each file." },
    { feature: "Preserve bookmarks & links", value: "Yes", note: "Internal links carry over where the PDF supports them." },
    { feature: "Output single PDF", value: "Yes", note: "One clean merged file, ready to share." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Forgetting to set order",
      body: "Files merge top-to-bottom of the list. Drag them into the exact sequence before clicking Merge.",
    },
    {
      title: "Mixing different page sizes",
      body: "Letter + A4 mixed in one PDF is fine for viewing, but some printers handle it oddly. Normalize sizes first if you plan to print.",
    },
    {
      title: "Huge merged file sizes",
      body: "Scanned PDFs can be heavy. Run the PDF compressor after merging to keep the final file manageable.",
    },
    {
      title: "Expecting edits during merge",
      body: "Merge only joins the files as-is. Edit each PDF first, then merge - or split the result and re-merge after edits.",
    },
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
            Merge PDF Files
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online merge PDF tool and PDF combiner. Drop your files, drag them into
            order, and combine PDFs into one document - no signup, no install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this merge PDF tool to join multiple PDFs into a single file. Drag each
              document into the order you want, optionally pick page ranges per file, and
              download a clean merged PDF in seconds. Ideal for reports, contracts, and
              scanned documents.
            </p>
            <p>
              Works entirely in your browser, handles dozens of files comfortably, and preserves
              bookmarks and internal links where the source PDFs allow. Pair it with the PDF
              compressor for a smaller final file before emailing or uploading.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Merge PDF - drag-to-reorder file list with a combine button and download output"
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
          currentToolSlug="merge-pdf"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with merging."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to merge PDF files"
          lead="Four steps to a single combined PDF."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop the PDF files you want to combine into one document.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Reorder</h3>
            <p className="text-sm text-muted-foreground">
              Drag the files into the exact sequence you want in the output.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Pick pages (optional)</h3>
            <p className="text-sm text-muted-foreground">
              Use all pages, or set a range per file to keep only what you need.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Merge &amp; download</h3>
            <p className="text-sm text-muted-foreground">
              Click Merge to build the combined PDF, then download.
            </p>
          </Card>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={Combine}
          title="Typical reasons to merge PDFs"
          lead="Common scenarios this tool covers."
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

      {/* Drag + ranges details */}
      <section className="space-y-4" id="reorder">
        <SectionHeader
          eyebrow="Control"
          icon={GripVertical}
          title="Drag to reorder and pick page ranges"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            The file list becomes your outline: drag each row up or down to set the exact order
            pages appear in the merged PDF. You can also specify a page range per file - for
            example,{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">1-3, 5</code> keeps pages 1
            through 3 and page 5 only.
          </p>
          <p>
            This is useful when you only need the signed page from a contract, or the summary
            section from a long report - no need to pre-split the file.
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
              A factual summary of what the merge PDF tool does.
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
            To shrink the final file size, try the{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
          <p>
            Need to break a merged PDF apart again? Use the{" "}
            <Link href="/split-pdf" className="underline underline-offset-4 text-foreground">
              split PDF tool
            </Link>
            .
          </p>
          <p>
            Need to change format (PDF to Word or images)? See the{" "}
            <Link href="/pdf-converter" className="underline underline-offset-4 text-foreground">
              PDF converter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getMergePdfFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to merge your PDFs?</h2>
          <p className="text-muted-foreground">
            Upload your files, drag them into order, and download one combined PDF.
          </p>
          <ScrollToTopButton>Start Merging →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getMergePdfFAQs() {
  return [
    {
      question: "Is the merge PDF tool free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How many PDFs can I merge at once?",
      answer:
        "There’s no hard limit for typical use. You can queue many files; very large batches may feel slower depending on your device.",
    },
    {
      question: "Can I choose the order of pages?",
      answer:
        "Yes. Drag each file in the list to set the order, and optionally pick a page range per file (for example, 1-3, 5).",
    },
    {
      question: "Does merging change the content of my PDFs?",
      answer:
        "No. The tool joins the files as-is. Bookmarks and internal links are preserved when the source PDF supports them.",
    },
    {
      question: "The merged PDF is large - what now?",
      answer:
        "Run the result through the PDF compressor. It keeps readable quality while cutting file size - useful before emailing or uploading.",
    },
    {
      question: "Does the tool upload my files to a server?",
      answer:
        "Merging runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("merge-pdf", getMergePdfFAQs);

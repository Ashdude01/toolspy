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
  Smartphone,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function HeicToPdfSEOContent() {
  const tool = getToolBySlug("heic-to-pdf");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    { title: "Share iPhone photos as a PDF", body: "Build one PDF from several HEIC images that recipients can open anywhere." },
    { title: "Attach to an email", body: "Most inboxes and clients handle PDFs better than HEIC files." },
    { title: "Submit a form", body: "Forms that require PDF uploads accept HEIC photos this way without re-saving as JPG first." },
    { title: "Print a photo bundle", body: "Arrange several photos in order and print them as one document." },
  ];

  const featureChecklist = [
    { feature: "Convert HEIC to PDF", value: "Yes", note: "One HEIC photo becomes a one-page PDF." },
    { feature: "Combine multiple HEIC into one PDF", value: "Yes", note: "Order them, merge into a single document." },
    { feature: "Drag to reorder", value: "Yes", note: "Re-arrange HEIC photos before building the PDF." },
    { feature: "Choose page size", value: "Yes", note: "A4, Letter, or match the photo dimensions." },
    { feature: "Orientation", value: "Yes", note: "Portrait or landscape per your source images." },
    { feature: "Preserve quality", value: "Yes", note: "Original HEIC image data is embedded without extra compression." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Massive file sizes",
      body: "HEIC photos are high resolution. A PDF with many photos can grow quickly - run it through the PDF compressor after building.",
    },
    {
      title: "Out-of-order pages",
      body: "iPhone sort order isn’t always chronological. Drag each photo into the exact order you want in the PDF.",
    },
    {
      title: "Mixing portrait and landscape",
      body: "Looks fine in a PDF viewer, but some printers handle mixed orientations oddly. Rotate or match orientation when printing.",
    },
    {
      title: "Expecting editable text",
      body: "Photos in a PDF are images. If you want the text from a photo, use an OCR tool first.",
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
            HEIC to PDF Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online HEIC to PDF converter. Turn iPhone HEIC photos into a shareable PDF
            document - one image or many - in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this HEIC to PDF converter to turn a single HEIC photo into a one-page PDF, or
              combine multiple HEIC images into a single multi-page PDF. Drag to reorder, pick
              page size and orientation, and download a ready-to-share document.
            </p>
            <p>
              Ideal when a form wants PDFs, an email client chokes on HEIC, or you need one
              clean document for a batch of iPhone photos. Everything runs in your browser -
              your photos are not uploaded to any server.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="HEIC to PDF - drop iPhone photos, reorder, and export a single PDF"
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
          currentToolSlug="heic-to-pdf"
          title="Similar Tools You Might Like"
          description="Other PDF and image converters that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert HEIC to PDF"
          lead="Four quick steps to one shareable PDF."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop one or many HEIC photos from your iPhone or device.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Reorder</h3>
            <p className="text-sm text-muted-foreground">
              Drag the thumbnails to set the exact page order.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Page settings</h3>
            <p className="text-sm text-muted-foreground">
              Pick page size (A4 / Letter / fit) and orientation.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Click Convert and save the generated PDF.
            </p>
          </Card>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="Why it helps"
          icon={Smartphone}
          title="Typical reasons to convert HEIC to PDF"
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

      {/* Combine multiple */}
      <section className="space-y-4" id="combine">
        <SectionHeader
          eyebrow="Multi-page"
          icon={Combine}
          title="Combine many HEIC photos into one PDF"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload several HEIC files in one go. Each photo becomes its own page in the output
            PDF, in the order you set via drag-and-drop. Works well for photo albums, document
            snapshots, and bundles you need to send as a single attachment.
          </p>
          <p>
            If the final PDF is too heavy for email, open it with the{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>{" "}
            to shrink the size before sending.
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
              A factual summary of what the HEIC to PDF converter does.
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
        <SectionHeader title="Related converters" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Prefer HEIC → JPG instead of PDF?{" "}
            <Link href="/image-converter" className="underline underline-offset-4 text-foreground">
              Image converter
            </Link>{" "}
            handles HEIC to JPG and other formats.
          </p>
          <p>
            Already have JFIF files?{" "}
            <Link href="/jfif-to-pdf" className="underline underline-offset-4 text-foreground">
              JFIF to PDF converter
            </Link>
            .
          </p>
          <p>
            Need to shrink the final PDF?{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getHeicToPdfFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert HEIC to PDF?</h2>
          <p className="text-muted-foreground">
            Upload your HEIC photos, set the order, and download one clean PDF in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getHeicToPdfFAQs() {
  return [
    {
      question: "Is the HEIC to PDF converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Can I combine multiple HEIC photos into one PDF?",
      answer:
        "Yes. Upload several HEIC files, drag them into the order you want, and the tool builds a single multi-page PDF with one photo per page.",
    },
    {
      question: "What page size and orientation does the PDF use?",
      answer:
        "Choose A4, Letter, or a fit-to-image size. Orientation can be portrait or landscape depending on your source photos.",
    },
    {
      question: "Will the image quality drop?",
      answer:
        "The tool embeds the original HEIC image without adding extra compression, so quality is preserved. PDFs can become large - use the PDF compressor if you need a smaller file.",
    },
    {
      question: "Why not just convert HEIC to JPG first?",
      answer:
        "You can - the image converter handles HEIC to JPG. Use HEIC to PDF when the end goal is a single document to share or upload, not individual photo files.",
    },
    {
      question: "Does the tool upload my photos to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("heic-to-pdf", getHeicToPdfFAQs);

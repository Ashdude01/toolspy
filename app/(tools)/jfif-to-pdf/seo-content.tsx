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
  Combine,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  HelpCircle,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function JfifToPdfSEOContent() {
  const tool = getToolBySlug("jfif-to-pdf");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    { title: "Form / job uploads", body: "Portals that reject .jfif but accept PDF — build one PDF and upload." },
    { title: "Bundle downloaded photos", body: "Combine .jfif images Windows saved from the web into a single shareable document." },
    { title: "Archive screenshots", body: "Keep browser screenshots (often saved as JFIF) as a compact PDF." },
    { title: "Email attachments", body: "PDF attachments open cleanly on every platform — no JFIF support issues." },
  ];

  const featureChecklist = [
    { feature: "Convert .jfif to PDF", value: "Yes", note: "One JFIF photo becomes a one-page PDF." },
    { feature: "Combine multiple JFIF", value: "Yes", note: "Merge several JFIF images into a single PDF." },
    { feature: "Drag to reorder", value: "Yes", note: "Arrange pages in the order you want." },
    { feature: "Page size", value: "Yes", note: "A4, Letter, or fit-to-image." },
    { feature: "Portrait / landscape", value: "Yes", note: "Per document orientation control." },
    { feature: "Preserve image quality", value: "Yes", note: "No extra re-compression applied by default." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Assuming quality will improve",
      body: "JFIF is JPEG image data. Wrapping it in a PDF doesn’t add detail — it only makes the file easier to share.",
    },
    {
      title: "Large bundle sizes",
      body: "Many JFIF photos in one PDF can get big. Run it through the PDF compressor if you need a smaller file.",
    },
    {
      title: "Wrong page order",
      body: "The tool uses the order you set — drag each thumbnail to sort before you generate the PDF.",
    },
    {
      title: "Expecting searchable text",
      body: "JFIF photos of documents stay as images. If you need searchable text, OCR the PDF after building it.",
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
            JFIF to PDF Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online JFIF to PDF converter. Turn one JFIF image — or several at once —
            into a clean, shareable PDF in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this JFIF to PDF converter to turn a single JFIF file into a one-page PDF, or
              combine multiple JFIF images into one multi-page document. Drag to reorder, pick
              page size and orientation, and download the result.
            </p>
            <p>
              Ideal when a form or email client won’t accept .jfif, when you want to archive
              downloaded photos together, or when you need a single shareable document. Quality
              is preserved — the JFIF image data is embedded as-is.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="JFIF to PDF — drop JFIF files, reorder, and export a single PDF document"
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
          currentToolSlug="jfif-to-pdf"
          title="Similar Tools You Might Like"
          description="Other converters that pair well with JFIF and PDF workflows."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert JFIF to PDF"
          lead="Four steps to a single shareable document."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop one or many .jfif files into the tool.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Reorder</h3>
            <p className="text-sm text-muted-foreground">
              Drag the thumbnails into the order you want in the PDF.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Page settings</h3>
            <p className="text-sm text-muted-foreground">
              Pick A4 / Letter / fit, and portrait or landscape.
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
          icon={Combine}
          title="Common reasons to convert JFIF to PDF"
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

      {/* What is JFIF */}
      <section className="space-y-4" id="what-is-jfif">
        <SectionHeader
          eyebrow="Quick background"
          icon={HelpCircle}
          title="What is a .jfif file?"
          lead="It’s JPEG image data with a different extension."
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            JFIF (JPEG File Interchange Format) is the same image data you’d find inside a
            regular JPEG. Windows and some browsers occasionally save images with a{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.jfif</code> extension
            instead of .jpg, which trips up apps that only look at the extension.
          </p>
          <p>
            Wrapping JFIF in a PDF sidesteps that — almost every app, email client, and platform
            opens PDFs without a fuss. If you only want JPG files instead, use the dedicated{" "}
            <Link href="/jfif-to-jpg" className="underline underline-offset-4 text-foreground">
              JFIF to JPG converter
            </Link>
            .
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
              A factual summary of what the JFIF to PDF converter does.
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
            Just want JPG files?{" "}
            <Link href="/jfif-to-jpg" className="underline underline-offset-4 text-foreground">
              JFIF to JPG converter
            </Link>
            .
          </p>
          <p>
            Have iPhone photos?{" "}
            <Link href="/heic-to-pdf" className="underline underline-offset-4 text-foreground">
              HEIC to PDF converter
            </Link>
            .
          </p>
          <p>
            Shrink the final PDF:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getJfifToPdfFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert JFIF to PDF?</h2>
          <p className="text-muted-foreground">
            Upload your JFIF files, set the order, and download one clean PDF.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getJfifToPdfFAQs() {
  return [
    {
      question: "Is the JFIF to PDF converter free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "Can I combine multiple JFIF images into one PDF?",
      answer:
        "Yes. Drop several JFIF files in together, drag them into the order you want, and the tool builds a single multi-page PDF.",
    },
    {
      question: "Is JFIF the same as JPEG?",
      answer:
        "The image data is the same. JFIF stores JPEG-encoded pixels but uses a .jfif extension that some apps don’t accept. Wrapping it in a PDF avoids that compatibility issue.",
    },
    {
      question: "Does the tool change image quality?",
      answer:
        "No. JFIF image data is embedded in the PDF without extra compression. Use the PDF compressor afterward if you need a smaller file.",
    },
    {
      question: "What page size and orientation does the PDF use?",
      answer:
        "Pick A4, Letter, or fit-to-image. Orientation can be portrait or landscape depending on your source files.",
    },
    {
      question: "Does the tool upload my files to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("jfif-to-pdf", getJfifToPdfFAQs);

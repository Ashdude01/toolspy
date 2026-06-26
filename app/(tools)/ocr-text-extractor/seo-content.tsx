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
  FileText,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function OCRTextExtractorSEOContent() {
  const tool = getToolBySlug("ocr-text-extractor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Scanned PDFs and photos",
      body: "Extract text from scans when you can’t copy/paste from the original document.",
    },
    {
      title: "Receipts and invoices",
      body: "Pull text to help with searching, indexing, or manual review.",
    },
    {
      title: "Notes and whiteboards",
      body: "Convert photographed notes into editable text.",
    },
    {
      title: "Searchable archives",
      body: "Make a collection of images more searchable by extracting text for indexing.",
    },
  ];

  const pitfalls = [
    {
      title: "Image quality matters",
      body: "Low resolution, blur, glare, and skewed angles reduce OCR accuracy. Use a clear scan where possible.",
    },
    {
      title: "Fonts and handwriting",
      body: "Stylized fonts and handwriting are harder to recognize than printed text.",
    },
    {
      title: "Language selection",
      body: "OCR works best when the selected language matches the document.",
    },
    {
      title: "Sensitive documents",
      body: "OCR may require processing your file to generate text output. Avoid uploading sensitive documents unless you trust the workflow for this tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Extract text from images", value: "Yes", note: "Great for scans and screenshots." },
    { feature: "Extract text from PDFs", value: "Yes", note: "Works best when pages are clear." },
    { feature: "Copyable results", value: "Yes", note: "Edit and copy the extracted text." },
    { feature: "Signup required", value: "No", note: "No account needed." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            OCR Text Extractor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Extract text from an image or PDF using OCR. Useful for scanned documents, receipts, and
            photos of notes when you need editable, copyable text.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              OCR (optical character recognition) converts pixels into text. The output depends on
              scan quality and layout - but for clean scans it can save a lot of manual typing.
            </p>
            <p>
              Need to convert images to a PDF first? Try{" "}
              <Link href="/image-to-pdf" className="underline underline-offset-4 text-foreground">
                image to PDF
              </Link>
              .
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="OCR text extractor - upload an image or PDF and get copyable text"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="ocr-text-extractor"
          title="Similar Tools You Might Like"
          description="Other tools for converting and working with documents."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to extract text with OCR"
          lead="Upload a clear file and review the output."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload an image or PDF</h3>
            <p className="text-sm text-muted-foreground">
              Clear scans produce better results than photos with glare.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose language (if available)</h3>
            <p className="text-sm text-muted-foreground">
              Match the document language for higher accuracy.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Copy and edit</h3>
            <p className="text-sm text-muted-foreground">
              Proofread and fix formatting (OCR isn’t perfect).
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="Use cases" icon={Sigma} title="Common uses" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((x) => (
            <Card key={x.title} className="p-5">
              <h3 className="font-semibold mb-1">{x.title}</h3>
              <p className="text-sm text-muted-foreground">{x.body}</p>
            </Card>
          ))}
        </div>
      </section>

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

      <section className="space-y-6" id="features">
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A factual summary of what the OCR tool does.</CardDescription>
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
                          {row.value === "Yes" && <CheckCircle className="h-4 w-4 text-green-500" />}
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

      <FAQ faqs={getOCRTextExtractorFAQs()} />

      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />
        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">{ratingSummary.ratingValue}/5</span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">{ratingSummary.reviewCount}</span>{" "}
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
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.reviewBody}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Need text from a scan?</h2>
          <p className="text-muted-foreground">
            Upload a clear image or PDF and extract editable text.
          </p>
          <ScrollToTopButton>Extract Text →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getOCRTextExtractorFAQs() {
  return [
    {
      question: "Why is OCR output inaccurate sometimes?",
      answer:
        "OCR accuracy depends on image quality, font style, language, and layout. Blurry photos, glare, and handwriting typically reduce accuracy.",
    },
    {
      question: "Can OCR extract text from PDFs?",
      answer:
        "Yes. OCR works best on scanned PDFs where text is embedded as pixels. If the PDF already contains selectable text, OCR may be unnecessary.",
    },
    {
      question: "Does the tool store uploaded files?",
      answer:
        "The tool processes your file to produce text output. Avoid uploading sensitive documents unless you trust the workflow for this tool.",
    },
    {
      question: "How do I improve results?",
      answer:
        "Use a straight, high-resolution scan, crop to the text area, and choose the correct language when available.",
    },
  ];
}

registerToolFAQ("ocr-text-extractor", getOCRTextExtractorFAQs);


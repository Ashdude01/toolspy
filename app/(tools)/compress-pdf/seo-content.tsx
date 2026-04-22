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
  Gauge,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function CompressPdfSEOContent() {
  const tool = getToolBySlug("compress-pdf");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const compressionLevels = [
    {
      name: "Light",
      useCase: "Print-ready",
      description: "Smallest visible change. Text and images stay sharp. Smaller savings.",
    },
    {
      name: "Balanced",
      useCase: "Email, cloud uploads",
      description: "Good readability with a meaningful drop in size. Sensible default.",
    },
    {
      name: "Strong",
      useCase: "Attachments, forms",
      description: "Smallest file size. Images are resampled — still legible, not print-quality.",
    },
  ];

  const commonTargets = [
    { label: "Email attachment", target: "≤ 5–10 MB", note: "Most inboxes accept this comfortably." },
    { label: "Job / government upload", target: "≤ 1–2 MB", note: "Many portals cap at 2 MB total." },
    { label: "Web upload / CMS", target: "≤ 5 MB", note: "Faster uploads and previews." },
    { label: "WhatsApp / chat", target: "≤ 100 MB", note: "WhatsApp cap; keep well under for reliability." },
  ];

  const featureChecklist = [
    { feature: "Compression levels", value: "Yes", note: "Light / Balanced / Strong presets." },
    { feature: "Target file size (MB)", value: "Yes", note: "Compress toward a specific limit." },
    { feature: "Downsample images in PDF", value: "Yes", note: "Smaller embedded images = smaller PDF." },
    { feature: "Batch compress", value: "Yes", note: "Queue many PDFs, download as ZIP." },
    { feature: "Keep text searchable", value: "Yes", note: "Text layer is preserved." },
    { feature: "Preserve bookmarks & links", value: "Yes", note: "Navigation stays intact." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Expecting huge savings from tiny PDFs",
      body: "A 300 KB text-only PDF is already lean. Compression shines on PDFs with many embedded images.",
    },
    {
      title: "Using Strong for print",
      body: "Strong resamples images aggressively. Fine for screen, not for professional print. Use Light if the file will be printed.",
    },
    {
      title: "Compressing scanned PDFs without OCR",
      body: "Scans are heavy. Running OCR first + compression gives much better results than compression alone.",
    },
    {
      title: "Losing accessibility tags",
      body: "Aggressive recompression sometimes drops structure tags. If accessibility matters, stick to Light or Balanced.",
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
            PDF Compressor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF compressor to reduce PDF file size for email, uploads, and chat —
            compress PDF in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF compressor to shrink PDF file size without losing readability. Choose
              a compression level — Light, Balanced, or Strong — or set a target file size in MB
              and let the tool aim for it. Handles both text and image-heavy PDFs.
            </p>
            <p>
              Batch compress a whole folder of documents in one go, keeping text searchable and
              bookmarks intact. Ideal when a form caps attachments at 2 MB, or when an email
              rejects a 30 MB PDF and you need to send it today.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF compressor — upload a PDF, pick a level or target size, and download the smaller file"
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
          currentToolSlug="compress-pdf"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well with compression."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to compress a PDF"
          lead="Four steps to a smaller file."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a single PDF or a batch of documents.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick a level</h3>
            <p className="text-sm text-muted-foreground">
              Light, Balanced, or Strong — pick based on where the file will live.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Target size (optional)</h3>
            <p className="text-sm text-muted-foreground">
              Need a specific limit like 2 MB? Enter it and compress to fit.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save each file or download the batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Levels */}
      <section className="space-y-6" id="levels">
        <SectionHeader
          eyebrow="Presets"
          icon={Sparkles}
          title="Which compression level to pick"
          lead="Match the level to where the PDF will be used."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {compressionLevels.map((p) => (
            <Card key={p.name} className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold">{p.name}</h3>
                <span className="text-xs text-muted-foreground">{p.useCase}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Common targets */}
      <section className="space-y-6" id="targets">
        <SectionHeader
          eyebrow="Benchmarks"
          icon={Gauge}
          title="Common PDF file size limits"
          lead="Rough upper bounds for popular platforms."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use</th>
                    <th className="text-left p-3 font-medium">Target</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {commonTargets.map((s) => (
                    <tr key={s.label} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{s.label}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {s.target}
                      </td>
                      <td className="p-3 text-muted-foreground">{s.note}</td>
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
              A factual summary of what the PDF compressor does.
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
            Combine several PDFs first, then compress:{" "}
            <Link href="/merge-pdf" className="underline underline-offset-4 text-foreground">
              merge PDF
            </Link>
            .
          </p>
          <p>
            Need to split a big PDF into smaller chunks?{" "}
            <Link href="/split-pdf" className="underline underline-offset-4 text-foreground">
              split PDF tool
            </Link>
            .
          </p>
          <p>
            Convert between PDF and other formats:{" "}
            <Link href="/pdf-converter" className="underline underline-offset-4 text-foreground">
              PDF converter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getCompressPdfFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to compress your PDF?</h2>
          <p className="text-muted-foreground">
            Upload your file, pick a level or target size, and download a smaller PDF in
            seconds.
          </p>
          <ScrollToTopButton>Start Compressing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getCompressPdfFAQs() {
  return [
    {
      question: "Is the PDF compressor free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "How much can I shrink a PDF?",
      answer:
        "It depends on the source. PDFs with many embedded images often drop 40–80% in size. Text-only PDFs are already compact and see smaller savings.",
    },
    {
      question: "Can I compress a PDF to a specific size (e.g. 2 MB)?",
      answer:
        "Yes. Enter the target in MB and the tool adjusts the compression level to aim for that limit. If the target is very aggressive, try Strong or run OCR on scans first.",
    },
    {
      question: "Will the text stay searchable?",
      answer:
        "Yes. The text layer is preserved. Bookmarks and internal links also stay intact.",
    },
    {
      question: "Is the compressed PDF still print-quality?",
      answer:
        "Light keeps print quality. Balanced is fine for most uses. Strong resamples images more aggressively — great for screen, not recommended for professional printing.",
    },
    {
      question: "Does the tool upload my PDFs to a server?",
      answer:
        "Compression runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("compress-pdf", getCompressPdfFAQs);

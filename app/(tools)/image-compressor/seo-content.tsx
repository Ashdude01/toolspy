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
  Gauge,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Sparkles,
  FileImage,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ImageCompressorSEOContent() {
  const tool = getToolBySlug("image-compressor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const presets = [
    {
      name: "Balanced",
      useCase: "General use",
      description: "Good visible quality with a meaningful size cut. Sensible default for most photos.",
    },
    {
      name: "High Quality",
      useCase: "Photography, portfolios",
      description: "Keeps fine detail and color depth. Use when image fidelity matters more than savings.",
    },
    {
      name: "Max Compression",
      useCase: "Email, messaging, archives",
      description: "Smallest possible file size. Expect some loss of sharpness - best for previews.",
    },
    {
      name: "Web Optimized",
      useCase: "Websites, blogs, product pages",
      description: "Tuned for fast-loading pages. Good starting point before you publish images online.",
    },
  ];

  const formats = [
    { format: "JPEG", when: "Photos with many colors. Smaller than PNG, lossy by design." },
    { format: "PNG", when: "Screenshots, icons, transparent backgrounds. Lossless, larger." },
    { format: "WebP", when: "Modern web. ~25–35% smaller than JPEG at similar quality." },
    { format: "AVIF", when: "Newest codec. Best compression, slightly slower to encode." },
  ];

  const featureChecklist = [
    { feature: "Batch compress (up to 100 files)", value: "Yes", note: "Upload many images at once." },
    { feature: "Quality slider (1–100)", value: "Yes", note: "Manual control over trade-off." },
    { feature: "Preset modes", value: "Yes", note: "Balanced, High Quality, Max Compression, Web Optimized." },
    { feature: "Target file size (KB)", value: "Yes", note: "Compressor aims for a specific output size." },
    { feature: "Output formats", value: "Yes", note: "Keep original, or JPEG / PNG / WebP / AVIF." },
    { feature: "Resize while compressing", value: "Yes", note: "Optional width/height with aspect ratio lock." },
    { feature: "Remove EXIF metadata", value: "Yes", note: "Keep, remove all, or selective (safe)." },
    { feature: "Download as ZIP", value: "Yes", note: "All compressed files in one archive." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Pushing quality below 50%",
      body: "Going below 50% often introduces visible banding and blur. Prefer a smaller pixel size first.",
    },
    {
      title: "Converting PNG screenshots to JPG",
      body: "JPEG can blur crisp edges. Keep PNG for screenshots, or switch to WebP for a better balance.",
    },
    {
      title: "Forgetting to resize",
      body: "A 6000×4000 photo still costs a lot even after compression. Resize to the size you actually show.",
    },
    {
      title: "Stripping required metadata",
      body: "Removing all EXIF data can drop color profiles. The Selective option preserves safe metadata.",
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
            Image Compressor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image compressor for photos, screenshots, and web assets. Shrink image
            size without wrecking quality - works in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image compressor to reduce image size across JPG, PNG, WebP, and AVIF in
              one pass. Pick a preset, fine-tune quality, or set a target size in KB - the tool
              compresses up to 100 images at once and hands you a ZIP of the results.
            </p>
            <p>
              Need a different trade-off? Every option is adjustable: format, target size, resize,
              EXIF handling, progressive encoding, and filenames. Ideal for web pages, email
              attachments, and cleaning up exports before you ship them.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image compressor - file upload, preset cards, quality slider, and download controls"
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
          currentToolSlug="image-compressor"
          title="Similar Tools You Might Like"
          description="Other image utilities that pair well with compression."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to compress an image"
          lead="Four steps, no setup."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop up to 100 images (JPG, PNG, WebP, AVIF) or pick files from your device.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose a preset</h3>
            <p className="text-sm text-muted-foreground">
              Pick Balanced, High Quality, Max Compression, or Web Optimized.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Fine-tune</h3>
            <p className="text-sm text-muted-foreground">
              Adjust quality, output format, target KB, or enable resize when needed.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Grab files one by one or download the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Target a specific KB - matches intent "reduce image size to 100KB / 50KB" */}
      <section className="space-y-4" id="target-size">
        <SectionHeader
          eyebrow="Size control"
          icon={Gauge}
          title="Reduce image size to a specific KB"
          lead="Use the target file size field to aim for a number."
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            If a form or platform needs a photo under a given KB, enter the target in the{" "}
            <strong className="text-foreground">Target Size (KB)</strong> field. The compressor
            lowers quality in small steps until the output meets the limit.
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Upload the image.</li>
            <li>Keep the format on &quot;Keep Original&quot; or pick WebP / AVIF for extra savings.</li>
            <li>Type the target - for example <code className="bg-muted rounded px-1.5 py-0.5 text-xs">100</code> for 100&nbsp;KB.</li>
            <li>Compress and verify the result below the input.</li>
          </ol>
          <p className="text-sm">
            If the target is too aggressive for the source image, resize the dimensions as well -
            this is usually the fastest way to hit a very small KB budget.
          </p>
        </div>
      </section>

      {/* Presets guide */}
      <section className="space-y-6" id="presets">
        <SectionHeader
          eyebrow="Presets"
          icon={Sparkles}
          title="Which preset to choose"
          lead="Pick one - you can always fine-tune after."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((p) => (
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

      {/* Output formats */}
      <section className="space-y-6" id="formats">
        <SectionHeader
          eyebrow="Output"
          icon={FileImage}
          title="Which output format to pick"
          lead="Match the format to where the image will live."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formats.map((f) => (
            <Card key={f.format} className="p-5">
              <h3 className="font-semibold mb-1">{f.format}</h3>
              <p className="text-sm text-muted-foreground">{f.when}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Common pitfalls */}
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
              A factual summary of what the image compressor does.
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

      {/* Related tools cross-link */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Compressor vs converter vs resizer" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">image compressor</strong> when the file is
            too heavy for the web or email.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-converter" className="underline underline-offset-4 text-foreground">
              image converter
            </Link>{" "}
            when you need a different format (for example HEIC to JPG, or PNG to WebP).
          </p>
          <p>
            Use the{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>{" "}
            when the image is the right format but the pixel dimensions are too large or small.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getImageCompressorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to compress your images?</h2>
          <p className="text-muted-foreground">
            Upload your files, pick a preset, and download the smaller versions in seconds.
          </p>
          <ScrollToTopButton>Start Compressing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageCompressorFAQs() {
  return [
    {
      question: "Is the image compressor free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How do I reduce an image to a specific KB size?",
      answer:
        "Enter your target in the Target Size (KB) field and compress. The tool lowers quality step by step until the output hits your limit. If it can’t reach it, also enable Resize to lower the pixel size.",
    },
    {
      question: "Which formats can I compress?",
      answer:
        "JPG, PNG, WebP, and AVIF inputs are supported. You can keep the original format or convert to any of these during compression.",
    },
    {
      question: "Will compression hurt image quality?",
      answer:
        "Lossy formats like JPEG lose some detail by design. Use the quality slider or presets to find the right balance. PNG output is lossless, so it preserves detail but saves less size.",
    },
    {
      question: "Can I compress many images at once?",
      answer:
        "Yes. You can upload up to 100 images in one batch, compress them together, and download the results as a single ZIP file.",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "Compression runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-compressor", getImageCompressorFAQs);

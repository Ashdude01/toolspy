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
  Repeat,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  FileImage,
  Layers,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ImageConverterSEOContent() {
  const tool = getToolBySlug("image-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const popularConversions = [
    { from: "JPG", to: "PNG", note: "Need transparency or lossless edits." },
    { from: "PNG", to: "JPG", note: "Smaller file for photos on the web." },
    { from: "HEIC", to: "JPG", note: "iPhone photos that won’t open elsewhere." },
    { from: "WebP", to: "PNG", note: "Tools that don’t accept WebP yet." },
    { from: "JPG", to: "WebP", note: "~25–35% smaller at similar quality." },
    { from: "PNG", to: "WebP", note: "Lossless WebP for small icons and UI." },
  ];

  const formatGuide = [
    {
      format: "JPG / JPEG",
      bestFor: "Photos, colourful images",
      notes: "Lossy. Very small files. No transparency.",
    },
    {
      format: "PNG",
      bestFor: "Screenshots, icons, transparent images",
      notes: "Lossless. Larger than JPG. Supports alpha.",
    },
    {
      format: "WebP",
      bestFor: "Modern websites",
      notes: "Lossy or lossless. Smaller than JPG/PNG at similar quality.",
    },
    {
      format: "AVIF",
      bestFor: "Latest browsers, high-quality compression",
      notes: "Newest codec. Best compression, slower to encode.",
    },
    {
      format: "HEIC",
      bestFor: "iPhone photos (input)",
      notes: "Usually converted to JPG or PNG for compatibility.",
    },
    {
      format: "GIF",
      bestFor: "Simple animations",
      notes: "Limited colours. For small animated clips.",
    },
  ];

  const featureChecklist = [
    { feature: "Input formats", value: "Yes", note: "JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, TIFF, SVG." },
    { feature: "Output formats", value: "Yes", note: "JPG, PNG, WebP, AVIF and more." },
    { feature: "Batch convert", value: "Yes", note: "Drop many files, get a single ZIP." },
    { feature: "Quality control", value: "Yes", note: "Set a quality value for lossy formats." },
    { feature: "Transparent backgrounds", value: "Yes", note: "Preserved when the target format supports alpha." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Converting PNG to JPG with transparency",
      body: "JPG has no alpha channel. Transparent pixels become white or black. Use PNG or WebP instead.",
    },
    {
      title: "Using JPG for crisp screenshots",
      body: "JPG blurs sharp text edges. Keep screenshots as PNG, or pick lossless WebP.",
    },
    {
      title: "Expecting a higher quality than the source",
      body: "Converting a low-quality JPG to PNG does not restore detail - it just saves what is already there.",
    },
    {
      title: "Forgetting older browsers",
      body: "AVIF and some WebP variants are not supported everywhere. For wide compatibility, use JPG or PNG.",
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
            Image Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image converter and image format converter for JPG, PNG, WebP, AVIF,
            HEIC and more - change image format in the browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image converter to convert JPG to PNG, PNG to JPG, HEIC to JPG, or WebP to
              PNG in a single step. Drop a single file or batch convert a folder - the tool
              returns every image in your chosen target format as a quick download or a ZIP.
            </p>
            <p>
              Alongside common formats the converter supports AVIF, GIF, BMP, TIFF and SVG on
              input. Adjust quality for lossy formats, keep transparency when the target supports
              it, and pick JPG, PNG, WebP or AVIF as the output.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image converter - upload files, pick an output format, and download the converted images"
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
          currentToolSlug="image-converter"
          title="Similar Tools You Might Like"
          description="Other image utilities that pair well with format conversion."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert an image"
          lead="Four steps, no setup."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop one or many images - JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, TIFF, or SVG.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick output</h3>
            <p className="text-sm text-muted-foreground">
              Choose the target format: JPG, PNG, WebP, or AVIF.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Adjust quality</h3>
            <p className="text-sm text-muted-foreground">
              Optional: set quality for lossy formats, or keep the default.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save files one by one or download the whole batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Popular conversions */}
      <section className="space-y-6" id="conversions">
        <SectionHeader
          eyebrow="Popular"
          icon={Repeat}
          title="Common image conversions"
          lead="The most-searched format changes handled in one click."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularConversions.map((c) => (
            <Card key={`${c.from}-${c.to}`} className="p-5">
              <div className="flex items-center gap-2 font-semibold">
                <span>{c.from}</span>
                <span className="text-muted-foreground">→</span>
                <span>{c.to}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{c.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Format reference */}
      <section className="space-y-6" id="format-guide">
        <SectionHeader
          eyebrow="Reference"
          icon={FileImage}
          title="Which format to pick"
          lead="A short guide to pick the right output."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Format</th>
                    <th className="text-left p-3 font-medium">Best for</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {formatGuide.map((f) => (
                    <tr key={f.format} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{f.format}</td>
                      <td className="p-3 text-muted-foreground">{f.bestFor}</td>
                      <td className="p-3 text-muted-foreground">{f.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Batch conversion */}
      <section className="space-y-4" id="batch">
        <SectionHeader
          eyebrow="Volume"
          icon={Layers}
          title="Batch convert many images at once"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Need to change image format for a whole folder? Select multiple files (or drag them
            in together), pick the target format once, and the converter processes all of them in
            one go.
          </p>
          <p>
            The result arrives as a ZIP so you can drop it directly into your project, CMS, or
            cloud drive without renaming anything.
          </p>
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
              A factual summary of what the image converter does.
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

      {/* Related cross-links */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Converter vs compressor vs resizer" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">image converter</strong> when you need a
            different file format.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>{" "}
            when the format is fine but the file is too large.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>{" "}
            when the pixel dimensions are too large or small.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getImageConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to convert your images?</h2>
          <p className="text-muted-foreground">
            Upload a file, pick the output format, and download the converted image in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageConverterFAQs() {
  return [
    {
      question: "Is the image converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Which input and output formats are supported?",
      answer:
        "Inputs: JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, TIFF, and SVG. Outputs: JPG, PNG, WebP, and AVIF. Additional formats are added over time.",
    },
    {
      question: "Can I convert HEIC photos from my iPhone?",
      answer:
        "Yes. Upload the HEIC file and pick JPG (or PNG) as the output format. The tool decodes HEIC in the browser.",
    },
    {
      question: "Does converting to JPG keep my transparent background?",
      answer:
        "No. JPG does not support transparency. If you need alpha, convert to PNG or WebP instead.",
    },
    {
      question: "Can I change the image format for many files at once?",
      answer:
        "Yes. Drop multiple images in together, choose a single output format, and download the batch as a ZIP.",
    },
    {
      question: "Does the converter upload my images to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-converter", getImageConverterFAQs);

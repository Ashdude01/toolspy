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
  Code2,
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

export function ImageToBase64SEOContent() {
  const tool = getToolBySlug("image-to-base64");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Embed an image in CSS",
      body: "Turn a small icon into a data URI so you don’t need an extra HTTP request.",
    },
    {
      title: "Inline in HTML / JSX",
      body: "Paste an <img src=\"data:...\" /> string directly into a component or email template.",
    },
    {
      title: "Send in an API payload",
      body: "Post an image inside JSON (e.g. to a webhook or LLM endpoint) without multipart uploads.",
    },
    {
      title: "Bundle into a single file",
      body: "For scripts and offline demos, Base64 images remove the need for separate asset files.",
    },
  ];

  const outputFormats = [
    {
      format: "Raw Base64",
      example: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
      note: "Just the encoded characters. Pass to any Base64 parser.",
    },
    {
      format: "Data URI",
      example: "data:image/png;base64,iVBORw0KGgo...",
      note: "Includes the MIME prefix - drop directly into <img src>, CSS url(), or JSON.",
    },
    {
      format: "CSS url()",
      example: "url('data:image/png;base64,iVBORw0KGgo...')",
      note: "Ready to paste into background-image or content in a stylesheet.",
    },
    {
      format: "HTML <img>",
      example: '<img src="data:image/png;base64,..." alt="" />',
      note: "Full markup ready for a page or email body.",
    },
  ];

  const featureChecklist = [
    { feature: "Encode image to Base64", value: "Yes", note: "PNG, JPG, WebP, GIF, SVG, BMP, and more." },
    { feature: "Output as data URI", value: "Yes", note: "Includes MIME type, ready for HTML / CSS / JSON." },
    { feature: "Copy to clipboard", value: "Yes", note: "One click to copy the encoded string." },
    { feature: "Batch encode", value: "Yes", note: "Upload multiple images; get a list of strings or a .txt." },
    { feature: "Size preview", value: "Yes", note: "See how much the Base64 string is after encoding." },
    { feature: "URL-safe output (optional)", value: "Yes", note: "Swap + / for - _ when needed by your system." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Encoding very large images",
      body: "Base64 makes the string ~33% bigger than the source file. For anything bigger than a small icon, serving the image from a URL is still better.",
    },
    {
      title: "Using data URIs for above-the-fold photos",
      body: "Browsers can’t cache inline Base64. Real URLs win for images that repeat across pages.",
    },
    {
      title: "Mixing MIME types",
      body: "Don’t claim image/png in the data URI if the source is JPG. The browser might decode, but some tools will fail.",
    },
    {
      title: "Pasting giant strings into tooling",
      body: "IDEs and linters choke on multi-megabyte Base64 strings. Keep Base64 images small and reference larger assets by URL.",
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
            Image to Base64 Encoder
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image to Base64 encoder. Convert an image to a Base64 string or data
            URI - paste it into HTML, CSS, JSON, or an API payload in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image to Base64 encoder to convert PNG, JPG, WebP, GIF, or SVG into a
              Base64 string. Pick raw output, a full data URI, a CSS{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">url()</code> wrapper, or a
              complete <code className="bg-muted rounded px-1.5 py-0.5 text-xs">&lt;img&gt;</code>{" "}
              tag - whichever you need.
            </p>
            <p>
              Ideal for embedding small icons in a stylesheet, inlining avatars in email
              templates, or posting images in a JSON API call. Everything runs in your browser -
              files never leave your device.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image to Base64 - drop an image, copy a data URI or Base64 string ready to paste"
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
          currentToolSlug="image-to-base64"
          title="Similar Tools You Might Like"
          description="Other Base64 and image utilities that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to encode an image to Base64"
          lead="Three steps from file to ready-to-paste string."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop an image - PNG, JPG, WebP, GIF, or SVG.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick format</h3>
            <p className="text-sm text-muted-foreground">
              Raw Base64, data URI, CSS url(), or full &lt;img&gt; tag.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Copy</h3>
            <p className="text-sm text-muted-foreground">
              One-click copy. Paste wherever you need it.
            </p>
          </Card>
        </div>
      </section>

      {/* Output formats */}
      <section className="space-y-6" id="output-formats">
        <SectionHeader
          eyebrow="Output"
          icon={Code2}
          title="Output formats"
          lead="Pick the shape that matches where the string will live."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outputFormats.map((f) => (
            <Card key={f.format} className="p-5">
              <h3 className="font-semibold mb-1">{f.format}</h3>
              <pre className="text-[11px] bg-muted/60 rounded-md p-2 overflow-x-auto whitespace-pre-wrap break-all text-muted-foreground">
                {f.example}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">{f.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={HelpCircle}
          title="Typical reasons to encode images as Base64"
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
              A factual summary of what the image to Base64 encoder does.
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
        <SectionHeader title="Related Base64 tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Going the other direction?{" "}
            <Link href="/base64-to-image" className="underline underline-offset-4 text-foreground">
              Base64 to image converter
            </Link>
            .
          </p>
          <p>
            For plain text encoding / decoding:{" "}
            <Link href="/base64-encoder-decoder" className="underline underline-offset-4 text-foreground">
              Base64 encoder / decoder
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getImageToBase64FAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to encode your image?</h2>
          <p className="text-muted-foreground">
            Drop a file, pick a format, and copy the Base64 string or data URI in seconds.
          </p>
          <ScrollToTopButton>Start Encoding →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageToBase64FAQs() {
  return [
    {
      question: "Is the image to Base64 encoder free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "What output formats can I get?",
      answer:
        "Raw Base64, a data URI (data:image/png;base64,...), a CSS url() wrapper, and a full <img> tag. Copy whichever fits where you’re pasting.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "PNG, JPG, WebP, GIF, SVG, BMP, and other common image formats.",
    },
    {
      question: "When should I avoid Base64 images?",
      answer:
        "For large photos, hero images, or anything above ~50 KB. Base64 grows the payload by ~33% and browsers can’t cache inline data. Use a regular image URL in those cases.",
    },
    {
      question: "Can I encode many images at once?",
      answer:
        "Yes. Upload multiple files and get a list of Base64 strings - useful when you need to embed a set of icons or avatars.",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "Encoding runs in your browser. Files stay on your device and are not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-to-base64", getImageToBase64FAQs);

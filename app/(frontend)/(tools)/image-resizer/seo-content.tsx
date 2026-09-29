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
  Ruler,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Percent,
  Lock,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ImageResizerSEOContent() {
  const tool = getToolBySlug("image-resizer");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  // Common target dimensions - unique, useful reference content.
  const commonSizes = [
    { label: "Instagram post (square)", size: "1080 × 1080 px" },
    { label: "Instagram story / reel", size: "1080 × 1920 px" },
    { label: "Facebook cover photo", size: "820 × 312 px" },
    { label: "YouTube thumbnail", size: "1280 × 720 px" },
    { label: "Twitter / X header", size: "1500 × 500 px" },
    { label: "LinkedIn profile banner", size: "1584 × 396 px" },
    { label: "Passport photo (common)", size: "413 × 531 px (35 × 45 mm)" },
    { label: "Web hero image (16:9)", size: "1920 × 1080 px" },
  ];

  const featureChecklist = [
    { feature: "Resize by pixels (W × H)", value: "Yes", note: "Enter exact dimensions in pixels." },
    { feature: "Resize by percentage", value: "Yes", note: "Scale up or down by a percentage of the original." },
    { feature: "Maintain aspect ratio", value: "Yes", note: "Locked by default so the image doesn’t stretch." },
    { feature: "Resize without distortion", value: "Yes", note: "Fit / cover modes to avoid skew when ratios differ." },
    { feature: "Batch resize", value: "Yes", note: "Upload many images, apply the same size to all." },
    { feature: "Preserve format", value: "Yes", note: "Resize without changing JPG / PNG / WebP." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Turning off aspect ratio by accident",
      body: "Without the ratio lock, setting both width and height independently will squash the image.",
    },
    {
      title: "Upscaling a small image a lot",
      body: "Scaling a 300-px image to 2000 px will look blurry. Resize stretches existing pixels - it doesn’t add detail.",
    },
    {
      title: "Wrong output size for the platform",
      body: "Each platform has its own dimensions. Use the reference list above instead of guessing.",
    },
    {
      title: "Resizing lossy formats repeatedly",
      body: "Every resize + save of a JPG drops a little quality. Keep a lossless copy (PNG / WebP lossless) if you plan to resize again later.",
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
            Image Resizer
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image resizer to change image size by exact pixels or by percentage -
            resize a photo for profiles, social media, or a web layout in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image resizer to set a specific width and height, or scale the picture by a
              percentage. Aspect ratio is locked by default, so the image doesn’t stretch when
              only one dimension changes.
            </p>
            <p>
              Works in the browser for JPG, PNG, WebP, and more. Resize a single photo or batch
              resize many images at once, keeping the same format and quality. Useful for
              profiles, uploads, print, or fitting images into a design layout.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image resizer - width and height inputs with an aspect ratio lock and percentage option"
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
          title="How to resize an image"
          lead="Four steps, no setup."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop one or more images - JPG, PNG, WebP, and other common formats.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick a mode</h3>
            <p className="text-sm text-muted-foreground">
              Choose exact pixels (width × height) or a percentage of the original.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Enter size</h3>
            <p className="text-sm text-muted-foreground">
              Type the value - aspect ratio stays locked unless you turn it off.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save each file, or download the batch in one go.
            </p>
          </Card>
        </div>
      </section>

      {/* Pixels vs percentage */}
      <section className="space-y-4" id="pixels-vs-percent">
        <SectionHeader
          eyebrow="Two ways"
          icon={Ruler}
          title="Resize by pixels or by percentage"
          lead="Use exact pixels for precise targets, percentage for quick scaling."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Ruler className="h-4 w-4" /> Pixels
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter the exact width and height you need (e.g. 1080 × 1080). Best when a platform
              or layout requires a specific size.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Percent className="h-4 w-4" /> Percentage
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter a percentage of the original (e.g. 50% to halve the size). Handy when the
              exact number doesn’t matter - just a smaller or bigger copy.
            </p>
          </Card>
        </div>
      </section>

      {/* Aspect ratio */}
      <section className="space-y-4" id="aspect">
        <SectionHeader
          eyebrow="Keep it clean"
          icon={Lock}
          title="Aspect ratio lock prevents distortion"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            When the lock is on, entering either width or height automatically fills the other so
            the image keeps its proportions. Turn the lock off only when you deliberately want a
            specific stretched or squashed output - most photos and screenshots look wrong
            without it.
          </p>
          <p>
            For social covers or banners where the target ratio differs from the source, the
            easiest flow is: resize one dimension first, then crop the other to the platform’s
            exact ratio.
          </p>
        </div>
      </section>

      {/* Common sizes reference */}
      <section className="space-y-6" id="common-sizes">
        <SectionHeader
          eyebrow="Reference"
          icon={Ruler}
          title="Common image sizes to resize to"
          lead="A quick list for social media, profiles, and the web."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use</th>
                    <th className="text-left p-3 font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {commonSizes.map((s) => (
                    <tr key={s.label} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{s.label}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {s.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
              A factual summary of what the image resizer does.
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

      {/* Related tools */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Resizer vs compressor vs converter" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">image resizer</strong> when the pixel
            dimensions need to change.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>{" "}
            when the dimensions are fine but the file size is too large.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-converter" className="underline underline-offset-4 text-foreground">
              image converter
            </Link>{" "}
            when you need a different file format (e.g. HEIC to JPG).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getImageResizerFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to resize your images?</h2>
          <p className="text-muted-foreground">
            Upload a photo, set the size in pixels or percentage, and download the resized image.
          </p>
          <ScrollToTopButton>Start Resizing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageResizerFAQs() {
  return [
    {
      question: "Is the image resizer free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Can I resize by exact pixels or by percentage?",
      answer:
        "Both. Enter a specific width and height in pixels, or enter a percentage to scale the original up or down.",
    },
    {
      question: "Does resizing distort the image?",
      answer:
        "Not when the aspect ratio lock is on - it keeps proportions correct. Turning the lock off lets you set both dimensions freely, which can squash the image if ratios differ.",
    },
    {
      question: "Can I resize many images at once?",
      answer:
        "Yes. Upload multiple files, apply one size to all, and download them in a single batch.",
    },
    {
      question: "Will the tool change my image format?",
      answer:
        "No. The resizer keeps your original format (JPG stays JPG, PNG stays PNG). If you also need a different format, use the image converter.",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "Resizing runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-resizer", getImageResizerFAQs);

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
  Wand2,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  ImageIcon,
  Palette,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function AIImageEnhancerSEOContent() {
  const tool = getToolBySlug("ai-image-enhancer");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const modes = [
    {
      name: "Upscale",
      what: "Increase resolution (2×, 4×, 8×).",
      when: "Turning a small source into a print-ready or web-hero image.",
    },
    {
      name: "Unblur",
      what: "Sharpen motion or focus blur.",
      when: "Phone snapshots and screenshots that came out soft.",
    },
    {
      name: "Restore old photos",
      what: "Reduce scratches, noise, and fading.",
      when: "Scanned family photos and archival prints.",
    },
    {
      name: "Colorize black & white",
      what: "Estimate plausible colours for monochrome photos.",
      when: "Old portraits, historical images, mood experiments.",
    },
  ];

  const featureChecklist = [
    { feature: "Upscale 2× / 4× / 8×", value: "Yes", note: "Pick how much resolution to add." },
    { feature: "Unblur photos", value: "Yes", note: "Recovers detail on mildly blurred images." },
    { feature: "Restore old / damaged photos", value: "Yes", note: "Scratches, dust, noise, fade reduction." },
    { feature: "Colorize black & white", value: "Yes", note: "AI estimates colours - not a historical record." },
    { feature: "Preserve original aspect ratio", value: "Yes", note: "No cropping unless you ask for it." },
    { feature: "Export as PNG / JPG / WebP", value: "Yes", note: "Keep original format or switch." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Expecting 8× to look like a DSLR",
      body: "Upscaling invents plausible detail. 2× or 4× usually looks most natural - 8× can feel over-processed.",
    },
    {
      title: "Enhancing very low-quality sources",
      body: "If the source is tiny and heavily compressed, there’s almost no signal to work with. Start from the largest version you have.",
    },
    {
      title: "Treating colorization as historical truth",
      body: "Colours are plausible, not authentic. Mention this when sharing colorized photos publicly.",
    },
    {
      title: "Skipping a pre-crop",
      body: "If you only need the subject, crop first. Upscaling a smaller, cleaner region beats upscaling the whole busy photo.",
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
            AI Image Enhancer
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast AI image enhancer and AI photo upscaler. Upscale resolution, unblur photos,
            restore old pictures, and colorize black &amp; white - in one tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI image enhancer to upscale a low-resolution photo, unblur a soft
              snapshot, restore an old scan, or colorize a black &amp; white image. Pick the
              mode, upload a photo, and download a cleaner version in seconds.
            </p>
            <p>
              Ideal when you need to prep a hero image, rescue a blurry memory, or modernise an
              old family photo. Works for JPG, PNG, and WebP - output preserves your original
              aspect ratio.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI image enhancer - upscale, unblur, restore, or colorize photos in a few clicks"
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
          currentToolSlug="ai-image-enhancer"
          title="Similar Tools You Might Like"
          description="Other image and AI utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to enhance a photo"
          lead="Four steps to a sharper image."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a photo - JPG, PNG, or WebP.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick mode</h3>
            <p className="text-sm text-muted-foreground">
              Upscale, unblur, restore, or colorize.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Enhance</h3>
            <p className="text-sm text-muted-foreground">
              AI processes the photo. Preview the before / after.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the enhanced image at original or upscaled resolution.
            </p>
          </Card>
        </div>
      </section>

      {/* Modes */}
      <section className="space-y-6" id="modes">
        <SectionHeader
          eyebrow="Modes"
          icon={Wand2}
          title="Four modes, one tool"
          lead="Pick based on what your photo needs."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((m) => (
            <Card key={m.name} className="p-5">
              <h3 className="font-semibold mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{m.what}</p>
              <p className="text-sm italic text-muted-foreground">Use it when: {m.when}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Which upscale factor */}
      <section className="space-y-4" id="upscale">
        <SectionHeader
          eyebrow="Upscaling"
          icon={ImageIcon}
          title="Which upscale factor to pick"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">2×</strong> - almost always the safest choice.
            Adds detail without the &quot;over-processed&quot; look.
          </p>
          <p>
            <strong className="text-foreground">4×</strong> - a big step up in resolution. Works
            well when the source is already decent quality.
          </p>
          <p>
            <strong className="text-foreground">8×</strong> - extreme. Great for tiny sources
            you need to blow up, but expect some AI-invented texture. Check carefully before
            using for important work.
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
              A factual summary of what the AI image enhancer does.
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
        <SectionHeader icon={Palette} title="Related image tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Remove the background after upscaling:{" "}
            <Link href="/ai-background-remover" className="underline underline-offset-4 text-foreground">
              AI background remover
            </Link>
            .
          </p>
          <p>
            Resize the enhanced output:{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>
            .
          </p>
          <p>
            Compress for the web:{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAIImageEnhancerFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to enhance a photo?</h2>
          <p className="text-muted-foreground">
            Upload a photo, pick a mode, and download a sharper, cleaner version.
          </p>
          <ScrollToTopButton>Start Enhancing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAIImageEnhancerFAQs() {
  return [
    {
      question: "Is the AI image enhancer free to use?",
      answer: "Yes. It’s free - no signup, no install.",
    },
    {
      question: "Which modes are included?",
      answer:
        "Upscale (2× / 4× / 8×), unblur, restore old photos (scratches / noise), and colorize black &amp; white. Pick based on what your photo needs.",
    },
    {
      question: "How much should I upscale?",
      answer:
        "2× is safest and looks most natural. 4× is a big jump that works well with decent sources. 8× is extreme - great for tiny inputs, but review carefully before using the result in important work.",
    },
    {
      question: "Can it rescue a heavily blurred photo?",
      answer:
        "It helps with mild to moderate blur. Severe blur or shake can’t be fully recovered - there’s not enough original signal for the model to work with.",
    },
    {
      question: "Is colorization historically accurate?",
      answer:
        "No. The AI produces plausible colours, not verified ones. Use it for mood and presentation, and mention it when sharing publicly.",
    },
    {
      question: "What’s the maximum image size I can upload?",
      answer:
        "Most common photo sizes are handled comfortably. Very large images may process more slowly; if you hit a limit, resize first, then enhance.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("ai-image-enhancer", getAIImageEnhancerFAQs);

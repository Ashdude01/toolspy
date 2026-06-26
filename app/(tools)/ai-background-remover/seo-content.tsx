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
  Brush,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Scissors,
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

export function AIBackgroundRemoverSEOContent() {
  const tool = getToolBySlug("ai-background-remover");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const worksWellFor = [
    { title: "Product photos", body: "Clean cutouts with a clear subject against a plain or busy background." },
    { title: "Portraits & headshots", body: "Hair edges handled reasonably well for most lighting conditions." },
    { title: "E-commerce listings", body: "Consistent white or transparent backgrounds across a catalogue." },
    { title: "Thumbnails & posters", body: "Lift the subject off any background for design compositions." },
  ];

  const tricky = [
    {
      title: "Fine hair on a complex background",
      body: "Wispy strands against busy backgrounds can lose detail. Use the magic brush for touch-ups.",
    },
    {
      title: "Glass, smoke, or translucent edges",
      body: "AI treats these as either fully in or fully out. Keep the final composition in mind.",
    },
    {
      title: "Very low-resolution images",
      body: "The model needs enough pixels to find the subject. Upload a larger source when possible.",
    },
    {
      title: "Subjects touching image edges",
      body: "The cutout is clipped by the frame - add padding to the original if you need room to grow.",
    },
  ];

  const featureChecklist = [
    { feature: "Automatic background removal", value: "Yes", note: "One-click AI cutout for photos with a clear subject." },
    { feature: "Magic brush for touch-ups", value: "Yes", note: "Refine edges, restore or erase regions manually." },
    { feature: "Batch processing", value: "Yes", note: "Queue multiple photos; download as ZIP." },
    { feature: "Transparent PNG output", value: "Yes", note: "Alpha channel preserved - drop into any design." },
    { feature: "Solid background fill", value: "Yes", note: "Optional - pick white, black, brand hex, or keep transparency." },
    { feature: "High-res export", value: "Yes", note: "Original pixel dimensions kept in the result." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Expecting perfect hair every time",
      body: "AI cutouts are excellent for most photos but imperfect for wispy edges. Plan a 20-second touch-up pass when it matters.",
    },
    {
      title: "Saving as JPG",
      body: "JPG has no transparency. The background comes back as white. Keep PNG or WebP to preserve the cutout.",
    },
    {
      title: "Forgetting shadows",
      body: "Background removal deletes shadows too. Add a subtle drop shadow in your design tool if the subject needs grounding.",
    },
    {
      title: "Very low-res or heavily compressed sources",
      body: "Tiny JPGs confuse the model. Use the largest, cleanest version of the image available.",
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
            AI Background Remover
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online AI background remover. Cut out the subject in one click, refine with a
            magic brush, and download a transparent PNG - in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI background remover to remove the background from an image
              automatically. Upload a photo, the AI detects the subject, and the result is a
              clean transparent PNG - ready to drop into product pages, thumbnails, posters, or
              design mockups.
            </p>
            <p>
              Need to fine-tune? The magic brush lets you restore or erase regions after the
              auto-cut. Process a single photo or a batch, optionally fill the removed area
              with a colour, and export at full resolution. Ideal for e-commerce listings,
              headshots, and graphic design.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI background remover - subject cut out with transparent background and magic brush controls"
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
          currentToolSlug="ai-background-remover"
          title="Similar Tools You Might Like"
          description="Other image and AI utilities that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to remove a background"
          lead="Four steps to a transparent cutout."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a photo - JPG, PNG, or WebP.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. AI cut</h3>
            <p className="text-sm text-muted-foreground">
              The model detects the subject and removes the rest in one pass.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Touch-up</h3>
            <p className="text-sm text-muted-foreground">
              Use the magic brush to restore or erase any edge regions.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save a transparent PNG, or fill with a colour first.
            </p>
          </Card>
        </div>
      </section>

      {/* Magic brush */}
      <section className="space-y-4" id="brush">
        <SectionHeader
          eyebrow="Refine"
          icon={Brush}
          title="Magic brush for edge touch-ups"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            The AI cut is a strong first pass, but edges - especially hair, fur, or thin
            objects - sometimes need a second look. The magic brush has two modes:{" "}
            <strong className="text-foreground">restore</strong> (bring pixels back) and{" "}
            <strong className="text-foreground">erase</strong> (remove more). Zoom in for
            precision.
          </p>
          <p>
            A good workflow: run the auto-cut, zoom to 200–400%, and spend 15–30 seconds on any
            fuzzy edges that matter. Most photos look great with a tiny touch-up pass.
          </p>
        </div>
      </section>

      {/* Works well / tricky */}
      <section className="space-y-6" id="fit">
        <SectionHeader
          eyebrow="Where it shines"
          icon={Scissors}
          title="What the tool handles well"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worksWellFor.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6" id="tricky">
        <SectionHeader
          eyebrow="Expect cleanup"
          icon={Lightbulb}
          title="Cases that benefit from manual touch-ups"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tricky.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Batch */}
      <section className="space-y-4" id="batch">
        <SectionHeader
          eyebrow="Volume"
          icon={Layers}
          title="Batch remove backgrounds"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            For e-commerce catalogues and social batches, drop several photos at once. The tool
            processes them in parallel and returns a single ZIP of transparent PNGs - ideal for
            consistent product shots or team headshots.
          </p>
          <p>
            Pick a shared background fill (white, brand colour, or transparency) so the batch
            output is ready to ship without extra edits.
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
              A factual summary of what the AI background remover does.
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
        <SectionHeader title="Related image tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Restore resolution after cutting:{" "}
            <Link href="/ai-image-enhancer" className="underline underline-offset-4 text-foreground">
              AI image enhancer
            </Link>
            .
          </p>
          <p>
            Resize the transparent PNG:{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>
            .
          </p>
          <p>
            Compress the final file:{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAIBackgroundRemoverFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to remove backgrounds?</h2>
          <p className="text-muted-foreground">
            Upload a photo, let the AI cut out the subject, and download a transparent PNG.
          </p>
          <ScrollToTopButton>Start Cutting Out →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAIBackgroundRemoverFAQs() {
  return [
    {
      question: "Is the AI background remover free to use?",
      answer: "Yes. It’s free - no signup, no install.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "JPG, PNG, and WebP for input. Output defaults to transparent PNG. You can also pick a solid background fill (white, black, or a custom hex) before downloading.",
    },
    {
      question: "How good is the cutout on hair and fur?",
      answer:
        "For most portraits and pet photos, the auto-cut is strong. For wispy strands on busy backgrounds, the magic brush lets you restore or erase regions in seconds.",
    },
    {
      question: "Can I process many images at once?",
      answer:
        "Yes. Upload a batch, apply the same settings (background fill, export size) to all, and download a single ZIP.",
    },
    {
      question: "Will the output keep my original resolution?",
      answer:
        "Yes. The transparent PNG matches the original pixel dimensions unless you choose to resize it before exporting.",
    },
    {
      question: "Does the tool upload my photos to a server?",
      answer:
        "Processing happens in your browser. Files stay on your device and are not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("ai-background-remover", getAIBackgroundRemoverFAQs);

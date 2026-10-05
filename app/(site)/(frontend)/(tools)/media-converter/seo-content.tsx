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
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
  Video,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function MediaConverterSEOContent() {
  const tool = getToolBySlug("media-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const formats = [
    "Video: MP4, WebM, MOV (varies by tool settings)",
    "Audio: MP3, WAV, AAC (varies by tool settings)",
    "Images/GIF: common web-friendly formats (where supported)",
    "Archives: common archive conversions (where supported)",
  ];

  const useCases = [
    {
      title: "Compatibility conversions",
      body: "Convert a file into a format your device, editor, or platform supports.",
    },
    {
      title: "Smaller uploads",
      body: "Use a more efficient format or a lower bitrate/resolution for faster sharing.",
    },
    {
      title: "Workflow standardization",
      body: "Normalize files to one standard format for a team or project.",
    },
    {
      title: "Quick tests",
      body: "Try a conversion before committing to a longer desktop workflow.",
    },
  ];

  const pitfalls = [
    {
      title: "Quality loss is possible",
      body: "Some conversions are lossy (e.g., video/audio compression). If you need a master file, keep your original.",
    },
    {
      title: "Bitrate and resolution trade-offs",
      body: "Lower bitrate/resolution reduces size but can reduce clarity. Use settings that match your use case.",
    },
    {
      title: "Long conversions for large files",
      body: "Large videos take time. If a conversion fails, try a smaller file or a simpler target format first.",
    },
    {
      title: "Sensitive files",
      body: "Media conversion may require processing your file to produce output. Avoid uploading sensitive media unless you trust the workflow for this tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Common media conversions", value: "Yes", note: "Video/audio and other supported formats." },
    { feature: "Batch conversion", value: "Depends", note: "Varies by tool and file size." },
    { feature: "Tunable settings", value: "Yes", note: "Quality presets / codec options (where available)." },
    { feature: "Signup required", value: "No", note: "No account needed." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Media Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Convert media files to a format that works on your device or platform. Pick a target
            format and adjust settings when needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Media files aren’t always compatible across apps and devices. This converter helps you
              switch formats quickly - useful for sharing, editing, and basic compatibility fixes.
            </p>
            <p>
              Converting an e-book instead? Try the{" "}
              <Link href="/ebook-converter" className="underline underline-offset-4 text-foreground">
                e-book converter
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
                alt="Media converter - convert video and audio formats"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <section className="space-y-6" id="formats">
        <SectionHeader
          eyebrow="Support"
          icon={Video}
          title="What you can convert"
          lead="Exact formats depend on the selected options."
        />
        <Card className="p-5">
          <ul className="space-y-2 text-muted-foreground">
            {formats.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-1 text-foreground">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert media"
          lead="Upload, choose a target format, then download."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload file(s)</h3>
            <p className="text-sm text-muted-foreground">
              Larger files take longer to process.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose output format</h3>
            <p className="text-sm text-muted-foreground">
              Pick the format your device/app supports.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download result</h3>
            <p className="text-sm text-muted-foreground">
              Keep your original if quality matters.
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
            <CardDescription>A factual summary of what the converter does.</CardDescription>
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

      <FAQ faqs={getMediaConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a format that works?</h2>
          <p className="text-muted-foreground">
            Convert your file, then download the output format you need.
          </p>
          <ScrollToTopButton>Convert Media →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getMediaConverterFAQs() {
  return [
    {
      question: "Will converting reduce quality?",
      answer:
        "It can. Many conversions are lossy (especially compressed video/audio). Keep your original file if quality matters.",
    },
    {
      question: "Why is my conversion slow?",
      answer:
        "Large files and high-quality settings take longer. Try a smaller file or a simpler target format first if you’re troubleshooting.",
    },
    {
      question: "Which formats are supported?",
      answer:
        "Supported formats depend on tool options and the file type. Pick a target format and the tool will show what’s available.",
    },
    {
      question: "Does the tool store my files?",
      answer:
        "The tool processes your file to produce an output. Avoid uploading sensitive files unless you trust the workflow for this tool.",
    },
  ];
}

registerToolFAQ("media-converter", getMediaConverterFAQs);


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
  Copy,
  Download,
  Image as ImageIcon,
  Lightbulb,
  ListChecks,
  Link as LinkIcon,
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

export function YouTubeThumbnailDownloaderSEOContent() {
  const tool = getToolBySlug("youtube-thumbnail-downloader");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Design references",
      body: "Save a thumbnail as a reference for layout, typography, or color choices (without copying branding).",
    },
    {
      title: "Content audits",
      body: "Collect thumbnails across a channel to review visual consistency over time.",
    },
    {
      title: "Documentation and notes",
      body: "Grab a thumbnail to include in a spec, checklist, or internal doc.",
    },
    {
      title: "Quick preview assets",
      body: "Download multiple sizes (where available) for testing layouts in a CMS or page builder.",
    },
  ];

  const pitfalls = [
    {
      title: "Some videos don’t have MaxRes thumbnails",
      body: "If MaxRes isn’t available, YouTube may only provide HD/SD variants.",
    },
    {
      title: "Private or restricted videos",
      body: "If the video is private, region-blocked, or age-restricted, the thumbnail may not be accessible.",
    },
    {
      title: "Wrong URL or ID",
      body: "Make sure you paste a full YouTube URL or a valid video ID.",
    },
    {
      title: "Copyright and brand usage",
      body: "Only use downloaded thumbnails in ways you’re allowed to. Respect creator rights and platform policies.",
    },
  ];

  const featureChecklist = [
    { feature: "Accepts YouTube URL or video ID", value: "Yes", note: "Paste the link or the ID." },
    { feature: "Multiple thumbnail variants", value: "Yes", note: "MaxRes/HD/SD may vary by video." },
    { feature: "Instant download links", value: "Yes", note: "Download the size you need." },
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
            YouTube Thumbnail Downloader
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Download a YouTube video thumbnail in the best available quality. Paste a video URL or
            ID and grab MaxRes/HD/SD variants when available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tool pulls the thumbnail variants YouTube provides for a video and gives you
              direct download options. It’s useful for content audits, internal docs, and design
              references.
            </p>
            <p>
              Need an embed code for the same video? Try the{" "}
              <Link
                href="/youtube-embed-code-generator"
                className="underline underline-offset-4 text-foreground"
              >
                YouTube embed code generator
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
                alt="YouTube thumbnail downloader — paste video URL and download thumbnail"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="youtube-thumbnail-downloader"
          title="Similar Tools You Might Like"
          description="Other tools for working with YouTube content and assets."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to download a YouTube thumbnail"
          lead="Paste the link, then pick the best available size."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Paste URL or ID</h3>
            <p className="text-sm text-muted-foreground">
              Use a full YouTube link or just the video ID.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Preview sizes</h3>
            <p className="text-sm text-muted-foreground">
              Check which variants exist (MaxRes, HD, SD).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the version that fits your workflow.
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
            <CardDescription>A factual summary of what the downloader does.</CardDescription>
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

      <FAQ faqs={getYouTubeThumbnailDownloaderFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to download a thumbnail?</h2>
          <p className="text-muted-foreground">
            Paste a YouTube video link and grab the best available image.
          </p>
          <ScrollToTopButton>Download Thumbnail →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getYouTubeThumbnailDownloaderFAQs() {
  return [
    {
      question: "What thumbnail quality will I get?",
      answer:
        "You’ll get the best available quality for the video. Some videos have MaxRes, while others only provide HD/SD variants.",
    },
    {
      question: "Can I download thumbnails from private videos?",
      answer:
        "Usually no. If a video is private or restricted, the thumbnail may not be accessible.",
    },
    {
      question: "Do I need a YouTube account to use this?",
      answer: "No. You can use the tool by pasting a video URL or ID.",
    },
    {
      question: "Is it OK to reuse thumbnails?",
      answer:
        "Be careful. Thumbnails can be copyrighted and may include brand assets. Use them only in ways you’re allowed to.",
    },
  ];
}

registerToolFAQ("youtube-thumbnail-downloader", getYouTubeThumbnailDownloaderFAQs);


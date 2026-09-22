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

export function InstagramReelsDownloaderSEOContent() {
  const tool = getToolBySlug("instagram-reels-downloader");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Your own content backups",
      body: "Keep a copy of your own reel for archiving or reposting where allowed.",
    },
    {
      title: "Editing workflows",
      body: "Download a clip you’re allowed to use so you can edit it in your preferred editor.",
    },
    {
      title: "Team review",
      body: "Share a reel internally for feedback when direct sharing links aren’t convenient.",
    },
    {
      title: "Reference and analysis",
      body: "Save a copy for creative reference (style, pacing) without reusing copyrighted assets.",
    },
  ];

  const pitfalls = [
    {
      title: "Private or restricted reels",
      body: "If a reel is private, restricted, or not accessible, downloading may not be possible.",
    },
    {
      title: "Link formats",
      body: "Use a full reel URL. If the link is truncated, the tool may not extract the correct target.",
    },
    {
      title: "Copyright and permissions",
      body: "Only download and reuse content you own or have permission to use. Respect creator rights and platform policies.",
    },
    {
      title: "Sensitive browsing",
      body: "Downloading via third-party tools may involve fetching content based on a link. Avoid using sensitive/private links you’re not authorized to access.",
    },
  ];

  const featureChecklist = [
    { feature: "Reel URL input", value: "Yes", note: "Paste the reel link." },
    { feature: "Downloadable video output", value: "Yes", note: "Quality depends on what’s available." },
    { feature: "No signup required", value: "Yes", note: "No account needed." },
    { feature: "Works for private accounts", value: "No", note: "Private/restricted content may not be accessible." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Instagram Reels Downloader
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Download an Instagram Reel video from a public link. Paste a reel URL and save the video
            for offline viewing or editing workflows where you have permission to use the content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Reels are often shared as links, but sometimes you need an actual file for editing,
              review, or archiving your own content. This tool helps you download the reel video when
              it’s accessible.
            </p>
            <p>
              Need to grab a profile picture (when accessible)? Try{" "}
              <Link
                href="/instagram-private-viewer"
                className="underline underline-offset-4 text-foreground"
              >
                Instagram DP downloader
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
                alt="Instagram reels downloader - paste reel link and download video"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to download a reel"
          lead="Paste the link, then download the file."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Copy the reel link</h3>
            <p className="text-sm text-muted-foreground">
              Use the share option and copy the full reel URL.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Paste into the tool</h3>
            <p className="text-sm text-muted-foreground">
              The tool extracts the media from the link when available.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the file and use it in your workflow.
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

      <FAQ faqs={getInstagramReelsDownloaderFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to download a reel?</h2>
          <p className="text-muted-foreground">
            Paste a public reel link and save the video.
          </p>
          <ScrollToTopButton>Download Reel →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getInstagramReelsDownloaderFAQs() {
  return [
    {
      question: "Can I download reels from private accounts?",
      answer:
        "Usually no. Private or restricted content may not be accessible.",
    },
    {
      question: "Is it legal to download someone else’s reel?",
      answer:
        "Only download and reuse content you own or have permission to use. Respect creator rights and platform policies.",
    },
    {
      question: "Why does the link not work?",
      answer:
        "Make sure you paste the full reel URL. Some shortened or truncated links may not contain enough information.",
    },
    {
      question: "Does the tool store downloaded videos?",
      answer:
        "The tool fetches content based on the link to produce a downloadable file. Avoid using sensitive/private links you’re not authorized to access.",
    },
  ];
}

registerToolFAQ("instagram-reels-downloader", getInstagramReelsDownloaderFAQs);


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
  Code,
  Copy,
  Lightbulb,
  ListChecks,
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

export function YouTubeEmbedCodeGeneratorSEOContent() {
  const tool = getToolBySlug("youtube-embed-code-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Blog posts and docs",
      body: "Generate a clean iframe snippet you can paste into a CMS, markdown wrapper, or HTML page.",
    },
    {
      title: "Responsive embeds",
      body: "Use a responsive wrapper so the video scales nicely on mobile and desktop.",
    },
    {
      title: "Playback behavior",
      body: "Adjust common parameters like autoplay, controls, and start time depending on your page.",
    },
    {
      title: "Internal prototypes",
      body: "Drop an embed into a prototype or staging page without manually building the markup.",
    },
  ];

  const pitfalls = [
    {
      title: "Autoplay restrictions",
      body: "Browsers often block autoplay with sound. Even if you enable autoplay, actual behavior depends on the browser and user settings.",
    },
    {
      title: "Privacy-enhanced mode",
      body: "If you need privacy-enhanced embeds, make sure your chosen embed mode matches your site requirements and policies.",
    },
    {
      title: "Cookie consent and compliance",
      body: "Embedded videos can set cookies or load third-party resources. Use your consent/compliance setup where required.",
    },
    {
      title: "Wrong URL format",
      body: "Paste a full YouTube URL or a valid video ID so the generator can extract the correct identifier.",
    },
  ];

  const featureChecklist = [
    { feature: "Accepts YouTube URL or video ID", value: "Yes", note: "Paste the link or the ID." },
    { feature: "Responsive embed output", value: "Yes", note: "Works better across screen sizes." },
    { feature: "Common player parameters", value: "Yes", note: "Autoplay, controls, start time, etc." },
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
            YouTube Embed Code Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Generate a clean YouTube iframe embed code. Customize common parameters and paste the
            result into your website, blog, or documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Embedding YouTube videos sounds simple until you need responsive sizing, consistent
              parameters, and clean HTML. This generator produces an iframe snippet you can copy and
              paste, with options for common playback settings.
            </p>
            <p>
              Need the video thumbnail too? Try the{" "}
              <Link
                href="/youtube-thumbnail-downloader"
                className="underline underline-offset-4 text-foreground"
              >
                YouTube thumbnail downloader
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
                alt="YouTube embed code generator — generate responsive iframe HTML"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="youtube-embed-code-generator"
          title="Similar Tools You Might Like"
          description="Other tools for working with YouTube content and assets."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to generate a YouTube embed code"
          lead="Paste the video, configure options, then copy HTML."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Paste URL or ID</h3>
            <p className="text-sm text-muted-foreground">
              Use a full YouTube link or a valid video ID.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Configure options</h3>
            <p className="text-sm text-muted-foreground">
              Choose responsive sizing and playback parameters.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Copy and paste</h3>
            <p className="text-sm text-muted-foreground">
              Paste the iframe HTML into your site or CMS.
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
            <CardDescription>A factual summary of what the generator does.</CardDescription>
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

      <FAQ faqs={getYouTubeEmbedCodeGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need an embed code?</h2>
          <p className="text-muted-foreground">
            Generate responsive HTML and paste it into your site.
          </p>
          <ScrollToTopButton>Generate Embed Code →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getYouTubeEmbedCodeGeneratorFAQs() {
  return [
    {
      question: "Is the embed code responsive?",
      answer:
        "The generator can produce a responsive embed wrapper so the video scales across devices. Use that option for modern layouts.",
    },
    {
      question: "Why doesn’t autoplay work?",
      answer:
        "Many browsers block autoplay with sound. Autoplay behavior depends on browser policies and user settings.",
    },
    {
      question: "Do I need to install anything?",
      answer: "No. Paste a URL/ID, configure options, and copy the HTML.",
    },
    {
      question: "Do embedded videos affect privacy/cookies?",
      answer:
        "They can. Embedding third-party content may load external resources and cookies. Use your consent/compliance setup where required.",
    },
  ];
}

registerToolFAQ("youtube-embed-code-generator", getYouTubeEmbedCodeGeneratorFAQs);


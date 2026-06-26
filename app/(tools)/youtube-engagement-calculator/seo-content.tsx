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
  Percent,
  Play,
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

export function YouTubeEngagementCalculatorSEOContent() {
  const tool = getToolBySlug("youtube-engagement-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const metrics = [
    {
      title: "Views baseline",
      body: "YouTube engagement is commonly normalized by views so videos of different sizes can be compared.",
    },
    {
      title: "Likes and comments",
      body: "A common engagement rate uses likes + comments divided by views.",
    },
    {
      title: "Watch time and retention (context)",
      body: "Engagement rate doesn’t capture retention. Use it alongside watch time/average view duration when available.",
    },
    {
      title: "Subscribers vs views",
      body: "Subscriber counts can be misleading for engagement. Views-based formulas are usually more representative for video performance.",
    },
  ];

  const useCases = [
    {
      title: "Video performance audits",
      body: "Compare engagement across videos to spot topics and formats that resonate.",
    },
    {
      title: "Thumbnail/title experiments",
      body: "Measure how engagement changes after you test different hooks and packaging.",
    },
    {
      title: "Channel reporting",
      body: "Summarize interaction strength using a simple percentage for dashboards.",
    },
    {
      title: "Sponsor discussions",
      body: "Provide normalized engagement context alongside views and audience demographics.",
    },
  ];

  const pitfalls = [
    {
      title: "Comparing shorts and long-form",
      body: "Shorts can behave differently from long-form videos. Compare like with like.",
    },
    {
      title: "Small sample sizes",
      body: "A single video can be noisy. Use recent-video averages to get a stable view of channel performance.",
    },
    {
      title: "Ignoring retention",
      body: "A high engagement rate with poor retention may still underperform. Treat engagement rate as one signal.",
    },
    {
      title: "Views inflation by traffic sources",
      body: "External embeds, shorts feed, and suggested traffic can change audience intent - which changes engagement behavior.",
    },
  ];

  const featureChecklist = [
    { feature: "Engagement rate calculation", value: "Yes", note: "Works from the metrics you enter." },
    { feature: "Useful with averages", value: "Yes", note: "Best with multi-video windows." },
    { feature: "Interpretation guidance", value: "Yes", note: "Explains what affects the number." },
    { feature: "Signup required", value: "No", note: "No account needed." },
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
            YouTube Engagement Rate Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Calculate YouTube engagement rate from views, likes, and comments. Great for comparing
            videos and tracking performance over time - best used with averages across a set of
            recent videos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Engagement rate is a simple way to compare interaction strength across videos. It
              normalizes interactions by views so a 5k-view video and a 500k-view video can be
              compared on the same scale.
            </p>
            <p>
              For other platforms, see{" "}
              <Link
                href="/instagram-engagement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                Instagram engagement
              </Link>{" "}
              and{" "}
              <Link
                href="/twitter-engagement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                Twitter/X engagement
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
                alt="YouTube engagement rate calculator - inputs for views, likes and comments"
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
          currentToolSlug="youtube-engagement-calculator"
          title="Similar Tools You Might Like"
          description="Other tools for social performance analysis."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate YouTube engagement rate"
          lead="Use recent-video averages for a stable metric."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick a video set</h3>
            <p className="text-sm text-muted-foreground">
              Use the last 10–20 videos or a defined campaign playlist.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter averages</h3>
            <p className="text-sm text-muted-foreground">
              Add average views, likes, and comments for that set.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Track trends</h3>
            <p className="text-sm text-muted-foreground">
              Compare across months or formats to see what improves engagement.
            </p>
          </Card>
        </div>
      </section>

      {/* Metrics */}
      <section className="space-y-6" id="metrics">
        <SectionHeader eyebrow="Metrics" icon={Sigma} title="What goes into the calculation" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((m) => (
            <Card key={m.title} className="p-5">
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="A common engagement rate formula"
          lead="Keep the definition consistent when comparing."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>A common definition is:</p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Engagement rate (%) = (likes + comments) / views × 100
            </p>
            <p>
              Some teams also include shares or other interactions when available. What matters most
              is that you use the same definition when comparing across videos.
            </p>
          </div>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="When it helps" icon={Sigma} title="Common use cases" />
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
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what the engagement calculator does.
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
        <SectionHeader title="Related calculators" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Instagram engagement rate?{" "}
            <Link
              href="/instagram-engagement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Instagram engagement calculator
            </Link>
            .
          </p>
          <p>
            Facebook engagement rate?{" "}
            <Link
              href="/facebook-engagement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Facebook engagement calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getYouTubeEngagementCalculatorFAQs()} />

      {/* User reviews */}
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
          <h2 className="text-2xl font-bold tracking-tight">Ready to calculate your rate?</h2>
          <p className="text-muted-foreground">
            Use recent-video averages and compare like formats for the best insights.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getYouTubeEngagementCalculatorFAQs() {
  return [
    {
      question: "Is the YouTube engagement calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "What is a good engagement rate on YouTube?",
      answer:
        "It depends on niche, video length, and audience intent. Use your channel’s recent-video average as your most meaningful benchmark.",
    },
    {
      question: "Should I compare Shorts and long-form together?",
      answer:
        "Usually no. Shorts and long-form behave differently. Compare like with like when benchmarking engagement.",
    },
    {
      question: "Does engagement rate include watch time?",
      answer:
        "Not typically. Engagement rate is usually interactions per view. Use it alongside retention and watch time for a fuller picture.",
    },
    {
      question: "Does the tool store my metrics?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("youtube-engagement-calculator", getYouTubeEngagementCalculatorFAQs);


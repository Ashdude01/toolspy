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
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Percent,
  Repeat,
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

export function TwitterEngagementCalculatorSEOContent() {
  const tool = getToolBySlug("twitter-engagement-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const metrics = [
    {
      title: "Likes, reposts, replies",
      body: "Common public interaction signals. Replies often indicate deeper engagement than a like.",
    },
    {
      title: "Impressions vs followers",
      body: "If you have impressions, they’re often the best denominator. Followers-based rates are a proxy.",
    },
    {
      title: "Quotes and bookmarks (if available)",
      body: "Quotes can indicate discussion; bookmarks can indicate long-term value, but they’re not always visible.",
    },
    {
      title: "Tweet-level vs account-level",
      body: "One viral tweet can distort averages. Use a sample of tweets to get a stable rate.",
    },
  ];

  const useCases = [
    {
      title: "Content experiments",
      body: "Compare engagement when you change hooks, formats, or posting times.",
    },
    {
      title: "Account audits",
      body: "Track whether engagement improves as your audience grows.",
    },
    {
      title: "Campaign measurement",
      body: "Normalize performance across different campaigns by using a percentage instead of raw counts.",
    },
    {
      title: "Creator comparisons",
      body: "Compare two accounts using the same formula and similar time window.",
    },
  ];

  const pitfalls = [
    {
      title: "Using a single tweet",
      body: "Rates can swing wildly tweet-to-tweet. Use the last 20–50 tweets (or a defined period) and compute averages.",
    },
    {
      title: "Changing denominators",
      body: "Impressions-based and follower-based formulas aren’t directly comparable. Pick one for your reporting.",
    },
    {
      title: "Comparing different content types",
      body: "Text posts, threads, images, and video can behave differently. Compare like with like when possible.",
    },
    {
      title: "Engagement quality varies",
      body: "A repost or reply may indicate more intent than a like. Use the rate as a trend signal, not the only KPI.",
    },
  ];

  const featureChecklist = [
    { feature: "Engagement rate calculation", value: "Yes", note: "Works from the metrics you enter." },
    { feature: "Works with averages", value: "Yes", note: "Use multi-tweet samples for stability." },
    { feature: "Interpretation guidance", value: "Yes", note: "Explains how to read the number." },
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
            Twitter / X Engagement Rate Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Calculate Twitter/X engagement rate from likes, reposts, and replies using a consistent
            baseline (impressions or followers). Best used with averages across multiple tweets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Engagement rate turns raw interactions into a percentage so you can compare performance
              over time — even when impressions and audience size change.
            </p>
            <p>
              For other platforms, check{" "}
              <Link
                href="/instagram-engagement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                Instagram engagement
              </Link>{" "}
              and{" "}
              <Link
                href="/youtube-engagement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                YouTube engagement
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
                alt="Twitter/X engagement rate calculator — inputs for likes, reposts, replies and impressions"
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
          currentToolSlug="twitter-engagement-calculator"
          title="Similar Tools You Might Like"
          description="Other tools for social performance analysis."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate engagement rate on Twitter/X"
          lead="Use a stable sample and a consistent formula."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Choose a window</h3>
            <p className="text-sm text-muted-foreground">
              Use the last 20–50 tweets or a campaign date range.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter averages</h3>
            <p className="text-sm text-muted-foreground">
              Add average likes, reposts, and replies (and impressions if you have them).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare over time</h3>
            <p className="text-sm text-muted-foreground">
              Track the rate weekly or monthly to evaluate content changes.
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
          lead="Impressions-based is often best when available."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>A common definition is:</p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Engagement rate (%) = (likes + reposts + replies) / impressions × 100
            </p>
            <p>
              If you don’t have impressions, some teams use followers as the denominator. That’s a
              proxy and should be used consistently when comparing.
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
      <FAQ faqs={getTwitterEngagementCalculatorFAQs()} />

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
            Use multi-tweet averages and a consistent denominator for best comparisons.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getTwitterEngagementCalculatorFAQs() {
  return [
    {
      question: "Is the Twitter/X engagement calculator free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup required.",
    },
    {
      question: "Should I use impressions or followers as the denominator?",
      answer:
        "Impressions are often better if you have them. Followers can be used as a proxy, but keep the denominator consistent when comparing.",
    },
    {
      question: "What counts as engagement on Twitter/X?",
      answer:
        "Common signals include likes, reposts/retweets, and replies. Quotes and bookmarks may also matter, but they aren’t always visible or included.",
    },
    {
      question: "Does the tool store my metrics?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "How many tweets should I use for a stable result?",
      answer:
        "Averages across 20–50 tweets (or a defined campaign period) are usually more stable than using a single tweet.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("twitter-engagement-calculator", getTwitterEngagementCalculatorFAQs);


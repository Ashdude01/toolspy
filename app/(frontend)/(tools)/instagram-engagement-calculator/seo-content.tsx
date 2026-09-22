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
  Rocket,
  Sigma,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function InstagramEngagementCalculatorSEOContent() {
  const tool = getToolBySlug("instagram-engagement-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const metrics = [
    {
      title: "Followers / reach baseline",
      body: "Engagement is usually normalized by followers or reach so accounts of different sizes can be compared.",
    },
    {
      title: "Likes and comments",
      body: "A common baseline for engagement rate is likes + comments divided by followers (or reach).",
    },
    {
      title: "Saves and shares (if available)",
      body: "Saves and shares can signal deeper content value, but they aren’t always publicly visible.",
    },
    {
      title: "Post-level vs profile-level",
      body: "A single post can spike engagement; averages across multiple posts are more reliable for benchmarking.",
    },
  ];

  const useCases = [
    {
      title: "Creator audits",
      body: "Check whether your content is trending up or down as you change formats and posting cadence.",
    },
    {
      title: "Brand collaborations",
      body: "Compare two creators on a normalized metric instead of raw likes or follower count.",
    },
    {
      title: "Content experiments",
      body: "Measure engagement before and after changing hooks, captions, or topics.",
    },
    {
      title: "Benchmarking",
      body: "Use engagement rate as one signal to compare against your past performance or a niche baseline.",
    },
  ];

  const pitfalls = [
    {
      title: "Comparing different content types",
      body: "Reels, carousels, and photos can have very different engagement patterns. Compare like with like when possible.",
    },
    {
      title: "Using a single post",
      body: "One viral post can distort the picture. Use averages across multiple recent posts for a more stable view.",
    },
    {
      title: "Follower quality",
      body: "Large follower counts don’t guarantee engagement. Fake or inactive followers can lower rate calculations.",
    },
    {
      title: "Reach vs followers mismatch",
      body: "Follower-based engagement rate can mislead if reach varies heavily. If you have reach, treat it as the better denominator.",
    },
  ];

  const featureChecklist = [
    { feature: "Engagement rate calculation", value: "Yes", note: "Works from the metrics you enter." },
    { feature: "Multiple scenarios", value: "Yes", note: "Try different averages or post samples." },
    { feature: "Explainers & pitfalls", value: "Yes", note: "Helps interpret the number." },
    { feature: "Signup required", value: "No", note: "No account needed." },
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
            Instagram Engagement Rate Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Calculate Instagram engagement rate from followers and interactions. Useful for creators,
            brands, and quick audits - but interpret the number in context (content type, reach, and
            sample size).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Engagement rate is a normalized way to measure how strongly your audience interacts
              with your posts. Instead of raw likes, it helps you compare performance across time or
              across accounts of different sizes.
            </p>
            <p>
              If you’re checking other platforms too, you can also use{" "}
              <Link
                href="/facebook-engagement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                Facebook engagement
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
                alt="Instagram engagement rate calculator - inputs for followers, likes and comments"
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
          title="How to calculate Instagram engagement rate"
          lead="Use averages from recent posts for a stable result."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Choose a sample</h3>
            <p className="text-sm text-muted-foreground">
              Use the last 10–20 posts, or a defined campaign window.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Add averages</h3>
            <p className="text-sm text-muted-foreground">
              Enter average likes and comments (and other metrics if the tool supports them).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Read the rate</h3>
            <p className="text-sm text-muted-foreground">
              Compare against your past averages, not just a generic benchmark.
            </p>
          </Card>
        </div>
      </section>

      {/* Metrics */}
      <section className="space-y-6" id="metrics">
        <SectionHeader eyebrow="Metrics" icon={Sigma} title="What goes into engagement rate" />
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
          lead="Different teams use different denominators - be consistent."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              A common definition is:
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Engagement rate (%) = (likes + comments) / followers × 100
            </p>
            <p>
              If you have reach or impressions, some teams prefer dividing by reach instead of
              followers to better reflect what people actually saw.
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
            Facebook engagement rate?{" "}
            <Link
              href="/facebook-engagement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Facebook engagement calculator
            </Link>
            .
          </p>
          <p>
            YouTube engagement rate?{" "}
            <Link
              href="/youtube-engagement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              YouTube engagement calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getInstagramEngagementCalculatorFAQs()} />

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
            Use recent-post averages for the most reliable result.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getInstagramEngagementCalculatorFAQs() {
  return [
    {
      question: "Is the Instagram engagement calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "What is a good engagement rate on Instagram?",
      answer:
        "It depends on niche, content type, and account size. Use your own historical average (last 10–20 posts) as your most useful benchmark.",
    },
    {
      question: "Should I use followers or reach as the denominator?",
      answer:
        "If you have reach/impressions, using reach can be more representative. If not, followers-based rate is a common proxy - just be consistent.",
    },
    {
      question: "Does the tool store my metrics?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "Can I compare Reels and photo posts with the same rate?",
      answer:
        "You can, but it’s best to compare similar formats. Reels and photos often have very different interaction patterns.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("instagram-engagement-calculator", getInstagramEngagementCalculatorFAQs);


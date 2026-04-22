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
  Rocket,
  Sigma,
  ThumbsUp,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function FacebookEngagementCalculatorSEOContent() {
  const tool = getToolBySlug("facebook-engagement-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const metrics = [
    {
      title: "Reactions, comments, shares",
      body: "These are the most common visible interaction signals. Shares usually indicate strong content resonance.",
    },
    {
      title: "Reach vs followers",
      body: "If you have reach, use it. If not, page likes/followers can be used as a proxy denominator (less precise).",
    },
    {
      title: "Post averages",
      body: "Engagement rate is more useful when calculated on averages across a set of recent posts.",
    },
    {
      title: "Content type differences",
      body: "Video, link posts, and images can behave differently. Compare similar post types when benchmarking.",
    },
  ];

  const useCases = [
    {
      title: "Page health checks",
      body: "Track whether engagement is improving as you change posting frequency and content themes.",
    },
    {
      title: "Campaign measurement",
      body: "Compare engagement across campaigns using normalized metrics instead of raw counts.",
    },
    {
      title: "A/B content experiments",
      body: "Test hooks, thumbnails, and post formats and see how the rate shifts over time.",
    },
    {
      title: "Reporting",
      body: "Summarize performance in a simple percentage for internal dashboards or client reports.",
    },
  ];

  const pitfalls = [
    {
      title: "Using only one post",
      body: "A single post can spike or flop. Use a sample of posts (for example, last 10–20) for stability.",
    },
    {
      title: "Mixing denominators",
      body: "If you switch between reach-based and follower-based formulas, rates aren’t comparable. Pick one and stay consistent.",
    },
    {
      title: "Boosted posts vs organic",
      body: "Paid distribution changes reach and engagement patterns. Compare organic with organic where possible.",
    },
    {
      title: "Engagement quality varies",
      body: "Not all engagement is equal. A share often signals stronger intent than a reaction, but totals still matter for trends.",
    },
  ];

  const featureChecklist = [
    { feature: "Engagement rate calculation", value: "Yes", note: "Works from the metrics you enter." },
    { feature: "Scenario testing", value: "Yes", note: "Try different post averages or windows." },
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
            Facebook Engagement Rate Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Calculate Facebook engagement rate from reactions, comments, shares and your chosen
            baseline (reach or followers). Best used with averages across a set of recent posts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Engagement rate helps you compare performance across posts and time periods. It turns
              raw interactions into a percentage so you can track trends even as reach changes.
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
                alt="Facebook engagement rate calculator — inputs for reactions, comments and shares"
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
          currentToolSlug="facebook-engagement-calculator"
          title="Similar Tools You Might Like"
          description="Other tools for social performance analysis."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate Facebook engagement rate"
          lead="Use a consistent formula and a stable sample."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick a sample window</h3>
            <p className="text-sm text-muted-foreground">
              Use a recent batch of posts (for example, last 10–20) or a campaign range.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter averages</h3>
            <p className="text-sm text-muted-foreground">
              Add average reactions, comments, and shares for that window.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare over time</h3>
            <p className="text-sm text-muted-foreground">
              Track the rate month-to-month to see if changes help.
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
          lead="Pick a denominator (reach or followers) and stick to it."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              A common definition is:
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Engagement rate (%) = (reactions + comments + shares) / reach × 100
            </p>
            <p>
              If you don’t have reach, some teams use followers/page likes as the denominator. That’s
              less precise but can still be useful for tracking trends over time.
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
            Twitter/X engagement rate?{" "}
            <Link
              href="/twitter-engagement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Twitter/X engagement calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getFacebookEngagementCalculatorFAQs()} />

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
            Use a recent-post average for the most useful result.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getFacebookEngagementCalculatorFAQs() {
  return [
    {
      question: "Is the Facebook engagement calculator free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup required.",
    },
    {
      question: "Should I use reach or followers as the denominator?",
      answer:
        "Reach is usually better if you have it. If not, followers/page likes can be used as a proxy — just stay consistent for comparisons.",
    },
    {
      question: "What interactions count as engagement on Facebook?",
      answer:
        "Common signals include reactions, comments, and shares. Some teams also include clicks, but those aren’t always publicly visible.",
    },
    {
      question: "Does the tool store my metrics?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "Can paid boosts affect engagement rate?",
      answer:
        "Yes. Boosted posts change reach and audience mix, so rates may not be comparable to organic posts. Compare boosted with boosted where possible.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("facebook-engagement-calculator", getFacebookEngagementCalculatorFAQs);


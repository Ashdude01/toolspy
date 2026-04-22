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
  GraduationCap,
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

export function JEEMainRankPredictorSEOContent() {
  const tool = getToolBySlug("jee-main-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Percentile vs score",
      body: "Percentile is relative to all test-takers; ranks are derived from percentile distribution and participation.",
    },
    {
      title: "Session normalization",
      body: "If the exam is held in multiple sessions, normalization can affect percentile and rank estimates.",
    },
    {
      title: "Category and quota",
      body: "Cutoffs and college options can differ by category, home state quota, and counselling rules.",
    },
    {
      title: "Year-to-year variation",
      body: "Competition, paper difficulty, and seat matrices change each year, so use estimates for planning only.",
    },
  ];

  const pitfalls = [
    {
      title: "Treating estimates as final",
      body: "Use the predictor to plan your next steps, but rely on official counselling data for final decisions.",
    },
    {
      title: "Incorrect inputs",
      body: "If percentile/category values are wrong, the rank/college suggestions will be wrong too.",
    },
    {
      title: "Ignoring counselling rules",
      body: "Seat allocation depends on counselling, preferences, and eligibility. A rank alone doesn’t guarantee a seat.",
    },
    {
      title: "Overfocusing on one college list",
      body: "Use the output as a shortlist starter, then cross-check with official cutoffs and your preferences.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank estimate from percentile", value: "Yes", note: "For planning and shortlisting." },
    { feature: "College option shortlist", value: "Yes", note: "Use as a starting point; verify cutoffs." },
    { feature: "Category support", value: "Yes", note: "Cutoffs vary by category/quota." },
    { feature: "Official results", value: "No", note: "Always follow NTA/JoSAA official data." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            JEE Main Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate your JEE Main rank from percentile and explore college options for planning.
            Estimates vary by year, category, and counselling rules — always verify with official
            cutoffs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tool is meant for shortlisting and planning: get a rough rank band and use it to
              build a preference list, decide next steps, or compare scenarios.
            </p>
            <p>
              Preparing for JEE Advanced too? Try the{" "}
              <Link
                href="/jee-advanced-rank-predictor"
                className="underline underline-offset-4 text-foreground"
              >
                JEE Advanced rank predictor
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
                alt="JEE Main rank predictor — estimate rank and explore college options"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="jee-main-rank-predictor"
          title="Similar Tools You Might Like"
          description="Other exam predictors and planning tools."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the rank predictor"
          lead="Enter percentile and options, then review rank bands and suggestions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter your percentile</h3>
            <p className="text-sm text-muted-foreground">
              Use your official percentile for the session/year.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Select category/quota</h3>
            <p className="text-sm text-muted-foreground">
              Cutoffs and options change by category and counselling rules.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Review and shortlist</h3>
            <p className="text-sm text-muted-foreground">
              Use results to shortlist, then verify with official cutoffs.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects JEE Main rank and college options"
          lead="Why estimates can differ from year to year."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factors.map((x) => (
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
            <CardDescription>A factual summary of what the predictor provides.</CardDescription>
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

      <FAQ faqs={getJEEMainRankPredictorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to estimate your rank?</h2>
          <p className="text-muted-foreground">
            Use the predictor to shortlist options, then confirm with official cutoffs.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getJEEMainRankPredictorFAQs() {
  return [
    {
      question: "Is this my final JEE Main rank?",
      answer:
        "No. This is an estimate for planning. Your final rank and seat allocation depend on official results and counselling.",
    },
    {
      question: "Why can the estimate vary by year?",
      answer:
        "Participation, difficulty, normalization, and seat matrices change year to year, which affects rank distributions and cutoffs.",
    },
    {
      question: "Should I rely on the college list shown here?",
      answer:
        "Use it as a shortlist starter, then verify with official cutoff data and counselling rules for your category and quota.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("jee-main-rank-predictor", getJEEMainRankPredictorFAQs);


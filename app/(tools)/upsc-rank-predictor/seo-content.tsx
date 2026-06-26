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

export function UPSCRankPredictorSEOContent() {
  const tool = getToolBySlug("upsc-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Stage-wise evaluation",
      body: "Final rank depends on Mains + Interview (and the official rules for that year).",
    },
    {
      title: "Optional subject dynamics",
      body: "Optional marks can vary widely. Any predictor is only as good as the assumptions you enter.",
    },
    {
      title: "Year-to-year variation",
      body: "Difficulty, scaling, and candidate performance distributions change each year.",
    },
    {
      title: "Service allocation rules",
      body: "Service allocation depends on rank, category, preferences, eligibility, and vacancies.",
    },
  ];

  const pitfalls = [
    {
      title: "Treating it as a final rank",
      body: "Use this for planning only. Official results and allocation are published by UPSC/government.",
    },
    {
      title: "Using unrealistic mark assumptions",
      body: "Small changes in assumptions can change the predicted band significantly. Try multiple scenarios.",
    },
    {
      title: "Ignoring vacancies and preferences",
      body: "Service outcomes depend on vacancies and your preference order, not just your rank.",
    },
    {
      title: "Overconfidence before final results",
      body: "Use the tool to plan, but keep expectations realistic until official lists are out.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank band estimate", value: "Yes", note: "For planning and scenario testing." },
    { feature: "Service option exploration", value: "Yes", note: "Use as a starting point; verify rules." },
    { feature: "Multiple scenarios", value: "Yes", note: "Try different marks assumptions." },
    { feature: "Official results", value: "No", note: "Always rely on official UPSC results/allocation." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            UPSC Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate a UPSC rank band from your marks assumptions and explore service allocation
            possibilities for planning. Results depend on official rules, vacancies, and year-to-year
            variation - verify with official lists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              UPSC outcomes depend on multiple stages and official allocation rules. This tool is
              useful for scenario planning: try different marks assumptions to see how outcomes might
              shift, then plan your next steps accordingly.
            </p>
            <p>
              Checking SSC CGL too? Try the{" "}
              <Link href="/ssc-cgl-rank-predictor" className="underline underline-offset-4 text-foreground">
                SSC CGL rank predictor
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
                alt="UPSC rank predictor - estimate rank band and explore service options"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="upsc-rank-predictor"
          title="Similar Tools You Might Like"
          description="Other exam predictors and planning tools."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the predictor"
          lead="Enter marks assumptions, then review rank bands and options."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter your marks assumptions</h3>
            <p className="text-sm text-muted-foreground">
              Use realistic ranges and try multiple scenarios.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Review rank band</h3>
            <p className="text-sm text-muted-foreground">
              Treat outputs as planning ranges, not exact ranks.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Explore service outcomes</h3>
            <p className="text-sm text-muted-foreground">
              Use it to understand how preferences and vacancies might matter.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects UPSC rank and service allocation"
          lead="Why estimates are uncertain and why they vary."
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

      <FAQ faqs={getUPSCRankPredictorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Want to test scenarios?</h2>
          <p className="text-muted-foreground">
            Try a couple of mark assumptions and compare how rank bands shift.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getUPSCRankPredictorFAQs() {
  return [
    {
      question: "Is this my final UPSC rank?",
      answer:
        "No. This is a scenario-based estimate for planning. Official ranks and allocations are published by UPSC/government.",
    },
    {
      question: "Why is UPSC prediction uncertain?",
      answer:
        "Multiple stages, year-to-year variation, and official rules/allocations make exact prediction difficult. Use rank bands, not exact ranks.",
    },
    {
      question: "Does the service list guarantee allocation?",
      answer:
        "No. Allocation depends on rank, category, preferences, eligibility, and vacancies.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("upsc-rank-predictor", getUPSCRankPredictorFAQs);


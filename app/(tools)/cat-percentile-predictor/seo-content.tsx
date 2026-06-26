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

export function CATPercentilePredictorSEOContent() {
  const tool = getToolBySlug("cat-percentile-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Normalization and scaling",
      body: "CAT scores are normalized across slots. Percentile estimates can shift based on scaling details.",
    },
    {
      title: "Sectional performance",
      body: "Percentile is affected by overall and sectional scores; many institutes have sectional cutoffs too.",
    },
    {
      title: "Year-to-year competition",
      body: "Candidate count and performance distribution change each year, moving percentile mapping.",
    },
    {
      title: "Institute-specific cutoffs",
      body: "Calls depend on category, academics, work experience, and institute criteria beyond CAT percentile alone.",
    },
  ];

  const pitfalls = [
    {
      title: "Treating it as a final percentile",
      body: "Use this as a planning estimate. Official percentiles depend on the final normalization and results.",
    },
    {
      title: "Ignoring sectionals",
      body: "A strong overall percentile can still miss a sectional cutoff. Check both.",
    },
    {
      title: "Assuming a call equals conversion",
      body: "Shortlists and final admits depend on multiple stages (WAT/PI), profiles, and criteria.",
    },
    {
      title: "Using only one year of cutoffs",
      body: "Cutoffs and call patterns change. Compare multiple years and keep backup targets.",
    },
  ];

  const featureChecklist = [
    { feature: "Percentile estimate from score inputs", value: "Yes", note: "For planning and shortlisting." },
    { feature: "Section-aware planning", value: "Yes", note: "Sectionals can matter; consider both." },
    { feature: "Institute shortlist", value: "Yes", note: "Use as a starter; verify criteria." },
    { feature: "Official results", value: "No", note: "Always rely on official CAT results and institute criteria." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            CAT Percentile Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate your CAT percentile from your score and use it to shortlist MBA programs.
            Percentiles vary by normalization, year, and category - verify with official results and
            institute criteria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tool is for planning: get a rough percentile band, then use it to build a target
              list and compare scenarios. Treat the output as an estimate until official results are
              published.
            </p>
            <p>
              Planning government exam ranks too? Try the{" "}
              <Link
                href="/ssc-cgl-rank-predictor"
                className="underline underline-offset-4 text-foreground"
              >
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
                alt="CAT percentile predictor - estimate percentile and shortlist MBA programs"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="cat-percentile-predictor"
          title="Similar Tools You Might Like"
          description="Other exam predictors and planning tools."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the percentile predictor"
          lead="Enter score inputs, then review percentile band and shortlist."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter your score(s)</h3>
            <p className="text-sm text-muted-foreground">
              Use your best estimate or official scaled score.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Review overall + sectionals</h3>
            <p className="text-sm text-muted-foreground">
              Sectional cutoffs can matter for calls.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Build a balanced shortlist</h3>
            <p className="text-sm text-muted-foreground">
              Use the output to shortlist, then verify with institute criteria.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects CAT percentile and calls"
          lead="Why estimates and cutoffs move."
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

      <FAQ faqs={getCATPercentilePredictorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to estimate your percentile?</h2>
          <p className="text-muted-foreground">
            Use the estimate for planning, then verify with official results and institute criteria.
          </p>
          <ScrollToTopButton>Predict Percentile →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getCATPercentilePredictorFAQs() {
  return [
    {
      question: "Is this my official CAT percentile?",
      answer:
        "No. This is an estimate for planning. Official percentiles depend on final normalization and results.",
    },
    {
      question: "Do sectional scores matter?",
      answer:
        "Yes. Many institutes have sectional cutoffs. Consider both overall and sectional performance when planning.",
    },
    {
      question: "Does a predicted percentile guarantee an IIM call?",
      answer:
        "No. Calls depend on category, academics, work experience, and institute-specific criteria in addition to percentile.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("cat-percentile-predictor", getCATPercentilePredictorFAQs);


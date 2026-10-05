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
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function SSCCGLRankPredictorSEOContent() {
  const tool = getToolBySlug("ssc-cgl-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Stage and tier structure",
      body: "SSC CGL has multiple stages. Final outcomes depend on official rules and performance across tiers.",
    },
    {
      title: "Normalization",
      body: "Scores may be normalized across shifts. Rank estimates depend on how normalization is applied.",
    },
    {
      title: "Category and cutoffs",
      body: "Cutoffs differ by category and sometimes by post preferences and eligibility.",
    },
    {
      title: "Vacancies and post allocation",
      body: "Post allocation depends on vacancies, your preference order, and final merit lists.",
    },
  ];

  const pitfalls = [
    {
      title: "Treating it as an official rank",
      body: "Use this for planning. Official ranks and allocations are published by SSC.",
    },
    {
      title: "Ignoring eligibility",
      body: "Posts have eligibility requirements. A rank band doesn’t guarantee a post if eligibility doesn’t match.",
    },
    {
      title: "Over-optimism on close cutoffs",
      body: "When cutoffs are tight, small shifts can change outcomes. Keep backup options and preferences.",
    },
    {
      title: "Not checking updated vacancies",
      body: "Vacancy updates can change post allocation and closing ranks.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank band estimate", value: "Yes", note: "For planning and shortlisting." },
    { feature: "Post option exploration", value: "Yes", note: "Use as a starting point; verify eligibility and cutoffs." },
    { feature: "Category-aware planning", value: "Yes", note: "Cutoffs differ by category." },
    { feature: "Official results", value: "No", note: "Always rely on official SSC lists and notifications." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            SSC CGL Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate an SSC CGL rank band from your score assumptions and explore post options for
            planning. Results vary by normalization, vacancies, and official rules - verify with SSC
            notifications and merit lists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this tool to plan: compare scenarios, build a preference list, and understand how
              close you might be to a cutoff band. Treat it as an estimate, not an official outcome.
            </p>
            <p>
              Checking banking exams too? Try the{" "}
              <Link
                href="/bank-po-rank-predictor"
                className="underline underline-offset-4 text-foreground"
              >
                Bank PO rank predictor
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
                alt="SSC CGL rank predictor - estimate rank band and explore post options"
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
          title="How to use the predictor"
          lead="Enter score assumptions, then review rank bands and options."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter score assumptions</h3>
            <p className="text-sm text-muted-foreground">
              Use realistic numbers and try multiple scenarios.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose category</h3>
            <p className="text-sm text-muted-foreground">
              Cutoffs and options differ by category.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Explore posts</h3>
            <p className="text-sm text-muted-foreground">
              Use the output to build preferences, then verify with official data.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects SSC CGL ranks and posts"
          lead="Why estimates are uncertain and why cutoffs shift."
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

      <section className="space-y-6" id="marks-vs-rank">
        <SectionHeader
          eyebrow="Data"
          icon={Sigma}
          title="SSC CGL marks vs rank - indicative bands"
          lead="Historical, indicative bands to sanity-check your estimate. Actual ranks depend on normalization, vacancies, and that cycle's merit list."
        />
        <Card>
          <CardHeader>
            <CardTitle>Indicative normalized score to rank bands (UR)</CardTitle>
            <CardDescription>
              Compiled from publicly discussed results of recent SSC CGL cycles. Use for planning
              only - always verify with official SSC publications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Normalized Score Band (Tier 2)</th>
                    <th className="text-left p-3 font-medium">Indicative Rank Band</th>
                    <th className="text-left p-3 font-medium">Post Outlook</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["370+", "Top 500", "AAO, ASO (MEA/CSS) realistic"],
                    ["350–370", "500 – 3,000", "ASO, Inspector (CBIC/CBDT) possible"],
                    ["330–350", "3,000 – 10,000", "Auditor, Accountant, Inspector (lower preference)"],
                    ["310–330", "10,000 – 25,000", "UDC / Tax Assistant band"],
                    ["Below 310", "25,000+", "Depends heavily on category and vacancies"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Want the full explanation of normalization and category cutoff trends? Read our{" "}
              <Link
                href="/blog/ssc-cgl-marks-vs-rank-analysis/"
                className="underline underline-offset-4 text-foreground"
              >
                SSC CGL marks vs rank analysis
              </Link>
              .
            </p>
          </CardContent>
        </Card>
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

      <FAQ faqs={getSSCCGLRankPredictorFAQs()} />

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
            Try a couple of score assumptions and compare how the rank band shifts.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getSSCCGLRankPredictorFAQs() {
  return [
    {
      question: "Is this my official SSC CGL rank?",
      answer:
        "No. This is an estimate for planning. Official ranks and post allocations are published by SSC.",
    },
    {
      question: "Why is SSC CGL prediction uncertain?",
      answer:
        "Normalization, vacancies, stage-wise rules, and year-to-year variation can shift cutoffs and outcomes.",
    },
    {
      question: "Does the post list guarantee allocation?",
      answer:
        "No. Allocation depends on final merit, preferences, eligibility, and vacancies.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("ssc-cgl-rank-predictor", getSSCCGLRankPredictorFAQs);


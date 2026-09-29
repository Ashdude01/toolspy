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

export function BankPORankPredictorSEOContent() {
  const tool = getToolBySlug("bank-po-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Stage-wise selection",
      body: "Final merit depends on multiple stages (prelims/mains/interview) and official weighting for that year.",
    },
    {
      title: "Normalization",
      body: "If multiple shifts are used, normalization can affect final marks and rank mapping.",
    },
    {
      title: "Category and cutoffs",
      body: "Cutoffs differ by category and can vary by bank and vacancy distribution.",
    },
    {
      title: "Vacancies and preferences",
      body: "Allocation depends on vacancies, preferences, and official merit lists.",
    },
  ];

  const pitfalls = [
    {
      title: "Treating the output as final",
      body: "Use the estimate for planning only. Official results and allocations are published by the exam body/banks.",
    },
    {
      title: "Incorrect inputs",
      body: "If score or category inputs are wrong, the estimate will be misleading.",
    },
    {
      title: "Ignoring stage weights",
      body: "Different stages can have different weights. A strong prelims doesn’t guarantee a final outcome.",
    },
    {
      title: "Not checking vacancy updates",
      body: "Vacancy changes can shift cutoffs and allocation outcomes.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank band estimate", value: "Yes", note: "For planning and shortlisting." },
    { feature: "Bank/option exploration", value: "Yes", note: "Use as a starting point; verify official cutoffs." },
    { feature: "Category-aware planning", value: "Yes", note: "Cutoffs vary by category." },
    { feature: "Official results", value: "No", note: "Always rely on official merit lists and notifications." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Bank PO Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate a Bank PO rank band from your score assumptions and explore likely options for
            planning. Outcomes depend on stage weights, vacancies, and official cutoffs - verify with
            official lists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tool helps with scenario planning: enter realistic assumptions and see a rough
              band for where you might stand. Use it to plan next steps and preference choices, then
              confirm using official notifications.
            </p>
            <p>
              Interested in SSC CGL too? See the{" "}
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
                alt="Bank PO rank predictor - estimate rank band and explore options"
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
            <h3 className="font-semibold mb-1">1. Enter your score assumptions</h3>
            <p className="text-sm text-muted-foreground">
              Try a couple of scenarios (conservative vs optimistic).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Select category</h3>
            <p className="text-sm text-muted-foreground">
              Cutoffs differ by category and year.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Plan and verify</h3>
            <p className="text-sm text-muted-foreground">
              Use results for planning, then verify with official cutoffs.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects Bank PO ranks and allocation"
          lead="Why predictions are uncertain."
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

      <section className="space-y-6" id="score-vs-outcome">
        <SectionHeader
          eyebrow="Data"
          icon={Sigma}
          title="Bank PO mains score vs outcome - indicative picture"
          lead="IBPS PO final selection = Mains (80% weight) + Interview (20%). Bands below reflect recent publicly discussed IBPS PO trends; SBI PO patterns differ."
        />
        <Card>
          <CardHeader>
            <CardTitle>Indicative IBPS PO final composite score to outcome</CardTitle>
            <CardDescription>
              Estimates for planning only - cutoffs move with vacancies, difficulty, and category each year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Final Composite (of 100)</th>
                    <th className="text-left p-3 font-medium">Indicative Outcome (UR)</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["55+", "Selection highly likely", "Comfortable margin over recent cutoffs"],
                    ["50 – 55", "Competitive zone", "Recent UR cutoffs often fall in/near this band"],
                    ["45 – 50", "Borderline", "Depends on vacancies; category candidates stronger here"],
                    ["40 – 45", "Reserve list possibility", "Category-dependent; keep parallel exams active"],
                    ["Below 40", "Unlikely (UR)", "Focus on next attempt / other exams"]
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

      <FAQ faqs={getBankPORankPredictorFAQs()} />

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
            Try different score assumptions and compare how the rank band shifts.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getBankPORankPredictorFAQs() {
  return [
    {
      question: "Is this my official Bank PO rank?",
      answer:
        "No. This is an estimate for planning. Official results and allocations are published by the exam body/banks.",
    },
    {
      question: "Why is Bank PO prediction uncertain?",
      answer:
        "Stage weights, normalization, vacancies, and year-to-year variation can shift cutoffs and outcomes.",
    },
    {
      question: "Does the list guarantee allocation to a bank/post?",
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

registerToolFAQ("bank-po-rank-predictor", getBankPORankPredictorFAQs);


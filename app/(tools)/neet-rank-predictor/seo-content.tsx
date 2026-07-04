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
  Stethoscope,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function NEETRankPredictorSEOContent() {
  const tool = getToolBySlug("neet-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Score distribution",
      body: "Rank is derived from how many candidates scored above you. The same score can map to different ranks in different years.",
    },
    {
      title: "Tie-breaking rules",
      body: "When many students have similar scores, tie-break criteria can shift rank positions.",
    },
    {
      title: "Category and state quota",
      body: "Cutoffs and college options differ by category and state quota rules in counselling.",
    },
    {
      title: "Seat matrix changes",
      body: "College availability and seat matrices can change, which affects admission probability at a given rank.",
    },
  ];

  const pitfalls = [
    {
      title: "Using it as an admission guarantee",
      body: "This is a planning tool. Actual admission depends on counselling, eligibility, preferences, and official cutoffs.",
    },
    {
      title: "Ignoring category/state context",
      body: "A college option list is only meaningful when category and quota context match your case.",
    },
    {
      title: "Over-optimism on tight cutoffs",
      body: "Close calls can swing due to year-to-year variation. Build a balanced preference list with backups.",
    },
    {
      title: "Not cross-checking official sources",
      body: "Always verify final cutoffs and counselling schedules from official bodies.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank estimate from score", value: "Yes", note: "For planning and shortlisting." },
    { feature: "College option shortlist", value: "Yes", note: "Use as a starting point; verify cutoffs." },
    { feature: "Category support", value: "Yes", note: "Cutoffs vary by category/quota." },
    { feature: "Official results", value: "No", note: "Always follow official counselling data." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            NEET Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate your NEET rank from score and explore college options for planning. Results can
            vary by year, tie-break rules, category, and counselling - verify with official cutoffs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this predictor to understand a rough rank band and to shortlist colleges. It’s
              most helpful right after you have a score estimate or official score and want to plan
              for counselling and next steps.
            </p>
            <p>
              Planning other exams too? You can also check the{" "}
              <Link href="/gate-rank-predictor" className="underline underline-offset-4 text-foreground">
                GATE rank predictor
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
                alt="NEET rank predictor - estimate rank and explore medical college options"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="neet-rank-predictor"
          title="Similar Tools You Might Like"
          description="Other exam predictors and planning tools."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the rank predictor"
          lead="Enter score and options, then review rank bands and suggestions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter your score</h3>
            <p className="text-sm text-muted-foreground">
              Use your official score (or best estimate) for the year.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Select category/quota</h3>
            <p className="text-sm text-muted-foreground">
              Options differ by category and counselling rules.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Shortlist and verify</h3>
            <p className="text-sm text-muted-foreground">
              Use results to shortlist, then verify with official cutoffs.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={Stethoscope}
          title="What affects NEET rank and admissions"
          lead="Why estimates can differ and why cutoffs vary."
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
          title="NEET marks vs rank - indicative bands"
          lead="Approximate AIR bands from recent NEET cycles (~20+ lakh candidates). Paper difficulty and candidate pool shift these bands every year."
        />
        <Card>
          <CardHeader>
            <CardTitle>Indicative NEET marks to All India Rank</CardTitle>
            <CardDescription>
              Estimates for planning only - verify with official NTA results and counselling data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Marks (out of 720)</th>
                    <th className="text-left p-3 font-medium">Indicative AIR Band</th>
                    <th className="text-left p-3 font-medium">Outlook</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["700+", "Top ~150", "Top government MBBS anywhere"],
                    ["680 – 700", "~150 – 2,000", "Top government colleges realistic"],
                    ["650 – 680", "~2,000 – 12,000", "Government MBBS strong chance (UR)"],
                    ["600 – 650", "~12,000 – 50,000", "Government MBBS via state quota / category"],
                    ["550 – 600", "~50,000 – 1.2 lakh", "State quota, deemed universities, BDS"],
                    ["500 – 550", "~1.2 – 2 lakh", "Category seats, private colleges, AYUSH options"]
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

      <FAQ faqs={getNEETRankPredictorFAQs()} />

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
            Use the predictor to plan and shortlist, then confirm with official counselling data.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getNEETRankPredictorFAQs() {
  return [
    {
      question: "Is this my final NEET rank?",
      answer:
        "No. This is an estimate for planning. Final rank and seat allocation depend on official results and counselling.",
    },
    {
      question: "Why can the same score map to different ranks in different years?",
      answer:
        "Because participation and score distribution vary each year. Tie-break rules and seat availability can also change.",
    },
    {
      question: "Should I trust the college list shown?",
      answer:
        "Use it as a shortlist starter. Verify using official cutoffs and counselling rules for your category and quota.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("neet-rank-predictor", getNEETRankPredictorFAQs);


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

export function GATERankPredictorSEOContent() {
  const tool = getToolBySlug("gate-rank-predictor");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const factors = [
    {
      title: "Paper and discipline",
      body: "Rank distributions differ by paper/discipline. Always select the correct subject/paper.",
    },
    {
      title: "Score normalization",
      body: "For some papers, normalized score and scaling can influence rank mapping.",
    },
    {
      title: "Cutoffs change each year",
      body: "Competition and seat availability can shift closing ranks even at similar scores.",
    },
    {
      title: "Admission rules vary by institute",
      body: "PSUs, IITs, NITs and other institutes can have different eligibility, rounds, and weights.",
    },
  ];

  const pitfalls = [
    {
      title: "Wrong paper selection",
      body: "If you choose the wrong discipline/paper, the rank band can be misleading.",
    },
    {
      title: "Treating the college list as final",
      body: "Use it for shortlisting and planning. Verify with official institute cutoffs and admission rules.",
    },
    {
      title: "Ignoring category/reservation context",
      body: "Cutoffs and options vary by category and institute policies.",
    },
    {
      title: "Overlooking non-rank criteria",
      body: "Some admissions include interviews or additional criteria. Rank alone may not decide the outcome.",
    },
  ];

  const featureChecklist = [
    { feature: "Rank estimate from score", value: "Yes", note: "For planning and shortlisting." },
    { feature: "Institute option shortlist", value: "Yes", note: "Use as a starting point; verify cutoffs." },
    { feature: "Subject/paper support", value: "Yes", note: "Select the correct discipline." },
    { feature: "Official results", value: "No", note: "Always follow official admissions/cutoffs." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            GATE Rank Predictor
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate your GATE rank from score and explore institute options for planning. Results
            vary by discipline, category, and year - verify with official cutoffs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This predictor helps you understand a rough rank band for your paper and build a
              shortlist of programs. Use it to plan preference lists and next steps, not as a final
              admission result.
            </p>
            <p>
              Planning for other exams too? You can also check the{" "}
              <Link href="/cat-percentile-predictor" className="underline underline-offset-4 text-foreground">
                CAT percentile predictor
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
                alt="GATE rank predictor - estimate rank and explore institute options"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="gate-rank-predictor"
          title="Similar Tools You Might Like"
          description="Other exam predictors and planning tools."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the predictor"
          lead="Enter score and paper, then review rank bands and suggestions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter your score</h3>
            <p className="text-sm text-muted-foreground">
              Use your official score (or best estimate) for the year.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose the paper</h3>
            <p className="text-sm text-muted-foreground">
              Select the correct discipline/paper to match distributions.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Shortlist and verify</h3>
            <p className="text-sm text-muted-foreground">
              Use outputs to shortlist, then verify with official cutoffs.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="factors">
        <SectionHeader
          eyebrow="Understanding"
          icon={GraduationCap}
          title="What affects GATE rank and admissions"
          lead="Why estimates can differ and why cutoffs move."
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

      <FAQ faqs={getGATERankPredictorFAQs()} />

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
            Use the estimate for planning, then verify with official admission cutoffs.
          </p>
          <ScrollToTopButton>Predict Rank →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getGATERankPredictorFAQs() {
  return [
    {
      question: "Is this my final GATE rank?",
      answer:
        "No. This is an estimate for planning. Final ranks and cutoffs depend on official results and admissions.",
    },
    {
      question: "Why do I need to select the correct paper/discipline?",
      answer:
        "Rank distributions and cutoffs differ by paper. Selecting the wrong discipline can produce misleading estimates.",
    },
    {
      question: "Should I rely on the institute list shown?",
      answer:
        "Use it as a shortlist starter. Verify with official institute cutoffs, eligibility, and admissions rules.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
  ];
}

registerToolFAQ("gate-rank-predictor", getGATERankPredictorFAQs);


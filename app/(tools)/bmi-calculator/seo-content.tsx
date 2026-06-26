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
  Rocket,
  Scale,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  HeartPulse,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function BMICalculatorSEOContent() {
  const tool = getToolBySlug("bmi-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const bmiRanges = [
    { range: "Under 18.5", category: "Underweight", note: "Consider a check-in with a clinician if this is unexpected." },
    { range: "18.5 – 24.9", category: "Normal", note: "Typical healthy range for most adults." },
    { range: "25.0 – 29.9", category: "Overweight", note: "A common range; lifestyle factors matter most." },
    { range: "30.0 – 34.9", category: "Obesity Class I", note: "Talk to a clinician about personalised guidance." },
    { range: "35.0 – 39.9", category: "Obesity Class II", note: "Higher health risk. Professional advice recommended." },
    { range: "40+", category: "Obesity Class III", note: "Seek medical guidance for a plan." },
  ];

  const featureChecklist = [
    { feature: "Metric units (kg, cm)", value: "Yes", note: "BMI in kg/m²." },
    { feature: "Imperial units (lb, ft/in)", value: "Yes", note: "Converted to BMI automatically." },
    { feature: "Adult BMI categories", value: "Yes", note: "WHO ranges for healthy / overweight / obesity." },
    { feature: "Healthy weight range", value: "Yes", note: "Shows the weight range that would land in the healthy BMI." },
    { feature: "Instant live result", value: "Yes", note: "Updates as you type." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "BMI doesn’t measure body composition",
      body: "Muscle is denser than fat. Athletes often score ‘overweight’ or ‘obese’ despite being fit.",
    },
    {
      title: "Adult vs child interpretations",
      body: "BMI categories here are for adults. Children and teens use age-specific percentiles - check a paediatric chart.",
    },
    {
      title: "Snapshot, not a trend",
      body: "A single BMI value is one data point. Tracking over weeks / months tells you more than one reading.",
    },
    {
      title: "Not a medical verdict",
      body: "BMI is a screening tool. Decisions should include waist, activity, bloodwork, and a clinician’s input.",
    },
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
            BMI Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online BMI calculator. Enter your height and weight in metric or imperial
            units and see your Body Mass Index and category - in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this BMI calculator to compute your Body Mass Index quickly. Supports both
              metric (kg / cm) and imperial (lb / ft / in). The result shows your BMI value,
              category, and the healthy weight range for your height.
            </p>
            <p>
              BMI is a useful screening tool for adults but it’s only one signal. Combine with
              waist measurement, activity level, and a clinician’s advice for a fuller picture
              of your health.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="BMI calculator - height and weight inputs with BMI result and category"
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
          currentToolSlug="bmi-calculator"
          title="Similar Tools You Might Like"
          description="Other everyday calculators."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate your BMI"
          lead="Three quick steps."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick units</h3>
            <p className="text-sm text-muted-foreground">
              Metric (kg, cm) or Imperial (lb, ft / in).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter measurements</h3>
            <p className="text-sm text-muted-foreground">
              Height and weight - decimals allowed.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Read result</h3>
            <p className="text-sm text-muted-foreground">
              BMI value, category, and your healthy weight range.
            </p>
          </Card>
        </div>
      </section>

      {/* BMI ranges */}
      <section className="space-y-6" id="ranges">
        <SectionHeader
          eyebrow="Reference"
          icon={Scale}
          title="Adult BMI categories (WHO)"
          lead="A standard reference for adults 20+."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">BMI range</th>
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {bmiRanges.map((r) => (
                    <tr key={r.range} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium font-mono text-xs sm:text-sm">
                        {r.range}
                      </td>
                      <td className="p-3">{r.category}</td>
                      <td className="p-3 text-muted-foreground">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          Ranges follow standard WHO categories for adults. Children and teens use different,
          age-specific percentiles.
        </p>
      </section>

      {/* Formula */}
      <section className="space-y-4" id="formula">
        <SectionHeader
          eyebrow="The maths"
          icon={HeartPulse}
          title="BMI formula"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">Metric:</strong>{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">BMI = weight(kg) / height(m)²</code>
          </p>
          <p>
            <strong className="text-foreground">Imperial:</strong>{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">BMI = 703 × weight(lb) / height(in)²</code>
          </p>
          <p className="text-sm">
            The tool handles both - just enter the numbers and pick units.
          </p>
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
        <SectionHeader
          eyebrow="Overview"
          icon={ListChecks}
          title="What this tool supports"
        />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what the BMI calculator does.
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
            Age checks:{" "}
            <Link href="/age-calculator" className="underline underline-offset-4 text-foreground">
              Age calculator
            </Link>
            .
          </p>
          <p>
            Percentage of target weight?{" "}
            <Link href="/percentage-calculator" className="underline underline-offset-4 text-foreground">
              Percentage calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getBMICalculatorFAQs()} />

      {/* User reviews */}
      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />
        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.ratingValue}/5
            </span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.reviewCount}
            </span>{" "}
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
          <h2 className="text-2xl font-bold tracking-tight">Ready to check your BMI?</h2>
          <p className="text-muted-foreground">
            Enter your height and weight - see your BMI, category, and healthy range.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getBMICalculatorFAQs() {
  return [
    {
      question: "Is the BMI calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Does it support both metric and imperial?",
      answer:
        "Yes. Enter height and weight in kg / cm or lb / ft-in - the BMI is calculated either way.",
    },
    {
      question: "What BMI range is healthy?",
      answer:
        "For most adults, a BMI of 18.5 – 24.9 is considered in the healthy range. Values below are underweight; 25 – 29.9 is overweight; 30+ is obesity (three classes). Children and teens use different, age-specific percentiles.",
    },
    {
      question: "Is BMI accurate?",
      answer:
        "BMI is a screening tool, not a diagnosis. It doesn’t distinguish muscle from fat, so athletes and very lean or very muscular people can score outside normal. Use alongside waist, activity, and clinician input.",
    },
    {
      question: "What about children and teens?",
      answer:
        "Paediatric BMI uses age-and-sex-specific percentiles, not the adult categories. Check a growth chart or a paediatrician for interpretation.",
    },
    {
      question: "Does the tool save my height or weight?",
      answer:
        "No. Inputs stay in your browser and are not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("bmi-calculator", getBMICalculatorFAQs);

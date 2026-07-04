/**
 * Pillar SEO content for the Exam Rank Predictors category page (/tools/exam-tools/).
 * Server-rendered so crawlers get the full guide in HTML.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Target,
  CalendarDays,
  Shield,
  BookOpenCheck,
  FileText,
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

const examFaqs = () => [
  {
    question: "How accurate are exam rank predictors?",
    answer:
      "Good predictors get within a usable planning band - typically closer in the middle of the distribution and wider at the extremes. They are estimates built from historical score-vs-rank data, normalization patterns, and candidate volumes. Official ranks come only from the conducting body (NTA, SSC, IIM, UPSC, IBPS).",
  },
  {
    question: "How does percentile convert to rank in JEE Main?",
    answer:
      "A widely used approximation is Rank ≈ ((100 − Percentile)/100) × Total candidates. With roughly 12–14 lakh unique candidates, 99 percentile maps to approximately rank 12,000–14,000. Tie-breaking rules and the best-of-two-attempts policy shift exact positions.",
  },
  {
    question: "Why do two students with the same marks get different ranks?",
    answer:
      "Normalization. Multi-shift exams (JEE Main, SSC CGL, CAT) adjust raw scores for shift difficulty, so identical raw marks in different shifts produce different normalized scores - and different ranks. Always estimate from your normalized score where applicable.",
  },
  {
    question: "When should I use a rank predictor?",
    answer:
      "Right after your exam, using the official answer key to estimate your score. That gives you maximum time to plan: college shortlists and document prep for entrance exams, or post-preference lists for recruitment exams - before official results arrive.",
  },
  {
    question: "Are these predictors free? Do I need to sign up?",
    answer:
      "All predictors are completely free with no registration. Calculations run locally in your browser - your scores and category details are not uploaded or stored.",
  },
  {
    question: "Which exams does Toolspy cover?",
    answer:
      "Engineering (JEE Main, JEE Advanced, GATE), medical (NEET), management (CAT), and government recruitment (UPSC, SSC CGL, Bank PO). Each predictor includes category-aware guidance and historical data tables.",
  },
];

export function ExamToolsSEOContent() {
  const examTools = getToolsByCategory()["exam-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    examTools.find((t) => t.slug === "jee-main-rank-predictor")?.posterImage ||
    examTools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("exam-tools", examFaqs);

  const seasonTable = [
    ["SSC CGL", "Tier exams Sep–Oct; results winter", "/ssc-cgl-rank-predictor/"],
    ["CAT", "Exam late Nov; results early Jan", "/cat-percentile-predictor/"],
    ["JEE Main", "Session 1 Jan–Feb; Session 2 Apr", "/jee-main-rank-predictor/"],
    ["GATE", "Exam Feb; results Mar", "/gate-rank-predictor/"],
    ["NEET", "Exam May; results Jun", "/neet-rank-predictor/"],
    ["JEE Advanced", "Exam May–Jun; results Jun", "/jee-advanced-rank-predictor/"],
    ["Bank PO (IBPS/SBI)", "Prelims Aug–Oct; Mains Nov–Jan", "/bank-po-rank-predictor/"],
    ["UPSC CSE", "Prelims May–Jun; Mains Sep; results next year", "/upsc-rank-predictor/"],
  ];

  const steps = [
    {
      title: "1. Estimate your score honestly",
      body: "Use the official answer key. For multi-shift exams, factor in your shift's difficulty - normalization can move your effective score up or down.",
    },
    {
      title: "2. Convert to a band, not a point",
      body: "Enter your score/percentile and category. Read the output as a range (e.g., 12,000–14,000), never as a single guaranteed rank.",
    },
    {
      title: "3. Plan with closing data",
      body: "Match your band against previous years' closing ranks/cutoffs - later counselling rounds for colleges, final merit lists for posts - and build ambitious/realistic/safe preference lists.",
    },
  ];

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Exam Rank &amp; Percentile Predictors - Plan Before Results Arrive
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The gap between &quot;exam over&quot; and &quot;results out&quot; is where smart
              planning happens - college shortlists, counselling documents, post preferences, and
              backup applications all benefit from an early, realistic estimate of where you
              stand. Toolspy&apos;s {examTools.length} exam predictors convert your expected
              score or percentile into an indicative rank band using historical data,
              normalization patterns, and candidate volumes.
            </p>
            <p>
              Every predictor is free, needs no signup, and runs entirely in your browser. Each
              one states its limits clearly: these are planning estimates, not official results.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Exam rank predictors - JEE, NEET, CAT, SSC CGL, UPSC rank and percentile estimation"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Predictor list */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">All predictors</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {examTools.map((tool) => (
            <Link key={tool.id} href={tool.path} className="group block h-full">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {tool.icon} {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam calendar */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          Exam calendar - when each predictor matters most
        </h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Typical annual cycle</CardTitle>
            <CardDescription>
              Dates vary by year and notification - always confirm on the official website of the
              conducting body.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Exam</th>
                    <th className="text-left p-3 font-medium">Typical Timeline</th>
                    <th className="text-left p-3 font-medium">Predictor</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonTable.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3 text-muted-foreground">{row[1]}</td>
                      <td className="p-3">
                        <Link href={row[2]} className="underline underline-offset-4">
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          How to use a predictor properly (3 steps)
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={i} className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Deep-dive guides */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          Understand the math behind the predictions
        </h3>
        <ul className="space-y-3 text-muted-foreground list-disc pl-6">
          <li>
            <Link
              href="/blog/jee-main-percentile-vs-rank-explained/"
              className="underline underline-offset-4 text-foreground"
            >
              JEE Main percentile vs rank
            </Link>{" "}
            - the (100−P)/100×N approximation, tie-breaking, and a percentile-to-rank table.
          </li>
          <li>
            <Link
              href="/blog/cat-percentile-calculation-explained/"
              className="underline underline-offset-4 text-foreground"
            >
              How CAT percentile is calculated
            </Link>{" "}
            - the formula, slot normalization, and why sectional percentiles matter.
          </li>
          <li>
            <Link
              href="/blog/ssc-cgl-marks-vs-rank-analysis/"
              className="underline underline-offset-4 text-foreground"
            >
              SSC CGL marks vs rank analysis
            </Link>{" "}
            - normalization explained plus indicative score-to-rank bands and post outlook.
          </li>
        </ul>
      </section>

      {/* Why Toolspy */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Why students use Toolspy</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: <Target className="h-5 w-5" />,
              title: "Bands, not false precision",
              body: "Outputs are honest ranges with the assumptions stated - built for planning.",
            },
            {
              icon: <BookOpenCheck className="h-5 w-5" />,
              title: "Data tables included",
              body: "Historical score-vs-rank and percentile tables on predictor pages and guides.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Private & free",
              body: "No signup; scores are processed in your browser and never stored.",
            },
          ].map((f, i) => (
            <Card key={i} className="p-5 text-center">
              <div className="flex justify-center text-primary mb-2">{f.icon}</div>
              <h4 className="font-semibold mb-1">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={examFaqs()} />
      </section>

      {/* Disclaimer */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          <FileText className="h-4 w-4 inline mr-1" />
          All predictors provide statistical estimates from publicly available historical data.
          They are not affiliated with NTA, SSC, IIM, UPSC, IBPS, or any examination authority.
          Rely on official results and counselling for final decisions. See our{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            full disclaimer
          </Link>
          .
        </p>
      </section>
    </article>
  );
}

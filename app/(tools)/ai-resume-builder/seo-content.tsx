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
  Rocket,
  FileCheck,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Target,
  FileText,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function AIResumeBuilderSEOContent() {
  const tool = getToolBySlug("ai-resume-builder");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const atsTips = [
    {
      title: "Match job keywords",
      body: "Mirror key phrases from the job description — title, tools, responsibilities. ATS scans for these.",
    },
    {
      title: "Skip fancy columns",
      body: "Some ATS parsers break on multi-column layouts. A clean single-column structure parses best.",
    },
    {
      title: "Standard section names",
      body: '“Experience”, “Education”, “Skills”, “Projects” — avoid cute headings that parsers miss.',
    },
    {
      title: "Real dates and places",
      body: "Use MM/YYYY – MM/YYYY and real company names. Vague timing is a red flag.",
    },
  ];

  const sections = [
    {
      name: "Header",
      what: "Name, role, location, email, phone, portfolio / LinkedIn.",
    },
    {
      name: "Summary",
      what: "2–3 lines tuned to the role. AI can draft this from your details.",
    },
    {
      name: "Experience",
      what: "Bullet points with impact (numbers, outcomes, technologies).",
    },
    {
      name: "Education",
      what: "Degree, institution, year. Add relevant coursework if early-career.",
    },
    {
      name: "Skills",
      what: "Grouped by category. Include tools the job asks for.",
    },
    {
      name: "Projects",
      what: "Link to real work — repos, demos, case studies.",
    },
  ];

  const featureChecklist = [
    { feature: "AI-generated summary & bullets", value: "Yes", note: "Turn job details into tight, impact-led lines." },
    { feature: "ATS-optimized templates", value: "Yes", note: "Single-column, clean typography, standard section names." },
    { feature: "Job-description matching", value: "Yes", note: "Paste a JD, the tool highlights missing keywords." },
    { feature: "Multiple templates", value: "Yes", note: "Classic, modern, and compact layouts." },
    { feature: "Export to PDF", value: "Yes", note: "High-quality PDF ready to attach." },
    { feature: "Save &amp; edit later", value: "Yes", note: "Pick up where you left off without losing work." },
    { feature: "Account required", value: "No", note: "No signup needed for core features." },
  ];

  const pitfalls = [
    {
      title: "Stuffing keywords",
      body: "Packing irrelevant keywords to game the ATS reads badly to humans. Match what’s relevant, skip the rest.",
    },
    {
      title: "Generic bullet points",
      body: "“Responsible for X” doesn’t land. Use outcome-led language: “Cut onboarding time from 3 days to 1”.",
    },
    {
      title: "Two-column creative templates",
      body: "They look great in a portfolio, but some ATS parsers mangle them. Use a clean single column for most applications.",
    },
    {
      title: "Treating AI drafts as final",
      body: "AI drafts are starting points. Edit to match your voice — hiring managers spot generic phrasing quickly.",
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
            AI Resume Builder
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast AI resume builder and CV maker. Write ATS-friendly resumes with AI
            suggestions, professional templates, and built-in job-description matching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI resume builder to write an ATS-friendly resume in minutes. Fill in
              your experience and let the AI draft tight summary and bullet points, or paste a
              job description and let the tool flag missing keywords.
            </p>
            <p>
              Pick from classic, modern, and compact templates — all built single-column and
              parser-safe. Export to PDF, save your progress, and tailor the resume per
              application without starting from scratch each time.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI resume builder — fill in experience, match a JD, export an ATS-friendly PDF"
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
          currentToolSlug="ai-resume-builder"
          title="Similar Tools You Might Like"
          description="Other AI and writing tools."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to build a resume with AI"
          lead="Four steps from blank page to PDF."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Fill details</h3>
            <p className="text-sm text-muted-foreground">
              Add your role, experience, projects, and skills.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. AI assist</h3>
            <p className="text-sm text-muted-foreground">
              Let the AI draft summaries and bullet points from your notes.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Match the JD</h3>
            <p className="text-sm text-muted-foreground">
              Paste the job description; tool flags missing keywords.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Export PDF</h3>
            <p className="text-sm text-muted-foreground">
              Download a clean, ATS-friendly PDF.
            </p>
          </Card>
        </div>
      </section>

      {/* Resume sections */}
      <section className="space-y-6" id="sections">
        <SectionHeader
          eyebrow="Structure"
          icon={FileText}
          title="Resume sections, explained"
          lead="The blocks most ATS parsers understand best."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Card key={s.name} className="p-5">
              <h3 className="font-semibold mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.what}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ATS tips */}
      <section className="space-y-6" id="ats">
        <SectionHeader
          eyebrow="Pass the bots"
          icon={FileCheck}
          title="Make it ATS-friendly"
          lead="Applicant tracking systems parse your resume before a human does."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {atsTips.map((t) => (
            <Card key={t.title} className="p-5">
              <h3 className="font-semibold mb-1">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Match JD */}
      <section className="space-y-4" id="match">
        <SectionHeader
          eyebrow="Tailoring"
          icon={Target}
          title="Match your resume to the job description"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste the target job description into the tool. It highlights keywords missing from
            your resume — skills, tools, responsibilities — so you can decide what to add.
          </p>
          <p>
            The goal isn’t to cram every keyword. It’s to surface the ones you genuinely match
            but forgot to mention. Tailoring one or two sections per application gives you the
            biggest lift without rewriting the whole thing each time.
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
              A factual summary of what the AI resume builder does.
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
        <SectionHeader title="Related tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Polish the prose:{" "}
            <Link href="/ai-writing-tools" className="underline underline-offset-4 text-foreground">
              AI writing tools
            </Link>{" "}
            — paraphrase, summarize, humanize.
          </p>
          <p>
            Shrink the final PDF before uploading:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAIResumeBuilderFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to build your resume?</h2>
          <p className="text-muted-foreground">
            Fill in your details, let the AI help, match the job, and export an ATS-friendly
            PDF.
          </p>
          <ScrollToTopButton>Start Building →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAIResumeBuilderFAQs() {
  return [
    {
      question: "Is the AI resume builder free to use?",
      answer: "Yes. Core features are free — no signup required for the main workflow.",
    },
    {
      question: "Are the templates ATS-friendly?",
      answer:
        "Yes. The templates use a clean single-column layout, standard section names, and parser-safe typography. Most ATS systems will read them correctly.",
    },
    {
      question: "How does the job-description matching work?",
      answer:
        "Paste the target job description and the tool highlights keywords (skills, tools, responsibilities) that appear in the JD but not in your resume. Add the ones that genuinely apply.",
    },
    {
      question: "Can I export to Word?",
      answer:
        "The primary export is a clean PDF, which is what most job portals expect. If you need Word, export the PDF and run it through the PDF to Word converter.",
    },
    {
      question: "Is the AI content generic?",
      answer:
        "The AI produces drafts — they work best as a starting point. Spend a minute editing summaries and bullets to match your voice before exporting.",
    },
    {
      question: "Can I save and come back later?",
      answer:
        "Yes. Your work is kept in the browser so you can return to the same draft, update it per application, and export again.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("ai-resume-builder", getAIResumeBuilderFAQs);

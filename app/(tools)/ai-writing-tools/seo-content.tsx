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
  Sparkles,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function AIWritingToolsSEOContent() {
  const tool = getToolBySlug("ai-writing-tools");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const modes = [
    {
      name: "Paraphraser",
      use: "Rewrite a sentence or paragraph",
      notes: "Pick a tone (formal, casual, confident). Keeps the meaning, changes the words.",
    },
    {
      name: "Summarizer",
      use: "Condense long text into key points",
      notes: "Bullet or paragraph output. Good for articles, reports, and meeting notes.",
    },
    {
      name: "Humanizer",
      use: "Make AI text sound more natural",
      notes: "Softens overly polished tone; rebalances rhythm and word choice.",
    },
    {
      name: "AI Detector",
      use: "Estimate how AI-like a piece of text reads",
      notes: "A signal, not a verdict. Treat scores as guidance, not proof.",
    },
  ];

  const tones = [
    { name: "Formal", when: "Business email, reports, proposals" },
    { name: "Casual", when: "Blog posts, social captions, DMs" },
    { name: "Confident", when: "Pitches, landing pages, sales copy" },
    { name: "Friendly", when: "Newsletters, support replies, onboarding" },
    { name: "Academic", when: "Essays, papers, technical write-ups" },
    { name: "Simple", when: "Tooltips, in-app copy, plain-English" },
  ];

  const featureChecklist = [
    { feature: "Paraphrase with tone", value: "Yes", note: "Formal, casual, confident, friendly, academic, simple." },
    { feature: "Summarize long text", value: "Yes", note: "Bullet or paragraph output; adjustable length." },
    { feature: "Humanize AI-generated text", value: "Yes", note: "Reduce polish, vary sentence rhythm." },
    { feature: "AI detection estimate", value: "Yes", note: "Score plus per-sentence hints." },
    { feature: "Multi-language support", value: "Yes", note: "Works with common languages; best quality in English." },
    { feature: "Word / character counter", value: "Yes", note: "Track length against platform limits." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Trusting AI detection as proof",
      body: "No detector is fully reliable. Use scores as a signal, not as evidence someone cheated.",
    },
    {
      title: "Paraphrasing facts away",
      body: "Paraphrasers can shift meaning subtly. For citations and claims, re-check the source text.",
    },
    {
      title: "Summarizing a summary",
      body: "Passes compound errors. Summarize from the original source whenever possible.",
    },
    {
      title: "One-size-fits-all tone",
      body: "Pick the tone to match where the text will live. A friendly email and a legal notice need different voices.",
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
            AI Writing Tools Suite
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast AI writing toolkit - paraphraser, summarizer, humanizer, and AI detector in
            one place. Rewrite, condense, and polish text without jumping between apps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI writing suite to paraphrase a paragraph in a different tone, summarize
              a long article into key points, humanize AI-generated copy, or run text through an
              AI detector. Paste your text, pick a mode, and get a clean output.
            </p>
            <p>
              Built for bloggers, students, marketers, and teams that write a lot. Swap tone in
              one click, choose bullet or paragraph summaries, and tune length to match platform
              limits. Everything runs from your browser - no account needed.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI writing tools - paraphraser, summarizer, humanizer, and detector modes"
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
          currentToolSlug="ai-writing-tools"
          title="Similar Tools You Might Like"
          description="Other AI and content utilities that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the writing suite"
          lead="Three steps from input to improved output."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick a mode</h3>
            <p className="text-sm text-muted-foreground">
              Paraphrase, summarize, humanize, or detect.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Paste text</h3>
            <p className="text-sm text-muted-foreground">
              Drop your text - a sentence, a paragraph, or a full article.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Tune &amp; copy</h3>
            <p className="text-sm text-muted-foreground">
              Set tone / length, generate, and copy the result.
            </p>
          </Card>
        </div>
      </section>

      {/* Modes */}
      <section className="space-y-6" id="modes">
        <SectionHeader
          eyebrow="Modes"
          icon={Sparkles}
          title="Four modes, one workflow"
          lead="Pick what you need - switch without re-pasting."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((m) => (
            <Card key={m.name} className="p-5">
              <h3 className="font-semibold mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground italic mb-2">{m.use}</p>
              <p className="text-sm text-muted-foreground">{m.notes}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tones */}
      <section className="space-y-6" id="tones">
        <SectionHeader
          eyebrow="Paraphraser"
          icon={PenLine}
          title="Tones you can target"
          lead="Shape the rewrite to match the surface it lives on."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Tone</th>
                    <th className="text-left p-3 font-medium">Good for</th>
                  </tr>
                </thead>
                <tbody>
                  {tones.map((t) => (
                    <tr key={t.name} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{t.name}</td>
                      <td className="p-3 text-muted-foreground">{t.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* AI detector caveats */}
      <section className="space-y-4" id="detector">
        <SectionHeader
          eyebrow="About the detector"
          icon={ShieldCheck}
          title="Treat detection scores as a signal, not a verdict"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            AI detection is imperfect - the best models still produce false positives and
            negatives, especially on short or heavily edited text. Use the score as one input
            alongside context: assignment brief, writing history, and a real reader’s intuition.
          </p>
          <p>
            If you need writing to pass as &quot;human&quot;, run it through{" "}
            <strong className="text-foreground">Humanizer</strong> first. The suite combines
            well: generate → paraphrase → humanize → check.
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
              A factual summary of what the AI writing suite does.
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
            Writing for a resume?{" "}
            <Link href="/ai-resume-builder" className="underline underline-offset-4 text-foreground">
              AI resume builder
            </Link>
            .
          </p>
          <p>
            Need to summarize a PDF first?{" "}
            <Link href="/pdf-to-word" className="underline underline-offset-4 text-foreground">
              PDF to Word
            </Link>{" "}
            - extract text, then summarize.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAIWritingToolsFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to rewrite?</h2>
          <p className="text-muted-foreground">
            Pick a mode, paste your text, and get a cleaner, sharper draft in seconds.
          </p>
          <ScrollToTopButton>Start Writing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAIWritingToolsFAQs() {
  return [
    {
      question: "Is the AI writing suite free to use?",
      answer: "Yes. It’s free - no signup, no install.",
    },
    {
      question: "Which tools are included?",
      answer:
        "Four modes in one place: paraphraser (with tone options), summarizer (bullet / paragraph), humanizer (for AI-sounding text), and AI detector (estimate AI-likelihood).",
    },
    {
      question: "Can I pick a specific tone when paraphrasing?",
      answer:
        "Yes. Formal, casual, confident, friendly, academic, and simple. Pick the one that matches where the text will live.",
    },
    {
      question: "How reliable is the AI detector?",
      answer:
        "Detection is a signal, not a verdict. Even the best models return false positives and negatives on short or heavily edited text - treat scores as guidance.",
    },
    {
      question: "Does it support languages other than English?",
      answer:
        "It works with common languages, with the strongest results in English. Quality can vary in other languages depending on the mode.",
    },
    {
      question: "Does the tool send my text to a server?",
      answer:
        "The writing models run as a managed service. Text is sent securely for processing and is not used to train models or retained long-term.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("ai-writing-tools", getAIWritingToolsFAQs);

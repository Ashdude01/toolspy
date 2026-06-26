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
  Wand2,
  Contrast,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ColorPaletteGeneratorSEOContent() {
  const tool = getToolBySlug("ai-color-palette-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const promptExamples = [
    {
      prompt: "Calm, professional SaaS dashboard",
      direction: "Muted blues, a soft accent, and two neutrals for surfaces.",
    },
    {
      prompt: "Energetic fitness brand landing page",
      direction: "Bold primary with one contrasting action colour and high-contrast neutrals.",
    },
    {
      prompt: "Warm, natural food-delivery app",
      direction: "Earthy reds and oranges with cream surfaces.",
    },
    {
      prompt: "Dark-mode dev tool with one neon accent",
      direction: "Deep greys plus a single saturated accent for primary actions.",
    },
  ];

  const featureChecklist = [
    { feature: "Generate palette from prompt", value: "Yes", note: "Describe mood, industry, or vibe in plain English." },
    { feature: "Seed colour input", value: "Yes", note: "Start from a known brand hex and generate around it." },
    { feature: "Accessibility check", value: "Yes", note: "Flags text/background pairs that fail WCAG AA contrast." },
    { feature: "Lock individual colours", value: "Yes", note: "Fix the ones you like and re-generate the rest." },
    { feature: "Export formats", value: "Yes", note: "CSS, SCSS, Tailwind, JSON, and PNG." },
    { feature: "Shareable URL", value: "Yes", note: "Copy a link that reloads the same palette." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Vague prompts = generic palettes",
      body: "‘Make it nice’ returns something safe but forgettable. Give the AI a mood, use case, or industry.",
    },
    {
      title: "Skipping the contrast check",
      body: "A palette can look beautiful and still fail WCAG AA for body text. Review the contrast column before shipping.",
    },
    {
      title: "Locking every colour",
      body: "Generate needs at least one unlocked swatch to do its job. Keep a couple free to explore variations.",
    },
    {
      title: "Using 5 similar hues",
      body: "You lose colour-based hierarchy. Include at least one neutral and one accent across the set.",
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
            AI Color Palette Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast AI color palette generator and AI color scheme generator. Describe the mood
            or brand, or drop in a seed hex, and get an accessible palette ready to export.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI color palette generator to turn a short prompt - &quot;warm cafe
              brand&quot;, &quot;minimal SaaS dashboard&quot;, &quot;dark dev tool with a neon
              accent&quot; - into a usable colour set. Lock the ones you like, re-generate the
              rest, and check contrast inline.
            </p>
            <p>
              Built for designers and developers. Export as CSS, SCSS, Tailwind, JSON, or PNG,
              or copy a shareable URL that reloads the same palette. Accessibility hints sit
              right next to each pair so you catch contrast issues before they ship.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI color palette generator - prompt input, generated palette, and accessibility flags"
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
          currentToolSlug="ai-color-palette-generator"
          title="Similar Tools You Might Like"
          description="Other design and colour utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to generate a palette with AI"
          lead="Four steps to an accessible, brand-ready palette."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Describe or seed</h3>
            <p className="text-sm text-muted-foreground">
              Type a prompt, or paste a hex to anchor the palette.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Generate</h3>
            <p className="text-sm text-muted-foreground">
              The AI proposes a 5-colour palette with a primary, accent, and neutrals.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Refine</h3>
            <p className="text-sm text-muted-foreground">
              Lock favourites, tweak hex values, re-run until it fits.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Export</h3>
            <p className="text-sm text-muted-foreground">
              CSS, SCSS, Tailwind, JSON, or PNG. Or copy a share URL.
            </p>
          </Card>
        </div>
      </section>

      {/* Prompt examples */}
      <section className="space-y-6" id="prompts">
        <SectionHeader
          eyebrow="Prompt starters"
          icon={Sparkles}
          title="What to ask the AI for"
          lead="Prompts that reliably return useful palettes."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promptExamples.map((p) => (
            <Card key={p.prompt} className="p-5">
              <p className="text-sm font-mono bg-muted/60 rounded p-2 mb-2">&quot;{p.prompt}&quot;</p>
              <p className="text-sm text-muted-foreground">{p.direction}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Seed colour workflow */}
      <section className="space-y-4" id="seed">
        <SectionHeader
          eyebrow="Brand-first"
          icon={Wand2}
          title="Generate a palette around a brand colour"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your brand hex (for example,{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">#3b82f6</code>) as the seed.
            The AI builds accents, neutrals, and backgrounds around that base so the palette
            stays on-brand.
          </p>
          <p>
            Lock the seed to keep it fixed while you explore the rest, or unlock it to let the
            AI suggest a slightly tuned primary.
          </p>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4" id="contrast">
        <SectionHeader
          eyebrow="Accessibility"
          icon={Contrast}
          title="Built-in contrast checks"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            The generator flags text/background pairs that fall below{" "}
            <strong className="text-foreground">WCAG AA</strong> (4.5:1 for body text, 3:1 for
            large text). A quick glance tells you which combinations are safe for copy vs
            accents.
          </p>
          <p>
            Before shipping, test actual UI states too - default, hover, focus, disabled. A
            palette can pass on paper and still break on a button with reduced opacity.
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
              A factual summary of what the AI color palette generator does.
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
        <SectionHeader title="Related colour tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Prefer a classic non-AI generator?{" "}
            <Link href="/color-palette-generator" className="underline underline-offset-4 text-foreground">
              Color Palette Generator
            </Link>
            .
          </p>
          <p>
            Need to pick one exact colour?{" "}
            <Link href="/color-picker" className="underline underline-offset-4 text-foreground">
              Color Picker
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAIColorPaletteGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to build a palette with AI?</h2>
          <p className="text-muted-foreground">
            Describe the mood or drop a seed hex - lock favourites, tweak, and export.
          </p>
          <ScrollToTopButton>Start Generating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAIColorPaletteGeneratorFAQs() {
  return [
    {
      question: "Is the AI color palette generator free to use?",
      answer: "Yes. It’s free - no signup, no install.",
    },
    {
      question: "How does the AI decide on colours?",
      answer:
        "It reads your prompt for mood, industry, and style cues, then proposes a 5-colour set that usually includes a primary, an accent, and supporting neutrals. You refine with locks and regenerations.",
    },
    {
      question: "Can I start from my brand colour?",
      answer:
        "Yes. Paste your brand hex as the seed and lock it. The AI builds the rest of the palette around that anchor.",
    },
    {
      question: "Does it check accessibility?",
      answer:
        "Yes. Text/background pairs are checked against WCAG AA (4.5:1 body, 3:1 large text) and flagged inline so you know which combinations are safe.",
    },
    {
      question: "Which export formats are supported?",
      answer:
        "CSS custom properties, SCSS variables, a Tailwind colors block, JSON, and PNG. Plus a shareable URL that recreates the palette.",
    },
    {
      question: "What if the AI output isn’t quite right?",
      answer:
        "Lock the colours you like and press Generate again. Or edit individual hex values by hand - the tool treats the output as a starting point, not the final answer.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("ai-color-palette-generator", getAIColorPaletteGeneratorFAQs);

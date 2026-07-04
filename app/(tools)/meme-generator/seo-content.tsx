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
  Image as ImageIcon,
  Type,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function MemeGeneratorSEOContent() {
  const tool = getToolBySlug("meme-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const templateIdeas = [
    { name: "Drake Hotline", note: "Two panels - reject one thing, approve another." },
    { name: "Distracted Boyfriend", note: "Three-character tension / preference." },
    { name: "Two Buttons", note: "A character sweating over a choice." },
    { name: "Woman Yelling at Cat", note: "Debate / argument setup." },
    { name: "This Is Fine", note: "Calm reaction in chaos." },
    { name: "Expanding Brain", note: "Escalating ideas in 4 panels." },
  ];

  const captionPatterns = [
    {
      pattern: "Observation → Punchline",
      example: "Top: ‘Me after 3 cups of coffee’ / Bottom: ‘Debugging in my sleep’",
    },
    {
      pattern: "Expectation → Reality",
      example: "Top: ‘Demo day plan’ / Bottom: ‘Demo day reality’",
    },
    {
      pattern: "Setup → Twist",
      example: "Top: ‘Ship the feature’ / Bottom: ‘Ship, then write the spec’",
    },
  ];

  const featureChecklist = [
    { feature: "Trending meme templates", value: "Yes", note: "Classic and modern templates ready to caption." },
    { feature: "AI caption suggestions", value: "Yes", note: "Describe the context - AI proposes top / bottom text." },
    { feature: "Upload your own image", value: "Yes", note: "Make original memes from any picture." },
    { feature: "Text styling", value: "Yes", note: "Font, size, outline, colour, stroke, and position." },
    { feature: "Multi-panel templates", value: "Yes", note: "Two / three / four-panel formats supported." },
    { feature: "Export as PNG / JPG", value: "Yes", note: "Ready for Instagram, X, WhatsApp, and chat." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Tiny text on a phone",
      body: "Memes are mostly viewed on mobile feeds. Keep text large enough to read at thumbnail size.",
    },
    {
      title: "Overcrowded captions",
      body: "Two or three lines land - long paragraphs don’t. Cut until only the punchline remains.",
    },
    {
      title: "Low-contrast colours",
      body: "White text without a black outline disappears on light backgrounds. Use a stroke or shadow.",
    },
    {
      title: "Outdated templates",
      body: "Once-viral templates age. Check which formats are actually trending before posting.",
    },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            AI Meme Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online AI meme generator and meme maker. Pick a trending template or upload
            your own image, add captions with AI help, and download shareable memes in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this AI meme generator to build memes from classic and trending templates or
              any image you upload. Describe the vibe and let the AI draft top / bottom text, or
              write captions yourself with full control over font, colour, and stroke.
            </p>
            <p>
              Designed for fast posts and social content. Export as PNG or JPG, ready to share on
              Instagram, X, WhatsApp, and Reddit. Everything runs in your browser - your
              uploads stay on your device.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="AI meme generator - pick a template, add captions, export a meme in seconds"
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
          currentToolSlug="meme-generator"
          title="Similar Tools You Might Like"
          description="Other image and content utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to make a meme"
          lead="Four steps from idea to shareable image."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick a template</h3>
            <p className="text-sm text-muted-foreground">
              Trending meme template or upload your own image.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Caption</h3>
            <p className="text-sm text-muted-foreground">
              Write your text or let the AI suggest top / bottom lines.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Style</h3>
            <p className="text-sm text-muted-foreground">
              Font, size, stroke, colour - tune for readability.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Export</h3>
            <p className="text-sm text-muted-foreground">
              Download PNG or JPG, ready to post.
            </p>
          </Card>
        </div>
      </section>

      {/* Template ideas */}
      <section className="space-y-6" id="templates">
        <SectionHeader
          eyebrow="Templates"
          icon={ImageIcon}
          title="Classic templates to try"
          lead="A few reliable formats that still land with audiences."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templateIdeas.map((t) => (
            <Card key={t.name} className="p-5">
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Caption patterns */}
      <section className="space-y-6" id="patterns">
        <SectionHeader
          eyebrow="Writing captions"
          icon={Type}
          title="Caption patterns that work"
          lead="Simple structures to guide your top / bottom text."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Pattern</th>
                    <th className="text-left p-3 font-medium">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {captionPatterns.map((p) => (
                    <tr key={p.pattern} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{p.pattern}</td>
                      <td className="p-3 text-muted-foreground">{p.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* AI captions */}
      <section className="space-y-4" id="ai-captions">
        <SectionHeader
          eyebrow="AI assist"
          icon={Sparkles}
          title="Let the AI draft captions"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Describe what the meme is about in one or two lines - &quot;debugging on a Monday,
            everything is on fire&quot; - and the AI proposes a few top / bottom text options.
            Pick one, tweak, or rewrite.
          </p>
          <p>
            The AI is a starting point, not a replacement for your voice. Swap jargon for your
            niche, drop in an inside joke, and you’ll usually get something that actually lands.
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
              A factual summary of what the AI meme generator does.
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
            Need a transparent subject for a custom meme?{" "}
            <Link href="/ai-background-remover" className="underline underline-offset-4 text-foreground">
              AI background remover
            </Link>
            .
          </p>
          <p>
            Upscale a small source image first:{" "}
            <Link href="/ai-image-enhancer" className="underline underline-offset-4 text-foreground">
              AI image enhancer
            </Link>
            .
          </p>
          <p>
            Resize before posting:{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getMemeGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to make a meme?</h2>
          <p className="text-muted-foreground">
            Pick a template, let the AI draft captions, and download your meme in seconds.
          </p>
          <ScrollToTopButton>Start Creating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getMemeGeneratorFAQs() {
  return [
    {
      question: "Is the AI meme generator free to use?",
      answer: "Yes. It’s free - no signup, no install.",
    },
    {
      question: "Can I upload my own image?",
      answer:
        "Yes. Alongside the built-in templates, you can upload any JPG, PNG, or WebP and caption it like a normal meme.",
    },
    {
      question: "How good are the AI caption suggestions?",
      answer:
        "They’re a solid starting point - describe your context and pick the option that fits. Tweak the text to match your voice and you’ll usually get something that lands.",
    },
    {
      question: "What export formats are supported?",
      answer:
        "PNG and JPG, at the dimensions of the original template or source image. Both work on every major social platform.",
    },
    {
      question: "Do I need to credit the template?",
      answer:
        "Most meme templates are widely shared and unattributed. If you’re using a copyrighted image or character, make sure your use is appropriate (satire, fair use, or licensed).",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "Processing happens in your browser. Uploads stay on your device and are not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("meme-generator", getMemeGeneratorFAQs);

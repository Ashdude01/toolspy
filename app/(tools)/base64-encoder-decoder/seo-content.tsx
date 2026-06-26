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
  ArrowLeftRight,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  HelpCircle,
  Globe,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function Base64EncoderDecoderSEOContent() {
  const tool = getToolBySlug("base64-encoder-decoder");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Debug an API token or header",
      body: "JWTs, auth headers, and webhook payloads often ship as Base64. Decode to inspect the contents.",
    },
    {
      title: "Encode binary for transport",
      body: "Text-only channels (JSON, query strings, env vars) need Base64 to carry raw bytes.",
    },
    {
      title: "Prepare data URIs",
      body: "Convert small text blobs to data URIs that embed directly in HTML or CSS.",
    },
    {
      title: "Inspect URL-safe tokens",
      body: "Reset-password links and invites often include URL-safe Base64 payloads.",
    },
  ];

  const examples = [
    {
      label: "Plain text",
      input: "Hello, world!",
      output: "SGVsbG8sIHdvcmxkIQ==",
    },
    {
      label: "Emoji / unicode",
      input: "Namaste 🙏",
      output: "TmFtYXN0ZSDwn5mP",
    },
    {
      label: "JSON payload",
      input: '{"id":42,"ok":true}',
      output: "eyJpZCI6NDIsIm9rIjp0cnVlfQ==",
    },
  ];

  const featureChecklist = [
    { feature: "Encode text to Base64", value: "Yes", note: "UTF-8 safe - handles emoji and international characters." },
    { feature: "Decode Base64 to text", value: "Yes", note: "Accepts standard and URL-safe variants." },
    { feature: "URL-safe Base64", value: "Yes", note: "Swap + / for - _ and drop padding when needed." },
    { feature: "Line wrapping control", value: "Yes", note: "Optional 76-column wrap for email / MIME outputs." },
    { feature: "Copy to clipboard", value: "Yes", note: "One click to copy the result." },
    { feature: "Large input support", value: "Yes", note: "Works for long payloads; runs entirely in your browser." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Confusing Base64 with encryption",
      body: "Base64 is an encoding, not a cipher. Anyone with the string can decode it. Don’t use it to “hide” sensitive data.",
    },
    {
      title: "Forgetting UTF-8",
      body: "Naive Base64 on unicode strings can mangle characters. This tool handles UTF-8, but some libraries don’t - pair with a proper encoder on the other side.",
    },
    {
      title: "Copying strings with line breaks",
      body: "MIME-wrapped Base64 has line breaks every 76 chars. Most decoders handle it, but some strict parsers fail. Toggle wrapping off when pasting into code.",
    },
    {
      title: "URL-safe vs standard",
      body: "Standard Base64 uses + and /, URL-safe swaps them for - and _. Mismatched encoders / decoders will produce gibberish.",
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
            Base64 Encoder / Decoder
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online Base64 encoder and Base64 decoder. Convert text to Base64, decode
            Base64 to text, with full UTF-8 and URL-safe support - in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this Base64 encoder / decoder to convert text to Base64 or decode Base64 back
              to text. Handles UTF-8 (so emoji and international characters round-trip cleanly),
              URL-safe variants, and MIME line wrapping for email contexts.
            </p>
            <p>
              Ideal for debugging API headers, inspecting JWT payloads, encoding strings for
              JSON transport, and preparing tokens for URLs. Paste any length - short phrase or
              long payload - and copy the result with one click.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Base64 encoder / decoder - paste text or Base64, toggle encode / decode, copy result"
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
          currentToolSlug="base64-encoder-decoder"
          title="Similar Tools You Might Like"
          description="Other Base64 and text utilities that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to encode or decode Base64"
          lead="Three steps from input to copied result."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick mode</h3>
            <p className="text-sm text-muted-foreground">
              Switch between Encode and Decode with a single tab.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Paste input</h3>
            <p className="text-sm text-muted-foreground">
              Drop text or a Base64 string into the input box.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Copy output</h3>
            <p className="text-sm text-muted-foreground">
              One-click copy. URL-safe and line-wrapping toggles available.
            </p>
          </Card>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-6" id="examples">
        <SectionHeader
          eyebrow="Examples"
          icon={ArrowLeftRight}
          title="Encoding examples"
          lead="A quick look at how input → Base64 maps."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Input</th>
                    <th className="text-left p-3 font-medium">Base64</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map((e) => (
                    <tr key={e.label} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{e.label}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {e.input}
                      </td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm break-all">
                        {e.output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* URL-safe explainer */}
      <section className="space-y-4" id="url-safe">
        <SectionHeader
          eyebrow="Variants"
          icon={Globe}
          title="Standard vs URL-safe Base64"
          lead="Pick the variant that matches your destination."
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Standard Base64 uses the alphabet{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">A-Z a-z 0-9 + /</code> and
            pads to multiples of 4 with <code className="bg-muted rounded px-1.5 py-0.5 text-xs">=</code>.
          </p>
          <p>
            URL-safe Base64 replaces <code>+</code> with <code>-</code> and{" "}
            <code>/</code> with <code>_</code>, and often drops padding. Use it in URLs,
            cookies, filenames, and any place where <code>+ /</code> could be mis-interpreted.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={HelpCircle}
          title="Typical reasons to use Base64"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
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
              A factual summary of what the Base64 encoder / decoder does.
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
        <SectionHeader title="Related Base64 tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Working with images?{" "}
            <Link href="/image-to-base64" className="underline underline-offset-4 text-foreground">
              Image to Base64 encoder
            </Link>{" "}
            or{" "}
            <Link href="/base64-to-image" className="underline underline-offset-4 text-foreground">
              Base64 to image decoder
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getBase64EncoderDecoderFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to encode or decode?</h2>
          <p className="text-muted-foreground">
            Paste any text or Base64 string, flip the mode, and copy the result in one click.
          </p>
          <ScrollToTopButton>Start Encoding →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getBase64EncoderDecoderFAQs() {
  return [
    {
      question: "Is the Base64 encoder / decoder free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Does it handle unicode and emoji?",
      answer:
        "Yes. The tool uses UTF-8 internally, so accented characters, Devanagari, CJK, and emoji round-trip correctly.",
    },
    {
      question: "What is URL-safe Base64?",
      answer:
        "A variant that swaps + for - and / for _ so the encoded string is safe inside URLs, cookies, and filenames. The tool lets you toggle between standard and URL-safe output.",
    },
    {
      question: "Is Base64 encryption?",
      answer:
        "No. Base64 is an encoding - it can always be reversed without a key. Don’t use it to hide secrets or protect sensitive data.",
    },
    {
      question: "Can I encode very long strings?",
      answer:
        "Yes. Encoding runs locally in your browser, so payload length is bounded only by your device’s memory.",
    },
    {
      question: "Does the tool upload my text to a server?",
      answer:
        "No. Encoding and decoding happen entirely in your browser.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("base64-encoder-decoder", getBase64EncoderDecoderFAQs);

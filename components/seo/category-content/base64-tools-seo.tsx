/**
 * Pillar SEO content for the Base64 Tools category page (/tools/base64-tools/).
 * Server-rendered so crawlers get the full guide in HTML.
 * Written per Google helpful-content guidelines: factual, user-first,
 * no competitor comparisons or unverifiable claims.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { ToolCard } from "@/components/tools/tool-card";
import NextImage from "next/image";
import Link from "next/link";

const categoryFaqs = () => [
  {
    question: "Is Base64 encryption?",
    answer:
      "No. Base64 is an encoding, not encryption - anyone can decode it. Never use it to protect secrets; use proper encryption for sensitive data.",
  },
  {
    question: "Why is my Base64 string longer than the original file?",
    answer:
      "Base64 represents every 3 bytes as 4 characters, so output is roughly 33% larger. That is normal and expected.",
  },
  {
    question: "Is it safe to paste tokens or internal data here?",
    answer:
      "Yes - encoding and decoding run entirely in your browser. Nothing you paste is sent to a server.",
  },
  {
    question: "What image formats can I convert to and from Base64?",
    answer:
      "PNG, JPG, WebP, GIF, and SVG all work. The data URI prefix (e.g., data:image/png;base64,) is handled automatically.",
  },
  {
    question: "Why does my decode output look like garbage?",
    answer:
      "The string was probably not valid Base64, was truncated, or represents binary data (like an image) rather than text - try the Base64-to-Image tool instead.",
  },
];

export function Base64ToolsSEOContent() {
  const tools = getToolsByCategory()["base64-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "base64-encoder-decoder")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("base64-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Base64 Tools - Encode, Decode & Convert Images to Base64
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Base64 turns binary data into plain text so it can travel through systems built for text - JSON payloads, CSS files, HTML emails, API responses. Toolspy&apos;s {tools.length} Base64 tools cover the round trip: encode text or images to Base64, decode Base64 back to readable text, and convert Base64 strings back into image files you can download.
            </p>
            <p>
              Everything runs client-side, which makes these tools safe for tokens, keys, and internal payloads - the data you paste never leaves your browser.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Base64 encoder decoder - convert text and images to base64 and back in the browser"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Tools grid (global card design) */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Tools in this category</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">When Base64 helps (and when it does not)</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Base64 use cases - quick reference</CardTitle>
            <CardDescription>Base64 output is ~33% larger than the original binary, so use it deliberately.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use Case</th>
                    <th className="text-left p-3 font-medium">Why Base64</th>
                    <th className="text-left p-3 font-medium">Watch Out For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Small images inline in CSS/HTML", "No extra HTTP request", "Only worth it under ~5-10KB per image"],
                    ["Images inside JSON APIs", "Binary cannot travel in JSON directly", "Payload grows ~33%"],
                    ["Email embeds (data URIs)", "Some clients block external images", "Many clients also limit data URIs"],
                    ["Debugging JWT/webhook payloads", "Decode to inspect contents instantly", "Base64 is encoding, NOT encryption"],
                    ["Config values / basic auth headers", "Text-safe transport", "Never treat it as a security layer"]
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

      {/* Use cases */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">What developers use these tools for</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Inspecting API payloads</h4>
              <p className="text-sm text-muted-foreground">Paste a Base64 chunk from a webhook, JWT segment, or API response and instantly see the decoded content while debugging.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Inline assets</h4>
              <p className="text-sm text-muted-foreground">Convert small icons and logos to Base64 data URIs to embed directly in CSS or HTML and skip extra network requests.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Recovering images from data</h4>
              <p className="text-sm text-muted-foreground">Got a Base64 image string from a database dump or API log? Convert it back to a downloadable PNG/JPG in one paste.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Text-safe transport</h4>
              <p className="text-sm text-muted-foreground">Encode binary or special-character content so it survives systems that only handle plain text.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to use (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Paste or upload</h4>
              <p className="text-sm text-muted-foreground">Drop in text, a Base64 string, or an image file depending on the direction you need.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Convert</h4>
              <p className="text-sm text-muted-foreground">Encoding and decoding happen instantly in the browser - data URIs include the correct MIME prefix.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Copy or download</h4>
              <p className="text-sm text-muted-foreground">Copy the string to your clipboard, or download the decoded image as a file.</p>
            </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={categoryFaqs()} />
      </section>

      {/* Note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          All encoding and decoding happens locally in your browser. Base64 is an encoding, not a security mechanism.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            Disclaimer
          </Link>
        </p>
      </section>
    </article>
  );
}

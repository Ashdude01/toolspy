/**
 * Pillar SEO content for the AI Tools category page (/tools/ai-tools/).
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
    question: "Are these AI tools really free?",
    answer:
      "Yes - free with no signup. The tools are supported by ads on the page, not by locking features behind payment.",
  },
  {
    question: "What happens to images I upload?",
    answer:
      "Images are processed to produce your result and are not kept. Wherever the model can run client-side, the image never leaves your browser.",
  },
  {
    question: "Will the resume builder pass ATS scanners?",
    answer:
      "The templates use standard headings, real text (not images), and simple layouts - the properties ATS parsers need. Always tailor content to the job description too.",
  },
  {
    question: "How accurate is the AI detector?",
    answer:
      "No AI detector is definitive. Use the score as a signal, not a verdict - short or heavily edited texts are especially hard to classify.",
  },
  {
    question: "Can I use the outputs commercially?",
    answer:
      "Yes - your outputs (cut-out images, resumes, palettes, memes) are yours to use, provided your inputs did not infringe someone else's rights.",
  },
];

export function AIToolsSEOContent() {
  const tools = getToolsByCategory()["ai-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "ai-background-remover")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("ai-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Free AI Tools - Background Removal, Image Enhancement, Writing & Resumes
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Some jobs used to need Photoshop skills or a paid subscription: cutting a subject out of a background, upscaling a blurry photo, drafting an ATS-friendly resume. Toolspy&apos;s {tools.length} AI tools do them in a browser tab - background remover, image enhancer/upscaler, resume builder, a writing suite (paraphraser, summarizer, AI detector), meme generator, and an AI color palette generator.
            </p>
            <p>
              They are free and need no signup. Where a tool can run its model in the browser it does; results always preview before you download.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Free AI tools - background remover, image enhancer and upscaler, AI resume builder, writing suite"
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
        <h3 className="text-2xl font-semibold tracking-tight">AI tools at a glance</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Input to output</CardTitle>
            <CardDescription>What each AI tool takes and what it gives back.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Tool</th>
                    <th className="text-left p-3 font-medium">You Provide</th>
                    <th className="text-left p-3 font-medium">You Get</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Background Remover", "Any photo", "Subject cut out on transparent background (PNG)"],
                    ["AI Image Enhancer", "Blurry / low-res photo", "Upscaled, sharpened, optionally colorized image"],
                    ["AI Resume Builder", "Your details + role", "ATS-friendly resume in clean templates"],
                    ["AI Writing Suite", "A draft or source text", "Paraphrase, summary, humanized text, AI-detection score"],
                    ["AI Meme Generator", "A template + idea", "Captioned meme ready to share"],
                    ["AI Color Palette Generator", "A seed color or mood", "Accessible palette with export (CSS/Tailwind/JSON)"]
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
        <h3 className="text-2xl font-semibold tracking-tight">Practical uses</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Product and profile photos</h4>
              <p className="text-sm text-muted-foreground">Remove messy backgrounds for marketplace listings, LinkedIn photos, and catalogs - transparent PNGs drop straight into any design.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Restoring old or small images</h4>
              <p className="text-sm text-muted-foreground">Upscale low-resolution photos for printing or presentations, and sharpen images that came out slightly blurred.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Job applications</h4>
              <p className="text-sm text-muted-foreground">Build a resume that parses correctly in ATS systems - clean structure, standard sections, no layout tricks that break parsers.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Content workflows</h4>
              <p className="text-sm text-muted-foreground">Summarize long documents, rephrase drafts for tone, and sanity-check text with the AI detector before publishing.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to use (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Upload or paste</h4>
              <p className="text-sm text-muted-foreground">An image for the visual tools, text for the writing suite, your details for the resume builder.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Let the model run</h4>
              <p className="text-sm text-muted-foreground">Processing takes seconds; you see a preview before committing.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Refine and download</h4>
              <p className="text-sm text-muted-foreground">Adjust options (strength, template, tone) and export - PNG, document, or copied text.</p>
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
          AI outputs vary with input quality. Review results before professional use, and only upload content you have the right to process.{" "}
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

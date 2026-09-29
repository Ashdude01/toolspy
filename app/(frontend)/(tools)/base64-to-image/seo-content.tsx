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
  Code2,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  HelpCircle,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function Base64ToImageSEOContent() {
  const tool = getToolBySlug("base64-to-image");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Debug API responses",
      body: "APIs that return images as Base64 - decode the string to check what the client actually receives.",
    },
    {
      title: "Inspect data URIs",
      body: "Pull a data URI out of HTML or CSS, paste it here, and view the embedded image as a file.",
    },
    {
      title: "Extract from JSON payloads",
      body: "Some back-ends embed avatars or previews directly in JSON. Decode to confirm or save.",
    },
    {
      title: "Recover screenshots",
      body: "Logs sometimes include Base64 screenshots for bug reports. Decode them to view the actual image.",
    },
  ];

  const acceptedInputs = [
    {
      label: "Plain Base64 string",
      example: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
      note: "Raw characters with no prefix.",
    },
    {
      label: "Data URI",
      example: "data:image/png;base64,iVBORw0KGgo...",
      note: "Includes the MIME type prefix - the tool strips it automatically.",
    },
    {
      label: "URL-safe Base64",
      example: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
      note: "Replace -/_ with +/ is handled automatically where needed.",
    },
  ];

  const featureChecklist = [
    { feature: "Decode Base64 to image", value: "Yes", note: "Preview and download as a real image file." },
    { feature: "Accept data URIs", value: "Yes", note: "data:image/png;base64,... strings work directly." },
    { feature: "Detect image format", value: "Yes", note: "PNG, JPG, WebP, GIF, SVG, BMP and more." },
    { feature: "Preview before download", value: "Yes", note: "Verify the decoded image looks right." },
    { feature: "Paste or upload text file", value: "Yes", note: "For very long strings, upload a .txt and decode." },
    { feature: "Download as file", value: "Yes", note: "Save with the detected extension." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Including surrounding quotes",
      body: "Some JSON strings arrive wrapped in quotes. Strip the outer quotes before decoding.",
    },
    {
      title: "Hidden whitespace or line breaks",
      body: "Line breaks inside the Base64 string usually decode fine, but leading / trailing whitespace sometimes breaks parsers.",
    },
    {
      title: "Truncated strings",
      body: "Copy-pasting from a narrow terminal or email can cut off the end of a Base64 string. Make sure the full payload is included.",
    },
    {
      title: "Wrong prefix",
      body: "If the data URI mime type is wrong (e.g. a JPG labeled image/png), the file saves with the wrong extension. Check the preview.",
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
            Base64 to Image Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online Base64 to image converter and Base64 image decoder. Paste a Base64
            string or data URI, preview the image, and download it - in your browser, no
            signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this Base64 to image converter to decode Base64 strings into real image files.
              Paste a raw Base64 payload or a <code className="bg-muted rounded px-1.5 py-0.5 text-xs">data:image/...;base64,</code>{" "}
              URI - the tool detects the image format and shows a preview before download.
            </p>
            <p>
              Handy for developers debugging API responses, inspecting data URIs embedded in
              HTML or CSS, or recovering screenshots from logs. Everything runs locally - your
              strings and files stay on your device.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Base64 to image - paste a string, preview the decoded image, and download it"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to decode Base64 to an image"
          lead="Three steps from string to file."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Paste</h3>
            <p className="text-sm text-muted-foreground">
              Paste the Base64 string or full data URI into the input.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Preview</h3>
            <p className="text-sm text-muted-foreground">
              The tool detects the format and renders a live preview.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the image with the correct extension.
            </p>
          </Card>
        </div>
      </section>

      {/* Accepted inputs */}
      <section className="space-y-6" id="accepted-inputs">
        <SectionHeader
          eyebrow="Input"
          icon={Code2}
          title="What the decoder accepts"
          lead="Multiple Base64 variants work out of the box."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {acceptedInputs.map((i) => (
            <Card key={i.label} className="p-5">
              <h3 className="font-semibold mb-1">{i.label}</h3>
              <pre className="text-[11px] bg-muted/60 rounded-md p-2 overflow-x-auto whitespace-pre-wrap break-all text-muted-foreground">
                {i.example}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">{i.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={HelpCircle}
          title="Typical reasons to decode Base64 images"
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
              A factual summary of what the Base64 to image converter does.
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
            Going the other direction?{" "}
            <Link href="/image-to-base64" className="underline underline-offset-4 text-foreground">
              Image to Base64 encoder
            </Link>
            .
          </p>
          <p>
            For plain text encoding / decoding:{" "}
            <Link href="/base64-encoder-decoder" className="underline underline-offset-4 text-foreground">
              Base64 encoder / decoder
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getBase64ToImageFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to decode your Base64?</h2>
          <p className="text-muted-foreground">
            Paste a Base64 string or data URI, preview the image, and download it in seconds.
          </p>
          <ScrollToTopButton>Start Decoding →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getBase64ToImageFAQs() {
  return [
    {
      question: "Is the Base64 to image converter free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Do I need to strip the data URI prefix?",
      answer:
        "No. The tool handles both raw Base64 strings and full data URIs like data:image/png;base64,... - the prefix is stripped automatically.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "PNG, JPG, WebP, GIF, BMP, and SVG (when encoded with the correct MIME type or detected by signature).",
    },
    {
      question: "My Base64 string is very long - can I still decode it?",
      answer:
        "Yes. For very long strings, you can also upload a .txt file containing the Base64 payload and decode that.",
    },
    {
      question: "Why does the decoded image look broken?",
      answer:
        "Usually the Base64 string is truncated or has unexpected characters (e.g. stray quotes, hidden whitespace, or a wrong prefix). Copy the full payload and try again.",
    },
    {
      question: "Is the decoded image sent to any server?",
      answer:
        "No. Decoding runs in your browser. Strings and files stay on your device.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("base64-to-image", getBase64ToImageFAQs);

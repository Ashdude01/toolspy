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
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";
import {
  Crop,
  ListChecks,
  Lightbulb,
  Sparkles,
  FileImage,
  MessagesSquare,
} from "lucide-react";

export function OnlineImageCropperSEOContent() {
  const tool = getToolBySlug("online-image-cropper");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const shapes = [
    { name: "Rectangle / Square", when: "General cropping, thumbnails, banner trims." },
    { name: "Circle", when: "Profile photos, avatars, badges (exports with transparency)." },
    { name: "Pentagon / Hexagon", when: "Design elements, stickers, shaped thumbnails." },
  ];

  const featureChecklist = [
    { feature: "Freeform crop (manual selection)", value: "Yes" },
    { feature: "Aspect ratio crop", value: "Yes" },
    { feature: "Shape crop (circle, polygon)", value: "Yes" },
    { feature: "Runs in browser (no upload)", value: "Yes" },
    { feature: "Export formats", value: "PNG / WebP / JPEG" },
  ];

  const pitfalls = [
    {
      title: "Cropping too tight",
      body: "Leave a small margin for profile pictures or rounded UI. Some apps add their own padding.",
    },
    {
      title: "Using JPEG for shape crops",
      body: "JPEG doesn’t support transparency. Use PNG or WebP for circle/polygon crops.",
    },
    {
      title: "Wrong aspect ratio for the platform",
      body: "Pick a ratio that matches where you’ll upload (1:1, 16:9, 9:16, etc.) to avoid extra auto-cropping.",
    },
    {
      title: "Low-resolution sources",
      body: "Cropping doesn’t add detail. If the image is already small, zoomed-in crops may look blurry.",
    },
  ];

  const faqs = [
    {
      question: "Does the online image cropper upload my image?",
      answer:
        "No. Cropping runs locally in your browser using canvas, so your image stays on your device.",
    },
    {
      question: "Can I crop an image into a circle?",
      answer:
        "Yes. Choose the circle shape. The tool exports the result with transparency (PNG/WebP).",
    },
    {
      question: "How do I crop by aspect ratio?",
      answer:
        "Choose an aspect ratio like 1:1 or 16:9, then drag on the image. The crop area stays locked to the selected ratio.",
    },
    {
      question: "Which format should I download?",
      answer:
        "PNG is best for transparency. JPEG is fine for photos when you don’t need transparency. WebP is a good modern choice for smaller size with transparency support.",
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
            Online Image Cropper
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Crop images by free selection, fixed aspect ratios, or shapes like circle and polygons.
            Works in your browser - no upload required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This online image cropper helps you quickly trim a photo or screenshot to the part you
              actually need. Drag to select an area, lock the crop to a standard ratio (like 1:1 or
              16:9), or crop into a predefined shape for avatars and design elements.
            </p>
            <p>
              Because everything runs client-side, your image is processed locally in your browser.
              When you’re happy with the crop, export as PNG/WebP/JPEG and download the result.
            </p>
          </div>

          {(tool?.posterImage || "/images/main.webp") && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool?.posterImage || "/images/main.webp"}
                width={1600}
                height={900}
                alt="Online image cropper - crop area selection and export settings"
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
          currentToolSlug="online-image-cropper"
          title="Similar Tools You Might Like"
          description="Other image tools that pair well with cropping."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader eyebrow="Getting started" icon={ListChecks} title="How to crop an image" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Add a photo or screenshot from your device.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Select an area</h3>
            <p className="text-sm text-muted-foreground">
              Drag on the image to create a crop. Drag inside to move it.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Choose mode</h3>
            <p className="text-sm text-muted-foreground">
              Free crop, aspect ratio crop, or a predefined shape (circle/polygon).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Export</h3>
            <p className="text-sm text-muted-foreground">
              Create the cropped image and download it in the format you need.
            </p>
          </Card>
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-6" id="shapes">
        <SectionHeader eyebrow="Shape crops" icon={Crop} title="Crop by predefined shapes" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shapes.map((s) => (
            <Card key={s.name} className="p-5">
              <h3 className="font-semibold mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.when}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader eyebrow="Features" icon={Sparkles} title="What this cropper supports" />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature checklist</CardTitle>
            <CardDescription>Quick confirmation for common needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {featureChecklist.map((row) => (
                <li key={row.feature} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                  <span className="text-muted-foreground">{row.feature}</span>
                  <span className="font-medium">{row.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Tips */}
      <section className="space-y-6" id="tips">
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

      {/* Related links */}
      <section className="space-y-6" id="related">
        <SectionHeader eyebrow="Next steps" icon={FileImage} title="Related image tools" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Compress after cropping</h3>
            <p className="text-sm text-muted-foreground">
              If you need smaller files, crop first and then use the{" "}
              <Link href="/image-compressor" className="text-primary underline underline-offset-4">
                Image Compressor
              </Link>
              .
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Convert format if needed</h3>
            <p className="text-sm text-muted-foreground">
              Export is available, but if you need a different format workflow, try the{" "}
              <Link href="/image-converter" className="text-primary underline underline-offset-4">
                Image Converter
              </Link>
              .
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6" id="faq">
        <SectionHeader eyebrow="Help" icon={MessagesSquare} title="FAQ" />
        <FAQ
          title="Frequently asked questions"
          description="Quick answers about cropping modes, formats, and privacy."
          faqs={faqs}
        />
      </section>
    </article>
  );
}


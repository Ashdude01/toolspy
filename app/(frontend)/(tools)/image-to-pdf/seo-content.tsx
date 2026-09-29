/**
 * Server-only SEO content for this tool page.
 * No "use client" - all markup is server-rendered so view-source and crawlers see full HTML.
 */
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import NextImage from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getImageToPdfFAQs } from "./faq-loader";

export function ImageToPdfSEOContent() {
  const tool = getToolBySlug("image-to-pdf");

  return (
    <article
      className="mx-auto space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed text-foreground"
      aria-label="Guide and SEO content"
    >

{/* Page copy from job.md (lines 31–65, 76–77); FAQ matches job.md Q&A */}
      <section id="intro" className="space-y-8">
        <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
          Convert Image to PDF – Free & Fast
        </h1>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="space-y-5 font-normal leading-relaxed text-muted-foreground">
            <p>
              We&apos;ve all been there - you have a bunch of images on your
              phone or laptop and need to send them as a single, clean PDF
              file. Whether it&apos;s a scanned document, a photo of a receipt,
              or a collection of design screenshots, converting images to PDF
              shouldn&apos;t be complicated.
            </p>
            <p>
              That&apos;s exactly why ToolSpy built a straightforward image to
              PDF converter that just works - no installation, no account, no
              watermarks.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30 shrink-0">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="ToolSpy - combine images into one PDF document"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          title="How to Convert Image to PDF"
          lead={
            <>
              Using ToolSpy&apos;s free image to PDF tool is as simple as it
              gets:
            </>
          }
        />
        <ul className="space-y-5 text-muted-foreground leading-relaxed">
          <li>
            <span className="font-semibold text-foreground">
              Upload your image
            </span>
            {" - "}
            Drag and drop or browse to select your JPG, PNG, WebP, or other
            image file.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Arrange your files
            </span>
            {" - "}
            If you&apos;re converting multiple images, reorder them however you
            like.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              Download your PDF
            </span>
            {" - "}
            Hit convert and grab your ready-to-share PDF file in seconds.
          </li>
        </ul>
        <p className="text-muted-foreground">
          That&apos;s it. No technical knowledge required.
        </p>
      </section>

      <section className="space-y-5" id="why-pdf">
        <SectionHeader title="Why Use an Online Image to PDF Converter?" />
        <div className="space-y-5 font-normal leading-relaxed text-muted-foreground">
          <p>
            If you&apos;re regularly sharing documents, submitting
            applications, or just trying to keep files organized, PDF is the
            go-to format for a reason. It preserves layout, works on every
            device, and looks professional.
          </p>
          <p className="font-semibold text-foreground">
            Converting images to PDF also makes it easier to:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
            <li>Combine multiple photos into a single document</li>
            <li>
              Submit scanned forms or ID proofs without file-size workarounds
            </li>
            <li>
              Send portfolios, invoices, or receipts in a universally readable
              format
            </li>
            <li>Archive images in a compressed, shareable package</li>
          </ul>
        </div>
      </section>

      <section className="space-y-5" id="differentiators">
        <SectionHeader title="What Makes ToolSpy&apos;s Image to PDF Converter Different?" />
        <div className="space-y-5 font-normal leading-relaxed text-muted-foreground">
          <p>
            There are dozens of tools out there that claim to convert images to
            PDF, but many of them come with annoying paywalls, daily limits, or
            hidden watermarks on your output files.
          </p>
          <p className="font-semibold text-foreground">
            ToolSpy keeps it simple and honest:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">
                Completely free
              </span>
              {" - "}
              No hidden charges or premium tiers for basic conversion
            </li>
            <li>
              <span className="font-semibold text-foreground">
                No sign-up required
              </span>
              {" - "}
              Just open the tool and get to work
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Supports multiple image formats
              </span>
              {" - "}
              JPG, JPEG, PNG, WebP, BMP, and more
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Merge multiple images
              </span>
              {" - "}
              Combine several pictures into one PDF in the right order
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Browser-based
              </span>
              {" - "}
              Works on Windows, Mac, Android, and iOS without installing
              anything
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Privacy-first
              </span>
              {" - "}
              Your files are processed securely and not stored on our servers
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-5" id="when-you-need-it">
        <SectionHeader title="When Would You Need to Convert Images to PDF?" />
        <div className="font-normal leading-relaxed text-muted-foreground space-y-5">
          <p>Here are some everyday situations where this tool comes in handy:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
            <li>
              Students submitting scanned assignments or handwritten notes
            </li>
            <li>
              Freelancers compiling project photos into a single proposal
              document
            </li>
            <li>
              Job seekers combining ID proof images into one upload-ready file
            </li>
            <li>
              Business owners sending product images as a catalog or quotation
            </li>
            <li>
              Anyone who needs to email multiple photos as one clean, organized
              file
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6" id="faq">
        
        <FAQ faqs={getImageToPdfFAQs()} />
      </section>

      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Questions or feedback? Visit our{" "}
            <Link href="/feedback" className="underline underline-offset-4">
              feedback page
            </Link>
            .
          </p>
          <ScrollToTopButton>Back to converter</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

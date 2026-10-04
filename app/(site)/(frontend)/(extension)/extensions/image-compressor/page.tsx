import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";
import {
  getImageCompressorExtensionFAQs,
  ImageCompressorExtensionSEOContent,
} from "./seo-content";

export const metadata = {
  title: `Best Image Compressor Extension — Fast, Free Photo Compression | ${siteConfig.name}`,
  description:
    "Compress JPEG, PNG, and WebP from your browser with Toolspy's free image compressor extension. One-click, quality-preserving, batch-ready — no upload required.",
  alternates: {
    canonical: `${siteConfig.url}/extensions/image-compressor`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "image-compressor");
  if (!data) notFound();

  const faqs = getImageCompressorExtensionFAQs();

  return (
    <>
      <WebPageSchema
        title={metadata.title}
        description={metadata.description}
        url={`${siteConfig.url}/extensions/image-compressor`}
        breadcrumbs={[
          { name: "Home", url: siteConfig.url },
          { name: "Extensions", url: `${siteConfig.url}/extensions` },
          { name: "Image Compressor", url: `${siteConfig.url}/extensions/image-compressor` },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <ExtensionLanding
        data={data}
        seoContent={<ImageCompressorExtensionSEOContent data={data} />}
      />
    </>
  );
}

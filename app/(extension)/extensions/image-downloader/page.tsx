import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";
import {
  getImageDownloaderExtensionFAQs,
  ImageDownloaderExtensionSEOContent,
} from "./seo-content";

export const metadata = {
  title: `Best Image Downloader Extension — Save Photos Fast & Free | ${siteConfig.name}`,
  description:
    "Download full-resolution images from any page with Toolspy's free image downloader extension. Bulk select, ZIP download, Instagram & Pinterest friendly — no screenshots needed.",
  alternates: {
    canonical: `${siteConfig.url}/extensions/image-downloader`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "image-downloader");
  if (!data) notFound();

  const faqs = getImageDownloaderExtensionFAQs();

  return (
    <>
      <WebPageSchema
        title={metadata.title}
        description={metadata.description}
        url={`${siteConfig.url}/extensions/image-downloader`}
        breadcrumbs={[
          { name: "Home", url: siteConfig.url },
          { name: "Extensions", url: `${siteConfig.url}/extensions` },
          { name: "Image Downloader", url: `${siteConfig.url}/extensions/image-downloader` },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <ExtensionLanding
        data={data}
        seoContent={<ImageDownloaderExtensionSEOContent data={data} />}
      />
    </>
  );
}

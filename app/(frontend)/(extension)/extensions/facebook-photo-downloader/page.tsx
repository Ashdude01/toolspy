import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";
import {
  getFacebookPhotoDownloaderExtensionFAQs,
  FacebookPhotoDownloaderExtensionSEOContent,
} from "./seo-content";

export const metadata = {
  title: `Facebook Photo Downloader - Save Time | Toolspy Extension`,
  description:
    "Download Facebook photos instantly with Toolspy's extension. Save time, batch download, no login required. Free, fast, works on Chrome & Firefox. Download now.",
  alternates: {
    canonical: `${siteConfig.url}/extensions/facebook-photo-downloader`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "facebook-photo-downloader");
  if (!data) notFound();

  const faqs = getFacebookPhotoDownloaderExtensionFAQs();

  return (
    <>
      <WebPageSchema
        title={metadata.title}
        description={metadata.description}
        url={`${siteConfig.url}/extensions/facebook-photo-downloader`}
        breadcrumbs={[
          { name: "Home", url: siteConfig.url },
          { name: "Extensions", url: `${siteConfig.url}/extensions` },
          {
            name: "Facebook Photo Downloader",
            url: `${siteConfig.url}/extensions/facebook-photo-downloader`,
          },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <ExtensionLanding
        data={data}
        seoContent={<FacebookPhotoDownloaderExtensionSEOContent data={data} />}
      />
    </>
  );
}

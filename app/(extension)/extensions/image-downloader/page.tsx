import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";

export const metadata = {
  title: `Image Downloader Extension | ${siteConfig.name}`,
  description:
    "Download images from any website. Scan the page, select thumbnails, download selected or as a ZIP, or open selected URLs in Toolspy to compress or convert.",
  alternates: {
    canonical: `${siteConfig.url}/extensions/image-downloader`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "image-downloader");
  if (!data) notFound();

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
      <FAQSchema faqs={data.faqs} />
      <ExtensionLanding data={data} />
    </>
  );
}


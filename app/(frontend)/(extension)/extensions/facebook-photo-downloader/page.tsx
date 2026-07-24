import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";

export const metadata = {
  title: `Facebook Photo Downloader Extension | ${siteConfig.name}`,
  description:
    "Scan the current page for images, select what you need, download individually or as a ZIP, or open selected URLs in Toolspy to compress or convert.",
  alternates: {
    canonical: `${siteConfig.url}/extensions/facebook-photo-downloader`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "facebook-photo-downloader");
  if (!data) notFound();

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
      <FAQSchema faqs={data.faqs} />
      <ExtensionLanding data={data} />
    </>
  );
}


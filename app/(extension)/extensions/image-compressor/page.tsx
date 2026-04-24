import { ExtensionLanding } from "@/components/extensions/extension-landing";
import { FAQSchema, WebPageSchema } from "@/components/seo/comprehensive-schemas";
import { siteConfig } from "@/lib/config";
import { extensions } from "@/lib/extensions-data";
import { notFound } from "next/navigation";

export const metadata = {
  title: `Image Compressor Extension | ${siteConfig.name}`,
  description:
    "Detect images on the current page, select what you need, and compress with presets and advanced options (quality, format, resize, EXIF removal).",
  alternates: {
    canonical: `${siteConfig.url}/extensions/image-compressor`,
  },
};

export default function Page() {
  const data = extensions.find((e) => e.slug === "image-compressor");
  if (!data) notFound();

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
      <FAQSchema faqs={data.faqs} />
      <ExtensionLanding data={data} />
    </>
  );
}


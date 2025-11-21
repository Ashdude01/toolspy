"use client"

import { useState } from "react"
import { ToolsGrid } from "@/components/home2/tools-grid"
import { FeaturesSection } from "@/components/home2/features-section"
import { TestimonialsSection } from "@/components/home2/testimonials-section"
import { BrowseCategoriesSection } from "@/components/home2/BrowseCategoriesSection"
import { HomeSeoContent } from "@/components/sections/home-seo-content"
import { WebPageSchema, FAQSchema } from "@/components/seo/comprehensive-schemas"
import { siteConfig } from "@/lib/config"

export default function HomePageV2() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqData = [
    {
      question: "Are all Toolspy tools really free to use?",
      answer: "Absolutely! Every single tool on Toolspy is completely free with no hidden costs, registration requirements, or usage limitations. You can compress images, convert PDFs, use calculators, and access encoding tools as many times as you want. Unlike many competitors who require paid subscriptions for advanced features, we believe professional-grade tools should be accessible to everyone."
    },
    {
      question: "How do you keep my files secure when using Toolspy tools?",
      answer: "Your privacy is incredibly important to us. Most of our tools, including image processors and calculators, work entirely in your browser using client-side processing. This means your files never leave your device - they're processed right on your computer. For tools that do require server processing, files are automatically deleted immediately after processing. We never store, access, or share your data with anyone."
    },
    {
      question: "What file formats and sizes can I work with on Toolspy?",
      answer: "Toolspy supports virtually all major file formats you'll encounter. For images, we handle JPEG, PNG, WebP, AVIF, BMP, and TIFF. For documents, we work with PDF, Word, Excel, PowerPoint, and more. Most tools support files up to 100MB, which is much larger than many competitors. Our tools are built to handle both small personal files and large professional documents efficiently."
    },
    {
      question: "Do I need to download or install anything to use Toolspy?",
      answer: "Not at all! All Toolspy tools are browser-based and work instantly on any device with an internet connection. Just visit our website, select your tool, upload your files, and get results immediately. Our tools work perfectly on Windows, Mac, Linux, iOS, and Android devices using any modern browser. No downloads, no installations, no hassle."
    },
    {
      question: "Can I use Toolspy tools on my phone or tablet?",
      answer: "Yes, definitely! All our tools are designed to work flawlessly on mobile devices, tablets, and desktop computers. The interface automatically adapts to your screen size with touch-optimized controls. Whether you're compressing images on your phone, converting PDFs on your tablet, or using calculators anywhere, you'll get the same professional results."
    },
    {
      question: "How does batch processing work, and how many files can I process?",
      answer: "Many of our tools support batch processing, which is super handy when you have multiple files to work with. For example, you can compress up to 100 images at once, merge several PDFs, or convert multiple documents in one go. Progress is shown in real-time with detailed status updates, and you can download all processed files individually or as a convenient ZIP archive."
    },
    {
      question: "What makes Toolspy better than other free online tool websites?",
      answer: "Several things set us apart: we use client-side processing for better privacy, we support higher file size limits (up to 100MB vs 25MB on competitors like iLovePDF), we don't require registration, our interface is clean without annoying ads, and we offer professional-grade features that are usually behind paywalls. Plus, our tools are faster because many work directly in your browser."
    },
    {
      question: "Are these tools good enough for business and professional use?",
      answer: "Absolutely! Our tools are designed with professional standards in mind. We offer advanced features like precise quality control, multiple format support, batch processing, and high file size limits. Many businesses, freelancers, developers, and content creators rely on Toolspy for their daily workflows including image optimization, document conversion, and data processing tasks."
    },
    {
      question: "How often do you add new tools or update existing ones?",
      answer: "We're constantly working to improve and expand Toolspy based on user feedback and emerging digital needs. We regularly add new tools for image processing, PDF manipulation, calculators, and developer utilities. We also update existing tools with new features and improved algorithms to make sure you always have access to the latest technology."
    },
    {
      question: "Can I use Toolspy tools for my business or client work?",
      answer: "Yes, you can! All Toolspy tools are free for both personal and commercial use without any restrictions. You can use them for client work, business projects, marketing campaigns, content creation, and any commercial application. There are no attribution requirements, licensing fees, or usage limits for commercial purposes."
    }
  ];
  return (
    <>
      <WebPageSchema
        title={siteConfig.title}
        description={siteConfig.description}
        url={siteConfig.url}
        breadcrumbs={[
          { name: "Home", url: siteConfig.url }
        ]}
      />
      <FAQSchema faqs={faqData} />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden w-full">
        <ToolsGrid searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BrowseCategoriesSection/>
        <FeaturesSection />
        <HomeSeoContent faqData={faqData} />
        <TestimonialsSection />
      </div>
    </>
  )
}


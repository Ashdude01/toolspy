"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Image,
  FileText,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function PdfToImageSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I convert PDF pages to images?",
      answer:
        "Simply upload your PDF file, choose your preferred image format (PNG, JPG, or WebP), select the pages you want to convert, and click convert. Our tool will extract each page as a separate high-quality image file that you can download individually or as a ZIP archive.",
    },
    {
      question: "What image formats are supported for conversion?",
      answer:
        "We support conversion to PNG (lossless, best quality), JPG (smaller file size), and WebP (modern format with excellent compression). PNG is recommended for documents with text and graphics, while JPG works well for image-heavy PDFs.",
    },
    {
      question: "Can I convert specific pages instead of the entire PDF?",
      answer:
        "Yes! You can convert all pages, just the first page, or specify custom page ranges (e.g., '1,3,5-7' to convert pages 1, 3, and pages 5 through 7). This gives you complete control over which pages to extract as images.",
    },
    {
      question: "What image quality settings are available?",
      answer:
        "Choose from 150 DPI (small files), 300 DPI (standard quality), or 600 DPI (high quality). Higher DPI settings produce larger but more detailed images, perfect for printing or professional use.",
    },
    {
      question: "Is this PDF to image converter free to use?",
      answer:
        "Yes, our PDF to image converter is completely free with no registration required. Convert unlimited PDFs to images without watermarks, file limits, or hidden costs.",
    },
    {
      question: "How many PDF files can I convert at once?",
      answer:
        "You can upload and convert up to 10 PDF files simultaneously. Each PDF can contain multiple pages, and all pages will be converted to individual image files.",
    },
    {
      question: "Is my data secure when converting PDFs to images?",
      answer:
        "Absolutely! All conversion happens directly in your browser using client-side processing. Your PDF files never leave your device, ensuring complete privacy and security for sensitive documents.",
    },
    {
      question: "What's the maximum file size supported?",
      answer:
        "Each PDF file can be up to 50MB in size. This supports most professional documents, presentations, and reports while maintaining fast processing speeds.",
    },
    {
      question: "Can I convert password-protected PDFs?",
      answer:
        "Currently, our tool works with unprotected PDF files. If you have a password-protected PDF, you'll need to remove the password protection first before conversion.",
    },
    {
      question: "What happens to the original PDF after conversion?",
      answer:
        "Your original PDF remains unchanged. The conversion creates new image files based on the PDF content without modifying the source document in any way.",
    },
  ];

  const benefits = [
    {
      icon: <Image className="h-6 w-6" />,
      title: "High-Quality Image Extraction",
      description:
        "Convert PDF pages to crisp, high-resolution images with customizable DPI settings for any use case.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Flexible Page Selection",
      description:
        "Convert all pages, single pages, or custom page ranges with precise control over your output.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Client-side processing ensures your documents never leave your device, providing maximum security.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Multiple Format Support",
      description:
        "Export to PNG, JPG, or WebP formats with optimized settings for different use cases.",
    },
  ];

  const relatedTools = [
    {
      name: "PDF Compressor",
      description: "Reduce PDF file size while maintaining quality",
      href: "/compress-pdf",
      keywords: "pdf compressor, reduce size",
      comingSoon: true,
    },
    {
      name: "Merge PDF Files",
      description: "Combine multiple PDF documents into one",
      href: "/merge-pdf",
      keywords: "merge pdf, combine pdf",
      comingSoon: true,
    },
    {
      name: "JFIF to PDF Converter",
      description: "Convert JFIF images to PDF documents",
      href: "/jfif-to-pdf",
      keywords: "jfif to pdf, image to pdf",
      comingSoon: true,
    },
    {
      name: "Image Compressor",
      description: "Compress images while maintaining quality",
      href: "/image-compressor",
      keywords: "image compressor, optimize images",
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=PDF+to+Image+Converter+%7C+Toolspy+-+High+Quality+Extraction+%7C+Privacy+Protected"
              alt="Toolspy PDF to Image Converter - Extract PDF pages as high-quality images with complete privacy"
              className="w-full rounded-xl shadow-lg border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF to Image Conversion
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Transform your PDF documents into high-quality images with our advanced conversion technology. 
            Extract individual pages or entire documents as PNG, JPG, or WebP images with customizable 
            quality settings and complete privacy protection.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for creating thumbnails, extracting diagrams, converting presentations for social media, 
            or archiving document pages as images. Our tool maintains the original quality while giving you 
            full control over the output format and resolution.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Our PDF to Image Converter?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setSelectedFaq(selectedFaq === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    <h4>{faq.question}</h4>
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Related PDF Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools.map((tool, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Keywords: {tool.keywords}
                  </p>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.href}>Try Tool →</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Convert Your PDF to Images Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Extract high-quality images from your PDF documents with complete privacy protection and professional results.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting →
          </Button>
        </div>
      </section>
    </div>
  );
} 
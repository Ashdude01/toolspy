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
  RefreshCw,
  Image,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function JfifToJpgSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "50MB",
      convertio: "100MB",
      online_convert: "100MB",
      zamzar: "50MB",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 50 files",
      convertio: "❌ Single file",
      online_convert: "❌ Single file",
      zamzar: "❌ Single file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Control",
      toolspy: "✅ 10-100% precision",
      convertio: "❌ Fixed quality",
      online_convert: "✅ Basic control",
      zamzar: "❌ No control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      convertio: "⚠️ Server-based",
      online_convert: "⚠️ Server-based",
      zamzar: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      convertio: "❌ Account required",
      online_convert: "✅ Limited usage",
      zamzar: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant",
      convertio: "⚠️ Server delays",
      online_convert: "⚠️ Server delays",
      zamzar: "⚠️ Queue system",
      toolspyStatus: "excellent",
    },
    {
      feature: "Output Quality",
      toolspy: "✅ High quality",
      convertio: "✅ Good quality",
      online_convert: "✅ Standard quality",
      zamzar: "✅ Good quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ JFIF, JIF to JPG",
      convertio: "✅ Multiple formats",
      online_convert: "✅ Multiple formats",
      zamzar: "✅ Multiple formats",
      toolspyStatus: "excellent",
    },
  ];

  const faqData = [
    {
      question: "What is JFIF format and why convert it to JPG?",
      answer:
        "JFIF (JPEG File Interchange Format) is a standard for storing JPEG compressed images. While JFIF and JPG are technically similar, JPG is more universally supported across different platforms, applications, and devices. Converting JFIF to JPG ensures maximum compatibility.",
    },
    {
      question: "Is the JFIF to JPG converter completely free?",
      answer:
        "Yes, our JFIF to JPG converter is completely free with no hidden costs, registration requirements, or usage limitations. Convert unlimited JFIF files to JPG without any restrictions or watermarks.",
    },
    {
      question: "How many JFIF files can I convert at once?",
      answer:
        "You can convert up to 50 JFIF files simultaneously in a single batch operation. This makes it perfect for bulk conversion tasks, photo organization, or processing large image collections efficiently.",
    },
    {
      question: "Will the image quality be preserved during conversion?",
      answer:
        "Yes, our converter maintains the original image quality during the JFIF to JPG conversion process. You can also adjust the JPG quality from 10% to 100% to balance file size with visual quality according to your needs.",
    },
    {
      question: "Is it safe to upload my JFIF images?",
      answer:
        "Absolutely! Our converter uses client-side processing, meaning your images are converted directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your personal or sensitive images.",
    },
    {
      question: "What's the maximum file size supported?",
      answer:
        "Each JFIF file can be up to 50MB in size, which accommodates most high-resolution images and professional photography. This limit ensures fast processing while supporting quality images.",
    },
    {
      question: "Can I adjust the JPG quality during conversion?",
      answer:
        "Yes! You have full control over the output JPG quality with a precision slider ranging from 10% to 100%. Higher quality settings produce larger files with better image quality, while lower settings create smaller files.",
    },
    {
      question: "What devices and browsers support this converter?",
      answer:
        "Our JFIF to JPG converter works on all modern devices and browsers including Windows, Mac, iOS, Android, Chrome, Firefox, Safari, and Edge. No software installation is required.",
    },
    {
      question: "How long does the conversion process take?",
      answer:
        "Conversion is nearly instantaneous since it happens directly in your browser. Processing time depends on the number and size of files, but most conversions complete within seconds without any server delays.",
    },
    {
      question: "Can I convert other image formats besides JFIF?",
      answer:
        "This tool is specifically designed for JFIF to JPG conversion. However, we offer other image conversion tools for different formats. Check our image tools section for converters supporting PNG, WebP, and other formats.",
    },
  ];

  const benefits = [
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Universal Compatibility",
      description:
        "Convert JFIF images to widely supported JPG format for maximum compatibility across all platforms and applications.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Quality Control",
      description:
        "Adjust JPG quality from 10-100% to perfectly balance file size and image quality for your specific needs.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Client-side processing ensures your images never leave your device, providing maximum privacy and security.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description:
        "Convert up to 50 JFIF files simultaneously with intelligent processing and real-time progress tracking.",
    },
  ];

  const relatedTools = [
    {
      name: "Image Compressor",
      description: "Compress images while maintaining quality",
      href: "/image-compressor",
      keywords: "image compressor, optimize images",
    },
    {
      name: "JFIF to PDF Converter",
      description: "Convert JFIF images to PDF documents",
      href: "/jfif-to-pdf",
      keywords: "jfif to pdf, image to pdf",
      comingSoon: true,
    },
    {
      name: "Image to Base64 Encoder",
      description: "Convert images to Base64 encoded strings",
      href: "/image-to-base64",
      keywords: "image to base64, encode image",
    },
    {
      name: "Base64 to Image Decoder",
      description: "Convert Base64 strings back to image files",
      href: "/base64-to-image",
      keywords: "base64 to image, decode image",
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=JFIF+to+JPG+Converter+%7C+Toolspy+-+Universal+Compatibility+%7C+Privacy+Protected"
              alt="Toolspy JFIF to JPG Converter - Convert JFIF images to JPG format with quality control and privacy protection"
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
            Professional JFIF to JPG Conversion Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Transform your JFIF images into universally compatible JPG format with our advanced conversion technology. 
            Our tool provides precise quality control, batch processing capabilities, and complete privacy protection 
            for seamless image format conversion.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for ensuring maximum compatibility across different platforms, applications, and devices. 
            Whether you're preparing images for web use, social media, or professional applications, our converter 
            delivers reliable results with customizable quality settings.
          </p>
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert JFIF to JPG
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to convert your JFIF images to JPG format with optimal quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Upload+JFIF+Files+-+Drag+and+Drop+Interface"
              alt="JFIF Upload Interface - Drag and drop JFIF files for conversion"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">1. Upload JFIF Files</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your JFIF images or click to browse. Support for batch uploading up to 50 files simultaneously.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/ddd6fe/7c3aed?text=Quality+Settings+-+Adjust+JPG+Quality"
              alt="Quality Settings Panel - Adjust JPG quality from 10% to 100%"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">2. Adjust Quality Settings</h4>
            <p className="text-sm text-muted-foreground">
              Set JPG quality from 10% to 100% to balance file size and image quality according to your needs.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/dcfce7/16a34a?text=Conversion+Process+-+Real-time+Progress"
              alt="Conversion Progress - Real-time progress tracking during JFIF to JPG conversion"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">3. Convert to JPG</h4>
            <p className="text-sm text-muted-foreground">
              Click convert and watch real-time progress as your JFIF images are transformed into JPG format.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/fef3c7/d97706?text=Download+JPG+Files+-+Individual+or+Batch"
              alt="Download Interface - Download converted JPG files individually or as ZIP"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">4. Download JPG Files</h4>
            <p className="text-sm text-muted-foreground">
              Download your converted JPG files individually or all at once as a convenient ZIP archive.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Our JFIF to JPG Converter?
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

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Toolspy vs. Competitors
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>
              See how Toolspy compares to other JFIF to JPG converters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">Convertio</th>
                    <th className="text-left p-3 font-medium">Online-Convert</th>
                    <th className="text-left p-3 font-medium">Zamzar</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{row.toolspy}</span>
                          {row.toolspyStatus === "excellent" && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.toolspyStatus === "good" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.convertio}</td>
                      <td className="p-3 text-muted-foreground">{row.online_convert}</td>
                      <td className="p-3 text-muted-foreground">{row.zamzar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
          Related Image Tools
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
            Convert Your JFIF Images to JPG Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your JFIF images into universally compatible JPG format with complete privacy protection and quality control.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting Now →
          </Button>
        </div>
      </section>
    </div>
  );
} 
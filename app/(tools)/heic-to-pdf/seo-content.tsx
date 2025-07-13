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
  Target,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

export function HeicToPdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "50MB",
      cloudconvert: "100MB",
      convertio: "100MB",
      iloveimg: "25MB",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 50 files",
      cloudconvert: "✅ Up to 5 files",
      convertio: "✅ Up to 2 files",
      iloveimg: "✅ Up to 15 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "Layout Options",
      toolspy: "✅ Portrait/Landscape",
      cloudconvert: "❌ Basic",
      convertio: "❌ Limited",
      iloveimg: "❌ None",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      cloudconvert: "❌ Server upload",
      convertio: "❌ Server upload",
      iloveimg: "❌ Server upload",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      cloudconvert: "❌ Limited free",
      convertio: "❌ Limited free",
      iloveimg: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Speed",
      toolspy: "⚡ Instant",
      cloudconvert: "🐌 Slow upload",
      convertio: "🐌 Slow upload",
      iloveimg: "🐌 Slow upload",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Convert HEIC to PDF in seconds with our optimized processing engine",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Secure",
      description: "Your files never leave your device - complete privacy protection",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "High Quality",
      description: "Preserve original image quality with lossless conversion",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Customizable",
      description: "Choose layout, orientation, and page settings",
    },
  ];

  const faqs = [
    {
      question: "What is a HEIC file?",
      answer: "HEIC (High Efficiency Image Container) is Apple's modern image format used by iPhones and iPads since iOS 11. It provides better compression than JPEG while maintaining high quality."
    },
    {
      question: "Why convert HEIC to PDF?",
      answer: "Converting HEIC to PDF makes your iPhone photos universally accessible, easier to share, and compatible with all devices and platforms. PDFs are perfect for documentation and archiving."
    },
    {
      question: "Is my data safe when converting files?",
      answer: "Absolutely! Our tool processes everything locally in your browser. Your HEIC files never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I convert multiple HEIC files at once?",
      answer: "Yes! Our batch processing feature allows you to convert up to 50 HEIC files to PDF simultaneously, saving you time and effort."
    },
    {
      question: "What devices support HEIC files?",
      answer: "HEIC files are primarily created by Apple devices (iPhone, iPad, Mac) running iOS 11+ or macOS High Sierra+. Android and Windows have limited native support."
    },
    {
      question: "Will the PDF maintain the original image quality?",
      answer: "Yes! Our converter preserves the original image quality while creating clean, professional PDF documents with your HEIC images."
    },
    {
      question: "Can I adjust the PDF layout?",
      answer: "Absolutely! You can choose portrait or landscape orientation, adjust margins, and select how images are positioned within the PDF pages."
    },
    {
      question: "Is there a file size limit?",
      answer: "Each HEIC file can be up to 50MB, and you can process up to 50 files at once. This covers virtually all iPhone photos and image collections."
    },
    {
      question: "Do I need to install software?",
      answer: "No installation required! Our web-based tool works directly in your browser on any device - Windows, Mac, iPhone, Android, or Chromebook."
    },
    {
      question: "What if my HEIC files won't convert?",
      answer: "Ensure your files are valid HEIC format and under 50MB. If issues persist, try converting one file at a time or check if the file is corrupted."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional HEIC to PDF Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert Apple HEIC images to PDF instantly with our advanced converter. 
            Batch process up to 50 files while maintaining perfect quality - all in your browser.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Why Choose Toolspy's HEIC to PDF Converter?
          </CardTitle>
          <CardDescription className="text-center">
            See how we compare to other popular conversion tools
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-center p-3 font-semibold text-blue-600">
                  Toolspy
                </th>
                <th className="text-center p-3 font-semibold">CloudConvert</th>
                <th className="text-center p-3 font-semibold">Convertio</th>
                <th className="text-center p-3 font-semibold">ILoveIMG</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.feature}</td>
                  <td className="p-3 text-center">
                    <Badge
                      variant={
                        row.toolspyStatus === "excellent"
                          ? "default"
                          : row.toolspyStatus === "good"
                          ? "secondary"
                          : "outline"
                      }
                      className="whitespace-nowrap"
                    >
                      {row.toolspy}
                    </Badge>
                  </td>
                  <td className="p-3 text-center text-gray-600">{row.cloudconvert}</td>
                  <td className="p-3 text-center text-gray-600">{row.convertio}</td>
                  <td className="p-3 text-center text-gray-600">{row.iloveimg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Benefits of Converting HEIC to PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Universal Compatibility</h4>
                  <p className="text-gray-600 text-sm">
                    PDF files work on all devices and platforms, unlike HEIC which is Apple-specific
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Professional Documentation</h4>
                  <p className="text-gray-600 text-sm">
                    Perfect for creating photo reports, portfolios, and business presentations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Easy Sharing</h4>
                  <p className="text-gray-600 text-sm">
                    Share your iPhone photos with anyone, regardless of their device
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Archival Quality</h4>
                  <p className="text-gray-600 text-sm">
                    PDFs are perfect for long-term storage and archival purposes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Print Ready</h4>
                  <p className="text-gray-600 text-sm">
                    Convert iPhone photos to print-ready PDFs with precise formatting
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Batch Processing</h4>
                  <p className="text-gray-600 text-sm">
                    Convert entire photo albums to PDF in one go
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-center">
            Everything you need to know about HEIC to PDF conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
                {selectedFaq === index && (
                  <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Convert Your HEIC Files?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start converting your iPhone photos to PDF format instantly. 
            No registration, no software downloads - just fast, secure conversion.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert HEIC to PDF Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
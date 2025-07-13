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
  Target,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

export function ImageConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Multiple Formats",
      description: "Convert between PNG, JPEG, WebP, GIF, BMP, and TIFF formats",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Batch Processing",
      description: "Convert up to 50 images simultaneously with one click",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "All conversions happen locally in your browser",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Quality Control",
      description: "Adjust quality settings for optimal file size and image quality",
    },
  ];

  const faqs = [
    {
      question: "Which image formats are supported?",
      answer: "We support PNG, JPEG, WebP, GIF, BMP, and TIFF formats. You can convert from any format to any other format with high quality preservation."
    },
    {
      question: "What's the difference between PNG and JPEG?",
      answer: "PNG is lossless and supports transparency but creates larger files. JPEG is lossy compression that creates smaller files but doesn't support transparency."
    },
    {
      question: "When should I use WebP format?",
      answer: "WebP offers excellent compression with good quality, making it ideal for web use. It's supported by all modern browsers and can reduce file sizes significantly."
    },
    {
      question: "Can I convert multiple images at once?",
      answer: "Yes! You can upload and convert up to 50 images simultaneously. All converted images can be downloaded individually or as a ZIP file."
    },
    {
      question: "How do I choose the right quality setting?",
      answer: "For web use, 80-85% quality is usually perfect. For printing, use 90-95%. Lower quality means smaller file sizes but reduced image quality."
    },
    {
      question: "Is my data safe during conversion?",
      answer: "Absolutely! All image processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Image Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert images between all major formats with batch processing and quality control. 
            Perfect for web optimization, printing, and format compatibility.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-purple-600">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
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

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Images Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Upload your images and convert them to any format with professional quality.
          </p>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Converting Images
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
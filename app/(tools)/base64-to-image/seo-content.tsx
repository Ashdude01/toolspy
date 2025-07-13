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

export function Base64ToImageSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert Base64 strings to image files instantly with preview",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Multiple Formats",
      description: "Support for PNG, JPG, WebP, and other image formats",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Secure",
      description: "All conversions happen locally in your browser",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Easy Download",
      description: "Download converted images instantly or copy to clipboard",
    },
  ];

  const faqs = [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a way to encode binary data (like images) into text format using only ASCII characters. It's commonly used to embed images in HTML, CSS, or JSON data."
    },
    {
      question: "How do I use Base64 images?",
      answer: "Base64 images can be embedded directly in HTML using data URLs (data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...) or used in CSS, JSON APIs, and email templates."
    },
    {
      question: "What file formats are supported?",
      answer: "Our converter supports all common image formats including PNG, JPG, JPEG, WebP, GIF, and SVG. The format is automatically detected from the Base64 string."
    },
    {
      question: "Is my data safe during conversion?",
      answer: "Yes! All conversions happen locally in your browser. Your Base64 data and images never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I convert multiple Base64 strings?",
      answer: "You can convert one Base64 string at a time. Simply paste a new Base64 string to convert another image. Each conversion is independent and secure."
    },
    {
      question: "What if my Base64 string is invalid?",
      answer: "If the Base64 string is invalid or corrupted, you'll see an error message. Make sure the string is complete and properly formatted without line breaks or extra characters."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Base64 to Image Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert Base64 encoded strings back to image files instantly. 
            Perfect for developers, designers, and anyone working with encoded images.
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
            Convert Base64 to Image Now
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Paste your Base64 string and get an instant image preview with download options.
          </p>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Base64 to Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
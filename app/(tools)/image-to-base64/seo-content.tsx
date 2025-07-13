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

export function ImageToBase64SEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Encoding",
      description: "Convert images to Base64 strings instantly with one click",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Image Types",
      description: "Support for PNG, JPG, WebP, GIF, and SVG image formats",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Secure",
      description: "Images are processed locally and never uploaded to servers",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Easy Copy",
      description: "Copy Base64 strings to clipboard or download as text files",
    },
  ];

  const faqs = [
    {
      question: "What is Base64 encoding used for?",
      answer: "Base64 encoding is used to embed images directly in HTML, CSS, JSON APIs, email templates, and databases. It eliminates the need for separate image files."
    },
    {
      question: "What are the advantages of Base64 images?",
      answer: "Base64 images reduce HTTP requests, work offline, can't be blocked by ad blockers, and are perfect for small icons and graphics embedded in code."
    },
    {
      question: "Are there any disadvantages?",
      answer: "Base64 images are about 33% larger than original files and aren't cached by browsers. They're best for small images under 10KB."
    },
    {
      question: "How do I use the Base64 output?",
      answer: "Use the output as a data URL in HTML: <img src='data:image/png;base64,iVBORw0KGgoAAAA...'> or in CSS: background-image: url('data:image/png;base64,iVBORw0KGgoAAAA...');"
    },
    {
      question: "What file size limit should I consider?",
      answer: "While there's no technical limit, Base64 images work best for small files under 10KB. Larger images should typically be served as separate files for better performance."
    },
    {
      question: "Is the conversion secure?",
      answer: "Yes! All image processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Image to Base64 Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert images to Base64 encoded strings for embedding in HTML, CSS, or JSON. 
            Perfect for developers and designers working with inline images.
          </CardDescription>
        </CardHeader>
      </Card>

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

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Images to Base64 Now
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Upload your image and get instant Base64 encoding for web development and design.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Image to Base64
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
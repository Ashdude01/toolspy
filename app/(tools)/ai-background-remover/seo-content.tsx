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
  Scissors,
  Sparkles,
  Brush,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function AiBackgroundRemoverSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ai-background-remover");

  const comparisonData = [
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      removebg: "12MB",
      photoscissors: "10MB",
      canva: "25MB",
      toolspyStatus: "excellent",
    },
    {
      feature: "Magic Brush Tool",
      toolspy: "✅ Advanced editing",
      removebg: "❌ Not available",
      photoscissors: "✅ Basic brush",
      canva: "✅ Basic editing",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple images",
      removebg: "✅ API only",
      photoscissors: "❌ Single image",
      canva: "❌ Single image",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      removebg: "⚠️ Server upload",
      photoscissors: "⚠️ Server upload",
      canva: "⚠️ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Background Replacement",
      toolspy: "✅ Color, gradient, blur",
      removebg: "✅ Limited options",
      photoscissors: "✅ Color/image",
      canva: "✅ Extensive library",
      toolspyStatus: "excellent",
    },
    {
      feature: "Edge Quality",
      toolspy: "✅ AI smoothing",
      removebg: "✅ High quality",
      photoscissors: "✅ Good quality",
      canva: "✅ Good quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Free Usage",
      toolspy: "✅ Unlimited",
      removebg: "✅ 50 images/month",
      photoscissors: "✅ 10 images/day",
      canva: "✅ Limited features",
      toolspyStatus: "excellent",
    },
    {
      feature: "API Access",
      toolspy: "✅ Coming soon",
      removebg: "✅ Available",
      photoscissors: "❌ Not available",
      canva: "❌ Not available",
      toolspyStatus: "good",
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Precision",
      description: "Advanced machine learning algorithms automatically detect and remove backgrounds with professional accuracy."
    },
    {
      icon: <Brush className="h-6 w-6" />,
      title: "Magic Brush Touch-ups",
      description: "Fine-tune results with intelligent brush tools for erasing or restoring specific areas with precision."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description: "All processing happens locally in your browser - your images never leave your device."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Controls",
      description: "Adjust edge smoothing, feathering, and background replacement options for perfect results."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Remove backgrounds in seconds with optimized AI processing and instant preview."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Export Options",
      description: "Download as PNG with transparency, add custom backgrounds, or export with various settings."
    }
  ];

  const useCases = [
    {
      title: "E-commerce & Product Photography",
      description: "Create clean, professional product images for online stores and marketplaces.",
      examples: ["Amazon listings", "Shopify products", "eBay photos", "Catalog images"]
    },
    {
      title: "Social Media & Marketing",
      description: "Design eye-catching graphics and posts with transparent or custom backgrounds.",
      examples: ["Instagram posts", "Facebook ads", "LinkedIn banners", "YouTube thumbnails"]
    },
    {
      title: "Professional Portraits",
      description: "Remove distracting backgrounds from headshots and professional photos.",
      examples: ["LinkedIn profiles", "Company headshots", "Resume photos", "Dating profiles"]
    },
    {
      title: "Creative Design Projects",
      description: "Extract subjects for graphic design, collages, and artistic compositions.",
      examples: ["Poster design", "Digital art", "Presentations", "Website graphics"]
    }
  ];

  const processingSteps = [
    {
      step: 1,
      title: "Upload Image",
      description: "Drag and drop or select your image file (up to 50MB)"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI analyzes the image and detects subject boundaries"
    },
    {
      step: 3,
      title: "Background Removal",
      description: "Advanced algorithms remove the background with pixel-perfect precision"
    },
    {
      step: 4,
      title: "Fine-tuning",
      description: "Use magic brush tools to perfect the edges and details"
    },
    {
      step: 5,
      title: "Export",
      description: "Download as PNG with transparency or add a custom background"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the AI background removal?",
      answer: "Our AI uses advanced machine learning models trained on millions of images to achieve professional-grade accuracy. It can handle complex subjects including hair, fur, transparent objects, and intricate details. The magic brush tool allows you to perfect any areas that need touch-ups."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all common image formats including JPG, PNG, WebP, GIF, and more. You can upload files up to 50MB in size, which is larger than most competitors, allowing you to work with high-resolution images."
    },
    {
      question: "Is my image data secure and private?",
      answer: "Absolutely! Unlike other tools that upload your images to servers, our AI background remover processes everything locally in your browser. Your images never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I edit the results after background removal?",
      answer: "Yes! Our magic brush tool lets you fine-tune the results. You can erase unwanted areas or restore parts that were accidentally removed. The tool includes undo/redo functionality and adjustable brush sizes for precise editing."
    },
    {
      question: "How do I add a new background to my image?",
      answer: "After removing the background, you can choose from several options: keep it transparent, add a solid color, create a gradient, or use a blurred version of the original image. You can also download the transparent PNG and use it in any design software."
    },
    {
      question: "What's the difference between PNG and JPG output?",
      answer: "PNG format supports transparency, making it perfect for images without backgrounds. JPG format doesn't support transparency, so it's better when you've added a solid background. We recommend PNG for maximum flexibility."
    },
    {
      question: "Can I process multiple images at once?",
      answer: "Yes, our tool supports batch processing. You can upload and process multiple images simultaneously, saving time when working on large projects or product catalogs."
    },
    {
      question: "Does this work on mobile devices?",
      answer: "Yes! Our tool is fully responsive and works on smartphones and tablets. The touch-friendly interface makes it easy to use the magic brush tool on mobile devices."
    },
    {
      question: "How does this compare to Photoshop or other professional tools?",
      answer: "While professional tools offer more advanced features, our AI background remover provides comparable quality for most use cases with much easier operation. It's perfect for users who need quick, professional results without the complexity of advanced software."
    },
    {
      question: "Are there any usage limits or costs?",
      answer: "Our basic background removal tool is completely free with no limits on the number of images you can process. We believe in providing powerful tools accessible to everyone."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ai-background-remover', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Background Remover?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology combined with professional editing tools delivers superior results with complete privacy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Remove backgrounds in 5 simple steps with professional results every time.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {processingSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our AI background remover outperforms popular alternatives with superior features and privacy.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-blue-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Remove.bg</th>
                    <th className="text-center p-4 font-semibold">PhotoScissors</th>
                    <th className="text-center p-4 font-semibold">Canva</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-blue-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.removebg}</td>
                      <td className="p-4 text-center">{row.photoscissors}</td>
                      <td className="p-4 text-center">{row.canva}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perfect For Every Use Case
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From e-commerce to social media, our background remover enhances every type of visual content.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  {useCase.title}
                </CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about AI background removal and our advanced features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <CardTitle className="text-left text-lg font-semibold">
                    {faq.question}
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <RelatedTools 
          currentToolSlug="ai-background-remover"
        />
      </section>
    </div>
  );
}
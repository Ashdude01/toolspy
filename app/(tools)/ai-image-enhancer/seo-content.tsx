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
  Sparkles,
  Focus,
  Palette,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function AiImageEnhancerSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ai-image-enhancer");

  const comparisonData = [
    {
      feature: "Enhancement Types",
      toolspy: "✅ 6 AI enhancement modes",
      topazlabs: "✅ Multiple models",
      waifu2x: "✅ Anime/art focus",
      bigjpg: "✅ Basic upscaling",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Unlimited batch processing",
      topazlabs: "✅ Batch support",
      waifu2x: "❌ Single image only",
      bigjpg: "❌ Single image only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Upscaling Factor",
      toolspy: "✅ Up to 4x resolution",
      topazlabs: "✅ Up to 6x",
      waifu2x: "✅ Up to 2x",
      bigjpg: "✅ Up to 4x",
      toolspyStatus: "excellent",
    },
    {
      feature: "Colorization",
      toolspy: "✅ AI-powered colorization",
      topazlabs: "❌ Not available",
      waifu2x: "❌ Not available",
      bigjpg: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Photo Restoration",
      toolspy: "✅ Old photo restoration",
      topazlabs: "✅ Advanced restoration",
      waifu2x: "❌ Not available",
      bigjpg: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      topazlabs: "⚠️ Desktop software",
      waifu2x: "⚠️ Server upload",
      bigjpg: "⚠️ Server upload",
      toolspyStatus: "excellent",
    },
    {
      feature: "Free Usage",
      toolspy: "✅ Unlimited free",
      topazlabs: "❌ Paid software",
      waifu2x: "✅ Free",
      bigjpg: "✅ Limited free",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      topazlabs: "No limit (local)",
      waifu2x: "5MB",
      bigjpg: "10MB",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Super Resolution",
      description: "Upscale images up to 4x resolution using advanced machine learning algorithms while preserving fine details."
    },
    {
      icon: <Focus className="h-6 w-6" />,
      title: "Intelligent Deblurring",
      description: "Remove motion blur and focus issues with AI that understands image content and reconstructs sharp details."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Photo Restoration",
      description: "Restore old, damaged, or faded photographs with AI that repairs scratches, tears, and color degradation."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Smart Colorization",
      description: "Add realistic colors to black and white photos using AI trained on millions of historical and modern images."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All image processing happens locally in your browser - your photos never leave your device."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Enhancement",
      description: "Process multiple images simultaneously with consistent quality and settings for efficient workflow."
    }
  ];

  const useCases = [
    {
      title: "Photography & Art",
      description: "Enhance photos for professional portfolios, exhibitions, and high-quality prints.",
      examples: ["Portrait enhancement", "Landscape photography", "Art reproduction", "Wedding photos"]
    },
    {
      title: "Digital Archiving",
      description: "Preserve and restore family photos, historical documents, and vintage imagery.",
      examples: ["Family albums", "Historical photos", "Vintage postcards", "Old negatives"]
    },
    {
      title: "Content Creation",
      description: "Improve visual content for websites, social media, and marketing materials.",
      examples: ["Blog images", "Social media posts", "Marketing materials", "Website graphics"]
    },
    {
      title: "Print & Publishing",
      description: "Prepare images for high-resolution printing and professional publishing.",
      examples: ["Book illustrations", "Magazine photos", "Poster printing", "Canvas prints"]
    }
  ];

  const enhancementTypes = [
    {
      name: "Super Resolution",
      description: "AI upscaling with detail preservation",
      features: ["2x to 4x upscaling", "Edge enhancement", "Texture preservation", "Artifact reduction"]
    },
    {
      name: "Deblurring",
      description: "Remove motion and focus blur",
      features: ["Motion blur removal", "Focus correction", "Shake stabilization", "Detail recovery"]
    },
    {
      name: "Photo Restoration",
      description: "Repair old and damaged photos",
      features: ["Scratch removal", "Color restoration", "Contrast enhancement", "Noise reduction"]
    },
    {
      name: "Colorization",
      description: "Add realistic colors to B&W photos",
      features: ["Historical accuracy", "Skin tone detection", "Natural color mapping", "Context awareness"]
    }
  ];

  const faqs = [
    {
      question: "How does AI image enhancement work?",
      answer: "Our AI uses deep learning models trained on millions of high-quality images to understand patterns, textures, and details. It analyzes your image and intelligently reconstructs missing information to improve resolution, remove blur, restore damage, or add realistic colors while preserving the original character of the photo."
    },
    {
      question: "What types of images can be enhanced?",
      answer: "Our tool works with all common image formats (JPG, PNG, WebP, GIF) and excels with photos, artwork, historical images, scanned documents, and low-resolution graphics. It's particularly effective with portraits, landscapes, vintage photos, and images that need upscaling or restoration."
    },
    {
      question: "How much can I upscale an image?",
      answer: "You can upscale images up to 4x their original resolution. For example, a 500x500 pixel image can be enhanced to 2000x2000 pixels. The AI maintains quality and sharpness even at high upscaling factors by intelligently generating missing pixel information."
    },
    {
      question: "Is the colorization feature accurate for historical photos?",
      answer: "Yes! Our AI is trained on historical data and understands context clues like clothing, objects, and time periods to suggest appropriate colors. While artistic interpretation is involved, the results are historically plausible and can be fine-tuned using our color adjustment controls."
    },
    {
      question: "Can I process multiple images at once?",
      answer: "Absolutely! Our batch processing feature allows you to upload and enhance multiple images simultaneously using the same settings. This is perfect for processing photo albums, product catalogs, or large collections of images efficiently."
    },
    {
      question: "Are my photos secure and private?",
      answer: "Yes, completely! All image processing happens locally in your browser using client-side AI models. Your photos never leave your device, aren't uploaded to servers, and aren't stored or analyzed by us. This ensures complete privacy and security of your personal images."
    },
    {
      question: "What's the difference between enhancement modes?",
      answer: "Each mode is optimized for specific improvements: Super Resolution increases size while preserving quality, Deblurring removes motion and focus issues, Photo Restoration repairs damage and aging, Colorization adds realistic colors to B&W images, and Auto Enhancement combines multiple improvements intelligently."
    },
    {
      question: "How long does image enhancement take?",
      answer: "Processing time depends on image size and enhancement complexity, typically ranging from 3-10 seconds for standard photos. Larger images or more complex enhancements may take longer, but our optimized algorithms ensure efficient processing even for high-resolution images."
    },
    {
      question: "Can I adjust the enhancement settings?",
      answer: "Yes! You have extensive control over the enhancement process including AI strength, quality boost levels, color enhancement, contrast adjustments, sharpening amount, and detail preservation. These settings allow you to fine-tune results to match your specific needs and preferences."
    },
    {
      question: "What file formats are supported for download?",
      answer: "Enhanced images can be downloaded as high-quality PNG files (recommended for best quality) or JPG files (smaller file size). You can also download side-by-side comparisons showing before and after results, perfect for showcasing the improvements made."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ai-image-enhancer', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Image Enhancer?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional-grade AI enhancement with complete privacy, multiple enhancement modes, and unlimited free usage.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
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

      {/* Enhancement Types */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Enhancement Capabilities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Multiple AI models specialized for different types of image improvements and restoration needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enhancementTypes.map((type, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            See how our AI image enhancer outperforms popular alternatives with superior features and privacy.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-emerald-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Topaz Labs</th>
                    <th className="text-center p-4 font-semibold">waifu2x</th>
                    <th className="text-center p-4 font-semibold">BigJPG</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-emerald-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.topazlabs}</td>
                      <td className="p-4 text-center">{row.waifu2x}</td>
                      <td className="p-4 text-center">{row.bigjpg}</td>
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
            Perfect For Every Creative Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From professional photography to family photo restoration, our AI enhancer improves images for every purpose.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-600" />
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
            Everything you need to know about AI image enhancement, upscaling, restoration, and colorization.
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
          currentToolSlug="ai-image-enhancer"
        />
      </section>
    </div>
  );
}
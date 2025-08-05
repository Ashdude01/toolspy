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
  Palette,
  Sparkles,
  Accessibility,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function ColorPaletteGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("color-palette-generator");

  const comparisonData = [
    {
      feature: "AI Color Insights",
      toolspy: "✅ Psychology & recommendations",
      coolors: "❌ Not available",
      adobe: "❌ Not available",
      paletton: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Harmony Algorithms",
      toolspy: "✅ 6 advanced types",
      coolors: "✅ 5 types",
      adobe: "✅ 4 types",
      paletton: "✅ 3 types",
      toolspyStatus: "excellent",
    },
    {
      feature: "Accessibility Checker",
      toolspy: "✅ WCAG AA/AAA compliance",
      coolors: "✅ Basic contrast",
      adobe: "❌ Not available",
      paletton: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Image Color Extraction",
      toolspy: "✅ Smart extraction",
      coolors: "✅ Photo upload",
      adobe: "✅ Image analysis",
      paletton: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Formats",
      toolspy: "✅ CSS, JSON, ASE",
      coolors: "✅ Multiple formats",
      adobe: "✅ ASE, ACO",
      paletton: "✅ CSS, HTML",
      toolspyStatus: "excellent",
    },
    {
      feature: "Color Space Support",
      toolspy: "✅ HEX, RGB, HSL",
      coolors: "✅ Multiple spaces",
      adobe: "✅ Multiple spaces",
      paletton: "✅ RGB, HSV",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple palettes",
      coolors: "❌ Single palette",
      adobe: "❌ Single palette",
      paletton: "❌ Single palette",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      coolors: "⚠️ Account required",
      adobe: "⚠️ Cloud sync",
      paletton: "✅ No registration",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent analysis of color psychology, mood, and professional usage recommendations for your palettes."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Advanced Color Harmonies",
      description: "Generate palettes using complementary, triadic, analogous, monochromatic, and complex harmony algorithms."
    },
    {
      icon: <Accessibility className="h-6 w-6" />,
      title: "Accessibility Compliance",
      description: "Automatic WCAG AA/AAA contrast checking ensures your colors meet accessibility standards."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Export",
      description: "Export to CSS variables, JSON, Adobe ASE, and other formats for seamless workflow integration."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All color generation and analysis happens locally - your creative work stays private."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Image Color Extraction",
      description: "Upload any image to automatically extract and generate palettes from real-world colors."
    }
  ];

  const useCases = [
    {
      title: "Web Design & Development",
      description: "Create cohesive color schemes for websites, apps, and digital interfaces.",
      examples: ["UI/UX design", "Brand websites", "E-commerce sites", "Landing pages"]
    },
    {
      title: "Brand Identity & Marketing",
      description: "Develop consistent brand colors that convey the right message and emotion.",
      examples: ["Logo design", "Marketing materials", "Social media graphics", "Print design"]
    },
    {
      title: "Interior Design & Architecture",
      description: "Plan room color schemes and architectural color coordination.",
      examples: ["Room planning", "Exterior design", "Furniture coordination", "Mood boards"]
    },
    {
      title: "Digital Art & Illustration",
      description: "Create harmonious color palettes for artwork and creative projects.",
      examples: ["Digital paintings", "Illustrations", "Game design", "Animation"]
    }
  ];

  const colorHarmonies = [
    {
      name: "Complementary",
      description: "Colors opposite on the color wheel",
      example: "Blue & Orange",
      usage: "High contrast, attention-grabbing"
    },
    {
      name: "Triadic",
      description: "Three colors evenly spaced on the wheel",
      example: "Red, Yellow, Blue",
      usage: "Vibrant, balanced, playful"
    },
    {
      name: "Analogous",
      description: "Adjacent colors on the wheel",
      example: "Blue, Blue-Green, Green",
      usage: "Harmonious, natural, calming"
    },
    {
      name: "Monochromatic",
      description: "Different shades of the same hue",
      example: "Light Blue to Dark Blue",
      usage: "Elegant, sophisticated, unified"
    }
  ];

  const faqs = [
    {
      question: "What are color harmonies and why are they important?",
      answer: "Color harmonies are combinations of colors that are visually pleasing and create balance. They're based on color theory principles and help create cohesive designs. Our tool generates harmonies like complementary (opposite colors), triadic (three evenly spaced colors), and analogous (adjacent colors) to ensure professional-looking palettes."
    },
    {
      question: "How does the AI color analysis work?",
      answer: "Our AI analyzes your color palette to provide insights about color psychology, emotional impact, and suitable use cases. It considers factors like hue relationships, saturation levels, and brightness to suggest the best applications for your palette, whether it's for branding, web design, or artistic projects."
    },
    {
      question: "What is the accessibility checker and why should I use it?",
      answer: "The accessibility checker tests color combinations for WCAG (Web Content Accessibility Guidelines) compliance. It calculates contrast ratios to ensure text is readable for users with visual impairments. WCAG AA requires a 4.5:1 ratio for normal text, while AAA requires 7:1 for the highest accessibility."
    },
    {
      question: "Can I extract colors from my own images?",
      answer: "Yes! Upload any image and our tool will analyze it to extract the most prominent colors, then generate a harmonious palette based on those colors. This is perfect for creating palettes that match photography, artwork, or existing brand materials."
    },
    {
      question: "What export formats are available?",
      answer: "You can export palettes as CSS variables (for web development), JSON format (for applications), Adobe ASE files (for design software), or simply copy hex codes. This ensures compatibility with virtually any design or development workflow."
    },
    {
      question: "How do I choose the right color harmony for my project?",
      answer: "Consider your project's goals: use complementary for high contrast and attention, analogous for calm and natural feels, triadic for vibrant and playful designs, and monochromatic for elegant and sophisticated looks. Our AI insights provide specific recommendations based on your selected harmony."
    },
    {
      question: "Is my color data secure when using this tool?",
      answer: "Absolutely! All color generation, analysis, and processing happens entirely in your browser. No color data, images, or palettes are sent to our servers, ensuring complete privacy for your creative work."
    },
    {
      question: "Can I save and reuse my favorite palettes?",
      answer: "Yes, you can save palettes during your session and export them for future use. We're working on user accounts to permanently save and sync palettes across devices."
    },
    {
      question: "How accurate are the color conversions between formats?",
      answer: "Our tool provides precise conversions between HEX, RGB, and HSL color formats using industry-standard algorithms. All conversions maintain color accuracy suitable for professional design work."
    },
    {
      question: "What makes this different from other color palette generators?",
      answer: "Our tool combines advanced color theory with AI insights, accessibility checking, and professional export options. Unlike basic generators, we provide context about why colors work together and how to use them effectively in your specific projects."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('color-palette-generator', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Color Palette Generator?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced color theory meets artificial intelligence to create palettes that are both beautiful and functional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
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

      {/* Color Harmonies Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Understanding Color Harmonies
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about different color harmony types and when to use them for maximum impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colorHarmonies.map((harmony, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{harmony.name}</CardTitle>
                <CardDescription>{harmony.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Example:</strong> {harmony.example}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Best for:</strong> {harmony.usage}
                  </div>
                </div>
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
            See how our AI-powered palette generator outperforms popular alternatives.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-pink-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Coolors</th>
                    <th className="text-center p-4 font-semibold">Adobe Color</th>
                    <th className="text-center p-4 font-semibold">Paletton</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-pink-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.coolors}</td>
                      <td className="p-4 text-center">{row.adobe}</td>
                      <td className="p-4 text-center">{row.paletton}</td>
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
            Perfect For Every Creative Project
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From digital design to physical spaces, our color palettes enhance every type of creative work.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-pink-600" />
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
            Everything you need to know about color theory, palette generation, and accessibility.
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
          currentToolSlug="color-palette-generator"
        />
      </section>
    </div>
  );
}
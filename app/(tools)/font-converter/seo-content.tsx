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
  Type,
  Eye,
  Download,
  Clock,
  Layers,
  Brain,
  Globe,
  Code,
  Palette,
  Monitor,
  Smartphone,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function FontConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("font-converter");

  const comparisonData = [
    {
      feature: "Format Support",
      toolspy: "✅ 6+ formats",
      fontforge: "✅ 20+ formats",
      convertio: "✅ 15+ formats",
      cloudconvert: "✅ 12+ formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Font Preview",
      toolspy: "✅ Live preview",
      fontforge: "✅ Basic preview",
      convertio: "❌ No preview",
      cloudconvert: "❌ No preview",
      toolspyStatus: "excellent",
    },
    {
      feature: "AI Font Pairings",
      toolspy: "✅ Smart suggestions",
      fontforge: "❌ Not available",
      convertio: "❌ Not available",
      cloudconvert: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Web Optimization",
      toolspy: "✅ Advanced options",
      fontforge: "⚠️ Manual only",
      convertio: "✅ Basic",
      cloudconvert: "✅ Basic",
      toolspyStatus: "excellent",
    },
    {
      feature: "CSS Generation",
      toolspy: "✅ Auto-generated",
      fontforge: "❌ Not available",
      convertio: "❌ Not available",
      cloudconvert: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side",
      fontforge: "✅ Offline app",
      convertio: "⚠️ Server upload",
      cloudconvert: "⚠️ Server upload",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      fontforge: "⚠️ Manual batch",
      convertio: "⚠️ Premium only",
      cloudconvert: "⚠️ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "10MB",
      fontforge: "No limit",
      convertio: "25MB free",
      cloudconvert: "25MB free",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Type className="h-6 w-6" />,
      title: "Universal Font Conversion",
      description: "Convert between TTF, OTF, WOFF, WOFF2, EOT, and SVG formats with perfect quality preservation."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Font Preview",
      description: "Preview fonts with custom text, multiple sizes, and real-time rendering before conversion."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Pairings",
      description: "Get intelligent font pairing suggestions based on typography principles and design trends."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Optimization",
      description: "Optimize fonts for web use with compression, subsetting, and performance enhancements."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "CSS Code Generation",
      description: "Automatically generate @font-face CSS rules ready for your web projects."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All font processing happens locally in your browser - fonts never leave your device."
    }
  ];

  const useCases = [
    {
      title: "Web Developers",
      description: "Convert desktop fonts to web formats and optimize for fast loading websites.",
      examples: ["WOFF2 conversion", "CSS generation", "Web optimization", "Font subsetting"]
    },
    {
      title: "Graphic Designers",
      description: "Convert fonts between formats for different design software and platforms.",
      examples: ["Cross-platform compatibility", "Print to digital", "Software requirements", "Client deliverables"]
    },
    {
      title: "Typography Enthusiasts",
      description: "Explore font pairings and convert personal font collections between formats.",
      examples: ["Font combinations", "Personal collections", "Typography experiments", "Design inspiration"]
    },
    {
      title: "Digital Agencies",
      description: "Prepare fonts for client projects across web, mobile, and print platforms.",
      examples: ["Client projects", "Multi-platform delivery", "Brand consistency", "Asset preparation"]
    }
  ];

  const formatGuide = [
    {
      format: "WOFF2",
      description: "Modern web font standard",
      bestFor: "Modern web browsers",
      compression: "Best (30-50% smaller)",
      support: "Chrome 36+, Firefox 39+, Safari 12+"
    },
    {
      format: "WOFF",
      description: "Web Open Font Format",
      bestFor: "Older web browsers",
      compression: "Good (20-30% smaller)",
      support: "IE 9+, All modern browsers"
    },
    {
      format: "TTF",
      description: "TrueType Font",
      bestFor: "Desktop applications",
      compression: "None (Original size)",
      support: "Universal desktop support"
    },
    {
      format: "OTF",
      description: "OpenType Font",
      bestFor: "Professional design",
      compression: "None (Original size)",
      support: "Professional software, modern OS"
    }
  ];

  const webOptimizationTips = [
    {
      title: "Choose WOFF2 for Modern Sites",
      tip: "WOFF2 offers the best compression and is supported by all modern browsers. Use it as your primary format."
    },
    {
      title: "Enable Font Subsetting",
      tip: "Remove unused characters to reduce file size by 50-90%. Perfect for specific language requirements."
    },
    {
      title: "Use Font-Display: Swap",
      tip: "Our generated CSS includes font-display: swap for better loading performance and user experience."
    },
    {
      title: "Optimize for Performance",
      tip: "Enable compression and remove unnecessary metadata to minimize file sizes and improve loading times."
    }
  ];

  const fontPairingCategories = [
    {
      category: "Editorial",
      description: "Perfect for blogs, magazines, and content-heavy sites",
      examples: ["Serif + Sans-serif", "Display + Body text", "Contrast pairings"]
    },
    {
      category: "Modern",
      description: "Clean, contemporary designs for corporate and tech",
      examples: ["Geometric sans-serif", "Minimal combinations", "Tech-friendly fonts"]
    },
    {
      category: "Elegant",
      description: "Sophisticated pairings for luxury and fashion brands",
      examples: ["Script + Serif", "High contrast", "Luxury feel"]
    },
    {
      category: "Technical",
      description: "Clear, readable combinations for documentation",
      examples: ["Monospace + Sans-serif", "Documentation", "Developer tools"]
    }
  ];

  const faqs = [
    {
      question: "What font formats can I convert between?",
      answer: "Our converter supports all major font formats including TTF (TrueType), OTF (OpenType), WOFF (Web Open Font Format), WOFF2 (modern web standard), EOT (Internet Explorer), and SVG fonts. You can convert between any of these formats with perfect quality preservation."
    },
    {
      question: "How do the AI font pairings work?",
      answer: "Our AI analyzes typography principles, design trends, and font characteristics to suggest complementary font combinations. It considers factors like contrast, readability, style harmony, and use case to recommend pairings for editorial, modern, elegant, or technical designs."
    },
    {
      question: "Can I preview fonts before converting?",
      answer: "Yes! Use our live preview feature to see fonts rendered with custom text at different sizes. You can test how fonts look before conversion and experiment with different text samples to ensure the font meets your needs."
    },
    {
      question: "What's the difference between WOFF and WOFF2?",
      answer: "WOFF2 is the newer, more efficient web font format with 30-50% better compression than WOFF. It's supported by all modern browsers (Chrome 36+, Firefox 39+, Safari 12+). WOFF has broader compatibility including older browsers like IE 9+. Choose WOFF2 for modern sites, WOFF for legacy support."
    },
    {
      question: "How does web optimization work?",
      answer: "Web optimization includes compression to reduce file sizes, subsetting to remove unused characters, hinting optimization for better rendering, and metadata cleaning. These techniques can reduce font file sizes by 30-90% while maintaining quality, resulting in faster loading websites."
    },
    {
      question: "Can I get CSS code for my converted fonts?",
      answer: "Absolutely! After conversion, click 'Copy CSS' to get ready-to-use @font-face rules. The code includes proper font-family declarations, file paths, font-weight and style specifications, and font-display: swap for optimal loading performance."
    },
    {
      question: "Is font subsetting available?",
      answer: "Yes, enable subsetting in settings to remove unused characters and reduce file sizes dramatically. This is especially useful for specific languages (Latin, Cyrillic, etc.) or when you only need certain character sets. Subsetting can reduce files by 50-90%."
    },
    {
      question: "Are my fonts secure during conversion?",
      answer: "Completely secure! All font processing happens locally in your browser using advanced client-side technology. Your fonts never leave your device, ensuring complete privacy and security of your intellectual property and commercial fonts."
    },
    {
      question: "How do I optimize fonts for mobile websites?",
      answer: "For mobile optimization: 1) Convert to WOFF2 for best compression, 2) Enable subsetting for your target languages, 3) Use compression settings, 4) Remove unnecessary metadata. This reduces file sizes by 60-80% while maintaining quality on mobile devices."
    },
    {
      question: "Can I convert multiple fonts at once?",
      answer: "Yes! Upload multiple font files to enable batch processing mode. All fonts will be converted using the same settings and target format. You can monitor individual progress and download all converted fonts at once for efficient bulk conversion."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('font-converter', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Font Conversion Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert fonts with AI-powered pairings, live preview, web optimization, and automatic CSS generation.
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

      {/* Format Comparison */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Font Format Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right format for your specific needs and target platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {formatGuide.map((format, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-pink-600" />
                  {format.format}
                </CardTitle>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Best for:</strong> {format.bestFor}
                  </div>
                  <div>
                    <strong>Compression:</strong> {format.compression}
                  </div>
                  <div>
                    <strong>Browser Support:</strong> {format.support}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Web Optimization Tips */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Web Optimization Best Practices
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert tips for optimizing fonts for web performance and user experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {webOptimizationTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg text-pink-600">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tip.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Font Pairing Categories */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI Font Pairing Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover perfect font combinations for different design styles and use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {fontPairingCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-600" />
                  {category.category}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
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
            See how our font converter outperforms alternatives with unique AI features and better user experience.
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
                    <th className="text-center p-4 font-semibold">FontForge</th>
                    <th className="text-center p-4 font-semibold">Convertio</th>
                    <th className="text-center p-4 font-semibold">CloudConvert</th>
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
                      <td className="p-4 text-center">{row.fontforge}</td>
                      <td className="p-4 text-center">{row.convertio}</td>
                      <td className="p-4 text-center">{row.cloudconvert}</td>
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
            Perfect for Every Typography Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From web development to graphic design, our converter handles all font transformation needs.
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

      {/* Platform Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Platform-Specific Recommendations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right format for different platforms and use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Globe className="h-5 w-5" />
                Web Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Primary:</strong> WOFF2 (modern browsers)</div>
                <div><strong>Fallback:</strong> WOFF (legacy support)</div>
                <div><strong>Optimization:</strong> Enable compression & subsetting</div>
                <div><strong>Performance:</strong> Use font-display: swap</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Monitor className="h-5 w-5" />
                Desktop Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Primary:</strong> OTF (professional features)</div>
                <div><strong>Alternative:</strong> TTF (universal compatibility)</div>
                <div><strong>Features:</strong> Keep full character set</div>
                <div><strong>Quality:</strong> Preserve hinting & metadata</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Smartphone className="h-5 w-5" />
                Mobile Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>iOS:</strong> TTF/OTF for native apps</div>
                <div><strong>Android:</strong> TTF for best compatibility</div>
                <div><strong>Web Mobile:</strong> WOFF2 with subsetting</div>
                <div><strong>Optimization:</strong> Aggressive compression</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about font conversion, web optimization, and typography best practices.
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
          currentToolSlug="font-converter"
        />
      </section>
    </div>
  );
}
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
  Laugh,
  Sparkles,
  TrendingUp,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function MemeGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("meme-generator");

  const comparisonData = [
    {
      feature: "AI Caption Suggestions",
      toolspy: "✅ Smart AI recommendations",
      imgflip: "❌ Not available",
      canva: "❌ Not available",
      kapwing: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Template Library",
      toolspy: "✅ Trending templates",
      imgflip: "✅ Large collection",
      canva: "✅ Professional templates",
      kapwing: "✅ Good selection",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Image Upload",
      toolspy: "✅ Unlimited uploads",
      imgflip: "✅ Limited free",
      canva: "✅ With account",
      kapwing: "✅ Limited free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Text Formatting",
      toolspy: "✅ Advanced typography",
      imgflip: "✅ Basic options",
      canva: "✅ Extensive options",
      kapwing: "✅ Good options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Download Quality",
      toolspy: "✅ High-res PNG",
      imgflip: "✅ Standard quality",
      canva: "✅ Various formats",
      kapwing: "✅ HD quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Watermark Free",
      toolspy: "✅ Always free",
      imgflip: "✅ Free tier",
      canva: "⚠️ Pro required",
      kapwing: "⚠️ Pro required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Social Sharing",
      toolspy: "✅ Direct sharing",
      imgflip: "✅ Share buttons",
      canva: "✅ Social integration",
      kapwing: "✅ Platform optimized",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ No registration required",
      imgflip: "✅ Anonymous use",
      canva: "⚠️ Account required",
      kapwing: "⚠️ Account required",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Captions",
      description: "Get intelligent meme caption suggestions based on trending formats and viral content patterns."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Trending Templates",
      description: "Access the hottest meme templates updated daily with popularity rankings and usage stats."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Editing",
      description: "Advanced text formatting with fonts, colors, strokes, shadows, and positioning controls."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No Watermarks",
      description: "Download high-quality memes without watermarks or restrictions, completely free forever."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Sharing",
      description: "Share directly to social media platforms or copy to clipboard for immediate posting."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Formats",
      description: "Export in various sizes and formats optimized for different social media platforms."
    }
  ];

  const useCases = [
    {
      title: "Social Media Marketing",
      description: "Create engaging content for brand social media accounts and viral marketing campaigns.",
      examples: ["Brand humor", "Product announcements", "Trending topics", "Audience engagement"]
    },
    {
      title: "Personal Social Content",
      description: "Make shareable memes for personal accounts and connect with friends through humor.",
      examples: ["Instagram stories", "Facebook posts", "Twitter memes", "Discord shares"]
    },
    {
      title: "Educational Content",
      description: "Create memorable educational memes that make learning fun and shareable.",
      examples: ["Study humor", "Subject explanations", "Teacher content", "Course materials"]
    },
    {
      title: "Community Building",
      description: "Foster community engagement with relatable memes that resonate with your audience.",
      examples: ["Group chats", "Forums", "Gaming communities", "Professional networks"]
    }
  ];

  const memeCategories = [
    {
      category: "Reaction Memes",
      description: "Express emotions and reactions",
      examples: ["Drake pointing", "Woman yelling at cat", "Surprised Pikachu"]
    },
    {
      category: "Relatable Memes",
      description: "Everyday situations everyone understands",
      examples: ["This is fine", "Monday blues", "Procrastination"]
    },
    {
      category: "Opinion Memes",
      description: "Share thoughts and controversial takes",
      examples: ["Change my mind", "Unpopular opinion", "Hot takes"]
    },
    {
      category: "Trending Formats",
      description: "Latest viral meme templates",
      examples: ["Current events", "Pop culture", "Internet trends"]
    }
  ];

  const faqs = [
    {
      question: "How do I create a meme with this generator?",
      answer: "Simply choose a trending template or upload your own image, add text using our editor, customize the formatting, and download your meme. You can also use our AI caption suggestions for instant viral-worthy text ideas."
    },
    {
      question: "Are the meme templates free to use?",
      answer: "Yes! All our meme templates are completely free to use with no restrictions. You can create unlimited memes, download them in high quality, and share them anywhere without watermarks."
    },
    {
      question: "How does the AI caption suggestion feature work?",
      answer: "Our AI analyzes popular meme formats, trending topics, and viral content patterns to suggest captions that are likely to resonate with audiences. It considers the template type, current trends, and successful meme formulas."
    },
    {
      question: "Can I upload my own images to create custom memes?",
      answer: "Absolutely! Upload any image (JPG, PNG, GIF) and add text to create custom memes. This is perfect for personal photos, screenshots, or original content that you want to turn into shareable memes."
    },
    {
      question: "What text formatting options are available?",
      answer: "You can customize fonts, sizes, colors, text stroke, alignment, and positioning. Popular meme fonts like Impact are included, plus options for shadows, outlines, and background colors to ensure text visibility."
    },
    {
      question: "How do I share my memes on social media?",
      answer: "After creating your meme, use our one-click sharing buttons for major platforms, or copy the image to your clipboard for instant pasting. We optimize dimensions for each platform automatically."
    },
    {
      question: "Are there any size or usage limits?",
      answer: "No limits! Create as many memes as you want, upload images up to 50MB, and download everything in high quality. Our tool is designed for unlimited creative expression."
    },
    {
      question: "Can I edit text after adding it to the meme?",
      answer: "Yes, you can edit, move, resize, and restyle text boxes anytime. Add multiple text areas, change formatting, or completely rewrite captions until your meme is perfect."
    },
    {
      question: "What makes a meme go viral?",
      answer: "Viral memes typically combine relatable content, perfect timing, recognizable formats, and clever captions. Our AI suggestions help identify these elements, but authenticity and understanding your audience are key."
    },
    {
      question: "Do you track trending meme templates?",
      answer: "Yes! We monitor social media trends and meme popularity to keep our template library current. Popular templates are highlighted with trending indicators and usage statistics."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('meme-generator', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Meme Generator?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create viral-worthy memes with AI-powered suggestions, trending templates, and professional editing tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-yellow-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
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

      {/* Meme Categories */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Meme Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore different types of memes and find the perfect format for your content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memeCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Laugh className="h-5 w-5 text-yellow-600" />
                  {category.category}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {category.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {example}
                    </div>
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
            See how our AI-powered meme generator outperforms popular alternatives.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-yellow-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Imgflip</th>
                    <th className="text-center p-4 font-semibold">Canva</th>
                    <th className="text-center p-4 font-semibold">Kapwing</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-yellow-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.imgflip}</td>
                      <td className="p-4 text-center">{row.canva}</td>
                      <td className="p-4 text-center">{row.kapwing}</td>
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
            Perfect For Every Creator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're a marketer, educator, or content creator, our meme generator has you covered.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-600" />
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
            Everything you need to know about creating viral memes and using our AI-powered generator.
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
          currentToolSlug="meme-generator"
        />
      </section>
    </div>
  );
}
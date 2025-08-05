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
  Brain,
  Sparkles,
  PenTool,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function AiWritingToolsSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ai-writing-tools");

  const comparisonData = [
    {
      feature: "Tools Included",
      toolspy: "✅ 4 tools in one suite",
      quillbot: "✅ Paraphraser + extras",
      grammarly: "✅ Grammar + writing",
      jasper: "✅ Content generation",
      toolspyStatus: "excellent",
    },
    {
      feature: "AI Detection",
      toolspy: "✅ Built-in detector",
      quillbot: "❌ Not available",
      grammarly: "❌ Not available",
      jasper: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Humanization",
      toolspy: "✅ Advanced humanizer",
      quillbot: "❌ Not available",
      grammarly: "❌ Not available",
      jasper: "✅ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Customization Options",
      toolspy: "✅ Extensive settings",
      quillbot: "✅ Good options",
      grammarly: "✅ Style preferences",
      jasper: "✅ Template variety",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Upload Support",
      toolspy: "✅ Multiple formats",
      quillbot: "✅ Basic support",
      grammarly: "✅ Document integration",
      jasper: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      quillbot: "⚠️ Server processing",
      grammarly: "⚠️ Cloud-based",
      jasper: "⚠️ Cloud-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Free Usage",
      toolspy: "✅ Unlimited free",
      quillbot: "✅ Limited free",
      grammarly: "✅ Basic free",
      jasper: "❌ Paid only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Processing",
      toolspy: "✅ Instant results",
      quillbot: "✅ Fast processing",
      grammarly: "✅ Real-time",
      jasper: "✅ Quick generation",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "4-in-1 AI Suite",
      description: "Paraphraser, summarizer, humanizer, and AI detector combined in one powerful toolkit."
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Advanced Humanization",
      description: "Make AI-generated text sound natural and bypass AI detection systems with intelligent rewriting."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Summarization",
      description: "Extract key points and main ideas while preserving context and important details."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customizable Output",
      description: "Fine-tune tone, creativity, length, and style to match your specific requirements."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "AI Detection & Resistance",
      description: "Detect AI-written content and humanize text to resist AI detection tools."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Professional Quality",
      description: "Enterprise-grade AI models deliver human-quality results for academic and business use."
    }
  ];

  const useCases = [
    {
      title: "Academic Writing",
      description: "Improve essays, research papers, and academic content while maintaining originality.",
      examples: ["Essay rewriting", "Research summaries", "Citation paraphrasing", "Thesis editing"]
    },
    {
      title: "Content Marketing",
      description: "Create unique content variations for blogs, social media, and marketing materials.",
      examples: ["Blog post variations", "Social media content", "Ad copy rewriting", "SEO content"]
    },
    {
      title: "Professional Communication",
      description: "Enhance business writing, emails, and professional documents.",
      examples: ["Email drafting", "Report writing", "Proposal editing", "Meeting summaries"]
    },
    {
      title: "Creative Writing",
      description: "Enhance creative projects with varied expression and improved readability.",
      examples: ["Story editing", "Creative rewrites", "Character dialogue", "Plot summaries"]
    }
  ];

  const toolBreakdown = [
    {
      name: "AI Paraphraser",
      description: "Rewrite text while preserving meaning",
      features: ["Multiple tone options", "Creativity control", "Synonym replacement", "Structure variation"]
    },
    {
      name: "AI Summarizer",
      description: "Extract key information efficiently",
      features: ["Adjustable summary length", "Key point extraction", "Context preservation", "Bullet point format"]
    },
    {
      name: "AI Humanizer",
      description: "Make text sound naturally human",
      features: ["AI detection resistance", "Natural flow enhancement", "Human-like variations", "Style adaptation"]
    },
    {
      name: "AI Detector",
      description: "Identify AI-generated content",
      features: ["Probability scoring", "Confidence metrics", "Pattern analysis", "Detection insights"]
    }
  ];

  const faqs = [
    {
      question: "What's included in the AI Writing Tools suite?",
      answer: "Our comprehensive suite includes four powerful tools: AI Paraphraser for rewriting content, AI Summarizer for extracting key points, AI Humanizer for making text sound natural, and AI Detector for identifying AI-generated content. All tools work seamlessly together with shared settings and formatting options."
    },
    {
      question: "How does the AI humanizer work to bypass detection?",
      answer: "The AI humanizer uses advanced algorithms to add natural variations, adjust sentence patterns, incorporate human-like imperfections, and modify AI-typical phrases. It analyzes text for common AI patterns and intelligently replaces them with more natural alternatives while preserving the original meaning."
    },
    {
      question: "Can I adjust the creativity and tone of the output?",
      answer: "Yes! Our tools offer extensive customization options including tone selection (professional, casual, academic, creative, friendly), creativity levels (0-100%), output length preferences, and AI detection resistance settings. You can fine-tune results to match your specific needs."
    },
    {
      question: "How accurate is the AI detection feature?",
      answer: "Our AI detector achieves high accuracy by analyzing multiple factors including sentence structure, vocabulary patterns, writing style consistency, and other linguistic markers. It provides probability scores and confidence metrics, though no detector is 100% accurate as AI writing continues to evolve."
    },
    {
      question: "Is my content secure when using these tools?",
      answer: "Absolutely! Unlike many competitors, our tools process content locally in your browser whenever possible. Your text isn't stored on our servers or used for training, ensuring complete privacy and confidentiality of your content."
    },
    {
      question: "What file formats can I upload for processing?",
      answer: "You can upload text files (.txt), Microsoft Word documents (.docx), and PDF files. The tools will extract the text content automatically, making it easy to process documents without manual copying and pasting."
    },
    {
      question: "How does the summarizer maintain context and accuracy?",
      answer: "Our AI summarizer uses advanced natural language processing to identify key themes, main arguments, and supporting details. It preserves context by maintaining logical flow and ensuring that summarized content accurately represents the original message without losing important nuances."
    },
    {
      question: "Can I use these tools for academic writing?",
      answer: "Yes, our tools are designed to help improve writing quality while maintaining academic integrity. The paraphraser helps rephrase content for better clarity, the summarizer helps with research organization, and the humanizer ensures natural flow. Always follow your institution's guidelines regarding AI tool usage."
    },
    {
      question: "Are there any usage limits or restrictions?",
      answer: "Our basic tools are free to use with generous limits suitable for most users. We don't impose strict character limits or daily restrictions, making our tools accessible for students, professionals, and content creators of all levels."
    },
    {
      question: "How do I choose the right tool for my needs?",
      answer: "Use the Paraphraser to rewrite content while keeping the same length, the Summarizer to condense long texts, the Humanizer to make AI-generated content sound natural, and the Detector to check if content was AI-generated. Each tool serves different purposes and can be used individually or in combination."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ai-writing-tools', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Writing Suite?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Four powerful AI writing tools in one comprehensive suite, designed for professionals, students, and content creators.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
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

      {/* Tool Breakdown */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Writing Toolkit
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Four specialized AI tools designed to handle every aspect of your writing needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolBreakdown.map((tool, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
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
            See how our comprehensive AI writing suite outperforms popular alternatives.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-indigo-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">QuillBot</th>
                    <th className="text-center p-4 font-semibold">Grammarly</th>
                    <th className="text-center p-4 font-semibold">Jasper</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-indigo-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.quillbot}</td>
                      <td className="p-4 text-center">{row.grammarly}</td>
                      <td className="p-4 text-center">{row.jasper}</td>
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
            Perfect For Every Writing Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From academic papers to marketing content, our AI writing tools enhance every type of written communication.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
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
            Everything you need to know about our AI writing tools and how to use them effectively.
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
          currentToolSlug="ai-writing-tools"
        />
      </section>
    </div>
  );
}
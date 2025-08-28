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
  Lock,
  Hash,
  Copy,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Database,
  Key,
  Cpu,
  Type,
  BookOpen,
  AlignLeft,
  Calendar,
  Clock,
  Calculator,
  User,
  Heart,
  Users,
  Sparkles,
  TrendingUp,
  Activity,
  Scale,
  Target as TargetIcon,
  DollarSign,
  TrendingDown,
  PieChart,
  Play,
  Code,
  Monitor,
  Smartphone,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function YouTubeEmbedCodeGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("youtube-embed-code-generator");

  const comparisonData = [
    {
      feature: "Code Quality",
      toolspy: "✅ Professional HTML",
      embedgenerator: "⚠️ Basic code",
      youtubeembed: "❌ Limited options",
      embedcode: "⚠️ Basic quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Customization Options",
      toolspy: "✅ Full control",
      embedgenerator: "⚠️ Limited options",
      youtubeembed: "❌ Basic options",
      embedcode: "⚠️ Limited control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      embedgenerator: "⚠️ Server-based",
      youtubeembed: "⚠️ Server-based",
      embedcode: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Responsive Design",
      toolspy: "✅ Mobile optimized",
      embedgenerator: "⚠️ Basic responsive",
      youtubeembed: "❌ Fixed size",
      embedcode: "⚠️ Limited responsive",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      embedgenerator: "✅ Free",
      youtubeembed: "✅ Free",
      embedcode: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Copy Options",
      toolspy: "✅ Multiple formats",
      embedgenerator: "⚠️ Copy only",
      youtubeembed: "❌ No copy",
      embedcode: "⚠️ Basic copy",
      toolspyStatus: "excellent",
    },
    {
      feature: "Advanced Features",
      toolspy: "✅ All features",
      embedgenerator: "⚠️ Basic features",
      youtubeembed: "❌ No features",
      embedcode: "⚠️ Limited features",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      embedgenerator: "❌ Ad-heavy",
      youtubeembed: "❌ Ad-heavy",
      embedcode: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const embedFeatures = [
    {
      type: "Responsive Design",
      description: "Automatically adapts to different screen sizes",
      features: "Mobile-friendly, tablet optimized, desktop perfect",
      example: "16:9 aspect ratio with responsive scaling",
      useCase: "Websites, blogs, portfolios, presentations",
    },
    {
      type: "Custom Controls",
      description: "Full control over video player appearance",
      features: "Autoplay, controls, loop, mute, start time",
      example: "Autoplay muted with custom start time",
      useCase: "Presentations, landing pages, tutorials",
    },
    {
      type: "Privacy Enhanced",
      description: "Privacy-focused embedding options",
      features: "No cookies, privacy mode, minimal tracking",
      example: "youtube-nocookie.com domain usage",
      useCase: "Privacy-conscious websites, GDPR compliance",
    },
    {
      type: "Performance Optimized",
      description: "Fast loading and optimized code",
      features: "Lazy loading, minimal code, fast rendering",
      example: "Lightweight embed with lazy loading",
      useCase: "High-traffic websites, performance-critical pages",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's YouTube embed code generator completely free to use?",
      answer:
        "Yes, our professional YouTube embed code generator is completely free with no hidden costs, registration requirements, or usage limitations. You can generate unlimited embed codes without any restrictions. Unlike many competitors who have generation limits or require paid subscriptions for advanced features, Toolspy provides all embed code generation capabilities free of charge.",
    },
    {
      question: "What customization options are available for YouTube embeds?",
      answer:
        "Our embed code generator offers comprehensive customization including responsive design, autoplay settings, control visibility, loop options, start time specification, privacy mode, and aspect ratio control. You can customize the player size, appearance, behavior, and privacy settings to match your website's design and requirements perfectly.",
    },
    {
      question: "How secure is the embed code generation process?",
      answer:
        "Absolutely secure! Our embed code generator uses client-side processing, meaning your YouTube URLs and customization preferences are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your video information and settings never leave your device, making it safer than server-based generators.",
    },
    {
      question: "Can I generate responsive embed codes for mobile devices?",
      answer:
        "Yes! Our tool automatically generates responsive embed codes that work perfectly on all devices including mobile phones, tablets, and desktop computers. The generated code uses modern CSS techniques to ensure the video player adapts to different screen sizes and maintains proper aspect ratios across all devices.",
    },
    {
      question: "What's the difference between regular and privacy-enhanced embed codes?",
      answer:
        "Privacy-enhanced embed codes use YouTube's privacy-focused domain (youtube-nocookie.com) which reduces tracking and cookie usage. This is especially important for websites that need to comply with privacy regulations like GDPR. Regular embed codes use the standard YouTube domain with full tracking capabilities.",
    },
    {
      question: "Why choose Toolspy over other free embed generators like EmbedGenerator.com or YouTubeEmbed.com?",
      answer:
        "Toolspy offers professional-grade features like comprehensive customization options, privacy-enhanced modes, responsive design, and client-side processing for privacy. Many competitors like EmbedGenerator.com and YouTubeEmbed.com have limited customization, use server-based processing, or lack advanced features. Our tool provides better privacy protection, more customization options, and superior functionality completely free.",
    },
    {
      question: "How fast is the embed code generation?",
      answer:
        "Our embed code generator provides instant results for any YouTube video. Since all processing happens in your browser, there are no server delays or upload times. You can generate multiple embed codes in milliseconds, making it perfect for web developers and content creators who need quick, professional embed codes.",
    },
    {
      question: "Can I customize the autoplay and control settings?",
      answer:
        "Yes! Our tool allows you to fully customize autoplay settings (with or without sound), control visibility, loop options, and start time. You can create embed codes that autoplay muted for better user experience, hide controls for a cleaner look, or start at specific timestamps for focused content delivery.",
    },
    {
      question: "What information do I need to generate an embed code?",
      answer:
        "You only need the YouTube video URL or video ID. Our generator automatically extracts the video information and provides all customization options. Simply paste the YouTube URL, adjust your preferred settings, and get the complete HTML embed code ready to copy and paste into your website.",
    },
    {
      question: "Is it safe to use online embed code generators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your YouTube URLs and customization preferences are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based generators, our tool provides complete privacy and security for your embed code generation.",
    },
  ];

  const benefits = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Professional HTML",
      description:
        "Generate clean, optimized HTML embed codes with modern web standards and best practices.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description:
        "Real-time embed code generation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your video URLs never leave your device, providing maximum security.",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Responsive Design",
      description:
        "Mobile-optimized embed codes that work perfectly on all devices and screen sizes.",
    },
  ];

  const keyBenefits = [
    "🎥 Professional HTML embed code generation",
    "⚡ Instant generation with no server delays or uploads",
    "🔒 Complete privacy protection - video URLs never leave your device",
    "📱 Responsive design for all devices and screen sizes",
    "🎛️ Full customization options for player appearance and behavior",
    "🔒 Privacy-enhanced mode for GDPR compliance",
    "📋 Multiple copy formats and export options",
    "🎯 Professional-grade code quality and standards",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Detailed customization options for all needs",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive embed code optimization",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. EmbedGenerator.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Options: Full customization vs. limited options",
        "Responsive Design: Mobile optimized vs. basic responsive",
        "Privacy Mode: Enhanced privacy vs. no privacy options",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Code: Professional HTML vs. basic code",
      ],
    },
    {
      title: "Toolspy vs. YouTubeEmbed.com",
      advantages: [
        "More Features: All customization options vs. basic features",
        "Better Privacy: No data transmission vs. server-based",
        "Responsive Design: Mobile optimized vs. fixed size",
        "Faster Processing: Instant vs. server delays",
        "Professional Code: Modern standards vs. basic HTML",
        "Customization: Full control vs. limited options",
      ],
    },
    {
      title: "Toolspy vs. EmbedCode.com",
      advantages: [
        "More Options: Full customization vs. limited control",
        "Better Privacy: Client-side vs. server-based processing",
        "Responsive Design: Mobile optimized vs. limited responsive",
        "Privacy Mode: Enhanced privacy vs. no privacy options",
        "Better Code: Professional HTML vs. basic code",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="youtube-embed-code-generator"
        title="Similar Tools You Might Like"
        description="Check out our other code generation and video tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate YouTube Embed Codes – Professional & Responsive
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional YouTube embed code generator with responsive design, privacy protection, 
            and comprehensive customization options. Perfect for web developers, content creators, 
            and anyone needing professional video embeds.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">How to Use Our YouTube Embed Code Generator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to generate professional embed codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter YouTube URL</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Paste your YouTube video URL or video ID. The tool automatically extracts 
              video information and provides customization options.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Customize Settings</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Adjust player size, autoplay settings, controls, privacy mode, and other 
              customization options to match your needs.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Copy Embed Code</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Get your professional HTML embed code ready to copy and paste into your 
              website with responsive design and optimized performance.
            </p>
          </Card>
        </div>
      </section>

      {/* Embed Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Embed Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional features for all embedding needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {embedFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Play className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{feature.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Features:</strong> {feature.features}</div>
                <div><strong>Example:</strong> {feature.example}</div>
                <div><strong>Use Case:</strong> {feature.useCase}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy vs. Competitors</h3>
          <p className="text-muted-foreground">
            See how our embed code generator outperforms other free tools
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Toolspy</th>
                    <th className="text-center p-4 font-semibold">EmbedGenerator.com</th>
                    <th className="text-center p-4 font-semibold">YouTubeEmbed.com</th>
                    <th className="text-center p-4 font-semibold">EmbedCode.com</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <Badge variant={row.toolspyStatus === "excellent" ? "default" : "secondary"}>
                          {row.toolspy}
                        </Badge>
                      </td>
                      <td className="p-4 text-center text-muted-foreground">{row.embedgenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.youtubeembed}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.embedcode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits List */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's YouTube Embed Code Generator?</h3>
          <p className="text-muted-foreground">
            Professional features that make embed code generation accurate and effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy Advantages Over Competitors</h3>
          <p className="text-muted-foreground">
            See why web developers choose our embed code generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((comparison, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-center">{comparison.title}</h4>
              <ul className="space-y-2">
                {comparison.advantages.map((advantage, advIndex) => (
                  <li key={advIndex} className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-muted-foreground">
            Everything you need to know about YouTube embed code generation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about YouTube embed code generation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for YouTube embed code generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Code className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Web Development</h4>
            <p className="text-sm text-muted-foreground">
              Generate professional embed codes for websites, blogs, and web applications
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Monitor className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Content Creation</h4>
            <p className="text-sm text-muted-foreground">
              Create responsive video embeds for presentations, tutorials, and portfolios
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Mobile Optimization</h4>
            <p className="text-sm text-muted-foreground">
              Generate mobile-friendly embed codes that work perfectly on all devices
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Privacy Compliance</h4>
            <p className="text-sm text-muted-foreground">
              Create privacy-enhanced embeds for GDPR-compliant websites and applications
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Generate YouTube Embed Codes?</h3>
        <p className="text-muted-foreground">
          Start using our professional embed code generator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try YouTube Embed Code Generator Now
        </Button>
      </section>
    </div>
  );
}



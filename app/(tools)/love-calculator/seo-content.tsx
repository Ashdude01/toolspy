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
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function LoveCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("love-calculator");

  const comparisonData = [
    {
      feature: "Calculation Algorithm",
      toolspy: "Advanced compatibility",
      lovecalculator: "Basic algorithm",
      lovepercentage: "Simple calculation",
      compatibility: "Limited factors",
      toolspyStatus: "excellent",
    },
    {
      feature: "Calculation Speed",
      toolspy: "Instant calculation",
      lovecalculator: "Server delays",
      lovepercentage: "Slow processing",
      compatibility: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      lovecalculator: "⚠️ Server-based",
      lovepercentage: "⚠️ Server-based",
      compatibility: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Multiple Factors",
      toolspy: "✅ Name, zodiac, personality",
      lovecalculator: "⚠️ Names only",
      lovepercentage: "❌ Basic factors",
      compatibility: "⚠️ Limited factors",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      lovecalculator: "✅ Free",
      lovepercentage: "✅ Free",
      compatibility: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      lovecalculator: "⚠️ Copy only",
      lovepercentage: "❌ No export",
      compatibility: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Detailed Analysis",
      toolspy: "✅ Comprehensive report",
      lovecalculator: "❌ Basic result",
      lovepercentage: "❌ Percentage only",
      compatibility: "⚠️ Limited analysis",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      lovecalculator: "❌ Ad-heavy",
      lovepercentage: "❌ Ad-heavy",
      compatibility: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const calculationFactors = [
    {
      factor: "Name Compatibility",
      description: "Analyze name vibrations and numerology",
      weight: "40% of calculation",
      details: "Letter frequency, name length, character traits",
      example: "John & Sarah: Strong compatibility",
    },
    {
      factor: "Zodiac Compatibility",
      description: "Astrological sign compatibility analysis",
      weight: "30% of calculation",
      details: "Element compatibility, ruling planets, personality traits",
      example: "Fire & Air signs: Excellent match",
    },
    {
      factor: "Birth Date Numerology",
      description: "Life path numbers and destiny calculations",
      weight: "20% of calculation",
      details: "Birth date analysis, life path compatibility",
      example: "Life path 3 & 6: Harmonious pairing",
    },
    {
      factor: "Personality Traits",
      description: "Character compatibility and behavioral patterns",
      weight: "10% of calculation",
      details: "Communication styles, emotional compatibility",
      example: "Extrovert & Introvert: Balanced dynamic",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's love calculator completely free to use?",
      answer:
        "Yes, our professional love calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can calculate love compatibility unlimited times without any restrictions. Unlike many competitors who have calculation limits or require paid subscriptions for advanced features, Toolspy provides all love calculation capabilities free of charge.",
    },
    {
      question: "How accurate is the love compatibility calculation?",
      answer:
        "Our love calculator uses advanced algorithms that analyze multiple factors including name compatibility, zodiac signs, birth date numerology, and personality traits. While it's designed for entertainment purposes, it provides comprehensive analysis based on established compatibility theories. The calculation considers name vibrations, astrological compatibility, and numerological patterns for a well-rounded assessment.",
    },
    {
      question: "How secure is the love calculation process?",
      answer:
        "Absolutely secure! Our love calculator uses client-side processing, meaning your names and personal information are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive information never leaves your device, making it safer than server-based calculators that could potentially log or store your data.",
    },
    {
      question: "What factors does the love calculator consider?",
      answer:
        "Our love calculator analyzes multiple compatibility factors: Name compatibility (40%) using numerology and letter frequency analysis, Zodiac compatibility (30%) based on astrological sign relationships, Birth date numerology (20%) using life path numbers, and Personality traits (10%) for behavioral compatibility. This comprehensive approach provides detailed insights into relationship potential.",
    },
    {
      question: "Can I calculate compatibility for any names?",
      answer:
        "Yes! Our love calculator works with any names from any culture or language. The algorithm analyzes letter frequencies, name lengths, and numerological patterns regardless of the origin of the names. You can calculate compatibility for romantic partners, friends, family members, or even celebrities and fictional characters.",
    },
    {
      question: "Why choose Toolspy over other free love calculators like LoveCalculator.net or LovePercentage.com?",
      answer:
        "Toolspy offers professional-grade features like advanced multi-factor analysis, client-side processing for privacy, detailed compatibility reports, and real-time results. Many competitors like LoveCalculator.net and LovePercentage.com have basic algorithms, use server-based processing, or provide limited analysis. Our tool provides better privacy protection, more comprehensive analysis, and superior functionality completely free.",
    },
    {
      question: "How fast is the love calculation?",
      answer:
        "Our love calculator provides instant results for any name combination. Since all processing happens in your browser, there are no server delays or upload times. You can calculate compatibility for multiple pairs in milliseconds, making it perfect for fun comparisons or relationship analysis.",
    },
    {
      question: "What does the compatibility percentage mean?",
      answer:
        "The compatibility percentage represents the overall harmony between two people based on our multi-factor analysis. Higher percentages (80-100%) indicate strong compatibility, medium percentages (60-79%) suggest good potential, and lower percentages (40-59%) may indicate challenges. However, remember this is for entertainment and should not replace genuine relationship communication and understanding.",
    },
    {
      question: "Can I get detailed analysis of the compatibility factors?",
      answer:
        "Yes! Our tool provides comprehensive analysis including detailed breakdowns of each compatibility factor, explanations of why certain aspects work well together, and insights into potential relationship dynamics. You can see exactly how names, zodiac signs, and birth dates contribute to the overall compatibility score.",
    },
    {
      question: "Is it safe to use online love calculators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your names and personal information are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based calculators, our tool provides complete privacy and security for your love calculations.",
    },
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Advanced Compatibility",
      description:
        "Multi-factor analysis using names, zodiac signs, numerology, and personality traits.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Real-time love calculation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your information never leaves your device, providing maximum security.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Detailed Analysis",
      description:
        "Comprehensive compatibility reports with factor breakdowns and relationship insights.",
    },
  ];

  const keyBenefits = [
    "💕 Advanced multi-factor compatibility analysis",
    "⚡ Instant calculation with no server delays or uploads",
    "🔒 Complete privacy protection - information never leaves your device",
    "📊 Multiple factors: names, zodiac, numerology, personality",
    "🔧 Detailed compatibility reports and factor breakdowns",
    "📊 Real-time calculation and analysis",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade compatibility algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Comprehensive factor analysis and explanations",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "💝 Entertainment-focused relationship insights",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. LoveCalculator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Factors: Multi-factor vs. names only",
        "Detailed Analysis: Comprehensive reports vs. basic result",
        "Advanced Algorithm: Sophisticated vs. basic calculation",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. LovePercentage.com",
      advantages: [
        "More Factors: Multiple factors vs. basic calculation",
        "Better Privacy: No data transmission vs. server-based",
        "Detailed Analysis: Comprehensive vs. percentage only",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Calculation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic calculation",
      ],
    },
    {
      title: "Toolspy vs. Compatibility.com",
      advantages: [
        "More Factors: All factors vs. limited factors",
        "Better Privacy: Client-side vs. server-based processing",
        "Detailed Analysis: Comprehensive vs. limited analysis",
        "Multiple Formats: All formats vs. basic formatting",
        "Export Options: Multiple formats vs. basic export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="love-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other calculation and entertainment tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate Love Compatibility – Professional & Fun
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional love calculator with advanced multi-factor analysis, instant processing, 
            and complete privacy protection. Perfect for entertainment, relationship insights, 
            and fun compatibility testing.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Love Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate love compatibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Names</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input the names of two people you want to test for love compatibility. 
              You can use full names, nicknames, or any name combination.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Add Optional Details</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Optionally add zodiac signs, birth dates, or personality traits 
              for more accurate and detailed compatibility analysis.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Get Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View your detailed compatibility report instantly. Copy results or 
              export in your preferred format for sharing.
            </p>
          </Card>
        </div>
      </section>

      {/* Calculation Factors Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Compatibility Factors & Analysis</h3>
          <p className="text-muted-foreground">
            Understand how our love calculator analyzes compatibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculationFactors.map((factor, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{factor.factor}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Weight:</strong> {factor.weight}</div>
                <div><strong>Details:</strong> {factor.details}</div>
                <div><strong>Example:</strong> {factor.example}</div>
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
            See how our love calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">LoveCalculator.net</th>
                    <th className="text-center p-4 font-semibold">LovePercentage.com</th>
                    <th className="text-center p-4 font-semibold">Compatibility.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.lovecalculator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.lovepercentage}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.compatibility}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Love Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make love compatibility calculation fun and insightful
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
            See why users choose our love calculator
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
            Everything you need to know about love compatibility calculation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about love compatibility calculation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Fun and entertainment applications for love compatibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Romantic Partners</h4>
            <p className="text-sm text-muted-foreground">
              Test compatibility with romantic partners, dates, or potential relationships
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Friends & Family</h4>
            <p className="text-sm text-muted-foreground">
              Check compatibility with friends, family members, or colleagues
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Entertainment</h4>
            <p className="text-sm text-muted-foreground">
              Fun compatibility testing for celebrities, fictional characters, or friends
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Relationship Insights</h4>
            <p className="text-sm text-muted-foreground">
              Gain insights into relationship dynamics and compatibility factors
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate Love Compatibility?</h3>
        <p className="text-muted-foreground">
          Start using our professional love calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Love Calculator Now
        </Button>
      </section>
    </div>
  );
} 
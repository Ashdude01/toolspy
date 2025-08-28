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
  Droplets,
  Ruler,
  Thermometer,
  Weight,
  Square,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function VolumeConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("volume-converter");

  const comparisonData = [
    {
      feature: "Conversion Accuracy",
      toolspy: "✅ 100% accurate",
      unitconverter: "⚠️ Variable accuracy",
      convertunits: "❌ Limited precision",
      rapidtables: "⚠️ Basic accuracy",
      toolspyStatus: "excellent",
    },
    {
      feature: "Unit Coverage",
      toolspy: "All volume units",
      unitconverter: "Limited units",
      convertunits: "Basic units",
      rapidtables: "Standard units",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      unitconverter: "⚠️ Server-based",
      convertunits: "⚠️ Server-based",
      rapidtables: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      unitconverter: "✅ Free",
      convertunits: "✅ Free",
      rapidtables: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      unitconverter: "⚠️ Basic mobile",
      convertunits: "❌ Desktop only",
      rapidtables: "⚠️ Basic mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Multiple Systems",
      toolspy: "✅ All systems",
      unitconverter: "⚠️ Limited systems",
      convertunits: "❌ Basic systems",
      rapidtables: "⚠️ Limited systems",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Conversion",
      toolspy: "✅ Instant results",
      unitconverter: "⚠️ Delayed results",
      convertunits: "❌ Slow processing",
      rapidtables: "⚠️ Basic conversion",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      unitconverter: "❌ Ad-heavy",
      convertunits: "❌ Ad-heavy",
      rapidtables: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const volumeCategories = [
    {
      type: "Liquid Volume",
      description: "Convert between liquid volume units",
      features: "Liters, gallons, milliliters, fluid ounces",
      example: "Convert 2 liters to US gallons",
      useCase: "Cooking, chemistry, beverage industry",
    },
    {
      type: "Dry Volume",
      description: "Convert between dry volume units",
      features: "Cubic meters, cubic feet, bushels, pecks",
      example: "Convert 1 cubic meter to cubic feet",
      useCase: "Agriculture, construction, storage",
    },
    {
      type: "Metric System",
      description: "Convert within metric volume units",
      features: "Liters, milliliters, cubic centimeters",
      example: "Convert 500 ml to liters",
      useCase: "Scientific research, international trade",
    },
    {
      type: "Imperial System",
      description: "Convert within imperial volume units",
      features: "Gallons, pints, quarts, fluid ounces",
      example: "Convert 1 UK gallon to US gallons",
      useCase: "UK/US trade, historical measurements",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's volume converter completely free to use?",
      answer:
        "Yes, our professional volume converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited volume units without any restrictions. Unlike many competitors who have conversion limits or require paid subscriptions for advanced features, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "How accurate are the volume conversions?",
      answer:
        "Our volume converter provides 100% accurate conversions using exact mathematical formulas and official conversion factors. All calculations are performed with high precision to ensure reliable results for cooking, chemistry, engineering, and any other volume conversion needs. The tool maintains accuracy across all unit systems.",
    },
    {
      question: "How secure is the volume conversion process?",
      answer:
        "Absolutely secure! Our volume converter uses client-side processing, meaning your conversion requests are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your conversion activity never leaves your device, making it safer than server-based converters.",
    },
    {
      question: "What volume units are supported?",
      answer:
        "Our volume converter supports all major volume units including liters, gallons (US and UK), milliliters, fluid ounces, cubic meters, cubic feet, cups, pints, quarts, bushels, and many more. We cover metric, US customary, and UK imperial measurement systems for comprehensive volume conversion needs.",
    },
    {
      question: "Can I convert between different measurement systems?",
      answer:
        "Yes! Our volume converter allows seamless conversion between metric, US customary, and UK imperial measurement systems. You can convert from liters to gallons, cubic meters to cubic feet, or any combination of volume units across different systems with instant, accurate results.",
    },
    {
      question: "Why choose Toolspy over other free volume converters like UnitConverter.com or ConvertUnits.com?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate conversions, client-side processing for privacy, comprehensive unit coverage, and real-time conversion capabilities. Many competitors like UnitConverter.com and ConvertUnits.com have limited accuracy, use server-based processing, or lack advanced features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast are the volume conversions?",
      answer:
        "Our volume converter provides instant conversions for any volume unit. Since all processing happens in your browser, there are no server delays or upload times. You can convert multiple volume units quickly, making it perfect for professionals and students who need efficient conversion tools.",
    },
    {
      question: "What's the difference between US and UK gallons?",
      answer:
        "A US gallon is 3.78541 liters, while a UK (imperial) gallon is 4.54609 liters. UK gallons are about 20% larger than US gallons. Our converter automatically handles these differences and provides accurate conversions between both systems, which is essential for international trade and scientific applications.",
    },
    {
      question: "Can I use this for cooking and recipe conversions?",
      answer:
        "Absolutely! Our volume converter is perfect for cooking and recipe conversions. You can convert between cups, tablespoons, teaspoons, fluid ounces, milliliters, and liters. This is especially useful when following international recipes or converting between metric and imperial measurements in the kitchen.",
    },
    {
      question: "Is it safe to use online volume converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your conversion requests are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your volume conversions.",
    },
  ];

  const benefits = [
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "100% Accurate Conversions",
      description:
        "Convert between volume units with precise mathematical accuracy using official conversion factors.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get volume conversions instantly with no server delays or processing wait times.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your conversion requests never leave your device, providing maximum security.",
    },
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "All Volume Units",
      description:
        "Support for metric, US customary, and UK imperial volume measurement systems.",
    },
  ];

  const keyBenefits = [
    "📏 100% accurate volume conversions",
    "⚡ Instant conversion with no server delays or uploads",
    "🔒 Complete privacy protection - conversion requests never leave your device",
    "📱 Mobile-friendly responsive design",
    "🌍 Support for metric, US, and UK measurement systems",
    "📋 Comprehensive unit coverage",
    "🎯 Professional-grade conversion accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Real-time conversion updates",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📈 Multiple unit system support for all needs",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. UnitConverter.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Higher Accuracy: 100% accurate vs. variable accuracy",
        "More Units: All volume units vs. limited units",
        "Real-time: Instant results vs. delayed results",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
      ],
    },
    {
      title: "Toolspy vs. ConvertUnits.com",
      advantages: [
        "Higher Accuracy: 100% accurate vs. limited precision",
        "Better Privacy: No data transmission vs. server-based",
        "More Units: All volume units vs. basic units",
        "Faster Processing: Instant vs. slow processing",
        "Mobile Friendly: Responsive design vs. desktop only",
        "Professional Features: Advanced options vs. basic conversion",
      ],
    },
    {
      title: "Toolspy vs. RapidTables.com",
      advantages: [
        "Better Accuracy: 100% accurate vs. basic accuracy",
        "Better Privacy: Client-side vs. server-based processing",
        "More Units: All volume units vs. standard units",
        "Real-time: Instant results vs. basic conversion",
        "Better Mobile: Responsive design vs. basic mobile",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="volume-converter"
        title="Similar Tools You Might Like"
        description="Check out our other conversion and measurement tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Volume Converter – 100% Accurate & Instant
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional volume converter with precise conversions, privacy protection, 
            and comprehensive unit support. Perfect for cooking, chemistry, engineering, 
            and anyone needing accurate volume conversions.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Volume Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert volume units accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Value</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the volume value you want to convert. 
              The tool accepts decimal numbers and fractions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Select Units</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose the source and target volume units. 
              Get instant conversion options with 100% accuracy.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Get Result</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View the converted value instantly. 
              Fast, secure, and accurate conversions every time.
            </p>
          </Card>
        </div>
      </section>

      {/* Volume Categories Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Volume Categories & Applications</h3>
          <p className="text-muted-foreground">
            Professional volume conversion categories for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volumeCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Droplets className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{category.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Features:</strong> {category.features}</div>
                <div><strong>Example:</strong> {category.example}</div>
                <div><strong>Use Case:</strong> {category.useCase}</div>
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
            See how our volume converter outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">UnitConverter.com</th>
                    <th className="text-center p-4 font-semibold">ConvertUnits.com</th>
                    <th className="text-center p-4 font-semibold">RapidTables.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.unitconverter}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.convertunits}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.rapidtables}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Volume Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make volume conversion fast and accurate
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
            See why professionals choose our volume converter
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
            Everything you need to know about volume conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about volume conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for volume conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Droplets className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Cooking & Recipes</h4>
            <p className="text-sm text-muted-foreground">
              Convert recipe measurements between different volume units
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Thermometer className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Chemistry & Science</h4>
            <p className="text-sm text-muted-foreground">
              Convert laboratory measurements and chemical volumes
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Ruler className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Engineering</h4>
            <p className="text-sm text-muted-foreground">
              Convert construction and engineering volume measurements
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Square className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">International Trade</h4>
            <p className="text-sm text-muted-foreground">
              Convert between metric and imperial volume units
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert Volumes?</h3>
        <p className="text-muted-foreground">
          Start using our professional volume converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Volume Converter Now
        </Button>
      </section>
    </div>
  );
} 
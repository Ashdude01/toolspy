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
  Database as DatabaseIcon,
  Table,
  FileSpreadsheet,
  BarChart3,
  File,
  FolderOpen,
  Layers,
  Split,
  LockKeyhole,
  KeyRound,
  ShieldCheck,
  Weight,
  Scale as ScaleIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function WeightConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("weight-converter");

  const comparisonData = [
    {
      feature: "Conversion Accuracy",
      toolspy: "✅ 100% accurate",
      google: "✅ Accurate",
      wolfram: "✅ Accurate",
      convertunits: "✅ Accurate",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      google: "⚠️ Server-based",
      wolfram: "⚠️ Server-based",
      convertunits: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      google: "✅ Free",
      wolfram: "❌ Subscription required",
      convertunits: "✅ Free with ads",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      google: "✅ Mobile app",
      wolfram: "⚠️ Basic mobile",
      convertunits: "⚠️ Basic mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Updates",
      toolspy: "✅ Instant conversion",
      google: "✅ Instant",
      wolfram: "⚠️ Delayed",
      convertunits: "⚠️ Delayed",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      google: "✅ Clean interface",
      wolfram: "✅ Clean interface",
      convertunits: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
    {
      feature: "Unit Coverage",
      toolspy: "✅ 50+ weight units",
      google: "✅ 20+ units",
      wolfram: "✅ 100+ units",
      convertunits: "✅ 30+ units",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Conversion",
      toolspy: "✅ Multiple values",
      google: "❌ Single conversion",
      wolfram: "❌ Single conversion",
      convertunits: "❌ Single conversion",
      toolspyStatus: "excellent",
    },
  ];

  const conversionFeatures = [
    {
      type: "Metric Weight Units",
      description: "Convert between metric weight units",
      features: "Kilograms, grams, milligrams, tonnes, metric tons",
      example: "Convert 1 kg to grams (1000g)",
      useCase: "Scientific calculations, international trade, cooking",
    },
    {
      type: "Imperial Weight Units",
      description: "Convert between imperial weight units",
      features: "Pounds, ounces, stones, tons, grains",
      example: "Convert 1 pound to ounces (16 oz)",
      useCase: "US measurements, cooking, fitness tracking",
    },
    {
      type: "Specialized Units",
      description: "Convert specialized weight units",
      features: "Carats, atomic mass units, troy ounces, pennyweights",
      example: "Convert 1 carat to milligrams (200 mg)",
      useCase: "Jewelry, precious metals, scientific research",
    },
    {
      type: "Cross-System Conversion",
      description: "Convert between metric and imperial systems",
      features: "Metric to imperial, imperial to metric, precision conversion",
      example: "Convert 1 kg to pounds (2.20462 lbs)",
      useCase: "International shipping, global trade, travel",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's weight converter completely free to use?",
      answer:
        "Yes, our professional weight converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited weight values without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "How accurate are the weight conversions?",
      answer:
        "Our weight converter provides 100% accurate conversions using exact mathematical formulas and official conversion factors. The tool maintains high precision for professional use, ensuring reliable results for scientific, commercial, and personal applications.",
    },
    {
      question: "How secure is the weight conversion process?",
      answer:
        "Absolutely secure! Our weight converter uses client-side processing, meaning your conversion data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your conversion values never leave your device, making it safer than server-based conversion tools.",
    },
    {
      question: "What weight units does the converter support?",
      answer:
        "Our weight converter supports over 50 weight units including metric units (kilograms, grams, milligrams, tonnes), imperial units (pounds, ounces, stones, tons), and specialized units (carats, atomic mass units, troy ounces). The tool covers all major weight measurement systems used worldwide.",
    },
    {
      question: "How do I convert pounds to kilograms?",
      answer:
        "To convert pounds to kilograms, divide by 2.20462. For example: 10 pounds = 4.536 kilograms. Our converter does this automatically - just enter the value in pounds and select kilograms as the target unit. The conversion is instant and accurate.",
    },
    {
      question: "Why choose Toolspy over other weight converters like Google or Wolfram Alpha?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate conversions, client-side processing for privacy, batch conversion capabilities, and support for 50+ weight units. Many competitors like Wolfram Alpha require paid subscriptions, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast are the weight conversions?",
      answer:
        "Our weight converter provides instant conversions for any weight value. Since all processing happens in your browser, there are no server delays or processing time. You can convert multiple values quickly, making it perfect for professionals and individuals who need efficient weight conversion tools.",
    },
    {
      question: "What's the difference between mass and weight?",
      answer:
        "Mass is the amount of matter in an object (constant everywhere), while weight is the force of gravity acting on that mass (varies by location). Our converter handles both concepts, providing accurate conversions regardless of the measurement context.",
    },
    {
      question: "Can I convert multiple weight values at once?",
      answer:
        "Yes! You can convert multiple weight values simultaneously. This batch conversion feature saves time when working with multiple measurements and ensures consistent conversion settings across all values.",
    },
    {
      question: "Is it safe to use online weight converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your conversion data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your weight conversion needs.",
    },
  ];

  const benefits = [
    {
      icon: <ScaleIcon className="h-6 w-6" />,
      title: "Accurate Conversions",
      description:
        "100% accurate weight conversions using exact mathematical formulas.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get weight conversions instantly with no server delays or processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your conversion data never leaves your device.",
    },
    {
      icon: <Weight className="h-6 w-6" />,
      title: "50+ Weight Units",
      description:
        "Convert between metric, imperial, and specialized weight units.",
    },
  ];

  const keyBenefits = [
    "⚖️ 100% accurate weight conversions",
    "⚡ Instant conversions with no delays",
    "🔒 Complete privacy protection - data never leaves your device",
    "📱 Mobile-friendly responsive design",
    "📊 Support for 50+ weight units",
    "🌍 Metric and imperial systems",
    "🎯 Professional-grade conversion accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Real-time conversion updates",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📋 Cross-system conversion support",
    "🔍 Specialized unit conversions",
    "📊 Batch conversion capabilities",
    "🎯 High precision calculations",
    "📱 Universal unit coverage",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Google",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Units: 50+ units vs. 20+ units",
        "Batch Conversion: Multiple values vs. single conversion",
        "No Tracking: No data collection vs. analytics tracking",
        "Better Mobile: Responsive design vs. app dependency",
        "Clean Interface: No ads vs. ad integration",
      ],
    },
    {
      title: "Toolspy vs. Wolfram Alpha",
      advantages: [
        "No Registration: Free forever vs. subscription required",
        "Better Privacy: No data transmission vs. server-based",
        "Faster Processing: Instant vs. delayed conversions",
        "Mobile Friendly: Responsive design vs. basic mobile",
        "No Ads: Clean interface vs. premium features",
        "Professional Features: Advanced options vs. limited free",
      ],
    },
    {
      title: "Toolspy vs. ConvertUnits",
      advantages: [
        "Better Privacy: Client-side vs. server-based processing",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
        "Batch Conversion: Multiple values vs. single conversion",
        "Real-time Updates: Instant vs. delayed conversions",
        "Professional Interface: Modern design vs. basic layout",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="weight-converter"
        title="Similar Tools You Might Like"
        description="Check out our other conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Weight Converter – 100% Accurate & Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Convert between metric and imperial weight units with precision, privacy protection, 
            and instant results. Perfect for cooking, shipping, fitness, 
            and anyone needing accurate weight conversions.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Weight Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert weight units accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Weight</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the weight value you want to convert. 
              The tool supports all major weight units.
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
              Choose the source and target units from 
              our comprehensive list of weight units.
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
              Get instant, accurate conversion results. 
              Fast, secure, and precise every time.
            </p>
          </Card>
        </div>
      </section>

      {/* Conversion Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Weight Conversion Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional conversion methods for all your weight measurement needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversionFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <ScaleIcon className="h-5 w-5 mr-2 text-primary" />
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
            See how our weight converter outperforms other conversion tools
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
                    <th className="text-center p-4 font-semibold">Google</th>
                    <th className="text-center p-4 font-semibold">Wolfram Alpha</th>
                    <th className="text-center p-4 font-semibold">ConvertUnits</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.google}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.wolfram}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.convertunits}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Weight Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make weight conversion fast and accurate
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
            See why professionals choose our weight converter
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
            Everything you need to know about weight conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about weight conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for weight conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Weight className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Cooking & Baking</h4>
            <p className="text-sm text-muted-foreground">
              Convert recipe measurements between units
            </p>
          </Card>

          <Card className="p-6 text-center">
            <ScaleIcon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Shipping & Logistics</h4>
            <p className="text-sm text-muted-foreground">
              Convert package weights for international shipping
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Fitness Tracking</h4>
            <p className="text-sm text-muted-foreground">
              Convert body weight measurements
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Scientific Research</h4>
            <p className="text-sm text-muted-foreground">
              Convert laboratory measurements
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert Weight Units?</h3>
        <p className="text-muted-foreground">
          Start using our professional weight converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Weight Converter Now
        </Button>
      </section>
    </div>
  );
} 
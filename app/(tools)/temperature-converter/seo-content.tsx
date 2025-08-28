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
  Thermometer,
  Sun,
  Cloud,
  Snowflake,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function TemperatureConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("temperature-converter");

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
      feature: "Temperature Scales",
      toolspy: "✅ 4 scales (C, F, K, R)",
      google: "✅ 3 scales (C, F, K)",
      wolfram: "✅ 4 scales (C, F, K, R)",
      convertunits: "✅ 3 scales (C, F, K)",
      toolspyStatus: "excellent",
    },
    {
      feature: "Context Information",
      toolspy: "✅ Temperature context",
      google: "❌ No context",
      wolfram: "✅ Scientific context",
      convertunits: "❌ No context",
      toolspyStatus: "excellent",
    },
  ];

  const conversionFeatures = [
    {
      type: "Celsius Conversions",
      description: "Convert to and from Celsius temperature scale",
      features: "Celsius to Fahrenheit, Kelvin, Rankine, precise formulas",
      example: "Convert 25°C to Fahrenheit (77°F)",
      useCase: "Weather reporting, cooking, international travel",
    },
    {
      type: "Fahrenheit Conversions",
      description: "Convert to and from Fahrenheit temperature scale",
      features: "Fahrenheit to Celsius, Kelvin, Rankine, US measurements",
      example: "Convert 98.6°F to Celsius (37°C)",
      useCase: "US weather, body temperature, cooking",
    },
    {
      type: "Kelvin Conversions",
      description: "Convert to and from Kelvin absolute temperature scale",
      features: "Kelvin to Celsius, Fahrenheit, Rankine, scientific calculations",
      example: "Convert 300K to Celsius (26.85°C)",
      useCase: "Scientific research, physics, chemistry",
    },
    {
      type: "Rankine Conversions",
      description: "Convert to and from Rankine absolute temperature scale",
      features: "Rankine to other scales, engineering applications",
      example: "Convert 500°R to Fahrenheit (40°F)",
      useCase: "Engineering, thermodynamics, specialized calculations",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's temperature converter completely free to use?",
      answer:
        "Yes, our professional temperature converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited temperature values without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "How accurate are the temperature conversions?",
      answer:
        "Our temperature converter provides 100% accurate conversions using exact mathematical formulas and official conversion factors. The tool maintains high precision for professional use, ensuring reliable results for scientific, commercial, and personal applications.",
    },
    {
      question: "How secure is the temperature conversion process?",
      answer:
        "Absolutely secure! Our temperature converter uses client-side processing, meaning your conversion data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your conversion values never leave your device, making it safer than server-based conversion tools.",
    },
    {
      question: "What temperature scales does the converter support?",
      answer:
        "Our temperature converter supports four major temperature scales: Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R). The tool covers all major temperature measurement systems used worldwide for weather, science, cooking, and engineering applications.",
    },
    {
      question: "How do I convert Celsius to Fahrenheit?",
      answer:
        "To convert Celsius to Fahrenheit: °F = (°C × 9/5) + 32. For example: 20°C = (20 × 9/5) + 32 = 68°F. Our converter does this automatically - just enter the value in Celsius and select Fahrenheit as the target unit. The conversion is instant and accurate.",
    },
    {
      question: "Why choose Toolspy over other temperature converters like Google or Wolfram Alpha?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate conversions, client-side processing for privacy, context information, and support for all major temperature scales. Many competitors like Wolfram Alpha require paid subscriptions, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast are the temperature conversions?",
      answer:
        "Our temperature converter provides instant conversions for any temperature value. Since all processing happens in your browser, there are no server delays or upload times. You can convert multiple values quickly, making it perfect for professionals and individuals who need efficient temperature conversion tools.",
    },
    {
      question: "What's the difference between Celsius and Fahrenheit?",
      answer:
        "Celsius is based on water's freezing (0°C) and boiling (100°C) points, while Fahrenheit uses 32°F for freezing and 212°F for boiling water. Celsius is used worldwide, while Fahrenheit is primarily used in the US, Myanmar, and Liberia for everyday temperature measurements.",
    },
    {
      question: "When would I use Kelvin temperature?",
      answer:
        "Kelvin is used in scientific calculations because it's an absolute temperature scale starting at absolute zero (-273.15°C). It's essential for physics, chemistry, and engineering applications where absolute temperature measurements are required.",
    },
    {
      question: "Is it safe to use online temperature converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your conversion data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your temperature conversion needs.",
    },
  ];

  const benefits = [
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: "Accurate Conversions",
      description:
        "100% accurate temperature conversions using exact mathematical formulas.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get temperature conversions instantly with no server delays or processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your conversion data never leaves your device.",
    },
    {
      icon: <Sun className="h-6 w-6" />,
      title: "4 Temperature Scales",
      description:
        "Convert between Celsius, Fahrenheit, Kelvin, and Rankine scales.",
    },
  ];

  const keyBenefits = [
    "🌡️ 100% accurate temperature conversions",
    "⚡ Instant conversions with no delays",
    "🔒 Complete privacy protection - data never leaves your device",
    "📱 Mobile-friendly responsive design",
    "🌍 Support for 4 temperature scales",
    "🔬 Scientific and everyday applications",
    "🎯 Professional-grade conversion accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Real-time conversion updates",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📋 Cross-scale conversion support",
    "🔍 Context information for temperatures",
    "📊 Batch conversion capabilities",
    "🎯 High precision calculations",
    "📱 Universal scale coverage",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Google",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Scales: 4 scales vs. 3 scales",
        "Context Info: Temperature context vs. no context",
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
        "More Scales: 4 scales vs. 3 scales",
        "Context Info: Temperature context vs. no context",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
        "Professional Interface: Modern design vs. basic layout",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="temperature-converter"
        title="Similar Tools You Might Like"
        description="Check out our other conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Professional Temperature Converter – 100% Accurate & Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Convert between Celsius, Fahrenheit, Kelvin, and Rankine with precision, privacy protection, 
            and instant results. Perfect for weather, cooking, science, 
            and anyone needing accurate temperature conversions.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Temperature Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert temperature units accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Temperature</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the temperature value you want to convert. 
              The tool supports all major temperature scales.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Select Scales</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose the source and target temperature scales from 
              our comprehensive list of temperature units.
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
              Get instant, accurate conversion results with context. 
              Fast, secure, and precise every time.
            </p>
          </Card>
        </div>
      </section>

      {/* Conversion Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Temperature Conversion Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional conversion methods for all your temperature measurement needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversionFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Thermometer className="h-5 w-5 mr-2 text-primary" />
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
            See how our temperature converter outperforms other conversion tools
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Temperature Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make temperature conversion fast and accurate
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
            See why professionals choose our temperature converter
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
            Everything you need to know about temperature conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about temperature conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for temperature conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Cloud className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Weather Reporting</h4>
            <p className="text-sm text-muted-foreground">
              Convert weather temperatures between scales
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Sun className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Cooking & Baking</h4>
            <p className="text-sm text-muted-foreground">
              Convert recipe temperatures between units
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Scientific Research</h4>
            <p className="text-sm text-muted-foreground">
              Convert laboratory temperature measurements
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Snowflake className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">International Travel</h4>
            <p className="text-sm text-muted-foreground">
              Convert temperatures for different countries
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert Temperature Units?</h3>
        <p className="text-muted-foreground">
          Start using our professional temperature converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Temperature Converter Now
        </Button>
      </section>
    </div>
  );
} 
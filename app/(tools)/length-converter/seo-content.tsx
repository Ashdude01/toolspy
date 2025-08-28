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
  Ruler,
  MapPin,
  Navigation,
  Compass,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function LengthConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("length-converter");

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
      toolspy: "✅ 50+ length units",
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
      type: "Metric Length Units",
      description: "Convert between metric length units",
      features: "Millimeters, centimeters, meters, kilometers, precise formulas",
      example: "Convert 1 meter to centimeters (100 cm)",
      useCase: "Scientific calculations, international measurements, engineering",
    },
    {
      type: "Imperial Length Units",
      description: "Convert between imperial length units",
      features: "Inches, feet, yards, miles, US measurements",
      example: "Convert 1 foot to inches (12 inches)",
      useCase: "US construction, everyday measurements, traditional units",
    },
    {
      type: "Specialized Units",
      description: "Convert specialized length units",
      features: "Nautical miles, astronomical units, light years, parsecs",
      example: "Convert 1 nautical mile to kilometers (1.852 km)",
      useCase: "Maritime navigation, astronomy, specialized fields",
    },
    {
      type: "Cross-System Conversion",
      description: "Convert between metric and imperial systems",
      features: "Metric to imperial, imperial to metric, precision conversion",
      example: "Convert 1 meter to feet (3.28084 ft)",
      useCase: "International projects, global trade, travel planning",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's length converter completely free to use?",
      answer:
        "Yes, our professional length converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited length values without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "How accurate are the length conversions?",
      answer:
        "Our length converter provides 100% accurate conversions using exact mathematical formulas and official conversion factors. The tool maintains high precision for professional use, ensuring reliable results for construction, engineering, and scientific applications.",
    },
    {
      question: "How secure is the length conversion process?",
      answer:
        "Absolutely secure! Our length converter uses client-side processing, meaning your conversion data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your conversion values never leave your device, making it safer than server-based conversion tools.",
    },
    {
      question: "What length units does the converter support?",
      answer:
        "Our length converter supports over 50 length units including metric units (millimeters, centimeters, meters, kilometers), imperial units (inches, feet, yards, miles), and specialized units (nautical miles, astronomical units, light years). The tool covers all major length measurement systems used worldwide.",
    },
    {
      question: "How do I convert meters to feet?",
      answer:
        "To convert meters to feet, multiply by 3.28084. For example: 1 meter = 3.28084 feet, so 5 meters = 16.404 feet. Our converter does this automatically - just enter the value in meters and select feet as the target unit. The conversion is instant and accurate.",
    },
    {
      question: "Why choose Toolspy over other length converters like Google or Wolfram Alpha?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate conversions, client-side processing for privacy, batch conversion capabilities, and support for 50+ length units. Many competitors like Wolfram Alpha require paid subscriptions, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast are the length conversions?",
      answer:
        "Our length converter provides instant conversions for any length value. Since all processing happens in your browser, there are no server delays or upload times. You can convert multiple values quickly, making it perfect for professionals and individuals who need efficient length conversion tools.",
    },
    {
      question: "What's the difference between imperial and metric units?",
      answer:
        "Imperial units (feet, inches, yards) are primarily used in the US and are based on traditional measurements. Metric units (meters, centimeters, kilometers) are used worldwide and are based on powers of 10, making them easier for scientific and international applications.",
    },
    {
      question: "Can I convert multiple length values at once?",
      answer:
        "Yes! You can convert multiple length values simultaneously. This batch conversion feature saves time when working with multiple measurements and ensures consistent conversion settings across all values.",
    },
    {
      question: "Is it safe to use online length converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your conversion data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your length conversion needs.",
    },
  ];

  const benefits = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Accurate Conversions",
      description:
        "100% accurate length conversions using exact mathematical formulas.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get length conversions instantly with no server delays or processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your conversion data never leaves your device.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "50+ Length Units",
      description:
        "Convert between metric, imperial, and specialized length units.",
    },
  ];

  const keyBenefits = [
    "📏 100% accurate length conversions",
    "⚡ Instant conversions with no delays",
    "🔒 Complete privacy protection - data never leaves your device",
    "📱 Mobile-friendly responsive design",
    "📊 Support for 50+ length units",
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
        "More Units: 50+ units vs. 30+ units",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
        "Batch Conversion: Multiple values vs. single conversion",
        "Professional Interface: Modern design vs. basic layout",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="length-converter"
        title="Similar Tools You Might Like"
        description="Check out our other conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Professional Length Converter – 100% Accurate & Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Convert between metric and imperial length units with precision, privacy protection, 
            and instant results. Perfect for construction, engineering, travel, 
            and anyone needing accurate length conversions.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Length Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert length units accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Length</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter the length value you want to convert. 
              The tool supports all major length units.
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
              Choose the source and target length units from 
              our comprehensive list of length units.
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
          <h3 className="text-3xl font-bold mb-4">Length Conversion Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional conversion methods for all your length measurement needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversionFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Ruler className="h-5 w-5 mr-2 text-primary" />
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
            See how our length converter outperforms other conversion tools
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Length Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make length conversion fast and accurate
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
            See why professionals choose our length converter
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
            Everything you need to know about length conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about length conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for length conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Ruler className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Construction</h4>
            <p className="text-sm text-muted-foreground">
              Convert building measurements between units
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Navigation className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Engineering</h4>
            <p className="text-sm text-muted-foreground">
              Convert technical specifications and dimensions
            </p>
          </Card>

          <Card className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Travel Planning</h4>
            <p className="text-sm text-muted-foreground">
              Convert distances for international travel
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Compass className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Everyday Measurements</h4>
            <p className="text-sm text-muted-foreground">
              Convert common household measurements
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert Length Units?</h3>
        <p className="text-muted-foreground">
          Start using our professional length converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Length Converter Now
        </Button>
      </section>
    </div>
  );
} 
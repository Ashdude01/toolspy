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
  Ruler,
  Thermometer,
  Weight,
  Droplets,
  Square,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function UnitConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("unit-converter");

  const comparisonData = [
    {
      feature: "Unit Coverage",
      toolspy: "✅ All major units",
      convertunits: "⚠️ Limited units",
      unitconverter: "⚠️ Basic units",
      rapidtables: "❌ Limited coverage",
      toolspyStatus: "excellent",
    },
    {
      feature: "Conversion Speed",
      toolspy: "Instant conversion",
      convertunits: "Server delays",
      unitconverter: "Slow processing",
      rapidtables: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      convertunits: "⚠️ Server-based",
      unitconverter: "⚠️ Server-based",
      rapidtables: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Unit Categories",
      toolspy: "✅ All categories",
      convertunits: "⚠️ Limited categories",
      unitconverter: "❌ Basic categories",
      rapidtables: "⚠️ Limited categories",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      convertunits: "✅ Free",
      unitconverter: "✅ Free",
      rapidtables: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      convertunits: "⚠️ Basic mobile",
      unitconverter: "❌ Desktop only",
      rapidtables: "⚠️ Basic mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Accuracy",
      toolspy: "✅ Bank-level precision",
      convertunits: "⚠️ Standard accuracy",
      unitconverter: "⚠️ Basic accuracy",
      rapidtables: "⚠️ Standard accuracy",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      convertunits: "❌ Ad-heavy",
      unitconverter: "❌ Ad-heavy",
      rapidtables: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const unitCategories = [
    {
      type: "Length Units",
      description: "Convert between length measurements",
      units: "Meters, feet, inches, centimeters, miles, kilometers",
      examples: "1 meter = 3.28084 feet, 1 inch = 2.54 centimeters",
      useCase: "Construction, engineering, travel, design",
    },
    {
      type: "Weight Units",
      description: "Convert between weight and mass measurements",
      units: "Kilograms, pounds, ounces, grams, tons",
      examples: "1 kilogram = 2.20462 pounds, 1 pound = 16 ounces",
      useCase: "Cooking, shipping, fitness, science",
    },
    {
      type: "Volume Units",
      description: "Convert between volume and capacity measurements",
      units: "Liters, gallons, cups, milliliters, cubic meters",
      examples: "1 liter = 0.264172 gallons, 1 gallon = 3.78541 liters",
      useCase: "Cooking, chemistry, construction, liquid measurements",
    },
    {
      type: "Temperature Units",
      description: "Convert between temperature scales",
      units: "Celsius, Fahrenheit, Kelvin, Rankine",
      examples: "0°C = 32°F, 100°C = 212°F, 0°C = 273.15K",
      useCase: "Weather, cooking, science, HVAC",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's unit converter completely free to use?",
      answer:
        "Yes, our professional unit converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert between any units unlimited times without any restrictions. Unlike many competitors who have conversion limits or require paid subscriptions for advanced features, Toolspy provides all unit conversion capabilities free of charge.",
    },
    {
      question: "What types of units can I convert?",
      answer:
        "Our universal converter supports all major unit categories including length (meters, feet, inches, miles), weight (kilograms, pounds, ounces), volume (liters, gallons, cups), temperature (Celsius, Fahrenheit, Kelvin), area (square meters, acres, square feet), and more. We cover metric, imperial, and specialized units for comprehensive conversion needs.",
    },
    {
      question: "How accurate are the unit conversions?",
      answer:
        "Our unit converter uses precise mathematical formulas and conversion factors to ensure 100% accuracy. All conversions are performed with high precision calculations, and results are displayed with appropriate decimal places. The tool uses internationally recognized conversion standards for professional and scientific accuracy.",
    },
    {
      question: "How secure is the unit conversion process?",
      answer:
        "Absolutely secure! Our unit converter uses client-side processing, meaning your conversion data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your conversion inputs and results never leave your device, making it safer than server-based converters.",
    },
    {
      question: "Can I convert between different unit systems?",
      answer:
        "Yes! Our converter seamlessly handles conversions between metric, imperial, and specialized unit systems. You can convert from meters to feet, kilograms to pounds, Celsius to Fahrenheit, and any other cross-system conversions. The tool automatically handles the complex conversion factors and provides accurate results.",
    },
    {
      question: "Why choose Toolspy over other free unit converters like ConvertUnits.com or UnitConverter.com?",
      answer:
        "Toolspy offers professional-grade features like instant conversions, comprehensive unit coverage, client-side processing for privacy, and a clean interface. Many competitors like ConvertUnits.com and UnitConverter.com have server-based processing, limited unit coverage, or ad-heavy interfaces. Our tool provides better privacy protection, more unit options, and superior user experience completely free.",
    },
    {
      question: "How fast are the unit conversions?",
      answer:
        "Our unit converter provides instant results for any conversion. Since all processing happens in your browser, there are no server delays or upload times. You can convert between multiple units in milliseconds, making it perfect for quick calculations and professional use.",
    },
    {
      question: "Can I convert multiple units at once?",
      answer:
        "Yes! Our tool allows you to easily convert between multiple units by switching between different unit categories. You can convert length, then switch to weight, then temperature, all in the same session. The tool remembers your preferences and provides consistent, accurate conversions across all unit types.",
    },
    {
      question: "What information do I need to perform a unit conversion?",
      answer:
        "To convert units, you simply need to enter the value you want to convert and select the source and target units. Our converter automatically handles all the mathematical calculations and conversion factors. The tool provides clear results with proper formatting and decimal precision.",
    },
    {
      question: "Is it safe to use online unit converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your conversion data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your unit conversions.",
    },
  ];

  const benefits = [
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "All Unit Types",
      description:
        "Comprehensive coverage of length, weight, volume, temperature, area, and more unit categories.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Conversion",
      description:
        "Real-time unit conversion with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your conversion data never leaves your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Easy Switching",
      description:
        "Seamlessly switch between different unit categories and systems with intuitive interface.",
    },
  ];

  const keyBenefits = [
    "📏 All major unit categories in one tool",
    "⚡ Instant conversion with no server delays or uploads",
    "🔒 Complete privacy protection - conversion data never leaves your device",
    "🌍 Support for metric, imperial, and specialized units",
    "🎯 Bank-level precision calculations",
    "📱 Mobile-friendly responsive design",
    "🔄 Easy switching between unit categories",
    "📊 Clear result display with proper formatting",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Professional-grade conversion accuracy",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📈 Comprehensive unit coverage for all needs",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. ConvertUnits.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Units: All major units vs. limited coverage",
        "Faster Processing: Instant vs. server delays",
        "Better Mobile: Responsive design vs. basic mobile",
        "No Ads: Clean interface vs. ad-heavy layout",
        "More Categories: All categories vs. limited categories",
      ],
    },
    {
      title: "Toolspy vs. UnitConverter.com",
      advantages: [
        "More Units: All major units vs. basic units only",
        "Better Privacy: No data transmission vs. server-based",
        "More Accurate: Bank-level vs. basic accuracy",
        "Faster Processing: Instant vs. slow processing",
        "Mobile Friendly: Responsive design vs. desktop only",
        "Professional Features: Advanced options vs. basic conversion",
      ],
    },
    {
      title: "Toolspy vs. RapidTables.com",
      advantages: [
        "More Units: All major units vs. limited units",
        "Better Privacy: Client-side vs. server-based processing",
        "More Categories: All categories vs. limited categories",
        "Better Mobile: Responsive design vs. basic mobile",
        "No Ads: Clean interface vs. ad-heavy experience",
        "Faster Processing: Instant vs. variable speed",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="unit-converter"
        title="Similar Tools You Might Like"
        description="Check out our other calculation and conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Convert Units – Universal & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional unit converter with comprehensive coverage, instant processing, 
            and complete privacy protection. Perfect for professionals, students, and anyone 
            needing accurate unit conversions.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Unit Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert units accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Select Unit Category</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose the unit category: length, weight, volume, temperature, area, or other units. 
              The tool supports all major unit systems and categories.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Enter Value & Units</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input the value you want to convert and select the source and target units. 
              Get instant results with professional-grade accuracy.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Get Conversion Result</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View your converted value with proper formatting and precision. 
              Switch between different unit categories seamlessly.
            </p>
          </Card>
        </div>
      </section>

      {/* Unit Categories Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Unit Categories & Applications</h3>
          <p className="text-muted-foreground">
            Convert between any unit type with precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unitCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Ruler className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{category.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Units:</strong> {category.units}</div>
                <div><strong>Examples:</strong> {category.examples}</div>
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
            See how our unit converter outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">ConvertUnits.com</th>
                    <th className="text-center p-4 font-semibold">UnitConverter.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.convertunits}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.unitconverter}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Unit Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make unit conversion accurate and effortless
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
            See why professionals choose our unit converter
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
            Everything you need to know about unit conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about unit conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for unit conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Ruler className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Engineering & Construction</h4>
            <p className="text-sm text-muted-foreground">
              Convert measurements for blueprints, materials, and construction specifications
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Weight className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Cooking & Recipes</h4>
            <p className="text-sm text-muted-foreground">
              Convert ingredient measurements between different measurement systems
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Thermometer className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Science & Research</h4>
            <p className="text-sm text-muted-foreground">
              Convert scientific measurements and temperature scales for experiments
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Travel & Navigation</h4>
            <p className="text-sm text-muted-foreground">
              Convert distances, speeds, and measurements for international travel
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert Units?</h3>
        <p className="text-muted-foreground">
          Start using our professional unit converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Unit Converter Now
        </Button>
      </section>
    </div>
  );
} 
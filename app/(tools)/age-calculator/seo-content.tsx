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
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function AgeCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("age-calculator");

  const comparisonData = [
    {
      feature: "Calculation Accuracy",
      toolspy: "Precise to the day",
      agecalculator: "Basic calculation",
      birthdaycalculator: "Approximate only",
      agefinder: "Rounded results",
      toolspyStatus: "excellent",
    },
    {
      feature: "Calculation Speed",
      toolspy: "Instant calculation",
      agecalculator: "Server delays",
      birthdaycalculator: "Slow processing",
      agefinder: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      agecalculator: "⚠️ Server-based",
      birthdaycalculator: "⚠️ Server-based",
      agefinder: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Multiple Formats",
      toolspy: "✅ Years, months, days",
      agecalculator: "⚠️ Years only",
      birthdaycalculator: "❌ Basic format",
      agefinder: "⚠️ Limited formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      agecalculator: "✅ Free",
      birthdaycalculator: "✅ Free",
      agefinder: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      agecalculator: "⚠️ Copy only",
      birthdaycalculator: "❌ No export",
      agefinder: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Future Age Calculator",
      toolspy: "✅ Calculate future age",
      agecalculator: "❌ No future calculation",
      birthdaycalculator: "❌ No future calculation",
      agefinder: "❌ No future calculation",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      agecalculator: "❌ Ad-heavy",
      birthdaycalculator: "❌ Ad-heavy",
      agefinder: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const calculationTypes = [
    {
      type: "Current Age",
      description: "Calculate exact age from birth date to today",
      useCase: "Personal records, legal documents",
      precision: "Years, months, days",
      example: "25 years, 3 months, 15 days",
    },
    {
      type: "Age Between Dates",
      description: "Calculate age between any two specific dates",
      useCase: "Historical records, research",
      precision: "Exact duration",
      example: "2 years, 6 months, 8 days",
    },
    {
      type: "Future Age Calculator",
      description: "Calculate age at a future date",
      useCase: "Planning, projections",
      precision: "Years, months, days",
      example: "30 years, 2 months, 10 days",
    },
    {
      type: "Age in Different Units",
      description: "Convert age to weeks, hours, minutes, seconds",
      useCase: "Scientific calculations, fun facts",
      precision: "Multiple time units",
      example: "1,315 weeks, 220,752 hours",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's age calculator completely free to use?",
      answer:
        "Yes, our professional age calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can calculate ages unlimited times without any restrictions. Unlike many competitors who have calculation limits or require paid subscriptions for advanced features, Toolspy provides all age calculation capabilities free of charge.",
    },
    {
      question: "How accurate is the age calculation?",
      answer:
        "Our age calculator provides precise calculations down to the day. It accounts for leap years, different month lengths, and provides results in years, months, and days. The calculation is based on the exact number of days between dates, ensuring maximum accuracy for any age calculation you need.",
    },
    {
      question: "How secure is the age calculation process?",
      answer:
        "Absolutely secure! Our age calculator uses client-side processing, meaning your birth dates and personal information are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive date information never leaves your device, making it safer than server-based calculators.",
    },
    {
      question: "Can I calculate age between any two dates?",
      answer:
        "Yes! Our age calculator supports calculating age between any two specific dates. You can calculate current age from birth date, age between two historical dates, or even project future ages. This is perfect for research, historical records, or planning purposes.",
    },
    {
      question: "What different age formats are available?",
      answer:
        "Our tool provides multiple age formats including years, months, and days; total days only; or detailed breakdowns. You can also calculate age in different units like weeks, hours, minutes, and even seconds for fun or scientific purposes. The results are displayed clearly and can be copied or exported.",
    },
    {
      question: "Why choose Toolspy over other free age calculators like AgeCalculator.net or BirthdayCalculator.com?",
      answer:
        "Toolspy offers professional-grade features like precise day-level calculations, client-side processing for privacy, multiple calculation types, and real-time results. Many competitors like AgeCalculator.net and BirthdayCalculator.com have limited accuracy, use server-based processing, or lack advanced features. Our tool provides better privacy protection, more accurate calculations, and superior functionality completely free.",
    },
    {
      question: "How fast is the age calculation?",
      answer:
        "Our age calculator provides instant results for any date calculation. Since all processing happens in your browser, there are no server delays or upload times. You can calculate ages for multiple dates in milliseconds, making it perfect for research, planning, or bulk calculations.",
    },
    {
      question: "Can I calculate future ages?",
      answer:
        "Yes! Our tool includes a future age calculator that can project your age at any future date. This is perfect for planning purposes, retirement calculations, or simply satisfying curiosity about how old you'll be on a specific date in the future.",
    },
    {
      question: "What are the different calculation types available?",
      answer:
        "Our tool offers four main calculation types: Current Age (from birth to today), Age Between Dates (any two dates), Future Age Calculator (projected age), and Age in Different Units (weeks, hours, etc.). Each type serves different purposes and provides precise, detailed results.",
    },
    {
      question: "Is it safe to use online age calculators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your birth dates and personal information are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based calculators, our tool provides complete privacy and security for your age calculations.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Precise Calculations",
      description:
        "Calculate age with precision down to the day, accounting for leap years and month variations.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Real-time age calculation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your birth dates never leave your device, providing maximum security.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Multiple Calculation Types",
      description:
        "Current age, age between dates, future age, and age in different time units.",
    },
  ];

  const keyBenefits = [
    "📅 Precise age calculation down to the day",
    "⚡ Instant calculation with no server delays or uploads",
    "🔒 Complete privacy protection - birth dates never leave your device",
    "📊 Multiple calculation types: current, between dates, future age",
    "🔧 Multiple output formats: years/months/days, total days, different units",
    "📊 Real-time calculation and display",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade age calculation algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Leap year and month length calculations",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Future age projection capabilities",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. AgeCalculator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Accurate: Day-level precision vs. basic calculation",
        "Multiple Types: Current, between dates, future vs. current only",
        "Multiple Formats: Years/months/days vs. years only",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. BirthdayCalculator.com",
      advantages: [
        "More Accurate: Precise calculation vs. approximate results",
        "Better Privacy: No data transmission vs. server-based",
        "Multiple Types: All calculation types vs. basic only",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Calculation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic calculation",
      ],
    },
    {
      title: "Toolspy vs. AgeFinder.com",
      advantages: [
        "More Accurate: Day-level precision vs. rounded results",
        "Better Privacy: Client-side vs. server-based processing",
        "Multiple Types: All types vs. limited calculation types",
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
        currentToolSlug="age-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other calculation and utility tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate Age – Professional & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional age calculator with precise day-level accuracy, instant processing, 
            and complete privacy protection. Perfect for personal records, legal documents, 
            and anyone needing accurate age calculations.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Age Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate accurate ages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Birth Date</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input the birth date or start date using our easy-to-use date picker. 
              The tool supports any date format and validates input automatically.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Choose Calculation Type</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your calculation type: current age, age between dates, 
              future age, or age in different time units.
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
              View your precise age calculation instantly. Copy results or 
              export in your preferred format for records.
            </p>
          </Card>
        </div>
      </section>

      {/* Calculation Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Calculation Types & Use Cases</h3>
          <p className="text-muted-foreground">
            Choose the right calculation type for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculationTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Precision:</strong> {type.precision}</div>
                <div><strong>Example:</strong> {type.example}</div>
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
            See how our age calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">AgeCalculator.net</th>
                    <th className="text-center p-4 font-semibold">BirthdayCalculator.com</th>
                    <th className="text-center p-4 font-semibold">AgeFinder.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.agecalculator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.birthdaycalculator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.agefinder}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Age Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make age calculation accurate and effortless
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
            See why users choose our age calculator
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
            Everything you need to know about age calculation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about age calculation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for age calculation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <User className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Personal Records</h4>
            <p className="text-sm text-muted-foreground">
              Calculate exact age for personal records, family history, and documentation
            </p>
          </Card>

          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Legal Documents</h4>
            <p className="text-sm text-muted-foreground">
              Precise age calculations for legal documents, contracts, and official records
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Research & Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Calculate age differences, historical records, and demographic research
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Planning & Projections</h4>
            <p className="text-sm text-muted-foreground">
              Project future ages for planning, retirement, and milestone tracking
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate Age?</h3>
        <p className="text-muted-foreground">
          Start using our professional age calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Age Calculator Now
        </Button>
      </section>
    </div>
  );
} 
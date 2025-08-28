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
  Receipt,
  Percent,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function TaxCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("tax-calculator");

  const comparisonData = [
    {
      feature: "Calculation Accuracy",
      toolspy: "✅ 100% accurate",
      turbotax: "✅ Accurate",
      hrblock: "✅ Accurate",
      taxact: "✅ Accurate",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      turbotax: "⚠️ Server-based",
      hrblock: "⚠️ Server-based",
      taxact: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      turbotax: "❌ Registration required",
      hrblock: "❌ Registration required",
      taxact: "❌ Registration required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      turbotax: "⚠️ Basic mobile",
      hrblock: "⚠️ Basic mobile",
      taxact: "⚠️ Basic mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Updates",
      toolspy: "✅ Instant calculations",
      turbotax: "⚠️ Delayed updates",
      hrblock: "⚠️ Delayed updates",
      taxact: "⚠️ Delayed updates",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      turbotax: "❌ Ad-heavy",
      hrblock: "❌ Ad-heavy",
      taxact: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
    {
      feature: "Detailed Breakdown",
      toolspy: "✅ Complete analysis",
      turbotax: "✅ Detailed",
      hrblock: "✅ Detailed",
      taxact: "✅ Detailed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Multiple Tax Types",
      toolspy: "✅ All tax types",
      turbotax: "✅ All tax types",
      hrblock: "✅ All tax types",
      taxact: "✅ All tax types",
      toolspyStatus: "excellent",
    },
  ];

  const calculationFeatures = [
    {
      type: "Federal Income Tax",
      description: "Calculate federal income tax with progressive brackets",
      features: "Tax brackets, marginal rates, effective rates, deductions",
      example: "Calculate tax for $75,000 annual income",
      useCase: "Tax planning, budgeting, financial analysis",
    },
    {
      type: "State Income Tax",
      description: "Calculate state income taxes for all 50 states",
      features: "State-specific rates, exemptions, deductions, credits",
      example: "Calculate California state tax for $60,000 income",
      useCase: "Multi-state residents, tax optimization, relocation planning",
    },
    {
      type: "FICA Taxes",
      description: "Calculate Social Security and Medicare taxes",
      features: "Social Security (6.2%), Medicare (1.45%), wage limits",
      example: "Calculate FICA taxes for $80,000 salary",
      useCase: "Payroll calculations, self-employment taxes, retirement planning",
    },
    {
      type: "Take-home Pay",
      description: "Calculate net income after all taxes",
      features: "Gross to net conversion, tax burden analysis, disposable income",
      example: "Calculate take-home pay for $100,000 salary",
      useCase: "Budgeting, salary negotiations, financial planning",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's tax calculator completely free to use?",
      answer:
        "Yes, our professional tax calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can calculate taxes for unlimited scenarios without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all calculation capabilities free of charge.",
    },
    {
      question: "How accurate are the tax calculations?",
      answer:
        "Our tax calculator provides 100% accurate calculations based on current federal and state tax laws. The tool uses the latest tax brackets, rates, and regulations to ensure precise calculations. All calculations are performed using official IRS and state tax authority guidelines.",
    },
    {
      question: "How secure is the tax calculation process?",
      answer:
        "Absolutely secure! Our tax calculator uses client-side processing, meaning your financial information is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive tax data never leaves your device, making it safer than server-based tax tools.",
    },
    {
      question: "What types of taxes does the calculator include?",
      answer:
        "Our tax calculator includes federal income tax, state income tax (all 50 states), Social Security tax (6.2%), Medicare tax (1.45%), and provides detailed breakdowns of tax brackets, marginal rates, effective rates, and take-home pay calculations.",
    },
    {
      question: "How do tax brackets work?",
      answer:
        "Tax brackets use a progressive system where different portions of your income are taxed at different rates. For example, if you earn $75,000, the first portion is taxed at 10%, the next portion at 12%, and so on. Our calculator shows you exactly how much tax you pay in each bracket.",
    },
    {
      question: "Why choose Toolspy over other tax calculators like TurboTax or H&R Block?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate calculations, client-side processing for privacy, real-time updates, and detailed tax breakdowns. Many competitors like TurboTax and H&R Block require registration, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast are the tax calculations?",
      answer:
        "Our tax calculator provides instant calculations for any income scenario. Since all processing happens in your browser, there are no server delays or upload times. You can calculate taxes for multiple scenarios quickly, making it perfect for tax planning and financial analysis.",
    },
    {
      question: "What's the difference between marginal and effective tax rates?",
      answer:
        "Marginal tax rate is the rate on your last dollar of income (your highest tax bracket). Effective tax rate is your total tax divided by total income (your average tax rate). Our calculator shows both rates to help you understand your true tax burden.",
    },
    {
      question: "Can I calculate taxes for different filing statuses?",
      answer:
        "Yes! You can calculate taxes for different filing statuses including Single, Married Filing Jointly, Married Filing Separately, and Head of Household. Each status has different tax brackets and standard deductions.",
    },
    {
      question: "Is it safe to use online tax calculators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your financial information is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based calculators, our tool provides complete privacy and security for your tax calculations.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Accurate Calculations",
      description:
        "100% accurate tax calculations based on current federal and state tax laws.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get tax calculations instantly with no server delays or processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your financial data never leaves your device.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Breakdown",
      description:
        "See tax brackets, marginal rates, effective rates, and take-home pay analysis.",
    },
  ];

  const keyBenefits = [
    "💰 100% accurate tax calculations",
    "⚡ Instant calculations with no delays",
    "🔒 Complete privacy protection - data never leaves your device",
    "📱 Mobile-friendly responsive design",
    "📊 Detailed tax breakdown and analysis",
    "🏛️ Federal and state tax calculations",
    "🎯 Professional-grade calculation accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Real-time tax bracket analysis",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📋 Multiple filing status support",
    "💵 FICA tax calculations included",
    "📊 Take-home pay analysis",
    "🎯 Marginal vs effective tax rate comparison",
    "📱 Cross-platform compatibility",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. TurboTax",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "No Registration: Free forever vs. registration required",
        "Higher Accuracy: 100% accurate vs. variable accuracy",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
        "Instant Results: Real-time vs. delayed calculations",
      ],
    },
    {
      title: "Toolspy vs. H&R Block",
      advantages: [
        "Higher Accuracy: 100% accurate vs. variable accuracy",
        "Better Privacy: No data transmission vs. server-based",
        "No Registration: Free forever vs. registration required",
        "Faster Processing: Instant vs. delayed calculations",
        "Mobile Friendly: Responsive design vs. basic mobile",
        "Professional Features: Advanced options vs. basic calculations",
      ],
    },
    {
      title: "Toolspy vs. TaxAct",
      advantages: [
        "Better Accuracy: 100% accurate vs. basic accuracy",
        "Better Privacy: Client-side vs. server-based processing",
        "No Registration: Free forever vs. registration required",
        "Real-time Updates: Instant vs. delayed calculations",
        "Better Mobile: Responsive design vs. basic mobile",
        "Clean Interface: No ads vs. ad-heavy interface",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="tax-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other financial calculators."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Professional Tax Calculator – 100% Accurate & Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Calculate federal and state income taxes with detailed breakdowns, privacy protection, 
            and instant results. Perfect for tax planning, budgeting, 
            and anyone needing accurate tax calculations.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Tax Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate your taxes accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Income</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your annual income and select your filing status. 
              The calculator supports all major filing statuses.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Calculate Taxes</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Click calculate and get instant results with detailed 
              breakdowns of all tax components.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Review Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Review your tax breakdown, take-home pay, and 
              effective tax rates. Fast, secure, and accurate.
            </p>
          </Card>
        </div>
      </section>

      {/* Calculation Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Tax Calculation Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional calculation methods for all your tax planning needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculationFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Calculator className="h-5 w-5 mr-2 text-primary" />
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
            See how our tax calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">TurboTax</th>
                    <th className="text-center p-4 font-semibold">H&R Block</th>
                    <th className="text-center p-4 font-semibold">TaxAct</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.turbotax}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.hrblock}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.taxact}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Tax Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make tax calculation fast and accurate
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
            See why professionals choose our tax calculator
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
            Everything you need to know about tax calculations
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about tax calculations"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for tax calculations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Receipt className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Tax Planning</h4>
            <p className="text-sm text-muted-foreground">
              Plan your taxes and estimate your tax liability
            </p>
          </Card>

          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Budgeting</h4>
            <p className="text-sm text-muted-foreground">
              Calculate take-home pay for budgeting purposes
            </p>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Financial Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Analyze tax burden and effective tax rates
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUpIcon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Salary Negotiations</h4>
            <p className="text-sm text-muted-foreground">
              Compare gross vs net income for negotiations
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate Your Taxes?</h3>
        <p className="text-muted-foreground">
          Start using our professional tax calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Tax Calculator Now
        </Button>
      </section>
    </div>
  );
} 
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
  CreditCard,
  Building,
  Car,
  Home,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function EMICalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("emi-calculator");

  const comparisonData = [
    {
      feature: "Calculation Accuracy",
      toolspy: "Bank-level precision",
      emicalculator: "Basic calculation",
      loanemi: "Limited accuracy",
      paymentcalculator: "Approximate only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Calculation Speed",
      toolspy: "Instant calculation",
      emicalculator: "Server delays",
      loanemi: "Slow processing",
      paymentcalculator: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      emicalculator: "⚠️ Server-based",
      loanemi: "⚠️ Server-based",
      paymentcalculator: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Loan Types",
      toolspy: "✅ All loan types",
      emicalculator: "⚠️ Limited types",
      loanemi: "❌ Basic types only",
      paymentcalculator: "⚠️ Basic types",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      emicalculator: "✅ Free",
      loanemi: "✅ Free",
      paymentcalculator: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      emicalculator: "⚠️ Copy only",
      loanemi: "❌ No export",
      paymentcalculator: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Amortization Schedule",
      toolspy: "✅ Full schedule",
      emicalculator: "❌ No schedule",
      loanemi: "⚠️ Basic schedule",
      paymentcalculator: "❌ No schedule",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      emicalculator: "❌ Ad-heavy",
      loanemi: "❌ Ad-heavy",
      paymentcalculator: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const emiTypes = [
    {
      type: "Home Loan EMI",
      description: "Monthly payments for home financing",
      useCase: "Home purchase, construction, renovation",
      features: "Long terms, tax benefits, property security",
      example: "₹50,00,000 at 8.5% for 20 years",
    },
    {
      type: "Car Loan EMI",
      description: "Monthly payments for vehicle financing",
      useCase: "Car, bike, commercial vehicle purchase",
      features: "Shorter terms, vehicle as collateral",
      example: "₹8,00,000 at 10% for 5 years",
    },
    {
      type: "Personal Loan EMI",
      description: "Monthly payments for personal expenses",
      useCase: "Medical expenses, education, travel, debt consolidation",
      features: "Unsecured, higher rates, quick approval",
      example: "₹5,00,000 at 12% for 3 years",
    },
    {
      type: "Business Loan EMI",
      description: "Monthly payments for business financing",
      useCase: "Equipment, expansion, working capital",
      features: "Business credit, collateral options",
      example: "₹20,00,000 at 15% for 7 years",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's EMI calculator completely free to use?",
      answer:
        "Yes, our professional EMI calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can calculate EMI for any loan type unlimited times without any restrictions. Unlike many competitors who have calculation limits or require paid subscriptions for advanced features, Toolspy provides all EMI calculation capabilities free of charge.",
    },
    {
      question: "How accurate is the EMI calculation?",
      answer:
        "Our EMI calculator uses bank-level precision algorithms that provide accurate monthly payment calculations, total interest costs, and complete amortization schedules. The calculations account for principal, interest rate, loan term, and payment frequency to give you precise results that match what financial institutions would provide.",
    },
    {
      question: "How secure is the EMI calculation process?",
      answer:
        "Absolutely secure! Our EMI calculator uses client-side processing, meaning your loan details and financial information are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive financial data never leaves your device, making it safer than server-based calculators.",
    },
    {
      question: "What types of loans can I calculate EMI for?",
      answer:
        "Our EMI calculator supports all major loan types including home loans, car loans, personal loans, business loans, education loans, and more. You can calculate EMI for fixed-rate loans, floating-rate loans, and loans with different payment frequencies (monthly, quarterly, yearly). The tool provides detailed breakdowns for each loan type.",
    },
    {
      question: "Can I see the complete EMI breakdown and amortization schedule?",
      answer:
        "Yes! Our EMI calculator provides a complete amortization schedule showing each payment breakdown, including principal, interest, remaining balance, and total interest paid. You can view the full schedule, export it in multiple formats, or focus on specific payment periods to understand how your EMI payments are applied over time.",
    },
    {
      question: "Why choose Toolspy over other free EMI calculators like EMICalculator.net or LoanEMI.com?",
      answer:
        "Toolspy offers professional-grade features like bank-level precision calculations, client-side processing for privacy, complete amortization schedules, and support for all loan types. Many competitors like EMICalculator.net and LoanEMI.com have basic calculations, use server-based processing, or lack comprehensive features. Our tool provides better privacy protection, more accurate calculations, and superior functionality completely free.",
    },
    {
      question: "How fast is the EMI calculation?",
      answer:
        "Our EMI calculator provides instant results for any loan scenario. Since all processing happens in your browser, there are no server delays or upload times. You can calculate multiple EMI scenarios in milliseconds, making it perfect for comparing different loan options, rates, or terms.",
    },
    {
      question: "Can I compare different EMI scenarios?",
      answer:
        "Yes! Our tool allows you to easily compare different EMI scenarios by adjusting loan amount, interest rate, term length, or payment frequency. You can see how changes affect your monthly EMI, total interest cost, and loan duration. This helps you make informed decisions about loan terms and refinancing options.",
    },
    {
      question: "What information do I need to calculate EMI?",
      answer:
        "To calculate EMI, you need the loan amount (principal), annual interest rate, loan term (in years), and payment frequency (usually monthly). Our calculator automatically handles the math and provides detailed results including monthly EMI, total interest, total cost, and complete amortization schedule.",
    },
    {
      question: "Is it safe to use online EMI calculators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your loan details and financial information are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based calculators, our tool provides complete privacy and security for your financial calculations.",
    },
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Bank-Level Precision",
      description:
        "Accurate EMI calculations with professional-grade algorithms and complete amortization schedules.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Real-time EMI calculation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your financial data never leaves your device, providing maximum security.",
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "All Loan Types",
      description:
        "Support for home, car, personal, business, and other loan types with detailed breakdowns.",
    },
  ];

  const keyBenefits = [
    "💰 Bank-level precision EMI calculations",
    "⚡ Instant calculation with no server delays or uploads",
    "🔒 Complete privacy protection - financial data never leaves your device",
    "📊 All loan types: home, car, personal, business loans",
    "🔧 Complete amortization schedules and payment breakdowns",
    "📊 Real-time calculation and comparison tools",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade financial calculation algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Detailed payment breakdowns and interest analysis",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 EMI comparison and scenario analysis tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. EMICalculator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Accurate: Bank-level precision vs. basic calculation",
        "All Loan Types: Complete support vs. limited types",
        "Amortization Schedule: Full schedule vs. no schedule",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. LoanEMI.com",
      advantages: [
        "More Loan Types: All types vs. basic types only",
        "Better Privacy: No data transmission vs. server-based",
        "More Accurate: Bank-level vs. limited accuracy",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Calculation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic calculation",
      ],
    },
    {
      title: "Toolspy vs. PaymentCalculator.com",
      advantages: [
        "More Accurate: Bank-level precision vs. approximate calculation",
        "Better Privacy: Client-side vs. server-based processing",
        "All Loan Types: Complete support vs. basic types",
        "Amortization Schedule: Full schedule vs. no schedule",
        "Export Options: Multiple formats vs. basic export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="emi-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other financial and calculation tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate EMI – Professional & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional EMI calculator with bank-level precision, instant processing, 
            and complete privacy protection. Perfect for borrowers, lenders, and anyone 
            needing accurate monthly installment calculations.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our EMI Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate EMI accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Loan Details</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input loan amount, interest rate, term length, and payment frequency. 
              The tool supports all major loan types and payment schedules.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Get EMI Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View your monthly EMI, total interest, and complete cost breakdown 
              instantly with professional-grade accuracy.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Review Schedule</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Access complete amortization schedule showing each EMI breakdown 
              and remaining balance throughout the loan term.
            </p>
          </Card>
        </div>
      </section>

      {/* EMI Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">EMI Types & Applications</h3>
          <p className="text-muted-foreground">
            Calculate EMI for any type of loan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emiTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Features:</strong> {type.features}</div>
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
            See how our EMI calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">EMICalculator.net</th>
                    <th className="text-center p-4 font-semibold">LoanEMI.com</th>
                    <th className="text-center p-4 font-semibold">PaymentCalculator.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.emicalculator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.loanemi}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.paymentcalculator}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's EMI Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make EMI calculation accurate and insightful
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
            See why financial professionals choose our EMI calculator
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
            Everything you need to know about EMI calculation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about EMI calculation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for EMI calculation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Home className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Home Loan Planning</h4>
            <p className="text-sm text-muted-foreground">
              Calculate home loan EMI to plan your housing finance and budget accordingly
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Car className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Vehicle Financing</h4>
            <p className="text-sm text-muted-foreground">
              Calculate car and bike loan EMI to understand vehicle financing costs
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Building className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Business Loans</h4>
            <p className="text-sm text-muted-foreground">
              Calculate business loan EMI for equipment, expansion, or working capital
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Financial Planning</h4>
            <p className="text-sm text-muted-foreground">
              Plan monthly budgets by understanding EMI obligations and total loan costs
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate EMI?</h3>
        <p className="text-muted-foreground">
          Start using our professional EMI calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try EMI Calculator Now
        </Button>
      </section>
    </div>
  );
}

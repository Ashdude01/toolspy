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
  Target,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

export function MortgageCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "PMI Calculations",
      toolspy: "✅ Automatic PMI",
      bankrate: "✅ Basic PMI",
      zillow: "✅ PMI included",
      quicken: "❌ Manual entry",
      toolspyStatus: "excellent",
    },
    {
      feature: "Amortization Schedule",
      toolspy: "✅ Detailed breakdown",
      bankrate: "✅ Monthly view",
      zillow: "❌ Basic",
      quicken: "✅ Full schedule",
      toolspyStatus: "excellent",
    },
    {
      feature: "Affordability Analysis",
      toolspy: "✅ Complete analysis",
      bankrate: "✅ Basic check",
      zillow: "❌ Limited",
      quicken: "❌ None",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      bankrate: "❌ Data tracking",
      zillow: "❌ Lead generation",
      quicken: "❌ Marketing calls",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      bankrate: "❌ Account suggested",
      zillow: "❌ Registration required",
      quicken: "❌ Contact required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Experience",
      toolspy: "✅ Responsive design",
      bankrate: "✅ Mobile app",
      zillow: "✅ Mobile optimized",
      quicken: "❌ Desktop focused",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Results",
      description: "Get accurate mortgage payments and affordability analysis instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Complete Analysis",
      description: "PMI, taxes, insurance, and total monthly payment breakdown",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your financial information never leaves your device",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Detailed Reports",
      description: "Full amortization schedule and payment breakdown",
    },
  ];

  const faqs = [
    {
      question: "How much house can I afford?",
      answer: "Generally, lenders recommend spending no more than 28% of gross monthly income on housing expenses. Our calculator shows affordability based on your income, debts, and down payment amount."
    },
    {
      question: "What is PMI and when do I pay it?",
      answer: "Private Mortgage Insurance (PMI) is required when you put down less than 20%. It protects the lender if you default. PMI can be removed once you reach 20% equity in your home."
    },
    {
      question: "How does my down payment affect my mortgage?",
      answer: "A larger down payment reduces your loan amount, monthly payments, and may eliminate PMI. However, it ties up cash that could be invested elsewhere. Our calculator shows the impact of different down payment amounts."
    },
    {
      question: "What's included in my monthly mortgage payment?",
      answer: "Your monthly payment includes principal, interest, property taxes, homeowner's insurance, and PMI if applicable. This is often called PITI (Principal, Interest, Taxes, Insurance)."
    },
    {
      question: "Should I choose a 15-year or 30-year mortgage?",
      answer: "15-year mortgages have higher monthly payments but lower total interest costs. 30-year mortgages have lower monthly payments but higher total interest. Consider your budget and financial goals."
    },
    {
      question: "How do interest rates affect my payment?",
      answer: "Even small changes in interest rates significantly impact your monthly payment and total loan cost. A 1% rate increase can add hundreds to your monthly payment and tens of thousands over the loan term."
    },
    {
      question: "What credit score do I need for a mortgage?",
      answer: "Most lenders require a minimum credit score of 620 for conventional loans. Higher scores get better interest rates. FHA loans may accept scores as low as 580 with higher down payments."
    },
    {
      question: "How much should I save for closing costs?",
      answer: "Closing costs typically range from 2-5% of the home's purchase price. These include appraisal fees, title insurance, attorney fees, and other transaction costs."
    },
    {
      question: "Can I pay extra toward my mortgage principal?",
      answer: "Yes! Extra principal payments reduce the loan balance faster and save thousands in interest. Our calculator can show the impact of additional payments on your loan term and total cost."
    },
    {
      question: "When should I refinance my mortgage?",
      answer: "Consider refinancing when rates drop significantly (typically 0.5-1% below your current rate), when your credit improves, or when you want to change loan terms. Factor in closing costs when deciding."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Mortgage Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate mortgage payments, affordability, and get detailed amortization schedules. 
            Include PMI, taxes, and insurance for accurate monthly payment estimates.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Why Choose Toolspy's Mortgage Calculator?
          </CardTitle>
          <CardDescription className="text-center">
            Compare our comprehensive features with other mortgage calculators
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-center p-3 font-semibold text-blue-600">
                  Toolspy
                </th>
                <th className="text-center p-3 font-semibold">Bankrate</th>
                <th className="text-center p-3 font-semibold">Zillow</th>
                <th className="text-center p-3 font-semibold">Quicken</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.feature}</td>
                  <td className="p-3 text-center">
                    <Badge
                      variant={
                        row.toolspyStatus === "excellent"
                          ? "default"
                          : row.toolspyStatus === "good"
                          ? "secondary"
                          : "outline"
                      }
                      className="whitespace-nowrap"
                    >
                      {row.toolspy}
                    </Badge>
                  </td>
                  <td className="p-3 text-center text-gray-600">{row.bankrate}</td>
                  <td className="p-3 text-center text-gray-600">{row.zillow}</td>
                  <td className="p-3 text-center text-gray-600">{row.quicken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Benefits of Mortgage Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Budget Planning</h4>
                  <p className="text-gray-600 text-sm">
                    Know exactly what you can afford before house hunting
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Interest Savings</h4>
                  <p className="text-gray-600 text-sm">
                    Compare scenarios to minimize total interest paid
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">PMI Optimization</h4>
                  <p className="text-gray-600 text-sm">
                    Understand when you can remove PMI to save money
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Payment Strategy</h4>
                  <p className="text-gray-600 text-sm">
                    See the impact of extra payments on loan payoff
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Rate Comparison</h4>
                  <p className="text-gray-600 text-sm">
                    Compare different interest rates and loan terms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Complete Picture</h4>
                  <p className="text-gray-600 text-sm">
                    Include all costs: taxes, insurance, and PMI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-center">
            Common questions about mortgage calculations and home buying
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
                {selectedFaq === index && (
                  <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your Mortgage?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get instant mortgage calculations with detailed breakdowns. 
            Plan your home purchase with confidence using our comprehensive calculator.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Calculate My Mortgage Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
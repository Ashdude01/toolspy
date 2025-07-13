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
} from "lucide-react";

export function InvestmentCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Compound Interest",
      toolspy: "✅ Advanced formulas",
      calculator: "✅ Basic calculation",
      investor: "✅ Limited options",
      bankrate: "✅ Basic formulas",
      toolspyStatus: "excellent",
    },
    {
      feature: "Goal Planning",
      toolspy: "✅ Complete analysis",
      calculator: "❌ None",
      investor: "✅ Basic",
      bankrate: "❌ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Detailed Reports",
      toolspy: "✅ Year-by-year breakdown",
      calculator: "❌ Basic results",
      investor: "✅ Limited details",
      bankrate: "❌ Summary only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      calculator: "❌ Data tracking",
      investor: "❌ Account required",
      bankrate: "❌ Ads & tracking",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      calculator: "✅ Free",
      investor: "❌ Account required",
      bankrate: "❌ Registration needed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      calculator: "✅ Basic mobile",
      investor: "❌ Desktop only",
      bankrate: "✅ Mobile app",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Compound Interest",
      description: "Calculate compound growth with precise mathematical formulas",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Goal Planning",
      description: "Set financial goals and see exactly how to achieve them",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your financial data never leaves your device",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Detailed Analysis",
      description: "Get year-by-year breakdowns and projections",
    },
  ];

  const faqs = [
    {
      question: "How does compound interest work?",
      answer: "Compound interest is earning interest on both your principal investment and previously earned interest. It's the most powerful force in investing, allowing your money to grow exponentially over time."
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Compound interest grows much faster over time."
    },
    {
      question: "How often should I contribute to my investments?",
      answer: "Regular contributions (monthly or quarterly) through dollar-cost averaging can reduce risk and potentially increase returns. Our calculator shows the impact of different contribution frequencies."
    },
    {
      question: "What's a realistic rate of return for investments?",
      answer: "Historical stock market returns average 7-10% annually before inflation. However, returns vary significantly year-to-year. Conservative estimates use 6-8% for long-term planning."
    },
    {
      question: "How much should I invest each month?",
      answer: "A common rule is to invest 10-20% of your income. Our calculator can help you determine the monthly amount needed to reach your financial goals."
    },
    {
      question: "When should I start investing?",
      answer: "The best time to start investing is as early as possible. Thanks to compound interest, starting even a few years earlier can result in significantly more wealth over time."
    },
    {
      question: "What if I can't invest the full amount every month?",
      answer: "Any amount helps! Our calculator shows how different contribution levels affect your goals. Even small, consistent investments can grow substantially over time."
    },
    {
      question: "How does inflation affect my investments?",
      answer: "Inflation reduces purchasing power over time. While our calculator shows nominal returns, consider that a 7% return with 3% inflation provides 4% real growth in purchasing power."
    },
    {
      question: "Should I include employer 401(k) matching?",
      answer: "Absolutely! Employer matching is free money and provides immediate 100% return. Include it in your total investment calculations for accurate projections."
    },
    {
      question: "Is this calculator accurate for retirement planning?",
      answer: "Our calculator provides accurate projections based on your inputs. However, consult with a financial advisor for comprehensive retirement planning considering taxes, healthcare, and other factors."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Investment Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate compound interest, plan financial goals, and visualize your investment growth. 
            Get detailed year-by-year projections with our advanced calculator.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-green-600">
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
            Why Choose Toolspy's Investment Calculator?
          </CardTitle>
          <CardDescription className="text-center">
            Compare our advanced features with other investment calculators
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-center p-3 font-semibold text-green-600">
                  Toolspy
                </th>
                <th className="text-center p-3 font-semibold">Calculator.net</th>
                <th className="text-center p-3 font-semibold">Investor.gov</th>
                <th className="text-center p-3 font-semibold">Bankrate</th>
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
                  <td className="p-3 text-center text-gray-600">{row.calculator}</td>
                  <td className="p-3 text-center text-gray-600">{row.investor}</td>
                  <td className="p-3 text-center text-gray-600">{row.bankrate}</td>
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
            Benefits of Investment Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Compound Growth</h4>
                  <p className="text-gray-600 text-sm">
                    Harness the power of compound interest to grow your wealth exponentially
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Goal Achievement</h4>
                  <p className="text-gray-600 text-sm">
                    Set clear financial goals and create actionable plans to achieve them
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Risk Management</h4>
                  <p className="text-gray-600 text-sm">
                    Understand how different scenarios affect your investment outcomes
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Time Optimization</h4>
                  <p className="text-gray-600 text-sm">
                    Discover the optimal investment timeline for your financial goals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Contribution Strategy</h4>
                  <p className="text-gray-600 text-sm">
                    Find the right balance between lump sum and regular contributions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Financial Independence</h4>
                  <p className="text-gray-600 text-sm">
                    Plan your path to financial freedom with precise calculations
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
            Common questions about investment calculations and planning
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
      <Card className="bg-green-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Start Planning Your Financial Future
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our advanced investment calculator to create a personalized plan for your financial goals. 
            See how compound interest can work for you.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Calculate Your Investment Growth
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
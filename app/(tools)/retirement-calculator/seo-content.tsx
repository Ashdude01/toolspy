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

export function RetirementCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Retirement Income Needs",
      toolspy: "✅ Detailed analysis",
      fidelity: "✅ Basic calculation",
      vanguard: "✅ Standard formula",
      schwab: "✅ Basic estimate",
      toolspyStatus: "excellent",
    },
    {
      feature: "Savings Projections",
      toolspy: "✅ Year-by-year breakdown",
      fidelity: "✅ Final amount only",
      vanguard: "❌ Basic projection",
      schwab: "✅ Limited details",
      toolspyStatus: "excellent",
    },
    {
      feature: "Goal Planning",
      toolspy: "✅ Multiple scenarios",
      fidelity: "❌ Single calculation",
      vanguard: "❌ Basic planning",
      schwab: "❌ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      fidelity: "❌ Account tracking",
      vanguard: "❌ Data collection",
      schwab: "❌ Lead generation",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      fidelity: "❌ Account required",
      vanguard: "❌ Registration needed",
      schwab: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      fidelity: "✅ Mobile app",
      vanguard: "✅ Mobile optimized",
      schwab: "✅ Mobile app",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Retirement Goals",
      description: "Set realistic retirement income goals based on your lifestyle",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Analysis",
      description: "Get immediate feedback on your retirement savings progress",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your retirement planning data stays completely private",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Detailed Reports",
      description: "Year-by-year projections and contribution recommendations",
    },
  ];

  const faqs = [
    {
      question: "How much do I need to save for retirement?",
      answer: "A common rule is to save 10-15% of your income for retirement. However, the exact amount depends on your desired lifestyle, current age, and retirement timeline. Our calculator helps determine your specific savings needs."
    },
    {
      question: "What's the 4% rule for retirement?",
      answer: "The 4% rule suggests you can withdraw 4% of your retirement savings annually without running out of money. This means you need 25 times your annual expenses saved. Our calculator uses this and other methods to estimate your needs."
    },
    {
      question: "When should I start saving for retirement?",
      answer: "The earlier you start, the better! Thanks to compound interest, starting in your 20s requires much less monthly savings than starting in your 40s. Even small amounts can grow significantly over time."
    },
    {
      question: "How much will I need in retirement?",
      answer: "Most experts recommend planning for 70-90% of your pre-retirement income. However, your specific needs depend on your lifestyle, healthcare costs, and other factors. Our calculator helps you plan for your unique situation."
    },
    {
      question: "What about Social Security and pensions?",
      answer: "Social Security and pensions can provide significant retirement income. However, don't rely on them entirely. Our calculator can factor in these sources to show how much additional savings you need."
    },
    {
      question: "Should I prioritize 401(k) or IRA contributions?",
      answer: "If your employer offers 401(k) matching, contribute enough to get the full match first. Then consider maxing out an IRA for more investment options. Return to your 401(k) for additional tax-advantaged savings."
    },
    {
      question: "How does inflation affect retirement planning?",
      answer: "Inflation reduces purchasing power over time. Our calculator accounts for inflation to show real purchasing power. Plan for 2-3% annual inflation when estimating future retirement needs."
    },
    {
      question: "What if I'm behind on retirement savings?",
      answer: "Don't panic! You can catch up with higher contributions, delayed retirement, or reduced expenses. Those 50+ can make additional 'catch-up' contributions to 401(k)s and IRAs. Our calculator shows various scenarios."
    },
    {
      question: "How do I handle market volatility in retirement?",
      answer: "Diversification and proper asset allocation are key. Consider having 3-6 months of expenses in cash, bonds for stability, and stocks for growth. Rebalance regularly and avoid panic selling during market downturns."
    },
    {
      question: "Should I pay off debt before saving for retirement?",
      answer: "Pay off high-interest debt first, but don't delay retirement savings entirely. At minimum, contribute enough to get employer matching. Balance debt payoff with retirement savings based on interest rates and tax benefits."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Retirement Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your retirement with confidence. Calculate savings needs, track progress, 
            and get personalized recommendations for a secure retirement future.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-purple-600">
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
            Why Choose Toolspy's Retirement Calculator?
          </CardTitle>
          <CardDescription className="text-center">
            Compare our comprehensive features with other retirement planning tools
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-center p-3 font-semibold text-purple-600">
                  Toolspy
                </th>
                <th className="text-center p-3 font-semibold">Fidelity</th>
                <th className="text-center p-3 font-semibold">Vanguard</th>
                <th className="text-center p-3 font-semibold">Schwab</th>
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
                  <td className="p-3 text-center text-gray-600">{row.fidelity}</td>
                  <td className="p-3 text-center text-gray-600">{row.vanguard}</td>
                  <td className="p-3 text-center text-gray-600">{row.schwab}</td>
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
            Benefits of Retirement Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Financial Security</h4>
                  <p className="text-gray-600 text-sm">
                    Ensure you have enough money to maintain your lifestyle in retirement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Peace of Mind</h4>
                  <p className="text-gray-600 text-sm">
                    Know exactly where you stand and what you need to save
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Tax Advantages</h4>
                  <p className="text-gray-600 text-sm">
                    Maximize tax-advantaged retirement accounts and reduce current taxes
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Compound Growth</h4>
                  <p className="text-gray-600 text-sm">
                    Harness the power of compound interest over long time periods
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Flexibility</h4>
                  <p className="text-gray-600 text-sm">
                    Adjust your plan as your income and goals change over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Early Retirement</h4>
                  <p className="text-gray-600 text-sm">
                    Plan for early retirement or financial independence if desired
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
            Common questions about retirement planning and calculations
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
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Start Planning Your Retirement Today
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our comprehensive retirement calculator to create a personalized plan. 
            See if you're on track and get specific recommendations for your situation.
          </p>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Plan My Retirement
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
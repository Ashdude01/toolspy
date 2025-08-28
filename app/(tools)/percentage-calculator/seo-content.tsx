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
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function PercentageCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("percentage-calculator");

  const comparisonData = [
    {
      feature: "Calculation Types",
      toolspy: "✅ All types",
      calculatornet: "⚠️ Basic only",
      omnicalculator: "✅ Most types",
      rapidtables: "❌ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Results",
      toolspy: "✅ Instant updates",
      calculatornet: "❌ Manual submit",
      omnicalculator: "✅ Instant updates",
      rapidtables: "❌ Manual submit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Step-by-step Solutions",
      toolspy: "✅ Detailed explanations",
      calculatornet: "❌ No explanations",
      omnicalculator: "⚠️ Basic steps",
      rapidtables: "❌ No explanations",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      calculatornet: "⚠️ Server-based",
      omnicalculator: "⚠️ Server-based",
      rapidtables: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      calculatornet: "✅ Free",
      omnicalculator: "✅ Free",
      rapidtables: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      calculatornet: "⚠️ Basic mobile",
      omnicalculator: "✅ Responsive",
      rapidtables: "❌ Desktop only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Advanced Features",
      toolspy: "✅ Multiple calculations",
      calculatornet: "❌ Single calculation",
      omnicalculator: "✅ Multiple calculations",
      rapidtables: "❌ Single calculation",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      calculatornet: "❌ Ad-heavy",
      omnicalculator: "⚠️ Some ads",
      rapidtables: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const calculationTypes = [
    {
      type: "Basic Percentage",
      description: "Calculate percentage of a number",
      formula: "Result = (Percentage × Number) ÷ 100",
      example: "25% of 200 = 50",
      useCase: "Discounts, tips, proportions",
    },
    {
      type: "Percentage Increase",
      description: "Calculate percentage increase between values",
      formula: "Increase % = ((New - Old) ÷ Old) × 100",
      example: "50 to 75 = 50% increase",
      useCase: "Growth rates, price increases",
    },
    {
      type: "Percentage Decrease",
      description: "Calculate percentage decrease between values",
      formula: "Decrease % = ((Old - New) ÷ Old) × 100",
      example: "100 to 80 = 20% decrease",
      useCase: "Discounts, losses, reductions",
    },
    {
      type: "Percentage Difference",
      description: "Calculate percentage difference between two values",
      formula: "Difference % = |A - B| ÷ ((A + B) ÷ 2) × 100",
      example: "80 vs 120 = 40% difference",
      useCase: "Comparisons, variations",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's percentage calculator completely free to use?",
      answer:
        "Yes, our professional percentage calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can perform unlimited percentage calculations without any restrictions. Unlike many competitors who have limited features or require paid subscriptions for advanced calculations, Toolspy provides all percentage calculation capabilities free of charge.",
    },
    {
      question: "What types of percentage calculations can I perform?",
      answer:
        "Our calculator supports all major percentage calculations including basic percentage of a number, percentage increase/decrease, percentage difference, reverse percentage, compound percentage, and more. You can calculate discounts, tips, growth rates, price changes, and any other percentage-based scenarios. Each calculation includes step-by-step explanations for better understanding.",
    },
    {
      question: "How accurate are the percentage calculations?",
      answer:
        "Our percentage calculator uses precise mathematical algorithms to ensure 100% accuracy. All calculations are performed with high precision floating-point arithmetic, and results are displayed with appropriate decimal places. The tool also provides step-by-step solutions so you can verify the calculations manually if needed.",
    },
    {
      question: "Can I calculate percentage increases and decreases?",
      answer:
        "Yes! Our calculator handles both percentage increases and decreases with detailed explanations. For increases, it shows how much a value has grown from the original. For decreases, it shows how much a value has reduced from the original. The tool automatically detects whether you're calculating an increase or decrease based on your input values.",
    },
    {
      question: "How do I calculate percentage difference between two values?",
      answer:
        "Our percentage difference calculator uses the standard formula that compares the absolute difference between two values relative to their average. This gives you a fair comparison regardless of which value is larger. The tool provides the formula used and step-by-step calculation process for transparency.",
    },
    {
      question: "Why choose Toolspy over other free percentage calculators like Calculator.net or OmniCalculator?",
      answer:
        "Toolspy offers professional-grade features like real-time calculations, step-by-step solutions, multiple calculation types, and client-side processing for privacy. Many competitors like Calculator.net and OmniCalculator lack these advanced features or have ad-heavy interfaces. Our tool provides better user experience, more calculation options, and superior privacy protection completely free.",
    },
    {
      question: "Can I use the calculator for financial calculations like discounts and taxes?",
      answer:
        "Absolutely! Our percentage calculator is perfect for financial calculations including discounts, sales tax, tips, interest rates, and price changes. The tool provides clear results and explanations, making it ideal for business use, personal finance, and educational purposes. You can calculate final prices after discounts, determine tip amounts, and analyze price changes over time.",
    },
    {
      question: "How does the reverse percentage calculation work?",
      answer:
        "Reverse percentage calculations help you find the original value when you know the final value and the percentage change. For example, if you know a price increased by 20% to $120, the reverse calculation will show you the original price was $100. This is useful for understanding original values after discounts, markups, or other percentage changes.",
    },
    {
      question: "Can I calculate compound percentage changes?",
      answer:
        "Yes! Our calculator supports compound percentage calculations for scenarios where multiple percentage changes occur sequentially. This is useful for calculating cumulative effects of multiple discounts, compound interest scenarios, or sequential price changes. The tool shows each step of the calculation process for complete transparency.",
    },
    {
      question: "Is the calculator suitable for educational use?",
      answer:
        "Perfectly! Our percentage calculator is ideal for students learning about percentages, teachers demonstrating mathematical concepts, and anyone wanting to understand percentage calculations. The step-by-step solutions and detailed explanations make it an excellent educational tool. It's also great for homework help and exam preparation.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "All Calculation Types",
      description:
        "Support for basic percentages, increases, decreases, differences, reverse calculations, and compound percentages.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Results",
      description:
        "Instant calculations with live updates as you type, providing immediate feedback and results.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your calculations never leave your device, providing maximum privacy.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Step-by-step Solutions",
      description:
        "Detailed explanations and formulas for each calculation, helping you understand the process.",
    },
  ];

  const keyBenefits = [
    "🧮 All percentage calculation types in one tool",
    "⚡ Real-time calculations with instant results",
    "🔒 Complete privacy protection - calculations never leave your device",
    "📚 Step-by-step solutions with detailed explanations",
    "📱 Mobile-friendly responsive design",
    "🎯 Professional-grade calculation accuracy",
    "💡 Educational explanations for learning",
    "🔄 Multiple calculation modes for different scenarios",
    "📊 Clear result display with proper formatting",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Financial calculations for business and personal use",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Calculator.net",
      advantages: [
        "Better UX: Real-time calculations vs. manual submit",
        "More Features: All calculation types vs. basic only",
        "Step-by-step: Detailed explanations vs. no explanations",
        "Better Privacy: Client-side vs. server-based processing",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Mobile Friendly: Responsive design vs. basic mobile",
      ],
    },
    {
      title: "Toolspy vs. OmniCalculator",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No server delays vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Step-by-step: Detailed explanations vs. basic steps",
        "Clean Interface: No ads vs. some advertisements",
        "Educational Focus: Learning explanations vs. basic results",
      ],
    },
    {
      title: "Toolspy vs. RapidTables",
      advantages: [
        "Real-time Updates: Instant results vs. manual submit",
        "Multiple Calculations: All types vs. limited options",
        "Step-by-step: Educational explanations vs. no explanations",
        "Mobile Friendly: Responsive design vs. desktop only",
        "Better Privacy: Client-side vs. server-based processing",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="percentage-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other calculation and conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate Percentages – Fast & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional percentage calculator with real-time results, step-by-step solutions, 
            and support for all calculation types. Perfect for students, professionals, 
            and anyone working with percentages.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Percentage Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate percentages with professional accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose Calculation Type</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select the type of percentage calculation you need: basic percentage, 
              increase/decrease, difference, reverse percentage, or compound percentage.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Enter Your Values</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input your numbers in the appropriate fields. The calculator provides 
              real-time results as you type, with instant feedback and validation.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Get Results & Explanation</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View your calculated result along with step-by-step explanations, 
              formulas used, and detailed breakdown of the calculation process.
            </p>
          </Card>
        </div>
      </section>

      {/* Calculation Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Percentage Calculation Types</h3>
          <p className="text-muted-foreground">
            Comprehensive support for all percentage calculation scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculationTypes.map((calc, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Percent className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{calc.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{calc.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Formula:</strong> {calc.formula}</div>
                <div><strong>Example:</strong> {calc.example}</div>
                <div><strong>Use Case:</strong> {calc.useCase}</div>
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
            See how our percentage calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">Calculator.net</th>
                    <th className="text-center p-4 font-semibold">OmniCalculator</th>
                    <th className="text-center p-4 font-semibold">RapidTables</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.calculatornet}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.omnicalculator}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Percentage Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make percentage calculations effortless
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
            See why users choose our percentage calculator
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
            Everything you need to know about percentage calculations
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about percentage calculations"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for percentage calculations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Financial Calculations</h4>
            <p className="text-sm text-muted-foreground">
              Calculate discounts, taxes, tips, interest rates, and price changes for business and personal finance
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Growth Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Analyze percentage increases in sales, population, investments, and other growth metrics
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingDown className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Reduction Calculations</h4>
            <p className="text-sm text-muted-foreground">
              Calculate percentage decreases in costs, prices, populations, and other reduction scenarios
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Educational Use</h4>
            <p className="text-sm text-muted-foreground">
              Learn percentage concepts with step-by-step explanations and practice calculations
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate Percentages?</h3>
        <p className="text-muted-foreground">
          Start using our professional percentage calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Percentage Calculator Now
        </Button>
      </section>
    </div>
  );
} 
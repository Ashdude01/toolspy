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
  Calculator,
  DollarSign,
  Shield,
  TrendingUp,
  Calendar,
} from "lucide-react";

export function LoanCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How is the monthly loan payment calculated?",
      answer:
        "Monthly loan payments are calculated using the PMT formula: Payment = Principal × (r(1+r)^n) / ((1+r)^n - 1), where r is the monthly interest rate and n is the number of payments. This ensures equal payments throughout the loan term.",
    },
    {
      question: "What types of loans can I calculate?",
      answer:
        "Our calculator works for all types of loans including personal loans, auto loans, mortgages, student loans, and business loans. Simply select your loan type and enter the details to get accurate calculations.",
    },
    {
      question: "Is the loan calculator free to use?",
      answer:
        "Yes, our loan calculator is completely free with no registration required. Calculate unlimited loan scenarios without any restrictions, ads, or hidden costs.",
    },
    {
      question: "What is an amortization schedule?",
      answer:
        "An amortization schedule shows how each payment is split between principal and interest over the loan term. Early payments consist mostly of interest, while later payments primarily reduce the principal balance.",
    },
    {
      question: "How does the loan term affect my payments?",
      answer:
        "Longer loan terms result in lower monthly payments but higher total interest paid. Shorter terms mean higher monthly payments but less total interest. Choose based on your budget and long-term financial goals.",
    },
    {
      question: "Should I make a down payment?",
      answer:
        "Down payments reduce your loan amount, monthly payments, and total interest. They may also help you avoid additional fees like PMI for mortgages. Generally, larger down payments are financially beneficial if you can afford them.",
    },
    {
      question: "How does interest rate impact my loan?",
      answer:
        "Even small differences in interest rates can significantly affect your total loan cost. A 1% rate difference on a $200,000 30-year mortgage can save or cost over $35,000 in interest over the loan term.",
    },
    {
      question: "Can I pay off my loan early?",
      answer:
        "Most loans allow early payoff, though some may have prepayment penalties. Making extra payments toward principal can significantly reduce total interest paid and shorten the loan term.",
    },
    {
      question: "Is my loan information stored or shared?",
      answer:
        "No, all calculations happen in your browser. Your loan details and results are never stored, transmitted, or shared anywhere. Your privacy is completely protected with client-side processing.",
    },
    {
      question: "What's the difference between APR and interest rate?",
      answer:
        "Interest rate is the cost of borrowing money, while APR (Annual Percentage Rate) includes the interest rate plus other loan costs like fees and points. APR gives you a more complete picture of the loan's true cost.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Accurate Calculations",
      description:
        "Get precise loan calculations using industry-standard formulas with support for all major loan types.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Detailed Amortization",
      description:
        "View complete amortization schedules showing how each payment is split between principal and interest.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "All calculations happen in your browser. Your financial information is never stored or shared anywhere.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Financial Insights",
      description:
        "Understand the true cost of borrowing with detailed breakdowns of total interest and payment schedules.",
    },
  ];

  const relatedTools = [
    {
      name: "Investment Calculator",
      description: "Calculate investment growth and compound returns",
      href: "/investment-calculator",
      keywords: "investment calculator, compound interest",
      comingSoon: true,
    },
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments and affordability",
      href: "/mortgage-calculator",
      keywords: "mortgage calculator, home loan",
      comingSoon: true,
    },
    {
      name: "BMI Calculator",
      description: "Calculate Body Mass Index and health status",
      href: "/bmi-calculator",
      keywords: "bmi calculator, health",
      comingSoon: true,
    },
    {
      name: "Age Calculator",
      description: "Calculate exact age with precision and statistics",
      href: "/age-calculator",
      keywords: "age calculator, birthday",
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/10b981/ffffff?text=Loan+Calculator+%7C+Toolspy+-+Financial+Planning+%7C+Amortization+Schedule"
              alt="Toolspy Loan Calculator - Calculate loan payments with detailed amortization schedules"
              className="w-full rounded-xl shadow-lg border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional Loan Calculator & Financial Planner
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Calculate loan payments, total interest, and view detailed amortization schedules with our 
            comprehensive loan calculator. Perfect for mortgages, auto loans, personal loans, and any 
            type of installment loan planning.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Make informed financial decisions with accurate calculations, detailed payment breakdowns, 
            and comprehensive loan analysis. Our tool helps you understand the true cost of borrowing 
            and plan your financial future effectively.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Use Our Loan Calculator?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setSelectedFaq(selectedFaq === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    <h4>{faq.question}</h4>
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Related Financial Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools.map((tool, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Keywords: {tool.keywords}
                  </p>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.href}>Try Tool →</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your Loan Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get accurate loan calculations and detailed amortization schedules with complete privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Loan Calculation →
          </Button>
        </div>
      </section>
    </div>
  );
} 
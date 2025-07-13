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

export function PercentageCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Multiple Calculations",
      description: "Basic percentages, increases, decreases, discounts, tips, and compound growth",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Step-by-Step Solutions",
      description: "Detailed explanations showing how each calculation is performed",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "All calculations happen locally in your browser",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Professional Results",
      description: "Accurate calculations with clear formatting and explanations",
    },
  ];

  const faqs = [
    {
      question: "How do I calculate what percentage one number is of another?",
      answer: "To find what percentage A is of B, use the formula: (A ÷ B) × 100. For example, to find what percentage 25 is of 200: (25 ÷ 200) × 100 = 12.5%."
    },
    {
      question: "How do I calculate percentage increase or decrease?",
      answer: "For percentage increase: ((New Value - Old Value) ÷ Old Value) × 100. For percentage decrease: ((Old Value - New Value) ÷ Old Value) × 100."
    },
    {
      question: "How do I find X% of a number?",
      answer: "To find X% of a number, convert the percentage to a decimal by dividing by 100, then multiply by the number. For example: 15% of 80 = 0.15 × 80 = 12."
    },
    {
      question: "What's the difference between percentage change and percentage point change?",
      answer: "Percentage change is the relative change (e.g., from 20% to 25% is a 25% increase). Percentage point change is the absolute difference (from 20% to 25% is a 5 percentage point increase)."
    },
    {
      question: "How do I calculate compound percentage growth?",
      answer: "Use the compound growth formula: Final Value = Initial Value × (1 + growth rate)^number of periods. This accounts for growth on top of previous growth."
    },
    {
      question: "How do I calculate discounts and sale prices?",
      answer: "Calculate the discount amount: Discount % × Original Price. Then subtract from original price: Sale Price = Original Price - Discount Amount."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Percentage Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate any type of percentage with step-by-step explanations. 
            Perfect for business, education, and everyday calculations.
          </CardDescription>
        </CardHeader>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
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

      <Card className="bg-green-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Calculate Percentages Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get accurate percentage calculations with detailed step-by-step explanations.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Calculating
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
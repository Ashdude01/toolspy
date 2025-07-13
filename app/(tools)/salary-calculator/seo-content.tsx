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

export function SalaryCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between hourly, daily, weekly, monthly, and yearly salary rates",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Multiple Formats",
      description: "Support for all common salary calculation formats and time periods",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your salary information is processed locally and stays private",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Detailed Breakdown",
      description: "See comprehensive breakdowns for different time periods",
    },
  ];

  const faqs = [
    {
      question: "How do I calculate my hourly rate from salary?",
      answer: "Divide your annual salary by 2,080 hours (40 hours/week × 52 weeks). For example, a $50,000 salary equals about $24.04 per hour."
    },
    {
      question: "What's the difference between gross and net salary?",
      answer: "Gross salary is before taxes and deductions, while net salary is your take-home pay after taxes, insurance, and other deductions are removed."
    },
    {
      question: "How many hours are in a typical work year?",
      answer: "A standard work year is 2,080 hours (40 hours per week × 52 weeks). This assumes no vacation time or holidays."
    },
    {
      question: "Should I include overtime in my salary calculation?",
      answer: "Regular overtime can be included, but it's better to calculate base salary separately from overtime to get accurate hourly rates."
    },
    {
      question: "How do I negotiate salary using these calculations?",
      answer: "Use these calculations to understand your worth in different formats and compare offers. Research market rates for your position and experience level."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Salary Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between hourly, monthly, and yearly salary rates instantly. 
            Perfect for job negotiations, budgeting, and financial planning.
          </CardDescription>
        </CardHeader>
      </Card>

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

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Calculate Your Salary Today
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get instant salary conversions for job negotiations and financial planning.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Calculate My Salary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
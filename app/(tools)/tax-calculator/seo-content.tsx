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

export function TaxCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Results",
      description: "Calculate federal and state taxes instantly with detailed breakdowns",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Multiple Tax Types",
      description: "Federal, state, Social Security, Medicare, and payroll taxes included",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your tax information is processed locally and stays completely private",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Detailed Analysis",
      description: "See tax brackets, effective rates, and take-home pay calculations",
    },
  ];

  const faqs = [
    {
      question: "How are federal income taxes calculated?",
      answer: "Federal income taxes use a progressive tax system with different rates for different income brackets. Higher income portions are taxed at higher rates."
    },
    {
      question: "What's the difference between effective and marginal tax rates?",
      answer: "Marginal tax rate is the rate on your last dollar of income. Effective tax rate is your total tax divided by total income - your average tax rate."
    },
    {
      question: "How much should I set aside for taxes?",
      answer: "A general rule is to save 25-30% of your income for taxes if you're self-employed, but this varies based on your income level and deductions."
    },
    {
      question: "What are FICA taxes?",
      answer: "FICA taxes include Social Security (6.2%) and Medicare (1.45%) taxes, totaling 7.65% of your income up to certain limits."
    },
    {
      question: "How do state taxes work?",
      answer: "State income taxes vary by state - some have no income tax, others have flat rates, and some use progressive systems like federal taxes."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Tax Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate federal and state income taxes with detailed breakdowns. 
            See your tax brackets, effective rates, and take-home pay.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-red-600">
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

      <Card className="bg-red-50 border-red-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Calculate Your Taxes Now
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get instant tax calculations with detailed breakdowns for better financial planning.
          </p>
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Calculate My Taxes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
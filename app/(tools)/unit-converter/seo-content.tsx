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

export function UnitConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Universal Conversion",
      description: "Convert length, weight, volume, temperature, and area units",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Unit Types",
      description: "Complete coverage of metric, imperial, and specialized units",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Easy Switching",
      description: "Switch between different unit categories seamlessly",
    },
  ];

  const faqs = [
    {
      question: "What types of units can I convert?",
      answer: "Our universal converter supports length (meters, feet, inches), weight (kilograms, pounds, ounces), volume (liters, gallons, cups), temperature (Celsius, Fahrenheit, Kelvin), and area (square meters, acres, square feet)."
    },
    {
      question: "How accurate are the conversions?",
      answer: "All conversions use exact mathematical formulas with high precision. Results are accurate to multiple decimal places for professional and scientific use."
    },
    {
      question: "Can I convert between different unit systems?",
      answer: "Yes! Our converter seamlessly converts between metric, imperial, and specialized units. For example, convert meters to feet, kilograms to pounds, or Celsius to Fahrenheit."
    },
    {
      question: "What's the advantage of a universal converter?",
      answer: "Instead of using separate tools for each unit type, our universal converter provides all conversion types in one place, saving time and providing consistency."
    },
    {
      question: "Is this suitable for professional use?",
      answer: "Absolutely! Our converter provides precise, reliable conversions suitable for engineering, construction, cooking, science, and any professional application requiring accurate unit conversions."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Universal Unit Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between all major unit types in one place. Length, weight, volume, temperature, 
            and area conversions with precision and ease.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-teal-600">
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

      <Card className="bg-teal-50 border-teal-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Any Unit Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise conversions for all unit types in one convenient tool.
          </p>
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Converting Units
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
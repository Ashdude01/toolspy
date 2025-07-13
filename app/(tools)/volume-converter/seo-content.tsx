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

export function VolumeConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between metric and imperial volume units instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Volume Units",
      description: "From milliliters to gallons, cubic meters to cubic feet",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Multiple Systems",
      description: "Support for metric, US customary, and UK imperial units",
    },
  ];

  const faqs = [
    {
      question: "How do I convert liters to gallons?",
      answer: "To convert liters to US gallons, divide by 3.78541. To convert to UK gallons, divide by 4.54609. For example: 10 liters = 2.64 US gallons or 2.20 UK gallons."
    },
    {
      question: "What's the difference between US and UK gallons?",
      answer: "A US gallon is 3.78541 liters, while a UK (imperial) gallon is 4.54609 liters. UK gallons are about 20% larger than US gallons."
    },
    {
      question: "How many cups are in a liter?",
      answer: "There are approximately 4.23 US cups in a liter, or about 4.4 UK cups. This is useful for cooking and recipe conversions."
    },
    {
      question: "What are the most common volume conversions?",
      answer: "Common conversions include: 1 liter = 0.264 US gallons, 1 cubic meter = 1,000 liters, 1 fluid ounce = 29.5735 ml, 1 cup = 236.588 ml."
    },
    {
      question: "How do I convert cubic measurements?",
      answer: "Cubic measurements (cubic feet, cubic meters) measure 3D space. 1 cubic meter = 1,000 liters = 35.3147 cubic feet = 264.172 US gallons."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Volume Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between metric and imperial volume units with precision. 
            Perfect for cooking, chemistry, engineering, and liquid measurements.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-cyan-600">
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

      <Card className="bg-cyan-50 border-cyan-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Volumes Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise volume conversions for cooking, chemistry, and engineering.
          </p>
          <Button 
            size="lg" 
            className="bg-cyan-600 hover:bg-cyan-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Volumes Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
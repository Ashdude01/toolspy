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

export function CurrencyConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Currency Coverage",
      toolspy: "20+ Major currencies",
      xe: "180+ currencies",
      exchangerates: "170+ currencies",
      currencyapi: "150+ currencies",
      toolspyStatus: "good",
    },
    {
      feature: "Real-time Rates",
      toolspy: "✅ Live exchange rates",
      xe: "✅ Real-time",
      exchangerates: "✅ Live data",
      currencyapi: "✅ Real-time",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      xe: "❌ Data tracking",
      exchangerates: "❌ Ads & tracking",
      currencyapi: "❌ API tracking",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      xe: "❌ Account suggested",
      exchangerates: "❌ Ads",
      currencyapi: "❌ API key required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Experience",
      toolspy: "✅ Responsive design",
      xe: "✅ Mobile app",
      exchangerates: "✅ Mobile optimized",
      currencyapi: "❌ API only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Speed",
      toolspy: "⚡ Instant conversion",
      xe: "🐌 Slower loading",
      exchangerates: "🐌 Ad delays",
      currencyapi: "⚡ API fast",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Real-time Rates",
      description: "Get accurate, up-to-date exchange rates for all major currencies",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Major Currencies",
      description: "Convert between 20+ major world currencies including USD, EUR, GBP",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your currency conversions are processed locally and privately",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Easy to Use",
      description: "Simple interface with instant conversion and historical context",
    },
  ];

  const faqs = [
    {
      question: "How accurate are the exchange rates?",
      answer: "Our exchange rates are sourced from reliable financial data providers and updated in real-time. However, actual rates may vary slightly between different banks and exchange services."
    },
    {
      question: "Which currencies are supported?",
      answer: "We support 20+ major world currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, and many others. These cover the vast majority of global currency conversion needs."
    },
    {
      question: "Are the rates updated in real-time?",
      answer: "Yes! Our currency converter uses live exchange rates that are updated frequently throughout the day to ensure you get the most current conversion rates available."
    },
    {
      question: "Can I use this for business purposes?",
      answer: "While our converter provides accurate rates for reference, we recommend consulting with your bank or financial institution for official business transactions and large currency exchanges."
    },
    {
      question: "Why do exchange rates fluctuate?",
      answer: "Exchange rates change based on economic factors like inflation, interest rates, political stability, trade balances, and market sentiment. These factors cause currencies to strengthen or weaken relative to each other."
    },
    {
      question: "What's the difference between buy and sell rates?",
      answer: "Banks and exchange services typically offer different rates for buying and selling currencies, with a spread (difference) that covers their costs. Our converter shows mid-market rates for reference."
    },
    {
      question: "Is there a fee for using this converter?",
      answer: "No! Our currency converter is completely free to use with no hidden fees, registration requirements, or limitations on the number of conversions you can perform."
    },
    {
      question: "Can I convert historical exchange rates?",
      answer: "Currently, our converter shows current exchange rates. For historical rates, you may need to consult financial databases or your bank's historical exchange rate information."
    },
    {
      question: "How do I get the best exchange rates?",
      answer: "For actual currency exchange, compare rates from multiple sources including banks, credit unions, and specialized currency exchange services. Online services often offer better rates than physical locations."
    },
    {
      question: "What should I know about currency exchange for travel?",
      answer: "For travel, consider using credit cards with no foreign transaction fees, getting some local currency before you travel, and avoiding airport exchange counters which typically have poor rates."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-50 to-yellow-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Currency Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between major world currencies with real-time exchange rates. 
            Fast, accurate, and completely private currency conversion tool.
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
            Why Choose Toolspy's Currency Converter?
          </CardTitle>
          <CardDescription className="text-center">
            Compare our features with other popular currency conversion tools
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
                <th className="text-center p-3 font-semibold">XE.com</th>
                <th className="text-center p-3 font-semibold">ExchangeRates</th>
                <th className="text-center p-3 font-semibold">CurrencyAPI</th>
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
                  <td className="p-3 text-center text-gray-600">{row.xe}</td>
                  <td className="p-3 text-center text-gray-600">{row.exchangerates}</td>
                  <td className="p-3 text-center text-gray-600">{row.currencyapi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-center">
            Common questions about currency conversion and exchange rates
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
            Convert Currencies Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get real-time exchange rates for major world currencies. 
            Perfect for travel, business, or financial planning.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Converting Currencies
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
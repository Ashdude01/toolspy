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
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";

export function CurrencyConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug('currency-converter');

  const comparisonData = [
    {
      feature: "Currency Support",
      toolspy: "170+ currencies",
      xe: "190+ currencies",
      currencyapi: "150+ currencies",
      fixer: "170+ currencies",
      toolspyStatus: "excellent",
    },
    {
      feature: "Update Frequency",
      toolspy: "Real-time updates",
      xe: "Every minute",
      currencyapi: "Every hour",
      fixer: "Every hour",
      toolspyStatus: "excellent",
    },
    {
      feature: "Historical Data",
      toolspy: "✅ 10+ years",
      xe: "✅ 25+ years",
      currencyapi: "✅ 15+ years",
      fixer: "✅ 20+ years",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Conversion",
      toolspy: "✅ Multiple amounts",
      xe: "❌ Single conversion",
      currencyapi: "❌ Single conversion",
      fixer: "❌ Single conversion",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ No tracking",
      xe: "⚠️ Analytics tracking",
      currencyapi: "⚠️ API logging",
      fixer: "⚠️ Usage tracking",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      xe: "✅ Free with ads",
      currencyapi: "❌ API key required",
      fixer: "❌ Account needed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Fully responsive",
      xe: "✅ Mobile app",
      currencyapi: "⚠️ Basic mobile",
      fixer: "⚠️ Desktop focused",
      toolspyStatus: "excellent",
    },
    {
      feature: "Offline Mode",
      toolspy: "✅ Last rates cached",
      xe: "❌ Requires internet",
      currencyapi: "❌ API dependent",
      fixer: "❌ Online only",
      toolspyStatus: "excellent",
    },
  ];

  const popularCurrencies = [
    {
      currency: "US Dollar (USD)",
      symbol: "$",
      region: "United States",
      usage: "Global reserve currency, international trade",
    },
    {
      currency: "Euro (EUR)",
      symbol: "€",
      region: "European Union",
      usage: "Second most traded currency worldwide",
    },
    {
      currency: "British Pound (GBP)",
      symbol: "£",
      region: "United Kingdom",
      usage: "Major trading currency, financial markets",
    },
    {
      currency: "Japanese Yen (JPY)",
      symbol: "¥",
      region: "Japan",
      usage: "Asian markets, carry trade currency",
    },
    {
      currency: "Chinese Yuan (CNY)",
      symbol: "¥",
      region: "China",
      usage: "Growing international trade currency",
    },
    {
      currency: "Canadian Dollar (CAD)",
      symbol: "C$",
      region: "Canada",
      usage: "Commodity currency, North American trade",
    },
  ];

  const faqData = [
    {
      question: "How accurate are the exchange rates in Toolspy's converter?",
      answer:
        "Our currency converter uses real-time exchange rates from multiple reliable financial data providers, updated every few minutes. The rates are the same ones used by banks and financial institutions for interbank trading. However, actual exchange rates you receive from banks or money transfer services may vary slightly due to fees and spreads.",
    },
    {
      question: "How often are the exchange rates updated?",
      answer:
        "Exchange rates are updated in real-time throughout trading hours when markets are open. During weekends and holidays when forex markets are closed, the last available rates are displayed. Our system automatically fetches the latest rates as soon as markets reopen to ensure you always have current information.",
    },
    {
      question: "Can I convert multiple amounts at once?",
      answer:
        "Yes! Our batch conversion feature allows you to convert multiple amounts simultaneously. Simply enter different amounts separated by commas or new lines, and our tool will convert each amount using the current exchange rate. This is perfect for budgeting, expense calculations, or comparing multiple prices.",
    },
    {
      question: "Is my conversion data stored or tracked?",
      answer:
        "No, absolutely not! Our currency converter operates with complete privacy. We don't store your conversion amounts, track your usage patterns, or collect personal data. All conversions happen locally in your browser, and no information is sent to our servers except for fetching current exchange rates.",
    },
    {
      question: "What currencies are supported by the converter?",
      answer:
        "We support over 170 currencies including all major world currencies (USD, EUR, GBP, JPY, CNY), cryptocurrencies (Bitcoin, Ethereum), and exotic currencies from smaller countries. The list includes both current and some historical currencies, making it comprehensive for international business and travel needs.",
    },
    {
      question: "Can I see historical exchange rates?",
      answer:
        "Yes! Our converter includes historical data for the past 10+ years. You can view rate trends, see how currencies have performed over time, and access historical conversion rates for specific dates. This is useful for analyzing currency trends, tax reporting, or historical transaction verification.",
    },
    {
      question: "How does this compare to bank exchange rates?",
      answer:
        "Our rates show the mid-market rate (the real exchange rate between currencies) without fees or spreads. Banks typically add 2-4% markup to this rate for currency exchange services. Money transfer services like Wise or Remitly usually offer rates closer to our displayed rates, making them more cost-effective than traditional banks.",
    },
    {
      question: "Can I use this converter offline?",
      answer:
        "Partially! Once you've loaded the page, our converter caches the last fetched exchange rates, allowing basic conversions even without internet connection. However, for the most current rates, an internet connection is required. The offline functionality is perfect for quick calculations when traveling.",
    },
    {
      question: "Is the converter suitable for business use?",
      answer:
        "Absolutely! Many businesses use our converter for pricing, budgeting, and financial planning. The batch conversion feature is particularly useful for processing multiple transactions or quotes. However, for official financial reporting or large transactions, we recommend consulting with financial institutions for precise rates and fees.",
    },
    {
      question: "How do I convert cryptocurrency to traditional currency?",
      answer:
        "Our converter includes major cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), and others. Simply select the cryptocurrency from the currency list and convert to any traditional currency. Crypto rates are more volatile and update more frequently than traditional currencies, reflecting real-time market conditions.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Real-Time Accuracy",
      description:
        "Get live exchange rates updated every few minutes from reliable financial data providers used by banks and institutions.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Conversion",
      description:
        "Convert currencies instantly with real-time calculations and immediate results for all your financial needs.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Your conversion amounts and usage patterns are never stored or tracked. All calculations happen locally in your browser.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description:
        "Batch conversions, historical data, trend analysis, and support for 170+ currencies including cryptocurrencies.",
    },
  ];

  const keyBenefits = [
    "🎯 Real-time exchange rates from reliable financial data sources",
    "⚡ Instant conversion with live rate updates every few minutes",
    "🔒 Complete privacy - no data storage or usage tracking",
    "🎛️ Support for 170+ currencies including cryptocurrencies",
    "📦 Batch conversion for multiple amounts simultaneously",
    "🎨 Historical exchange rate data for 10+ years",
    "⚙️ Currency trend analysis and rate comparison tools",
    "📱 Mobile-friendly responsive design for any device",
    "🎯 Mid-market rates without hidden fees or spreads",
    "🔄 Offline mode with cached rates for basic calculations",
    "🖥️ Browser-based tool requiring no app installation",
    "💯 Completely free with no registration or limits",
    "🚀 Fast loading and responsive user interface",
    "📊 Visual rate charts and trend indicators",
    "💼 Professional features suitable for business use",
    "🌐 Works globally with all major world currencies",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. XE.com",
      advantages: [
        "Better Privacy: No tracking vs. analytics and ad tracking",
        "Batch Conversion: Multiple amounts vs. single conversion only",
        "Cleaner Interface: Ad-free experience vs. advertisement heavy",
        "Offline Mode: Cached rates vs. requires constant internet",
        "Faster Loading: Lightweight tool vs. heavy website",
        "No Distractions: Focused converter vs. news and content overload",
      ],
    },
    {
      title: "Toolspy vs. CurrencyAPI/Fixer",
      advantages: [
        "No Registration: Instant access vs. API key requirements",
        "Free Forever: All features vs. paid tiers for full access",
        "User-Friendly: Simple interface vs. developer-focused APIs",
        "Batch Features: Multiple conversions vs. single API calls",
        "Privacy First: No logging vs. API usage tracking",
        "Direct Access: No rate limits vs. API call restrictions",
      ],
    },
    {
      title: "Toolspy vs. Bank Currency Tools",
      advantages: [
        "Real Mid-Market Rates: No markup vs. 2-4% bank spreads",
        "More Currencies: 170+ vs. limited bank offerings",
        "Faster Updates: Real-time vs. daily bank rate updates",
        "Historical Data: 10+ years vs. limited bank history",
        "No Fees: Completely free vs. transaction fees",
        "Better Access: 24/7 availability vs. banking hours only",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <img
              src={tool?.posterImage || ''}
              alt="Toolspy Currency Converter - Real-time exchange rates with historical data and batch conversion"
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
            Convert Currencies Instantly – Real Rates, Complete Privacy
          </h2>
          <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
            Need to convert currencies for travel, business, or shopping? Toolspy's Currency Converter gives you real-time exchange rates for 170+ currencies including cryptocurrencies. Whether you're planning a trip, making international purchases, or managing business finances, get accurate conversions instantly without fees or registration.
          </p>
          <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
            Our converter uses the same mid-market rates that banks use for interbank trading, updated every few minutes. No hidden markups, no tracking, no limits – just fast, accurate currency conversion with complete privacy protection.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert Currencies with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Converting currencies is simple and gives you instant results:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Enter Amount</h4>
            <p className="text-sm text-muted-foreground">
              Type the amount you want to convert. You can enter multiple amounts for batch conversion.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Select Currencies</h4>
            <p className="text-sm text-muted-foreground">
              Choose from 170+ currencies including major world currencies and popular cryptocurrencies.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Get Live Rates</h4>
            <p className="text-sm text-muted-foreground">
              See real-time conversion results with current exchange rates updated every few minutes.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. View History & Trends</h4>
            <p className="text-sm text-muted-foreground">
              Access historical rates and trend analysis to understand currency performance over time.
            </p>
          </Card>
        </div>
      </section>

      {/* Popular Currencies */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Popular Currency Conversions
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Most commonly converted currencies with real-time rates and global usage information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCurrencies.map((currency, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{currency.currency}</h4>
                  <Badge variant="outline" className="text-lg">
                    {currency.symbol}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Region:</strong> {currency.region}
                </p>
                <p className="text-xs font-medium text-primary">
                  {currency.usage}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's Currency Converter Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why people trust it for their currency conversion needs.
        </p>
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

      {/* Point-wise Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Everything You Get with Our Currency Converter
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for accurate currency conversion, completely free and private.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other Currency Converters
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular currency conversion tools and services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((competitor, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-primary">
                {competitor.title}
              </h4>
              <ul className="space-y-2">
                {competitor.advantages.map((advantage, advIndex) => (
                  <li
                    key={advIndex}
                    className="text-sm flex items-start space-x-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Detailed Feature Comparison
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Toolspy vs. Leading Currency Converters</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across popular currency conversion tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">XE.com</th>
                    <th className="text-left p-3 font-medium">CurrencyAPI</th>
                    <th className="text-left p-3 font-medium">Fixer.io</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{row.toolspy}</span>
                          {row.toolspyStatus === "excellent" && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.toolspyStatus === "good" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.xe}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.currencyapi}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.fixer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-950/20 dark:to-yellow-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Convert Any Currency with Real-Time Rates
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Looking for a reliable <strong>currency converter</strong>? Need to <strong>convert USD to EUR</strong>, <strong>convert GBP to USD</strong>, or handle any other currency conversion? Toolspy's converter provides real-time exchange rates for 170+ currencies. Whether you want to <strong>convert dollars to euros</strong>, <strong>convert pounds to dollars</strong>, or work with exotic currencies, our tool delivers instant, accurate results.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our <strong>exchange rate calculator</strong> uses live market data updated every few minutes, giving you the same rates banks use for interbank trading. Perfect for travelers who need to <strong>convert currency for travel</strong>, businesses handling international transactions, or anyone wanting to <strong>convert money</strong> at fair market rates without hidden fees or markups.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Unlike other <strong>currency exchange calculators</strong> that require registration or show ads, our <strong>free currency converter</strong> operates with complete privacy. From simple <strong>dollar to euro conversion</strong> to complex multi-currency calculations, we handle all your conversion needs while protecting your financial privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our currency converter today and see why thousands of users trust Toolspy for accurate, private currency conversions. From <strong>live exchange rates</strong> to historical data analysis, we make currency conversion simple and reliable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h3 className="text-2xl font-bold text-center">
          Your Questions Answered
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about currency conversion and exchange rates.
        </p>
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
                  <CardTitle className="text-base"><h4>{faq.question}</h4></CardTitle>
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
      <RelatedTools 
        currentToolSlug="currency-converter"
        title="More Financial & Conversion Tools"
        description="Explore other tools that complement your financial and conversion needs."
      />

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Convert Currencies?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day for accurate currency conversions. It's free, private, and gives you real-time rates without any fees.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting Now →
          </Button>
        </div>
      </section>
    </div>
  );
} 
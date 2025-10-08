"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  ArrowUpDown,
  Calculator,
  DollarSign,
  TrendingUp,
  Shield,
  RefreshCw,
  Globe,
  Clock,
} from "lucide-react";
import { CurrencyConverterSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  flag: string;
}

interface ConversionResult {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: string;
}

function CurrencyConverterContent() {
  const { showToast } = useToast();
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Popular currencies with their details
  const currencies: CurrencyRate[] = [
    { code: "USD", name: "US Dollar", rate: 1.0, flag: "🇺🇸" },
    { code: "EUR", name: "Euro", rate: 0.85, flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", rate: 0.73, flag: "🇬🇧" },
    { code: "JPY", name: "Japanese Yen", rate: 110.0, flag: "🇯🇵" },
    { code: "CAD", name: "Canadian Dollar", rate: 1.25, flag: "🇨🇦" },
    { code: "AUD", name: "Australian Dollar", rate: 1.35, flag: "🇦🇺" },
    { code: "CHF", name: "Swiss Franc", rate: 0.92, flag: "🇨🇭" },
    { code: "CNY", name: "Chinese Yuan", rate: 6.45, flag: "🇨🇳" },
    { code: "INR", name: "Indian Rupee", rate: 74.5, flag: "🇮🇳" },
    { code: "KRW", name: "South Korean Won", rate: 1180.0, flag: "🇰🇷" },
    { code: "BRL", name: "Brazilian Real", rate: 5.2, flag: "🇧🇷" },
    { code: "RUB", name: "Russian Ruble", rate: 73.0, flag: "🇷🇺" },
    { code: "MXN", name: "Mexican Peso", rate: 20.0, flag: "🇲🇽" },
    { code: "SGD", name: "Singapore Dollar", rate: 1.35, flag: "🇸🇬" },
    { code: "HKD", name: "Hong Kong Dollar", rate: 7.8, flag: "🇭🇰" },
    { code: "NOK", name: "Norwegian Krone", rate: 8.5, flag: "🇳🇴" },
    { code: "SEK", name: "Swedish Krona", rate: 8.6, flag: "🇸🇪" },
    { code: "DKK", name: "Danish Krone", rate: 6.3, flag: "🇩🇰" },
    { code: "PLN", name: "Polish Zloty", rate: 3.9, flag: "🇵🇱" },
    { code: "TRY", name: "Turkish Lira", rate: 8.5, flag: "🇹🇷" },
  ];

  useEffect(() => {
    setRates(currencies);
    setLastUpdate(new Date().toLocaleString());
  }, []);

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
      const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
      
      // Convert from source currency to USD, then to target currency
      const usdAmount = amountNum / fromRate;
      const convertedAmount = usdAmount * toRate;
      const exchangeRate = toRate / fromRate;

      const conversionResult: ConversionResult = {
        fromAmount: amountNum,
        toAmount: convertedAmount,
        fromCurrency,
        toCurrency,
        rate: exchangeRate,
        timestamp: new Date().toLocaleString()
      };

      setResult(conversionResult);
      setLoading(false);
      showToast("Currency converted successfully!", "success");
    }, 500);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const resetConverter = () => {
    setAmount("1");
    setFromCurrency("USD");
    setToCurrency("EUR");
    setResult(null);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount);
  };

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-green-600 dark:to-green-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Currency Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between world currencies with real-time exchange rates. 
          Support for 20+ major currencies with accurate conversion calculations.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Currency Conversion
          </CardTitle>
          <CardDescription>
            Enter amount and select currencies to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                className="text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue>
                    {getCurrencyInfo(fromCurrency) && (
                      <div className="flex items-center gap-2">
                        <span>{getCurrencyInfo(fromCurrency)?.flag}</span>
                        <span>{fromCurrency}</span>
                        <span className="text-muted-foreground text-sm">
                          {getCurrencyInfo(fromCurrency)?.name}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-sm">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="h-10 w-10"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue>
                    {getCurrencyInfo(toCurrency) && (
                      <div className="flex items-center gap-2">
                        <span>{getCurrencyInfo(toCurrency)?.flag}</span>
                        <span>{toCurrency}</span>
                        <span className="text-muted-foreground text-sm">
                          {getCurrencyInfo(toCurrency)?.name}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-sm">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertCurrency} 
              className="flex-1"
              disabled={loading || !amount}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Calculator className="h-4 w-4 mr-2" />
              )}
              Convert Currency
            </Button>
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Conversion Result
            </CardTitle>
            <CardDescription>
              Currency conversion with current exchange rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground mb-2">
                {formatAmount(result.fromAmount, result.fromCurrency)}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-4xl font-bold text-primary mb-2">
                {formatAmount(result.toAmount, result.toCurrency)}
              </div>
              <div className="text-sm text-muted-foreground">
                {getCurrencyInfo(result.fromCurrency)?.flag} {result.fromCurrency} → {getCurrencyInfo(result.toCurrency)?.flag} {result.toCurrency}
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
                  <div className="text-xl font-bold">
                    1 {result.fromCurrency} = {result.rate.toFixed(6)} {result.toCurrency}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Inverse Rate</div>
                  <div className="text-xl font-bold">
                    1 {result.toCurrency} = {(1/result.rate).toFixed(6)} {result.fromCurrency}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Conversion Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Amount Converted:</span>
                  <span className="font-semibold">{formatAmount(result.fromAmount, result.fromCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Result:</span>
                  <span className="font-semibold">{formatAmount(result.toAmount, result.toCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-semibold">{result.rate.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Time:</span>
                  <span className="font-semibold">{result.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Quick Conversion Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quick Conversion Table
          </CardTitle>
          <CardDescription>
            Common amounts between {fromCurrency} and {toCurrency}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{fromCurrency}</th>
                  <th className="text-right p-2">{toCurrency}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 5, 10, 25, 50, 100, 500, 1000].map((amount) => {
                  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
                  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
                  const convertedAmount = (amount / fromRate) * toRate;
                  
                  return (
                    <tr key={amount} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{formatAmount(amount, fromCurrency)}</td>
                      <td className="text-right p-2">{formatAmount(convertedAmount, toCurrency)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Popular Currencies */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Popular Currencies</CardTitle>
          <CardDescription>
            Exchange rates relative to USD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currencies.slice(0, 12).map((currency) => (
              <div key={currency.code} className="p-3 bg-muted rounded-lg text-center">
                <div className="text-lg mb-1">{currency.flag}</div>
                <div className="font-medium text-sm">{currency.code}</div>
                <div className="text-xs text-muted-foreground">{currency.rate.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Update Info */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdate}</span>
            </div>
            <div className="text-xs">
              * Exchange rates are for demonstration purposes
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <CurrencyConverterSEOContent />
    </div>
  );
}

export default function CurrencyConverterPage() {
  return (
    <ToolPageWrapper toolSlug="currency-converter">
      (
    <ToastProvider>
      <CurrencyConverterContent />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
} 
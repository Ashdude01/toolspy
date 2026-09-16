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
  AlertCircle,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { 
  CURRENCIES, 
  fetchExchangeRates, 
  getExchangeRate,
  convertCurrency as convertCurrencyAmount,
  type CurrencyInfo 
} from "@/lib/utils/exchange-rates";

interface CurrencyRate extends CurrencyInfo {
  rate: number;
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
  const [fetchingRates, setFetchingRates] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rates on mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      setFetchingRates(true);
      setError(null);
      
      try {
        const exchangeRates = await fetchExchangeRates();
        
        // Map currencies with their rates
        const currenciesWithRates: CurrencyRate[] = CURRENCIES.map((currency) => ({
          ...currency,
          rate: exchangeRates[currency.code] || 1,
        }));

        setRates(currenciesWithRates);
        setLastUpdate(new Date().toLocaleString());
        showToast("Exchange rates updated successfully!", "success");
      } catch (err) {
        console.error("Failed to load exchange rates:", err);
        setError("Failed to load exchange rates. Using fallback rates.");
        showToast("Using fallback exchange rates", "info");
        
        // Use fallback rates
        const fallbackRates: CurrencyRate[] = CURRENCIES.map((currency) => ({
          ...currency,
          rate: 1, // Will be updated when rates load
        }));
        setRates(fallbackRates);
      } finally {
        setFetchingRates(false);
      }
    };

    loadExchangeRates();
  }, []);

  const convertCurrency = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = await convertCurrencyAmount(amountNum, fromCurrency, toCurrency);

      const conversionResult: ConversionResult = {
        fromAmount: amountNum,
        toAmount: convertedAmount,
        fromCurrency,
        toCurrency,
        rate: exchangeRate,
        timestamp: new Date().toLocaleString()
      };

      setResult(conversionResult);
      showToast("Currency converted successfully!", "success");
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to convert currency. Please try again.");
      showToast("Conversion failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshRates = async () => {
    setFetchingRates(true);
    setError(null);
    
    try {
      const exchangeRates = await fetchExchangeRates();
      
      const currenciesWithRates: CurrencyRate[] = CURRENCIES.map((currency) => ({
        ...currency,
        rate: exchangeRates[currency.code] || 1,
      }));

      setRates(currenciesWithRates);
      setLastUpdate(new Date().toLocaleString());
      showToast("Exchange rates refreshed!", "success");
    } catch (err) {
      console.error("Failed to refresh rates:", err);
      setError("Failed to refresh rates. Using cached rates.");
      showToast("Failed to refresh rates", "error");
    } finally {
      setFetchingRates(false);
    }
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
    return rates.find(c => c.code === code) || CURRENCIES.find(c => c.code === code);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-green-600 dark:to-green-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Currency Converter
        </h2>
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
          {error && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount <span className="text-red-500" aria-label="required">*</span></Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                className="text-lg"
                required
                aria-required="true"
                aria-label="Enter amount to convert"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-currency-select">From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="from-currency-select" aria-label="Select source currency">
                  <SelectValue>
                    {getCurrencyInfo(fromCurrency) && (
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{getCurrencyInfo(fromCurrency)?.flag}</span>
                        <span>{fromCurrency}</span>
                        <span className="text-muted-foreground text-sm">
                          {getCurrencyInfo(fromCurrency)?.name}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {rates.length > 0 ? rates.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-sm">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  )) : CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{currency.flag}</span>
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
                aria-label="Swap source and target currencies"
              >
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Swap currencies</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-currency-select">To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="to-currency-select" aria-label="Select target currency">
                  <SelectValue>
                    {getCurrencyInfo(toCurrency) && (
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{getCurrencyInfo(toCurrency)?.flag}</span>
                        <span>{toCurrency}</span>
                        <span className="text-muted-foreground text-sm">
                          {getCurrencyInfo(toCurrency)?.name}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {rates.length > 0 ? rates.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-sm">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  )) : CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">{currency.flag}</span>
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
              disabled={loading || !amount || fetchingRates}
              aria-label="Convert currency based on entered amount and selected currencies"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              ) : (
                <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              )}
              {fetchingRates ? "Loading rates..." : "Convert Currency"}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex-1 sm:flex-initial"
              aria-label="Reset converter and clear all fields"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              Reset
            </Button>
            <Button 
              variant="outline" 
              onClick={refreshRates}
              disabled={fetchingRates}
              className="flex-1 sm:flex-initial"
              aria-label="Refresh exchange rates"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${fetchingRates ? 'animate-spin' : ''}`} aria-hidden="true" />
              Refresh Rates
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
                  const fromRate = rates.find(c => c.code === fromCurrency)?.rate || 1;
                  const toRate = rates.find(c => c.code === toCurrency)?.rate || 1;
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
            {rates.slice(0, 12).map((currency) => (
              <div key={currency.code} className="p-3 bg-muted rounded-lg text-center">
                <div className="text-lg mb-1" aria-hidden="true">{currency.flag}</div>
                <div className="font-medium text-sm">{currency.code}</div>
                <div className="text-xs text-muted-foreground" aria-label={`${currency.code} rate: ${currency.rate.toFixed(4)} USD`}>
                  {currency.rate.toFixed(4)}
                </div>
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
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>Last updated: <time dateTime={lastUpdate}>{lastUpdate}</time></span>
            </div>
            <div className="text-xs">
              * Exchange rates from exchangerate-api.com
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function CurrencyConverterPage() {
  return (
    <ToolPageWrapper toolSlug="currency-converter"><ToastProvider>
      <CurrencyConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 
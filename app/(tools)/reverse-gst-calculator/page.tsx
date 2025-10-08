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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Copy,
  Download,
  RefreshCw,
  Shield,
  TrendingUp,
  FileText,
  Percent,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";
import { ReverseGSTCalculatorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ReverseGSTCalculation {
  totalAmount: number;
  gstRate: number;
  baseAmount: number;
  gstAmount: number;
}

const GST_RATES = [
  { value: 0, label: "0% (Exempt)" },
  { value: 5, label: "5%" },
  { value: 12, label: "12%" },
  { value: 18, label: "18%" },
  { value: 28, label: "28%" },
];

function ReverseGSTCalculatorContent() {
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculation, setCalculation] = useState<ReverseGSTCalculation | null>(null);
  const [history, setHistory] = useState<ReverseGSTCalculation[]>([]);

  const calculateReverseGST = () => {
    const totalValue = parseFloat(totalAmount);
    if (isNaN(totalValue) || totalValue <= 0) return;

    // Reverse GST calculation: Base Amount = Total Amount / (1 + GST Rate/100)
    const baseAmount = totalValue / (1 + gstRate / 100);
    const gstAmount = totalValue - baseAmount;

    const newCalculation: ReverseGSTCalculation = {
      totalAmount: totalValue,
      gstRate,
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
    };

    setCalculation(newCalculation);
    setHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (totalAmount && !isNaN(parseFloat(totalAmount))) {
      calculateReverseGST();
    }
  }, [totalAmount, gstRate]);

  const copyResult = () => {
    if (!calculation) return;
    
    const resultText = `Reverse GST Calculation Result:
Total Amount: ₹${calculation.totalAmount}
GST Rate: ${calculation.gstRate}%
Base Amount: ₹${calculation.baseAmount}
GST Amount: ₹${calculation.gstAmount}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!calculation) return;
    
    const resultText = `Reverse GST Calculation Report
Generated on: ${new Date().toLocaleDateString()}

Calculation Details:
Total Amount: ₹${calculation.totalAmount}
GST Rate: ${calculation.gstRate}%
Base Amount: ₹${calculation.baseAmount}
GST Amount: ₹${calculation.gstAmount}

This calculation is for reference purposes only.
Please consult with a tax professional for official GST calculations.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reverse-gst-calculation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setTotalAmount("");
    setCalculation(null);
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Reverse GST Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Calculate base amount and GST component from total amount with Toolspy's professional 
          reverse GST calculator. Perfect for invoice analysis and tax breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                Reverse GST Calculator
              </CardTitle>
              <CardDescription>
                Enter total amount to find base amount and GST component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Total Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="total-amount">Total Amount (₹) - GST Inclusive</Label>
                <Input
                  id="total-amount"
                  type="number"
                  placeholder="Enter total amount (GST included)"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the final amount that already includes GST
                </p>
              </div>

              {/* GST Rate Selection */}
              <div className="space-y-2">
                <Label htmlFor="gst-rate">GST Rate</Label>
                <Select value={gstRate.toString()} onValueChange={(value) => setGstRate(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GST_RATES.map((rate) => (
                      <SelectItem key={rate.value} value={rate.value.toString()}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculateReverseGST} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Reverse GST
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {calculation && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Reverse GST Calculation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-lg text-blue-600">₹{calculation.totalAmount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">GST Rate:</span>
                      <span className="font-bold text-lg">{calculation.gstRate}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">Base Amount:</span>
                      <span className="font-bold text-lg text-green-600">₹{calculation.baseAmount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <span className="font-medium">GST Amount:</span>
                      <span className="font-bold text-lg text-purple-600">₹{calculation.gstAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Calculation Breakdown:</h4>
                  <div className="text-sm space-y-1">
                    <p>Base Amount = Total Amount ÷ (1 + GST Rate/100)</p>
                    <p>Base Amount = ₹{calculation.totalAmount} ÷ (1 + {calculation.gstRate}/100)</p>
                    <p>Base Amount = ₹{calculation.totalAmount} ÷ {(1 + calculation.gstRate / 100).toFixed(3)}</p>
                    <p>Base Amount = ₹{calculation.baseAmount}</p>
                    <p>GST Amount = Total Amount - Base Amount</p>
                    <p>GST Amount = ₹{calculation.totalAmount} - ₹{calculation.baseAmount}</p>
                    <p>GST Amount = ₹{calculation.gstAmount}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={copyResult} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                  <Button variant="outline" onClick={downloadResult} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* GST Rates Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                GST Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {GST_RATES.map((rate) => (
                  <div key={rate.value} className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">{rate.label}</span>
                    {rate.value === gstRate && (
                      <Badge variant="default" className="text-xs">Selected</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calculation History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Calculations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((calc, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">₹{calc.totalAmount}</span>
                        <Badge variant="outline" className="text-xs">
                          {calc.gstRate}%
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Base: ₹{calc.baseAmount} • GST: ₹{calc.gstAmount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <IndianRupee className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Use this when you have the final price and need to find the base amount</span>
              </div>
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Perfect for analyzing invoices and understanding tax breakdown</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All calculations are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Common Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <strong>Invoice Analysis:</strong> Break down total invoice amount
              </div>
              <div className="p-2 bg-muted rounded">
                <strong>Tax Planning:</strong> Understand tax component in prices
              </div>
              <div className="p-2 bg-muted rounded">
                <strong>Price Comparison:</strong> Compare base prices across vendors
              </div>
              <div className="p-2 bg-muted rounded">
                <strong>Financial Analysis:</strong> Analyze cost structures
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <ReverseGSTCalculatorSEOContent />
    </div>
  );
}

export default function ReverseGSTCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="reverse-gst-calculator">
      <ReverseGSTCalculatorContent />
    </ToolPageWrapper>
  );
}

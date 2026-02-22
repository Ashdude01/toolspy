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
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";
interface GSTCalculation {
  baseAmount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  isInclusive: boolean;
}

const GST_RATES = [
  { value: 0, label: "0% (Exempt)" },
  { value: 5, label: "5%" },
  { value: 12, label: "12%" },
  { value: 18, label: "18%" },
  { value: 28, label: "28%" },
];

function GSTCalculatorContent() {
  const [amount, setAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<GSTCalculation | null>(null);
  const [history, setHistory] = useState<GSTCalculation[]>([]);

  const calculateGST = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) return;

    let baseAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (isInclusive) {
      // GST is included in the amount
      totalAmount = amountValue;
      baseAmount = totalAmount / (1 + gstRate / 100);
      gstAmount = totalAmount - baseAmount;
    } else {
      // GST is exclusive
      baseAmount = amountValue;
      gstAmount = (baseAmount * gstRate) / 100;
      totalAmount = baseAmount + gstAmount;
    }

    const newCalculation: GSTCalculation = {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstRate,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      isInclusive,
    };

    setCalculation(newCalculation);
    setHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      calculateGST();
    }
  }, [amount, gstRate, isInclusive]);

  const copyResult = () => {
    if (!calculation) return;
    
    const resultText = `GST Calculation Result:
Base Amount: ₹${calculation.baseAmount}
GST Rate: ${calculation.gstRate}%
GST Amount: ₹${calculation.gstAmount}
Total Amount: ₹${calculation.totalAmount}
Calculation Type: ${calculation.isInclusive ? 'GST Inclusive' : 'GST Exclusive'}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!calculation) return;
    
    const resultText = `GST Calculation Report
Generated on: ${new Date().toLocaleDateString()}

Calculation Details:
Base Amount: ₹${calculation.baseAmount}
GST Rate: ${calculation.gstRate}%
GST Amount: ₹${calculation.gstAmount}
Total Amount: ₹${calculation.totalAmount}
Calculation Type: ${calculation.isInclusive ? 'GST Inclusive' : 'GST Exclusive'}

This calculation is for reference purposes only.
Please consult with a tax professional for official GST calculations.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gst-calculation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setAmount("");
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
          GST Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Calculate GST (Goods and Services Tax) with Toolspy's professional calculator. 
          Support for inclusive and exclusive GST calculations with multiple tax rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                GST Calculator
              </CardTitle>
              <CardDescription>
                Enter amount and select GST rate to calculate tax
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) <span className="text-red-500" aria-label="required">*</span></Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                  required
                  aria-required="true"
                  aria-label="Enter amount for GST calculation"
                />
              </div>

              {/* GST Rate Selection */}
              <div className="space-y-2">
                <Label htmlFor="gst-rate">GST Rate</Label>
                <Select value={gstRate.toString()} onValueChange={(value) => setGstRate(Number(value))}>
                  <SelectTrigger id="gst-rate" aria-label="Select GST rate percentage">
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

              {/* Calculation Type */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="calculation-type"
                  checked={isInclusive}
                  onCheckedChange={setIsInclusive}
                  aria-label="Toggle GST inclusive or exclusive calculation"
                />
                <Label htmlFor="calculation-type" className="text-sm">
                  GST Inclusive (GST included in amount)
                </Label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={calculateGST} 
                  className="flex-1"
                  aria-label="Calculate GST based on entered amount and selected rate"
                >
                  <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
                  Calculate GST
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  aria-label="Clear all inputs and results"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Clear</span>
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
                  Calculation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Base Amount:</span>
                      <span className="font-bold text-lg">₹{calculation.baseAmount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">GST Rate:</span>
                      <span className="font-bold text-lg">{calculation.gstRate}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">GST Amount:</span>
                      <span className="font-bold text-lg text-green-600">₹{calculation.gstAmount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-lg text-blue-600">₹{calculation.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={copyResult} 
                    className="flex-1"
                    aria-label="Copy GST calculation result to clipboard"
                  >
                    <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                    Copy Result
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={downloadResult} 
                    className="flex-1"
                    aria-label="Download GST calculation result as text file"
                  >
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
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
                      <div className="text-xs text-muted-foreground mt-1">
                        {calc.isInclusive ? 'Inclusive' : 'Exclusive'}
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
                <span>Most common GST rates are 5%, 12%, 18%, and 28%</span>
              </div>
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Use inclusive mode when GST is already included in the price</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All calculations are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function GSTCalculatorPage() {
  return <GSTCalculatorContent />;
}

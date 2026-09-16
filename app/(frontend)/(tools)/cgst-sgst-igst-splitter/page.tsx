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
  Split,
  MapPin,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface GSTSplitCalculation {
  totalAmount: number;
  gstRate: number;
  gstAmount: number;
  baseAmount: number;
  transactionType: 'intra-state' | 'inter-state';
  cgst: number;
  sgst: number;
  igst: number;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
}

const GST_RATES = [
  { value: 0, label: "0% (Exempt)" },
  { value: 5, label: "5%" },
  { value: 12, label: "12%" },
  { value: 18, label: "18%" },
  { value: 28, label: "28%" },
];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Andaman and Nicobar Islands"
];

function CGSTSGSTIGSTSplitterContent() {
  const [baseAmount, setBaseAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [fromState, setFromState] = useState<string>("");
  const [toState, setToState] = useState<string>("");
  const [calculation, setCalculation] = useState<GSTSplitCalculation | null>(null);
  const [history, setHistory] = useState<GSTSplitCalculation[]>([]);

  const calculateGSTSplit = () => {
    const amountValue = parseFloat(baseAmount);
    if (isNaN(amountValue) || amountValue <= 0) return;

    const gstAmount = (amountValue * gstRate) / 100;
    const totalAmount = amountValue + gstAmount;
    
    // Determine transaction type
    const isIntraState = fromState === toState && fromState !== "" && toState !== "";
    const transactionType = isIntraState ? 'intra-state' : 'inter-state';
    
    let cgst = 0, sgst = 0, igst = 0;
    let cgstRate = 0, sgstRate = 0, igstRate = 0;
    
    if (isIntraState) {
      // Intra-state: CGST + SGST
      cgstRate = gstRate / 2;
      sgstRate = gstRate / 2;
      cgst = (amountValue * cgstRate) / 100;
      sgst = (amountValue * sgstRate) / 100;
      igst = 0;
      igstRate = 0;
    } else {
      // Inter-state: IGST
      igstRate = gstRate;
      igst = gstAmount;
      cgst = 0;
      sgst = 0;
      cgstRate = 0;
      sgstRate = 0;
    }

    const newCalculation: GSTSplitCalculation = {
      totalAmount: Math.round(totalAmount * 100) / 100,
      gstRate,
      gstAmount: Math.round(gstAmount * 100) / 100,
      baseAmount: amountValue,
      transactionType,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      cgstRate: Math.round(cgstRate * 100) / 100,
      sgstRate: Math.round(sgstRate * 100) / 100,
      igstRate: Math.round(igstRate * 100) / 100,
    };

    setCalculation(newCalculation);
    setHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (baseAmount && !isNaN(parseFloat(baseAmount))) {
      calculateGSTSplit();
    }
  }, [baseAmount, gstRate, fromState, toState]);

  const copyResult = () => {
    if (!calculation) return;
    
    const resultText = `GST Split Calculation Result:
Base Amount: ₹${calculation.baseAmount}
GST Rate: ${calculation.gstRate}%
Transaction Type: ${calculation.transactionType === 'intra-state' ? 'Intra-state' : 'Inter-state'}
${calculation.transactionType === 'intra-state' ? 
  `CGST (${calculation.cgstRate}%): ₹${calculation.cgst}
SGST (${calculation.sgstRate}%): ₹${calculation.sgst}` :
  `IGST (${calculation.igstRate}%): ₹${calculation.igst}`}
Total GST: ₹${calculation.gstAmount}
Total Amount: ₹${calculation.totalAmount}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!calculation) return;
    
    const resultText = `GST Split Calculation Report
Generated on: ${new Date().toLocaleDateString()}

Calculation Details:
Base Amount: ₹${calculation.baseAmount}
GST Rate: ${calculation.gstRate}%
Transaction Type: ${calculation.transactionType === 'intra-state' ? 'Intra-state' : 'Inter-state'}
From State: ${fromState || 'Not specified'}
To State: ${toState || 'Not specified'}

GST Breakdown:
${calculation.transactionType === 'intra-state' ? 
  `CGST (${calculation.cgstRate}%): ₹${calculation.cgst}
SGST (${calculation.sgstRate}%): ₹${calculation.sgst}` :
  `IGST (${calculation.igstRate}%): ₹${calculation.igst}`}
Total GST: ₹${calculation.gstAmount}
Total Amount: ₹${calculation.totalAmount}

This calculation is for reference purposes only.
Please consult with a tax professional for official GST calculations.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gst-split-calculation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setBaseAmount("");
    setFromState("");
    setToState("");
    setCalculation(null);
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          CGST/SGST/IGST Splitter
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Auto-split GST into CGST, SGST, and IGST based on intra-state vs inter-state transactions. 
          Perfect for understanding GST distribution across states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Split className="h-5 w-5" />
                CGST/SGST/IGST Splitter
              </CardTitle>
              <CardDescription>
                Enter amount and select states to calculate GST split
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Base Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="base-amount">Base Amount (₹)</Label>
                <Input
                  id="base-amount"
                  type="number"
                  placeholder="Enter base amount"
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(e.target.value)}
                  className="text-lg"
                />
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

              {/* State Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-state">From State</Label>
                  <Select value={fromState} onValueChange={setFromState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select from state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-state">To State</Label>
                  <Select value={toState} onValueChange={setToState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select to state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculateGSTSplit} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate GST Split
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
                  GST Split Calculation Result
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
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Transaction Type:</span>
                      <Badge variant={calculation.transactionType === 'intra-state' ? 'default' : 'secondary'}>
                        {calculation.transactionType === 'intra-state' ? 'Intra-state' : 'Inter-state'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {calculation.transactionType === 'intra-state' ? (
                      <>
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <span className="font-medium">CGST ({calculation.cgstRate}%):</span>
                          <span className="font-bold text-lg text-green-600">₹{calculation.cgst}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <span className="font-medium">SGST ({calculation.sgstRate}%):</span>
                          <span className="font-bold text-lg text-purple-600">₹{calculation.sgst}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <span className="font-medium">IGST ({calculation.igstRate}%):</span>
                        <span className="font-bold text-lg text-orange-600">₹{calculation.igst}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-lg text-indigo-600">₹{calculation.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Transaction Type Explanation */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Transaction Type Explanation:</h4>
                  <div className="text-sm space-y-1">
                    {calculation.transactionType === 'intra-state' ? (
                      <>
                        <p><strong>Intra-state Transaction:</strong> Transaction within the same state</p>
                        <p>• CGST (Central GST): {calculation.cgstRate}% = ₹{calculation.cgst}</p>
                        <p>• SGST (State GST): {calculation.sgstRate}% = ₹{calculation.sgst}</p>
                        <p>• Total GST: ₹{calculation.gstAmount}</p>
                      </>
                    ) : (
                      <>
                        <p><strong>Inter-state Transaction:</strong> Transaction between different states</p>
                        <p>• IGST (Integrated GST): {calculation.igstRate}% = ₹{calculation.igst}</p>
                        <p>• Total GST: ₹{calculation.gstAmount}</p>
                      </>
                    )}
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

          {/* Transaction Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Transaction Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Intra-state</h4>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Same state transaction: CGST + SGST
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">Inter-state</h4>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Different state transaction: IGST
                </p>
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
                          {calc.transactionType === 'intra-state' ? 'Intra' : 'Inter'}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Base: ₹{calc.baseAmount} • GST: ₹{calc.gstAmount}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {calc.transactionType === 'intra-state' ? 
                          `CGST: ₹${calc.cgst} • SGST: ₹${calc.sgst}` :
                          `IGST: ₹${calc.igst}`}
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
                <MapPin className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Same state = CGST + SGST, Different state = IGST</span>
              </div>
              <div className="flex items-start gap-2">
                <Calculator className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>CGST and SGST are split equally (50% each)</span>
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

export default function CGSTSGSTIGSTSplitterPage() {
  return (
    <ToolPageWrapper toolSlug="cgst-sgst-igst-splitter">
      <CGSTSGSTIGSTSplitterContent />
    </ToolPageWrapper>
  );
}

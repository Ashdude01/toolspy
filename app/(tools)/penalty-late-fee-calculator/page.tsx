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
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface PenaltyCalculation {
  returnType: string;
  dueDate: string;
  filingDate: string;
  daysLate: number;
  lateFee: number;
  interest: number;
  totalPenalty: number;
  taxAmount: number;
  interestRate: number;
}

const RETURN_TYPES = [
  { type: "GSTR-1", dueDate: "11th of next month", description: "Outward supplies return" },
  { type: "GSTR-3B", dueDate: "20th of next month", description: "Monthly summary return" },
  { type: "GSTR-9", dueDate: "31st December", description: "Annual return" },
  { type: "GSTR-9C", dueDate: "31st December", description: "Reconciliation statement" },
  { type: "GSTR-4", dueDate: "18th of next quarter", description: "Composition return" },
];

const INTEREST_RATES = [
  { rate: 18, description: "Standard interest rate (18% p.a.)" },
  { rate: 24, description: "Higher interest rate (24% p.a.)" },
  { rate: 12, description: "Lower interest rate (12% p.a.)" },
];

function PenaltyLateFeeCalculatorContent() {
  const [returnType, setReturnType] = useState<string>("GSTR-3B");
  const [dueDate, setDueDate] = useState<string>("");
  const [filingDate, setFilingDate] = useState<string>("");
  const [taxAmount, setTaxAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<number>(18);
  const [calculation, setCalculation] = useState<PenaltyCalculation | null>(null);
  const [history, setHistory] = useState<PenaltyCalculation[]>([]);

  const calculatePenalty = () => {
    const taxValue = parseFloat(taxAmount);
    if (isNaN(taxValue) || taxValue <= 0 || !dueDate || !filingDate) return;

    const due = new Date(dueDate);
    const filing = new Date(filingDate);
    const daysLate = Math.max(0, Math.ceil((filing.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));

    // Calculate late fee (simplified - varies by return type)
    let lateFee = 0;
    if (daysLate > 0) {
      if (returnType === "GSTR-1" || returnType === "GSTR-3B") {
        lateFee = Math.min(daysLate * 200, 5000); // ₹200 per day, max ₹5000
      } else if (returnType === "GSTR-9" || returnType === "GSTR-9C") {
        lateFee = Math.min(daysLate * 200, 10000); // ₹200 per day, max ₹10000
      } else {
        lateFee = Math.min(daysLate * 200, 5000); // Default
      }
    }

    // Calculate interest
    const interest = (taxValue * interestRate * daysLate) / (100 * 365);

    const newCalculation: PenaltyCalculation = {
      returnType,
      dueDate,
      filingDate,
      daysLate,
      lateFee: Math.round(lateFee * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      totalPenalty: Math.round((lateFee + interest) * 100) / 100,
      taxAmount: taxValue,
      interestRate,
    };

    setCalculation(newCalculation);
    setHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (taxAmount && dueDate && filingDate && !isNaN(parseFloat(taxAmount))) {
      calculatePenalty();
    }
  }, [returnType, dueDate, filingDate, taxAmount, interestRate]);

  const copyResult = () => {
    if (!calculation) return;
    
    const resultText = `Penalty Calculation Result:
Return Type: ${calculation.returnType}
Due Date: ${calculation.dueDate}
Filing Date: ${calculation.filingDate}
Days Late: ${calculation.daysLate}
Tax Amount: ₹${calculation.taxAmount}
Late Fee: ₹${calculation.lateFee}
Interest (${calculation.interestRate}%): ₹${calculation.interest}
Total Penalty: ₹${calculation.totalPenalty}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!calculation) return;
    
    const resultText = `Penalty Calculation Report
Generated on: ${new Date().toLocaleDateString()}

Calculation Details:
Return Type: ${calculation.returnType}
Due Date: ${calculation.dueDate}
Filing Date: ${calculation.filingDate}
Days Late: ${calculation.daysLate}
Tax Amount: ₹${calculation.taxAmount}
Late Fee: ₹${calculation.lateFee}
Interest Rate: ${calculation.interestRate}% p.a.
Interest: ₹${calculation.interest}
Total Penalty: ₹${calculation.totalPenalty}

This calculation is for reference purposes only.
Please verify with official GST portal for official penalty calculations.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `penalty-calculation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setReturnType("GSTR-3B");
    setDueDate("");
    setFilingDate("");
    setTaxAmount("");
    setInterestRate(18);
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
          Penalty/Late Fee Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Auto-calculate GSTR filing late fees and interest with Toolspy's professional calculator. 
          Perfect for understanding penalty implications and compliance planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Penalty/Late Fee Calculator
              </CardTitle>
              <CardDescription>
                Calculate late fees and interest for GSTR filing delays
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Return Type */}
              <div className="space-y-2">
                <Label htmlFor="return-type">Return Type</Label>
                <Select value={returnType} onValueChange={setReturnType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RETURN_TYPES.map((type) => (
                      <SelectItem key={type.type} value={type.type}>
                        {type.type} - {type.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Filing Date */}
              <div className="space-y-2">
                <Label htmlFor="filing-date">Filing Date</Label>
                <Input
                  id="filing-date"
                  type="date"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Tax Amount */}
              <div className="space-y-2">
                <Label htmlFor="tax-amount">Tax Amount (₹)</Label>
                <Input
                  id="tax-amount"
                  type="number"
                  placeholder="Enter tax amount"
                  value={taxAmount}
                  onChange={(e) => setTaxAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
                <Select value={interestRate.toString()} onValueChange={(value) => setInterestRate(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_RATES.map((rate) => (
                      <SelectItem key={rate.rate} value={rate.rate.toString()}>
                        {rate.rate}% - {rate.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculatePenalty} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Penalty
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
                  Penalty Calculation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Return Type:</span>
                      <span className="font-bold">{calculation.returnType}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Days Late:</span>
                      <span className="font-bold text-lg">{calculation.daysLate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Tax Amount:</span>
                      <span className="font-bold text-lg">₹{calculation.taxAmount}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="font-medium">Late Fee:</span>
                      <span className="font-bold text-lg text-red-600">₹{calculation.lateFee}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <span className="font-medium">Interest ({calculation.interestRate}%):</span>
                      <span className="font-bold text-lg text-orange-600">₹{calculation.interest}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <span className="font-medium">Total Penalty:</span>
                      <span className="font-bold text-lg text-indigo-600">₹{calculation.totalPenalty}</span>
                    </div>
                  </div>
                </div>

                {/* Penalty Breakdown */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Penalty Breakdown:</h4>
                  <div className="text-sm space-y-1">
                    <p>• Return Type: {calculation.returnType}</p>
                    <p>• Due Date: {calculation.dueDate}</p>
                    <p>• Filing Date: {calculation.filingDate}</p>
                    <p>• Days Late: {calculation.daysLate}</p>
                    <p>• Late Fee: ₹{calculation.lateFee}</p>
                    <p>• Interest ({calculation.interestRate}% p.a.): ₹{calculation.interest}</p>
                    <p>• <strong>Total Penalty: ₹{calculation.totalPenalty}</strong></p>
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
          {/* Return Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Return Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {RETURN_TYPES.map((type) => (
                  <div key={type.type} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{type.type}</span>
                      {type.type === returnType && (
                        <Badge variant="default" className="text-xs">Selected</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                    <p className="text-xs text-muted-foreground">Due: {type.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interest Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Interest Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {INTEREST_RATES.map((rate) => (
                  <div key={rate.rate} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{rate.rate}% p.a.</span>
                      {rate.rate === interestRate && (
                        <Badge variant="default" className="text-xs">Selected</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{rate.description}</p>
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
                        <span className="font-medium">{calc.returnType}</span>
                        <Badge variant="outline" className="text-xs">
                          {calc.daysLate} days
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Penalty: ₹{calc.totalPenalty} • Tax: ₹{calc.taxAmount}
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
                <Clock className="h-4 w-4 mt-0.5 text-red-600" />
                <span>Late fees increase with delay in filing</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Interest is calculated on daily basis</span>
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

export default function PenaltyLateFeeCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="penalty-late-fee-calculator">
      <PenaltyLateFeeCalculatorContent />
    </ToolPageWrapper>
  );
}

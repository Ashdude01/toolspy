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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Calculator,
  Receipt,
  DollarSign,
  PieChart,
  Shield,
  RefreshCw,
  TrendingDown,
  FileText,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface TaxResult {
  grossIncome: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
  takeHomePercent: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

function TaxCalculatorContent() {
  const { showToast } = useToast();
  const [grossIncome, setGrossIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [state, setState] = useState("ca");
  const [deductions, setDeductions] = useState("");
  const [dependents, setDependents] = useState("");
  const [result, setResult] = useState<TaxResult | null>(null);

  // Federal tax brackets for 2024 (simplified)
  const federalBrackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 }
    ],
    marriedJoint: [
      { min: 0, max: 22000, rate: 0.10 },
      { min: 22000, max: 89450, rate: 0.12 },
      { min: 89450, max: 190750, rate: 0.22 },
      { min: 190750, max: 364200, rate: 0.24 },
      { min: 364200, max: 462500, rate: 0.32 },
      { min: 462500, max: 693750, rate: 0.35 },
      { min: 693750, max: Infinity, rate: 0.37 }
    ]
  };

  // State tax rates (simplified)
  const stateTaxRates = {
    ca: 0.08, // California
    ny: 0.07, // New York
    tx: 0.00, // Texas
    fl: 0.00, // Florida
    wa: 0.00, // Washington
    il: 0.0495, // Illinois
    pa: 0.0307, // Pennsylvania
    oh: 0.0399, // Ohio
    nc: 0.0475, // North Carolina
    ga: 0.0549, // Georgia
  };

  const calculateTax = () => {
    const income = parseFloat(grossIncome);
    const standardDeduction = filingStatus === "single" ? 13850 : 27700;
    const itemizedDeductions = parseFloat(deductions) || 0;
    const numDependents = parseInt(dependents) || 0;

    if (!income || income <= 0) {
      showToast("Please enter a valid gross income", "error");
      return;
    }

    // Calculate taxable income
    const totalDeductions = Math.max(standardDeduction, itemizedDeductions);
    const taxableIncome = Math.max(0, income - totalDeductions);

    // Calculate federal tax
    const brackets = federalBrackets[filingStatus as keyof typeof federalBrackets];
    let federalTax = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        federalTax += taxableInBracket * bracket.rate;
        marginalRate = bracket.rate;
      }
    }

    // Calculate state tax (simplified flat rate)
    const stateRate = stateTaxRates[state as keyof typeof stateTaxRates];
    const stateTax = taxableIncome * stateRate;

    // Calculate payroll taxes
    const socialSecurityTax = Math.min(income * 0.062, 160200 * 0.062); // 2024 cap
    const medicareTax = income * 0.0145;

    // Calculate totals
    const totalTax = federalTax + stateTax + socialSecurityTax + medicareTax;
    const netIncome = income - totalTax;
    const effectiveRate = (totalTax / income) * 100;
    const takeHomePercent = (netIncome / income) * 100;

    // Create breakdown
    const breakdown = [
      { category: "Federal Tax", amount: federalTax, percentage: (federalTax / income) * 100 },
      { category: "State Tax", amount: stateTax, percentage: (stateTax / income) * 100 },
      { category: "Social Security", amount: socialSecurityTax, percentage: (socialSecurityTax / income) * 100 },
      { category: "Medicare", amount: medicareTax, percentage: (medicareTax / income) * 100 },
      { category: "Take Home", amount: netIncome, percentage: takeHomePercent },
    ];

    const taxResult: TaxResult = {
      grossIncome: income,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      totalTax,
      netIncome,
      effectiveRate,
      marginalRate: marginalRate * 100,
      takeHomePercent,
      breakdown
    };

    setResult(taxResult);
    showToast("Tax calculation completed!", "success");
  };

  const resetCalculator = () => {
    setGrossIncome("");
    setFilingStatus("single");
    setState("ca");
    setDeductions("");
    setDependents("");
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getStateNames = () => {
    const stateNames = {
      ca: "California",
      ny: "New York",
      tx: "Texas",
      fl: "Florida",
      wa: "Washington",
      il: "Illinois",
      pa: "Pennsylvania",
      oh: "Ohio",
      nc: "North Carolina",
      ga: "Georgia"
    };
    return stateNames;
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

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-600 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Tax Calculator
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate federal and state income taxes, payroll taxes, and take-home pay. 
          Get detailed tax breakdown and effective tax rates.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-green-500" />
            Tax Information
          </CardTitle>
          <CardDescription>
            Enter your income and tax details for 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grossIncome">Annual Gross Income ($) <span className="text-red-500" aria-label="required">*</span></Label>
              <Input
                id="grossIncome"
                type="number"
                placeholder="75000"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                step="1000"
                min="0"
                required
                aria-required="true"
                aria-label="Enter annual gross income"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filing-status-select">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger id="filing-status-select" aria-label="Select tax filing status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="marriedJoint">Married Filing Jointly</SelectItem>
                  <SelectItem value="marriedSeparate">Married Filing Separately</SelectItem>
                  <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state-select">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state-select" aria-label="Select state for state tax calculation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(getStateNames()).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deductions">Itemized Deductions ($) - Optional</Label>
              <Input
                id="deductions"
                type="number"
                placeholder="0"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                step="100"
                min="0"
                aria-label="Enter itemized deductions amount (optional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="0"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                step="1"
                min="0"
                max="10"
                aria-label="Enter number of dependents"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-year-display" className="text-sm text-muted-foreground">Tax Year</Label>
              <div id="tax-year-display" className="flex items-center h-10 px-3 border rounded-md bg-muted" aria-label="Tax year: 2024">
                <span className="text-sm">2024</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateTax} 
              className="flex-1"
              disabled={!grossIncome}
              aria-label="Calculate tax based on entered income and tax details"
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Calculate Tax
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="flex-1 sm:flex-initial"
              aria-label="Reset calculator and clear all fields"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tax Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Tax Calculation Results
            </CardTitle>
            <CardDescription>
              Your tax breakdown and take-home pay analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Take-Home Pay Highlight */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatCurrency(result.netIncome)}
              </div>
              <div className="text-lg text-muted-foreground mb-2">Annual Take-Home Pay</div>
              <div className="text-sm text-muted-foreground">
                {formatPercent(result.takeHomePercent)} of gross income
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatCurrency(result.federalTax)}
                  </div>
                  <div className="text-sm text-muted-foreground">Federal Tax</div>
                </div>
              </Card>
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.stateTax)}
                  </div>
                  <div className="text-sm text-muted-foreground">State Tax</div>
                </div>
              </Card>
              <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatCurrency(result.socialSecurityTax)}
                  </div>
                  <div className="text-sm text-muted-foreground">Social Security</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(result.medicareTax)}
                  </div>
                  <div className="text-sm text-muted-foreground">Medicare</div>
                </div>
              </Card>
            </div>

            {/* Tax Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Tax Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Income:</span>
                    <span className="font-semibold">{formatCurrency(result.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Tax:</span>
                    <span className="font-semibold">{formatCurrency(result.totalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Income:</span>
                    <span className="font-semibold">{formatCurrency(result.netIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Tax Rate:</span>
                    <span className="font-semibold">{formatPercent(result.effectiveRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marginal Tax Rate:</span>
                    <span className="font-semibold">{formatPercent(result.marginalRate)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5" />
                    Income Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.breakdown.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{item.category}</span>
                          <span className="text-sm font-semibold">{formatPercent(item.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.category === "Take Home" ? "bg-green-500" : 
                              item.category === "Federal Tax" ? "bg-red-500" :
                              item.category === "State Tax" ? "bg-blue-500" :
                              item.category === "Social Security" ? "bg-orange-500" :
                              "bg-purple-500"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly and Weekly Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-5 w-5" />
                  Pay Period Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(result.netIncome / 12)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Take-Home</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(result.netIncome / 26)}</div>
                    <div className="text-sm text-muted-foreground">Bi-Weekly Take-Home</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(result.netIncome / 52)}</div>
                    <div className="text-sm text-muted-foreground">Weekly Take-Home</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Tax Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Tax Planning Tips</CardTitle>
          <CardDescription>
            Strategies to optimize your tax situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Maximize Deductions</div>
              <div className="text-muted-foreground">
                Compare itemized vs. standard deductions to minimize taxable income
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Retirement Contributions</div>
              <div className="text-muted-foreground">
                401(k) and IRA contributions can reduce your taxable income
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Tax Credits</div>
              <div className="text-muted-foreground">
                Credits like Child Tax Credit directly reduce tax owed
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Professional Help</div>
              <div className="text-muted-foreground">
                Consider consulting a tax professional for complex situations
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This calculator provides estimates based on simplified tax rules and should not be used for actual tax preparation. 
            Tax laws are complex and change frequently. Please consult a qualified tax professional for personalized advice and accurate calculations.
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function TaxCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="tax-calculator"><ToastProvider>
      <TaxCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 
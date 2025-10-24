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
  Home,
  Calculator,
  DollarSign,
  TrendingUp,
  Shield,
  RefreshCw,
  PieChart,
  Building,
} from "lucide-react";
import { MortgageCalculatorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface MortgageResult {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanToValue: number;
  debtToIncomeRatio: number;
  affordability: {
    maxLoanAmount: number;
    maxHomePrice: number;
    recommendedPayment: number;
  };
}

function MortgageCalculatorContent() {
  const { showToast } = useToast();
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [homeInsurance, setHomeInsurance] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [result, setResult] = useState<MortgageResult | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;
    const taxes = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const debt = parseFloat(monthlyDebt) || 0;

    if (!price || !down || !interestRate || price <= 0 || down < 0 || parseFloat(interestRate) <= 0) {
      showToast("Please enter valid mortgage details", "error");
      return;
    }

    const loanAmount = price - down;
    if (loanAmount <= 0) {
      showToast("Down payment cannot be greater than or equal to home price", "error");
      return;
    }

    // Calculate monthly principal and interest
    const monthlyPI = loanAmount * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    const monthlyTaxes = taxes / 12;
    const monthlyInsurance = insurance / 12;
    
    // Calculate PMI (if down payment is less than 20%)
    const loanToValue = (loanAmount / price) * 100;
    const monthlyPMI = loanToValue > 80 ? (loanAmount * 0.005) / 12 : 0;

    const totalMonthlyPayment = monthlyPI + monthlyTaxes + monthlyInsurance + monthlyPMI;
    const totalPayment = (monthlyPI * payments) + (monthlyTaxes * payments) + (monthlyInsurance * payments) + (monthlyPMI * payments);
    const totalInterest = (monthlyPI * payments) - loanAmount;

    // Calculate debt-to-income ratio
    const debtToIncomeRatio = income > 0 ? ((totalMonthlyPayment + debt) / income) * 100 : 0;

    // Calculate affordability
    const recommendedPayment = income * 0.28; // 28% rule
    const maxTotalPayment = income * 0.36; // 36% rule including all debts
    const maxPaymentForMortgage = maxTotalPayment - debt;
    const maxLoanAmount = maxPaymentForMortgage > 0 ? 
      (maxPaymentForMortgage * (Math.pow(1 + rate, payments) - 1)) / (rate * Math.pow(1 + rate, payments)) : 0;
    const maxHomePrice = maxLoanAmount + down;

    const mortgageResult: MortgageResult = {
      monthlyPayment: monthlyPI,
      principalAndInterest: monthlyPI,
      monthlyTaxes,
      monthlyInsurance,
      monthlyPMI,
      totalMonthlyPayment,
      totalPayment,
      totalInterest,
      loanToValue,
      debtToIncomeRatio,
      affordability: {
        maxLoanAmount,
        maxHomePrice,
        recommendedPayment
      }
    };

    setResult(mortgageResult);
    showToast("Mortgage calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setHomePrice("");
    setDownPayment("");
    setLoanTerm("30");
    setInterestRate("");
    setPropertyTax("");
    setHomeInsurance("");
    setMonthlyIncome("");
    setMonthlyDebt("");
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

  const getAffordabilityStatus = (ratio: number) => {
    if (ratio <= 28) return { status: "Excellent", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" };
    if (ratio <= 36) return { status: "Good", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    if (ratio <= 43) return { status: "Acceptable", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" };
    return { status: "High Risk", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
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
          Mortgage Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate mortgage payments, analyze affordability, and understand your home buying potential. 
          Get detailed breakdowns including taxes, insurance, and PMI.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-500" />
            Mortgage Details
          </CardTitle>
          <CardDescription>
            Enter your home purchase and loan information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price ($)</Label>
              <Input
                id="homePrice"
                type="number"
                placeholder="350000"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                step="1000"
                min="1000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input
                id="downPayment"
                type="number"
                placeholder="70000"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                step="1000"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Loan Term</Label>
              <Select value={loanTerm} onValueChange={setLoanTerm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="25">25 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="6.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.1"
                min="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
              <Input
                id="propertyTax"
                type="number"
                placeholder="4200"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                step="100"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeInsurance">Annual Home Insurance ($)</Label>
              <Input
                id="homeInsurance"
                type="number"
                placeholder="1200"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                step="100"
                min="0"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Affordability Analysis (Optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Gross Income ($)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="7000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  step="100"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyDebt">Monthly Debt Payments ($)</Label>
                <Input
                  id="monthlyDebt"
                  type="number"
                  placeholder="500"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(e.target.value)}
                  step="50"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateMortgage} 
              className="flex-1"
              disabled={!homePrice || !downPayment || !interestRate}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Mortgage
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mortgage Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Mortgage Payment Breakdown
            </CardTitle>
            <CardDescription>
              Your monthly mortgage payment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Monthly Payment Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.principalAndInterest)}
                  </div>
                  <div className="text-sm text-muted-foreground">Principal & Interest</div>
                </div>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.monthlyTaxes)}
                  </div>
                  <div className="text-sm text-muted-foreground">Property Taxes</div>
                </div>
              </Card>
              <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatCurrency(result.monthlyInsurance)}
                  </div>
                  <div className="text-sm text-muted-foreground">Home Insurance</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(result.monthlyPMI)}
                  </div>
                  <div className="text-sm text-muted-foreground">PMI</div>
                </div>
              </Card>
            </div>

            {/* Total Monthly Payment */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatCurrency(result.totalMonthlyPayment)}
                </div>
                <div className="text-lg text-muted-foreground">Total Monthly Payment</div>
              </CardContent>
            </Card>

            {/* Loan Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5" />
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Home Price:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(homePrice))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(homePrice) - parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan-to-Value:</span>
                    <span className="font-semibold">{result.loanToValue.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Principal & Interest</span>
                        <span className="font-semibold">{((result.principalAndInterest / result.totalMonthlyPayment) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(result.principalAndInterest / result.totalMonthlyPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Taxes & Insurance</span>
                        <span className="font-semibold">{(((result.monthlyTaxes + result.monthlyInsurance) / result.totalMonthlyPayment) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${((result.monthlyTaxes + result.monthlyInsurance) / result.totalMonthlyPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {result.monthlyPMI > 0 && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>PMI</span>
                          <span className="font-semibold">{((result.monthlyPMI / result.totalMonthlyPayment) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(result.monthlyPMI / result.totalMonthlyPayment) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Affordability Analysis */}
            {monthlyIncome && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Affordability Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Income:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(monthlyIncome))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Monthly Debt:</span>
                        <span className="font-semibold">{formatCurrency(result.totalMonthlyPayment + parseFloat(monthlyDebt || "0"))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Debt-to-Income Ratio:</span>
                        <span className={`font-semibold ${getAffordabilityStatus(result.debtToIncomeRatio).color}`}>
                          {result.debtToIncomeRatio.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${getAffordabilityStatus(result.debtToIncomeRatio).bg}`}>
                      <div className="text-center">
                        <div className={`text-lg font-semibold ${getAffordabilityStatus(result.debtToIncomeRatio).color}`}>
                          {getAffordabilityStatus(result.debtToIncomeRatio).status}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Affordability Status
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Mortgage Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Mortgage Tips & Guidelines</CardTitle>
          <CardDescription>
            Important considerations for your mortgage decision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">20% Down Payment</div>
              <div className="text-muted-foreground">
                Putting down 20% avoids PMI and reduces monthly payments
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">28% Rule</div>
              <div className="text-muted-foreground">
                Housing costs should not exceed 28% of gross monthly income
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">36% Total Debt</div>
              <div className="text-muted-foreground">
                Total monthly debt payments should be under 36% of income
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Emergency Fund</div>
              <div className="text-muted-foreground">
                Keep 3-6 months of expenses saved after buying a home
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <MortgageCalculatorSEOContent />
    </div>
  );
}

export default function MortgageCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="mortgage-calculator"><ToastProvider>
      <MortgageCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 
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
  DollarSign,
  TrendingUp,
  Calendar,
  Shield,
  RefreshCw,
  PieChart,
} from "lucide-react";
import { LoanCalculatorSEOContent } from "./seo-content";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: string;
  loanToValue?: number;
  schedule: {
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    month: number;
  }[];
}

function LoanCalculatorContent() {
  const { showToast } = useToast();
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanType, setLoanType] = useState("personal");
  const [downPayment, setDownPayment] = useState("");
  const [result, setResult] = useState<LoanResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const payments = parseFloat(loanTerm) * 12; // Number of payments
    const down = parseFloat(downPayment) || 0;

    if (!principal || !interestRate || !loanTerm || principal <= 0 || parseFloat(interestRate) <= 0 || parseFloat(loanTerm) <= 0) {
      showToast("Please enter valid loan details", "error");
      return;
    }

    const actualLoanAmount = principal - down;

    if (actualLoanAmount <= 0) {
      showToast("Loan amount must be greater than down payment", "error");
      return;
    }

    // Calculate monthly payment using PMT formula
    const monthlyPayment = actualLoanAmount * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - actualLoanAmount;

    // Calculate payoff date
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + payments);

    // Generate amortization schedule
    const schedule = [];
    let balance = actualLoanAmount;
    
    for (let month = 1; month <= payments; month++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        month
      });
    }

    const loanToValue = down > 0 ? (actualLoanAmount / principal) * 100 : undefined;

    const loanResult: LoanResult = {
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString(),
      loanToValue,
      schedule
    };

    setResult(loanResult);
    showToast("Loan calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setDownPayment("");
    setResult(null);
    setShowSchedule(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
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

        <h1 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-600 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Loan Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate loan payments, total interest, and view detailed amortization schedules. 
          Perfect for mortgages, auto loans, personal loans, and more.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-500" />
            Loan Details
          </CardTitle>
          <CardDescription>
            Enter your loan information to calculate monthly payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Loan Type</Label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="auto">Auto Loan</SelectItem>
                <SelectItem value="home">Home/Mortgage</SelectItem>
                <SelectItem value="student">Student Loan</SelectItem>
                <SelectItem value="business">Business Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                step="100"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="5.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.1"
                min="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input
                id="loanTerm"
                type="number"
                placeholder="5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                step="1"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment ($) - Optional</Label>
              <Input
                id="downPayment"
                type="number"
                placeholder="0"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                step="100"
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateLoan} 
              className="flex-1"
              disabled={!loanAmount || !interestRate || !loanTerm}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Loan
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

      {/* Loan Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Loan Calculation Results
            </CardTitle>
            <CardDescription>
              Your loan payment breakdown and schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.monthlyPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Payment</div>
                </div>
              </Card>
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.totalPayment)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Payment</div>
                </div>
              </Card>
              <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatCurrency(result.totalInterest)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {result.payoffDate}
                  </div>
                  <div className="text-sm text-muted-foreground">Payoff Date</div>
                </div>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Principal Amount:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(loanAmount) - (parseFloat(downPayment) || 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-semibold">{interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term:</span>
                    <span className="font-semibold">{loanTerm} years</span>
                  </div>
                  {result.loanToValue && (
                    <div className="flex justify-between">
                      <span>Loan-to-Value:</span>
                      <span className="font-semibold">{result.loanToValue.toFixed(1)}%</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Principal</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(loanAmount) - (parseFloat(downPayment) || 0))}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${((parseFloat(loanAmount) - (parseFloat(downPayment) || 0)) / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Interest</span>
                        <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Amortization Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Amortization Schedule
                </CardTitle>
                <CardDescription>
                  Monthly payment breakdown over the loan term
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    View detailed payment schedule showing principal and interest breakdown
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSchedule(!showSchedule)}
                  >
                    {showSchedule ? 'Hide' : 'Show'} Schedule
                  </Button>
                </div>
                
                {showSchedule && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Month</th>
                          <th className="text-right p-2">Payment</th>
                          <th className="text-right p-2">Principal</th>
                          <th className="text-right p-2">Interest</th>
                          <th className="text-right p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="max-h-96 overflow-y-auto">
                        {result.schedule.slice(0, 12).map((month, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="p-2">{month.month}</td>
                            <td className="text-right p-2">{formatCurrency(month.payment)}</td>
                            <td className="text-right p-2">{formatCurrency(month.principal)}</td>
                            <td className="text-right p-2">{formatCurrency(month.interest)}</td>
                            <td className="text-right p-2">{formatCurrency(month.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {result.schedule.length > 12 && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Showing first 12 months of {result.schedule.length} total payments
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Loan Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Loan Tips & Information</CardTitle>
          <CardDescription>
            Important considerations for your loan decision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Interest Rate Impact</div>
              <div className="text-muted-foreground">
                A 1% difference in interest rate can save/cost thousands over the loan term
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Loan Term Trade-offs</div>
              <div className="text-muted-foreground">
                Longer terms = lower monthly payments but more total interest paid
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Down Payment Benefits</div>
              <div className="text-muted-foreground">
                Larger down payments reduce monthly costs and may eliminate PMI
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Extra Payments</div>
              <div className="text-muted-foreground">
                Even small extra payments can significantly reduce total interest
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <LoanCalculatorSEOContent />
    </div>
  );
}

export default function LoanCalculatorPage() {
  return (
    <ToastProvider>
      <LoanCalculatorContent />
    </ToastProvider>
  );
} 
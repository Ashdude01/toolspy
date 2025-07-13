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
  TrendingUp,
  Calculator,
  DollarSign,
  PieChart,
  Shield,
  RefreshCw,
  Target,
  Calendar,
} from "lucide-react";
import { InvestmentCalculatorSEOContent } from "./seo-content";

interface InvestmentResult {
  finalValue: number;
  totalContributions: number;
  totalGrowth: number;
  monthlyContributions: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    growth: number;
  }[];
  monthlyRequired: number;
  timeToGoal: number;
}

function InvestmentCalculatorContent() {
  const { showToast } = useToast();
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [inflationRate, setInflationRate] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [calculationType, setCalculationType] = useState("growth");

  const calculateInvestment = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100;
    const years = parseFloat(timeHorizon);
    const inflation = parseFloat(inflationRate) / 100 || 0;
    const goal = parseFloat(investmentGoal) || 0;

    if ((!initial && !monthly) || !rate || !years || rate < 0 || years <= 0) {
      showToast("Please enter valid investment details", "error");
      return;
    }

    const periods = compoundFrequency === "monthly" ? 12 : 
                   compoundFrequency === "quarterly" ? 4 : 
                   compoundFrequency === "annual" ? 1 : 12;
    
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    
    // Calculate future value with compound interest
    let balance = initial;
    let totalContributions = initial;
    const yearlyBreakdown = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthly;
      totalContributions += monthly;
      
      if (month % 12 === 0) {
        const year = month / 12;
        yearlyBreakdown.push({
          year,
          balance,
          contributions: totalContributions,
          growth: balance - totalContributions
        });
      }
    }

    const finalValue = balance;
    const totalGrowth = finalValue - totalContributions;
    
    // Calculate monthly required to reach goal
    let monthlyRequired = 0;
    let timeToGoal = 0;
    
    if (goal > 0) {
      // Calculate required monthly payment to reach goal
      const goalMinusInitial = goal - initial;
      const futureValueFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      monthlyRequired = goalMinusInitial / futureValueFactor;
      
      // Calculate time to reach goal with current contributions
      if (monthly > 0) {
        const logNumerator = Math.log(1 + (goal - initial) * monthlyRate / monthly);
        const logDenominator = Math.log(1 + monthlyRate);
        timeToGoal = logNumerator / logDenominator / 12;
      }
    }

    const investmentResult: InvestmentResult = {
      finalValue,
      totalContributions,
      totalGrowth,
      monthlyContributions: monthly,
      yearlyBreakdown,
      monthlyRequired,
      timeToGoal
    };

    setResult(investmentResult);
    showToast("Investment calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setInitialAmount("");
    setMonthlyContribution("");
    setAnnualReturn("");
    setTimeHorizon("");
    setInflationRate("");
    setInvestmentGoal("");
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
          Investment Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate investment growth with compound interest. Plan for retirement, analyze returns, 
          and determine how much you need to save to reach your financial goals.
        </p>
      </div>

      {/* Calculator Type Selection */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Calculation Type</CardTitle>
          <CardDescription>Choose what you want to calculate</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={calculationType} onValueChange={setCalculationType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="growth">Investment Growth</SelectItem>
              <SelectItem value="goal">Reach Investment Goal</SelectItem>
              <SelectItem value="time">Time to Reach Goal</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Investment Parameters
          </CardTitle>
          <CardDescription>
            Enter your investment details to calculate growth
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialAmount">Initial Investment ($)</Label>
              <Input
                id="initialAmount"
                type="number"
                placeholder="10000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                step="100"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                step="50"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                placeholder="7"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                step="0.1"
                min="0"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
              <Input
                id="timeHorizon"
                type="number"
                placeholder="20"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                step="1"
                min="1"
                max="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Compounding Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflation Rate (%) - Optional</Label>
              <Input
                id="inflationRate"
                type="number"
                placeholder="3"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                step="0.1"
                min="0"
                max="15"
              />
            </div>
          </div>

          {(calculationType === "goal" || calculationType === "time") && (
            <div className="space-y-2">
              <Label htmlFor="investmentGoal">Investment Goal ($)</Label>
              <Input
                id="investmentGoal"
                type="number"
                placeholder="1000000"
                value={investmentGoal}
                onChange={(e) => setInvestmentGoal(e.target.value)}
                step="1000"
                min="1000"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateInvestment} 
              className="flex-1"
              disabled={!annualReturn || !timeHorizon}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Investment
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

      {/* Investment Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Investment Projection Results
            </CardTitle>
            <CardDescription>
              Your investment growth analysis and projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.finalValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Final Value</div>
                </div>
              </Card>
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.totalContributions)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Contributions</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(result.totalGrowth)}
                  </div>
                  <div className="text-sm text-muted-foreground">Investment Growth</div>
                </div>
              </Card>
            </div>

            {/* Goal Analysis */}
            {(calculationType === "goal" || calculationType === "time") && investmentGoal && (
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Goal Analysis
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Investment Goal:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(investmentGoal))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Required:</span>
                        <span className="font-semibold">{formatCurrency(result.monthlyRequired)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time to Goal:</span>
                        <span className="font-semibold">{result.timeToGoal.toFixed(1)} years</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Contributions:</span>
                        <span className="font-semibold">{formatCurrency(result.monthlyContributions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gap:</span>
                        <span className={`font-semibold ${result.monthlyRequired > result.monthlyContributions ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(Math.abs(result.monthlyRequired - result.monthlyContributions))}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Growth Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5" />
                    Growth Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Contributions</span>
                        <span className="font-semibold">{formatPercent((result.totalContributions / result.finalValue) * 100)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(result.totalContributions / result.finalValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Investment Growth</span>
                        <span className="font-semibold">{formatPercent((result.totalGrowth / result.finalValue) * 100)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(result.totalGrowth / result.finalValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5" />
                    Investment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Initial Investment:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(initialAmount) || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Contributions:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(monthlyContribution) || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Return:</span>
                    <span className="font-semibold">{annualReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Horizon:</span>
                    <span className="font-semibold">{timeHorizon} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return Multiple:</span>
                    <span className="font-semibold">{(result.finalValue / result.totalContributions).toFixed(1)}x</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Yearly Growth Projection
                </CardTitle>
                <CardDescription>
                  Annual breakdown of your investment growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Balance</th>
                        <th className="text-right p-2">Contributions</th>
                        <th className="text-right p-2">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.slice(0, 10).map((year, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">{year.year}</td>
                          <td className="text-right p-2">{formatCurrency(year.balance)}</td>
                          <td className="text-right p-2">{formatCurrency(year.contributions)}</td>
                          <td className="text-right p-2">{formatCurrency(year.growth)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.yearlyBreakdown.length > 10 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Showing first 10 years of {result.yearlyBreakdown.length} total years
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Investment Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Investment Tips & Strategies</CardTitle>
          <CardDescription>
            Key principles for successful investing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Start Early</div>
              <div className="text-muted-foreground">
                Time is your greatest asset - compound interest works best over long periods
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Dollar-Cost Averaging</div>
              <div className="text-muted-foreground">
                Regular contributions help reduce the impact of market volatility
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Diversification</div>
              <div className="text-muted-foreground">
                Spread risk across different asset classes and sectors
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Stay Consistent</div>
              <div className="text-muted-foreground">
                Regular contributions, even small ones, add up significantly over time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <InvestmentCalculatorSEOContent />
    </div>
  );
}

export default function InvestmentCalculatorPage() {
  return (
    <ToastProvider>
      <InvestmentCalculatorContent />
    </ToastProvider>
  );
} 
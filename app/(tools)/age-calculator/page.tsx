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
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Calendar,
  Clock,
  Gift,
  Shield,
  Calculator,
  RefreshCw,
} from "lucide-react";
import { AgeCalculatorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: {
    date: string;
    daysUntil: number;
  };
}

function AgeCalculatorContent() {
  const { showToast } = useToast();
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [realTimeAge, setRealTimeAge] = useState<AgeResult | null>(null);

  useEffect(() => {
    // Set current date as default
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    // Update real-time age every minute if we have a result
    if (ageResult && birthDate) {
      const interval = setInterval(() => {
        calculateAge(birthDate, new Date().toISOString().split('T')[0], true);
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [ageResult, birthDate]);

  const calculateAge = (birth: string, current: string, isRealTime: boolean = false) => {
    if (!birth) {
      showToast("Please enter your birth date", "error");
      return;
    }

    const birthDateTime = new Date(birth);
    const currentDateTime = new Date(current);

    if (birthDateTime > currentDateTime) {
      showToast("Birth date cannot be in the future", "error");
      return;
    }

    // Calculate exact age
    let years = currentDateTime.getFullYear() - birthDateTime.getFullYear();
    let months = currentDateTime.getMonth() - birthDateTime.getMonth();
    let days = currentDateTime.getDate() - birthDateTime.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time lived
    const totalMs = currentDateTime.getTime() - birthDateTime.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMs / (1000 * 60));

    // Calculate time within current day
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    // Calculate next birthday
    const nextBirthday = new Date(currentDateTime.getFullYear(), birthDateTime.getMonth(), birthDateTime.getDate());
    if (nextBirthday < currentDateTime) {
      nextBirthday.setFullYear(currentDateTime.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDateTime.getTime()) / (1000 * 60 * 60 * 24));

    const result: AgeResult = {
      years,
      months,
      days,
      hours,
      minutes,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthday: {
        date: nextBirthday.toLocaleDateString(),
        daysUntil: daysUntilBirthday,
      },
    };

    if (isRealTime) {
      setRealTimeAge(result);
    } else {
      setAgeResult(result);
      setRealTimeAge(result);
      showToast("Age calculated successfully!", "success");
    }
  };

  const handleCalculate = () => {
    calculateAge(birthDate, currentDate);
  };

  const resetCalculator = () => {
    setBirthDate("");
    setCurrentDate(new Date().toISOString().split('T')[0]);
    setAgeResult(null);
    setRealTimeAge(null);
  };

  const displayAge = realTimeAge || ageResult;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Age Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your exact age in years, months, days, hours, and minutes. 
          Get detailed age statistics and find out when your next birthday is.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Age Calculation
          </CardTitle>
          <CardDescription>
            Enter your birth date to calculate your exact age
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentDate">Current Date</Label>
              <Input
                id="currentDate"
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleCalculate} 
              className="flex-1"
              disabled={!birthDate}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Age
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

      {/* Age Results */}
      {displayAge && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Your Age Details
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your age and time lived
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Age Display */}
            <div className="text-center mb-8">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {displayAge.years} Years
              </div>
              <div className="text-lg text-muted-foreground">
                {displayAge.months} months and {displayAge.days} days old
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{displayAge.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{displayAge.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{displayAge.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{displayAge.hours}:{displayAge.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-muted-foreground">Time Today</div>
              </div>
            </div>

            {/* Total Time Lived */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {displayAge.totalDays.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Days Lived</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {displayAge.totalHours.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Hours Lived</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {displayAge.totalMinutes.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Minutes Lived</div>
                </CardContent>
              </Card>
            </div>

            {/* Next Birthday */}
            <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 text-pink-600" />
                <h3 className="text-lg font-semibold mb-2">Next Birthday</h3>
                <div className="text-2xl font-bold text-pink-600 mb-1">
                  {displayAge.nextBirthday.daysUntil} days
                </div>
                <div className="text-sm text-muted-foreground">
                  {displayAge.nextBirthday.date}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Fun Facts */}
      {displayAge && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Fun Age Facts</CardTitle>
            <CardDescription>
              Interesting statistics about your time on Earth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary">Heartbeats</div>
                <div className="text-muted-foreground">
                  Approximately {(displayAge.totalMinutes * 72).toLocaleString()} beats
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary">Breaths Taken</div>
                <div className="text-muted-foreground">
                  Approximately {(displayAge.totalMinutes * 16).toLocaleString()} breaths
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary">Hours Slept</div>
                <div className="text-muted-foreground">
                  Approximately {Math.floor(displayAge.totalHours / 3).toLocaleString()} hours
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary">Weeks Lived</div>
                <div className="text-muted-foreground">
                  {Math.floor(displayAge.totalDays / 7).toLocaleString()} weeks
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content Section */}
      <AgeCalculatorSEOContent />
    </div>
  );
}

export default function AgeCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="age-calculator"><ToastProvider>
      <AgeCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 
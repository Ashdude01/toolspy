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
  Ruler,
  ArrowUpDown,
  Calculator,
  Move,
  Shield,
  RefreshCw,
  TrendingUp,
  Globe,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface LengthResult {
  inputValue: number;
  inputUnit: string;
  outputValue: number;
  outputUnit: string;
  allConversions: {
    millimeters: number;
    centimeters: number;
    meters: number;
    kilometers: number;
    inches: number;
    feet: number;
    yards: number;
    miles: number;
    nauticalMiles: number;
    lightYears: number;
  };
}

function LengthConverterContent() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("meters");
  const [outputUnit, setOutputUnit] = useState("feet");
  const [result, setResult] = useState<LengthResult | null>(null);

  // Conversion factors to meters
  const conversionFactors = {
    millimeters: 0.001,
    centimeters: 0.01,
    meters: 1,
    kilometers: 1000,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.344,
    nauticalMiles: 1852,
    lightYears: 9.461e15,
  };

  const unitSymbols = {
    millimeters: "mm",
    centimeters: "cm",
    meters: "m",
    kilometers: "km",
    inches: "in",
    feet: "ft",
    yards: "yd",
    miles: "mi",
    nauticalMiles: "nmi",
    lightYears: "ly",
  };

  const convertLength = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast("Please enter a valid length", "error");
      return;
    }

    // Convert input to meters first
    const meters = value * conversionFactors[inputUnit as keyof typeof conversionFactors];
    
    // Convert from meters to all other units
    const allConversions = {
      millimeters: meters / conversionFactors.millimeters,
      centimeters: meters / conversionFactors.centimeters,
      meters: meters / conversionFactors.meters,
      kilometers: meters / conversionFactors.kilometers,
      inches: meters / conversionFactors.inches,
      feet: meters / conversionFactors.feet,
      yards: meters / conversionFactors.yards,
      miles: meters / conversionFactors.miles,
      nauticalMiles: meters / conversionFactors.nauticalMiles,
      lightYears: meters / conversionFactors.lightYears,
    };

    const outputValue = allConversions[outputUnit as keyof typeof allConversions];

    const lengthResult: LengthResult = {
      inputValue: value,
      inputUnit,
      outputValue,
      outputUnit,
      allConversions,
    };

    setResult(lengthResult);
    showToast("Length converted successfully!", "success");
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
  };

  const resetConverter = () => {
    setInputValue("1");
    setInputUnit("meters");
    setOutputUnit("feet");
    setResult(null);
  };

  const formatValue = (value: number) => {
    if (value === 0) return "0";
    if (value >= 1e15) return value.toExponential(3);
    if (value >= 1e9) return (value / 1e9).toFixed(3) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(3) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(3) + "K";
    if (value >= 1) return value.toFixed(6).replace(/\.?0+$/, "");
    if (value >= 0.001) return value.toFixed(6).replace(/\.?0+$/, "");
    return value.toExponential(3);
  };

  const getUnitDisplayName = (unit: string) => {
    const names = {
      millimeters: "Millimeters",
      centimeters: "Centimeters", 
      meters: "Meters",
      kilometers: "Kilometers",
      inches: "Inches",
      feet: "Feet",
      yards: "Yards",
      miles: "Miles",
      nauticalMiles: "Nautical Miles",
      lightYears: "Light Years",
    };
    return names[unit as keyof typeof names];
  };

  const getUnitCategory = (unit: string) => {
    const metric = ["millimeters", "centimeters", "meters", "kilometers"];
    const imperial = ["inches", "feet", "yards", "miles"];
    const special = ["nauticalMiles", "lightYears"];
    
    if (metric.includes(unit)) return "metric";
    if (imperial.includes(unit)) return "imperial";
    if (special.includes(unit)) return "special";
    return "other";
  };

  useEffect(() => {
    if (inputValue) {
      convertLength();
    }
  }, [inputValue, inputUnit, outputUnit]);

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

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-green-600 dark:to-green-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Length Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of length and distance. 
          Support for metric, imperial, and special units with precise calculations.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-blue-500" />
            Length Conversion
          </CardTitle>
          <CardDescription>
            Enter a length value and select units to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Length Value <span className="text-red-500" aria-label="required">*</span></Label>
              <Input
                id="inputValue"
                type="number"
                placeholder="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="0.001"
                className="text-lg"
                required
                aria-required="true"
                aria-label="Enter length value to convert"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-unit-select">From Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="from-unit-select" aria-label="Select source length unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="millimeters">Millimeters (mm)</SelectItem>
                  <SelectItem value="centimeters">Centimeters (cm)</SelectItem>
                  <SelectItem value="meters">Meters (m)</SelectItem>
                  <SelectItem value="kilometers">Kilometers (km)</SelectItem>
                  <SelectItem value="inches">Inches (in)</SelectItem>
                  <SelectItem value="feet">Feet (ft)</SelectItem>
                  <SelectItem value="yards">Yards (yd)</SelectItem>
                  <SelectItem value="miles">Miles (mi)</SelectItem>
                  <SelectItem value="nauticalMiles">Nautical Miles (nmi)</SelectItem>
                  <SelectItem value="lightYears">Light Years (ly)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-10 w-10"
                aria-label="Swap source and target length units"
              >
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Swap units</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit-select">To Unit</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger id="to-unit-select" aria-label="Select target length unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="millimeters">Millimeters (mm)</SelectItem>
                  <SelectItem value="centimeters">Centimeters (cm)</SelectItem>
                  <SelectItem value="meters">Meters (m)</SelectItem>
                  <SelectItem value="kilometers">Kilometers (km)</SelectItem>
                  <SelectItem value="inches">Inches (in)</SelectItem>
                  <SelectItem value="feet">Feet (ft)</SelectItem>
                  <SelectItem value="yards">Yards (yd)</SelectItem>
                  <SelectItem value="miles">Miles (mi)</SelectItem>
                  <SelectItem value="nauticalMiles">Nautical Miles (nmi)</SelectItem>
                  <SelectItem value="lightYears">Light Years (ly)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertLength} 
              className="flex-1"
              disabled={!inputValue}
              aria-label="Convert length based on entered value and selected units"
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Convert Length
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
          </div>
        </CardContent>
      </Card>

      {/* Conversion Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Length Conversion Results
            </CardTitle>
            <CardDescription>
              Comprehensive conversion to all supported units
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-muted-foreground mb-2">
                {formatValue(result.inputValue)} {unitSymbols[result.inputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-5xl font-bold text-primary mb-2">
                {formatValue(result.outputValue)} {unitSymbols[result.outputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-lg text-muted-foreground">
                {getUnitDisplayName(result.inputUnit)} → {getUnitDisplayName(result.outputUnit)}
              </div>
            </div>

            {/* All Unit Conversions - Metric */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Metric Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {formatValue(result.allConversions.millimeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Millimeters (mm)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {formatValue(result.allConversions.centimeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Centimeters (cm)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {formatValue(result.allConversions.meters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Meters (m)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600 mb-1">
                      {formatValue(result.allConversions.kilometers)}
                    </div>
                    <div className="text-sm text-muted-foreground">Kilometers (km)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* All Unit Conversions - Imperial */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Move className="h-5 w-5" />
                Imperial Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {formatValue(result.allConversions.inches)}
                    </div>
                    <div className="text-sm text-muted-foreground">Inches (in)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {formatValue(result.allConversions.feet)}
                    </div>
                    <div className="text-sm text-muted-foreground">Feet (ft)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600 mb-1">
                      {formatValue(result.allConversions.yards)}
                    </div>
                    <div className="text-sm text-muted-foreground">Yards (yd)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-pink-50 dark:bg-pink-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-pink-600 mb-1">
                      {formatValue(result.allConversions.miles)}
                    </div>
                    <div className="text-sm text-muted-foreground">Miles (mi)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Special Units */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Special Units</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 bg-cyan-50 dark:bg-cyan-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-cyan-600 mb-1">
                      {formatValue(result.allConversions.nauticalMiles)}
                    </div>
                    <div className="text-sm text-muted-foreground">Nautical Miles (nmi)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-violet-50 dark:bg-violet-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-violet-600 mb-1">
                      {formatValue(result.allConversions.lightYears)}
                    </div>
                    <div className="text-sm text-muted-foreground">Light Years (ly)</div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Reference Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Length Conversion Reference</CardTitle>
          <CardDescription>
            Common length conversions for quick reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unit</th>
                  <th className="text-right p-2">Symbol</th>
                  <th className="text-right p-2">Meters</th>
                  <th className="text-right p-2">Feet</th>
                  <th className="text-right p-2">Inches</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Millimeter</td>
                  <td className="text-right p-2">mm</td>
                  <td className="text-right p-2">0.001</td>
                  <td className="text-right p-2">0.00328</td>
                  <td className="text-right p-2">0.0394</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Centimeter</td>
                  <td className="text-right p-2">cm</td>
                  <td className="text-right p-2">0.01</td>
                  <td className="text-right p-2">0.0328</td>
                  <td className="text-right p-2">0.394</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Meter</td>
                  <td className="text-right p-2">m</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">3.281</td>
                  <td className="text-right p-2">39.37</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Kilometer</td>
                  <td className="text-right p-2">km</td>
                  <td className="text-right p-2">1000</td>
                  <td className="text-right p-2">3281</td>
                  <td className="text-right p-2">39370</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Inch</td>
                  <td className="text-right p-2">in</td>
                  <td className="text-right p-2">0.0254</td>
                  <td className="text-right p-2">0.0833</td>
                  <td className="text-right p-2">1.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Foot</td>
                  <td className="text-right p-2">ft</td>
                  <td className="text-right p-2">0.3048</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">12.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Yard</td>
                  <td className="text-right p-2">yd</td>
                  <td className="text-right p-2">0.9144</td>
                  <td className="text-right p-2">3.00</td>
                  <td className="text-right p-2">36.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Mile</td>
                  <td className="text-right p-2">mi</td>
                  <td className="text-right p-2">1609.34</td>
                  <td className="text-right p-2">5280</td>
                  <td className="text-right p-2">63360</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Length Measurement Tips</CardTitle>
          <CardDescription>
            Useful information about different length units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metric System</div>
              <div className="text-muted-foreground">
                Based on powers of 10, widely used in science and most countries
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Imperial System</div>
              <div className="text-muted-foreground">
                Traditional system used primarily in the United States
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Nautical Miles</div>
              <div className="text-muted-foreground">
                Used in maritime and aviation navigation, based on Earth's circumference
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Light Years</div>
              <div className="text-muted-foreground">
                Astronomical unit representing distance light travels in one year
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function LengthConverterPage() {
  return (
    <ToolPageWrapper toolSlug="length-converter"><ToastProvider>
      <LengthConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 
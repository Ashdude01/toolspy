"use client";

import { useT } from "@/lib/i18n/use-t";
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
  Square,
  ArrowUpDown,
  Calculator,
  Map,
  Shield,
  RefreshCw,
  TrendingUp,
  Globe,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface AreaResult {
  inputValue: number;
  inputUnit: string;
  outputValue: number;
  outputUnit: string;
  allConversions: {
    squareMillimeters: number;
    squareCentimeters: number;
    squareMeters: number;
    hectares: number;
    squareKilometers: number;
    squareInches: number;
    squareFeet: number;
    squareYards: number;
    acres: number;
    squareMiles: number;
  };
}

function AreaConverterContent() {
  const t = useT();
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("squareMeters");
  const [outputUnit, setOutputUnit] = useState("squareFeet");
  const [result, setResult] = useState<AreaResult | null>(null);

  // Conversion factors to square meters
  const conversionFactors = {
    squareMillimeters: 0.000001,
    squareCentimeters: 0.0001,
    squareMeters: 1,
    hectares: 10000,
    squareKilometers: 1000000,
    squareInches: 0.00064516,
    squareFeet: 0.092903,
    squareYards: 0.836127,
    acres: 4046.86,
    squareMiles: 2589988,
  };

  const unitSymbols = {
    squareMillimeters: "mm²",
    squareCentimeters: "cm²",
    squareMeters: "m²",
    hectares: "ha",
    squareKilometers: "km²",
    squareInches: "in²",
    squareFeet: "ft²",
    squareYards: "yd²",
    acres: "acre",
    squareMiles: "mi²",
  };

  const convertArea = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast(t("tools.areaConverter.pleaseEnterAValidArea"), "error");
      return;
    }

    // Convert input to square meters first
    const squareMeters = value * conversionFactors[inputUnit as keyof typeof conversionFactors];
    
    // Convert from square meters to all other units
    const allConversions = {
      squareMillimeters: squareMeters / conversionFactors.squareMillimeters,
      squareCentimeters: squareMeters / conversionFactors.squareCentimeters,
      squareMeters: squareMeters / conversionFactors.squareMeters,
      hectares: squareMeters / conversionFactors.hectares,
      squareKilometers: squareMeters / conversionFactors.squareKilometers,
      squareInches: squareMeters / conversionFactors.squareInches,
      squareFeet: squareMeters / conversionFactors.squareFeet,
      squareYards: squareMeters / conversionFactors.squareYards,
      acres: squareMeters / conversionFactors.acres,
      squareMiles: squareMeters / conversionFactors.squareMiles,
    };

    const outputValue = allConversions[outputUnit as keyof typeof allConversions];

    const areaResult: AreaResult = {
      inputValue: value,
      inputUnit,
      outputValue,
      outputUnit,
      allConversions,
    };

    setResult(areaResult);
    showToast(t("tools.areaConverter.areaConvertedSuccessfully"), "success");
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
  };

  const resetConverter = () => {
    setInputValue("1");
    setInputUnit("squareMeters");
    setOutputUnit("squareFeet");
    setResult(null);
  };

  const formatValue = (value: number) => {
    if (value === 0) return "0";
    if (value >= 1e12) return (value / 1e12).toFixed(3) + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(3) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(3) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(3) + "K";
    if (value >= 1) return value.toFixed(6).replace(/\.?0+$/, "");
    if (value >= 0.001) return value.toFixed(6).replace(/\.?0+$/, "");
    return value.toExponential(3);
  };

  const getUnitDisplayName = (unit: string) => {
    const names = {
      squareMillimeters: "Square Millimeters",
      squareCentimeters: "Square Centimeters",
      squareMeters: "Square Meters",
      hectares: "Hectares",
      squareKilometers: "Square Kilometers",
      squareInches: "Square Inches",
      squareFeet: "Square Feet",
      squareYards: "Square Yards",
      acres: "Acres",
      squareMiles: "Square Miles",
    };
    return names[unit as keyof typeof names];
  };

  const getAreaContext = (squareMeters: number) => {
    if (squareMeters < 1) return "Very small (stamp, coin, or small screen)";
    if (squareMeters < 10) return "Small (table, desk, or small rug)";
    if (squareMeters < 100) return "Room size (bedroom, office, or garage)";
    if (squareMeters < 1000) return "Large space (house, apartment, or store)";
    if (squareMeters < 10000) return "Large building (warehouse or gymnasium)";
    if (squareMeters < 100000) return "City block or small park";
    if (squareMeters < 1000000) return "Neighborhood or large facility";
    if (squareMeters < 10000000) return "Small town or campus";
    return "City, county, or geographical region";
  };

  useEffect(() => {
    if (inputValue) {
      convertArea();
    }
  }, [inputValue, inputUnit, outputUnit]);

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

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-yellow-600 dark:to-yellow-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Area Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of area and surface measurement. 
          Support for metric, imperial, and specialized land measurement units.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-5 w-5 text-green-500" />
            Area Conversion
          </CardTitle>
          <CardDescription>
            {t("tools.areaConverter.enterAnAreaValueAndSelect")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">{t("tools.areaConverter.areaValue")} <span className="text-red-500" aria-label={t("tools.areaConverter.required")}>*</span></Label>
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
                aria-label={t("tools.areaConverter.enterAreaValueToConvert")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-unit-select">{t("tools.areaConverter.fromUnit")}</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="from-unit-select" aria-label={t("tools.areaConverter.selectSourceAreaUnit")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="squareMillimeters">{t("tools.areaConverter.squareMillimetersMm")}</SelectItem>
                  <SelectItem value="squareCentimeters">{t("tools.areaConverter.squareCentimetersCm")}</SelectItem>
                  <SelectItem value="squareMeters">{t("tools.areaConverter.squareMetersM")}</SelectItem>
                  <SelectItem value="hectares">{t("tools.areaConverter.hectaresHa")}</SelectItem>
                  <SelectItem value="squareKilometers">{t("tools.areaConverter.squareKilometersKm")}</SelectItem>
                  <SelectItem value="squareInches">{t("tools.areaConverter.squareInchesIn")}</SelectItem>
                  <SelectItem value="squareFeet">{t("tools.areaConverter.squareFeetFt")}</SelectItem>
                  <SelectItem value="squareYards">{t("tools.areaConverter.squareYardsYd")}</SelectItem>
                  <SelectItem value="acres">{t("tools.areaConverter.acresAcre")}</SelectItem>
                  <SelectItem value="squareMiles">{t("tools.areaConverter.squareMilesMi")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-10 w-10"
                aria-label={t("tools.areaConverter.swapSourceAndTargetAreaUnits")}
              >
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Swap units</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit-select">{t("tools.areaConverter.toUnit")}</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger id="to-unit-select" aria-label={t("tools.areaConverter.selectTargetAreaUnit")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="squareMillimeters">{t("tools.areaConverter.squareMillimetersMm")}</SelectItem>
                  <SelectItem value="squareCentimeters">{t("tools.areaConverter.squareCentimetersCm")}</SelectItem>
                  <SelectItem value="squareMeters">{t("tools.areaConverter.squareMetersM")}</SelectItem>
                  <SelectItem value="hectares">{t("tools.areaConverter.hectaresHa")}</SelectItem>
                  <SelectItem value="squareKilometers">{t("tools.areaConverter.squareKilometersKm")}</SelectItem>
                  <SelectItem value="squareInches">{t("tools.areaConverter.squareInchesIn")}</SelectItem>
                  <SelectItem value="squareFeet">{t("tools.areaConverter.squareFeetFt")}</SelectItem>
                  <SelectItem value="squareYards">{t("tools.areaConverter.squareYardsYd")}</SelectItem>
                  <SelectItem value="acres">{t("tools.areaConverter.acresAcre")}</SelectItem>
                  <SelectItem value="squareMiles">{t("tools.areaConverter.squareMilesMi")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertArea} 
              className="flex-1"
              disabled={!inputValue}
              aria-label={t("tools.areaConverter.convertAreaBasedOnEnteredValue")}
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Convert Area
            </Button>
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex-1 sm:flex-initial"
              aria-label={t("tools.areaConverter.resetConverterAndClearAllFields")}
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
              Area Conversion Results
            </CardTitle>
            <CardDescription>
              {t("tools.areaConverter.comprehensiveConversionToAllSupportedUnits")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-lg">
              <div className="text-3xl font-bold text-muted-foreground mb-2">
                {formatValue(result.inputValue)} {unitSymbols[result.inputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-5xl font-bold text-primary mb-2">
                {formatValue(result.outputValue)} {unitSymbols[result.outputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-lg text-muted-foreground mb-4">
                {getUnitDisplayName(result.inputUnit)} → {getUnitDisplayName(result.outputUnit)}
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">
                {getAreaContext(result.inputValue * conversionFactors[result.inputUnit as keyof typeof conversionFactors])}
              </div>
            </div>

            {/* All Unit Conversions - Metric */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Metric Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {formatValue(result.allConversions.squareMillimeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">mm²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {formatValue(result.allConversions.squareCentimeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">cm²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {formatValue(result.allConversions.squareMeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">m²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600 mb-1">
                      {formatValue(result.allConversions.hectares)}
                    </div>
                    <div className="text-sm text-muted-foreground">ha</div>
                  </div>
                </Card>
                <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {formatValue(result.allConversions.squareKilometers)}
                    </div>
                    <div className="text-sm text-muted-foreground">km²</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* All Unit Conversions - Imperial */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Map className="h-5 w-5" />
                Imperial Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {formatValue(result.allConversions.squareInches)}
                    </div>
                    <div className="text-sm text-muted-foreground">in²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600 mb-1">
                      {formatValue(result.allConversions.squareFeet)}
                    </div>
                    <div className="text-sm text-muted-foreground">ft²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-pink-50 dark:bg-pink-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-pink-600 mb-1">
                      {formatValue(result.allConversions.squareYards)}
                    </div>
                    <div className="text-sm text-muted-foreground">yd²</div>
                  </div>
                </Card>
                <Card className="p-4 bg-cyan-50 dark:bg-cyan-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-cyan-600 mb-1">
                      {formatValue(result.allConversions.acres)}
                    </div>
                    <div className="text-sm text-muted-foreground">acre</div>
                  </div>
                </Card>
                <Card className="p-4 bg-violet-50 dark:bg-violet-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-violet-600 mb-1">
                      {formatValue(result.allConversions.squareMiles)}
                    </div>
                    <div className="text-sm text-muted-foreground">mi²</div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Area Reference Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>{t("tools.areaConverter.areaConversionReference")}</CardTitle>
          <CardDescription>
            {t("tools.areaConverter.commonAreaConversionsForQuickReference")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unit</th>
                  <th className="text-right p-2">Symbol</th>
                  <th className="text-right p-2">Square Meters</th>
                  <th className="text-right p-2">Square Feet</th>
                  <th className="text-right p-2">Acres</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Square Centimeter</td>
                  <td className="text-right p-2">cm²</td>
                  <td className="text-right p-2">0.0001</td>
                  <td className="text-right p-2">0.00108</td>
                  <td className="text-right p-2">2.47e-8</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Square Meter</td>
                  <td className="text-right p-2">m²</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">10.764</td>
                  <td className="text-right p-2">0.000247</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Hectare</td>
                  <td className="text-right p-2">ha</td>
                  <td className="text-right p-2">10000</td>
                  <td className="text-right p-2">107639</td>
                  <td className="text-right p-2">2.471</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Square Foot</td>
                  <td className="text-right p-2">ft²</td>
                  <td className="text-right p-2">0.0929</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">2.3e-5</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Square Yard</td>
                  <td className="text-right p-2">yd²</td>
                  <td className="text-right p-2">0.836</td>
                  <td className="text-right p-2">9.00</td>
                  <td className="text-right p-2">0.000207</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Acre</td>
                  <td className="text-right p-2">acre</td>
                  <td className="text-right p-2">4047</td>
                  <td className="text-right p-2">43560</td>
                  <td className="text-right p-2">1.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Square Mile</td>
                  <td className="text-right p-2">mi²</td>
                  <td className="text-right p-2">2589988</td>
                  <td className="text-right p-2">27878400</td>
                  <td className="text-right p-2">640</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Area Measurement Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>{t("tools.areaConverter.areaMeasurementTips")}</CardTitle>
          <CardDescription>
            {t("tools.areaConverter.usefulInformationAboutDifferentAreaUnits")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metric System</div>
              <div className="text-muted-foreground">
                Based on square meters, widely used in science and most countries
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Real Estate</div>
              <div className="text-muted-foreground">
                Square feet commonly used for interior spaces, acres for land
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Agriculture</div>
              <div className="text-muted-foreground">
                Hectares and acres are standard units for farmland and property
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Geography</div>
              <div className="text-muted-foreground">
                Square kilometers and square miles for large geographical areas
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function AreaConverterPage() {
  return (
    <ToolPageWrapper toolSlug="area-converter"><ToastProvider>
      <AreaConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 
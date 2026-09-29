"use client";

import { useT } from "@/lib/i18n/use-t";
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  RefreshCw,
  Shield,
  Palette,
  Copy,
  Eye,
  Pipette,
  Camera,
  History,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ColorHistory {
  id: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  timestamp: Date;
}

function ColorPickerContent() {
  const t = useT();
  const { showToast } = useToast();
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([]);
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 });
  const [hslInput, setHslInput] = useState({ h: 217, s: 91, l: 60 });
  const [isEyedropper, setIsEyedropper] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common color palettes
  const colorPalettes = {
    material: [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
      '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000'
    ],
    web: [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#00FFFF', '#800000', '#008000', '#000080', '#808000',
      '#800080', '#008080', '#C0C0C0', '#808080', '#000000',
      '#FFFFFF', '#FFA500', '#A52A2A', '#DDA0DD', '#98FB98'
    ],
    pastel: [
      '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
      '#FFFFBA', '#FFDFFF', '#E6E6FA', '#F0E68C', '#DDA0DD',
      '#87CEEB', '#98FB98', '#F5DEB3', '#FFE4E1', '#FFF8DC',
      '#E0E0E0', '#FAFAFA', '#F5F5F5', '#DCDCDC', '#D3D3D3'
    ]
  };

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Update all color formats when one changes
  const updateColor = (color: string, source: 'hex' | 'rgb' | 'hsl' = 'hex') => {
    let rgb, hsl, hex;

    if (source === 'hex') {
      hex = color;
      rgb = hexToRgb(color);
      hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    } else if (source === 'rgb') {
      rgb = rgbInput;
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    } else if (source === 'hsl') {
      hsl = hslInput;
      rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    setCurrentColor(hex!);
    setHexInput(hex!);
    setRgbInput(rgb!);
    setHslInput(hsl!);
  };

  // Add color to history
  const addToHistory = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const newColor: ColorHistory = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      hex,
      rgb,
      hsl,
      timestamp: new Date()
    };

    setColorHistory(prev => {
      const filtered = prev.filter(c => c.hex !== hex);
      return [newColor, ...filtered].slice(0, 20); // Keep last 20 colors
    });
  };

  // Copy color value to clipboard
  const copyToClipboard = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${format} value copied to clipboard`, "success");
    } catch (error) {
      showToast(t("tools.colorPicker.failedToCopyToClipboard"), "error");
    }
  };

  // Use eyedropper API if available
  const useEyedropper = async () => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        const color = result.sRGBHex;
        updateColor(color);
        addToHistory(color);
        showToast(t("tools.colorPicker.colorPickedSuccessfully"), "success");
      } catch (error) {
        showToast(t("tools.colorPicker.eyedropperCancelled"), "info");
      }
    } else {
      showToast(t("tools.colorPicker.eyedropperNotSupportedInThisBrowser"), "error");
    }
  };

  // Handle image upload for color extraction
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        
        // Extract dominant colors (simplified)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData.data);
        
        colors.forEach(color => addToHistory(color));
        updateColor(colors[0]);
        
        showToast(`Extracted ${colors.length} colors from image`, "success");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Extract dominant colors from image data (simplified algorithm)
  const extractDominantColors = (data: Uint8ClampedArray): string[] => {
    const colors: { [key: string]: number } = {};
    const step = 4 * 10; // Sample every 10th pixel

    for (let i = 0; i < data.length; i += step) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];

      if (alpha > 128) { // Skip transparent pixels
        const hex = rgbToHex(r, g, b);
        colors[hex] = (colors[hex] || 0) + 1;
      }
    }

    return Object.entries(colors)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([color]) => color);
  };

  // Generate color variations
  const generateVariations = () => {
    const baseHsl = hslInput;
    const variations = [];

    // Lighter and darker variations
    for (let i = 1; i <= 3; i++) {
      variations.push(hslToRgb(baseHsl.h, baseHsl.s, Math.min(100, baseHsl.l + i * 15)));
      variations.push(hslToRgb(baseHsl.h, baseHsl.s, Math.max(0, baseHsl.l - i * 15)));
    }

    // Complementary and analogous colors
    variations.push(hslToRgb((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l)); // Complementary
    variations.push(hslToRgb((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l));  // Analogous
    variations.push(hslToRgb((baseHsl.h - 30 + 360) % 360, baseHsl.s, baseHsl.l)); // Analogous

    return variations.map(rgb => rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  // Effect to update color when inputs change
  useEffect(() => {
    if (hexInput !== currentColor) {
      try {
        if (/^#[0-9A-F]{6}$/i.test(hexInput)) {
          updateColor(hexInput, 'hex');
        }
      } catch (error) {
        // Invalid hex color
      }
    }
  }, [hexInput]);

  const clearHistory = () => {
    setColorHistory([]);
    showToast(t("tools.colorPicker.colorHistoryCleared"), "success");
  };

  const exportPalette = () => {
    const palette = colorHistory.map(color => ({
      hex: color.hex,
      rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
      hsl: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
    }));

    const blob = new Blob([JSON.stringify(palette, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(t("tools.colorPicker.colorPaletteExported"), "success");
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Color Picker
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Pick, analyze, and convert colors between different formats. Get HEX, RGB, and HSL values 
          with professional color tools for designers and developers.
        </p>
      </div>

      {/* Main Color Picker */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Picker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Color Display */}
          <div className="flex items-center justify-center">
            <div 
              className="w-32 h-32 rounded-lg border-2 border-border shadow-lg"
              style={{ backgroundColor: currentColor }}
            />
          </div>

          {/* Color Input Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("tools.colorPicker.hexColor")}</Label>
              <div className="flex gap-2">
                <Input
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder="#3B82F6"
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(hexInput, 'HEX')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("tools.colorPicker.rgbColor")}</Label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.r}
                  onChange={(e) => {
                    const newRgb = { ...rgbInput, r: parseInt(e.target.value) || 0 };
                    setRgbInput(newRgb);
                    updateColor('', 'rgb');
                  }}
                  className="font-mono text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.g}
                  onChange={(e) => {
                    const newRgb = { ...rgbInput, g: parseInt(e.target.value) || 0 };
                    setRgbInput(newRgb);
                    updateColor('', 'rgb');
                  }}
                  className="font-mono text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.b}
                  onChange={(e) => {
                    const newRgb = { ...rgbInput, b: parseInt(e.target.value) || 0 };
                    setRgbInput(newRgb);
                    updateColor('', 'rgb');
                  }}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`, 'RGB')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("tools.colorPicker.hslColor")}</Label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  min="0"
                  max="360"
                  value={hslInput.h}
                  onChange={(e) => {
                    const newHsl = { ...hslInput, h: parseInt(e.target.value) || 0 };
                    setHslInput(newHsl);
                    updateColor('', 'hsl');
                  }}
                  className="font-mono text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={hslInput.s}
                  onChange={(e) => {
                    const newHsl = { ...hslInput, s: parseInt(e.target.value) || 0 };
                    setHslInput(newHsl);
                    updateColor('', 'hsl');
                  }}
                  className="font-mono text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={hslInput.l}
                  onChange={(e) => {
                    const newHsl = { ...hslInput, l: parseInt(e.target.value) || 0 };
                    setHslInput(newHsl);
                    updateColor('', 'hsl');
                  }}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`, 'HSL')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Color Tools */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={useEyedropper}
              disabled={typeof window === 'undefined' || !('EyeDropper' in window)}
            >
              <Pipette className="h-4 w-4 mr-2" />
              Eyedropper
            </Button>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4 mr-2" />
              From Image
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                addToHistory(currentColor);
                showToast(t("tools.colorPicker.colorAddedToHistory"), "success");
              }}
            >
              <History className="h-4 w-4 mr-2" />
              Save Color
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Palettes */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>{t("tools.colorPicker.colorPalettes")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(colorPalettes).map(([name, colors]) => (
            <div key={name} className="space-y-2">
              <Label className="capitalize">{name} Colors</Label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      updateColor(color);
                      addToHistory(color);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Color Variations */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>{t("tools.colorPicker.colorVariations")}</CardTitle>
          <CardDescription>
            {t("tools.colorPicker.lighterDarkerAndHarmoniousColorVariations")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {generateVariations().map((color, index) => (
              <button
                key={index}
                className="w-12 h-12 rounded border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  updateColor(color);
                  addToHistory(color);
                }}
                title={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color History */}
      {colorHistory.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Color History
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportPalette}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colorHistory.map((color) => (
                <div
                  key={color.id}
                  className="p-3 border rounded-lg space-y-2 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => updateColor(color.hex)}
                >
                  <div
                    className="w-full h-16 rounded"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-xs space-y-1">
                    <div className="font-mono">{color.hex}</div>
                    <div className="text-muted-foreground">
                      RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                    </div>
                    <div className="text-muted-foreground">
                      HSL({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>{t("tools.colorPicker.aboutColorFormats")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">HEX Colors</div>
              <div className="text-muted-foreground">
                Hexadecimal format used in web design and CSS (#RRGGBB)
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">RGB Colors</div>
              <div className="text-muted-foreground">
                Red, Green, Blue values from 0-255 for digital displays
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">HSL Colors</div>
              <div className="text-muted-foreground">
                Hue, Saturation, Lightness - intuitive for color adjustments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function ColorPickerPage() {
  return (
    <ToolPageWrapper toolSlug="color-picker"><ToastProvider>
      <ColorPickerContent /></ToastProvider></ToolPageWrapper>
  );
} 
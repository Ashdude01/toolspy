"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  RefreshCw,
  Shield,
  QrCode,
  Copy,
  Eye,
  Smartphone,
  Globe,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface QRCodeData {
  id: string;
  content: string;
  type: string;
  size: number;
  quality: number;
  qrCodeUrl?: string;
  fileName: string;
}

function QrCodeGeneratorContent() {
  const { showToast } = useToast();
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [inputText, setInputText] = useState('');
  const [qrType, setQrType] = useState('text');
  const [size, setSize] = useState(256);
  const [quality, setQuality] = useState(92);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // QR Code presets for different types
  const qrTypePresets = {
    text: { placeholder: 'Enter any text...', icon: MessageSquare },
    url: { placeholder: 'https://example.com', icon: Globe },
    email: { placeholder: 'user@example.com', icon: Mail },
    phone: { placeholder: '+1234567890', icon: Phone },
    sms: { placeholder: '+1234567890:Your message here', icon: MessageSquare },
    wifi: { placeholder: 'WIFI:T:WPA;S:NetworkName;P:Password;;', icon: Smartphone },
  };

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      showToast("Please enter content for the QR code", "error");
      return;
    }

    setIsGenerating(true);

    try {
      const QRCode = (await import('qrcode')).default;
      
      let content = inputText.trim();
      
      // Format content based on type
      switch (qrType) {
        case 'email':
          if (!content.startsWith('mailto:')) {
            content = `mailto:${content}`;
          }
          break;
        case 'phone':
          if (!content.startsWith('tel:')) {
            content = `tel:${content}`;
          }
          break;
        case 'sms':
          if (!content.startsWith('sms:')) {
            const [phone, message] = content.split(':');
            content = `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
          }
          break;
        case 'url':
          if (!content.match(/^https?:\/\//)) {
            content = `https://${content}`;
          }
          break;
      }

      // Generate QR code with options
      const qrCodeDataUrl = await QRCode.toDataURL(content, {
        width: size,
        errorCorrectionLevel: errorCorrection as any,
        color: {
          dark: foregroundColor,
          light: backgroundColor
        },
        margin: 2,
      });

      const newQRCode: QRCodeData = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: inputText,
        type: qrType,
        size,
        quality,
        qrCodeUrl: qrCodeDataUrl,
        fileName: `qr-code-${qrType}-${Date.now()}.png`
      };

      setQrCodes(prev => [newQRCode, ...prev]);
      showToast("QR code generated successfully!", "success");

    } catch (error) {
      console.error('QR code generation error:', error);
      showToast("Failed to generate QR code. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = (qrCode: QRCodeData) => {
    if (!qrCode.qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCode.qrCodeUrl;
    link.download = qrCode.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("QR code downloaded", "success");
  };

  const copyToClipboard = async (qrCode: QRCodeData) => {
    if (!qrCode.qrCodeUrl) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrCode.qrCodeUrl);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      showToast("QR code copied to clipboard", "success");
    } catch (error) {
      // Fallback: copy the data URL
      try {
        await navigator.clipboard.writeText(qrCode.qrCodeUrl);
        showToast("QR code data URL copied to clipboard", "success");
      } catch (err) {
        showToast("Failed to copy to clipboard", "error");
      }
    }
  };

  const removeQRCode = (id: string) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
    showToast("QR code removed", "success");
  };

  const clearAll = () => {
    setQrCodes([]);
    setInputText('');
    showToast("All QR codes cleared", "success");
  };

  const fillTemplate = (template: string) => {
    setInputText(template);
  };

  const getTypeIcon = (type: string) => {
    const IconComponent = qrTypePresets[type as keyof typeof qrTypePresets]?.icon || QrCode;
    return <IconComponent className="h-4 w-4" />;
  };

  const qrTypeTemplates = {
    wifi: [
      { name: 'WPA/WPA2', template: 'WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;' },
      { name: 'WEP', template: 'WIFI:T:WEP;S:YourNetworkName;P:YourPassword;;' },
      { name: 'Open Network', template: 'WIFI:T:nopass;S:YourNetworkName;;' },
    ],
    sms: [
      { name: 'SMS with message', template: '+1234567890:Hello, this is a sample message!' },
      { name: 'SMS number only', template: '+1234567890' },
    ],
    email: [
      { name: 'Simple email', template: 'user@example.com' },
      { name: 'Email with subject', template: 'mailto:user@example.com?subject=Hello' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          QR Code Generator
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate high-quality QR codes for text, URLs, emails, phone numbers, and more. 
          Customize colors, size, and error correction for professional results.
        </p>
      </div>

      {/* Generator Form */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </CardTitle>
          <CardDescription>
            Create custom QR codes with various content types and styling options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Type Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2" role="group" aria-label="QR code content type selection">
            {Object.entries(qrTypePresets).map(([type, preset]) => (
              <Button
                key={type}
                variant={qrType === type ? 'default' : 'outline'}
                onClick={() => setQrType(type)}
                className="flex items-center gap-2 h-auto py-3"
                aria-label={`Select ${type} QR code type`}
                aria-pressed={qrType === type}
              >
                <preset.icon className="h-4 w-4" aria-hidden="true" />
                <span className="capitalize">{type}</span>
              </Button>
            ))}
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <Label htmlFor="qr-content-input">Content <span className="text-red-500" aria-label="required">*</span></Label>
            <Textarea
              id="qr-content-input"
              placeholder={qrTypePresets[qrType as keyof typeof qrTypePresets]?.placeholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-24 font-mono"
              required
              aria-required="true"
              aria-label="Enter content for QR code"
            />
          </div>

          {/* Templates for specific types */}
          {qrTypeTemplates[qrType as keyof typeof qrTypeTemplates] && (
            <div className="space-y-2">
              <Label>Quick Templates</Label>
              <div className="flex flex-wrap gap-2">
                {qrTypeTemplates[qrType as keyof typeof qrTypeTemplates].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => fillTemplate(template.template)}
                    aria-label={`Use ${template.name} template`}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size-slider">Size: {size}px</Label>
              <input
                id="size-slider"
                type="range"
                min="128"
                max="1024"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
                aria-label="QR code size slider"
                aria-valuemin={128}
                aria-valuemax={1024}
                aria-valuenow={size}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality-slider">Quality: {quality}%</Label>
              <input
                id="quality-slider"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
                aria-label="QR code quality slider"
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={quality}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-correction-select">Error Correction</Label>
              <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                <SelectTrigger id="error-correction-select" aria-label="Select error correction level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (~7%)</SelectItem>
                  <SelectItem value="M">Medium (~15%)</SelectItem>
                  <SelectItem value="Q">Quartile (~25%)</SelectItem>
                  <SelectItem value="H">High (~30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Colors</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="foreground-color" className="sr-only">Foreground Color</Label>
                  <input
                    id="foreground-color"
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-full h-10 rounded border"
                    title="Foreground Color"
                    aria-label="Select foreground color for QR code"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="background-color" className="sr-only">Background Color</Label>
                  <input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-10 rounded border"
                    title="Background Color"
                    aria-label="Select background color for QR code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateQRCode}
            disabled={!inputText.trim() || isGenerating}
            className="w-full"
            size="lg"
            aria-label={isGenerating ? "Generating QR code, please wait" : "Generate QR code"}
          >
            <QrCode className="h-4 w-4 mr-2" aria-hidden="true" />
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </CardContent>
      </Card>

      {/* Generated QR Codes */}
      {qrCodes.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Generated QR Codes</CardTitle>
            <CardDescription>
              {qrCodes.length} QR code(s) generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qrCodes.map((qrCode) => (
                <div key={qrCode.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(qrCode.type)}
                      <span className="font-medium capitalize">{qrCode.type}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQRCode(qrCode.id)}
                      aria-label={`Remove QR code for ${qrCode.type}`}
                    >
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={qrCode.qrCodeUrl}
                      alt={`QR Code for ${qrCode.type}: ${qrCode.content.substring(0, 50)}${qrCode.content.length > 50 ? '...' : ''}`}
                      className="border rounded"
                      width={qrCode.size / 2}
                      height={qrCode.size / 2}
                    />
                  </div>

                  <div className="text-sm text-muted-foreground break-all" aria-label={`Content: ${qrCode.content}`}>
                    {qrCode.content.length > 50 
                      ? `${qrCode.content.substring(0, 50)}...` 
                      : qrCode.content
                    }
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadQRCode(qrCode)}
                      className="flex-1"
                      aria-label={`Download QR code for ${qrCode.type}`}
                    >
                      <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(qrCode)}
                      className="flex-1"
                      aria-label={`Copy QR code for ${qrCode.type} to clipboard`}
                    >
                      <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={clearAll}
                aria-label="Clear all generated QR codes"
              >
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About QR Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Quick Response</div>
              <div className="text-muted-foreground">
                QR codes can be scanned quickly by smartphones and other devices
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Error Correction</div>
              <div className="text-muted-foreground">
                Built-in redundancy allows scanning even when partially damaged
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">High Capacity</div>
              <div className="text-muted-foreground">
                Can store up to 7,089 numeric or 4,296 alphanumeric characters
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Universal Support</div>
              <div className="text-muted-foreground">
                Supported by all modern smartphones and QR code readers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="qr-code-generator"><ToastProvider>
      <QrCodeGeneratorContent /></ToastProvider></ToolPageWrapper>
  );
} 
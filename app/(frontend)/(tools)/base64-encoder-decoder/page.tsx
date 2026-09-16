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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  RefreshCw,
  Shield,
  Code,
  Copy,
  ArrowUpDown,
  FileText,
  Upload,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useT } from "@/lib/i18n/use-t";

function Base64EncoderDecoderContent() {
  const t = useT();
  const { showToast } = useToast();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encoding, setEncoding] = useState('utf-8');
  const [lineBreaks, setLineBreaks] = useState(false);
  const [urlSafe, setUrlSafe] = useState(false);

  const isValidBase64 = (str: string): boolean => {
    try {
      // Remove line breaks and whitespace
      const cleaned = str.replace(/\s/g, '');
      // Check if it's valid base64
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(cleaned)) {
        return false;
      }
      // Try to decode
      atob(cleaned);
      return true;
    } catch {
      return false;
    }
  };

  const encodeToBase64 = (text: string): string => {
    try {
      if (!text.trim()) return '';
      
      // Convert text to Base64
      let encoded = btoa(unescape(encodeURIComponent(text)));
      
      // Apply URL-safe encoding if requested
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }
      
      // Add line breaks if requested
      if (lineBreaks) {
        encoded = encoded.replace(/(.{64})/g, '$1\n');
      }
      
      return encoded;
    } catch (error) {
      throw new Error('Failed to encode text to Base64');
    }
  };

  const decodeFromBase64 = (base64: string): string => {
    try {
      if (!base64.trim()) return '';
      
      let decoded = base64.replace(/\s/g, ''); // Remove whitespace
      
      // Handle URL-safe encoding
      if (urlSafe || base64.includes('-') || base64.includes('_')) {
        decoded = decoded.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if needed
        while (decoded.length % 4) {
          decoded += '=';
        }
      }
      
      // Decode from Base64
      const decodedText = atob(decoded);
      return decodeURIComponent(escape(decodedText));
    } catch (error) {
      throw new Error('Invalid Base64 string');
    }
  };

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const result = encodeToBase64(inputText);
        setOutputText(result);
        showToast(t("tools.base64EncoderDecoder.encodedSuccess"), "success");
      } else {
        if (!isValidBase64(inputText)) {
          throw new Error('Invalid Base64 format');
        }
        const result = decodeFromBase64(inputText);
        setOutputText(result);
        showToast(t("tools.base64EncoderDecoder.decodedSuccess"), "success");
      }
    } catch (error) {
      showToast(error instanceof Error ? (error.message === "Invalid Base64 format" ? t("tools.base64EncoderDecoder.invalidBase64Format") : error.message) : t("tools.base64EncoderDecoder.processingFailed"), "error");
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(t("tools.base64EncoderDecoder.copiedToClipboard"), "success");
    } catch (error) {
      showToast(t("tools.base64EncoderDecoder.copyFailed"), "error");
    }
  };

  const handleSwapMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    
    // Swap input and output
    setInputText(outputText);
    setOutputText(inputText);
    
    showToast(t("tools.base64EncoderDecoder.switchedMode", { mode: newMode }), "success");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputText(content);
      showToast(t("tools.base64EncoderDecoder.fileLoaded"), "success");
    };
    reader.readAsText(file);
  };

  const downloadOutput = () => {
    if (!outputText) {
      showToast(t("tools.base64EncoderDecoder.noOutputToDownload"), "error");
      return;
    }

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `base64_${mode}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(t("tools.base64EncoderDecoder.outputDownloaded"), "success");
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    showToast(t("tools.base64EncoderDecoder.allFieldsCleared"), "success");
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  const getByteSize = (text: string) => {
    return new Blob([text]).size;
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
          {t("tools.base64EncoderDecoder.privacyBadge")}
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {t("tools.base64EncoderDecoder.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("tools.base64EncoderDecoder.subtitle")}
        </p>
      </div>

      {/* Mode Selection */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            {t("tools.base64EncoderDecoder.modeTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <Button
              variant={mode === 'encode' ? 'default' : 'outline'}
              onClick={() => setMode('encode')}
              className="flex-1 text-xs sm:text-sm"
              size="sm"
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t("tools.base64EncoderDecoder.encodeText")}</span>
              <span className="sm:hidden">{t("tools.base64EncoderDecoder.encodeShort")}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleSwapMode}
              className="px-2 sm:px-3"
              size="sm"
              aria-label="Swap between encode and decode mode"
            >
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Button>
            <Button
              variant={mode === 'decode' ? 'default' : 'outline'}
              onClick={() => setMode('decode')}
              className="flex-1 text-xs sm:text-sm"
              size="sm"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t("tools.base64EncoderDecoder.decodeBase64")}</span>
              <span className="sm:hidden">{t("tools.base64EncoderDecoder.decodeShort")}</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text-encoding-select">{t("tools.base64EncoderDecoder.textEncodingLabel")}</Label>
              <Select value={encoding} onValueChange={setEncoding}>
                <SelectTrigger id="text-encoding-select" aria-label="Select text encoding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utf-8">UTF-8</SelectItem>
                  <SelectItem value="ascii">ASCII</SelectItem>
                  <SelectItem value="latin1">Latin1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lineBreaks"
                checked={lineBreaks}
                onChange={(e) => setLineBreaks(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="lineBreaks">{t("tools.base64EncoderDecoder.lineBreaksLabel")}</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="urlSafe"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="urlSafe">{t("tools.base64EncoderDecoder.urlSafeLabel")}</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {mode === 'encode' ? t("tools.base64EncoderDecoder.inputTitleEncode") : t("tools.base64EncoderDecoder.inputTitleDecode")}
          </CardTitle>
          <CardDescription>
            {mode === 'encode' 
              ? t("tools.base64EncoderDecoder.inputDescEncode")
              : t("tools.base64EncoderDecoder.inputDescDecode")
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".txt,.json,.xml,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="fileInput"
                aria-label="Load text from file"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('fileInput')?.click()}
                size="sm"
                aria-label="Load text from file"
              >
                <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("tools.base64EncoderDecoder.loadFromFile")}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCopy(inputText)}
                size="sm"
                disabled={!inputText}
                aria-label="Copy input text to clipboard"
              >
                <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("tools.base64EncoderDecoder.copyInput")}
              </Button>
            </div>
            
            <Label htmlFor="input-textarea" className="sr-only">
              {mode === 'encode' ? 'Text to encode' : 'Base64 string to decode'}
            </Label>
            <Textarea
              id="input-textarea"
              placeholder={mode === 'encode' 
                ? t("tools.base64EncoderDecoder.inputPlaceholderEncode")
                : t("tools.base64EncoderDecoder.inputPlaceholderDecode")
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 font-mono text-sm"
              aria-describedby="input-description"
            />
            <div id="input-description" className="sr-only">
              {mode === 'encode' 
                ? t("tools.base64EncoderDecoder.inputDescEncode")
                : t("tools.base64EncoderDecoder.inputDescDecode")
              }
            </div>
            
            <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span>{t("tools.base64EncoderDecoder.charactersLabel")} {getCharacterCount(inputText)}</span>
              <span>{t("tools.base64EncoderDecoder.bytesLabel")} {getByteSize(inputText)}</span>
              {mode === 'decode' && inputText && (
                <span className={`text-xs sm:text-sm ${isValidBase64(inputText) ? 'text-green-600' : 'text-red-600'}`}>
                  {isValidBase64(inputText) ? t("tools.base64EncoderDecoder.validBase64") : t("tools.base64EncoderDecoder.invalidBase64")}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleProcess}
              disabled={!inputText.trim()}
              className="flex-1"
              aria-label={mode === 'encode' ? 'Encode text to Base64' : 'Decode Base64 to text'}
            >
              {mode === 'encode' ? (
                <>
                  <Code className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("tools.base64EncoderDecoder.encodeButton")}
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("tools.base64EncoderDecoder.decodeButton")}
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={clearAll}
              className="flex-1 sm:flex-initial"
              aria-label="Clear all input and output"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              {t("toolCommon.clearAll")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {mode === 'encode' ? t("tools.base64EncoderDecoder.outputTitleEncode") : t("tools.base64EncoderDecoder.outputTitleDecode")}
          </CardTitle>
          <CardDescription>
            {mode === 'encode' 
              ? t("tools.base64EncoderDecoder.outputDescEncode")
              : t("tools.base64EncoderDecoder.outputDescDecode")
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleCopy(outputText)}
                size="sm"
                disabled={!outputText}
                aria-label="Copy output to clipboard"
              >
                <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("tools.base64EncoderDecoder.copyOutput")}
              </Button>
              <Button
                variant="outline"
                onClick={downloadOutput}
                size="sm"
                disabled={!outputText}
                aria-label="Download output as file"
              >
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("toolCommon.download")}
              </Button>
            </div>
            
            <Label htmlFor="output-textarea" className="sr-only">
              {mode === 'encode' ? 'Base64 encoded output' : 'Decoded text output'}
            </Label>
            <Textarea
              id="output-textarea"
              placeholder={mode === 'encode' 
                ? t("tools.base64EncoderDecoder.outputPlaceholderEncode")
                : t("tools.base64EncoderDecoder.outputPlaceholderDecode")
              }
              value={outputText}
              readOnly
              className="min-h-32 font-mono text-sm bg-muted"
              aria-label={mode === 'encode' ? 'Base64 encoded result' : 'Decoded text result'}
              aria-describedby="output-description"
            />
            <div id="output-description" className="sr-only">
              {mode === 'encode' 
                ? t("tools.base64EncoderDecoder.outputDescEncode")
                : t("tools.base64EncoderDecoder.outputDescDecode")
              }
            </div>
            
            <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span>{t("tools.base64EncoderDecoder.charactersLabel")} {getCharacterCount(outputText)}</span>
              <span>{t("tools.base64EncoderDecoder.bytesLabel")} {getByteSize(outputText)}</span>
              {mode === 'encode' && outputText && (
                <span className="text-green-600 text-xs sm:text-sm">
                  {t("tools.base64EncoderDecoder.sizeChangeLabel")} {((getByteSize(outputText) - getByteSize(inputText)) / getByteSize(inputText) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About Base64 Encoding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">What is Base64?</div>
              <div className="text-muted-foreground">
                Binary-to-text encoding scheme that represents binary data in ASCII
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Common Uses</div>
              <div className="text-muted-foreground">
                Email attachments, data URLs, API tokens, configuration files
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">URL-Safe</div>
              <div className="text-muted-foreground">
                Replaces + with -, / with _, and removes padding for URLs
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Size Increase</div>
              <div className="text-muted-foreground">
                Base64 encoded data is approximately 33% larger than original
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function Base64EncoderDecoderPage() {
  return (
    <ToolPageWrapper toolSlug="base64-encoder-decoder"><ToastProvider>
      <Base64EncoderDecoderContent /></ToastProvider></ToolPageWrapper>
  );
} 
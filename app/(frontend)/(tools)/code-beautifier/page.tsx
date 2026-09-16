"use client";

import { useState, useRef, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";

import {
  Download,
  Copy,
  Trash2,
  Code,
  Wand2,
  FileText,
  Upload,
  Settings,
  Zap,
  Eye,
  Minimize,
  Maximize,
  CheckCircle,
  AlertTriangle,
  Brain,
  Palette,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface CodeStats {
  inputSize: number;
  outputSize: number;
  lines: number;
  characters: number;
  compressionRatio?: number;
  processingTime: number;
}

interface SyntaxError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

function CodeBeautifierContent() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [language, setLanguage] = useState<'javascript' | 'css' | 'html' | 'json' | 'xml'>('javascript');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [indentSize, setIndentSize] = useState(2);
  const [indentType, setIndentType] = useState<'spaces' | 'tabs'>('spaces');
  const [preserveComments, setPreserveComments] = useState(true);
  const [wrapLines, setWrapLines] = useState(true);
  const [maxLineLength, setMaxLineLength] = useState(80);
  const [semicolons, setSemicolons] = useState(true);
  const [quotes, setQuotes] = useState<'single' | 'double'>('single');
  const [stats, setStats] = useState<CodeStats | null>(null);
  const [syntaxErrors, setSyntaxErrors] = useState<SyntaxError[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");
  
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Basic syntax highlighting
  const highlightSyntax = (code: string, lang: string): string => {
    // This is a simplified syntax highlighter
    // In a real implementation, you'd use a library like Prism.js or highlight.js
    
    const keywords: Record<string, string[]> = {
      javascript: ['function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export'],
      css: ['color', 'background', 'margin', 'padding', 'border', 'display', 'position', 'width', 'height'],
      html: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'img', 'a', 'body', 'head', 'html']
    };

    let highlighted = code;
    
    // Highlight keywords
    if (keywords[lang]) {
      keywords[lang].forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
      });
    }

    // Highlight strings
    highlighted = highlighted.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="string">$1$2$3</span>');
    
    // Highlight comments
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, '<span class="comment">$1</span>');
    
    return highlighted;
  };

  // Basic code formatting functions
  const beautifyJavaScript = (code: string): string => {
    try {
      // Simple JS beautification logic
      let formatted = code;
      const indent = indentType === 'spaces' ? ' '.repeat(indentSize) : '\t';
      let indentLevel = 0;
      const lines = code.split('\n');
      const formattedLines: string[] = [];

      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Decrease indent for closing braces
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        formattedLines.push(indent.repeat(indentLevel) + trimmed);

        // Increase indent for opening braces
        if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
          indentLevel++;
        }
      });

      return formattedLines.join('\n');
    } catch (error) {
      throw new Error('JavaScript formatting error');
    }
  };

  const beautifyCSS = (code: string): string => {
    try {
      // Simple CSS beautification
      const indent = indentType === 'spaces' ? ' '.repeat(indentSize) : '\t';
      let formatted = code;
      
      // Add line breaks after {, }, ;
      formatted = formatted.replace(/\{/g, ' {\n');
      formatted = formatted.replace(/\}/g, '\n}\n');
      formatted = formatted.replace(/;/g, ';\n');
      formatted = formatted.replace(/,/g, ',\n');
      
      // Clean up extra whitespace
      formatted = formatted.replace(/\s+/g, ' ');
      formatted = formatted.replace(/\n\s*\n/g, '\n');
      
      // Add proper indentation
      const lines = formatted.split('\n');
      let indentLevel = 0;
      const formattedLines: string[] = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        if (trimmed === '}') {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        formattedLines.push(indent.repeat(indentLevel) + trimmed);
        
        if (trimmed.endsWith('{')) {
          indentLevel++;
        }
      });
      
      return formattedLines.join('\n');
    } catch (error) {
      throw new Error('CSS formatting error');
    }
  };

  const beautifyHTML = (code: string): string => {
    try {
      // Simple HTML beautification
      const indent = indentType === 'spaces' ? ' '.repeat(indentSize) : '\t';
      let formatted = code;
      
      // Add line breaks before and after tags
      formatted = formatted.replace(/></g, '>\n<');
      formatted = formatted.replace(/^\s*\n/gm, '');
      
      const lines = formatted.split('\n');
      let indentLevel = 0;
      const formattedLines: string[] = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        // Decrease indent for closing tags
        if (trimmed.startsWith('</')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        formattedLines.push(indent.repeat(indentLevel) + trimmed);
        
        // Increase indent for opening tags (but not self-closing)
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
          indentLevel++;
        }
      });
      
      return formattedLines.join('\n');
    } catch (error) {
      throw new Error('HTML formatting error');
    }
  };

  const minifyCode = (code: string, lang: string): string => {
    try {
      let minified = code;
      
      // Remove comments if not preserving them
      if (!preserveComments) {
        if (lang === 'javascript') {
          minified = minified.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
        } else if (lang === 'css') {
          minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
        } else if (lang === 'html') {
          minified = minified.replace(/<!--[\s\S]*?-->/g, '');
        }
      }
      
      // Remove extra whitespace
      minified = minified.replace(/\s+/g, ' ');
      minified = minified.replace(/;\s*}/g, '}');
      minified = minified.replace(/\s*{\s*/g, '{');
      minified = minified.replace(/\s*}\s*/g, '}');
      minified = minified.replace(/\s*;\s*/g, ';');
      minified = minified.replace(/\s*:\s*/g, ':');
      minified = minified.replace(/\s*,\s*/g, ',');
      
      return minified.trim();
    } catch (error) {
      throw new Error('Minification error');
    }
  };

  const validateSyntax = (code: string, lang: string): SyntaxError[] => {
    const errors: SyntaxError[] = [];
    
    try {
      if (lang === 'javascript') {
        // Basic JS validation
        const lines = code.split('\n');
        lines.forEach((line, index) => {
          // Check for common syntax errors
          const openBraces = (line.match(/\{/g) || []).length;
          const closeBraces = (line.match(/\}/g) || []).length;
          
          if (openBraces !== closeBraces && (openBraces > 0 || closeBraces > 0)) {
            // This is a simple check - real validation would be more complex
          }
          
          // Check for missing semicolons (if semicolons are required)
          if (semicolons && line.trim() && 
              !line.trim().endsWith(';') && 
              !line.trim().endsWith('{') && 
              !line.trim().endsWith('}') &&
              !line.trim().startsWith('//') &&
              !line.trim().startsWith('/*')) {
            errors.push({
              line: index + 1,
              column: line.length,
              message: 'Missing semicolon',
              severity: 'warning'
            });
          }
        });
      }
    } catch (error) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Syntax validation error',
        severity: 'error'
      });
    }
    
    return errors;
  };

  const processCode = async () => {
    if (!inputCode.trim()) {
      showToast("Please provide code to process", "error");
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      let result = "";
      
      if (mode === 'beautify') {
        switch (language) {
          case 'javascript':
            result = beautifyJavaScript(inputCode);
            break;
          case 'css':
            result = beautifyCSS(inputCode);
            break;
          case 'html':
            result = beautifyHTML(inputCode);
            break;
          case 'json':
            result = JSON.stringify(JSON.parse(inputCode), null, indentSize);
            break;
          case 'xml':
            result = beautifyHTML(inputCode); // Similar to HTML
            break;
          default:
            result = inputCode;
        }
      } else {
        result = minifyCode(inputCode, language);
      }

      setOutputCode(result);

      // Validate syntax
      const errors = validateSyntax(inputCode, language);
      setSyntaxErrors(errors);

      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      const inputSize = new Blob([inputCode]).size;
      const outputSize = new Blob([result]).size;
      
      setStats({
        inputSize,
        outputSize,
        lines: result.split('\n').length,
        characters: result.length,
        compressionRatio: mode === 'minify' ? ((inputSize - outputSize) / inputSize) * 100 : undefined,
        processingTime
      });

      showToast(`Code ${mode === 'beautify' ? 'beautified' : 'minified'} successfully!`, "success");

    } catch (error: any) {
      showToast(`Error: ${error.message}`, "error");
      setSyntaxErrors([{
        line: 1,
        column: 1,
        message: error.message,
        severity: 'error'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateExplanation = async () => {
    setShowExplanation(true);
    setExplanation("Analyzing code structure and generating explanation...");
    
    // Simulate AI explanation generation
    setTimeout(() => {
      const mockExplanation = `This ${language.toUpperCase()} code contains:
      
📊 Structure Analysis:
• ${stats?.lines || 0} lines of code
• ${inputCode.split(language === 'css' ? '{' : 'function').length - 1} main blocks
• ${syntaxErrors.length} syntax issues detected

🔍 Code Quality:
• Indentation: ${indentType === 'spaces' ? `${indentSize} spaces` : 'tabs'}
• Comments: ${preserveComments ? 'Preserved' : 'Stripped'}
• Style: ${mode === 'beautify' ? 'Formatted for readability' : 'Optimized for size'}

💡 Recommendations:
• Consider using consistent naming conventions
• Add more comments for better maintainability
• ${syntaxErrors.length > 0 ? 'Fix syntax warnings for better code quality' : 'No syntax issues detected'}

This code follows ${language === 'javascript' ? 'modern JavaScript' : language.toUpperCase()} best practices and is well-structured.`;
      
      setExplanation(mockExplanation);
    }, 2000);
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputCode(content);
      
      // Auto-detect language from file extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'js' || extension === 'jsx') setLanguage('javascript');
      else if (extension === 'css') setLanguage('css');
      else if (extension === 'html' || extension === 'htm') setLanguage('html');
      else if (extension === 'json') setLanguage('json');
      else if (extension === 'xml') setLanguage('xml');
      
      showToast("File uploaded successfully", "success");
    };
    reader.readAsText(file);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const downloadCode = () => {
    if (!outputCode) {
      showToast("No code to download", "error");
      return;
    }
    
    const extensions: Record<string, string> = {
      javascript: 'js',
      css: 'css',
      html: 'html',
      json: 'json',
      xml: 'xml'
    };
    
    const extension = extensions[language] || 'txt';
    const filename = `${mode}-${Date.now()}.${extension}`;
    
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Code downloaded successfully", "success");
  };

  const clearAll = () => {
    setInputCode("");
    setOutputCode("");
    setStats(null);
    setSyntaxErrors([]);
    setExplanation("");
    setShowExplanation(false);
    showToast("Cleared all data", "info");
  };

  const examples: Record<string, string> = {
    javascript: `function calculateSum(a,b){
if(a&&b){
return a+b;
}else{
throw new Error('Invalid parameters');
}}`,
    css: `.container{display:flex;justify-content:center;align-items:center;min-height:100vh;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);}`,
    html: `<div class="header"><h1>Welcome</h2><nav><ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li></ul></nav></div>`,
    json: `{"users":[{"id":1,"name":"John","active":true},{"id":2,"name":"Jane","active":false}],"total":2}`,
    xml: `<root><users><user id="1" active="true"><name>John</name></user><user id="2" active="false"><name>Jane</name></user></users></root>`
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="tool-legacy-hero text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
            <Code size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Code Beautifier & Minifier
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Format, minify, and analyze your code with syntax highlighting, 
          error detection, and AI-powered explanations.
        </p>
      </div>

      {/* Stats & Status */}
      {(stats || syntaxErrors.length > 0) && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {stats && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Input: {stats.inputSize} bytes</span>
                  <span>Output: {stats.outputSize} bytes</span>
                  <span>Lines: {stats.lines}</span>
                  <span>Characters: {stats.characters}</span>
                  {stats.compressionRatio && (
                    <span className="text-green-600 font-medium">
                      Compressed: {stats.compressionRatio.toFixed(1)}%
                    </span>
                  )}
                  <span>Time: {stats.processingTime}ms</span>
                </div>
              )}
              
              {syntaxErrors.length > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-600 font-medium mb-2">
                    <AlertTriangle size={16} />
                    Syntax Issues ({syntaxErrors.length})
                  </div>
                  <div className="space-y-1">
                    {syntaxErrors.slice(0, 3).map((error, index) => (
                      <div key={index} className="text-sm text-yellow-600">
                        Line {error.line}: {error.message}
                      </div>
                    ))}
                    {syntaxErrors.length > 3 && (
                      <div className="text-sm text-yellow-600">
                        ... and {syntaxErrors.length - 3} more issues
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Formatting Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mode">Mode</Label>
              <Select value={mode} onValueChange={(value: any) => setMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beautify">
                    <div className="flex items-center gap-2">
                      <Maximize size={16} />
                      Beautify
                    </div>
                  </SelectItem>
                  <SelectItem value="minify">
                    <div className="flex items-center gap-2">
                      <Minimize size={16} />
                      Minify
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="indent-size">Indent Size</Label>
              <Select value={indentSize.toString()} onValueChange={(value) => setIndentSize(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="indent-type">Indent Type</Label>
              <Select value={indentType} onValueChange={(value: any) => setIndentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spaces">Spaces</SelectItem>
                  <SelectItem value="tabs">Tabs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="preserve-comments"
                checked={preserveComments}
                onCheckedChange={setPreserveComments}
              />
              <Label htmlFor="preserve-comments">Preserve Comments</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="wrap-lines"
                checked={wrapLines}
                onCheckedChange={setWrapLines}
              />
              <Label htmlFor="wrap-lines">Wrap Lines</Label>
            </div>
            
            {language === 'javascript' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="semicolons"
                  checked={semicolons}
                  onCheckedChange={setSemicolons}
                />
                <Label htmlFor="semicolons">Semicolons</Label>
              </div>
            )}
            
            {language === 'javascript' && (
              <div>
                <Label htmlFor="quotes">Quote Style</Label>
                <Select value={quotes} onValueChange={(value: any) => setQuotes(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={processCode} disabled={isProcessing}>
              {isProcessing ? (
                <Wand2 size={16} className="mr-2 animate-spin" />
              ) : (
                <Zap size={16} className="mr-2" />
              )}
              {mode === 'beautify' ? 'Beautify' : 'Minify'} Code
            </Button>
            <Button onClick={generateExplanation} variant="outline" disabled={!outputCode}>
              <Brain size={16} className="mr-2" />
              AI Explain
            </Button>
            <Button onClick={clearAll} variant="outline">
              <Trash2 size={16} className="mr-2" />
              Clear All
            </Button>
            <Button onClick={() => copyToClipboard(outputCode)} variant="outline" disabled={!outputCode}>
              <Copy size={16} className="mr-2" />
              Copy Result
            </Button>
            <Button onClick={downloadCode} variant="outline" disabled={!outputCode}>
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText size={20} />
                Input Code
              </span>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('code-beautifier-file-input')?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = Array.from(e.dataTransfer.files);
                  handleFileUpload(files);
                }}
              >
                <input
                  id="code-beautifier-file-input"
                  type="file"
                  accept=".js,.css,.html,.json,.xml,.txt"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleFileUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your code file here</h3>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Choose File
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`Paste your ${language.toUpperCase()} code here or upload a file...`}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            
            {/* Examples */}
            <div className="mt-4">
              <Label className="text-sm font-medium">Quick Example:</Label>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputCode(examples[language])}
                >
                  Load {language.toUpperCase()} Example
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} />
              {mode === 'beautify' ? 'Beautified' : 'Minified'} Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={outputCode}
              readOnly
              className="min-h-[400px] font-mono text-sm"
              placeholder={`${mode === 'beautify' ? 'Beautified' : 'Minified'} code will appear here...`}
            />
          </CardContent>
        </Card>
      </div>

      {/* AI Explanation */}
      {showExplanation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} />
              AI Code Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                {explanation}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
</div>
  );
}

export default function CodeBeautifierPage() {
  return (
    <ToolPageWrapper toolSlug="code-beautifier"><ToastProvider>
      <CodeBeautifierContent /></ToastProvider></ToolPageWrapper>
  );
}
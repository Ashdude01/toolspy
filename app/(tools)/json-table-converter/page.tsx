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
  RefreshCw,
  Table,
  FileSpreadsheet,
  Upload,
  ArrowLeftRight,
  Settings,
  Zap,
  Database,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { JSONTableConverterSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface TableData {
  headers: string[];
  rows: any[][];
}

interface ConversionStats {
  inputSize: number;
  outputSize: number;
  rowCount: number;
  columnCount: number;
  conversionTime: number;
}

function JsonTableConverterContent() {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [conversionMode, setConversionMode] = useState<'json-to-table' | 'table-to-json'>('json-to-table');
  const [outputFormat, setOutputFormat] = useState<'csv' | 'xlsx' | 'json'>('csv');
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [customDelimiter, setCustomDelimiter] = useState(',');
  const [flattenNested, setFlattenNested] = useState(true);
  const [preserveTypes, setPreserveTypes] = useState(true);
  const [stats, setStats] = useState<ConversionStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionStatus, setConversionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Utility function to flatten nested objects
  const flattenObject = (obj: any, prefix = ''): any => {
    const flattened: any = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          Object.assign(flattened, flattenObject(obj[key], newKey));
        } else if (Array.isArray(obj[key])) {
          flattened[newKey] = JSON.stringify(obj[key]);
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }
    
    return flattened;
  };

  // Convert JSON to table format
  const jsonToTable = (jsonString: string): TableData => {
    try {
      const parsed = JSON.parse(jsonString);
      let dataArray: any[] = [];
      
      if (Array.isArray(parsed)) {
        dataArray = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        // If it's a single object, wrap it in an array
        dataArray = [parsed];
      } else {
        throw new Error('JSON must be an array or object');
      }

      if (dataArray.length === 0) {
        return { headers: [], rows: [] };
      }

      // Flatten objects if enabled
      if (flattenNested) {
        dataArray = dataArray.map(obj => flattenObject(obj));
      }

      // Collect all unique keys as headers
      const allKeys = new Set<string>();
      dataArray.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(key => allKeys.add(key));
        }
      });

      const headers = Array.from(allKeys);
      
      // Convert to rows
      const rows = dataArray.map(item => {
        return headers.map(header => {
          const value = item?.[header];
          if (value === null || value === undefined) {
            return '';
          }
          if (typeof value === 'object') {
            return JSON.stringify(value);
          }
          return String(value);
        });
      });

      return { headers, rows };
    } catch (error: any) {
      throw new Error(`JSON parsing error: ${error.message}`);
    }
  };

  // Convert table format to JSON
  const tableToJson = (csvString: string): any[] => {
    const lines = csvString.trim().split('\n');
    if (lines.length === 0) {
      return [];
    }

    const delimiter = customDelimiter;
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      
      result.push(current);
      return result;
    };

    let headers: string[] = [];
    let dataStartIndex = 0;

    if (includeHeaders && lines.length > 0) {
      headers = parseCSVLine(lines[0]);
      dataStartIndex = 1;
    } else {
      // Generate default headers
      const firstLine = parseCSVLine(lines[0]);
      headers = firstLine.map((_, index) => `Column${index + 1}`);
    }

    const dataLines = lines.slice(dataStartIndex);
    const result = dataLines.map(line => {
      const values = parseCSVLine(line);
      const obj: any = {};
      
      headers.forEach((header, index) => {
        let value: any = values[index] || '';
        
        // Try to preserve data types if enabled
        if (preserveTypes && value !== '') {
          // Check if it's a number
          if (!isNaN(Number(value)) && value !== '') {
            value = Number(value);
          }
          // Check if it's a boolean
          else if (value.toLowerCase() === 'true') {
            value = true;
          } else if (value.toLowerCase() === 'false') {
            value = false;
          }
          // Check if it's null
          else if (value.toLowerCase() === 'null') {
            value = null;
          }
          // Try to parse as JSON (for arrays/objects)
          else if ((value.startsWith('[') && value.endsWith(']')) || 
                   (value.startsWith('{') && value.endsWith('}'))) {
            try {
              value = JSON.parse(value);
            } catch {
              // Keep as string if JSON parsing fails
            }
          }
        }
        
        obj[header] = value;
      });
      
      return obj;
    });

    return result;
  };

  // Generate CSV output
  const generateCSV = (data: TableData): string => {
    const escapeCSVField = (field: string): string => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    let csv = '';
    
    if (includeHeaders && data.headers.length > 0) {
      csv += data.headers.map(escapeCSVField).join(customDelimiter) + '\n';
    }
    
    csv += data.rows.map(row => 
      row.map(cell => escapeCSVField(String(cell || ''))).join(customDelimiter)
    ).join('\n');
    
    return csv;
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!inputData.trim()) {
      showToast("Please provide input data", "error");
      return;
    }

    setIsProcessing(true);
    setConversionStatus('idle');
    const startTime = Date.now();

    try {
      if (conversionMode === 'json-to-table') {
        const table = jsonToTable(inputData);
        setTableData(table);
        
        if (outputFormat === 'csv') {
          const csv = generateCSV(table);
          setOutputData(csv);
        } else if (outputFormat === 'json') {
          setOutputData(JSON.stringify(table, null, 2));
        }
        // Note: XLSX generation would require a library like xlsx
        
      } else {
        const jsonArray = tableToJson(inputData);
        const jsonOutput = JSON.stringify(jsonArray, null, 2);
        setOutputData(jsonOutput);
        setTableData(null);
      }

      const endTime = Date.now();
      const conversionTime = endTime - startTime;
      
      setStats({
        inputSize: new Blob([inputData]).size,
        outputSize: new Blob([outputData]).size,
        rowCount: tableData?.rows.length || 0,
        columnCount: tableData?.headers.length || 0,
        conversionTime
      });

      setConversionStatus('success');
      showToast("Conversion completed successfully!", "success");
      
    } catch (error: any) {
      setConversionStatus('error');
      setErrorMessage(error.message);
      showToast(`Conversion failed: ${error.message}`, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputData(content);
      
      // Auto-detect format and set conversion mode
      if (file.name.endsWith('.json')) {
        setConversionMode('json-to-table');
      } else if (file.name.endsWith('.csv')) {
        setConversionMode('table-to-json');
      }
      
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

  const downloadFile = () => {
    if (!outputData) {
      showToast("No data to download", "error");
      return;
    }
    
    const extension = outputFormat === 'json' ? 'json' : 'csv';
    const mimeType = outputFormat === 'json' ? 'application/json' : 'text/csv';
    
    const blob = new Blob([outputData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("File downloaded successfully", "success");
  };

  const clearAll = () => {
    setInputData("");
    setOutputData("");
    setTableData(null);
    setStats(null);
    setConversionStatus('idle');
    setErrorMessage("");
    showToast("Cleared all data", "info");
  };

  const examples = {
    'json-to-table': [
      {
        name: "Simple Array",
        data: '[{"name": "John", "age": 30, "city": "New York"}, {"name": "Jane", "age": 25, "city": "Boston"}]'
      },
      {
        name: "Nested Objects",
        data: '[{"user": {"name": "Alice", "profile": {"age": 28, "location": "SF"}}, "orders": [1, 2, 3]}]'
      }
    ],
    'table-to-json': [
      {
        name: "CSV Data",
        data: 'name,age,city\nJohn,30,New York\nJane,25,Boston'
      },
      {
        name: "Product Data",
        data: 'product,price,category\nLaptop,999.99,Electronics\nChair,149.50,Furniture'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl text-white">
            <ArrowLeftRight size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JSON ↔ Table Converter
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert JSON to CSV/Excel and vice versa with advanced preview, 
          batch processing, and AI-powered table insights.
        </p>
      </div>

      {/* Status & Stats */}
      {(conversionStatus !== 'idle' || stats) && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              {conversionStatus !== 'idle' && (
                <div className="flex items-center gap-2">
                  {conversionStatus === 'success' ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">Conversion Successful</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="text-red-500" size={20} />
                      <span className="text-red-600 font-medium">Conversion Failed</span>
                    </>
                  )}
                </div>
              )}
              
              {stats && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Input: {stats.inputSize} bytes</span>
                  <span>Output: {stats.outputSize} bytes</span>
                  <span>Rows: {stats.rowCount}</span>
                  <span>Columns: {stats.columnCount}</span>
                  <span>Time: {stats.conversionTime}ms</span>
                </div>
              )}
            </div>
            
            {conversionStatus === 'error' && errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
                  <AlertTriangle size={16} />
                  Error Details
                </div>
                <div className="text-sm text-red-600">{errorMessage}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Conversion Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="conversion-mode">Conversion Mode</Label>
              <Select value={conversionMode} onValueChange={(value: any) => setConversionMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json-to-table">JSON → Table</SelectItem>
                  <SelectItem value="table-to-json">Table → JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="output-format">Output Format</Label>
              <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="delimiter">CSV Delimiter</Label>
              <Input
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                placeholder=","
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-headers"
                  checked={includeHeaders}
                  onCheckedChange={setIncludeHeaders}
                />
                <Label htmlFor="include-headers">Include Headers</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="flatten-nested"
                  checked={flattenNested}
                  onCheckedChange={setFlattenNested}
                />
                <Label htmlFor="flatten-nested">Flatten Nested</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="preserve-types"
                  checked={preserveTypes}
                  onCheckedChange={setPreserveTypes}
                />
                <Label htmlFor="preserve-types">Preserve Types</Label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleConvert} disabled={isProcessing}>
              {isProcessing ? (
                <RefreshCw size={16} className="mr-2 animate-spin" />
              ) : (
                <Zap size={16} className="mr-2" />
              )}
              Convert
            </Button>
            <Button onClick={clearAll} variant="outline">
              <Trash2 size={16} className="mr-2" />
              Clear All
            </Button>
            <Button onClick={() => copyToClipboard(outputData)} variant="outline" disabled={!outputData}>
              <Copy size={16} className="mr-2" />
              Copy Result
            </Button>
            <Button onClick={downloadFile} variant="outline" disabled={!outputData}>
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
                {conversionMode === 'json-to-table' ? (
                  <>
                    <Database size={20} />
                    Input JSON
                  </>
                ) : (
                  <>
                    <Table size={20} />
                    Input CSV/Table
                  </>
                )}
              </span>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('json-table-file-input')?.click()}
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
                  id="json-table-file-input"
                  type="file"
                  accept=".json,.csv,.txt"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleFileUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your file here</h3>
                <p className="text-gray-600 mb-4">JSON, CSV, or TXT files supported</p>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Choose File
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={conversionMode === 'json-to-table' 
                ? "Paste your JSON here or upload a file..." 
                : "Paste your CSV data here or upload a file..."
              }
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            
            {/* Examples */}
            <div className="mt-4">
              <Label className="text-sm font-medium">Quick Examples:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {examples[conversionMode].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputData(example.data)}
                  >
                    {example.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet size={20} />
              Output {outputFormat.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={outputData}
              readOnly
              className="min-h-[400px] font-mono text-sm"
              placeholder="Converted data will appear here..."
            />
            
            {/* Table Preview */}
            {tableData && tableData.headers.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">Table Preview:</Label>
                <div className="border rounded-lg overflow-auto max-h-48">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        {tableData.headers.map((header, index) => (
                          <th key={index} className="text-left p-2 font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2">
                              {String(cell || '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {tableData.rows.length > 5 && (
                    <div className="p-2 text-center text-sm text-gray-500 bg-gray-50">
                      ... and {tableData.rows.length - 5} more rows
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SEO Content */}
      <JSONTableConverterSEOContent />
    </div>
  );
}

export default function JsonTableConverterPage() {
  return (
    <ToolPageWrapper toolSlug="json-table-converter"><ToastProvider>
      <JsonTableConverterContent /></ToastProvider></ToolPageWrapper>
  );
}
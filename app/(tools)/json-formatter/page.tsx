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
  Eye,
  Code,
  CheckCircle,
  XCircle,
  Settings,
  Zap,
  FileText,
  Upload,
  ChevronDown,
  ChevronRight,
  Braces,
  AlertTriangle,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface JsonNode {
  key?: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  path: string;
  expanded?: boolean;
}

interface ValidationError {
  line: number;
  column: number;
  message: string;
  position: number;
}

function JsonFormatterContent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [viewMode, setViewMode] = useState<'formatted' | 'tree' | 'minified'>('formatted');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [removeComments, setRemoveComments] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [jsonTree, setJsonTree] = useState<JsonNode[]>([]);
  const [stats, setStats] = useState<{
    size: number;
    lines: number;
    objects: number;
    arrays: number;
    strings: number;
    numbers: number;
  } | null>(null);
  
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndParseJson = (jsonString: string) => {
    try {
      if (!jsonString.trim()) {
        setIsValid(null);
        setValidationErrors([]);
        setOutput("");
        setJsonTree([]);
        setStats(null);
        return null;
      }

      // Remove comments if enabled
      let processedJson = jsonString;
      if (removeComments) {
        processedJson = jsonString.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
      }

      const parsed = JSON.parse(processedJson);
      setIsValid(true);
      setValidationErrors([]);
      
      // Calculate statistics
      const calculateStats = (obj: any): any => {
        let objects = 0, arrays = 0, strings = 0, numbers = 0;
        
        const traverse = (item: any) => {
          if (Array.isArray(item)) {
            arrays++;
            item.forEach(traverse);
          } else if (typeof item === 'object' && item !== null) {
            objects++;
            Object.values(item).forEach(traverse);
          } else if (typeof item === 'string') {
            strings++;
          } else if (typeof item === 'number') {
            numbers++;
          }
        };
        
        traverse(obj);
        return { objects, arrays, strings, numbers };
      };

      const statsData = calculateStats(parsed);
      setStats({
        ...statsData,
        size: new Blob([jsonString]).size,
        lines: jsonString.split('\n').length
      });

      return parsed;
    } catch (error: any) {
      setIsValid(false);
      
      // Enhanced error parsing
      const errorMessage = error.message;
      const positionMatch = errorMessage.match(/position (\d+)/);
      const lineMatch = errorMessage.match(/line (\d+)/);
      const columnMatch = errorMessage.match(/column (\d+)/);
      
      const position = positionMatch ? parseInt(positionMatch[1]) : 0;
      const line = lineMatch ? parseInt(lineMatch[1]) : 1;
      const column = columnMatch ? parseInt(columnMatch[1]) : 1;
      
      setValidationErrors([{
        line,
        column,
        message: errorMessage,
        position
      }]);
      
      setOutput("");
      setJsonTree([]);
      setStats(null);
      return null;
    }
  };

  const formatJson = (parsed: any) => {
    try {
      let result = parsed;
      
      if (sortKeys && typeof parsed === 'object' && parsed !== null) {
        const sortObject = (obj: any): any => {
          if (Array.isArray(obj)) {
            return obj.map(sortObject);
          } else if (typeof obj === 'object' && obj !== null) {
            const sorted: any = {};
            Object.keys(obj).sort().forEach(key => {
              sorted[key] = sortObject(obj[key]);
            });
            return sorted;
          }
          return obj;
        };
        result = sortObject(parsed);
      }

      if (viewMode === 'minified') {
        return JSON.stringify(result);
      } else {
        return JSON.stringify(result, null, indentSize);
      }
    } catch (error) {
      return "";
    }
  };

  const buildJsonTree = (obj: any, path = '', key?: string): JsonNode[] => {
    const nodes: JsonNode[] = [];
    
    if (Array.isArray(obj)) {
      const node: JsonNode = {
        key,
        value: obj,
        type: 'array',
        path,
        expanded: true
      };
      nodes.push(node);
      
      obj.forEach((item, index) => {
        const childPath = `${path}[${index}]`;
        nodes.push(...buildJsonTree(item, childPath, index.toString()));
      });
    } else if (typeof obj === 'object' && obj !== null) {
      const node: JsonNode = {
        key,
        value: obj,
        type: 'object',
        path,
        expanded: true
      };
      nodes.push(node);
      
      Object.entries(obj).forEach(([k, v]) => {
        const childPath = path ? `${path}.${k}` : k;
        nodes.push(...buildJsonTree(v, childPath, k));
      });
    } else {
      const getType = (value: any): JsonNode['type'] => {
        if (value === null) return 'null';
        if (typeof value === 'boolean') return 'boolean';
        if (typeof value === 'number') return 'number';
        return 'string';
      };
      
      nodes.push({
        key,
        value: obj,
        type: getType(obj),
        path
      });
    }
    
    return nodes;
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    const parsed = validateAndParseJson(value);
    
    if (parsed !== null) {
      const formatted = formatJson(parsed);
      setOutput(formatted);
      
      if (viewMode === 'tree') {
        const tree = buildJsonTree(parsed);
        setJsonTree(tree);
      }
    }
  };

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleInputChange(content);
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

  const downloadJson = () => {
    if (!output) {
      showToast("No valid JSON to download", "error");
      return;
    }
    
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("JSON downloaded successfully", "success");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setJsonTree([]);
    setValidationErrors([]);
    setIsValid(null);
    setStats(null);
    showToast("Cleared all data", "info");
  };

  const examples = [
    {
      name: "Simple Object",
      data: '{"name": "John Doe", "age": 30, "city": "New York"}'
    },
    {
      name: "Nested Array",
      data: '{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}], "total": 2}'
    },
    {
      name: "Complex Structure",
      data: '{"api": {"version": "1.0", "endpoints": [{"path": "/users", "methods": ["GET", "POST"]}, {"path": "/products", "methods": ["GET"]}]}, "config": {"timeout": 5000, "retries": 3}}'
    }
  ];

  const renderJsonTree = (nodes: JsonNode[], level = 0) => {
    return nodes.map((node, index) => {
      if (node.type === 'object' || node.type === 'array') {
        return (
          <div key={`${node.path}-${index}`} style={{ marginLeft: `${level * 20}px` }}>
            <div className="flex items-center gap-2 py-1 hover:bg-gray-50 rounded px-2">
              <button onClick={() => {
                // Toggle expansion logic would go here
              }}>
                {node.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <span className="font-semibold text-blue-600">
                {node.key ? `"${node.key}": ` : ""}
                {node.type === 'array' ? `[${node.value.length}]` : `{${Object.keys(node.value).length}}`}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div key={`${node.path}-${index}`} style={{ marginLeft: `${(level + 1) * 20}px` }} className="py-1 hover:bg-gray-50 rounded px-2">
            <span className="text-gray-600">{node.key ? `"${node.key}": ` : ""}</span>
            <span className={`${
              node.type === 'string' ? 'text-green-600' :
              node.type === 'number' ? 'text-blue-600' :
              node.type === 'boolean' ? 'text-purple-600' :
              'text-gray-400'
            }`}>
              {node.type === 'string' ? `"${node.value}"` : String(node.value)}
            </span>
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
            <Braces size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JSON Formatter & Validator
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Format, validate, and visualize JSON data with advanced features. 
          Support for tree view, error highlighting, and bulk operations.
        </p>
      </div>

      {/* Stats & Status */}
      {(isValid !== null || stats) && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              {isValid !== null && (
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">Valid JSON</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500" size={20} />
                      <span className="text-red-600 font-medium">Invalid JSON</span>
                    </>
                  )}
                </div>
              )}
              
              {stats && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Size: {stats.size} bytes</span>
                  <span>Lines: {stats.lines}</span>
                  <span>Objects: {stats.objects}</span>
                  <span>Arrays: {stats.arrays}</span>
                  <span>Strings: {stats.strings}</span>
                  <span>Numbers: {stats.numbers}</span>
                </div>
              )}
            </div>
            
            {validationErrors.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
                  <AlertTriangle size={16} />
                  Validation Errors
                </div>
                {validationErrors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600">
                    Line {error.line}, Column {error.column}: {error.message}
                  </div>
                ))}
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
            Formatting Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="view-mode">View Mode</Label>
              <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <SelectTrigger id="view-mode" aria-label="Select JSON view mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formatted">Formatted</SelectItem>
                  <SelectItem value="tree">Tree View</SelectItem>
                  <SelectItem value="minified">Minified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="indent">Indent Size</Label>
              <Select value={indentSize.toString()} onValueChange={(value) => setIndentSize(parseInt(value))}>
                <SelectTrigger id="indent" aria-label="Select indentation size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="8">8 spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="sort-keys"
                checked={sortKeys}
                onCheckedChange={setSortKeys}
              />
              <Label htmlFor="sort-keys">Sort Keys</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="remove-comments"
                checked={removeComments}
                onCheckedChange={setRemoveComments}
              />
              <Label htmlFor="remove-comments">Remove Comments</Label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => handleInputChange(input)} 
              variant="outline"
              aria-label="Reformat JSON input"
            >
              <Zap size={16} className="mr-2" aria-hidden="true" />
              Reformat
            </Button>
            <Button 
              onClick={clearAll} 
              variant="outline"
              aria-label="Clear all input and output"
            >
              <Trash2 size={16} className="mr-2" aria-hidden="true" />
              Clear All
            </Button>
            <Button 
              onClick={() => copyToClipboard(output)} 
              variant="outline" 
              disabled={!output}
              aria-label="Copy formatted JSON to clipboard"
            >
              <Copy size={16} className="mr-2" aria-hidden="true" />
              Copy Result
            </Button>
            <Button 
              onClick={downloadJson} 
              variant="outline" 
              disabled={!output}
              aria-label="Download formatted JSON as file"
            >
              <Download size={16} className="mr-2" aria-hidden="true" />
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
                <Code size={20} />
                Input JSON
              </span>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('json-formatter-file-input')?.click()}
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
                role="button"
                tabIndex={0}
                aria-label="Upload JSON file. Drag and drop or click to select"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('json-formatter-file-input')?.click();
                  }
                }}
              >
                <input
                  id="json-formatter-file-input"
                  type="file"
                  accept=".json,.txt"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleFileUpload(files);
                    }
                  }}
                  className="hidden"
                  aria-label="Select JSON file to upload"
                />
                <FileText size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2">Drop your JSON file here</h3>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <Button variant="outline" aria-label="Choose JSON file">
                  <Upload size={16} className="mr-2" aria-hidden="true" />
                  Choose File
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="json-input-textarea" className="sr-only">
              JSON input
            </Label>
            <Textarea
              id="json-input-textarea"
              placeholder="Paste your JSON here or upload a file..."
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              aria-describedby="json-input-description"
            />
            <div id="json-input-description" className="sr-only">
              Enter or paste JSON data to format, validate, or view as tree
            </div>
            
            {/* Examples */}
            <div className="mt-4">
              <Label className="text-sm font-medium">Quick Examples:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange(example.data)}
                    aria-label={`Load ${example.name} example`}
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
              <Eye size={20} />
              {viewMode === 'tree' ? 'Tree View' : viewMode === 'minified' ? 'Minified JSON' : 'Formatted JSON'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'tree' && jsonTree.length > 0 ? (
              <div className="min-h-[400px] font-mono text-sm border rounded-lg p-4 overflow-auto bg-gray-50">
                {renderJsonTree(jsonTree)}
              </div>
            ) : (
              <>
                <Label htmlFor="json-output-textarea" className="sr-only">
                  Formatted JSON output
                </Label>
                <Textarea
                  id="json-output-textarea"
                  value={output}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Formatted JSON will appear here..."
                  aria-label="Formatted JSON output"
                  aria-describedby="json-output-description"
                />
                <div id="json-output-description" className="sr-only">
                  Formatted JSON result based on selected view mode and formatting options
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function JsonFormatterPage() {
  return (
    <ToolPageWrapper toolSlug="json-formatter"><ToastProvider>
      <JsonFormatterContent /></ToastProvider></ToolPageWrapper>
  );
}
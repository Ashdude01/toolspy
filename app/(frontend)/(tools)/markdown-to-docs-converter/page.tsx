"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UniversalFileUpload } from "@/components/tools/shared/universal-file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Trash2,
  Settings,
  Globe,
  ChevronDown,
  ChevronUp,
  Shield,
  FileText,
  File,
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";

// Import SEO Content Component
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

// Document format configurations
const DOC_FORMATS = {
  html: {
    name: "HTML",
    icon: <Globe className="h-5 w-5" />,
    description: "Convert to HTML with styling",
    extension: "html",
  },
  pdf: {
    name: "PDF",
    icon: <FileText className="h-5 w-5" />,
    description: "Convert to PDF document",
    extension: "pdf",
  },
  docx: {
    name: "Word Document",
    icon: <FileText className="h-5 w-5" />,
    description: "Convert to Word document",
    extension: "docx",
  },
  txt: {
    name: "Plain Text",
    icon: <File className="h-5 w-5" />,
    description: "Convert to plain text",
    extension: "txt",
  },
};

function MarkdownToDocsConverterContent() {
  const { showToast } = useToast();
  const [markdownContent, setMarkdownContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["html"]);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentAuthor, setDocumentAuthor] = useState("");
  const [includeTableOfContents, setIncludeTableOfContents] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedDocs, setConvertedDocs] = useState<File[]>([]);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    format: "",
  });

  // Advanced options
  const [theme, setTheme] = useState("default");
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [pageSize, setPageSize] = useState("A4");
  const [margins, setMargins] = useState({ top: 1, right: 1, bottom: 1, left: 1 });
  const [includeHeader, setIncludeHeader] = useState(false);
  const [includeFooter, setIncludeFooter] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("");
  const [customCSS, setCustomCSS] = useState("");
  const [enableSyntaxHighlighting, setEnableSyntaxHighlighting] = useState(true);
  const [enableMathSupport, setEnableMathSupport] = useState(false);

  const afterUploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "text/markdown" || file.name.endsWith(".md")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setMarkdownContent(content);
          scrollToElement(afterUploadRef, 50);
        };
        reader.readAsText(file);
      } else {
        showToast("Please select a Markdown file (.md)", "error");
      }
    }
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const clearContent = () => {
    setMarkdownContent("");
    setConvertedDocs([]);
    showToast("Content cleared", "info");
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const convertToDocs = async () => {
    if (!markdownContent.trim()) {
      showToast("Please enter Markdown content", "error");
      return;
    }

    if (selectedFormats.length === 0) {
      showToast("Please select at least one format", "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({ current: 0, total: selectedFormats.length, format: "" });
    setConvertedDocs([]);

    try {
      const results: File[] = [];

      for (let i = 0; i < selectedFormats.length; i++) {
        const format = selectedFormats[i];
        const formatConfig = DOC_FORMATS[format as keyof typeof DOC_FORMATS];
        
        setConversionProgress({ 
          current: i + 1, 
          total: selectedFormats.length, 
          format: formatConfig.name 
        });

        let convertedContent = "";
        let fileName = `document.${formatConfig.extension}`;
        let mimeType = "text/plain";

        if (documentTitle) {
          fileName = `${documentTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${formatConfig.extension}`;
        }

        try {
          
          switch (format) {
            case "html":
              convertedContent = await convertToHTML(markdownContent);
              mimeType = "text/html";
              break;
            case "txt":
              convertedContent = convertToText(markdownContent);
              mimeType = "text/plain";
              break;
            case "pdf":
              // For PDF, we'll create an HTML version optimized for printing
              convertedContent = await convertToPDF(markdownContent);
              mimeType = "application/pdf";
              break;
            case "docx":
              // For DOCX, we'll create an HTML version that can be opened in Word
              convertedContent = await convertToDOCX(markdownContent);
              mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
              break;
            default:
              throw new Error(`Unsupported format: ${format}`);
          }
          
        } catch (conversionError) {
          console.error(`Error converting to ${format}:`, conversionError);
          throw new Error(`Failed to convert to ${format}: ${conversionError instanceof Error ? conversionError.message : 'Unknown error'}`);
        }

        try {
          const file = new (File as any)([convertedContent], fileName, { type: mimeType });
          results.push(file);
        } catch (fileError) {
          console.error(`Error creating file ${fileName}:`, fileError);
          throw new Error(`Failed to create file ${fileName}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`);
        }
      }

      setConvertedDocs(results);
      showToast(`Converted to ${results.length} format(s)`, "success");
      scrollToElement(resultsRef);
    } catch (error) {
      console.error('Conversion failed:', error);
      showToast("Conversion failed: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    } finally {
      setIsConverting(false);
    }
  };

  const convertToHTML = async (markdown: string): Promise<string> => {
    try {
      // Simple and robust markdown to HTML conversion
      let html = markdown;
      
      // Basic fallback if markdown is empty or invalid
      if (!html || html.trim().length === 0) {
        html = "No content to convert";
      }
      
      // Code blocks first (to avoid conflicts with inline code)
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
        const language = lang ? ` class="language-${lang}"` : '';
        return `<pre><code${language}>${code.trim()}</code></pre>`;
      });
      
      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      
      // Bold and italic (order matters)
      html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
      html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
      
      // Strikethrough
      html = html.replace(/~~(.*?)~~/gim, '<del>$1</del>');
      
      // Inline code
      html = html.replace(/`([^`]*)`/gim, '<code>$1</code>');
      
      // Links
      html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Images
      html = html.replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');
      
      // Lists
      html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
      
      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
      
      // Horizontal rules
      html = html.replace(/^---$/gim, '<hr>');
      html = html.replace(/^\*\*\*$/gim, '<hr>');
      
      // Line breaks (convert double newlines to paragraphs)
      html = html.replace(/\n\n/gim, '</p><p>');
      html = html.replace(/\n/gim, '<br>');
      
      // Wrap in paragraph tags
      html = '<p>' + html + '</p>';
      
      // Fix list formatting
      html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
      html = html.replace(/<\/ul><ul>/gim, '');
      
      // Fix blockquote formatting
      html = html.replace(/(<blockquote>.*<\/blockquote>)/gim, '$1');
      
      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/gim, '');
      html = html.replace(/<p><br><\/p>/gim, '');

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTitle || "Document"}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: ${fontSize}px;
            line-height: ${lineHeight};
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        }
        h1, h2, h3 {
            color: ${theme === 'dark' ? '#ffffff' : '#2c3e50'};
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        code {
            background-color: ${theme === 'dark' ? '#2d2d2d' : '#f4f4f4'};
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            color: ${theme === 'dark' ? '#ffffff' : '#333'};
        }
        pre {
            background-color: ${theme === 'dark' ? '#2d2d2d' : '#f4f4f4'};
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
        }
        pre code {
            background: none;
            padding: 0;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        blockquote {
            border-left: 4px solid #3498db;
            margin: 0;
            padding-left: 20px;
            color: #666;
            font-style: italic;
        }
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin: 5px 0;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .toc {
            background-color: ${theme === 'dark' ? '#2d2d2d' : '#f8f9fa'};
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            border: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
        }
        .toc h2 {
            margin-top: 0;
            border-bottom: none;
        }
        .toc ul {
            list-style-type: none;
            padding-left: 0;
        }
        .toc li {
            margin: 5px 0;
        }
        .toc a {
            color: ${theme === 'dark' ? '#ffffff' : '#2c3e50'};
        }
        ${customCSS}
    </style>
</head>
<body>
    ${includeHeader && headerText ? `<header style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 1px solid #ddd;">
        <h1>${headerText}</h1>
    </header>` : ''}
    
    <h1>${documentTitle || "Document"}</h1>
    ${documentAuthor ? `<p><strong>Author:</strong> ${documentAuthor}</p>` : ''}
    ${includeTableOfContents ? generateTableOfContents(markdown) : ''}
    <div class="content">
        ${html}
    </div>
    
    ${includeFooter && footerText ? `<footer style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #ddd;">
        <p>${footerText}</p>
    </footer>` : ''}
</body>
</html>`;

      return fullHTML;
    } catch (error) {
      console.error('Error in convertToHTML:', error);
      throw new Error(`HTML conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const convertToText = (markdown: string): string => {
    // Simple markdown to text conversion
    return markdown
      .replace(/^### (.*$)/gim, '$1\n')
      .replace(/^## (.*$)/gim, '$1\n')
      .replace(/^# (.*$)/gim, '$1\n')
      .replace(/\*\*(.*)\*\*/gim, '$1')
      .replace(/\*(.*)\*/gim, '$1')
      .replace(/```([\s\S]*?)```/gim, '$1')
      .replace(/`([^`]*)`/gim, '$1')
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '$1 ($2)');
  };

  const convertToPDF = async (markdown: string): Promise<string> => {
    try {
      // Create HTML optimized for PDF printing
      const html = await convertToHTML(markdown);
      
      // Add PDF-specific styles
      const pdfHTML = html.replace(
        '<style>',
        `<style>
          @media print {
            body {
              font-size: 12pt;
              line-height: 1.4;
              margin: 0;
              padding: 20px;
              color: #000;
              background: #fff;
            }
            h1, h2, h3 {
              page-break-after: avoid;
              color: #000;
              border-bottom: 1px solid #000;
            }
            pre, code {
              background: #f5f5f5;
              border: 1px solid #ddd;
              page-break-inside: avoid;
            }
            .toc {
              page-break-after: always;
            }
            a {
              color: #000;
              text-decoration: underline;
            }
            @page {
              margin: 1in;
              size: ${pageSize};
            }
          }`
      );
      
      return pdfHTML;
    } catch (error) {
      console.error('Error in convertToPDF:', error);
      throw new Error(`PDF conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const convertToDOCX = async (markdown: string): Promise<string> => {
    try {
      // Create HTML that can be opened in Word
      const html = await convertToHTML(markdown);
      
      // Add Word-compatible styles
      const docxHTML = html.replace(
        '<style>',
        `<style>
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.15;
            margin: 1in;
            color: #000;
          }
          h1 {
            font-size: 18pt;
            font-weight: bold;
            margin-top: 12pt;
            margin-bottom: 6pt;
            color: #2F5496;
          }
          h2 {
            font-size: 16pt;
            font-weight: bold;
            margin-top: 10pt;
            margin-bottom: 6pt;
            color: #2F5496;
          }
          h3 {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 8pt;
            margin-bottom: 6pt;
            color: #2F5496;
          }
          p {
            margin-bottom: 6pt;
          }
          code {
            font-family: 'Courier New', monospace;
            background-color: #F2F2F2;
            padding: 1pt 2pt;
          }
          pre {
            font-family: 'Courier New', monospace;
            background-color: #F2F2F2;
            padding: 6pt;
            border: 1pt solid #D9D9D9;
            margin: 6pt 0;
          }
          a {
            color: #0563C1;
            text-decoration: underline;
          }
          .toc {
            background-color: #F8F8F8;
            border: 1pt solid #D9D9D9;
            padding: 12pt;
            margin-bottom: 12pt;
          }
        </style>`
      );
      
      return docxHTML;
    } catch (error) {
      console.error('Error in convertToDOCX:', error);
      throw new Error(`DOCX conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const generateTableOfContents = (markdown: string): string => {
    const headers = markdown.match(/^#{1,3} (.*$)/gim);
    if (!headers || headers.length === 0) return '';

    const tocItems = headers.map(header => {
      const level = header.match(/^#+/)?.[0].length || 1;
      const text = header.replace(/^#+\s*/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `<li style="margin-left: ${(level - 1) * 20}px;"><a href="#${id}">${text}</a></li>`;
    }).join('');

    return `
    <div class="toc">
        <h2>Table of Contents</h2>
        <ul>
            ${tocItems}
        </ul>
    </div>`;
  };

  const downloadAllDocs = async () => {
    if (convertedDocs.length === 0) {
      showToast("No documents available for download", "error");
      return;
    }

    try {
      const allFiles: File[] = [...convertedDocs];

      // Create README file
      const readmeContent = `# Documents Generated by Toolspy

This package contains documents generated from your Markdown content.

## Files Included:
${convertedDocs.map(file => `- ${file.name}`).join('\n')}

## How to Use:
1. Extract all files to your desired location
2. Open HTML files in your web browser
3. Open PDF files with your PDF viewer
4. Open DOCX files with Microsoft Word or similar
5. Open TXT files with any text editor

## Generated by Toolspy
Visit https://toolspy.net for more free online tools.

Generated on: ${new Date().toLocaleString()}
`;

      const readmeFile = new (File as any)([readmeContent], "README.txt", { type: "text/plain" });
      allFiles.push(readmeFile);

      const zipBlob = await createZipFromFiles(allFiles, "markdown-docs.zip");
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadZip(zipBlob, `${watermark}-markdown-docs.zip`);
    } catch (error) {
      showToast(`ZIP Error: ${error instanceof Error ? error.message : "Failed to create ZIP file"}`, "error");
    }
  };

  const downloadSingleDoc = (file: File) => {
    downloadFile(file, file.name);
  };

  const formatCards = Object.entries(DOC_FORMATS).map(([key, config]) => ({
    key,
    ...config,
  }));

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        {/* Main Heading */}
        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Markdown to Docs Converter
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Convert Markdown to multiple document formats with Toolspy's advanced converter. 
          Create HTML, PDF, Word, and text documents with complete privacy protection.
        </p>
      </div>

      {/* File Upload */}
      <UniversalFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={false}
        maxFiles={1}
        fileTypes={['markdown']}
        className="mb-6 sm:mb-8"
        title="Drag and drop your Markdown file here"
        description="Supports MD, MARKDOWN, MDOWN, MKDN, MKD, MDWN, MDTXT, MDTEXT files"
        showUrlImport={true}
        showPasteFromClipboard={false}
      />

      {/* Markdown Input and Settings */}
      <div ref={afterUploadRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
          {/* Markdown Input */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Markdown Content</CardTitle>
                  <CardDescription>Enter or paste your Markdown content</CardDescription>
                </div>
                <Button variant="outline" onClick={clearContent} size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your Markdown content here..."
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Document Settings */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Document Settings</CardTitle>
              <CardDescription>Configure document properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-title">Document Title</Label>
                <Input
                  id="doc-title"
                  placeholder="My Document"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-author">Author</Label>
                <Input
                  id="doc-author"
                  placeholder="Author Name"
                  value={documentAuthor}
                  onChange={(e) => setDocumentAuthor(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeTableOfContents}
                  onCheckedChange={setIncludeTableOfContents}
                />
                <Label>Include Table of Contents</Label>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Fine-tune document appearance</CardDescription>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  size="sm"
                  className="hidden md:flex gap-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">
                    {showAdvanced ? "Hide" : "Advanced"}
                  </span>
                  <span className="xl:hidden">
                    {showAdvanced ? "Hide" : "More"}
                  </span>
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                <Slider
                  id="font-size"
                  min={10}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="line-height">Line Height: {lineHeight}</Label>
                <Slider
                  id="line-height"
                  min={1.0}
                  max={2.5}
                  step={0.1}
                  value={[lineHeight]}
                  onValueChange={(value) => setLineHeight(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-size">Page Size</Label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                    <SelectItem value="Letter">Letter</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableSyntaxHighlighting}
                  onCheckedChange={setEnableSyntaxHighlighting}
                />
                <Label>Syntax Highlighting</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={enableMathSupport}
                  onCheckedChange={setEnableMathSupport}
                />
                <Label>Math Support (LaTeX)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeHeader}
                  onCheckedChange={setIncludeHeader}
                />
                <Label>Include Header</Label>
              </div>

              {includeHeader && (
                <div className="space-y-2">
                  <Label htmlFor="header-text">Header Text</Label>
                  <Input
                    id="header-text"
                    placeholder="Header text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeFooter}
                  onCheckedChange={setIncludeFooter}
                />
                <Label>Include Footer</Label>
              </div>

              {includeFooter && (
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Input
                    id="footer-text"
                    placeholder="Footer text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                  />
                </div>
              )}

              {showAdvanced && (
                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS</Label>
                  <Textarea
                    id="custom-css"
                    placeholder="/* Custom CSS styles */"
                    value={customCSS}
                    onChange={(e) => setCustomCSS(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Format Selection */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Output Formats</CardTitle>
            <CardDescription>Select formats to convert your Markdown to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formatCards.map(({ key, name, icon, description }) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedFormats.includes(key)
                      ? "ring-1 ring-primary bg-primary/10"
                      : "hover:shadow-md hover:ring-1 hover:ring-primary"
                  }`}
                  onClick={() => toggleFormat(key)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {icon}
                      <span className="font-semibold text-sm">{name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Convert Button */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-6">
            <Button
              onClick={convertToDocs}
              disabled={!markdownContent.trim() || selectedFormats.length === 0 || isConverting}
              size="lg"
              className="w-full"
            >
              {isConverting
                ? "Converting to Documents..."
                : `Convert to ${selectedFormats.length} Format(s)`}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Converted Documents */}
      {convertedDocs.length > 0 && (
        <Card ref={resultsRef}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Converted Documents</CardTitle>
                <CardDescription>
                  {convertedDocs.length} document(s) converted successfully
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAllDocs} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download All ZIP</span>
                  <span className="sm:hidden">All ZIP</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedDocs.map((file, index) => {
                const format = selectedFormats[index];
                const formatConfig = DOC_FORMATS[format as keyof typeof DOC_FORMATS];
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {formatConfig.icon}
                        <div>
                          <h4 className="font-semibold">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatConfig.name} • {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingleDoc(file)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isConverting}
        title="Converting to Documents"
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.format}
        description="Please wait while we convert your Markdown to documents..."
      />
</div>
  );
}

export default function MarkdownToDocsConverterPage() {
  return (
    <ToolPageWrapper toolSlug="markdown-to-docs-converter"><ToastProvider>
      <MarkdownToDocsConverterContent /></ToastProvider></ToolPageWrapper>
  );
}

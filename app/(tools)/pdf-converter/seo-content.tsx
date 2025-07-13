import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowUpDown, FileImage, Zap } from "lucide-react";

export function PdfConverterSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Professional PDF Converter - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's PDF Converter is a comprehensive tool for converting PDF documents 
            to various formats including images, text, and more. Perfect for extracting 
            content from PDFs, creating presentations, or preparing documents for different 
            workflows. Our converter maintains high quality while offering flexible output options.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Multiple Output Formats:</strong> Convert to PNG, JPG, TXT, and more</li>
            <li><strong>High-Quality Images:</strong> Customizable DPI up to 300 for crisp output</li>
            <li><strong>Text Extraction:</strong> Extract editable text from PDF documents</li>
            <li><strong>Batch Processing:</strong> Convert multiple PDFs simultaneously</li>
            <li><strong>Quality Control:</strong> Adjustable image quality and compression settings</li>
            <li><strong>Page Management:</strong> Convert specific pages or entire documents</li>
          </ul>

          <h3>Perfect for Various Workflows</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Document Processing</h4>
              <p className="text-sm text-muted-foreground">
                Extract text from scanned documents and legacy PDFs for editing
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Presentation Creation</h4>
              <p className="text-sm text-muted-foreground">
                Convert PDF slides to images for PowerPoint or other presentations
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Web Publishing</h4>
              <p className="text-sm text-muted-foreground">
                Convert PDFs to web-friendly images for online publication
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Content Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Extract text for data analysis, SEO optimization, or translation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the PDF Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Upload PDF Files</h4>
                <p className="text-sm text-muted-foreground">
                  Select up to 10 PDF files from your device. Drag and drop or click to browse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Choose Output Format</h4>
                <p className="text-sm text-muted-foreground">
                  Select PNG/JPG for images or TXT for text extraction. Adjust quality and DPI settings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Start Conversion</h4>
                <p className="text-sm text-muted-foreground">
                  Click convert to process your PDFs with the selected settings and quality options.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Download Results</h4>
                <p className="text-sm text-muted-foreground">
                  Download converted files individually or as a batch. Multi-page PDFs create ZIP files.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Conversion Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Image Formats</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• PNG (lossless)</li>
                <li>• JPG (compressed)</li>
                <li>• Customizable quality</li>
                <li>• 72-300 DPI resolution</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Text Extraction</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Plain text output</li>
                <li>• Page-by-page extraction</li>
                <li>• Preserves text structure</li>
                <li>• UTF-8 encoding</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Batch Features</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Multiple file processing</li>
                <li>• Progress tracking</li>
                <li>• ZIP file creation</li>
                <li>• Error handling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📊 Business & Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Extract data from PDF reports, convert charts to images for presentations, 
                or prepare documents for data analysis and business intelligence workflows.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎓 Education & Research</h4>
              <p className="text-sm text-muted-foreground">
                Convert academic papers to images for citations, extract text for research, 
                or prepare study materials in different formats for better accessibility.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🌐 Web Development</h4>
              <p className="text-sm text-muted-foreground">
                Convert PDF content to web-friendly formats, extract text for SEO optimization, 
                or create image previews for document galleries and portfolios.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">📱 Mobile & Social Media</h4>
              <p className="text-sm text-muted-foreground">
                Convert PDFs to images for social media sharing, create mobile-friendly content, 
                or prepare documents for apps that don't support PDF viewing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">What formats can I convert PDFs to?</h4>
              <p className="text-sm text-muted-foreground">
                Currently supported formats include PNG images, JPG images, and plain text (TXT). 
                We're working on adding more formats like Word documents and Excel spreadsheets.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What's the maximum file size and number of files?</h4>
              <p className="text-sm text-muted-foreground">
                You can upload up to 10 PDF files at once, with each file up to 10MB in size. 
                For larger files or batch processing, consider splitting your PDFs first.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">How does text extraction work with scanned PDFs?</h4>
              <p className="text-sm text-muted-foreground">
                Our tool can extract text from PDFs that contain selectable text. For scanned PDFs 
                (images), the text extraction may be limited. Consider using OCR tools first.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is my data secure during conversion?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! All PDF processing happens locally in your browser. Your files never leave 
                your device, ensuring complete privacy and security for sensitive documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
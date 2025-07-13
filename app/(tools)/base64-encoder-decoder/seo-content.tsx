import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileText, Shield, ArrowUpDown } from "lucide-react";

export function Base64EncoderDecoderSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Professional Base64 Encoder/Decoder - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's Base64 Encoder/Decoder is a versatile tool for converting text to and from 
            Base64 format. Essential for developers, system administrators, and anyone working 
            with data encoding, APIs, or web development. Our tool supports various encoding 
            options and provides instant, secure conversion.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Bidirectional Conversion:</strong> Encode text to Base64 and decode Base64 to text</li>
            <li><strong>URL-Safe Encoding:</strong> Support for URL-safe Base64 format</li>
            <li><strong>Multiple Encodings:</strong> UTF-8, ASCII, and Latin1 support</li>
            <li><strong>Line Break Options:</strong> Add line breaks for better readability</li>
            <li><strong>File Upload:</strong> Process text files directly</li>
            <li><strong>Real-time Validation:</strong> Instant feedback on Base64 validity</li>
          </ul>

          <h3>Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">API Development</h4>
              <p className="text-sm text-muted-foreground">
                Encode authentication tokens, API keys, and request payloads
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Data URLs</h4>
              <p className="text-sm text-muted-foreground">
                Create data URLs for embedding images and files in HTML/CSS
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Email Attachments</h4>
              <p className="text-sm text-muted-foreground">
                Encode binary data for email transmission and storage
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Configuration Files</h4>
              <p className="text-sm text-muted-foreground">
                Store encoded credentials and sensitive data in config files
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Base64 Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Choose Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Select "Encode" to convert text to Base64 or "Decode" to convert Base64 to text.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Configure Options</h4>
                <p className="text-sm text-muted-foreground">
                  Set encoding type, line breaks, and URL-safe options based on your needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Input Your Data</h4>
                <p className="text-sm text-muted-foreground">
                  Type or paste text, or upload a file to process the content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Get Results</h4>
                <p className="text-sm text-muted-foreground">
                  Copy the result to clipboard or download it as a text file.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Encoding Support</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• UTF-8 (default)</li>
                <li>• ASCII</li>
                <li>• Latin1 (ISO-8859-1)</li>
                <li>• URL-safe Base64</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Format Options</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Standard Base64</li>
                <li>• URL-safe encoding</li>
                <li>• Line breaks (64 chars)</li>
                <li>• Padding control</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">File Support</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Text files (.txt)</li>
                <li>• JSON files (.json)</li>
                <li>• XML files (.xml)</li>
                <li>• CSV files (.csv)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Base64 Alphabet */}
      <Card>
        <CardHeader>
          <CardTitle>Base64 Character Set</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg font-mono text-sm">
              <div className="mb-2 font-semibold">Standard Base64 Alphabet:</div>
              <div className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/</div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg font-mono text-sm">
              <div className="mb-2 font-semibold">URL-Safe Base64 Alphabet:</div>
              <div className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary mb-2">Standard Base64</div>
                <div className="text-muted-foreground text-sm">
                  Uses + and / characters with = padding
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-primary mb-2">URL-Safe Base64</div>
                <div className="text-muted-foreground text-sm">
                  Uses - and _ characters, no padding
                </div>
              </div>
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
              <h4 className="font-semibold mb-2">What is Base64 encoding used for?</h4>
              <p className="text-sm text-muted-foreground">
                Base64 encoding converts binary data to ASCII text, making it safe for transmission 
                over text-based protocols like email, HTTP, and JSON. It's commonly used for API 
                authentication, data URLs, and storing binary data in text formats.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">When should I use URL-safe Base64?</h4>
              <p className="text-sm text-muted-foreground">
                Use URL-safe Base64 when the encoded data will be used in URLs, filenames, or 
                anywhere that + and / characters might cause issues. It replaces + with - and / with _.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Why is Base64 data larger than the original?</h4>
              <p className="text-sm text-muted-foreground">
                Base64 encoding increases data size by approximately 33% because it represents 
                every 3 bytes of binary data as 4 ASCII characters. This trade-off ensures 
                compatibility with text-based systems.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is Base64 encoding secure?</h4>
              <p className="text-sm text-muted-foreground">
                Base64 is encoding, not encryption. It's easily reversible and provides no security. 
                Use it for data format conversion, not for protecting sensitive information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, Globe, Zap } from "lucide-react";

export function QrCodeGeneratorSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Professional QR Code Generator - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's QR Code Generator creates high-quality, customizable QR codes for any purpose. 
            Whether you need QR codes for business cards, marketing materials, WiFi sharing, or 
            digital menus, our tool provides professional-grade results with extensive customization 
            options and instant generation.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Multiple Content Types:</strong> Text, URLs, emails, phone numbers, SMS, and WiFi</li>
            <li><strong>Custom Styling:</strong> Adjustable colors, sizes, and error correction levels</li>
            <li><strong>High Resolution:</strong> Generate QR codes up to 1024x1024 pixels</li>
            <li><strong>Error Correction:</strong> Four levels of redundancy for reliable scanning</li>
            <li><strong>Instant Preview:</strong> Real-time generation with immediate download</li>
            <li><strong>Batch Generation:</strong> Create multiple QR codes with different settings</li>
          </ul>

          <h3>Perfect for Every Industry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Business & Marketing</h4>
              <p className="text-sm text-muted-foreground">
                Create QR codes for business cards, brochures, and promotional materials
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Restaurant & Hospitality</h4>
              <p className="text-sm text-muted-foreground">
                Digital menus, WiFi access, and contactless payment solutions
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Events & Education</h4>
              <p className="text-sm text-muted-foreground">
                Event check-ins, resource links, and educational material access
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Personal Use</h4>
              <p className="text-sm text-muted-foreground">
                Share contact info, WiFi passwords, and social media profiles
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Choose Content Type</h4>
                <p className="text-sm text-muted-foreground">
                  Select from text, URL, email, phone, SMS, or WiFi options to match your needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Enter Your Content</h4>
                <p className="text-sm text-muted-foreground">
                  Type your content or use quick templates for common formats like WiFi networks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Customize Appearance</h4>
                <p className="text-sm text-muted-foreground">
                  Adjust size, colors, quality, and error correction to match your brand or needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Generate & Download</h4>
                <p className="text-sm text-muted-foreground">
                  Create your QR code instantly and download as PNG or copy to clipboard.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Supported QR Code Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">🌐 URL/Website</div>
              <div className="text-muted-foreground">
                Direct links to websites, landing pages, or online resources
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">📧 Email</div>
              <div className="text-muted-foreground">
                Pre-filled email addresses with optional subject lines
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">📱 Phone Numbers</div>
              <div className="text-muted-foreground">
                Direct dial phone numbers for quick contact
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">💬 SMS Messages</div>
              <div className="text-muted-foreground">
                Pre-written text messages with recipient numbers
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">📶 WiFi Networks</div>
              <div className="text-muted-foreground">
                Automatic WiFi connection with network credentials
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">📝 Plain Text</div>
              <div className="text-muted-foreground">
                Any text content, notes, or formatted information
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Resolution Options</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 128x128 to 1024x1024 pixels</li>
                <li>• High-quality PNG output</li>
                <li>• Scalable vector generation</li>
                <li>• Print-ready resolutions</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Error Correction</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Low (7% recovery)</li>
                <li>• Medium (15% recovery)</li>
                <li>• Quartile (25% recovery)</li>
                <li>• High (30% recovery)</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Customization</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Custom foreground colors</li>
                <li>• Custom background colors</li>
                <li>• Quality adjustment</li>
                <li>• Margin control</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">🏪 Retail & E-commerce</h4>
              <p className="text-sm text-muted-foreground">
                Product information, customer reviews, loyalty programs, and mobile payment options. 
                Create QR codes for product catalogs, special offers, and instant checkout processes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎯 Marketing Campaigns</h4>
              <p className="text-sm text-muted-foreground">
                Track campaign effectiveness, direct traffic to landing pages, and measure engagement. 
                Perfect for print advertisements, billboards, and promotional materials.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🏢 Business Operations</h4>
              <p className="text-sm text-muted-foreground">
                Employee directories, office WiFi access, meeting room booking, and document sharing. 
                Streamline operations with contactless information access.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎭 Events & Entertainment</h4>
              <p className="text-sm text-muted-foreground">
                Event tickets, program information, social media sharing, and feedback collection. 
                Enhance attendee experience with instant access to event resources.
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
              <h4 className="font-semibold mb-2">How much data can a QR code store?</h4>
              <p className="text-sm text-muted-foreground">
                QR codes can store up to 7,089 numeric characters, 4,296 alphanumeric characters, 
                or 2,953 bytes of binary data. For most practical uses like URLs and contact info, 
                this is more than sufficient.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What's the best error correction level to use?</h4>
              <p className="text-sm text-muted-foreground">
                Medium (15%) is recommended for most uses. Use High (30%) for environments where 
                the QR code might get damaged, and Low (7%) when you need to maximize data capacity.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I use custom colors for my QR codes?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! You can customize both foreground and background colors. Ensure sufficient 
                contrast between colors for reliable scanning. Dark foreground on light background 
                works best.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Do QR codes expire or stop working?</h4>
              <p className="text-sm text-muted-foreground">
                QR codes themselves never expire. However, if they contain URLs, those links might 
                become inactive over time. Static content like text, phone numbers, and WiFi 
                credentials will always work.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Minimize2, Square, Zap } from "lucide-react";

export function ImageResizerSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5" />
            Professional Image Resizer - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's Image Resizer is a powerful online tool that allows you to resize images
            to specific dimensions or percentages while maintaining professional quality. Whether
            you need to optimize images for web use, social media, or print, our tool provides
            precise control over your image dimensions.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Flexible Resizing:</strong> Resize by percentage or custom pixel dimensions</li>
            <li><strong>Aspect Ratio Control:</strong> Maintain original proportions or stretch to fit</li>
            <li><strong>Quality Adjustment:</strong> Fine-tune compression for optimal file size</li>
            <li><strong>Format Conversion:</strong> Convert between JPEG, PNG, and WebP formats</li>
            <li><strong>Batch Processing:</strong> Resize multiple images with the same settings</li>
            <li><strong>Real-time Preview:</strong> See dimensions and file sizes before download</li>
          </ul>

          <h3>Perfect for Various Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Web Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Resize images for websites, blogs, and online stores to improve loading times
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Social Media</h4>
              <p className="text-sm text-muted-foreground">
                Create perfectly sized images for Instagram, Facebook, Twitter, and other platforms
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Email Marketing</h4>
              <p className="text-sm text-muted-foreground">
                Optimize images for email campaigns with proper dimensions and file sizes
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Print Preparation</h4>
              <p className="text-sm text-muted-foreground">
                Resize images for print materials while maintaining high quality
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Image Resizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Upload Your Images</h4>
                <p className="text-sm text-muted-foreground">
                  Select up to 10 images in JPEG, PNG, or WebP format. Each file can be up to 10MB.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Choose Resize Method</h4>
                <p className="text-sm text-muted-foreground">
                  Select percentage scaling for proportional resizing or custom dimensions for exact sizes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Adjust Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure quality, output format, and aspect ratio options to meet your needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Download Results</h4>
                <p className="text-sm text-muted-foreground">
                  Process your images and download them individually or as a batch.
                </p>
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
              <div className="font-medium text-primary mb-2">Supported Formats</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• JPEG/JPG</li>
                <li>• PNG</li>
                <li>• WebP</li>
                <li>• GIF (static)</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">File Limits</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Max file size: 10MB</li>
                <li>• Max files: 10 per batch</li>
                <li>• Max dimensions: 10,000px</li>
                <li>• Min dimensions: 1px</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Quality Options</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Quality: 10-100%</li>
                <li>• Scale: 10-300%</li>
                <li>• Aspect ratio control</li>
                <li>• Format conversion</li>
              </ul>
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
              <h4 className="font-semibold mb-2">What's the difference between percentage and pixel resizing?</h4>
              <p className="text-sm text-muted-foreground">
                Percentage resizing scales images proportionally (e.g., 50% makes them half the size), 
                while pixel resizing lets you set exact dimensions in pixels for precise control.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Will resizing affect image quality?</h4>
              <p className="text-sm text-muted-foreground">
                Enlarging images may reduce quality, while making them smaller typically maintains quality. 
                You can adjust the quality setting to balance file size and visual appearance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I resize images for social media?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! You can resize images to standard social media dimensions like 1080x1080 for Instagram, 
                1200x630 for Facebook, or any custom size you need.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is my data secure?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! All image processing happens locally in your browser. Your images never leave 
                your device, ensuring complete privacy and security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
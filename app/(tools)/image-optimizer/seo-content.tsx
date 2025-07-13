import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Shield, FileImage } from "lucide-react";

export function ImageOptimizerSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Professional Image Optimizer - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's Image Optimizer is a powerful tool designed to reduce image file sizes 
            while maintaining visual quality. Perfect for web optimization, email campaigns, 
            and improving site performance. Our advanced compression algorithms ensure your 
            images load faster without sacrificing quality.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Smart Compression:</strong> Advanced algorithms reduce file size by up to 80%</li>
            <li><strong>Multiple Formats:</strong> Support for WebP, JPEG, PNG optimization</li>
            <li><strong>Batch Processing:</strong> Optimize multiple images simultaneously</li>
            <li><strong>Quality Control:</strong> Adjustable compression levels for perfect balance</li>
            <li><strong>Auto Resize:</strong> Automatically resize images to optimal dimensions</li>
            <li><strong>Metadata Removal:</strong> Strip EXIF data to reduce file size</li>
          </ul>

          <h3>Perfect for Web Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Website Speed</h4>
              <p className="text-sm text-muted-foreground">
                Faster loading times improve user experience and SEO rankings
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Bandwidth Savings</h4>
              <p className="text-sm text-muted-foreground">
                Reduce data usage and hosting costs with smaller file sizes
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Mobile Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Optimized images load faster on mobile devices and slow connections
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">SEO Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Google favors fast-loading sites with optimized images
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Image Optimizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Upload Your Images</h4>
                <p className="text-sm text-muted-foreground">
                  Select up to 20 images in JPEG, PNG, or WebP format. Drag and drop or click to browse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Configure Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Adjust quality, format, and resize options to meet your optimization needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Optimize Images</h4>
                <p className="text-sm text-muted-foreground">
                  Click optimize to process your images with advanced compression algorithms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Download Results</h4>
                <p className="text-sm text-muted-foreground">
                  Download optimized images individually or all at once. See compression statistics.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Optimization Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">File Size Reduction</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Up to 80% smaller files</li>
                <li>• Lossless compression</li>
                <li>• Smart quality control</li>
                <li>• Metadata removal</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Performance Impact</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Faster page load times</li>
                <li>• Better user experience</li>
                <li>• Improved SEO scores</li>
                <li>• Reduced bounce rates</li>
              </ul>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">Cost Savings</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Lower bandwidth costs</li>
                <li>• Reduced storage needs</li>
                <li>• Less server load</li>
                <li>• CDN cost reduction</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Format Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Format</th>
                  <th className="text-left p-2">Best For</th>
                  <th className="text-left p-2">Compression</th>
                  <th className="text-left p-2">Quality</th>
                  <th className="text-left p-2">Browser Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">WebP</td>
                  <td className="p-2">Web images</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">High</td>
                  <td className="p-2">95%+</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">JPEG</td>
                  <td className="p-2">Photos</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">Variable</td>
                  <td className="p-2">100%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">PNG</td>
                  <td className="p-2">Graphics</td>
                  <td className="p-2">Lossless</td>
                  <td className="p-2">Perfect</td>
                  <td className="p-2">100%</td>
                </tr>
              </tbody>
            </table>
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
              <h4 className="font-semibold mb-2">What's the difference between lossless and lossy compression?</h4>
              <p className="text-sm text-muted-foreground">
                Lossless compression reduces file size without quality loss, while lossy compression 
                achieves smaller files by removing some image data. Our optimizer uses smart algorithms 
                to minimize quality loss while maximizing compression.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Should I use WebP format?</h4>
              <p className="text-sm text-muted-foreground">
                WebP provides 25-35% better compression than JPEG and is supported by all modern browsers. 
                It's ideal for web use and can significantly improve your site's loading speed.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">How much can I reduce file sizes?</h4>
              <p className="text-sm text-muted-foreground">
                File size reduction depends on the original image and settings. Typically, you can expect 
                30-80% reduction while maintaining good visual quality. Photos often compress more than graphics.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Is it safe to remove metadata?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, removing EXIF metadata is safe and recommended for web images. It reduces file size 
                and removes potentially sensitive information like camera settings and location data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
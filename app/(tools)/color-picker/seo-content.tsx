import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Eye, Pipette, Zap } from "lucide-react";
import { RelatedTools } from "@/components/tools/related-tools";

export function ColorPickerSEOContent() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Professional Color Picker - Toolspy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Toolspy's Color Picker is a comprehensive tool for designers, developers, and creatives 
            to work with colors. Pick colors from anywhere, convert between formats, generate 
            palettes, and build harmonious color schemes with professional-grade accuracy and 
            an intuitive interface.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Multiple Color Formats:</strong> HEX, RGB, HSL conversion and input</li>
            <li><strong>Eyedropper Tool:</strong> Pick colors directly from your screen</li>
            <li><strong>Image Color Extraction:</strong> Extract dominant colors from uploaded images</li>
            <li><strong>Color Palettes:</strong> Pre-built Material, Web, and Pastel color collections</li>
            <li><strong>Color Variations:</strong> Generate lighter, darker, and harmonious variations</li>
            <li><strong>Color History:</strong> Save and manage your favorite color picks</li>
          </ul>

          <h3>Perfect for Creative Professionals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Web Design</h4>
              <p className="text-sm text-muted-foreground">
                Get exact HEX and RGB values for CSS, ensure accessibility, and build cohesive color schemes
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Graphic Design</h4>
              <p className="text-sm text-muted-foreground">
                Extract colors from inspiration images and create harmonious color palettes
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Brand Identity</h4>
              <p className="text-sm text-muted-foreground">
                Develop consistent brand colors and generate complementary color variations
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Digital Art</h4>
              <p className="text-sm text-muted-foreground">
                Analyze reference images and create custom color palettes for digital artwork
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Color Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Choose Input Method</h4>
                <p className="text-sm text-muted-foreground">
                  Enter HEX codes, adjust RGB/HSL values, use the eyedropper, or upload an image.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Explore Color Palettes</h4>
                <p className="text-sm text-muted-foreground">
                  Browse Material Design, Web Safe, and Pastel color collections for inspiration.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Generate Variations</h4>
                <p className="text-sm text-muted-foreground">
                  Create lighter, darker, complementary, and analogous color variations automatically.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-1">4</Badge>
              <div>
                <h4 className="font-semibold">Save & Export</h4>
                <p className="text-sm text-muted-foreground">
                  Build your color history and export palettes as JSON for use in design tools.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Theory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Color Theory & Harmony
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">🎨 Complementary Colors</div>
              <div className="text-muted-foreground">
                Colors opposite on the color wheel that create high contrast and vibrant looks
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">🔄 Analogous Colors</div>
              <div className="text-muted-foreground">
                Colors next to each other on the color wheel for harmonious, calming designs
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">⚖️ Triadic Colors</div>
              <div className="text-muted-foreground">
                Three colors evenly spaced on the color wheel for balanced, vibrant schemes
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary mb-2">🎯 Monochromatic</div>
              <div className="text-muted-foreground">
                Different shades and tints of the same hue for sophisticated, unified looks
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Color Format Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🌐 HEX Colors (#RRGGBB)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Hexadecimal format widely used in web design and CSS. Each color channel (Red, Green, Blue) 
                is represented by two hexadecimal digits (00-FF).
              </p>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                Examples: #FF0000 (red), #00FF00 (green), #0000FF (blue)
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🖥️ RGB Colors (0-255)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Red, Green, Blue values from 0 to 255. The native color format for digital displays 
                and most image editing software.
              </p>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                Examples: rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255)
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🎨 HSL Colors (Hue, Saturation, Lightness)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                More intuitive for designers. Hue (0-360°), Saturation (0-100%), Lightness (0-100%). 
                Easier to create color variations and harmonies.
              </p>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                Examples: hsl(0, 100%, 50%), hsl(120, 100%, 50%), hsl(240, 100%, 50%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">🎯 UI/UX Design</h4>
              <p className="text-sm text-muted-foreground">
                Create accessible color combinations, ensure proper contrast ratios, and develop 
                consistent design systems. Extract brand colors from existing designs and generate 
                color palettes that meet WCAG accessibility guidelines.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">📱 Mobile App Design</h4>
              <p className="text-sm text-muted-foreground">
                Design with platform-specific color guidelines (Material Design, iOS Human Interface). 
                Create dark mode variations and ensure colors work across different screen types 
                and lighting conditions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🏢 Brand Development</h4>
              <p className="text-sm text-muted-foreground">
                Establish primary, secondary, and accent colors for brand identity. Generate color 
                variations for different use cases (light/dark backgrounds, print/digital) while 
                maintaining brand consistency.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎬 Content Creation</h4>
              <p className="text-sm text-muted-foreground">
                Extract color palettes from reference images for video production, photography, 
                and digital art. Create mood boards and color schemes that evoke specific emotions 
                and complement your creative vision.
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
              <h4 className="font-semibold mb-2">How accurate is the eyedropper tool?</h4>
              <p className="text-sm text-muted-foreground">
                The eyedropper uses the browser's native EyeDropper API for pixel-perfect color 
                sampling. Accuracy depends on your display calibration and browser support. 
                It works best in Chrome and Edge browsers.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I extract colors from any image format?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, our tool supports all common web image formats including JPG, PNG, WebP, 
                and GIF. The color extraction algorithm analyzes the image and identifies the 
                most dominant and frequently used colors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">How do I ensure good color contrast for accessibility?</h4>
              <p className="text-sm text-muted-foreground">
                Use our color picker to get exact values, then test them with accessibility tools. 
                Generally, maintain a 4.5:1 contrast ratio for normal text and 3:1 for large text 
                to meet WCAG AA standards.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I save and reuse my color palettes?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! Your color history is automatically saved in the browser, and you can export 
                your palette as a JSON file. This file can be imported into design tools or shared 
                with team members for consistent color usage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <RelatedTools 
        currentToolSlug="color-picker"
        title="Explore More Design Tools"
        description="Discover other tools that complement your color picking workflow."
      />
    </div>
  );
} 
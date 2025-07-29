import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Star, TrendingUp, Users, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feature Requests - Help Shape Toolspy\'s Future',
  description: 'Submit feature requests and suggestions for Toolspy. Help us build the tools you need most. Your feedback drives our development roadmap.',
  keywords: ['feature request', 'feedback', 'suggestions', 'toolspy development', 'new tools', 'improvements'],
};

export default function FeedbackPage() {
  const popularRequests = [
    {
      title: 'Video Compression Tool',
      description: 'Compress video files to reduce size while maintaining quality',
      votes: 127,
      status: 'Under Review'
    },
    {
      title: 'Batch Image Watermarking',
      description: 'Add watermarks to multiple images at once',
      votes: 89,
      status: 'In Development'
    },
    {
      title: 'OCR Text Recognition',
      description: 'Extract text from images and PDF documents',
      votes: 76,
      status: 'Under Review'
    },
    {
      title: 'Advanced Color Palette Generator',
      description: 'Generate color palettes from images with export options',
      votes: 54,
      status: 'Planned'
    },
    {
      title: 'Audio Format Converter',
      description: 'Convert between MP3, WAV, AAC, and other audio formats',
      votes: 43,
      status: 'Under Review'
    },
    {
      title: 'QR Code Scanner',
      description: 'Scan and decode QR codes from uploaded images',
      votes: 38,
      status: 'Planned'
    }
  ];

  const categories = [
    {
      name: 'Image Tools',
      icon: '🖼️',
      description: 'New image processing and editing features'
    },
    {
      name: 'PDF Tools',
      icon: '📄',
      description: 'Enhanced PDF manipulation capabilities'
    },
    {
      name: 'Calculators',
      icon: '🧮',
      description: 'New mathematical and financial calculators'
    },
    {
      name: 'Converters',
      icon: '🔄',
      description: 'File format and unit conversion tools'
    },
    {
      name: 'Utilities',
      icon: '🛠️',
      description: 'General productivity and utility tools'
    },
    {
      name: 'Developer Tools',
      icon: '👨‍💻',
      description: 'Tools for developers and technical users'
    }
  ];

  const statusColors = {
    'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'In Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Planned': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Completed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Lightbulb className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Feature Requests</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have an idea for a new tool or feature? We'd love to hear it! Your suggestions help us build 
            the tools that matter most to our community.
          </p>
        </div>
      </section>

      {/* Request Form */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Submit Your Idea</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tell us about the tool or feature you'd like to see. Be as detailed as possible!
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>New Feature Request</CardTitle>
            <CardDescription>
              Describe your idea and help us understand how it would benefit users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" action="mailto:feedback@toolspy.com" method="get">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input id="name" name="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Feature Title *</Label>
                <Input id="title" name="subject" placeholder="Brief, descriptive title for your feature" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  name="category"
                  className="w-full p-2 border border-input bg-background rounded-md"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea 
                  id="description" 
                  name="body" 
                  placeholder="Describe your feature idea in detail. Include:&#10;- What the tool should do&#10;- Who would benefit from it&#10;- How it would work&#10;- Any specific requirements"
                  className="min-h-32"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="usecase">Use Case Examples</Label>
                <Textarea 
                  id="usecase" 
                  placeholder="Provide specific examples of how you or others would use this feature..."
                  className="min-h-24"
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Submit Feature Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Popular Requests */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Most Requested Features</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See what features the community is asking for and their development status
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularRequests.map((request, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription className="mt-2">{request.description}</CardDescription>
                  </div>
                  <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {request.votes} votes
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="mr-2 h-3 w-3" />
                    Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Request Categories</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the right category for your feature request
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>How We Handle Feature Requests</span>
            </CardTitle>
            <CardDescription>Our development process from idea to implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Submission</h4>
                <p className="text-xs text-muted-foreground">You submit your feature request with details</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Review</h4>
                <p className="text-xs text-muted-foreground">Our team reviews and evaluates feasibility</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Planning</h4>
                <p className="text-xs text-muted-foreground">Popular features get added to our roadmap</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Development</h4>
                <p className="text-xs text-muted-foreground">We build and release the new feature</p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                We typically respond to feature requests within 48 hours and provide updates on popular requests.
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="outline">Average Response: 48 hours</Badge>
                <Badge variant="outline">Implementation: 2-8 weeks</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Community Stats */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Feature Requests Submitted</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-muted-foreground">Features Implemented</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-muted-foreground">Currently In Development</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Alternative */}
      <section className="space-y-6">
        <Card className="p-8 bg-primary/5">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Have Questions About Your Request?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Want to discuss your idea before submitting? Need updates on an existing request? 
              We're here to help!
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/bug-report">Report a Bug</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 
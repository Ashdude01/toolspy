import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, 
  Search, 
  FileImage, 
  FileText, 
  Calculator, 
  Code, 
  Zap, 
  Shield,
  Smartphone,
  Globe,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center - Toolspy Support and Documentation',
  description: 'Get help with Toolspy online tools. Find answers to common questions, troubleshooting guides, and learn how to use our free utilities effectively.',
  keywords: ['help center', 'support', 'how to use', 'troubleshooting', 'toolspy help', 'documentation'],
};

export default function HelpPage() {
  const categories = [
    {
      title: 'Image Tools',
      description: 'Help with image compression, conversion, and processing',
      icon: <FileImage className="h-6 w-6" />,
      articles: [
        'How to compress images without losing quality',
        'Converting between image formats',
        'Batch processing multiple images',
        'Supported image formats and sizes'
      ]
    },
    {
      title: 'PDF Tools',
      description: 'Assistance with PDF manipulation and conversion',
      icon: <FileText className="h-6 w-6" />,
      articles: [
        'Converting PDF to Word documents',
        'Merging multiple PDF files',
        'Splitting large PDF files',
        'Removing passwords from PDFs'
      ]
    },
    {
      title: 'Calculators',
      description: 'Help with mathematical and financial calculators',
      icon: <Calculator className="h-6 w-6" />,
      articles: [
        'Using the BMI calculator',
        'Age calculation and date differences',
        'Investment and loan calculators',
        'Unit conversion tools'
      ]
    },
    {
      title: 'Encoding Tools',
      description: 'Base64 and other encoding utilities',
      icon: <Code className="h-6 w-6" />,
      articles: [
        'Base64 encoding and decoding',
        'Converting images to Base64',
        'Understanding encoding formats',
        'Troubleshooting encoding issues'
      ]
    }
  ];

  const quickHelp = [
    {
      question: 'Are all tools really free?',
      answer: 'Yes! All Toolspy tools are completely free with no hidden costs, registration requirements, or usage limitations.',
      category: 'General'
    },
    {
      question: 'Why are my files not uploading?',
      answer: 'Check your file size (max 100MB) and format. Most tools work offline in your browser, so no upload is needed.',
      category: 'Technical'
    },
    {
      question: 'How do I process multiple files at once?',
      answer: 'Many tools support batch processing. Look for the "Add Files" or drag-and-drop multiple files into the upload area.',
      category: 'Usage'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes! Most tools process files in your browser, so your data never leaves your device. We don\'t store or track files.',
      category: 'Privacy'
    },
    {
      question: 'Can I use tools on mobile devices?',
      answer: 'Absolutely! All tools are optimized for mobile devices and work perfectly on smartphones and tablets.',
      category: 'Mobile'
    },
    {
      question: 'What if a tool isn\'t working properly?',
      answer: 'Try refreshing the page, checking your browser compatibility, or contact us for assistance.',
      category: 'Troubleshooting'
    }
  ];

  const troubleshooting = [
    {
      issue: 'Tool Not Loading',
      solution: 'Ensure you\'re using a modern browser (Chrome, Firefox, Safari, Edge). Clear cache and reload.',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />
    },
    {
      issue: 'File Processing Failed',
      solution: 'Check file size (max 100MB) and format compatibility. Try with a smaller or different file.',
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />
    },
    {
      issue: 'Slow Performance',
      solution: 'Large files take more time. Close other browser tabs and ensure stable internet connection.',
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />
    },
    {
      issue: 'Mobile Issues',
      solution: 'Update your mobile browser and ensure sufficient device storage for processing.',
      icon: <AlertCircle className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get help with Toolspy's online tools. Find answers, troubleshooting guides, 
            and learn how to make the most of our free utilities.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for help..." 
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Quick answers to the most common questions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickHelp.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Help Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Help by Category</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find specific help for different types of tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      • {article}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Troubleshooting</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Common issues and how to solve them
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {troubleshooting.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  {item.icon}
                  <div>
                    <h4 className="font-semibold mb-2">{item.issue}</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Browser Compatibility */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Browser Compatibility</span>
            </CardTitle>
            <CardDescription>Supported browsers and requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Chrome</div>
                <div className="text-xs text-muted-foreground">v80+</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Firefox</div>
                <div className="text-xs text-muted-foreground">v75+</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Safari</div>
                <div className="text-xs text-muted-foreground">v13+</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Edge</div>
                <div className="text-xs text-muted-foreground">v80+</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              For the best experience, keep your browser updated to the latest version. 
              JavaScript must be enabled for tools to function properly.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Security & Privacy */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription>How we protect your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">Client-Side Processing</div>
                <div className="text-xs text-muted-foreground">Files processed in your browser</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold">No Data Collection</div>
                <div className="text-xs text-muted-foreground">We don't track or store your data</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold">HTTPS Encrypted</div>
                <div className="text-xs text-muted-foreground">All connections are secure</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Support */}
      <section className="space-y-6">
        <Card className="p-8 bg-primary/5">
          <div className="text-center space-y-4">
            <HelpCircle className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-2xl font-bold">Still Need Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you get the most out of Toolspy.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/feedback">Request Feature</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 
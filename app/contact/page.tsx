import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Bug, Lightbulb, HelpCircle, Github } from 'lucide-react';
import Link from 'next/link';
import StaticPageSchema from '@/components/seo/StaticPageSchema';
import { WebPageSchema, FAQSchema } from '@/components/seo/comprehensive-schemas';

export const metadata: Metadata = {
  title: 'Contact Toolspy - Get Support and Share Feedback',
  description: 'Get in touch with the Toolspy team. Report bugs, request features, or get help with our online tools. We\'re here to help!',
  keywords: ['contact toolspy', 'support', 'feedback', 'bug report', 'feature request', 'help'],
};

export default function ContactPage() {
  const contactOptions = [
    {
      title: 'General Inquiries',
      description: 'Questions about Toolspy or general support',
      icon: <Mail className="h-6 w-6" />,
      action: 'Send Email',
      href: 'mailto:support@toolspy.net',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
    },
    {
      title: 'Bug Reports',
      description: 'Found an issue? Let us know so we can fix it',
      icon: <Bug className="h-6 w-6" />,
      action: 'Report Bug',
      href: '/bug-report',
      color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
    },
    {
      title: 'Feature Requests',
      description: 'Suggest new tools or improvements',
      icon: <Lightbulb className="h-6 w-6" />,
      action: 'Request Feature',
      href: '/feedback',
      color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400'
    },
    {
      title: 'Help & Support',
      description: 'Need help using our tools?',
      icon: <HelpCircle className="h-6 w-6" />,
      action: 'Get Help',
      href: '/help',
      color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, we aim to respond even faster."
    },
    {
      question: "Can you add a specific tool?",
      answer: "Absolutely! We love hearing suggestions for new tools. Visit our feature request page to submit ideas and vote on existing requests."
    },
    {
      question: "Is Toolspy really free?",
      answer: "Yes! All our tools are completely free with no hidden costs, premium tiers, or usage limits. We believe professional tools should be accessible to everyone."
    },
    {
      question: "How do you ensure privacy?",
      answer: "Most of our tools process files entirely in your browser, meaning your data never leaves your device. We don't collect personal information or track usage."
    }
  ];

  return (
    <>
      <StaticPageSchema pageType="contact" />
      <WebPageSchema
        title="Contact Toolspy - Get Support and Share Feedback"
        description="Get in touch with the Toolspy team. Report bugs, request features, or get help with our online tools. We're here to help!"
        url="https://toolspy.net/contact"
        breadcrumbs={[
          { name: "Home", url: "https://toolspy.net" },
          { name: "Contact", url: "https://toolspy.net/contact" }
        ]}
      />
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you! Whether you need support, have feedback, or just want to say hello, 
            we're here to help make your experience with Toolspy even better.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactOptions.map((option, index) => (
          <Card key={index} className="group hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${option.color}`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={option.href}>{option.action}</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Contact Form */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quick Contact Form</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Send us a message directly. We typically respond within 24 hours.
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" action="mailto:support@toolspy.net" method="get">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="What's this about?" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="body" 
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-32"
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Before reaching out, check if your question is answered below
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How quickly do you respond?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent technical issues, we aim to respond even faster.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can you add a specific tool?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Absolutely! We love hearing suggestions for new tools. Visit our feature request page 
                to submit ideas and vote on existing requests.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is Toolspy really free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes! All our tools are completely free with no hidden costs, premium tiers, or usage limits. 
                We believe professional tools should be accessible to everyone.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do you ensure privacy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most of our tools process files entirely in your browser, meaning your data never leaves your device. 
                We don't collect personal information or track usage.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section className="space-y-6">
        <Card className="p-8 bg-primary/5">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Github className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Toolspy is open source and community-driven. Join our GitHub community to contribute, 
              report issues, or just follow along with development.
            </p>
            <Button asChild>
              <Link href="https://github.com/toolspy" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </Card>
      </section>
      </div>
    </>
  );
} 
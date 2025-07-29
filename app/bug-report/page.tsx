import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bug, AlertTriangle, CheckCircle, Clock, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bug Reports - Help Us Fix Issues on Toolspy',
  description: 'Report bugs and technical issues with Toolspy tools. Help us maintain the quality and reliability of our online utilities.',
  keywords: ['bug report', 'technical issues', 'toolspy problems', 'error reporting', 'troubleshooting'],
};

export default function BugReportPage() {
  const commonIssues = [
    {
      issue: 'Tool not loading or showing blank page',
      solution: 'Clear browser cache, disable extensions, try in incognito mode',
      severity: 'Medium',
      status: 'Known Issue'
    },
    {
      issue: 'File upload failing or stuck',
      solution: 'Check file size (max 100MB), format compatibility, and internet connection',
      severity: 'High',
      status: 'Under Investigation'
    },
    {
      issue: 'Processing takes too long or freezes',
      solution: 'Try smaller files, close other browser tabs, restart browser',
      severity: 'Medium',
      status: 'Monitoring'
    },
    {
      issue: 'Download not working',
      solution: 'Check browser download settings, disable popup blockers',
      severity: 'High',
      status: 'Fixed in Latest Update'
    },
    {
      issue: 'Mobile layout issues',
      solution: 'Update browser, report specific device/browser combination',
      severity: 'Low',
      status: 'In Progress'
    },
    {
      issue: 'Unexpected error messages',
      solution: 'Note exact error message, steps to reproduce, browser details',
      severity: 'Medium',
      status: 'Investigating'
    }
  ];

  const severityColors = {
    'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const statusColors = {
    'Known Issue': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Under Investigation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'In Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Fixed in Latest Update': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Monitoring': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'Investigating': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  const browserOptions = [
    'Chrome (Desktop)',
    'Firefox (Desktop)',
    'Safari (Desktop)',
    'Edge (Desktop)',
    'Chrome (Mobile)',
    'Safari (Mobile)',
    'Firefox (Mobile)',
    'Samsung Internet',
    'Other'
  ];

  const toolCategories = [
    'Image Tools',
    'PDF Tools',
    'Calculators',
    'Base64 Tools',
    'General Website',
    'Other'
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Bug className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Report a Bug</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Found something that isn't working quite right? Help us fix it! Your bug reports help us
            maintain the quality and reliability of Toolspy.
          </p>
        </div>
      </section>

      {/* Quick Troubleshooting */}
      <section className="space-y-6">
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5" />
              <span>Before Reporting: Quick Fixes</span>
            </CardTitle>
            <CardDescription>Try these common solutions first - they solve most issues!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Browser Issues:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Refresh the page (Ctrl+F5 or Cmd+Shift+R)</li>
                  <li>• Clear browser cache and cookies</li>
                  <li>• Try in incognito/private mode</li>
                  <li>• Disable browser extensions temporarily</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">File Issues:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Check file size (maximum 100MB)</li>
                  <li>• Verify file format is supported</li>
                  <li>• Try with a different file</li>
                  <li>• Ensure stable internet connection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Bug Report Form */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Submit Bug Report</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Please provide as much detail as possible to help us reproduce and fix the issue quickly.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Bug Report Details</CardTitle>
            <CardDescription>
              The more information you provide, the faster we can fix the issue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" action="mailto:bugs@toolspy.com" method="get">
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
                <Label htmlFor="title">Bug Title *</Label>
                <Input
                  id="title"
                  name="subject"
                  placeholder="Brief description of the problem"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tool">Which Tool? *</Label>
                  <select
                    id="tool"
                    name="tool"
                    className="w-full p-2 border border-input bg-background rounded-md"
                    required
                  >
                    <option value="">Select affected tool/area</option>
                    {toolCategories.map((tool) => (
                      <option key={tool} value={tool}>{tool}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="browser">Browser *</Label>
                  <select
                    id="browser"
                    name="browser"
                    className="w-full p-2 border border-input bg-background rounded-md"
                    required
                  >
                    <option value="">Select your browser</option>
                    {browserOptions.map((browser) => (
                      <option key={browser} value={browser}>{browser}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <select
                  id="severity"
                  name="severity"
                  className="w-full p-2 border border-input bg-background rounded-md"
                >
                  <option value="Low">Low - Minor inconvenience</option>
                  <option value="Medium">Medium - Affects functionality</option>
                  <option value="High">High - Blocks important tasks</option>
                  <option value="Critical">Critical - Tool completely broken</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">What Happened? *</Label>
                <Textarea
                  id="description"
                  name="body"
                  placeholder="Describe the problem in detail:&#10;- What were you trying to do?&#10;- What went wrong?&#10;- What did you expect to happen?&#10;- Any error messages you saw?"
                  className="min-h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Steps to Reproduce</Label>
                <Textarea
                  id="steps"
                  placeholder="Please list the exact steps to reproduce this bug:&#10;1. Go to...&#10;2. Click on...&#10;3. Upload file...&#10;4. See error..."
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="device">Device & OS Info</Label>
                <Input
                  id="device"
                  placeholder="e.g., Windows 11, macOS Sonoma, iPhone 15, Android 14"
                />
              </div>

              <Button type="submit" className="w-full">
                <Bug className="mr-2 h-4 w-4" />
                Submit Bug Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Known Issues */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Known Issues & Status</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Check if your issue is already known and being worked on
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {commonIssues.map((issue, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{issue.issue}</h4>
                      <Badge className={severityColors[issue.severity as keyof typeof severityColors]}>
                        {issue.severity}
                      </Badge>
                      <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Workaround:</strong> {issue.solution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Response Process */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Our Bug Response Process</span>
            </CardTitle>
            <CardDescription>How we handle and prioritize bug reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bug className="h-4 w-4" />
                </div>
                <h4 className="font-semibold mb-2">Report Received</h4>
                <p className="text-xs text-muted-foreground">We acknowledge your report within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h4 className="font-semibold mb-2">Investigation</h4>
                <p className="text-xs text-muted-foreground">Our team reproduces and analyzes the issue</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-4 w-4" />
                </div>
                <h4 className="font-semibold mb-2">Fix Development</h4>
                <p className="text-xs text-muted-foreground">We develop and test the solution</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <h4 className="font-semibold mb-2">Resolution</h4>
                <p className="text-xs text-muted-foreground">Fix is deployed and verified</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <div className="font-semibold">Critical Bugs</div>
                <div className="text-sm text-muted-foreground">Fixed within 4-8 hours</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="font-semibold">High Priority</div>
                <div className="text-sm text-muted-foreground">Fixed within 1-3 days</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <div className="font-semibold">Low Priority</div>
                <div className="text-sm text-muted-foreground">Fixed in next update cycle</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Alternative */}
      <section className="space-y-6">
        <Card className="p-8 bg-primary/5">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Need Immediate Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For urgent issues or if you need help right away, don't hesitate to contact our support team directly.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">Visit Help Center</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 
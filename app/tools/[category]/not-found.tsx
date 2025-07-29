import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-amber-500" />
            </div>
            <CardTitle className="text-3xl font-bold">Category Not Found</CardTitle>
            <CardDescription className="text-lg">
              The tool category you're looking for doesn't exist or may have been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Don't worry! You can still find all our amazing tools using the options below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default">
                <Link href="/tools">
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Tools
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Available Categories:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link 
                  href="/tools/image-tools" 
                  className="p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🖼️</span>
                    <span className="font-medium">Image Tools</span>
                  </div>
                </Link>
                <Link 
                  href="/tools/pdf-tools" 
                  className="p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📄</span>
                    <span className="font-medium">PDF Tools</span>
                  </div>
                </Link>
                <Link 
                  href="/tools/calculators" 
                  className="p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🧮</span>
                    <span className="font-medium">Calculators</span>
                  </div>
                </Link>
                <Link 
                  href="/tools/base64-tools" 
                  className="p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🔤</span>
                    <span className="font-medium">Base64 Tools</span>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
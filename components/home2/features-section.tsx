"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Shield, 
  Globe, 
  Settings,
  Target,
  Clock,
  Download,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle,
  Star
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Client-side processing ensures instant results with no upload delays",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your files never leave your device with secure client-side processing",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Access",
      description: "Works on all devices and browsers with no software installation required",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Professional Control",
      description: "Advanced options and precision controls for professional results",
      color: "from-purple-500 to-violet-500"
    }
  ]

  const additionalFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision Tools",
      description: "Professional-grade algorithms for accurate results"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Available",
      description: "Access your tools anytime, anywhere"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Batch Processing",
      description: "Handle multiple files efficiently"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Processing",
      description: "Enterprise-level security built-in"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Optimized",
      description: "Perfect experience on all devices"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Guaranteed",
      description: "Professional results every time"
    }
  ]

  return (
    <section id="features" className="py-16 px-4 overflow-x-hidden w-full">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Toolspy</span>?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Experience the difference with professional-grade tools designed for privacy, speed, and reliability.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 px-2">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-105 transition-transform duration-200 shadow-md transform-gpu`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-700 mx-2">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Everything You Need for Professional Results
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Comprehensive features that make Toolspy the preferred choice for professionals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
            <div className="text-slate-600 dark:text-slate-300">Professional Tools</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="text-4xl font-bold text-green-600 mb-2">100MB</div>
            <div className="text-slate-600 dark:text-slate-300">Max File Size</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-slate-600 dark:text-slate-300">Free Forever</div>
          </div>
        </div>
      </div>
    </section>
  )
}


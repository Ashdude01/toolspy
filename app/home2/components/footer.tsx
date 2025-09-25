"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Sparkles, 
  Users, 
  Heart, 
  Award,
  Shield,
  Zap,
  Globe,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ArrowUp
} from "lucide-react"
import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: "Tools",
      links: [
        { href: "/image-compressor", label: "Image Compressor" },
        { href: "/pdf-converter", label: "PDF Converter" },
        { href: "/base64-encoder-decoder", label: "Base64 Tools" },
        { href: "/age-calculator", label: "Calculators" },
        { href: "/image-converter", label: "Image Converter" },
        { href: "/merge-pdf", label: "PDF Merger" }
      ]
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/help", label: "Help Center" },
        { href: "/feedback", label: "Feedback" }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Blog" },
        { href: "/tutorials", label: "Tutorials" },
        { href: "/api", label: "API Documentation" },
        { href: "/integrations", label: "Integrations" },
        { href: "/changelog", label: "Changelog" },
        { href: "/status", label: "Status" }
      ]
    },
    {
      title: "Community",
      links: [
        { href: "/discord", label: "Discord" },
        { href: "/twitter", label: "Twitter" },
        { href: "/github", label: "GitHub" },
        { href: "/reddit", label: "Reddit" },
        { href: "/youtube", label: "YouTube" },
        { href: "/newsletter", label: "Newsletter" }
      ]
    }
  ]

  const socialLinks = [
    { href: "https://twitter.com/toolspy", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "https://github.com/toolspy", icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { href: "https://linkedin.com/company/toolspy", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "mailto:hello@toolspy.net", icon: <Mail className="h-5 w-5" />, label: "Email" }
  ]

  return (
    <footer className="py-12 px-4 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Toolspy</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Professional online tools for all your digital needs. Free, secure, and privacy-focused. 
              Trusted by millions of users worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Shield className="w-3 h-3 mr-1" />
                Privacy First
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Zap className="w-3 h-3 mr-1" />
                Lightning Fast
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Globe className="w-3 h-3 mr-1" />
                Universal Access
              </Badge>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Get the latest updates on new tools, features, and improvements delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <p className="text-slate-400 text-sm">
              © 2024 Toolspy. All rights reserved. Made with ❤️ for the community.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>🇺🇸 English</span>
              <span>•</span>
              <span>🌍 Global</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}


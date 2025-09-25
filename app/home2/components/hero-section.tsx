"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Star,
  Users,
  Clock,
  CheckCircle,
  Download,
  Smartphone,
  Laptop,
  Sparkles,
  TrendingUp,
  Heart,
  Award,
  Target,
  Settings,
  Lock,
  Play,
  ArrowDown
} from "lucide-react"

interface HeroSectionProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export function HeroSection({ onSearch, searchQuery }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { label: "Professional Tools", value: "70+", icon: <Target className="h-5 w-5" /> },
    { label: "Max File Size", value: "100MB", icon: <Download className="h-5 w-5" /> },
    { label: "Free Forever", value: "∞", icon: <Heart className="h-5 w-5" /> },
    { label: "Private & Secure", value: "100%", icon: <Shield className="h-5 w-5" /> }
  ]

  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 animate-pulse">
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • Free Forever
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Professional Tools
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-200">
                for Your Digital Life
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Convert, compress, calculate, and process your files instantly. 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> No registration required</span>, 
              completely free, and your privacy is protected.
            </p>
          </div>

          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="search"
                placeholder="Search 70+ professional tools..."
                className="pl-12 pr-4 py-4 text-lg border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300 group">
                <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer group">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ArrowDown className="h-6 w-6 animate-bounce group-hover:animate-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


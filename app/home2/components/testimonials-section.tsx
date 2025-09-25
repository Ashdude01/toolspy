"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      company: "Creative Studio",
      content: "Toolspy has revolutionized my workflow. The image compression tools are incredibly fast and the quality is outstanding. I use it daily for client work.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Web Developer",
      company: "Tech Solutions",
      content: "The Base64 tools and PDF converters save me hours every week. Best part? It's completely free and private. No more worrying about file security.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Content Creator",
      company: "Digital Media",
      content: "I use Toolspy daily for my social media content. The batch processing feature is a game-changer. Professional results without the professional price tag.",
      rating: 5,
      avatar: "EJ"
    },
    {
      name: "David Kim",
      role: "Marketing Manager",
      company: "Growth Co",
      content: "The PDF tools are exceptional. I can merge, split, and convert documents in seconds. It's become an essential part of our marketing workflow.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Lisa Wang",
      role: "Freelance Writer",
      company: "Content Studio",
      content: "As a freelancer, I need reliable tools that don't break the bank. Toolspy delivers professional-grade results completely free. Highly recommended!",
      rating: 5,
      avatar: "LW"
    },
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      company: "Startup Inc",
      content: "The encoding tools are perfect for my development work. Clean interface, fast processing, and zero privacy concerns. Exactly what I needed.",
      rating: 5,
      avatar: "AT"
    }
  ]

  return (
    <section className="py-16 px-4 bg-white/50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professionals</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See what our users say about their experience with Toolspy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                    <Quote className="h-6 w-6" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic text-center leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">1M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Happy Users</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">50M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Files Processed</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">99.9%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">4.9★</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


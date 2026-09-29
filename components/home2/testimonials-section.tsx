"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  BadgeCheck,
  MonitorSmartphone,
} from "lucide-react"

/**
 * Honest, non-fabricated "why use us" section.
 *
 * NOTE: This intentionally does NOT show invented testimonials or made-up
 * usage numbers. Every claim below is factual and verifiable on the site
 * itself (free, no signup, in-browser processing, etc.). If real, permissioned
 * user reviews are collected later, add them through the first-party review
 * system in lib/tool-reviews.ts so the on-page content and schema stay in sync.
 */
export function TestimonialsSection() {
  const reasons = [
    {
      icon: Lock,
      title: "Your files stay on your device",
      body: "Most tools run entirely in your browser, so images and documents are processed locally instead of being uploaded to a server.",
    },
    {
      icon: BadgeCheck,
      title: "No account, no paywall",
      body: "Every tool is free to open and use. There's nothing to sign up for and no feature locked behind a subscription.",
    },
    {
      icon: Zap,
      title: "Built to be quick",
      body: "Since the work happens on your machine, there's no waiting on uploads or queues - most tasks finish in a few seconds.",
    },
    {
      icon: Layers,
      title: "One place for everyday tasks",
      body: "Compress an image, merge a PDF, format JSON, or run a quick calculation without hunting for a different site each time.",
    },
    {
      icon: MonitorSmartphone,
      title: "Works on phone and desktop",
      body: "The tools are responsive, so the same features work in a mobile browser as they do on a laptop - nothing to install.",
    },
    {
      icon: ShieldCheck,
      title: "Clear about what each tool does",
      body: "Every tool page explains how it works, which formats it supports, and what its limits are, so there are no surprises.",
    },
  ]

  const facts = [
    { value: "100+", label: "Free tools" },
    { value: "100%", label: "Free to use" },
    { value: "No", label: "Sign-up needed" },
    { value: "In-browser", label: "Private by design" },
  ]

  return (
    <section className="py-16 px-4 overflow-x-hidden w-full">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why people use{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Toolspy
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A few honest reasons the tools are worth keeping in your bookmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200 transform-gpu"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-center leading-relaxed text-sm">
                    {reason.body}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Factual indicators - no invented numbers */}
        <div className="mt-16 text-center px-2">
          <div className="flex flex-col sm:flex-row items-center justify-around sm:justify-center w-full sm:w-fit mx-auto sm:gap-4 md:gap-8 bg-white dark:bg-slate-800 rounded-2xl px-4 sm:px-6 md:px-8 py-4 border border-slate-200 dark:border-slate-700">
            {facts.map((fact, i) => (
              <div key={i} className="flex items-center sm:contents">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {fact.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {fact.label}
                  </div>
                </div>
                {i < facts.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'

/**
 * Wraps only Header in ThemeProvider so theme toggle works.
 * Rest of layout (main, children) stays server-rendered → HTML in source.
 * next-themes still sets class on documentElement so theme applies to whole page.
 */
export function HeaderWithTheme() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
    </ThemeProvider>
  )
}

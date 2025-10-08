import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "ReliaBESS",
  description: "Advanced device management and data analysis platform",
    generator: 'GESEP-MG'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased h-screen">
        <ThemeProvider defaultTheme="system" storageKey="projectb-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

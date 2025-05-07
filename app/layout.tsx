import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import NoiseTexture from "@/components/noise-texture"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "pablo carvalho | full stack developer & multimedia designer",
  description: "pablo carvalho | full stack developer & multimedia designer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NoiseTexture />
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

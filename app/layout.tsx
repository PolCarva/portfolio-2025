import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Gabarito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
const gabarito = Gabarito({ subsets: ["latin"] })

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
      <body className={`${gabarito.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

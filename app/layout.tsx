import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Gabarito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
const gabarito = Gabarito({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://pablocarvalho.dev'),
  title: {
    default: 'pablo carvalho | full stack developer & designer',
    template: '%s | pablo carvalho',
  },
  description: 'full stack developer and designer specializing in web development, product design, and brand identity. creating beautiful and functional digital experiences.',
  keywords: ['full stack developer', 'web developer', 'product designer', 'brand identity', 'portfolio', 'pablo carvalho'],
  authors: [{ name: 'pablo carvalho' }],
  creator: 'pablo carvalho',
  publisher: 'pablo carvalho',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pablocarvalho.dev',
    siteName: 'pablo carvalho portfolio',
    title: 'pablo carvalho | full stack developer & designer',
    description: 'full stack developer and designer specializing in web development, product design, and brand identity.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'pablo carvalho portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pablo carvalho | full stack developer & designer',
    description: 'full stack developer and designer specializing in web development, product design, and brand identity.',
    images: ['/opengraph-image'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
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
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

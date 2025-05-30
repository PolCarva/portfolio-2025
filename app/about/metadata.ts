import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'about | pablo carvalho',
  description: 'fullstack developer based in montevideo, uruguay. specializing in web development, product design, and brand identity. explore my journey, skills, and experience.',
  openGraph: {
    title: 'about | pablo carvalho',
    description: 'fullstack developer based in montevideo, uruguay. specializing in web development, product design, and brand identity. explore my journey, skills, and experience.',
    url: 'https://2025.pablocarvalho.dev/about',
    siteName: 'pablo carvalho portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'pablo carvalho about',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'about | pablo carvalho',
    description: 'fullstack developer based in montevideo, uruguay. specializing in web development, product design, and brand identity.',
    images: ['/opengraph-image.png'],
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
  verification: {
    google: 'your-google-site-verification',
  },
} 
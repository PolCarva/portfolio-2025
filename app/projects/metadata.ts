import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'projects | pablo carvalho',
  description: 'explore my portfolio of web development, product design, and brand identity projects. from interactive web applications to creative design solutions.',
  openGraph: {
    title: 'projects | pablo carvalho',
    description: 'explore my portfolio of web development, product design, and brand identity projects. from interactive web applications to creative design solutions.',
    url: 'https://2025.pablocarvalho.dev/projects',
    siteName: 'pablo carvalho portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'pablo carvalho projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'projects | pablo carvalho',
    description: 'explore my portfolio of web development, product design, and brand identity projects.',
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
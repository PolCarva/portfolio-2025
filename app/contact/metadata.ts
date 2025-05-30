import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'contact | pablo carvalho',
  description: 'get in touch with pablo carvalho, fullstack developer. available for freelance projects, collaborations, and full-time opportunities. let\'s create something amazing together.',
  openGraph: {
    title: 'contact | pablo carvalho',
    description: 'get in touch with pablo carvalho, fullstack developer. available for freelance projects, collaborations, and full-time opportunities. let\'s create something amazing together.',
    url: 'https://2025.pablocarvalho.dev/contact',
    siteName: 'pablo carvalho portfolio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'pablo carvalho contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'contact | pablo carvalho',
    description: 'get in touch with pablo carvalho, fullstack developer. available for freelance projects, collaborations, and full-time opportunities.',
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
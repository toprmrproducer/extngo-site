import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ChatbotWidget from '@/components/ChatbotWidget'
import ShopifyRoot from '@/components/shopify/ShopifyRoot'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['800'], // Only load the weight used in hero
  variable: '--font-bricolage',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '600'], // Only critical weights
  variable: '--font-geist',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://extngo-eight.vercel.app'),
  title: {
    default: 'Extngo',
    template: '%s | Extngo',
  },
  description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
  keywords: ['retractable ethernet cable', 'flat ethernet cable', 'CAT6 cable', 'cable reel', 'ethernet cable management', 'network cable', 'cable organizer'],
  authors: [{ name: 'Extngo' }],
  creator: 'Extngo',
  publisher: 'Extngo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://extngo-eight.vercel.app',
    siteName: 'Extngo',
    title: 'Extngo',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Extngo Retractable Ethernet Cable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extngo',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    images: ['/hero.png'],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${bricolage.variable}`}>
      <head>
        <link rel="canonical" href="https://extngo-eight.vercel.app" />
        <meta name="theme-color" content="#E8431A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Critical CSS for instant hero render */}
        <style dangerouslySetInnerHTML={{ __html: `
          .font-display{font-family:var(--font-bricolage);letter-spacing:-0.02em}
          .orange-sweep{color:#E8431A;position:relative;display:inline-block}
          .btn{display:inline-flex;align-items:center;gap:10px;border-radius:8px;font-weight:600;cursor:pointer;border:0;font-family:var(--font-geist)}
        `}} />
      </head>
      <body suppressHydrationWarning>
        {/* Shopify Storefront Web Components — registers <shopify-*> custom elements */}
        <Script
          src="https://cdn.shopify.com/storefront/web-components.js"
          type="module"
          strategy="afterInteractive"
        />
        {/* Global store context + cart; available to every page */}
        <ShopifyRoot />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  )
}

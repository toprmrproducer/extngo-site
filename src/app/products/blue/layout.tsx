import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EXTNGO USB-C to Ethernet | 15 Meter Retractable Cable',
  description: 'Go beyond USB-C limits. Get real wired connectivity — 15 metres of gigabit ethernet in a flat retractable reel. Built-in adapter, plug and play.',
  keywords: ['USB-C to Ethernet', 'retractable ethernet cable', 'USB-C ethernet adapter', 'gigabit ethernet', '15 meter ethernet cable', 'flat ethernet cable'],
  openGraph: {
    title: 'EXTNGO USB-C to Ethernet | 15 Meter Retractable Cable',
    description: 'Go beyond USB-C limits. Get real wired connectivity — 15 metres of gigabit ethernet in a flat retractable reel.',
    type: 'website',
    url: 'https://extngo-eight.vercel.app/products/blue',
    images: [
      {
        url: '/product-blue.png',
        width: 1200,
        height: 630,
        alt: 'EXTNGO USB-C to Ethernet retractable cable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EXTNGO USB-C to Ethernet | 15 Meter Retractable Cable',
    description: 'Go beyond USB-C limits. Get real wired connectivity — 15 metres of gigabit ethernet in a flat retractable reel.',
    images: ['/product-blue.png'],
  },
  alternates: {
    canonical: 'https://extngo-eight.vercel.app/products/blue',
  },
}

export default function BlueProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import Script from 'next/script'
import dynamic from 'next/dynamic'
import HeroStatic from '@/components/HeroStatic'
import ProductDetail from '@/components/ProductDetail'
import NavBar from '@/components/NavBar'

// Lazy load interactive hero after initial paint
const HeroInteractive = dynamic(() => import('@/components/HeroInteractive'), {
  loading: () => null
})

// Lazy load below-the-fold components
const ProductDifferences = dynamic(() => import('@/components/ProductDifferences'), {
  loading: () => <div style={{ minHeight: '100vh' }} />
})
const WhoItsFor = dynamic(() => import('@/components/WhoItsFor'), {
  loading: () => <div style={{ minHeight: '100vh' }} />
})
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div style={{ minHeight: '100vh' }} />
})
const Cta = dynamic(() => import('@/components/Cta'))
const Footer = dynamic(() => import('@/components/Footer'))
const PinnedProduct = dynamic(() => import('@/components/PinnedProduct'))

export default function Home() {


  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Extngo Retractable Ethernet Cable',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    image: 'https://extngo-eight.vercel.app/hero.png',
    brand: {
      '@type': 'Brand',
      name: 'Extngo',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      url: 'https://extngo-eight.vercel.app',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2000',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Extngo',
    url: 'https://extngo-eight.vercel.app',
    logo: 'https://extngo-eight.vercel.app/logo.png',
    sameAs: [],
  }

  return (
    <>
      <Script
        id="structured-data-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        strategy="afterInteractive"
      />

      {/* Static hero for instant LCP */}
      <HeroStatic />
      
      {/* Interactive hero loads after paint */}
      <HeroInteractive />

      {/* Fixed navbar */}
      <NavBar delayBase={0.05} />

      {/* Spacer */}
      <div style={{ height: '100dvh', position: 'relative', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content stack */}
      <div style={{ position: 'relative', zIndex: 3, background: '#FFFFFF' }}>
        <ProductDetail />
        <ProductDifferences />
        <PinnedProduct />
        <WhoItsFor />
        <Testimonials />
        <Cta />
        <Footer />
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ShopifyStorefront from './ShopifyStorefront'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Buy the EXTNGO retractable flat CAT6 ethernet cable. 50ft and 33ft. Free shipping, hassle-free returns.',
}

export default function ShopPage() {
  return (
    <>
      <NavBar delayBase={0.05} />
      <main
        style={{
          background: '#FAFAFA',
          minHeight: '100vh',
          paddingTop: 'clamp(110px,12vh,140px)',
          paddingBottom: 'clamp(60px,8vh,100px)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(20px,5vw,40px)',
          }}
        >
          {/* Page header */}
          <header style={{ marginBottom: 'clamp(32px,5vh,56px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 13px',
                marginBottom: 18,
                background: 'rgba(232,67,26,.08)',
                border: '1px solid rgba(232,67,26,.22)',
                color: '#E8431A',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderRadius: 999,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8431A' }} />
              Shop EXTNGO
            </div>
            <h1
              className="font-display"
              style={{
                margin: 0,
                fontSize: 'clamp(36px,5vw,64px)',
                lineHeight: 1.02,
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: '-0.035em',
              }}
            >
              Built by IT pros.
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Made for the road.</span>
            </h1>
            <p
              style={{
                marginTop: 18,
                marginBottom: 0,
                color: '#3A3A3A',
                fontSize: 16,
                lineHeight: 1.65,
                maxWidth: 560,
              }}
            >
              Pick your length. Both reels are flat CAT6, 1&nbsp;Gbps, and tuck under any carpet. Free male-male
              patch cable in every box.
            </p>
          </header>

          <ShopifyStorefront />
        </div>
      </main>
      <Footer />
    </>
  )
}

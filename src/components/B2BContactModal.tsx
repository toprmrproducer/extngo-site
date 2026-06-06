'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

interface B2BContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function B2BContactModal({ isOpen, onClose }: B2BContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    quantity: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', phone: '', quantity: '', message: '' })
      setSubmitStatus('idle')
      onClose()
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Don't render on server or if not mounted
  if (!mounted) return null

  const modalContent = (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 999999,
              }}
            />

            {/* Modal Container - Centered */}
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                padding: '20px',
              }}
            >
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="modal-scroll"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 580,
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  background: '#FFFFFF',
                  borderRadius: 20,
                  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
                  padding: 'clamp(28px, 5vw, 40px)',
                  pointerEvents: 'auto',
                }}
              >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(26, 26, 26, 0.12)',
                  background: 'rgba(26, 26, 26, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 26, 26, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 26, 26, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div style={{ marginBottom: 28 }}>
                <div
                  className="inline-flex items-center gap-2.5 rounded-full"
                  style={{
                    padding: '6px 12px',
                    marginBottom: 16,
                    background: 'rgba(232, 67, 26, 0.08)',
                    border: '1px solid rgba(232, 67, 26, 0.22)',
                    color: 'var(--accent)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                  B2B Inquiry
                </div>

                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(26px, 4vw, 36px)',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    margin: '0 0 12px',
                    color: '#1A1A1A',
                  }}
                >
                  Let&apos;s Talk Bulk Orders
                </h2>

                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6D6D6D', margin: 0 }}>
                  Need cables for your team, facility, or event? Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Success message */}
              {submitStatus === 'success' && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#16a34a' }}>
                    Thanks! We&apos;ll be in touch soon.
                  </span>
                </m.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Name & Email */}
                  <div className="b2b-modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          border: '1.5px solid rgba(26, 26, 26, 0.12)',
                          borderRadius: 10,
                          background: '#FAFAFA',
                          color: '#1A1A1A',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-geist)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.background = '#FFFFFF'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                          e.currentTarget.style.background = '#FAFAFA'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          border: '1.5px solid rgba(26, 26, 26, 0.12)',
                          borderRadius: 10,
                          background: '#FAFAFA',
                          color: '#1A1A1A',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-geist)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.background = '#FFFFFF'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                          e.currentTarget.style.background = '#FAFAFA'
                        }}
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="b2b-modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label htmlFor="company" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          border: '1.5px solid rgba(26, 26, 26, 0.12)',
                          borderRadius: 10,
                          background: '#FAFAFA',
                          color: '#1A1A1A',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-geist)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.background = '#FFFFFF'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                          e.currentTarget.style.background = '#FAFAFA'
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          border: '1.5px solid rgba(26, 26, 26, 0.12)',
                          borderRadius: 10,
                          background: '#FAFAFA',
                          color: '#1A1A1A',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-geist)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.background = '#FFFFFF'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                          e.currentTarget.style.background = '#FAFAFA'
                        }}
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                      Estimated Quantity *
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        fontSize: 14,
                        border: '1.5px solid rgba(26, 26, 26, 0.12)',
                        borderRadius: 10,
                        background: '#FAFAFA',
                        color: formData.quantity ? '#1A1A1A' : '#999',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-geist)',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.background = '#FFFFFF'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                        e.currentTarget.style.background = '#FAFAFA'
                      }}
                    >
                      <option value="">Select quantity range</option>
                      <option value="10-50">10-50 units</option>
                      <option value="50-100">50-100 units</option>
                      <option value="100-500">100-500 units</option>
                      <option value="500+">500+ units</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or requirements..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        fontSize: 14,
                        border: '1.5px solid rgba(26, 26, 26, 0.12)',
                        borderRadius: 10,
                        background: '#FAFAFA',
                        color: '#1A1A1A',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-geist)',
                        resize: 'vertical',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.background = '#FFFFFF'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.12)'
                        e.currentTarget.style.background = '#FAFAFA'
                      }}
                    />
                  </div>

                  {/* Submit button */}
                  <m.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    whileHover={!isSubmitting && submitStatus !== 'success' ? { y: -2 } : {}}
                    whileTap={!isSubmitting && submitStatus !== 'success' ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      fontSize: 15,
                      fontWeight: 600,
                      borderRadius: 999,
                      border: 'none',
                      background: isSubmitting || submitStatus === 'success' ? '#ccc' : 'var(--accent)',
                      color: '#FFFFFF',
                      cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      marginTop: 8,
                      boxShadow: isSubmitting || submitStatus === 'success' ? 'none' : '0 8px 24px -8px rgba(232, 67, 26, 0.55)',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-geist)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                          <line x1="12" y1="2" x2="12" y2="6" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                          <line x1="2" y1="12" x2="6" y2="12" />
                          <line x1="18" y1="12" x2="22" y2="12" />
                          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                        </svg>
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Sent!
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </m.button>
                </div>
              </form>

              {/* Footer note */}
              <p style={{ fontSize: 12, color: '#999', marginTop: 20, textAlign: 'center', lineHeight: 1.5 }}>
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </m.div>
          </div>

            <style jsx>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  )

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body)
}

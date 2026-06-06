'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    VG_CONFIG?: {
      ID: string
      region: string
      render: string
      stylesheets: string[]
    }
  }
}

export default function ChatbotWidget() {
  useEffect(() => {
    // Configure the chatbot
    window.VG_CONFIG = {
      ID: "KZ9OwEEjj1Kml8Uf1Gb1",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://cdn.convocore.ai/vg_live_build/styles.css",
      ],
    }

    // Load the chatbot script
    const script = document.createElement("script")
    script.src = "https://cdn.convocore.ai/vg_live_build/vg_bundle.js"
    script.defer = true
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return <div style={{ width: 0, height: 0 }} id="VG_OVERLAY_CONTAINER" />
}

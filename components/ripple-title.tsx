'use client'

import { useEffect, useRef, useState } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'

export default function RippleTitle({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { width: screenSize } = useScreenSize()
  const [svgBackground, setSvgBackground] = useState<string>('')
  const [isFirefox, setIsFirefox] = useState(false)

  useEffect(() => {
    setIsFirefox(navigator.userAgent.toLowerCase().includes('firefox'))
  }, [])

  useEffect(() => {
    // Generate SVG text on the client side to avoid hydration mismatch
    const svgText = encodeURIComponent(`
      <svg width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
        <text class="text-gabarito" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-size="${title.length < 10 && screenSize < 768 ? '20vw' : '12vw'}" font-family="Gabarito, sans-serif" font-weight="bold" fill="#fafafa">
          ${title}
        </text>
      </svg>
    `)
    setSvgBackground(`url("data:image/svg+xml,${svgText}")`)
  }, [title, screenSize])

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const localRef = ref.current

    // Load jQuery if not present
    function loadScript(src: string) {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        document.body.appendChild(script)
      })
    }

    async function setupRipples() {
      // Load jQuery if it doesn't exist
      if (!('jQuery' in window)) {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
      }
      // Load the plugin if it doesn't exist
      if (!('ripples' in (window as any).jQuery.fn)) {
        await loadScript('https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js')
      }
      // Apply the effect
      if (localRef && (window as any).jQuery) {
        (window as any).jQuery(localRef).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        })
      }
    }

    setupRipples()

    return () => {
      // Clean up the effect when unmounting
      if (localRef && (window as any).jQuery && (window as any).jQuery.fn.ripples) {
        (window as any).jQuery(localRef).ripples('destroy')
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center"
      style={!isFirefox ? {
        backgroundImage: svgBackground,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      } : undefined}
    >
      {isFirefox && (
        <svg 
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text 
            className="text-gabarito pointer-events-none select-none"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
              fontSize: title.length < 10 && screenSize < 768 ? '20vw' : '12vw',
              fontFamily: 'Gabarito, sans-serif',
              fontWeight: 'bold',
              fill: '#fafafa'
            }}
          >
            {title}
          </text>
        </svg>
      )}
    </div>
  )
}
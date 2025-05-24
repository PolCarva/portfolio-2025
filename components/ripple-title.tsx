'use client'

import { useEffect, useRef, useState } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'
import { motion } from 'framer-motion'

function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

function isMobile() {
  if (typeof navigator === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function isFirefox() {
  if (typeof navigator === 'undefined') return false
  return navigator.userAgent.toLowerCase().includes('firefox')
}

function isIE() {
  if (typeof navigator === 'undefined') return false
  return /MSIE|Trident/.test(navigator.userAgent)
}

export default function RippleTitle({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { width: screenSize } = useScreenSize()
  const [svgBackground, setSvgBackground] = useState<string>('')
  const [isSizeReady, setIsSizeReady] = useState(false)
  const [shouldFallback, setShouldFallback] = useState(false)

  useEffect(() => {
    if (screenSize > 0) {
      setIsSizeReady(true)
    }
  }, [screenSize])

  useEffect(() => {
    setShouldFallback(
      isMobile() || isFirefox() || isIE() || !isWebGLSupported()
    )
  }, [])

  useEffect(() => {
    if (!isSizeReady) return

    const svgText = encodeURIComponent(`
      <svg width="100svw" height="70svh" xmlns="http://www.w3.org/2000/svg">
        <text class="text-gabarito" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-size="${title.length < 10 && screenSize < 768 ? '20vw' : '12vw'}" font-family="Gabarito, sans-serif" font-weight="bold" fill="#fafafa">
          ${title}
        </text>
      </svg>
    `)
    setSvgBackground(`url("data:image/svg+xml,${svgText}")`)
  }, [title, screenSize, isSizeReady])

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || shouldFallback || !isSizeReady) return

    const localRef = ref.current

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
      try {
        if (!('jQuery' in window)) {
          await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
        }
        if (!('ripples' in (window as any).jQuery.fn)) {
          await loadScript('https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js')
        }
        if (localRef && (window as any).jQuery) {
          (window as any).jQuery(localRef).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          })
        }
      } catch (error) {
        // fallback si falla
      }
    }

    setupRipples()

    return () => {
      try {
        if (
          localRef &&
          typeof (window as any).jQuery === 'function' &&
          (window as any).jQuery.fn &&
          typeof (window as any).jQuery.fn.ripples === 'function' &&
          (window as any).jQuery(localRef).data('ripples')
        ) {
          (window as any).jQuery(localRef).ripples('destroy')
        }
      } catch (e) {}
    }
  }, [shouldFallback, isSizeReady])

  if (shouldFallback) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative w-full h-[70vh] flex items-center justify-center"
      >
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
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: svgBackground,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}
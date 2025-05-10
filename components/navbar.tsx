'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './Nav' // Este importará el Nav.tsx que ya creamos
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Cierra el menú si cambia la ruta
    if (isActive) setIsActive(false)
  }, [pathname])

  return (
    <>
      {/* Contenedor del Botón Burger */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 rounded-full bg-gray flex items-center justify-center cursor-pointer relative outline-none border-none shadow-md"
          aria-label="Toggle menu"
        >
          {/* Ícono Burger/Cruz - dos líneas que se transforman */}
          <div className={`w-1/2 h-[2px] bg-white absolute transform transition-all duration-300 ease-in-out ${isActive ? 'rotate-45' : '-translate-y-1'}`} />
          <div className={`w-1/2 h-[2px] bg-white absolute transform transition-all duration-300 ease-in-out ${isActive ? '-rotate-45' : 'translate-y-1'}`} />
        </button>
      </div>

      {/* Menú Lateral (Nav) */}
      <AnimatePresence mode="wait">
        {isActive && <Nav onClose={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  )
} 
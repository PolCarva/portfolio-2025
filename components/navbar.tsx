'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './Nav' // Este importará el Nav.tsx que ya creamos
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Cierra el menú si cambia la ruta
    if (isActive) setIsActive(false)
  }, [pathname])

  return (
    <>
      <div className='fixed top-3 left-0 p-8 w-fit h-fit z-50'>
        <Link href="/" className={`${isActive ? 'text-black' : 'text-white'} sm:text-white transition-colors duration-350 text-xl md:text-4xl font-medium`}>
          pablo carvalho.
        </Link>
      </div>

      {/* Contenedor del Botón Burger */}
      <div className="fixed top-0 right-0 z-50 p-8">
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
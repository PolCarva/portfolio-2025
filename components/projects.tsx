'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTransform, useScroll, motion, useVelocity, type MotionValue } from 'framer-motion'
import Link from 'next/link'
import Paragraph from './ui/character'
import Image from 'next/image'


// Array de imágenes (placeholders por ahora)
const images_array = [
  "/images/projects/wordle.png",
  "/images/projects/fito.svg",
  "/images/projects/alumnosjs.png",
  "/images/projects/filo.jpg",
  "/images/projects/msm.png",
  "/images/projects/wordle.png",
  "/images/projects/dark.png",
  "/images/projects/alumnosjs.png",
  "/images/projects/fito.svg",
  "/images/projects/filo.jpg",
  "/images/projects/msm.png",
]

export default function Projects() {
  return <>
    <div className="min-h-screen pt-16 relative z-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center px-8 py-4">
        <div className="text-sm self-start">03/</div>
        <h2 className="text-center text-xl tracking-widest">projects</h2>
        <div className="text-sm mx-auto md:mx-0 md:text-base text-center w-[235px] md:text-right mt-5 md:mt-0">
          <Link href="/projects" className="hover:underline">
            featured
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-8 px-8 md:flex-row justify-between md:items-end   mb-12 mt-8 md:mt-16">
      <div>
        <Link
          href="/projects"
          className="px-8 py-4 md:px-12 my-10 md:py-6 rounded-full max-w-[calc(100vw-2rem)] md:max-w-md mx-auto md:mx-0 md:ml-auto w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider">  view all projects
        </Link>
      </div>
      <div className="max-w-xl">
      
        <Paragraph className="text-left ml-auto" paragraph="here are some of my projects, showcasing my skills in web development, product design, and brand identity." />
      </div>
      </div>
      <Gallery />
      
    </div>
  </>
}

function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start']
  })

  const { width } = dimension
  const x1 = useTransform(scrollYProgress, [0, 1], [-width * 0.4, 0])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.8])
  const x3 = useTransform(scrollYProgress, [0, 1], [-width * 0.6, 0])

  useEffect(() => {
    const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  // Distribuir imágenes a las filas
  const row1Images = images_array.slice(0, 4)
  const row2Images = images_array.slice(4, 8)
  const row3Images = images_array.slice(8, 12)

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black overflow-hidden h-[60vh] md:h-[75vh] relative">
      <div className="w-full px-2 md:px-8">
        <div 
          ref={galleryRef} 
          className="flex flex-col gap-4 md:gap-16 w-full max-w-screen-2xl mx-auto absolute top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%) rotate(30deg) scale(1.125)'
          }}
        >
          <GalleryRow images={row1Images} x={x1} />
          <GalleryRow images={row2Images} x={x2} reverse />
          <GalleryRow images={row3Images} x={x3} />
        </div>
      </div>
    </section>
  )
}

interface GalleryRowProps {
  images: string[]
  x: MotionValue<number>
  reverse?: boolean
}

function GalleryRow({ images, x, reverse = false }: GalleryRowProps) {
  const rowMotionX = reverse ? useTransform(x, (v: number) => -v) : x

  return (
    <motion.div
      className="flex flex-row gap-4 md:gap-8 lg:gap-12 w-[150vw] h-[150px] md:h-fit lg:h-[350px] justify-center px-2 md:px-8 pb-2"
      style={{ x: rowMotionX }}
    >
      {images.map((src, i) => {
        const uniqueKey = `gallery-item-${reverse ? 'rev' : 'fwd'}-${i}-${src.split('/').pop()}`
        return (
          <motion.div
            key={uniqueKey}
            className="relative w-[200px] h-full md:w-[320px] md:h-[180px] lg:w-auto lg:h-full overflow-hidden aspect-video rounded-lg bg-transparent flex-shrink-0"
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 320px, 360px"
              />
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

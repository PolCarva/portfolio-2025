'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTransform, useScroll, motion } from 'framer-motion'


const images = Array(12).fill('/placeholder.svg')

export default function Projects() {
  return <HorizontalGallery />
}

function HorizontalGallery() {
  const gallery = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })

  const { width } = dimension
  const x1 = useTransform(scrollYProgress, [0, 1], [-width, width * 0.01])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.2])
  const x3 = useTransform(scrollYProgress, [0, 1], [-width,  0])

  useEffect(() => {
    const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 overflow-x-hidden">
      <div className="h-[20vh]" />
      <div className="w-full overflow-x-hidden">
        <div ref={gallery} className="flex flex-col gap-8 w-full max-w-7xl overflow-x-visible">
          <Row images={images} x={x1} />
          <Row images={images} x={x2} reverse />
          <Row images={images} x={x3} />
        </div>
      </div>
      <div className="h-[20vh]" />
    </section>
  )
}

function Row({ images, x, reverse = false }: { images: string[], x: any, reverse?: boolean }) {
  const infiniteImages = [...images, ...images, ...images, ...images]
  const animatedX = reverse ? useTransform(x, v => -v) : x

  return (
    <motion.div
      className={`flex flex-row gap-8 w-fit`}
      style={{ x: animatedX }}
    >
      {infiniteImages.map((src, i) => (
        <div key={i} className="relative w-96 h-64 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
          <Image
            src={src}
            alt="project image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={i < 3}
          />
        </div>
      ))}
    </motion.div>
  )
}

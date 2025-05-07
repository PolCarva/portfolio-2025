"use client"

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Slide from './slide'

interface SliderProps {
  images: string[]
}

export default function Slider({ images }: SliderProps) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })

  return (
    <div ref={container} className="relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Slide 
          direction="left" 
          progress={scrollYProgress} 
          left="0%" 
          src={images[0]} 
        />
        <Slide 
          direction="right" 
          progress={scrollYProgress} 
          left="-50%" 
          src={images[1]} 
        />
        <Slide 
          direction="left" 
          progress={scrollYProgress} 
          left="-15%" 
          src={images[2]} 
        />
      </div>
    </div>
  )
}

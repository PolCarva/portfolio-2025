'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'

interface SlideProps {
  direction: 'left' | 'right'
  progress: MotionValue<number>
  left: string
  src: string
}

interface PhraseProps {
  src: string
  text: string
  reverse?: boolean
}

const Slide = ({ direction, progress, left, src }: SlideProps) => {
  const translateX = useTransform(progress, [0, 1], [150 * (direction === 'left' ? -1 : 1), -150 * (direction === 'left' ? -1 : 1)])
  
  return (
    <motion.div 
      style={{ x: translateX, left }} 
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={src} text="multimedia designer" />
      <Phrase src={src} reverse={true} text="multimedia designer" />
      <Phrase src={src} text="multimedia designer" />
    </motion.div>
  )
}

const Phrase = ({ src, text, reverse = false }: PhraseProps) => {
  return (
    <div className="px-5 flex gap-5 items-center ">
      <p className=" text-[7.5vw] font-bold">{text}</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image 
          style={{ objectFit: "cover", objectPosition: "center" }} 
          src={src} 
          alt="Developer" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </span>
      <p className="text-[7.5vw] font-bold">{text}</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image 
          style={{ objectFit: "cover", objectPosition: "bottom" }} 
          src={src} 
          alt="Developer" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </span>
      <p className="text-[7.5vw] font-bold">{text}</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image 
          style={{ objectFit: "cover", objectPosition: "bottom" }} 
          src={src} 
          alt="Developer" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </span>
    </div>
  )
}

export default Slide
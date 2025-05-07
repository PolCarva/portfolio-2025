'use client'

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import styles from './style.module.scss';

interface ParagraphProps {
  paragraph: string
  className?: string
}

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

interface CharProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

export default function Paragraph({ paragraph, className = '' }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className={`text-4xl font-bold leading-relaxed ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })}
    </p>
  )
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="inline-block mx-1">
      {children.split("").map((char, i) => {
        const start = range[0] + (i * step)
        const end = range[0] + ((i + 1) * step)
        return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
      })}
    </span>
  )
}

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline-block">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
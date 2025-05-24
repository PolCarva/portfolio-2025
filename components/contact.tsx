'use client'

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import WaterLink from "./ui/water-link"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  
  return (
    <motion.section 
      id="contact" 
      ref={sectionRef}
      className="md:min-h-screen py-16 px-8 flex flex-col justify-center relative border rounded-2xl border-white m-8"
      style={{ 
        scale,
        originX: 0.5,
        originY: 0.5
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-lg mb-4">got a project in mind?</p>

        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">let's connect</h2>

        <div className="flex justify-center">
          <WaterLink
            href="mailto:pablocarvalhogimenez@gmail.com"
            className="rounded-full border border-white w-32 h-32 md:w-40 md:h-40 flex items-center justify-center duration-1000 hover:text-black transition-colors"
          >
            <div className="text-center md:text-lg text-sm">
              write a<br />
              message
            </div>
          </WaterLink>
        </div>
      </div>
    </motion.section>
  )
}

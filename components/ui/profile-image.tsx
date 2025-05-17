"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProfileImage({ src, alt, className = "" }: ProfileImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full aspect-square overflow-hidden rounded-lg ${className}`}
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          rotateY,
          perspective: "1000px"
        }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

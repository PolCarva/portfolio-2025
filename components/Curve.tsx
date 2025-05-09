'use client'
import React from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
  const dynamicHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const initialPath = `M100 0 L200 0 L200 ${dynamicHeight} L100 ${dynamicHeight} Q-100 ${dynamicHeight/2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${dynamicHeight} L100 ${dynamicHeight} Q100 ${dynamicHeight/2} 100 0`;
  
  const curveVariants = {
    initial: {
        d: initialPath
    },
    enter: {
        d: targetPath,
        transition: {duration: 1, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        d: initialPath,
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}
    }
  };

  return (
    <svg 
      className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#fafafa] stroke-none pointer-events-none"
    >
        <motion.path 
            variants={curveVariants} 
            initial="initial" 
            animate="enter" 
            exit="exit"
        />
    </svg>
  );
} 
'use client'
import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image' // Still used for placeholder array
import { useTransform, useScroll, motion, useVelocity, type MotionValue } from 'framer-motion'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three' // Import THREE namespace

// const images = Array(12).fill('/placeholder.svg') // Ya no se usa para generar items

// Shader Definitions
const vertexShader = `
varying vec2 vUv;
uniform vec2 uDirection;
uniform float uStrength;
float PI = 3.141592653589793238;

void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uDirection.x * uStrength;
    newPosition.y += sin(uv.x * PI) * uDirection.y * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
// uniform sampler2D uTexture; // No necesitamos uTexture para el color rojo
uniform float uAlpha; // uAlpha se usará para la opacidad del color rojo

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, uAlpha); // Rojo sólido con opacidad controlada por uAlpha
}
`

const DistortionMaterial = shaderMaterial(
  {
    uTexture: null, // Inicializar uTexture como null ya que no la usamos para el rojo
    uAlpha: 1.0,    // uAlpha por defecto a 1 para opacidad total
    uStrength: 0.0,
    uDirection: new THREE.Vector2(0, 0),
  },
  vertexShader,
  fragmentShader
)

extend({ DistortionMaterial })

// TypeScript type for the extended material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any; 
    }
  }
}

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
  const x1 = useTransform(scrollYProgress, [0, 1], [-width * 0.5, width * 0.1]) // Adjusted intensity
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.3]) // Adjusted intensity
  const x3 = useTransform(scrollYProgress, [0, 1], [-width * 0.6, 0]) // Adjusted intensity

  useEffect(() => {
    const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 overflow-x-hidden bg-black"> {/* Added bg-black for better visibility */}
      <div className="h-[10vh]" /> {/* Reduced vertical spacing */}
      <div className="w-full overflow-x-hidden">
        <div ref={gallery} className="flex flex-col gap-4 md:gap-6 w-full max-w-screen-2xl"> {/* Increased max-width and adjusted gap */}
          <Row count={8} x={x1} />
          <Row count={8} x={x2} reverse />
          <Row count={8} x={x3} />
        </div>
      </div>
      <div className="h-[10vh]" /> {/* Reduced vertical spacing */}
    </section>
  )
}

interface RowProps {
  // images: string[]; // Ya no se usa
  x: MotionValue<number>;
  count: number; // Para determinar cuántos cuadrados renderizar
  reverse?: boolean;
}

function Row({ x, count, reverse = false }: RowProps) {
  const itemsToRender = Array.from({ length: count });
  const rowMotionX = reverse ? useTransform(x, (v: number) => -v) : x

  return (
    <motion.div
      className="flex flex-row gap-4 md:gap-6 w-fit" // Matched gap with parent
      style={{ x: rowMotionX }}
    >
      {itemsToRender.map((_, i) => (
        <div 
          key={`distort-item-${i}`} // More unique key
          className="relative w-[40svw] aspect-[4/3] md:w-[380px] md:h-[285px] rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0" // Adjusted aspect ratio and size
        >
          <DistortingImage rowMotionX={rowMotionX} itemKey={`canvas-${i}`} /> {/* Pasar una key única para el Canvas */}
        </div>
      ))}
    </motion.div>
  )
}

interface DistortingImageProps {
  // src: string; // src eliminado
  rowMotionX: MotionValue<number>;
  itemKey: string; // Key para el Canvas
}

// This new component will contain the R3F hooks and mesh logic
function MeshWithDistortion({ rowMotionX }: Omit<DistortingImageProps, 'itemKey'>) {
  const materialRef = useRef<InstanceType<typeof DistortionMaterial>>(null)
  // const texture = useTexture(src) // Textura no se usa para la prueba de canvas rojo
  // texture.wrapS = THREE.RepeatWrapping; 
  // texture.wrapT = THREE.RepeatWrapping;
  const velocity = useVelocity(rowMotionX) // Reactivado para la lógica de scroll

  useFrame(() => { 
    if (materialRef.current) { 
      // --- Lógica de scroll reactivada ---
      const currentVelocity = velocity.get()
      let strength = Math.abs(currentVelocity) / 500 
      strength = Math.min(strength, 0.5) 

      let directionX = 0
      const velocityThreshold = 1 
      if (currentVelocity > velocityThreshold) directionX = 1
      else if (currentVelocity < -velocityThreshold) directionX = -1
      
      materialRef.current.uniforms.uStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uStrength.value,
        strength,
        0.15 
      );
      materialRef.current.uniforms.uDirection.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDirection.value.x,
        directionX,
        0.15 
      );
      materialRef.current.uniforms.uDirection.value.y = 0.0; 
      materialRef.current.uniforms.uAlpha.value = 1.0; // Asegurar opacidad del rojo
      // --- Fin lógica de scroll ---
    }
  })

  return (
    <mesh>
      {/* 2. Añadir Segmentos a la Geometría del Plano */}
      <planeGeometry args={[1.33 * 1.35, 1 * 1.35, 32, 32]} /> 
      <distortionMaterial
        ref={materialRef}
        // uTexture={texture} // TEMPORALMENTE COMENTADO
        toneMapped={false} 
        transparent={true} 
        // uAlpha={1.0} // Se puede pasar si el shader (rojo) lo usara explícitamente
      />
    </mesh>
  )
}

function DistortingImage({ rowMotionX, itemKey }: DistortingImageProps) {
  return (
    // Canvas now wraps the component that uses R3F hooks
    <Canvas key={itemKey} dpr={[1, 1.5]} camera={{ fov: 30, position: [0, 0, 2.8] }}> {/* Adjusted fov and camera Z */}
      <MeshWithDistortion rowMotionX={rowMotionX} />
    </Canvas>
  )
}

'use client'
import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image' // Still used for placeholder array
import { useTransform, useScroll, motion, useVelocity, type MotionValue } from 'framer-motion'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three' // Import THREE namespace
import Link from 'next/link'
import Paragraph from './ui/character'

// Array de imágenes (placeholders por ahora)
const images_array = [
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=600&width=800",

];

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
uniform sampler2D uTexture; // Reactivar uTexture
uniform float uAlpha;       // Reactivar uAlpha

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    // Aplicar el alpha del uniform al alpha de la textura
    gl_FragColor = vec4(texColor.rgb, texColor.a * uAlpha);
}
`

const DistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(), // Inicializar uTexture (puede ser null o una textura default)
    uAlpha: 1.0,                   // uAlpha por defecto a 1 para opacidad total
    uStrength: 0.0,
    uDirection: new THREE.Vector2(0, 0),
  },
  vertexShader,
  fragmentShader
)

extend({ DistortionMaterial })

// TypeScript type for the extended material (temporalmente any para desbloquear)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: any;
    }
  }
}

export default function Projects() {
  return <>
    <div className="min-h-screen py-16 relative z-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center px-8 py-4">
        <div className="text-sm self-start">03/</div>
        <h2 className="text-center text-xl tracking-widest">projects</h2>
        <div className="text-sm mx-auto md:mx-0 md:text-base text-center w-[235px] md:text-right mt-5 md:mt-0">
          <Link href="/projects" className="hover:underline">
            view all
          </Link>
        </div>
      </div>
      <div className="max-w-xl ml-auto mb-12 mt-16">
        <Paragraph className="text-left ml-auto" paragraph="here are some of my projects, showcasing my skills in web development, product design, and brand identity." />
      </div>
      <HorizontalGallery />
      <div className="px-8 py-4">
        <Link
          href="/projects"
          className="px-8 py-4 md:px-12 my-10 md:py-6 rounded-full max-w-[calc(100vw-2rem)] md:max-w-md mx-auto md:mx-0 md:ml-auto w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider"
        >
          view all projects
        </Link>
      </div>
    </div>
  </>
}

function HorizontalGallery() {
  const gallery = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })

  const { width } = dimension
  const x1 = useTransform(scrollYProgress, [0, 1], [-width * 0.4, 0])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.3])
  const x3 = useTransform(scrollYProgress, [0, 1], [-width * 0.6, 0])

  useEffect(() => {
    const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  // Distribuir imágenes a las filas
  const row1Images = images_array.slice(0, 4);
  const row2Images = images_array.slice(4, 8);
  const row3Images = images_array.slice(8, 12);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black overflow-x-hidden">
      <div className="w-full px-2 md:px-8">
        <div ref={gallery} className="flex flex-col gap-4 md:gap-12 w-full max-w-screen-2xl mx-auto">
          <Row images={row1Images} x={x1} />
          <Row images={row2Images} x={x2} reverse />
          <Row images={row3Images} x={x3} />
        </div>
      </div>
    </section>
  )
}

interface RowProps {
  images: string[]; // Cambiado de count a images
  x: MotionValue<number>;
  reverse?: boolean;
}

function Row({ images, x, reverse = false }: RowProps) {
  const rowMotionX = reverse ? useTransform(x, (v: number) => -v) : x

  return (
    <motion.div
      className="flex flex-row gap-0 md:gap-6 w-fit"
      style={{ x: rowMotionX }}
    >
      {images.map((src, i) => {
        const uniqueKey = `distort-item-${reverse ? 'rev' : 'fwd'}-${i}-${src.split('/').pop()}`;
        return (
          <div
            key={uniqueKey}
            className="relative w-[calc(40vw-1rem)] md:w-[calc(33.333vw-1rem)] overflow-visible aspect-[4/3] md:w-[calc(33.333vw-2rem)] md:h-[calc((33.333vw-2rem)*0.75)] lg:w-[calc(33.333vw-3rem)] lg:h-[calc((33.333vw-3rem)*0.75)] rounded-lg bg-transparent flex-shrink-0"
          >
            <DistortingImage src={src} rowMotionX={rowMotionX} itemKey={`canvas-${uniqueKey}`} />
          </div>
        );
      })}
    </motion.div>
  )
}

interface DistortingImageProps {
  src: string; // src añadido
  rowMotionX: MotionValue<number>;
  itemKey: string;
}

function MeshWithDistortion({ src, rowMotionX }: Omit<DistortingImageProps, 'itemKey'>) {
  const materialRef = useRef<InstanceType<typeof DistortionMaterial>>(null)
  const texture = useTexture(src); // Cargar la textura usando el src
  // Configurar texture wrapping si es necesario (opcional)
  // texture.wrapS = THREE.RepeatWrapping; 
  // texture.wrapT = THREE.RepeatWrapping;
  const velocity = useVelocity(rowMotionX)

  useFrame(() => {
    if (materialRef.current) {
      const currentVelocity = velocity.get()
      // Reducir la fuerza de la distorsión y suavizar el efecto
      let strength = Math.abs(currentVelocity) / 1000 // Reducido de 500 a 1000
      strength = Math.min(strength, 0.2) // Reducido el máximo de 0.5 a 0.2

      let directionX = 0
      const velocityThreshold = 0.5 // Umbral más bajo para una respuesta más suave
      if (currentVelocity > velocityThreshold) directionX = 0.5 // Reducir la intensidad de la dirección
      else if (currentVelocity < -velocityThreshold) directionX = -0.5 // Reducir la intensidad de la dirección

      // Hacer la transición más suave
      materialRef.current.uniforms.uStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uStrength.value,
        strength,
        0.08 // Reducido de 0.15 para una transición más suave
      );
      materialRef.current.uniforms.uDirection.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDirection.value.x,
        directionX,
        0.08 // Reducido de 0.15 para una transición más suave
      );
      materialRef.current.uniforms.uDirection.value.y = 0.0;

      // Asignar la textura y el alpha al material en cada frame
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uAlpha.value = 1.0; // Mantener alpha en 1.0 por ahora
    }
  })

  return (
    <mesh>
      <planeGeometry args={[1.33 * 1.1, 1 * 1.1, 16, 16]} />
      <distortionMaterial
        ref={materialRef}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  )
}

function DistortingImage({ src, rowMotionX, itemKey }: DistortingImageProps) {
  return (
    <Canvas key={itemKey} dpr={[1, 1.5]} camera={{ fov: 30, position: [0, 0, 2.8] }}>
      <MeshWithDistortion src={src} rowMotionX={rowMotionX} />
    </Canvas>
  )
}

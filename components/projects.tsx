'use client'
import React, { useEffect, useRef, useState } from 'react'
// import Image from 'next/image' // Still used for placeholder array
import { useTransform, useScroll, motion, useVelocity, type MotionValue } from 'framer-motion'
import { Canvas, extend, useFrame, type ShaderMaterialProps } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three' // Import THREE namespace

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
  const x1 = useTransform(scrollYProgress, [0, 1], [-width * 0.5, width * 0.1])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.3])
  const x3 = useTransform(scrollYProgress, [0, 1], [-width * 0.6, 0])

  useEffect(() => {
    const resize = () => setDimension({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])
  
  // Distribuir imágenes a las filas
  const row1Images = images_array.slice(0, 5);
  const row2Images = images_array.slice(4, 9);
  const row3Images = images_array.slice(2, 7);

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 overflow-x-hidden bg-black">
      <div className="h-[10vh]" />
      <div className="w-full overflow-x-hidden">
        <div ref={gallery} className="flex flex-col gap-4 md:gap-6 w-full max-w-screen-2xl">
          <Row images={row1Images} x={x1} />
          <Row images={row2Images} x={x2} reverse />
          <Row images={row3Images} x={x3} />
        </div>
      </div>
      <div className="h-[10vh]" />
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
      className="flex flex-row gap-4 md:gap-6 w-fit"
      style={{ x: rowMotionX }}
    >
      {images.map((src, i) => {
        const uniqueKey = `distort-item-${reverse ? 'rev' : 'fwd'}-${i}-${src.split('/').pop()}`;
        return (
          <div 
            key={uniqueKey} // Key más única
            className="relative w-[40svw] aspect-[4/3] md:w-[380px] md:h-[285px] rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0"
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
      
      // Asignar la textura y el alpha al material en cada frame
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uAlpha.value = 1.0; // Mantener alpha en 1.0 por ahora
    }
  })

  return (
    <mesh>
      <planeGeometry args={[1.33 * 1.35, 1 * 1.35, 32, 32]} />
      <distortionMaterial
        as any // Mantener aserción temporal
        ref={materialRef}
        // uTexture={texture} // Se maneja en useFrame
        toneMapped={false}
        transparent={true}
        // uAlpha={1.0} // Se maneja en useFrame
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

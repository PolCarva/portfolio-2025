"use client"

import { useEffect, useRef } from "react"

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create textures
    const createTexture = () => {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      return texture
    }

    const heightTexture = createTexture()
    const backgroundTexture = createTexture()

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Fragment shader
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 mouse;
      uniform sampler2D heightMap;
      uniform sampler2D backgroundMap;
      varying vec2 vUv;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 q = fragCoord.xy/iResolution.xy;
        vec2 uv = vUv;
        
        // Calculate gradient from height map
        vec3 e = vec3(vec2(1.)/iResolution.xy, 0.);
        float p10 = texture2D(heightMap, q-e.zy).x;
        float p01 = texture2D(heightMap, q-e.xz).x;
        float p21 = texture2D(heightMap, q+e.xz).x;
        float p12 = texture2D(heightMap, q+e.zy).x;
        
        // Calculate normal and lighting
        vec3 grad = normalize(vec3(p21 - p01, p12 - p10, 1.));
        vec3 light = normalize(vec3(.2,-.5,.7));
        float diffuse = dot(grad, light);
        float spec = pow(max(0.,-reflect(light,grad).z), 32.);
        
        // Background gradient
        vec2 p[4];
        float t = iTime * 0.3;
        p[0] = vec2(0.1, 0.9);
        p[1] = vec2(0.9, 0.9);
        p[2] = vec2(0.5, 0.1);
        p[3] = vec2(cos(t), sin(t)) * 0.4 + vec2(0.5, 0.5);
        
        vec3 c[4];
        c[0] = vec3(0.01);
        c[1] = vec3(0.05);
        c[2] = vec3(0.10);
        c[3] = vec3(0.15);

        float blend = 4.0;
        float w[4];
        vec3 sum = vec3(0.0);
        float valence = 0.0;
        
        for (int i = 0; i < 4; i++) {
            float distance = length(uv - p[i]);
            if (distance == 0.0) { distance = 1.0; }
            float w = 1.0 / pow(distance, blend);
            sum += w * c[i];
            valence += w;
        }
        sum /= valence;

        // Combine ripple effect with background
        vec4 rippleColor = vec4(sum.xyz, 1.0);
        rippleColor.rgb *= max(diffuse, 0.2);
        rippleColor.rgb += spec * 0.5;
        
        fragColor = rippleColor;
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    // Check for shader compilation errors
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader))
      return
    }
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader))
      return
    }
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Create quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const iResolutionLocation = gl.getUniformLocation(program, "iResolution")
    const iTimeLocation = gl.getUniformLocation(program, "iTime")
    const mouseLocation = gl.getUniformLocation(program, "mouse")
    const heightMapLocation = gl.getUniformLocation(program, "heightMap")
    const backgroundMapLocation = gl.getUniformLocation(program, "backgroundMap")

    // Mouse state
    let mouse = [0.5, 0.5]
    function updateMouse(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      ]
    }
    canvas.addEventListener('mousemove', updateMouse)
    canvas.addEventListener('mousedown', updateMouse)

    // Animation loop
    let startTime = Date.now()
    let animationFrameId: number

    const render = () => {
      const time = (Date.now() - startTime) / 1000

      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(iTimeLocation, time)
      gl.uniform2f(mouseLocation, mouse[0], mouse[1])

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, heightTexture)
      gl.uniform1i(heightMapLocation, 0)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, backgroundTexture)
      gl.uniform1i(backgroundMapLocation, 1)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      const cleanupCanvas = canvasRef.current
      window.removeEventListener("resize", setCanvasDimensions)
      window.cancelAnimationFrame(animationFrameId)
      if (cleanupCanvas) {
        cleanupCanvas.removeEventListener('mousemove', updateMouse)
        cleanupCanvas.removeEventListener('mousedown', updateMouse)
      }
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteTexture(heightTexture)
      gl.deleteTexture(backgroundTexture)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-100 z-[-1]" />
}
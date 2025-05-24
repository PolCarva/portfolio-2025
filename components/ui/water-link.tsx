"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface WaterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
  href: string
}

export default function WaterLink({ children, className, href, ...props }: WaterLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <Link
      href={href}
      ref={linkRef}
      className={cn(
        "relative overflow-hidden rounded-full border text-center border-white text-xl font-bold tracking-wider transition-colors",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className={cn(
          "absolute pointer-events-none rounded-full bg-white transition-transform ease-[cubic-bezier(0.4,0,0.2,1)]",
          isHovered ? "duration-1000" : "duration-300"
        )}
        style={{
          left: position.x,
          top: position.y,
          width: isHovered ? "2000px" : "0px",
          height: isHovered ? "2000px" : "0px",
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
        }}
      />
    </Link>
  )
}

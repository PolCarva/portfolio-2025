import Link from "next/link"
import type { ReactNode } from "react"

interface CircularButtonProps {
  href: string
  children: ReactNode
  className?: string
}

export default function CircularButton({ href, children, className = "" }: CircularButtonProps) {
  return (
    <Link
      href={href}
      className={`rounded-full border border-white w-32 h-32 flex items-center justify-center hover:bg-white hover:text-black transition-colors ${className}`}
    >
      <div className="text-center text-sm">{children}</div>
    </Link>
  )
}

import type React from "react"
interface SectionHeaderProps {
  number: string
  title: string
  rightContent?: React.ReactNode
}

export default function SectionHeader({ number, title, rightContent }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="text-sm">{number}</div>
      <h2 className="text-center text-xl uppercase tracking-widest">{title}</h2>
      <div className="text-sm">{rightContent}</div>
    </div>
  )
}

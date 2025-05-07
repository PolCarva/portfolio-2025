import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  id: number
  title: string
  image: string
  category: string
}

export default function ProjectCard({ id, title, image, category }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-md bg-gray-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{category}</p>
      </div>
    </Link>
  )
}

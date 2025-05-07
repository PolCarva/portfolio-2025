import Image from "next/image"
import Link from "next/link"
import Paragraph from "./ui/character"

const projects = [
  {
    id: 1,
    title: "project 1",
    image: "/placeholder.svg?height=500&width=400",
    category: "branding",
  },
  {
    id: 2,
    title: "project 2",
    image: "/placeholder.svg?height=500&width=400",
    category: "web design",
  },
  {
    id: 3,
    title: "project 3",
    image: "/placeholder.svg?height=500&width=400",
    category: "ui/ux",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-16 px-8 ">
      <div className="flex justify-between items-center py-4">
        <div className="text-sm">03/</div>
        <h2 className="text-center text-xl tracking-widest">projects</h2>
        <div className="text-sm">/04</div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <Link
            href="#all-projects"
            className="rounded-full border border-white w-32 h-32 flex items-center justify-center hover:bg-white hover:text-black transition-colors mb-8 md:mb-0"
          >
            <div className="text-center text-xs">
              view all
              <br />
              projects
            </div>
          </Link>

          <Paragraph className="ml-auto max-w-2xl" paragraph="here are some select projects that showcase my passion for creating memorable web experiences, products, and
            brands to life." />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-md bg-gray-900">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

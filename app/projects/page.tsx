'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Array de proyectos (esto deberías moverlo a un archivo separado)
const projects = [
  {
    id: 1,
    column: 1,
    title: "Stellar Horizon",
    description: "Creative Campaign, Augmented Reality, Interactive Design",
    image: "/placeholder.svg?height=600&width=800"
  },
  {
    id: 2,
    column: 2,
    title: "Velvet Mirage — Echo Chamber",
    description: "Music Video, Color Grading, 3D Environments",
    image: "/placeholder.svg?height=600&width=800"
  },
  {
    id: 3,
    column: 1,
    title: "Proyecto 3",
    description: "Descripción del proyecto 3",
    image: "/placeholder.svg?height=600&width=800"
  },
  {
    id: 4,
    column: 2,
    title: "Proyecto 4",
    description: "Descripción del proyecto 4",
    image: "/placeholder.svg?height=600&width=800"
  }
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mt-16 mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <ArrowRight size={18} />
            <p className="font-semibold tracking-wider">Selected projects</p>
          </div>

          <div className="flex flex-col md:flex-row gap-[4em]">
            <div className="flex flex-col gap-[6em] w-full">
              {projects
                .filter((project) => project.column === 1)
                .map((project) => (
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="no-underline group"
                  >
                    <div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                    >
                      <div className="project-img w-full aspect-[4/5] rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                      <div className="project-name mt-6 mb-2.5">
                        <h2 className="text-xl font-medium text-white">{project.title}</h2>
                      </div>
                      <div className="project-description">
                        <p className="text-base text-gray-400">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="flex flex-col gap-[6em] w-full md:mt-[10em]">
              {projects
                .filter((project) => project.column === 2)
                .map((project) => (
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="no-underline group"
                  >
                    <div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                    >
                      <div className="project-img w-full aspect-[4/5] rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                      <div className="project-name mt-6 mb-2.5">
                        <h2 className="text-xl font-medium text-white">{project.title}</h2>
                      </div>
                      <div className="project-description">
                        <p className="text-base text-gray-400">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @media (min-width: 768px) {
          .project {
            opacity: 0.35;
            transition: opacity 0.5s;
          }
          .group:hover .project {
            opacity: 1 !important;
          }
        }
        @media (max-width: 900px) {
          .project {
            opacity: 1 !important;
          }
        }
      `}</style>
    </main>
  )
}

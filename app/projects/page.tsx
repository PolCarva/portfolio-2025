'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { projects } from '../data/projects'

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
                    href={project.link}
                    key={project.id}
                    className="no-underline group"
                  >
                    <div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                    >
                      <div className="project-img w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                          width={1920}
                          height={1080}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                      <div className="project-name mt-6 mb-2.5">
                        <h2 className="text-xl font-medium lowercase text-white">{project.title}</h2>
                      </div>
                      <div className="project-description">
                        <p className="text-base text-gray-400 lowercase">{project.description}</p>
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
                    href={project.link} 
                    target="_blank"
                    key={project.id}
                    className="no-underline group"
                  >
                    <div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                    >
                      <div className="project-img w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                          width={1920}
                          height={1080}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                      <div className="project-name mt-6 mb-2.5">
                        <h2 className="text-xl font-medium lowercase text-white">{project.title}</h2>
                      </div>
                      <div className="project-description">
                        <p className="text-base text-gray-400 lowercase">{project.description}</p>
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

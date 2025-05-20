'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { projects } from '../data/projects'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mt-16 mx-auto">
          <motion.div 
            className="flex items-center gap-4 mb-16"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ArrowRight size={18} />
            <p className="font-semibold tracking-wider">Selected projects</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-[4em]">
            <motion.div 
              className="flex flex-col gap-[6em] w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects
                .filter((project) => project.column === 1)
                .map((project) => (
                  <Link
                    href={project.link}
                    key={project.id}
                    className="no-underline group"
                  >
                    <motion.div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="project-img w-full aspect-video rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Image
                          width={1920}
                          height={1080}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover"
                          style={{ transformOrigin: 'center' }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/30"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.div 
                        className="project-name mt-6 mb-2.5"
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <h2 className="text-xl font-medium lowercase text-white">{project.title}</h2>
                      </motion.div>
                      <motion.div 
                        className="project-description"
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <p className="text-base text-gray-400 lowercase">{project.description}</p>
                      </motion.div>
                    </motion.div>
                  </Link>
                ))}
            </motion.div>

            <motion.div 
              className="flex flex-col gap-[6em] w-full md:mt-[10em]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects
                .filter((project) => project.column === 2)
                .map((project) => (
                  <Link
                    href={project.link} 
                    target="_blank"
                    key={project.id}
                    className="no-underline group"
                  >
                    <motion.div
                      className="project relative will-change-auto transition-opacity duration-500 opacity-100 md:opacity-35 group-hover:opacity-100"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="project-img w-full aspect-video rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Image
                          width={1920}
                          height={1080}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full rounded-lg object-cover"
                          style={{ transformOrigin: 'center' }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/30"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.div 
                        className="project-name mt-6 mb-2.5"
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <h2 className="text-xl font-medium lowercase text-white">{project.title}</h2>
                      </motion.div>
                      <motion.div 
                        className="project-description"
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <p className="text-base text-gray-400 lowercase">{project.description}</p>
                      </motion.div>
                    </motion.div>
                  </Link>
                ))}
            </motion.div>
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

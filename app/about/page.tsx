"use client";
import Paragraph from "@/components/ui/character";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeinup = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

const fadeinmenu = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 18 },
  },
};

const data = {
  profile: {
    name: "pablo carvalho",
    role: "fullstack developer",
    contact: {
      phone: "+598 94 375 127",
      email: "pablocarvalhogimenez@gmail.com",
      github: "polcarva",
      website: "www.pablocarvalho.dev"
    },
    bio: "i am a fullstack developer with a passion for creating beautiful and functional web applications. i am a multimedia design and development graduate. my goal is to create and develop innovative and functional web applications.",
    languages: [
      { name: "español", level: "nativo" },
      { name: "inglés", level: "intermedio-alto (b2)" }
    ]
  },
  work: [
    {
      id: "work4",
      title: "mobile developer",
      stack: "react native / nextjs / gopersonal",
      company: "gopersonal",
      period: "april 2025 - today"
    },
    {
      id: "work1",
      title: "fullstack developer",
      stack: "shopify / php / wordpress",
      company: "dango digital",
      period: "july 2024 - april 2025"
    },
    {
      id: "work1",
      title: "fullstack developer",
      stack: "php / wordpress / nextjs / react",
      company: "ns group",
      period: "march 2024 - today"
    },
    {
      id: "work2",
      title: "frontend developer",
      stack: "react / tailwindcss",
      company: "real proyect - coderhouse",
      period: "march 2023 - october 2023"
    }
  ],
  studies: [
    {
      id: "edu1",
      title: "licenciatura en diseño multimedia",
      description: "especialización en creación de sitios web.",
      institution: "ort university uruguay",
      period: "2020 - today"
    },
    {
      id: "edu2",
      title: "diseñador web",
      description: "título intermedio.",
      institution: "ort university uruguay",
      period: "2020 - 2022"
    }
  ],
  courses: [
    { id: "course1", name: "react", institution: "coderhouse", year: "2023" },
    { id: "course2", name: "flutter", institution: "udemy", year: "2023" },
    { id: "course3", name: "php", institution: "udemy", year: "2023" }
  ],

  portfolio: {
    text: "puedes acceder a algunos de mis proyectos personales más recientes en mi portafolio web!",
    link: "www.pablocarvalho.dev"
  },
  menu: ["introduction", "work experience", "studies", "technical skills"],
};

export default function aboutpage() {
  return (
    <main className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0 px-2 md:px-12 py-6 md:py-20">
        {/* columna 1: perfil y menú */}
        <aside className="w-full md:w-1/3 flex flex-col items-center md:items-start sticky top-8 md:top-32 self-start md:ml-0 md:mr-8 mb-6 md:mb-0">
          <motion.div
            variants={fadeinup}
            initial="hidden"
            animate="visible"
            className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white mb-4 shadow-lg"
          >
            <Image
              width={100}
              height={100}
              src="/images/profile.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeinup}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6 text-base md:text-3xl"
          >
            <span className="text-lg">🌏 Montevideo, Uruguay</span>
          </motion.div>

          {/* menú de secciones en mobile */}
          <motion.nav
            variants={fadeinmenu}
            initial="hidden"
            animate="visible"
            className="flex md:hidden w-full justify-center mt-4"
          >
            <ul className="space-y-2 text-gray-400 text-base font-light w-full text-center">
              {data.menu.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.08, color: "#fff" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, "")}`}
                    className="hover:text-white transition"
                  >
                    — {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
          {/* menú lateral fijo solo en desktop */}
          <motion.nav
            variants={fadeinmenu}
            initial="hidden"
            animate="visible"
            className="hidden md:flex flex-col items-start md:sticky top-32 h-full w-full pr-8 mt-12"
          >
            <ul className="space-y-6 text-gray-400 text-xl font-light">
              {data.menu.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.08, color: "#fff" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, "")}`}
                    className="hover:text-white transition"
                  >
                    — {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </aside>

        {/* columna 2: contenido principal */}
        <section className="w-full md:w-2/3 flex-1 space-y-8 md:space-y-32">
          {/* header principal */}
          <motion.div
            id="introduction"
            variants={fadeinup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-14"
          >
            <div>
              <Link
                href="/about"
                className="px-8 py-4 md:px-12 my-10 md:py-6 rounded-full max-w-[calc(100vw-2rem)] md:max-w-md mx-auto md:mx-0 md:ml-auto w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider"
              >
                schedule a call
              </Link>
              <h1 className="text-2xl md:text-7xl font-extrabold mb-2 md:mb-6 mt-10 tracking-tight leading-tight">
                {data.profile.name}
              </h1>
              <h2 className="text-base md:text-4xl text-gray-400 font-light mb-2 md:mb-10">
                {data.profile.role}
              </h2>

              <p className="text-2xl md:text-4xl font-bold leading-relaxed">
                {data.profile.bio}
              </p>
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div
            id="workexperience"
            variants={fadeinup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-5xl font-bold mb-4 md:mb-14">
              work experience
            </h3>
            {data.work.map((job) => (
              <div key={`work-${job.id}-${job.company}`} className={job === data.work[0] ? "mb-4 md:mb-16" : ""}>
                <h4 className="text-lg md:text-3xl font-semibold">
                  {job.company}
                  <span className="text-gray-400 text-base md:text-2xl font-normal ml-3 text-white/80">
                    - {job.title}
                  </span>
                </h4>
                <p className="text-sm md:text-2xl text-gray">
                  {job.stack}
                </p>
                <p className="text-sm md:text-2xl text-gray">
                  {job.period}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Studies */}
          <motion.div
            id="studies"
            variants={fadeinup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-5xl font-bold mb-4 md:mb-14">
              studies
            </h3>
            {data.studies.map((study) => (
              <div key={study.id} className={study === data.studies[0] ? "mb-2 md:mb-8" : ""}>
                <h4 className="text-lg md:text-3xl font-semibold">
                  {study.title}
                </h4>
                <p className="text-sm md:text-2xl text-gray">
                  {study.description}
                </p>
                <p className="text-sm md:text-2xl text-gray">
                  {study.institution}
                </p>
                <p className="text-sm md:text-2xl text-gray">
                  {study.period}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            id="technicalskills"
            variants={fadeinup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-5xl font-bold mb-4">
              technical skills
            </h3>
            <Paragraph paragraph="my favourite stack is nextjs, tailwindcss and node with mongodb as database. i also have experience with react native, flutter and php with wordpress. i am a quick learner and i am always looking for new challenges." />

          </motion.div>

          
        </section>
      </div>
    </main>
  );
}

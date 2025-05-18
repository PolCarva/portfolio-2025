"use client";
import { motion } from "framer-motion";
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
    bio: "i am a fullstack developer with a passion for creating beautiful and functional web applications. i am a multimedia design and development graduate. my goal is to work as a web developer or mobile developer part-time.",
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
      period: "abril 2025 - presente"
    },
    {
      id: "work1",
      title: "fullstack developer",
      stack: "shopify / php / wordpress",
      company: "dango digital",
      period: "julio 2024 - abril 2025"
    },
    {
      id: "work1",
      title: "fullstack developer",
      stack: "php / wordpress / nextjs / react",
      company: "ns group",
      period: "marzo 2024 - presente"
    },
    {
      id: "work2",
      title: "frontend developer",
      stack: "react / tailwindcss",
      company: "real proyect - coderhouse",
      period: "marzo 2023 - octubre 2023"
    }
  ],
  studies: [
    {
      id: "edu1",
      title: "licenciatura en diseño multimedia",
      description: "especialización en creación de sitios web.",
      institution: "ort university uruguay",
      period: "2020 - presente"
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
  skills: {
    frontend: ["html", "css", "typescript", "react", "next", "wordpress", "figma"],
    backend: ["node", "nosql", "sql", "express", "php", "patrones de diseño (mvc)"]
  },
  others: [
    "metodología ágil: scrum",
    "control de versiones (git)",
    "search engine optimization"
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
            className="w-20 h-20 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white mb-4 md:mb-12 shadow-lg"
          >
            <img
              src="/profile.jpg"
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
            <span className="text-pink-400">🌏</span>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-xs md:text-lg text-gray-400">teléfono: {data.profile.contact.phone}</span>
              <span className="text-xs md:text-lg text-gray-400">email: {data.profile.contact.email}</span>
              <span className="text-xs md:text-lg text-gray-400">github: {data.profile.contact.github}</span>
              <span className="text-xs md:text-lg text-gray-400">web: {data.profile.contact.website}</span>
            </div>
          </motion.div>
          <motion.div
            variants={fadeinup}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-1 md:gap-4 mb-4 md:mb-14"
          >
            {data.profile.languages.map((lang) => (
              <motion.button
                key={lang.name}
                type="button"
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-3 py-1 md:px-8 md:py-3 rounded-full border border-gray-600 text-xs md:text-2xl text-gray-300 bg-transparent hover:bg-white hover:text-black transition"
              >
                {lang.name}
              </motion.button>
            ))}
            <motion.div className="flex gap-1 md:gap-4">
              <motion.a
                href={data.profile.contact.github}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-3 py-1 md:px-7 md:py-3 rounded-full border border-gray-600 text-xs md:text-2xl text-gray-300 bg-transparent hover:bg-white hover:text-black transition"
              >
                github
              </motion.a>
            </motion.div>
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
            className="hidden md:flex flex-col items-start sticky top-32 h-full w-full pr-8 mt-12"
          >
            <ul className="space-y-6 text-gray-400 text-3xl font-light">
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
                href="/curriculum"
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
              <div className="flex gap-2 md:gap-6 mb-2 md:mb-10">
                <motion.a
                  href={data.profile.contact.github}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-3 py-1 md:px-7 md:py-3 rounded-full border border-gray-600 text-xs md:text-2xl text-gray-300 bg-transparent hover:bg-white hover:text-black transition"
                >
                  github
                </motion.a>
                <motion.a
                  href={data.profile.contact.email}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-3 py-1 md:px-7 md:py-3 rounded-full border border-gray-600 text-xs md:text-2xl text-gray-300 bg-transparent hover:bg-white hover:text-black transition"
                >
                  email
                </motion.a>
              </div>
              <p className="text-sm md:text-3xl text-gray-200 max-w-full md:max-w-3xl leading-relaxed">
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
              <div key={job.id} className={job === data.work[0] ? "mb-4 md:mb-16" : ""}>
                <h4 className="text-lg md:text-3xl font-semibold">
                  {job.company}
                  <span className="text-gray-400 text-base md:text-2xl font-normal ml-3 text-white/80">
                    - {job.title}
                  </span>
                </h4>
                <p className="text-sm md:text-2xl text-gray-300">
                  {job.stack}
                </p>
                <p className="text-sm md:text-2xl text-gray-300">
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
                <p className="text-sm md:text-2xl text-gray-300">
                  {study.description}
                </p>
                <p className="text-sm md:text-2xl text-gray-300">
                  {study.institution}
                </p>
                <p className="text-sm md:text-2xl text-gray-300">
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
            <h3 className="text-xl md:text-5xl font-bold mb-4 md:mb-14">
              technical skills
            </h3>
            <ul className="flex flex-wrap gap-2 md:gap-8 text-gray-300">
              {data.skills.frontend.map((skill) => (
                <motion.li
                  key={skill}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-3 py-1 md:px-8 md:py-4 border border-gray-600 rounded-full text-xs md:text-2xl bg-transparent hover:bg-white hover:text-black transition"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2 md:gap-8 text-gray-300">
              {data.skills.backend.map((skill) => (
                <motion.li
                  key={skill}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-3 py-1 md:px-8 md:py-4 border border-gray-600 rounded-full text-xs md:text-2xl bg-transparent hover:bg-white hover:text-black transition"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

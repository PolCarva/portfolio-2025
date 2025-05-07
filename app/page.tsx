import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Line from "@/components/ui/line"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      <Hero />
      <Line />
      <About />
      <Line />
      <Projects />
      <Line />
      <Contact />
    </main>
  )
}

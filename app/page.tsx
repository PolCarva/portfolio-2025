import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Line from "@/components/ui/line"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative pb-3">
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

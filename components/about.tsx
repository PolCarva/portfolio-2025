import Link from "next/link"
import Paragraph from "./ui/character"
import Slider from "./ui/slider"
import ProfileImage from "./ui/profile-image"

export default function About() {
  return (
    <section id="about" className="min-h-screen py-16 px-8 relative">
      <div className="flex justify-between items-center py-4">
        <div className="text-sm">02/</div>
        <h2 className="text-center text-xl tracking-widest">about</h2>
        <div className="text-sm">
          <Link href="mailto:pablocarvalhogimenez@gmail.com" className="hover:underline">
            email
          </Link>{" "}
          /
          <Link href="https://instagram.com" className="hover:underline ml-2">
            instagram
          </Link>{" "}
          /
          <Link href="https://twitter.com" className="hover:underline ml-2">
            twitter
          </Link>{" "}
          /
          <Link href="https://linkedin.com" className="hover:underline ml-2">
            linkedin
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-left mt-16">
        <div className="max-w-xl mb-12">
          <Paragraph paragraph="hello, my name is pablo carvalho, i'm a multimedia designer who creates products, websites, and brands."/>
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          <ProfileImage 
            src="/placeholder.svg?height=600&width=800" 
            alt="Profile photo" 
          />
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Link
          href="#projects"
          className="rounded-full border border-white w-32 h-32 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
          <div className="text-center text-sm">
            learn
            <br />
            more
          </div>
        </Link>
      </div>

      <Slider images={[
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ]} />
    </section>
  )
}

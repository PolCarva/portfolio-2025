import Link from "next/link";
import Paragraph from "./ui/character";
import Slider from "./ui/slider";
import ProfileImage from "./ui/profile-image";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-16 relative">
      <div className="flex flex-col md:flex-row justify-between md:items-center px-8 py-4">
        <div className="text-sm self-start">02/</div>
        <h2 className="text-center text-xl tracking-widest">about</h2>
        <div className="text-sm text-center md:text-right">
          <Link
            href="mailto:pablocarvalhogimenez@gmail.com"
            className="hover:underline"
          >
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

      <div className="flex flex-col items-left mt-16 px-8 ">
        <div className="max-w-xl mb-12">
          <Paragraph paragraph="hello, my name is pablo carvalho, i'm a multimedia designer who creates products, websites, and brands." />
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          <ProfileImage
            src="/placeholder.svg?height=600&width=800"
            alt="Profile photo"
          />
        </div>
        <Link
          href="/curriculum"
          className="px-8 py-4 md:px-12 my-10 md:py-6 rounded-full max-w-[calc(100vw-2rem)] md:max-w-md mx-auto md:mx-0 md:ml-auto w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider"
        >
          view my curriculum
        </Link>
      </div>

      <Slider
        images={[
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ]}
      />
        
    </section>
  );
}

import Link from "next/link"
import RippleTitle from "./ripple-title"

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <RippleTitle />
      <h1 className="sr-only">
        pablo carvalho | full stack developer & multimedia designer
      </h1>
      <div className="absolute z-10 bottom-16 right-16 max-w-2xl flex flex-col items-start gap-8">
        <p className="text-4xl font-bold">
          i create digital experiences to solve real life problems
        </p>
        <Link
          href="#contact"
          className="px-12 py-6 rounded-full w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider"
        >
          let's work together
        </Link>
      </div>
    </section>
  )
}

import RippleTitle from "./ripple-title"
import WaterLink from "./ui/water-link"

export default function Hero() {
  return (
    <section className="relative w-full h-svh flex flex-col items-center justify-center overflow-hidden">
      <RippleTitle title="pablo carvalho" />
      <h1 className="sr-only">
        pablo carvalho | full stack developer & multimedia designer
      </h1>
      <div className="absolute z-20 bottom-16 md:right-16 max-w-2xl flex flex-col items-start gap-8">
        <p className="text-2xl px-4 md:px-0 text-center md:text-left md:text-4xl font-bold">
          i create digital experiences to solve real life problems.
        </p>
        <WaterLink
          href="#contact"
          className="px-8 py-4 md:px-12 md:py-6 rounded-full max-w-[calc(100%-2rem)] mx-auto duration-1000 md:mx-0 w-full border text-center border-white hover:text-black transition-colors text-xl font-bold tracking-wider"
        >
          let's work together
        </WaterLink>
      </div>
    </section>
  )
}

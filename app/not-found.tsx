import Link from "next/link"
import BackgroundEffect from "@/components/background-effect"
import RippleTitle from "@/components/ripple-title"
export default function NotFound() {
  return (
    <div className="flex relative min-h-screen flex-col items-center justify-center">
      <RippleTitle title="404" />
      <BackgroundEffect />
      <div className="absolute top-1/2 translate-y-[5em] flex flex-col items-center gap-4 text-center">
        <p className="text-gray-500 relative text-2xl font-bold">page not found</p>
        <Link
          href="/"
          className="px-8 py-4 md:px-12 md:py-6 rounded-full max-w-[calc(100vw-2rem)] mx-auto md:mx-0 w-full border text-center border-white hover:bg-white hover:text-black transition-colors text-xl font-bold tracking-wider"
        >
          back to home
        </Link>
      </div>
    </div>
  )
} 
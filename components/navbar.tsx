import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-light tracking-wider">
        pablo carvalho.
      </Link>
      <div className="flex items-center space-x-12">
        <Link href="#projects" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          projects
        </Link>
        <Link href="#about" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          about
        </Link>
        <Link
          href="#contact"
          className="text-sm uppercase tracking-widest border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
        >
          working @ gopersonal
        </Link>
      </div>
    </nav>
  )
}

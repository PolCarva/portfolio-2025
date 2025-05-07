import Link from "next/link"

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-16 px-8  flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-4">got a project in mind?</p>

        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16">let's connect</h2>

        <div className="flex justify-center">
          <Link
            href="mailto:email@example.com"
            className="rounded-full border border-white w-32 h-32 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <div className="text-center text-sm">
              write a<br />
              message
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

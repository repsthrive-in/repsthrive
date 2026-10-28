import { ArrowRight } from 'lucide-react'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-volt px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden="true" className="absolute -top-24 -left-24 size-80 rounded-full bg-cyan/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-20 -bottom-28 size-80 rounded-full bg-sky/30 blur-3xl" />
        <div className="relative">
          <h2 id="cta-title" className="mx-auto max-w-4xl !text-bg text-[clamp(2.6rem,8vw,6rem)]">Your Next Chapter Starts With One Rep.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-navy">Start building a clearer picture of your fitness journey.</p>
          <div className="mt-9 flex justify-center">
            <Button href="#features" variant="blue">Explore Reps Thrive <ArrowRight size={18} aria-hidden="true" /></Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

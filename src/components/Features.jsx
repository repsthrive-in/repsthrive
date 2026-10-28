import SectionHeading from './SectionHeading.jsx'
import FeatureCard from './FeatureCard.jsx'
import Reveal from './Reveal.jsx'
import { features } from '../data/features.js'

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><SectionHeading id="features-title" eyebrow="Features" title="Built to track what matters">
          These are the product areas Reps Thrive is being built around. Each is marked with its current status. Nothing here is live yet unless stated.
        </SectionHeading></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => <FeatureCard key={f.id} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  )
}

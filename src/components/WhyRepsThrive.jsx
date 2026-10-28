import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const principles = [
  ['Consistency over perfection', 'A steady habit beats a perfect week followed by a gap.'],
  ['Progress backed by records', 'What you log becomes something you can look back on.'],
  ['Better visibility into habits', 'See patterns in how you train and move.'],
  ['Recovery is part of progress', 'Training is one half of the picture. Sleep and rest are the other.'],
  ['Useful insights over confusing statistics', 'Fewer numbers, clearer meaning.'],
  ['Sustainable personal improvement', 'Progress you can keep building on.'],
]

export default function WhyRepsThrive() {
  return (
    <section aria-labelledby="why-title" className="bg-bg2 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="why-title" eyebrow="Why Reps Thrive" title="Principles we build on" />
        </Reveal>
        <ol className="border-t border-line">
          {principles.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 60} className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-b border-line py-6 transition-colors hover:bg-white/[0.02] sm:grid-cols-[5rem_1fr] sm:py-8">
              <span className="font-display text-4xl font-extrabold text-line transition-colors group-hover:text-volt sm:text-6xl" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="text-2xl sm:text-4xl">{t}</h3>
                <p className="mt-2 text-sm text-ink2 sm:text-base">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

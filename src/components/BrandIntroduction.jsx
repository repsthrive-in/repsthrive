import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const pillars = [
  ['01', 'Consistency', 'Showing up matters more than any single session.'],
  ['02', 'Records', 'Workouts, activity, weight and calories in one organised place.'],
  ['03', 'Visibility', 'Clear views of how your progress is changing.'],
  ['04', 'Recovery', 'Sleep, training load and rest, read alongside your workouts.'],
]

export default function BrandIntroduction() {
  return (
    <section aria-labelledby="intro-title" className="border-y border-line/60 bg-bg2 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionHeading id="intro-title" eyebrow="Brand introduction" title="More Than Tracking. A Smarter Way to Thrive." />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-lg leading-relaxed text-ink2">
            Reps Thrive is being developed to help people keep their fitness information organised and understand their progress. Workout records, activity, weight and calorie estimates sit side by side with sleep and training load, because training is only one part of fitness. Rest and recovery matter too.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {pillars.map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[3rem_1fr] items-baseline gap-2 py-5 sm:grid-cols-[4rem_10rem_1fr]">
                <dt className="font-display text-2xl font-extrabold text-volt">{n}</dt>
                <dt className="font-display text-xl font-bold uppercase text-ink">{t}</dt>
                <dd className="col-start-2 text-sm text-ink2 sm:col-start-auto">{d}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

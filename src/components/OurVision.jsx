import Reveal from './Reveal.jsx'

const aims = [
  'Make fitness progress easier to understand.',
  'Help people stay consistent.',
  'Make fitness records more useful.',
  'Connect workout, activity and recovery information.',
  'Support better-informed fitness decisions.',
]

export default function OurVision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative overflow-hidden bg-elite py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy/70 via-transparent to-sky/30" />
      <div aria-hidden="true" className="absolute -right-24 -bottom-24 font-display text-[22rem] leading-none font-extrabold text-white/[0.04] select-none sm:text-[34rem]">RT</div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-volt"><span aria-hidden="true" className="h-px w-8 bg-volt" />Our vision</p>
          <h2 id="vision-title" className="max-w-5xl text-[clamp(2.8rem,9vw,7rem)]">
            Fitness progress you can <span className="text-volt">actually see.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Our long-term mission is to turn scattered fitness information into a clear picture of where you are and where you are heading.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {aims.map((a, i) => (
            <Reveal as="li" key={a} delay={i * 70} className="bg-navy/80 p-6">
              <span className="font-display text-3xl font-extrabold text-volt" aria-hidden="true">0{i + 1}</span>
              <p className="mt-3 text-base font-medium text-ink">{a}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

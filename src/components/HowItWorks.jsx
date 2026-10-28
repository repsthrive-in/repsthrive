import { UserRound, Target, ClipboardList, TrendingUp } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const steps = [
  { icon: UserRound, t: 'Start your fitness profile', d: 'Set up the basics so your records have context.' },
  { icon: Target, t: 'Define your goals', d: 'Decide what progress means for you.' },
  { icon: ClipboardList, t: 'Track what matters', d: 'Log workouts, activities, sleep and other relevant fitness information.' },
  { icon: TrendingUp, t: 'Review your progress', d: 'See how your training, sleep and recovery trends are changing over time.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><SectionHeading id="how-title" eyebrow="How it works" title="Four steps from start to insight">
          This is the journey Reps Thrive is being designed around. Availability of each step depends on what has been released.
        </SectionHeading></Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden="true" className="absolute top-7 right-[12%] left-[12%] hidden h-px border-t border-dashed border-line md:block" />
          {steps.map(({ icon: Icon, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 110} className="relative flex gap-5 md:block md:text-center">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-volt/50 bg-bg text-volt md:mx-auto"><Icon size={24} aria-hidden="true" /></span>
              <div className="md:mt-6">
                <p className="font-display text-sm font-bold tracking-widest text-muted">STEP 0{i + 1}</p>
                <h3 className="mt-1 text-2xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

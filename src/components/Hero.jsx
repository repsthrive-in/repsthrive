import { ArrowRight } from 'lucide-react'
import Button from './Button.jsx'
import DashboardMockup from './DashboardMockup.jsx'

const lines = ['Every rep counts.', 'Every step matters.', 'Recovery is part of progress.']

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div aria-hidden="true" className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-elite/30 blur-[120px]" />
      <div aria-hidden="true" className="absolute top-40 -right-40 size-[28rem] rounded-full bg-sky/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-volt">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-volt" /> Your Fitness Redefined.
          </p>
          <h1 id="hero-title" className="text-[clamp(3.2rem,11vw,7.5rem)]">
            Your Fitness.<br />Your Data.<br /><span className="text-grad-accent">Your Evolution.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink2 sm:text-lg">
            Track your workouts, activity, calorie estimates and weight, then add sleep and training load to see how recovery fits into your progress.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#features">Explore the Features <ArrowRight size={18} aria-hidden="true" /></Button>
            <Button href="#recovery" variant="secondary">See Sleep &amp; Recovery</Button>
          </div>

          <ul className="mt-12 space-y-1 border-l-2 border-volt pl-5" aria-label="Brand message">
            {lines.map((l, i) => (
              <li key={l} className="line-in font-display text-[clamp(1.5rem,5vw,2.1rem)] font-bold uppercase leading-tight text-ink" style={{ animationDelay: `${600 + i * 350}ms` }}>
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2rem] grad-primary opacity-20 blur-2xl" />
          <DashboardMockup compact />
        </div>
      </div>
    </section>
  )
}

import { Users, TrendingUp, Palette, Mail } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import { emailLink } from '../config/siteConfig.js'

const items = [
  { icon: Users, t: 'Member tracking', s: 'Exploring' },
  { icon: TrendingUp, t: 'Fitness progress', s: 'Exploring' },
  { icon: Palette, t: 'Gym-branded entry experience', s: 'Planned offering' },
]

export default function GymPartnerships() {
  return (
    <section id="gyms" aria-labelledby="gym-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-navy via-bg2 to-bg2 p-6 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading id="gym-title" eyebrow="Gym partnerships" title="Better Tools for Gyms. A Better Experience for Members.">
                Reps Thrive is exploring a gym-partner model to help participating gyms offer members a fitness-tracking experience. No partnerships are announced yet. If you run a gym and would like to talk, we would like to hear from you.
              </SectionHeading>
              <div className="mt-8">
                <Button href={emailLink || '#contact'} variant="primary"><Mail size={18} aria-hidden="true" />Partner With Reps Thrive</Button>
              </div>
            </Reveal>
            <ul className="grid gap-3">
              {items.map(({ icon: Icon, t, s }, i) => (
                <Reveal as="li" key={t} delay={i * 100} className="flex items-center gap-4 rounded-2xl border border-line bg-bg/60 p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky/10 text-sky"><Icon size={22} aria-hidden="true" /></span>
                  <span className="flex-1 font-display text-xl font-bold uppercase text-ink">{t}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{s}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Check, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

const tones = {
  volt: 'text-volt bg-volt/10', sky: 'text-sky bg-sky/10', warn: 'text-warn bg-warn/10',
  teal: 'text-teal bg-teal/10', cyan: 'text-cyan bg-cyan/10', violet: 'text-violet bg-violet/10',
}

export default function FeatureCard({ feature, index, className = '' }) {
  const { icon: Icon, title, blurb, points, status, accent, link } = feature
  return (
    <Reveal as="article" delay={(index % 3) * 90} className={`group relative flex min-w-0 flex-col rounded-3xl border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-sky/60 sm:p-8 ${className}`}>
      <div className="flex items-start justify-between">
        <span className={`flex size-12 items-center justify-center rounded-2xl ${tones[accent]}`}><Icon size={24} aria-hidden="true" /></span>
        <span className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{status}</span>
      </div>
      <h3 className="mt-6 text-[1.7rem] [overflow-wrap:anywhere] sm:text-3xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink2">{blurb}</p>
      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm text-ink2"><Check size={16} className="mt-0.5 shrink-0 text-volt" aria-hidden="true" />{p}</li>
        ))}
      </ul>
      {link && (
        <a href={link.href} className="relative mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-volt hover:text-white">
          {link.label}<span className="sr-only"> for {title}</span><ArrowRight size={16} aria-hidden="true" />
        </a>
      )}
    </Reveal>
  )
}

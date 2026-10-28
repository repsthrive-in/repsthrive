import { Lightbulb, Check, X, Info, CircleAlert, CircleCheck, Eye } from 'lucide-react'
import Panel from './Panel.jsx'
import { SAFETY_NOTE } from '../data/recovery.js'

const tone = {
  caution: { text: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/40', icon: CircleAlert },
  good: { text: 'text-teal', bg: 'bg-teal/10', border: 'border-teal/40', icon: CircleCheck },
  info: { text: 'text-sky', bg: 'bg-sky/10', border: 'border-sky/40', icon: Info },
  data: { text: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/40', icon: Info },
}

const can = [
  'Show whether recorded sleep is getting shorter or longer',
  'Show how estimated training load is changing',
  'Highlight rest days and busy stretches',
  'Prompt you to check in with how you feel',
]
const cannot = [
  'Measure your actual physiological recovery',
  'Diagnose overtraining, illness or sleep disorders',
  'Know about sleep or sessions you did not record',
  'Replace how your body feels, or professional advice',
]

export function Observations({ stats }) {
  return (
    <Panel title="Recovery observations" icon={Eye} note="From the records shown">
      <ul className="space-y-2.5">
        {stats.observations.map((o, i) => {
          const t = tone[o.tone]
          const Icon = t.icon
          return (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink2">
              <Icon size={16} className={`mt-0.5 shrink-0 ${t.text}`} aria-hidden="true" />
              <span>{o.text}</span>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

export function SuggestionCard({ stats }) {
  const s = stats.suggestion
  const t = tone[s.tone]
  return (
    <section aria-labelledby="rec-suggestion" className={`rounded-2xl border ${t.border} ${t.bg} p-5`}>
      <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${t.text}`}><Lightbulb size={14} aria-hidden="true" />Suggested next step</p>
      <h3 id="rec-suggestion" className="mt-3 !font-sans !text-lg !normal-case !leading-snug !font-semibold">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink2" aria-live="polite">{s.text}{s.extra ? ` ${s.extra}` : ''}</p>
      <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-muted">{SAFETY_NOTE}</p>
    </section>
  )
}

export function Limits() {
  return (
    <Panel title="What this data can and can't tell you" icon={Info}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold text-teal">It can</p>
          <ul className="space-y-2">{can.map((c) => <li key={c} className="flex gap-2 text-[13px] leading-snug text-ink2"><Check size={15} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />{c}</li>)}</ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-err">It can't</p>
          <ul className="space-y-2">{cannot.map((c) => <li key={c} className="flex gap-2 text-[13px] leading-snug text-ink2"><X size={15} className="mt-0.5 shrink-0 text-err" aria-hidden="true" />{c}</li>)}</ul>
        </div>
      </div>
    </Panel>
  )
}

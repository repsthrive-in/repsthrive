import { useMemo, useState } from 'react'
import { Calculator, ShieldCheck } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import RecoveryTimeline from './RecoveryTimeline.jsx'
import { Observations, SuggestionCard, Limits } from './RecoveryInsights.jsx'
import { scenarios, scenarioById, analyse, SAFETY_NOTE } from '../data/recovery.js'

export default function RecoverySection() {
  const [id, setId] = useState('steady')
  const scenario = scenarioById(id)
  const stats = useMemo(() => analyse(scenario), [scenario])

  return (
    <section id="recovery" aria-labelledby="recovery-title" className="relative overflow-hidden border-y border-line/60 bg-bg2 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute -top-32 right-0 size-[30rem] rounded-full bg-violet/15 blur-[130px]" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-elite/25 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading id="recovery-title" eyebrow="Sleep & Recovery Intelligence" title="Train Hard. Recover Smarter.">
            Progress isn't built in the gym alone. Understand your sleep, monitor your training load, and use recovery trends to make more informed decisions about what comes next.
          </SectionHeading>
          <p className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wider">
            <span className="rounded-full border border-line px-3 py-1 text-muted">Planned feature</span>
            <span className="rounded-full border border-warn/40 bg-warn/10 px-3 py-1 text-warn">Concept preview · illustrative sample data</span>
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="rounded-3xl border border-line bg-bg p-3 shadow-[0_40px_120px_-30px_rgba(123,97,255,.35)] sm:p-5">
            <div className="mb-4 flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="lg:max-w-sm">
                <p className="text-sm font-semibold text-ink">Try a sample scenario</p>
                <p className="mt-0.5 text-xs text-muted">These are made-up records that show how suggestions would change. This website isn't reading anyone's data.</p>
              </div>
              <div role="group" aria-label="Sample scenario" className="flex flex-wrap gap-2">
                {scenarios.map((s) => (
                  <button key={s.id} type="button" aria-pressed={id === s.id} onClick={() => setId(s.id)}
                    className={`min-h-11 rounded-xl border px-3.5 text-[13px] font-medium transition-colors ${id === s.id ? 'border-volt bg-volt text-bg' : 'border-line text-ink2 hover:border-sky hover:text-ink'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-12">
              <div className="lg:col-span-7"><RecoveryTimeline scenario={scenario} stats={stats} /></div>
              <div className="grid content-start gap-3 lg:col-span-5">
                <SuggestionCard stats={stats} />
                <Observations stats={stats} />
              </div>
              <div className="lg:col-span-12"><Limits /></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-sans !text-base !normal-case !leading-snug !font-semibold"><Calculator size={18} className="text-sky" aria-hidden="true" />How training load is estimated</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink2">
              Estimated session load = session minutes × your reported effort (1–10). A 50-minute session at effort 7 is 350 units. Reps Thrive would compare the last 7 days with the 7 before to spot busier or lighter stretches.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              It's a simple estimate, not a validated measure of physiological strain. Sets, reps and weights add context but can't capture strain on their own. Suggestions in this preview use basic rules on these sample records, not a scientific model.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-sans !text-base !normal-case !leading-snug !font-semibold"><ShieldCheck size={18} className="text-teal" aria-hidden="true" />Manual entries and imported data</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink2">
              Sleep you log yourself would always be labelled as a manual entry. Every record above is one. Wearable or health-platform imports are not built, and if they are added later they will be labelled separately.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{SAFETY_NOTE} Never train through pain, severe fatigue or illness.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

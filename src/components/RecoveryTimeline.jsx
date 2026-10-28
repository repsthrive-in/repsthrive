import { Moon, Gauge } from 'lucide-react'
import Panel from './Panel.jsx'
import { DAY_LETTERS, DAY_NAMES, sleepMinutes, sessionLoad, effortBand, hm } from '../data/recovery.js'

const COLS = { gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }
const SLEEP_MAX = 9 // hours, fixed axis so scenarios are comparable
const LOAD_MAX = 600 // load units, fixed axis
const bandClass = { light: 'bg-teal/80', moderate: 'bg-sky', high: 'bg-volt' }
const bandLabel = { light: 'Effort 1–4', moderate: 'Effort 5–7', high: 'Effort 8–10' }

function Track({ label, unit, ticks, max, height = 'h-36', children, avgLine }) {
  return (
    <div className="grid grid-cols-[2.25rem_1fr] gap-x-2 sm:grid-cols-[2.75rem_1fr]">
      <p className="sr-only">{label}</p>
      <div className={`relative ${height}`} aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} className="absolute right-0 translate-y-1/2 text-[11px] leading-none text-muted" style={{ bottom: `${(t / max) * 100}%` }}>{t}{unit}</span>
        ))}
      </div>
      <div className={`relative ${height}`} aria-hidden="true">
        {ticks.map((t) => <span key={t} className="absolute inset-x-0 border-t border-dashed border-line/70" style={{ bottom: `${(t / max) * 100}%` }} />)}
        {avgLine}
        <div className="absolute inset-0 grid gap-1 sm:gap-1.5" style={COLS}>{children}</div>
      </div>
    </div>
  )
}

export default function RecoveryTimeline({ scenario, stats }) {
  const { sleep, sessions, nap } = scenario
  const last = sleep[13]
  const avgAll = stats.hours.filter((v) => v != null)
  const avg14 = avgAll.length ? avgAll.reduce((a, b) => a + b, 0) / avgAll.length : null

  return (
    <Panel title="Last 14 days" icon={Moon} note="Illustrative sample" className="!p-4 sm:!p-6">
      {/* latest record */}
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line bg-bg2/70 px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-2.5 py-1 text-[11px] font-semibold text-violet">Manual entry</span>
        {last ? (
          <p className="text-ink2">
            <span className="text-ink">Last night:</span> {last.bed} to {last.wake} · {hm(sleepMinutes(last) / 60)}
            {last.q ? <span className="text-muted"> · quality {last.q}/5 (optional, self-reported)</span> : <span className="text-muted"> · no quality rating</span>}
          </p>
        ) : <p className="text-muted">No sleep record for last night.</p>}
      </div>

      {/* week labels */}
      <div className="grid grid-cols-[2.25rem_1fr] gap-x-2 sm:grid-cols-[2.75rem_1fr]" aria-hidden="true">
        <span />
        <div className="mb-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-muted">
          <span className="border-b border-line pb-1">Previous 7 days</span>
          <span className="border-b border-volt/70 pb-1 text-ink2">Last 7 days</span>
        </div>
      </div>

      {/* sleep track */}
      <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-ink" aria-hidden="true"><Moon size={14} className="text-violet" />Sleep duration</p>
      <Track label="Sleep duration" unit="h" ticks={[3, 6, 9]} max={SLEEP_MAX}
        avgLine={avg14 != null && <span className="absolute inset-x-0 z-10 border-t-2 border-dashed border-cyan/80" style={{ bottom: `${(avg14 / SLEEP_MAX) * 100}%` }} />}>
        {sleep.map((r, i) => (
          <div key={i} className="relative flex items-end justify-center">
            {r ? (
              <div className={`w-full max-w-6 rounded-t-md bg-gradient-to-t from-violet to-sky transition-[height] duration-500 ${i === 13 ? 'ring-1 ring-ink/70' : ''}`} style={{ height: `${(sleepMinutes(r) / 60 / SLEEP_MAX) * 100}%` }} />
            ) : (
              <div className="h-4 w-full max-w-6 rounded-t-md border border-dashed border-line" />
            )}
            {nap[i] && <span className="absolute top-0 size-2 rounded-full bg-cyan" />}
          </div>
        ))}
      </Track>

      {/* load track */}
      <p className="mb-1.5 mt-6 flex items-center gap-2 text-xs font-semibold text-ink" aria-hidden="true"><Gauge size={14} className="text-sky" />Estimated training load</p>
      <Track label="Estimated training load" unit="" ticks={[200, 400]} max={LOAD_MAX} height="h-28">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-end justify-center">
            {s ? <div className={`w-full max-w-6 rounded-t-md transition-[height] duration-500 ${bandClass[effortBand(s.rpe)]}`} style={{ height: `${Math.min(sessionLoad(s) / LOAD_MAX, 1) * 100}%` }} /> : <div className="h-px w-full max-w-6 bg-line" />}
          </div>
        ))}
      </Track>

      {/* rest strip + day axis */}
      <div className="mt-3 grid grid-cols-[2.25rem_1fr] gap-x-2 sm:grid-cols-[2.75rem_1fr]" aria-hidden="true">
        <span className="self-center text-right text-[11px] text-muted">Day</span>
        <div className="relative">
          <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-line/80" />
          <div className="grid gap-1 sm:gap-1.5" style={COLS}>
            {sessions.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className={`size-3 rounded-full ${s ? 'bg-ink2' : 'border border-ink2/60'}`} />
                <span className={`text-[11px] font-medium ${i === 13 ? 'text-volt' : 'text-muted'}`}>{DAY_LETTERS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* legend */}
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[11px] text-ink2" aria-label="Chart legend">
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-3 rounded-sm bg-gradient-to-t from-violet to-sky" />Sleep (manual entry)</li>
        <li className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-cyan" />{avg14 ? `14-night average, ${hm(avg14)}` : '14-night average'}</li>
        <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-cyan" />Nap (kept separate)</li>
        {Object.keys(bandClass).map((b) => <li key={b} className="flex items-center gap-1.5"><span className={`size-2.5 rounded-sm ${bandClass[b]}`} />Load, {bandLabel[b].toLowerCase()}</li>)}
        <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border border-ink2/60" />Rest day (no session)</li>
        <li className="flex items-center gap-1.5"><span className="h-2.5 w-3 rounded-sm border border-dashed border-line" />No sleep record</li>
      </ul>

      {/* accessible data table */}
      <table className="sr-only">
        <caption>Illustrative 14-day sleep and training records for the {scenario.label} sample</caption>
        <thead><tr><th>Day</th><th>Sleep</th><th>Session</th><th>Estimated load</th></tr></thead>
        <tbody>
          {sleep.map((r, i) => (
            <tr key={i}>
              <td>{DAY_NAMES[i]}, day {i + 1}</td>
              <td>{r ? `${r.bed} to ${r.wake}, ${hm(sleepMinutes(r) / 60)}, manual entry${nap[i] ? `, plus ${nap[i]} minute nap` : ''}` : 'No record'}</td>
              <td>{sessions[i] ? `${sessions[i].type}, ${sessions[i].min} minutes, effort ${sessions[i].rpe}` : 'Rest day'}</td>
              <td>{sessionLoad(sessions[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}

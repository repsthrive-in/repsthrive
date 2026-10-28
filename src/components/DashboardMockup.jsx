import { Flame, Dumbbell, Activity, TrendingDown, Check, Moon, Gauge, Lightbulb } from 'lucide-react'
import Panel from './Panel.jsx'
import { scenarioById, analyse, sessionLoad, effortBand, hm, DAY_LETTERS, DAY_NAMES } from '../data/recovery.js'

// Everything below comes from the same illustrative sample as the recovery section.
const sample = scenarioById('steady')
const stats = analyse(sample)
const lastWeek = sample.sessions.slice(7)
const week = lastWeek.map((x, i) => ({ d: DAY_LETTERS[i + 7], v: x ? Math.round((x.min / 60) * 100) : 0, today: i === 6 }))
const activeMinutes = lastWeek.reduce((a, x) => a + (x ? x.min : 0), 0)
const workoutsThisWeek = lastWeek.filter((x) => x && x.type !== 'Walk').length
const consistency = Math.round((stats.activeDays / 7) * 100)
const weights = [82.4, 82.1, 82.3, 81.7, 81.5, 81.2, 80.9]
const today = [
  { n: 'Barbell Squat', s: '4 × 8', w: '80 kg', done: true },
  { n: 'Bench Press', s: '4 × 8', w: '60 kg', done: true },
  { n: 'Bent-over Row', s: '3 × 10', w: '50 kg', done: false },
  { n: 'Plank', s: '3 × 45 s', w: '', done: false },
]
const history = sample.sessions
  .map((x, i) => (x ? { ...x, t: DAY_NAMES[i], i } : null))
  .filter((x) => x && x.i >= 7)
  .slice(-3)
  .reverse()

function WeeklyBars() {
  return (
    <div role="img" aria-label="Bar chart of illustrative active minutes per day for the last 7 days" className="flex h-28 items-end gap-2">
      {week.map((b, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div
              className={`bar-grow w-full rounded-t-md ${b.today ? 'bg-volt' : 'grad-primary'}`}
              style={{ height: `${Math.max(b.v, 4)}%`, animationDelay: `${i * 80 + 200}ms` }}
            />
          </div>
          <span className={`text-[10px] font-medium ${b.today ? 'text-volt' : 'text-muted'}`}>{b.d}</span>
        </div>
      ))}
    </div>
  )
}

function WeightTrend() {
  const min = 80.5, max = 82.6, W = 280, H = 90
  const pts = weights.map((v, i) => [(i / (weights.length - 1)) * W, 8 + ((max - v) / (max - min)) * (H - 16)])
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  return (
    <div>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-extrabold text-ink">80.9<span className="ml-1 text-base text-muted">kg</span></span>
        <span className="flex items-center gap-1 text-xs font-semibold text-teal"><TrendingDown size={13} aria-hidden="true" />−1.5 kg in 7 days</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full" role="img" aria-label="Line chart of an illustrative downward weight trend" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2DA1FF" stopOpacity=".35" /><stop offset="1" stopColor="#2DA1FF" stopOpacity="0" /></linearGradient>
          <linearGradient id="wline" x1="0" x2="1"><stop offset="0" stopColor="#2DA1FF" /><stop offset="1" stopColor="#00E5FF" /></linearGradient>
        </defs>
        {[20, 45, 70].map((y) => <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="#334155" strokeWidth=".6" strokeDasharray="3 4" />)}
        <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#wfill)" />
        <path d={line} pathLength="1" className="draw" fill="none" stroke="url(#wline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx={last[0] - 3} cy={last[1]} r="4" fill="#D1FF42" />
      </svg>
    </div>
  )
}

function CalorieRing() {
  const C = 2 * Math.PI * 42
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="size-24 shrink-0 -rotate-90" role="img" aria-label="Ring showing 72 percent of an illustrative daily calorie estimate target">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="10" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ring)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${C * 0.72} ${C}`} />
        <defs><linearGradient id="ring" x1="0" x2="1"><stop offset="0" stopColor="#D1FF42" /><stop offset="1" stopColor="#00E5FF" /></linearGradient></defs>
      </svg>
      <div>
        <p className="font-display text-3xl font-extrabold leading-none text-ink">360 <span className="text-sm font-semibold text-muted">kcal est.</span></p>
        <p className="mt-1 text-xs text-muted">Estimated burned today. Estimates are not exact.</p>
      </div>
    </div>
  )
}

function MiniBars({ values, labels, max, color, label }) {
  return (
    <div role="img" aria-label={label} className="flex h-24 items-end gap-1.5">
      {values.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div className={`w-full rounded-t-md ${typeof color === 'function' ? color(i) : color}`} style={{ height: `${Math.max(Math.min(v / max, 1) * 100, v ? 4 : 1.5)}%` }} />
          </div>
          <span className="text-[10px] font-medium text-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

const loadTone = { light: 'bg-teal/80', moderate: 'bg-sky', high: 'bg-volt' }

function SleepMini() {
  const hours = stats.hours.slice(7).map((h) => h ?? 0)
  return (
    <>
      <p className="mb-2 font-display text-3xl font-extrabold leading-none text-ink">{hm(stats.recentAvg).replace(' min', 'm').replace(' h ', 'h ')}<span className="ml-1.5 font-sans text-xs font-medium text-muted">avg, manual entries</span></p>
      <MiniBars values={hours} labels={DAY_LETTERS.slice(7)} max={10} color="bg-gradient-to-t from-violet to-sky" label="Bar chart of illustrative sleep duration for the last 7 nights" />
    </>
  )
}

function LoadMini() {
  const loads = sample.sessions.slice(7)
  return (
    <>
      <p className="mb-2 font-display text-3xl font-extrabold leading-none text-ink">{stats.recentLoad.toLocaleString('en-IN')}<span className="ml-1.5 font-sans text-xs font-medium text-muted">units, estimated</span></p>
      <MiniBars values={loads.map(sessionLoad)} labels={DAY_LETTERS.slice(7)} max={600} color={(i) => (loads[i] ? loadTone[effortBand(loads[i].rpe)] : 'bg-line')} label="Bar chart of illustrative estimated training load for the last 7 days" />
    </>
  )
}

function RecoveryNote({ className = '' }) {
  const s = stats.suggestion
  return (
    <section aria-label="Recovery observation" className={`rounded-2xl border border-teal/40 bg-teal/10 p-4 sm:p-5 ${className}`}>
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal"><Lightbulb size={14} aria-hidden="true" />Recovery observation</p>
      <p className="mt-2 text-sm leading-relaxed text-ink2">{s.text}</p>
      <p className="mt-2 text-[11px] text-muted">Illustrative. General fitness guidance, not medical advice. <a href="#recovery" className="font-semibold text-volt hover:text-white">See how it works</a></p>
    </section>
  )
}

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-xl border border-line bg-bg2/70 p-3">
      <Icon size={16} className={tone} aria-hidden="true" />
      <p className="mt-2 font-display text-2xl font-extrabold leading-none text-ink">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{label}</p>
    </div>
  )
}

export default function DashboardMockup({ compact = false, className = '' }) {
  return (
    <div className={`rounded-3xl border border-line bg-bg2 p-3 shadow-[0_40px_120px_-30px_rgba(2,81,176,.6)] sm:p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-volt" />
        </div>
        <p className="rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-warn">Illustrative sample data</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Dumbbell} label="Workouts this week" value={String(workoutsThisWeek)} tone="text-volt" />
        <Stat icon={Activity} label="Active minutes" value={String(activeMinutes)} tone="text-sky" />
        <Stat icon={Flame} label="Est. kcal this week" value="1,860" tone="text-warn" />
        <Stat icon={Moon} label="Avg sleep, 7 nights" value={hm(stats.recentAvg).replace(' min', 'm').replace(' h ', 'h ')} tone="text-violet" />
      </div>

      <div className={`mt-3 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'lg:grid-cols-3'}`}>
        <Panel title="Weekly activity" icon={Activity} note="minutes"><WeeklyBars /></Panel>
        <Panel title="Weight trend" icon={TrendingDown}><WeightTrend /></Panel>
        {!compact && <Panel title="Calorie estimate" icon={Flame}><CalorieRing /></Panel>}
      </div>

      {compact ? (
        <RecoveryNote className="mt-3" />
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <Panel title="Sleep" icon={Moon} note="last 7 nights"><SleepMini /></Panel>
          <Panel title="Training load" icon={Gauge} note="last 7 days"><LoadMini /></Panel>
          <RecoveryNote className="md:col-span-2 lg:col-span-1" />
        </div>
      )}

      {!compact && (
        <div className="mt-3 grid gap-3 lg:grid-cols-5">
          <Panel title="Sample workout log" icon={Dumbbell} className="lg:col-span-3" note="Strength session">
            <ul className="divide-y divide-line/70">
              {today.map((e) => (
                <li key={e.n} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${e.done ? 'bg-volt text-bg' : 'border border-line text-transparent'}`}><Check size={14} aria-hidden="true" /></span>
                  <span className={`flex-1 ${e.done ? 'text-ink' : 'text-ink2'}`}>{e.n}</span>
                  <span className="text-muted">{e.s}</span>
                  <span className="w-14 text-right font-medium text-ink2">{e.w}</span>
                  <span className="sr-only">{e.done ? 'Completed' : 'Not completed'}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <div className="grid gap-3 lg:col-span-2">
            <Panel title="Recent sessions" icon={Activity} note="duration · effort">
              <ul className="space-y-2">
                {history.map((h) => (
                  <li key={h.i} className="flex items-center justify-between gap-3 text-sm"><span className="text-ink">{h.type}</span><span className="text-muted">{h.t} · {h.min} min · {h.rpe}/10</span></li>
                ))}
              </ul>
            </Panel>
            <Panel title="Progress" icon={Check}>
              {[['Active days, last 7', consistency, 'bg-volt'], ['Goal progress', 55, 'bg-sky']].map(([l, v, c]) => (
                <div key={l} className="mb-2 last:mb-0">
                  <div className="mb-1 flex justify-between text-xs"><span className="text-ink2">{l}</span><span className="text-muted">{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-elevated" role="progressbar" aria-label={l} aria-valuenow={v} aria-valuemin="0" aria-valuemax="100"><div className={`h-full rounded-full ${c}`} style={{ width: `${v}%` }} /></div>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      )}
    </div>
  )
}

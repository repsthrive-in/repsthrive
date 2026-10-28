// Illustrative sample records + the simple rules that turn them into observations.
// Nothing here is real user data. The rules are deliberately basic (7-day vs previous 7-day comparisons)
// and are not a validated scientific model. Thresholds below are illustrative, not clinical.

export const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S']
export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Illustrative thresholds used by analyse()
const MIN_RECENT_NIGHTS = 4 // need at least this many recorded nights (of 7) to say anything about sleep
const SLEEP_CHANGE_H = 0.5 // hours of difference before a sleep trend is mentioned
const LOAD_JUMP = 1.25 // recent load at least 25% above the previous 7 days
const HARD_EFFORT = 8 // reported effort at or above this counts as a demanding session

const S = (bed, wake, q = null) => ({ bed, wake, q, source: 'manual' })
const W = (type, min, rpe) => ({ type, min, rpe })

export const scenarios = [
  {
    id: 'steady',
    label: 'Steady week',
    sleep: [
      S('23:10', '06:40', 4), S('23:20', '06:30'), S('23:00', '06:30', 3), S('23:30', '06:40'), S('23:40', '06:50'), S('00:20', '07:40'), S('00:00', '07:30'),
      S('23:10', '06:30'), S('23:20', '06:30'), S('23:00', '06:30', 4), S('23:25', '06:40'), S('23:35', '06:45'), S('00:15', '07:30'), S('23:50', '07:10', 3),
    ],
    nap: { 12: 25 },
    sessions: [
      W('Strength', 55, 6), null, W('Strength', 50, 7), W('Walk', 35, 3), W('Strength', 60, 7), W('Cardio', 40, 6), null,
      W('Strength', 55, 6), W('Walk', 30, 3), W('Strength', 50, 7), null, W('Strength', 60, 7), W('Cardio', 40, 6), null,
    ],
    selfReport: null,
  },
  {
    id: 'tired',
    label: 'Short sleep, busy week',
    sleep: [
      S('23:10', '06:20'), S('23:00', '06:15'), S('23:20', '06:30'), S('23:15', '06:30'), S('23:30', '06:40'), S('00:00', '07:15'), S('23:40', '06:50'),
      S('00:20', '06:10', 2), S('00:45', '06:30'), S('00:10', '06:10'), S('00:35', '06:20', 2), S('01:00', '06:45'), S('00:50', '07:00'), S('00:30', '06:15', 2),
    ],
    nap: { 11: 20 },
    sessions: [
      W('Strength', 50, 6), null, W('Strength', 55, 7), null, W('Strength', 50, 6), W('Walk', 40, 3), null,
      W('Strength', 60, 7), W('Cardio', 40, 7), W('Strength', 60, 8), null, W('Strength', 60, 8), W('Cardio', 45, 7), null,
    ],
    selfReport: { fatigue: 'high' },
  },
  {
    id: 'improving',
    label: 'Sleep improving',
    sleep: [
      S('00:30', '06:45'), S('00:45', '06:50'), S('00:20', '06:40'), S('01:00', '07:15'), S('00:40', '06:50'), S('01:15', '08:00'), S('00:30', '07:00'),
      S('23:30', '06:45'), S('23:15', '06:30'), S('23:40', '07:00', 4), S('23:20', '06:30'), S('23:30', '06:45'), S('00:10', '07:30'), S('23:40', '07:00', 4),
    ],
    nap: {},
    sessions: [
      W('Strength', 45, 6), null, W('Cardio', 40, 6), null, W('Strength', 50, 7), W('Walk', 45, 3), null,
      W('Strength', 50, 6), null, W('Cardio', 40, 6), W('Walk', 30, 3), W('Strength', 55, 7), null, null,
    ],
    selfReport: null,
  },
  {
    id: 'sparse',
    label: 'Few sleep records',
    sleep: [
      S('23:30', '07:00'), null, S('00:00', '07:20'), S('23:45', '07:00'), null, S('00:30', '08:00'), null,
      null, null, S('23:50', '06:50'), null, S('00:10', '07:00'), null, S('23:40', '06:50'),
    ],
    nap: {},
    sessions: [
      W('Strength', 50, 6), null, W('Cardio', 40, 6), null, W('Strength', 50, 7), null, null,
      W('Strength', 50, 6), null, W('Cardio', 40, 6), null, W('Strength', 50, 7), W('Walk', 30, 3), null,
    ],
    selfReport: null,
  },
]

export const scenarioById = (id) => scenarios.find((s) => s.id === id) ?? scenarios[0]

// ---- helpers --------------------------------------------------------------
const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const sleepMinutes = (r) => ((toMin(r.wake) - toMin(r.bed)) + 1440) % 1440
export const sessionLoad = (s) => (s ? s.min * s.rpe : 0)
export const effortBand = (rpe) => (rpe <= 4 ? 'light' : rpe <= 7 ? 'moderate' : 'high')
export const hm = (hours) => { const t = Math.round(hours * 60); return `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, '0')} min` }
const fmtClock = (m) => { const x = ((m % 1440) + 1440) % 1440; return `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}` }
const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length
const sum = (a) => a.reduce((x, y) => x + y, 0)

// ---- analysis -------------------------------------------------------------
export function analyse(sc) {
  const hours = sc.sleep.map((r) => (r ? sleepMinutes(r) / 60 : null))
  const recent = hours.slice(7).filter((v) => v != null)
  const prev = hours.slice(0, 7).filter((v) => v != null)
  const recentAvg = recent.length ? avg(recent) : null
  const prevAvg = prev.length ? avg(prev) : null
  const canCompareSleep = recent.length >= MIN_RECENT_NIGHTS && prev.length >= MIN_RECENT_NIGHTS
  const diff = canCompareSleep ? recentAvg - prevAvg : null

  // bedtimes after midnight sort after evening ones
  const beds = sc.sleep.slice(7).filter(Boolean).map((r) => { const m = toMin(r.bed); return m < 720 ? m + 1440 : m })
  const bedRange = beds.length >= MIN_RECENT_NIGHTS ? [fmtClock(Math.min(...beds)), fmtClock(Math.max(...beds))] : null

  const loads = sc.sessions.map(sessionLoad)
  const recentLoad = sum(loads.slice(7))
  const prevLoad = sum(loads.slice(0, 7))
  const ratio = prevLoad > 0 ? recentLoad / prevLoad : null
  const recentSessions = sc.sessions.slice(7)
  const hard = recentSessions.filter((s) => s && s.rpe >= HARD_EFFORT).length
  const restDays = recentSessions.filter((s) => !s).length
  const activeDays = 7 - restDays

  const sleepShort = diff != null && diff <= -SLEEP_CHANGE_H
  const sleepUp = diff != null && diff >= SLEEP_CHANGE_H
  const demanding = hard >= 3 || (ratio != null && ratio >= LOAD_JUMP) || restDays <= 1
  const fatigueHigh = sc.selfReport?.fatigue === 'high'

  const observations = []
  if (recent.length < MIN_RECENT_NIGHTS) {
    observations.push({ tone: 'data', text: `Sleep: ${recent.length} of the last 7 nights recorded. That is too few to show a trend.` })
  } else {
    const cmp = diff == null ? 'Not enough earlier records to compare.' : Math.abs(diff) < SLEEP_CHANGE_H ? 'Close to the previous 7 nights.' : `${hm(Math.abs(diff))} ${diff < 0 ? 'shorter' : 'longer'} than the previous 7 nights.`
    observations.push({ tone: sleepShort ? 'caution' : sleepUp ? 'good' : 'info', text: `Sleep: ${hm(recentAvg)} average across ${recent.length} recorded nights. ${cmp}` })
    if (bedRange) observations.push({ tone: 'info', text: `Bedtimes ranged from ${bedRange[0]} to ${bedRange[1]} over the last 7 nights.` })
  }
  observations.push({
    tone: demanding ? 'caution' : 'info',
    text: ratio == null
      ? `Estimated training load: ${recentLoad.toLocaleString('en-IN')} units in the last 7 days. No earlier week to compare.`
      : `Estimated training load: ${recentLoad.toLocaleString('en-IN')} units in the last 7 days, versus ${prevLoad.toLocaleString('en-IN')} in the 7 days before.`,
  })
  observations.push({ tone: 'info', text: `${restDays} ${restDays === 1 ? 'day' : 'days'} with no session recorded in the last 7${hard ? `; ${hard} reported at effort ${HARD_EFFORT} or higher` : ''}.` })
  if (fatigueHigh) observations.push({ tone: 'caution', text: 'You noted high fatigue today (optional self-report).' })

  let suggestion
  if (recent.length < MIN_RECENT_NIGHTS) {
    suggestion = { tone: 'data', title: 'Not enough sleep data yet', text: "There isn't enough recent sleep data to give a meaningful recovery summary. Add a few records to establish your baseline." }
  } else if (sleepShort && demanding) {
    suggestion = { tone: 'caution', title: 'Sleep and training both stand out', text: "Your sleep has been shorter than your recent average, and you've recorded several demanding sessions. Consider prioritising sleep tonight, and a lighter session or a rest day if you feel fatigued." }
  } else if (sleepShort) {
    suggestion = { tone: 'caution', title: 'Sleep has been shorter', text: 'Your sleep has been shorter than your recent average. Consider prioritising sleep tonight.' }
  } else if (demanding) {
    suggestion = { tone: 'caution', title: 'A demanding stretch', text: "You've recorded several demanding sessions recently. Consider a lighter session or a rest day if you feel fatigued." }
  } else if (sleepUp) {
    suggestion = { tone: 'good', title: 'Sleep is trending up', text: 'Your sleep duration has improved compared with your recent records. Continue monitoring the trend.' }
  } else {
    suggestion = { tone: 'good', title: 'A consistent week', text: 'Your training has been consistent this week. Keep monitoring how you feel and allow time for recovery.' }
  }
  if (fatigueHigh && suggestion.tone === 'caution') suggestion.extra = 'Because you also noted high fatigue, a lighter day or rest is worth considering.'

  return { hours, recentAvg, prevAvg, recentCount: recent.length, loads, recentLoad, prevLoad, ratio, restDays, activeDays, hard, observations, suggestion }
}

export const SAFETY_NOTE = 'General fitness guidance, not medical advice. If you have pain, severe fatigue or feel unwell, rest and speak to a qualified professional.'

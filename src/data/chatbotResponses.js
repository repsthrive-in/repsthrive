// Rule-based intents for the Reps assistant. Keywords match whole words/phrases (plural tolerant) against the lowercased message.
// Keep answers consistent with the FAQ and features data: describe planned features as planned.
// Reps has no access to anyone's records and never analyses personal data.

export const AVAILABILITY_NOTE = 'Reps Thrive is still being developed, so features are described as planned unless stated otherwise.'
const SAFETY = 'This is general fitness information, not medical advice.'

export const intents = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    exact: true,
    answer: "Hi, I'm Reps. I can tell you what Reps Thrive is, what it aims to track, how sleep and recovery fit in, and how gyms can get in touch.",
  },
  {
    id: 'safety',
    keywords: ['pain', 'injury', 'injured', 'hurt', 'diagnose', 'diagnosis', 'doctor', 'insomnia', 'sleep disorder', 'overtraining', 'overtrained', 'sick', 'ill', 'illness', 'medical', 'symptom', 'symptoms', 'medication'],
    answer: "I can't give medical advice or diagnose anything, and Reps Thrive isn't designed to. If you have pain, severe fatigue, illness or sleep problems, please rest and speak to a qualified healthcare professional rather than training through it.",
  },
  {
    id: 'mydata',
    keywords: ['my records', 'my sleep data', 'analyse my', 'analyze my', 'my workouts', 'check my', 'my score', 'my readiness'],
    answer: "I can't see or analyse anyone's personal records. This website isn't connected to user data, and I'm a simple rule-based assistant. The dashboards here use illustrative sample data to show the concept.",
    action: 'recovery',
  },
  {
    id: 'rest',
    keywords: ['when to rest', 'rest day', 'rest days', 'should i rest', 'take a day off', 'tell me when', 'rest'],
    answer: "Reps Thrive isn't designed to tell you definitively when to rest. The plan is to point out patterns in your recorded sleep, training load and rest days, such as shorter sleep or several demanding sessions, and suggest you consider a lighter day. How you feel matters most. " + SAFETY,
    action: 'recovery',
  },
  {
    id: 'recoveryHow',
    keywords: ['recovery suggestion', 'recovery suggestions', 'recovery insight', 'recovery insights', 'recovery', 'recover', 'suggestions work', 'readiness', 'fatigue', 'soreness'],
    answer: "The plan is to read your recorded sleep, estimated training load, rest days and optional fatigue or soreness notes together, then offer cautious, general suggestions. What you see depends on the data you've recorded, and if there isn't enough, it says so. It can't measure real physiological recovery or diagnose anything. " + SAFETY + ' Recovery features are planned, not live.',
    action: 'recovery',
  },
  {
    id: 'patterns',
    keywords: ['sleep and training', 'sleep and workouts', 'patterns', 'inform', 'general fitness suggestions', 'combine'],
    answer: "Sleep and training patterns could inform general suggestions, for example: sleep shorter than your recent average, or several demanding sessions in a row, might prompt a note to consider more sleep or a lighter day. These would be cautious prompts based only on what you've recorded, not conclusions about your body. " + SAFETY,
    action: 'recovery',
  },
  {
    id: 'load',
    keywords: ['training load', 'load', 'workload', 'effort', 'rpe', 'exertion', 'strain'],
    answer: "Training load describes how demanding your recent training has been. Reps Thrive plans to estimate session load as workout duration multiplied by your reported effort (1 to 10), then compare recent days with earlier ones. It's an estimate for spotting trends, not a validated measure of physiological strain, and sets, reps and weights alone can't capture strain either. Planned, not live.",
    action: 'recovery',
  },
  {
    id: 'sleep',
    keywords: ['sleep', 'sleeping', 'track my sleep', 'sleep tracking', 'bedtime', 'nap', 'naps', 'wake up', 'wearable', 'wearables', 'smartwatch', 'apple watch', 'fitbit', 'garmin'],
    answer: "Sleep tracking is planned. You would record bedtime, wake-up time and total sleep, optionally rate quality, and log naps separately, then review consistency and weekly trends. Entries you log yourself would be labelled as manual. No wearable or health-platform import has been built, and any future imports would be labelled separately. Not available yet.",
    action: 'recovery',
  },
  {
    id: 'how',
    keywords: ['how does reps thrive work', 'how does it work', 'how it works', 'how do you work', 'how does reps work', 'get started', 'steps'],
    answer: "Reps Thrive is designed around four steps: set up a fitness profile, define your goals, track workouts, activity, sleep and other fitness information, then review progress and recovery trends over time. " + AVAILABILITY_NOTE,
    action: 'features',
  },
  {
    id: 'what',
    keywords: ['what is reps', 'what is reps thrive', 'about', 'purpose', 'who are you', 'what do you do'],
    answer: "Reps Thrive is a fitness-tracking platform being developed to bring workout records, activity, calorie estimates, weight progress, sleep and training load together, so you can see your progress and recovery clearly. Your Fitness Redefined.",
  },
  {
    id: 'track',
    keywords: ['what can i track', 'track', 'tracking', 'features', 'record'],
    answer: 'The planned areas are workouts (exercises, sets, reps, weight), activities such as walking, calorie estimates, weight with BMI, sleep, training load and recovery insights, plus progress analytics that summarise it all. ' + AVAILABILITY_NOTE,
    action: 'features',
  },
  {
    id: 'workout',
    keywords: ['workout', 'exercise', 'sets', 'reps', 'gym session', 'lifting'],
    answer: 'Workout tracking is planned to cover exercise records, sets and repetitions, weights, workout history and training consistency. Those records would also feed the training-load estimate.',
  },
  {
    id: 'activity',
    keywords: ['activity', 'walking', 'walk', 'steps', 'distance', 'run'],
    answer: 'Activity tracking is planned for supported activities such as walking, with history, duration and distance where supported, and summaries.',
  },
  {
    id: 'calorie',
    keywords: ['calorie tracking', 'calorie', 'calories', 'kcal', 'burn', 'food'],
    answer: 'Calories burned during supported exercises and activities would be shown as estimates, not exact measurements, so treat them as a rough guide. Food calorie tracking will be offered only if it is implemented. Calorie history is also planned.',
  },
  {
    id: 'weight',
    keywords: ['weight', 'bmi', 'height', 'body'],
    answer: 'You would record your height and body weight, see a calculated BMI, and follow weight history and trends. BMI is a screening metric, not a diagnosis.',
  },
  {
    id: 'guidance',
    keywords: ['guidance', 'personalised', 'personalized', 'coach', 'ai', 'recommend', 'plan for me'],
    answer: "Personalised guidance is a future direction, not a current feature. It may draw on profile information, goals and workout, sleep and recovery records, and it will not be medical advice. Also, I'm a simple rule-based assistant, not a live AI model.",
  },
  {
    id: 'gym',
    keywords: ['gym', 'partner', 'partnership', 'owner', 'business'],
    answer: 'Reps Thrive is exploring a gym-partner model covering member tracking, fitness progress and, as a planned offering, a gym-branded entry experience. No partnerships are announced yet. Use the Partner With Reps Thrive button or the contact section to get in touch.',
    action: 'contact',
  },
  {
    id: 'planned',
    keywords: ['what features are planned', 'planned', 'roadmap', 'available', 'availability', 'launch', 'release', 'today', 'when', 'coming', 'live'],
    answer: 'The features on this site are planned product areas: workout, activity and calorie tracking, weight and BMI, sleep tracking, training load, recovery insights and progress analytics. Personalised guidance is a future direction. ' + AVAILABILITY_NOTE + ' Contact us for the latest status.',
    action: 'features',
  },
  {
    id: 'privacy',
    keywords: ['privacy', 'private', 'is my data', 'store my data', 'personal data', 'data safe', 'secure', 'security', 'gdpr', 'data policy'],
    answer: "This website doesn't ask for your fitness records, and I can't see any personal data. I can't describe how the future product would handle data because that isn't published. Check the Privacy Policy link in the footer once it's available, or ask the team through the contact section.",
    action: 'contact',
  },
  {
    id: 'contact',
    keywords: ['contact', 'instagram', 'whatsapp', 'linkedin', 'email', 'reach', 'talk to'],
    answer: 'You can reach Reps Thrive through Instagram, WhatsApp, LinkedIn or email. The links are in the contact section, and any that are not set up yet are shown as such.',
    action: 'contact',
  },
  {
    id: 'price',
    keywords: ['price', 'cost', 'free', 'pricing', 'subscription', 'pay'],
    answer: 'There is no pricing information available yet. Please get in touch through the contact section for updates.',
    action: 'contact',
  },
]

export const fallback = {
  answer: "I'm not sure about that one, and I don't want to guess. You can ask about tracking, sleep, training load, recovery suggestions, calories, gym partnerships or availability, or reach the team through the contact section.",
  action: 'contact',
}

export const suggestions = [
  'How does Reps Thrive work?',
  'How can I track my sleep?',
  'What is training load?',
  'How do recovery suggestions work?',
  'Can Reps Thrive tell me when to rest?',
  'How can my gym partner with Reps Thrive?',
]

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// Pre-compile one regex per keyword: whole word or phrase, optional plural.
const compiled = intents.map((intent) => ({
  intent,
  rules: intent.keywords.map((k) => ({ words: k.split(' ').length, re: new RegExp(`\\b${escape(k)}(?:s|es)?\\b`) })),
}))

export function getReply(input) {
  const text = input.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text) return fallback
  const count = text.split(' ').length
  let best = null
  let bestScore = 0
  for (const { intent, rules } of compiled) {
    let score = 0
    for (const r of rules) {
      const hit = intent.exact ? count <= 3 && r.re.test(text) : r.re.test(text)
      if (hit) score += r.words + 1
    }
    // safety wording always takes priority over other topics
    if (intent.id === 'safety' && score > 0) score += 20
    if (score > bestScore) { best = intent; bestScore = score }
  }
  return best ?? fallback
}

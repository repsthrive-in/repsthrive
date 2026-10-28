# Reps Thrive — Official Website

Public brand website for **Reps Thrive** (*Your Fitness Redefined.*).
React + Vite + Tailwind CSS v4 + Lucide React. JavaScript/JSX only. No backend.

## What's new in this version

- **Sleep & Recovery Intelligence** (`#recovery`, "Train Hard. Recover Smarter."): a dashboard-style concept preview with a synced 14-day timeline (sleep duration, estimated training load, rest days), computed recovery observations, a contextual suggestion card, and a clear "what this data can and can't tell you" panel. Four sample scenarios show how suggestions change with the records.
- **Features** now list nine areas, including Sleep Tracking, Training Load Monitoring and Recovery Insights & Suggestions (all marked **Planned**). Cards can link to a concept preview via an optional `link` field.
- **Product preview / dashboard mockup** reuses the same sample data (workouts, activity, weight, sleep, training load, recovery note) so the story is consistent.
- **Reps chatbot**: new sleep, training-load, recovery, "when to rest", wearable, privacy, how-it-works and safety intents; matching now uses whole words (the old substring matcher let "ai" match inside "training"); context buttons ("See the recovery concept"); focus returns to the launcher on close.
- Updated hero, intro, how-it-works, principles, FAQ (13 questions), footer, navigation (adds **Recovery**) and metadata.

## Sleep & Recovery: how it works and what it is not

All records are **illustrative sample data** defined in `src/data/recovery.js`. Nothing is read from a user.

- **Session load (estimate)** = session minutes × reported effort (1 to 10). A simple trend estimate, not a validated physiological measure. Sets, reps and weights are not used to compute it.
- **Observations and suggestions** come from `analyse()` in `src/data/recovery.js`: last 7 days vs the previous 7 (average sleep, estimated load, rest days, sessions at effort 8+), plus an optional fatigue note. Thresholds are illustrative constants at the top of that file (`MIN_RECENT_NIGHTS`, `SLEEP_CHANGE_H`, `LOAD_JUMP`, `HARD_EFFORT`).
- If fewer than 4 of the last 7 nights are recorded, the suggestion says there isn't enough data instead of guessing.
- No sleep stages, HRV, heart rate, readiness or recovery percentages are shown or invented. Nothing diagnoses overtraining, illness or sleep disorders.
- Every sample sleep record is labelled **manual entry**. No wearable or health-platform import exists; if added later it must be labelled separately.
- Safety wording lives in `SAFETY_NOTE` (same file). Keep it visible if you edit the section.

To change the sample data, edit the `scenarios` array. Each scenario has 14 nights of `sleep` (`null` = no record), 14 days of `sessions` (`null` = rest day), optional `nap` minutes and an optional `selfReport`. Keep the 14-entry length.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Requires Node 18+.

## Configure contact details

Edit **`src/config/siteConfig.js`**. Every value ships empty on purpose; nothing is invented.
Empty values show a "Setup needed" placeholder instead of a link.

| Constant | Format |
| --- | --- |
| `CONTACT_EMAIL` | `hello@yourdomain.com` (powers "Partner With Reps Thrive" and the email card) |
| `INSTAGRAM_URL` | `https://www.instagram.com/your_handle` |
| `LINKEDIN_URL` | `https://www.linkedin.com/company/your-company` |
| `WHATSAPP_NUMBER` | digits only with country code, e.g. `919876543210` |
| `PRIVACY_POLICY_URL` / `TERMS_URL` | `/privacy`, `/terms` or a full URL |

The WhatsApp link is built as `https://wa.me/<number>?text=<URL-encoded message>`; edit `WHATSAPP_MESSAGE` to change the pre-filled text.
Until `CONTACT_EMAIL` is set, the "Partner With Reps Thrive" button scrolls to the contact section.

## Brand assets (`src/assets`, `public`)

- `src/assets/logo.png`: full logo (dark-background version). It is shown with CSS `mix-blend-mode: lighten` so its dark backdrop blends into the page. Swap in a transparent PNG with the same filename if you have one; then remove the `logo-blend` class in `Logo.jsx`.
- `src/assets/logo-light.png`: light-background version, kept for documents and light contexts (not used on the page).
- `public/favicon.png`, `public/apple-touch-icon.png`: favicon, cropped from the supplied app-icon tile with rounded corners.
- `public/og-image.png`: social share image. `index.html` points `og:image`, `og:url` and the canonical link at `https://repsthrive.in/`; change them if you deploy on another domain.
- The logo PNGs were inspected: `logo.png` is opaque (dark backdrop), so the existing `lighten` blend is kept. If you replace it with a transparent PNG, remove the `logo-blend` class in `Logo.jsx`.

## Chatbot (Reps)

A rule-based, frontend-only assistant. It is not an AI model and calls no external service.
Edit answers and keywords in `src/data/chatbotResponses.js`. Keep them consistent with `src/data/faq.js` and `src/data/features.js`.

## Content notes

- Features are labelled **Planned** or **Future**. Change `status` in `src/data/features.js` as features ship, and update the FAQ, chatbot answers and the recovery section labels to match.
- All dashboard figures are illustrative samples and labelled as such.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. In Vercel choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`. No environment variables are needed.
4. Deploy. Alternatively: `npm i -g vercel && vercel` from this folder.

## Structure

```
src/
  components/   UI sections, chatbot, shared Button / Panel / Reveal / SectionHeading,
                RecoverySection + RecoveryTimeline + RecoveryInsights
  config/       siteConfig.js (contact + legal constants, nav links)
  data/         features.js, faq.js, chatbotResponses.js, recovery.js (sample data + rules)
  hooks/        useReveal.js
  styles/       index.css (Tailwind v4 @theme design tokens)
```

import SectionHeading from './SectionHeading.jsx'
import DashboardMockup from './DashboardMockup.jsx'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'

export default function ProductPreview() {
  return (
    <section id="preview" aria-labelledby="preview-title" className="relative overflow-hidden bg-bg2 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px grad-accent opacity-60" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><SectionHeading id="preview-title" eyebrow="Product preview" title="Your progress and recovery, at a glance">
          A concept of the Reps Thrive dashboard: workouts, activity, calorie estimates, weight, sleep, training load and recovery observations. The values shown are illustrative samples, not real user data, and the final product may differ.
        </SectionHeading></Reveal>
        <Reveal delay={100} className="mt-12"><DashboardMockup /></Reveal>
        <Reveal className="mt-8"><Button href="#recovery" variant="secondary">Explore the Sleep &amp; Recovery concept</Button></Reveal>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { faqs } from '../data/faq.js'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal><SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered honestly">
          Clear answers about what Reps Thrive is and what is still on the way.
        </SectionHeading></Reveal>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3 className="!font-sans !normal-case !leading-normal">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink sm:text-lg"
                  >
                    {f.q}
                    <Plus size={22} aria-hidden="true" className={`shrink-0 text-volt transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen}>
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-ink2 sm:text-base">{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

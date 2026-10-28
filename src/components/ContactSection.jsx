import { Instagram, Linkedin, Building2, ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { WhatsAppIcon } from './BrandIcons.jsx'
import { channels } from '../config/siteConfig.js'

const cards = [
  { key: 'instagram', icon: Instagram, title: 'Instagram', cta: 'Follow Reps Thrive', constant: 'INSTAGRAM_URL', external: true },
  { key: 'whatsapp', icon: WhatsAppIcon, title: 'WhatsApp', cta: 'Chat on WhatsApp', constant: 'WHATSAPP_NUMBER', external: true },
  { key: 'linkedin', icon: Linkedin, title: 'LinkedIn', cta: 'Connect on LinkedIn', constant: 'LINKEDIN_URL', external: true },
  { key: 'email', icon: Building2, title: 'Gym partnership enquiries', cta: 'Email the team', constant: 'CONTACT_EMAIL', external: false },
]

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-bg2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal><SectionHeading id="contact-title" eyebrow="Contact" title="Get in touch">
          Follow the journey, ask a question, or start a gym partnership conversation.
        </SectionHeading></Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ key, icon: Icon, title, cta, constant, external }, i) => {
            const href = channels[key]
            const body = (
              <>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-sky/10 text-sky transition-colors group-hover:bg-volt group-hover:text-bg"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                {href ? (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-volt">{cta}<ArrowUpRight size={16} aria-hidden="true" /></p>
                ) : (
                  <p className="mt-3 text-xs leading-relaxed text-muted">Setup needed: add <code className="rounded bg-elevated px-1 py-0.5 text-[11px] text-ink2">{constant}</code> in <code className="rounded bg-elevated px-1 py-0.5 text-[11px] text-ink2">src/config/siteConfig.js</code></p>
                )}
              </>
            )
            const base = 'group block h-full rounded-3xl border border-line bg-surface/70 p-6 transition-all'
            return (
              <Reveal as="li" key={key} delay={i * 80}>
                {href ? (
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`${base} hover:-translate-y-1 hover:border-volt/60`}>{body}</a>
                ) : (
                  <div className={`${base} border-dashed`}>{body}</div>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

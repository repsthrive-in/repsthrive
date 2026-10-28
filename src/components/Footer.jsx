import { Instagram, Linkedin } from 'lucide-react'
import Logo from './Logo.jsx'
import { WhatsAppIcon } from './BrandIcons.jsx'
import { channels, navLinks, PRIVACY_POLICY_URL, TERMS_URL } from '../config/siteConfig.js'

const socials = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
]

const sitemap = [
  { label: 'Features', href: '#features' },
  { label: 'Sleep & Recovery', href: '#recovery' },
  { label: 'Our Vision', href: '#vision' },
  { label: 'Gym Partnerships', href: '#gyms' },
  { label: 'FAQ', href: '#faq' },
]

function Legal({ label, href }) {
  return href
    ? <a href={href} className="hover:text-volt">{label}</a>
    : <span title="Not yet configured" className="text-muted/70">{label} (placeholder)</span>
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 font-display text-xl font-bold uppercase text-ink">Your Fitness Redefined.</p>
          <p className="mt-2 max-w-xs text-sm text-muted">Every rep counts. Every step matters.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="!text-sm !tracking-[0.2em] text-muted">Explore</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {sitemap.map((l) => <li key={l.href}><a className="inline-flex min-h-9 items-center text-ink2 hover:text-volt" href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="!text-sm !tracking-[0.2em] text-muted">Connect</h2>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ key, label, icon: Icon }) => {
              const href = channels[key]
              const cls = 'flex size-11 items-center justify-center rounded-xl border border-line text-ink2 transition-colors'
              return (
                <li key={key}>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} hover:border-volt hover:bg-volt hover:text-bg`}><Icon size={20} aria-hidden="true" /></a>
                    : <span role="img" aria-label={`${label} (not yet configured)`} title={`${label}: setup needed`} className={`${cls} border-dashed text-muted/60`}><Icon size={20} aria-hidden="true" /></span>}
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-xs text-muted">Dashed icons need configuring in <code>siteConfig.js</code>.</p>
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Reps Thrive. All rights reserved.</p>
          <p className="flex gap-5"><Legal label="Privacy Policy" href={PRIVACY_POLICY_URL} /><Legal label="Terms" href={TERMS_URL} /></p>
        </div>
      </div>
    </footer>
  )
}

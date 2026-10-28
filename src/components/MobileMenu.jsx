import { navLinks } from '../config/siteConfig.js'
import Button from './Button.jsx'

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="absolute inset-x-0 top-full border-t border-line bg-bg/98 px-5 pb-6 pt-3 shadow-2xl lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={onClose} className="flex min-h-12 items-center border-b border-line/60 text-lg font-medium text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="#features" onClick={onClose} className="mt-5 w-full">Explore Reps Thrive</Button>
      </nav>
    </div>
  )
}

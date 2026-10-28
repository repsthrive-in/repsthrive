// Central place to update contact points. Leave a value as '' until you have the real one.
// Nothing here is invented: empty values render a "setup needed" placeholder instead of a link.

export const CONTACT_EMAIL = '' // e.g. 'hello@yourdomain.com'
export const INSTAGRAM_URL = '' // e.g. 'https://www.instagram.com/your_handle'
export const LINKEDIN_URL = '' // e.g. 'https://www.linkedin.com/company/your-company'
export const WHATSAPP_NUMBER = '' // digits only with country code, e.g. '919876543210'
export const PRIVACY_POLICY_URL = '' // e.g. '/privacy' or a full URL
export const TERMS_URL = '' // e.g. '/terms' or a full URL

export const WHATSAPP_MESSAGE =
  "Hi Reps Thrive! I'd like to know more about your fitness platform and gym partnership opportunities."

const digits = WHATSAPP_NUMBER.replace(/\D/g, '')

export const whatsappLink = digits
  ? `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : ''

export const emailLink = CONTACT_EMAIL
  ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Gym partnership enquiry')}`
  : ''

export const channels = {
  instagram: INSTAGRAM_URL,
  linkedin: LINKEDIN_URL,
  whatsapp: whatsappLink,
  email: emailLink,
}

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Recovery', href: '#recovery' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Vision', href: '#vision' },
  { label: 'FAQ', href: '#faq' },
]

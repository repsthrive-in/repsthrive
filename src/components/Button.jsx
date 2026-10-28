const variants = {
  primary: 'bg-volt text-bg hover:bg-white shadow-[0_8px_30px_-8px_rgba(209,255,66,.55)]',
  secondary: 'border border-sky/60 text-sky hover:bg-sky/10 hover:border-sky',
  ghost: 'text-ink2 hover:text-ink hover:bg-white/5',
  blue: 'bg-elite text-ink hover:bg-sky',
}

export default function Button({ href, onClick, variant = 'primary', external = false, className = '', children, ...rest }) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return <a href={href} className={cls} {...ext} {...rest}>{children}</a>
  }
  return <button type="button" onClick={onClick} className={cls} {...rest}>{children}</button>
}

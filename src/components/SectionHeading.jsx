export default function SectionHeading({ eyebrow, title, children, align = 'left', id }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-volt ${align === 'center' ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-px w-8 bg-volt" />{eyebrow}
        </p>
      )}
      <h2 id={id} className="text-[clamp(2.4rem,6vw,4.5rem)]">{title}</h2>
      {children && <p className="mt-5 text-base leading-relaxed text-ink2 sm:text-lg">{children}</p>}
    </div>
  )
}

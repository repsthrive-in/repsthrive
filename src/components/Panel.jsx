export default function Panel({ title, icon: Icon, children, className = '', note, as: Tag = 'section', headingId }) {
  return (
    <Tag className={`rounded-2xl border border-line bg-surface/80 p-4 sm:p-5 ${className}`} {...(headingId ? { 'aria-labelledby': headingId } : {})}>
      <header className="mb-3 flex items-center justify-between gap-2">
        <h3 id={headingId} className="flex items-center gap-2 font-sans !text-[11px] font-semibold !normal-case tracking-[0.14em] text-muted">
          {Icon && <Icon size={14} className="text-sky" aria-hidden="true" />}<span className="uppercase">{title}</span>
        </h3>
        {note && <span className="text-[11px] text-muted">{note}</span>}
      </header>
      {children}
    </Tag>
  )
}

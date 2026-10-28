import useReveal from '../hooks/useReveal.js'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

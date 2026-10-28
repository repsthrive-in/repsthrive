import avatar from '../assets/favicon.png'

const ACTIONS = {
  contact: { label: 'Go to contact options', target: 'contact' },
  recovery: { label: 'See the recovery concept', target: 'recovery' },
  features: { label: 'View the features', target: 'features' },
}

export default function ChatMessage({ message, onAction }) {
  const action = ACTIONS[message.action]
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <img src={avatar} alt="" width="28" height="28" className="mt-1 size-7 shrink-0 rounded-lg" />}
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isUser ? 'rounded-br-md bg-elite text-ink' : 'rounded-bl-md bg-elevated text-ink2'}`}>
        <p>{message.text}</p>
        {action && (
          <button type="button" onClick={() => onAction(action.target)} className="mt-2.5 inline-flex min-h-11 items-center rounded-lg bg-volt px-3.5 text-xs font-semibold text-bg hover:bg-white">
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5" role="status" aria-label="Reps is typing">
      <img src={avatar} alt="" width="28" height="28" className="mt-1 size-7 shrink-0 rounded-lg" />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-elevated px-4 py-3.5">
        {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-sky" style={{ animation: 'blink 1.2s infinite', animationDelay: `${i * 0.2}s` }} />)}
      </div>
    </div>
  )
}

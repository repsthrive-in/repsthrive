import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import ChatbotLauncher from './ChatbotLauncher.jsx'
import ChatMessage, { TypingIndicator } from './ChatMessage.jsx'
import avatar from '../assets/favicon.png'
import { getReply, suggestions } from '../data/chatbotResponses.js'

const WELCOME = {
  id: 0,
  role: 'bot',
  text: "Hi, I'm Reps, your Reps Thrive guide. I'm a simple rule-based assistant, not a live AI, and I can't see anyone's personal data. Ask me about tracking, sleep, training load, recovery, gym partnerships or what's planned.",
}

export default function RepsChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const timer = useRef(null)
  const nextId = useRef(1)

  useEffect(() => { if (open) inputRef.current?.focus() }, [open])
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }) }, [messages, typing, open])
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = (raw) => {
    const text = raw.trim()
    if (!text || typing) return
    setMessages((m) => [...m, { id: nextId.current++, role: 'user', text }])
    setDraft('')
    setTyping(true)
    const reply = getReply(text)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, role: 'bot', text: reply.answer, action: reply.action }])
      setTyping(false)
    }, 600)
  }

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => document.getElementById('reps-launcher')?.focus())
  }

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!open) return <ChatbotLauncher onClick={() => setOpen(true)} />

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label="Chat with Reps"
      className="fixed right-3 bottom-3 z-50 flex h-[min(36rem,calc(100dvh-1.5rem))] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-bg2 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] sm:right-6 sm:bottom-6"
    >
      <header className="flex items-center gap-3 border-b border-line bg-navy px-4 py-3">
        <img src={avatar} alt="" width="40" height="40" className="size-10 rounded-xl" />
        <div className="min-w-0 flex-1">
          <h2 className="!font-sans !text-base !normal-case !leading-tight">Reps</h2>
          <p className="text-xs text-sky">Rule-based guide · not medical advice</p>
        </div>
        <button type="button" onClick={close} aria-label="Close chat" className="flex size-11 items-center justify-center rounded-xl text-ink2 hover:bg-white/10 hover:text-ink">
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" role="log" aria-live="polite" aria-busy={typing} aria-label="Conversation">
        {messages.map((m) => <ChatMessage key={m.id} message={m} onAction={goTo} />)}
        {typing && <TypingIndicator />}
        <div ref={endRef} />
      </div>

      <div className="border-t border-line p-3">
        <div className="mb-2.5 flex max-h-[5.75rem] flex-wrap gap-2 overflow-y-auto" role="group" aria-label="Suggested questions">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => send(s)} disabled={typing} className="min-h-9 rounded-full border border-line px-3 py-1.5 text-left text-xs text-ink2 hover:border-volt hover:text-volt disabled:opacity-50">{s}</button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="flex items-center gap-2">
          <label htmlFor="reps-input" className="sr-only">Message Reps</label>
          <input
            id="reps-input"
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={300}
            placeholder="Ask about Reps Thrive…"
            autoComplete="off"
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-muted"
          />
          <button type="submit" aria-label="Send message" disabled={!draft.trim() || typing} className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-volt text-bg hover:bg-white disabled:opacity-40">
            <Send size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}

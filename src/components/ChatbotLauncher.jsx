import { MessageCircle } from 'lucide-react'

export default function ChatbotLauncher({ onClick }) {
  return (
    <button
      type="button"
      id="reps-launcher"
      onClick={onClick}
      aria-label="Open chat with Reps"
      aria-haspopup="dialog"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-volt text-bg shadow-[0_10px_40px_-6px_rgba(209,255,66,.6)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </button>
  )
}

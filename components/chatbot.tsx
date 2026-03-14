"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, CheckCircle } from "lucide-react"
import Markdown from "react-markdown"
import { motion, AnimatePresence } from "motion/react"
import emailjs from "@emailjs/browser"

type Message = {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_PROMPT = `You are a friendly, knowledgeable customer service AI for Bird Kennel LLC, a registered American Foxhound kennel in Ruffin, NC (Kennel number K-978), registered with the Standard Foxhound Stud Book.

About Bird Kennel:
- Founded in 2024 by Andrew Bird.
- Trains top quality foxhounds for trial hunts and hunting fox, coyote, deer, and other game.
- Located at 231 Lindseys Drive, Ruffin NC 27326
- Phone: (336) 609-1515 | Email: BirdKennels@gmail.com
- Hours: Sunday–Saturday, 8am to 6pm

#FriendsoftheFoxhound:
- Established 2025, 501c3 nonprofit
- Foster care and adoption services for hunting dogs that no longer hunt, are unwanted, or face euthanasia
- Bird Kennel has lots and a running space for fostered hounds
- Current available hounds: Bo (Hertford County, NC — loves walks and playing with friends), Rachel & Monica (must be adopted together, from Hertford County NC)
- Recently adopted: Tutter (adopted January 10, 2026)
- Donations go through #FriendsoftheFoxhound, not Bird Kennel LLC

Team:
- Andrew Bird (President): preserving NC houndsmen traditions since 2023
- Hanna Bird (Vice President): kennel care, events, newsletters, merchandise
- Angel Crowder (Caretaker/Trainer): kennel maintenance, feeding, training, photography

Your goals:
- Answer questions about the kennel, foxhounds, training, adoption, and #FriendsoftheFoxhound
- Help people inquire about purchasing hounds, adopting, fostering, or donating
- For adoption inquiries, collect: name, contact (email or phone), which hound they're interested in
- For training or purchase inquiries, collect: name, contact, what they're looking for
- When you have enough info to follow up (name + contact + intent), include this exact tag at the END of your message only: [READY_FOR_SUBMISSION]
- Be warm, concise, and professional. Do not explain the tag. Never include it mid-message.`

const PUBLIC_KEY = "XbuRWAZjbs0iqLEbG"
const SERVICE_ID = "service_j2pss1r"
const TEMPLATE_ID = "template_k39zwyn"

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/#+\s/g, "")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/^\s*[-•]\s/gm, "• ")
    .trim()
}

export default function BirdKennelChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [readyForSubmission, setReadyForSubmission] = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320)
  }, [open])

  // Escape key closes on desktop only
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && window.innerWidth >= 640) setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  async function callClaude(msgs: Message[], systemOverride?: string): Promise<string> {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemOverride ?? SYSTEM_PROMPT,
        messages: msgs,
      }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return (data.content?.[0]?.text ?? "") as string
  }

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userText = input.trim()
    const updatedMsgs: Message[] = [...messages, { role: "user", content: userText }]
    setMessages(updatedMsgs)
    setInput("")
    setLoading(true)

    try {
      const rawText = await callClaude(updatedMsgs)
      const isReady = rawText.includes("[READY_FOR_SUBMISSION]")
      const cleanText = rawText.replace("[READY_FOR_SUBMISSION]", "").trim()
      if (isReady) setReadyForSubmission(true)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanText || "Sorry, I couldn't respond. Please call (336) 609-1515." },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please call (336) 609-1515 or email BirdKennels@gmail.com." },
      ])
    }

    setLoading(false)
  }

  async function submitInquiry() {
    if (submitting || messages.length === 0) return
    setSubmitting(true)

    const conversationText = messages
      .map((m) => `${m.role === "user" ? "Customer" : "AI"}: ${m.content}`)
      .join("\n")

    try {
      const rawSummary = await callClaude(
        [
          {
            role: "user",
            content: `Summarize this conversation into a professional inquiry for Bird Kennel LLC. Plain text only, no markdown. Include: customer name, contact info, what they are interested in, and any relevant details.\n\nConversation:\n${conversationText}`,
          },
        ],
        "You summarize customer chat conversations into clean inquiry notes. Plain text only, no markdown."
      )
      const summary = stripMarkdown(rawSummary)

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { user_name: "Bird Kennel Website Chat", user_email: "See inquiry below", message: summary },
        PUBLIC_KEY
      )

      setReadyForSubmission(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "✅ Your inquiry has been submitted! Our team will reach out shortly. You can also call us at (336) 609-1515 anytime between 8am–6pm.",
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Could not submit. Please call (336) 609-1515 or email BirdKennels@gmail.com." },
      ])
    }

    setSubmitting(false)
  }

  return (
    <>
      {/* Floating Button — centered at bottom */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setOpen(true)}
            aria-label="Open Bird Kennel chat"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 h-14 rounded-full border-0 cursor-pointer"
            
            style={{
              background: "#C0141C",
              boxShadow: "0 4px 20px rgba(192,20,28,0.38)",
            }}
          >
            <MessageCircle size={20} color="#fff" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm z-[51]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel — centered on screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none z-[52] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="w-full flex flex-col pointer-events-auto overflow-hidden"
              style={{
                maxWidth: 420,
                height: "min(82vh, 640px)",
                borderRadius: 20,
                background: "#fff",
                boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
              }}
              role="dialog"
              aria-label="Bird Kennel AI Support"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ background: "#C0141C" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.2)", fontSize: 18 }}
                  >
                    🐕
                  </div>
                  <div>
                    <div
                      className="text-white font-semibold text-sm"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Bird Kennel Support
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.78)" }}>
                      Ruffin, NC · K-978 · #FriendsoftheFoxhound
                    </div>
                  </div>
                </div>
                {/* X button always visible (mobile & desktop) */}
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full w-8 h-8 flex items-center justify-center border-0 cursor-pointer transition-colors flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                  aria-label="Close chat"
                >
                  <X size={16} color="#fff" strokeWidth={2.5} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={msgsRef}
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                style={{ background: "#faf8f7" }}
              >
                {messages.length === 0 && (
                  <div className="text-center mt-3 mb-1">
                    <div
                      className="font-semibold mb-1"
                      style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#1a1a1a" }}
                    >
                      Welcome to Bird Kennel!
                    </div>
                    <div style={{ fontSize: 12, color: "#8a7e7a", lineHeight: 1.6 }}>
                      Ask about our foxhounds, training, or the<br />
                      #FriendsoftheFoxhound adoption program.
                    </div>
                    <div
                      className="mt-3 mx-auto rounded-xl px-4 py-2.5 text-left"
                      style={{
                        background: "#fff",
                        border: "0.5px solid #e8e2e0",
                        maxWidth: 290,
                        fontSize: 12,
                        color: "#5a5050",
                        lineHeight: 1.5,
                      }}
                    >
                      💡 Try asking: <em>"Do you have hounds available for adoption?"</em> or{" "}
                      <em>"Tell me about your training program."</em>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl leading-relaxed text-sm ${
                      msg.role === "user" ? "ml-auto rounded-br-sm" : "rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "#C0141C", color: "#fff" }
                        : { background: "#fff", border: "0.5px solid #e8e2e0", color: "#1a1a1a" }
                    }
                  >
                    <Markdown>{msg.content}</Markdown>
                  </motion.div>
                ))}

                {loading && (
                  <div style={{ color: "#a09490", fontSize: 12, fontStyle: "italic" }}>
                    Bird Kennel AI is typing…
                  </div>
                )}
              </div>

              {/* Submit Inquiry Button */}
              {readyForSubmission && (
                <div className="px-4 pb-2 flex-shrink-0">
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={submitInquiry}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white border-0 cursor-pointer transition-colors disabled:opacity-60"
                    style={{ background: "#2c8c4e", fontSize: 13 }}
                  >
                    <CheckCircle size={16} />
                    {submitting ? "Submitting…" : "Submit Inquiry"}
                  </motion.button>
                </div>
              )}

              {/* Input Row */}
              <div
                className="flex gap-2 px-3 py-3 flex-shrink-0"
                style={{ borderTop: "0.5px solid #ece6e4", background: "#fff" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask us anything…"
                  className="flex-1 rounded-xl px-4 py-2.5 outline-none transition-colors"
                  style={{
                    border: "0.5px solid #ddd8d5",
                    background: "#faf8f7",
                    fontFamily: "inherit",
                    color: "#1a1a1a",
                    fontSize: 13.5,
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="rounded-xl px-5 py-2.5 font-semibold text-white border-0 cursor-pointer transition-colors disabled:opacity-50"
                  style={{ background: "#C0141C", fontSize: 13 }}
                >
                  Send
                </button>
              </div>

              {/* Footer */}
              <div
                className="text-center py-2 flex-shrink-0"
                style={{ background: "#fff", fontSize: 10.5, color: "#b0a8a5" }}
              >
                Powered by{" "}
                <a
                  href="https://ffwebsolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C0141C", fontWeight: 500, textDecoration: "none" }}
                >
                  FFWebSolutions
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

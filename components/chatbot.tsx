"use client"

import { useState } from "react"
import { MessageCircle, X, FileText } from "lucide-react"
import Markdown from "react-markdown"
import { motion, AnimatePresence } from "motion/react"
import emailjs from "@emailjs/browser"

type Message = {
  role: "user" | "customer-service-ai"
  content: string
}

async function generateContent(contents: object[], model = "gemini-2.5-flash") {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, model }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return { text: data.text as string }
}

export default function BirdKennelChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [sendingReport, setSendingReport] = useState(false)
  const [readyForSubmission, setReadyForSubmission] = useState(false)

  const publicKey = "69HfnhZeYr4Zv-bQ1"
  const serviceID = "service_8pri4at"
  const templateID = "template_c8n51kj"

  const businessContext = `
You are a friendly, knowledgeable customer service AI for Bird Kennel LLC, a registered American Foxhound kennel in Ruffin, NC (Kennel number K-978), registered with the Standard Foxhound Stud Book.

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
- For adoption inquiries YOU MUST HAVE: name, contact (email or phone), which hound they're interested in
- For training or purchase inquiries, collect: name, contact, what they're looking for
- When you have enough info to follow up (name + contact + intent), include this exact tag at the END of your message only:

[READY_FOR_SUBMISSION]

Must have their email or phone number before tagging.
Only include the tag when you truly have enough details.
Do not explain the tag.
Be warm, professional, and concise.
`

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

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const conversationContents = [
        { text: businessContext },
        ...messages.map((msg) => ({
          text: `${msg.role === "user" ? "Customer:" : "Assistant:"} ${msg.content}`,
        })),
        { text: `Customer: ${input}` },
      ]

      const response = await generateContent(conversationContents)
      const rawText = response.text || ""

      const isReady = rawText.includes("[READY_FOR_SUBMISSION]")
      const cleanedText = rawText.replace("[READY_FOR_SUBMISSION]", "").trim()

      if (isReady) setReadyForSubmission(true)

      setMessages((prev) => [
        ...prev,
        {
          role: "customer-service-ai",
          content: cleanedText || "Sorry, I couldn't respond. Please call (336) 609-1515.",
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "customer-service-ai",
          content: "Something went wrong. Please call (336) 609-1515 or email BirdKennels@gmail.com.",
        },
      ])
    }

    setLoading(false)
  }

  async function sendSummaryEmail() {
    if (messages.length === 0) return

    try {
      setSendingReport(true)

      const conversationText = messages
        .map((m) => `${m.role === "user" ? "Customer" : "AI"}: ${m.content}`)
        .join("\n")

      const summaryResponse = await generateContent([
        {
          text: `
Summarize this conversation into a professional inquiry for Bird Kennel LLC.
Write in plain text only. Do NOT use markdown, asterisks, bold, bullet symbols, or any special formatting.
Use plain sentences and line breaks only.

Include:
- Customer name
- Contact info (email or phone)
- What they are interested in (adoption, purchase, training, fostering, donating)
- Which hound(s) if applicable
- Any other relevant details

Conversation:
${conversationText}
          `,
        },
      ])

      const rawSummary = summaryResponse.text || "Customer submitted an inquiry."
      const summary = stripMarkdown(rawSummary)

      await emailjs.send(
        serviceID,
        templateID,
        {
          user_name: "Bird Kennel Website Chat",
          user_email: "See inquiry below",
          message: summary,
        },
        publicKey
      )

      setMessages((prev) => [
        ...prev,
        {
          role: "customer-service-ai",
          content:
            "✅ Your inquiry has been submitted! Our team will reach out shortly. You can also call us at (336) 609-1515 anytime between 8am–6pm.",
        },
      ])

      setReadyForSubmission(false)
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "customer-service-ai",
          content: "❌ Failed to send your inquiry. Please call (336) 609-1515 or email BirdKennels@gmail.com.",
        },
      ])
    }

    setSendingReport(false)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-0 cursor-pointer shadow-2xl"
            style={{
              background: "#C0141C",
              boxShadow: "0 8px 32px rgba(192,20,28,0.4)",
            }}
            aria-label="Open Bird Kennel chat"
          >
            <MessageCircle size={26} color="white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat UI */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center z-[51]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative flex flex-col w-full h-full sm:w-[420px] sm:h-[80vh] sm:rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "#fff" }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{
                  background: "#C0141C",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full text-lg"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    🐕
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                      Bird Kennel Support
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.78)" }}>
                      Ruffin, NC · K-978 · #FriendsoftheFoxhound
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="border-0 cursor-pointer transition-colors"
                  style={{ color: "rgba(255,255,255,0.7)", background: "transparent" }}
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Welcome Banner */}
              {messages.length === 0 && (
                <div
                  className="mx-4 mt-4 rounded-xl px-4 py-3 text-xs"
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#7f1d1d",
                  }}
                >
                  👋 Welcome! Ask about our <strong>foxhounds</strong>, <strong>training programs</strong>, or the{" "}
                  <strong>#FriendsoftheFoxhound</strong> adoption program. We&apos;d love to help!
                </div>
              )}

              {/* Messages */}
              <motion.div
                layout
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm"
                style={{ background: "#faf8f7" }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "ml-auto" : ""}`}
                    style={
                      msg.role === "user"
                        ? { background: "#C0141C", color: "white" }
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
              </motion.div>

              {/* Submit Button */}
              {readyForSubmission && (
                <div className="px-4 pb-2">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={sendSummaryEmail}
                    disabled={sendingReport}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border-0 cursor-pointer transition-all"
                    style={{
                      background: sendingReport ? "rgba(44,140,78,0.5)" : "#2c8c4e",
                      color: "white",
                    }}
                  >
                    <FileText size={16} />
                    {sendingReport ? "Submitting Inquiry..." : "Submit Inquiry"}
                  </motion.button>
                </div>
              )}

              {/* Input */}
              <div
                className="p-4"
                style={{
                  borderTop: "1px solid #ece6e4",
                  background: "#fff",
                }}
              >
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about our foxhounds or adoption..."
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "#faf8f7",
                      border: "0.5px solid #ddd8d5",
                      color: "#1a1a1a",
                    }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-white border-0 cursor-pointer"
                    style={{ background: "#C0141C" }}
                  >
                    Send
                  </motion.button>
                </div>
                <p className="text-center text-xs mt-2" style={{ color: "#c0a8a5" }}>
                  Powered by{" "}
                  <a
                    href="https://ffwebsolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium no-underline hover:underline"
                    style={{ color: "#C0141C" }}
                  >
                    FFWebSolutions
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

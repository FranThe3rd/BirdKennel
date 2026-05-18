import { NextResponse } from "next/server"
import { getChatbotPrompt, saveChatbotPrompt } from "@/lib/settings-store"
import { DEFAULT_CHATBOT_PROMPT } from "@/lib/default-chatbot-prompt"

export async function GET() {
  try {
    const systemPrompt = await getChatbotPrompt()
    return NextResponse.json({ systemPrompt, defaultPrompt: DEFAULT_CHATBOT_PROMPT })
  } catch {
    return NextResponse.json({ error: "Failed to load chatbot prompt" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null)
  const systemPrompt = body?.systemPrompt

  if (typeof systemPrompt !== "string" || !systemPrompt.trim()) {
    return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 })
  }

  try {
    await saveChatbotPrompt(systemPrompt)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to save chatbot prompt" }, { status: 500 })
  }
}

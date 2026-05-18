import { NextResponse } from "next/server"
import { getChatbotPrompt } from "@/lib/settings-store"

export async function GET() {
  try {
    const systemPrompt = await getChatbotPrompt()
    return NextResponse.json({ systemPrompt })
  } catch {
    return NextResponse.json({ error: "Failed to load chatbot prompt" }, { status: 500 })
  }
}

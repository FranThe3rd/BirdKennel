import { promises as fs } from "fs"
import path from "path"
import { DEFAULT_CHATBOT_PROMPT } from "@/lib/default-chatbot-prompt"

const CHATBOT_SETTINGS_PATH = path.join(process.cwd(), "data", "chatbot.json")

type ChatbotSettings = {
  systemPrompt: string
}

export async function getChatbotPrompt(): Promise<string> {
  try {
    const raw = await fs.readFile(CHATBOT_SETTINGS_PATH, "utf8")
    const parsed = JSON.parse(raw) as ChatbotSettings
    if (typeof parsed.systemPrompt === "string" && parsed.systemPrompt.trim()) {
      return parsed.systemPrompt.trim()
    }
  } catch {
    // fall through to default
  }
  return DEFAULT_CHATBOT_PROMPT
}

export async function saveChatbotPrompt(systemPrompt: string) {
  const payload: ChatbotSettings = { systemPrompt: systemPrompt.trim() }
  await fs.mkdir(path.dirname(CHATBOT_SETTINGS_PATH), { recursive: true })
  await fs.writeFile(
    CHATBOT_SETTINGS_PATH,
    JSON.stringify(payload, null, 2),
    "utf8"
  )
}

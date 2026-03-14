import { GoogleGenAI } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// In-memory usage tracker
const usage = new Map<string, { count: number; firstRequest: number }>()

const LIMIT = 50
const WINDOW = 24 * 60 * 60 * 1000 // 24 hours in ms

export async function POST(req: NextRequest) {
  const { contents, model } = await req.json()

  const ip = req.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()
  const data = usage.get(ip)

  if (data) {
    const timePassed = now - data.firstRequest

    if (timePassed < WINDOW) {
      if (data.count >= LIMIT) {
        const hoursLeft = Math.ceil((WINDOW - timePassed) / (1000 * 60 * 60))
        return NextResponse.json(
          { error: `Limit reached. Try again in ${hoursLeft} hour(s).` },
          { status: 429 }
        )
      }

      // Increment count
      usage.set(ip, { count: data.count + 1, firstRequest: data.firstRequest })
    } else {
      // Window expired → reset
      usage.set(ip, { count: 1, firstRequest: now })
    }
  } else {
    // First request ever
    usage.set(ip, { count: 1, firstRequest: now })
  }

  try {
    const response = await ai.models.generateContent({ model, contents })
    return NextResponse.json({ text: response.text })
  } catch (err) {
    return NextResponse.json({ error: "AI request failed" }, { status: 500 })
  }
}
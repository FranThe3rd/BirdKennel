import { NextResponse } from "next/server"
import { getHounds, saveHounds } from "@/lib/hounds-store"
import type { HoundCollection } from "@/types/hounds"

const validTypes: HoundCollection[] = ["adopted", "available", "foxhounds"]

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type")

  if (!type || !validTypes.includes(type as HoundCollection)) {
    return NextResponse.json({ error: "Invalid collection type" }, { status: 400 })
  }

  try {
    const hounds = await getHounds(type as HoundCollection)
    return NextResponse.json({ hounds })
  } catch {
    return NextResponse.json({ error: "Failed to load hounds" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null)
  const type = body?.type as HoundCollection | undefined
  const hounds = body?.hounds

  if (!type || !validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid collection type" }, { status: 400 })
  }

  if (!Array.isArray(hounds)) {
    return NextResponse.json({ error: "Invalid hounds payload" }, { status: 400 })
  }

  try {
    await saveHounds(type, hounds)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to save hounds" }, { status: 500 })
  }
}

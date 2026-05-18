import { NextResponse } from "next/server"
import { getHounds } from "@/lib/hounds-store"
import type { HoundCollection } from "@/types/hounds"

const validTypes: HoundCollection[] = ["adopted", "available", "foxhounds"]

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params

  if (!validTypes.includes(type as HoundCollection)) {
    return NextResponse.json({ error: "Invalid collection type" }, { status: 400 })
  }

  try {
    const hounds = await getHounds(type as HoundCollection)
    return NextResponse.json({ hounds })
  } catch {
    return NextResponse.json({ error: "Failed to load hounds" }, { status: 500 })
  }
}

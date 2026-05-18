import { NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = body?.password

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not configured on the server." },
      { status: 500 }
    )
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions())
  return response
}

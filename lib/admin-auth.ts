import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_COOKIE = "bk_admin_session"
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function getAdminSecret(): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error("ADMIN_PASSWORD is not configured")
  }
  return secret
}

export function createAdminSessionToken(): string {
  const payload = `admin:${Date.now()}`
  const signature = createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("hex")
  return Buffer.from(`${payload}:${signature}`).toString("base64url")
}

export function verifyAdminSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")
    const separator = decoded.lastIndexOf(":")
    if (separator === -1) return false

    const payload = decoded.slice(0, separator)
    const signature = decoded.slice(separator + 1)
    if (!payload.startsWith("admin:")) return false

    const timestamp = Number(payload.slice("admin:".length))
    if (!Number.isFinite(timestamp)) return false
    if (Date.now() - timestamp > SESSION_MAX_AGE_MS) return false

    const expected = createHmac("sha256", getAdminSecret())
      .update(payload)
      .digest("hex")

    const sigBuffer = Buffer.from(signature, "hex")
    const expectedBuffer = Buffer.from(expected, "hex")
    if (sigBuffer.length !== expectedBuffer.length) return false

    return timingSafeEqual(sigBuffer, expectedBuffer)
  } catch {
    return false
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!token) return false
  return verifyAdminSessionToken(token)
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  }
}

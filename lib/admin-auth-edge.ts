const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function hmacSha256Hex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  )
  return bytesToHex(signature)
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
  return atob(padded)
}

export async function verifyAdminSessionTokenEdge(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false

  try {
    const decoded = decodeBase64Url(token)
    const separator = decoded.lastIndexOf(":")
    if (separator === -1) return false

    const payload = decoded.slice(0, separator)
    const signature = decoded.slice(separator + 1)
    if (!payload.startsWith("admin:")) return false

    const timestamp = Number(payload.slice("admin:".length))
    if (!Number.isFinite(timestamp)) return false
    if (Date.now() - timestamp > SESSION_MAX_AGE_MS) return false

    const expected = await hmacSha256Hex(secret, payload)
    return safeEqual(signature, expected)
  } catch {
    return false
  }
}

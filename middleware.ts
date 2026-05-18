import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE } from "@/lib/admin-auth"
import { verifyAdminSessionTokenEdge } from "@/lib/admin-auth-edge"

async function isAuthed(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value
  return Boolean(token && (await verifyAdminSessionTokenEdge(token)))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/admin/login")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/api/admin")) {
    if (!(await isAuthed(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!(await isAuthed(request))) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}

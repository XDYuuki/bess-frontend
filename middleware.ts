import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authStorage = request.cookies.get("auth-storage")
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

  // // Debug logs detalhados
  // console.log("🔍 MIDDLEWARE DEBUG:")
  // console.log("📍 Path:", request.nextUrl.pathname)
  // console.log("🍪 Auth storage cookie:", authStorage?.value)
  // console.log("🔐 Is auth page:", isAuthPage)
  // console.log("🏠 Is dashboard:", isDashboard)

  // Check if user is authenticated
  let isAuthenticated = false
  if (authStorage) {
    try {
      const auth = JSON.parse(authStorage.value);
      isAuthenticated = auth.state?.isAuthenticated || false;
    } catch (error) {
      console.log("❌ Error parsing auth storage:", error)
      isAuthenticated = false
    }
  } else {
    console.log("❌ No auth storage cookie found")
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users to login
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // matcher: ["/dashboard/:path*", "/login", "/register"],
  matcher: ["/login", "/register"],
}

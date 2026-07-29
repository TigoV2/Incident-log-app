import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isLoginPage = pathname === "/login";
  const isAuthRoute = pathname.startsWith("/api/auth");

  const isPublicRoute =
    isLoginPage || isAuthRoute;

  // Not logged in → block protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", req.url),
    );
  }

  // Logged in → don't show login page again
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(
      new URL("/", req.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Protect all routes except:
     * - Next.js static files
     * - images
     * - favicon
     *
     * API auth routes are handled inside the proxy.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = ["/admin", "/api/admin/login", "/api/admin/logout"].includes(pathname);
  if (isPublic) return NextResponse.next();

  const ok = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

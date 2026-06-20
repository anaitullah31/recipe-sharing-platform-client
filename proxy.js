import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // allow public recipes listing page
  if (pathname === "/recipes") {
    return NextResponse.next();
  }

  // protect /recipes/[id] and dashboard
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/recipes/:path*"],
};
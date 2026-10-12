import { NextRequest, NextResponse } from "next/server";
import FREEZE_API_CONSTANTS from "./client/axios/constant";

const publicPaths = ["/login", "/register","/"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  const sessionCookie = request.cookies.get(
    FREEZE_API_CONSTANTS.ACCESSTOKENAME,
  );

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

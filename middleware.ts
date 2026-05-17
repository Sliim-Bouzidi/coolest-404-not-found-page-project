import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateToken } from "@/lib/videoToken";

export async function middleware(request: NextRequest) {
  // Only execute this logic when the user requests the home page (404 landing page)
  if (request.nextUrl.pathname === "/") {
    const token = await generateToken();

    // 1. Create a new request headers container to forward the token to the page
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-video-token", token);

    // 2. Initialize the response forwarding the custom header to the Server Component
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // 3. Set a secure HttpOnly session cookie that persists until the browser session is closed
    response.cookies.set("video_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }

  return NextResponse.next();
}

// Match only the root homepage path
export const config = {
  matcher: "/",
};

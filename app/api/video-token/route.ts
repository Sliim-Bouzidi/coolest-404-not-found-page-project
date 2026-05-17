import { NextResponse } from "next/server";
import { generateToken } from "@/lib/videoToken";

export async function GET() {
  const token = await generateToken();
  
  const response = NextResponse.json({ token });
  
  // Set a secure HttpOnly session cookie that persists until the browser session is closed
  response.cookies.set("video_token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  
  return response;
}
